import { NextRequest, NextResponse } from "next/server";
import { recordApplication } from "@/lib/application-sink";

const LOOPS_BASE = "https://app.loops.so/api/v1";

interface ApplicationPayload {
  name?: string;
  email?: string;
  based?: string;
  channels?: string[];
  primaryUrl?: string;
  audience?: string;
  topics?: string;
  ideas?: string;
  locale?: string;
}

/** Keeps free-text answers inside Loops' event-property limits. */
function trim(value: unknown, max = 500): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Captures an application to the creator (affiliate) program.
 *
 * Mirrors app/api/ambassador-apply/route.ts: the contact lands in its own Loops
 * audience (LOOPS_CREATOR_LIST_ID) and the answers ride along as an event,
 * since contact properties are single-valued and a re-application would
 * overwrite them.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ApplicationPayload;
    const email = trim(body.email, 200);
    const name = trim(body.name, 120);

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    const loopsApiKey = process.env.LOOPS_API_KEY;
    const loopsListId = process.env.LOOPS_CREATOR_LIST_ID;

    if (!loopsApiKey) {
      console.error("Loops API key not configured");
      return NextResponse.json(
        { success: false, error: "Service not configured" },
        { status: 500 }
      );
    }

    const authHeaders = {
      Authorization: `Bearer ${loopsApiKey}`,
      "Content-Type": "application/json",
    };

    // Loops splits the display name itself; everything past the first space is the last name.
    const [firstName, ...rest] = name.split(/\s+/).filter(Boolean);

    const contactBody: {
      email: string;
      firstName?: string;
      lastName?: string;
      source: string;
      userGroup: string;
      role: string;
      mailingLists?: { [key: string]: boolean };
    } = {
      email,
      ...(firstName ? { firstName } : {}),
      ...(rest.length ? { lastName: rest.join(" ") } : {}),
      source: "JustTalk Creator Program",
      userGroup: "creator_applicant",
      role: "creator",
    };

    // optional: without it the contact is still created, just not on a list
    if (loopsListId) {
      contactBody.mailingLists = { [loopsListId]: true };
    }

    const createResponse = await fetch(`${LOOPS_BASE}/contacts/create`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify(contactBody),
    });

    const createData = await createResponse.json();

    if (!createResponse.ok) {
      const alreadyExists =
        createResponse.status === 409 ||
        createData?.message?.includes("already exists");

      if (alreadyExists) {
        // returning applicant — keep their list membership/properties fresh
        const updateResponse = await fetch(`${LOOPS_BASE}/contacts/update`, {
          method: "PUT",
          headers: authHeaders,
          body: JSON.stringify(contactBody),
        });

        if (!updateResponse.ok) {
          console.error("Loops contacts/update failed:", await updateResponse.text());
        }
      } else {
        console.error("Loops contacts/create failed:", createData);
        return NextResponse.json(
          { success: false, error: "Failed to send application" },
          { status: 400 }
        );
      }
    }

    const channels = Array.isArray(body.channels)
      ? body.channels.map((c) => trim(c, 40)).filter(Boolean)
      : [];

    // Notion is the system of record — a failure here is fatal, so the
    // applicant is told to retry rather than having their answers vanish.
    // Loops already handles the duplicate contact on a resubmit.
    try {
      await recordApplication(
        {
          program: "Creator",
          name,
          email,
          based: trim(body.based, 200),
          channels,
          otherChannel: "",
          audience: trim(body.audience, 40),
          tracks: [],
          links: [trim(body.primaryUrl, 300)],
          reach: trim(body.topics),
          portfolio: trim(body.ideas),
          locale: trim(body.locale, 10),
        },
        new Date().toISOString()
      );
    } catch (error) {
      console.error("recordApplication failed:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send application" },
        { status: 502 }
      );
    }

    const eventResponse = await fetch(`${LOOPS_BASE}/events/send`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        email,
        eventName: "creator_application_submitted",
        eventProperties: {
          name,
          based: trim(body.based, 200),
          channels: channels.join(", "),
          primaryUrl: trim(body.primaryUrl, 300),
          audience: trim(body.audience, 40),
          topics: trim(body.topics),
          ideas: trim(body.ideas),
        },
      }),
    });

    if (!eventResponse.ok) {
      // the contact is saved at this point, so this isn't fatal — log and move on
      console.error("Loops events/send failed:", await eventResponse.text());
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error in creator-apply:", message);

    return NextResponse.json(
      { success: false, error: "Failed to send application" },
      { status: 500 }
    );
  }
}
