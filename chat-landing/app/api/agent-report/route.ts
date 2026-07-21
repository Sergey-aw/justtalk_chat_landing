import { NextRequest, NextResponse } from "next/server";

const LOOPS_BASE = "https://app.loops.so/api/v1";

/**
 * Captures the email someone gave after an AI agent demo call, tied to the
 * ElevenLabs conversation it came from, so the report can be generated later.
 *
 * Mirrors app/api/join-waitlist/route.ts, but writes to a separate audience
 * (LOOPS_AGENT_LIST_ID) so demo leads don't land in the platform waitlist.
 */
export async function POST(req: NextRequest) {
  try {
    const { email, conversationId, agentId, durationSeconds } = await req.json();

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
    const loopsListId = process.env.LOOPS_AGENT_LIST_ID;

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

    const contactBody: {
      email: string;
      source: string;
      userGroup: string;
      role: string;
      mailingLists?: { [key: string]: boolean };
    } = {
      email,
      source: "JustTalk Agent Demo",
      userGroup: "agent_demo",
      role: "student",
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
        // returning visitor — keep their list membership/properties fresh
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
          { success: false, error: "Failed to save email" },
          { status: 400 }
        );
      }
    }

    // Sent as an EVENT, not a contact property: contact properties are single-valued,
    // so a second conversation would overwrite the first. Events keep one per call.
    const eventResponse = await fetch(`${LOOPS_BASE}/events/send`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        email,
        eventName: "agent_demo_completed",
        eventProperties: {
          conversationId: conversationId ?? "",
          agentId: agentId ?? "",
          durationSeconds: Math.round(durationSeconds ?? 0),
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
    console.error("Error in agent-report:", message);

    return NextResponse.json(
      { success: false, error: "Failed to save email" },
      { status: 500 }
    );
  }
}
