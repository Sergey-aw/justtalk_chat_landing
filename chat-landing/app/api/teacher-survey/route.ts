import { NextRequest, NextResponse } from "next/server";
import { recordSurveyResponse } from "@/lib/teacher-survey-sink";
import { CATALOGUES, PMF_GATE } from "@/lib/teacher-survey";

const LOOPS_BASE = "https://app.loops.so/api/v1";

interface SurveyPayload {
  name?: string;
  email?: string;
  heardFrom?: string;
  heardFromOther?: string;
  understanding?: string;
  signupReasons?: string[];
  signupReasonOther?: string;
  teachingPlaces?: string[];
  teachingPlaceOther?: string;
  weeklyStudents?: string;
  afterLesson?: string;
  afterLessonOther?: string;
  adminTime?: string;
  buildNext?: string;
  buildNextOther?: string;
  onboardingReached?: string;
  friction?: string;
  pmf?: string;
  callInterest?: string;
  callTopics?: string;
  anythingElse?: string;
  source?: string;
  /** Hidden field; only a bot fills it in. */
  website?: string;
}

/** Keeps free text inside Notion's and Loops' per-property limits. */
function trim(value: unknown, max = 1500): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Accepts a single-choice answer only if it is one of the keys we published.
 * Anything else is a stale tab or a hand-rolled request, and letting it through
 * would create a junk option in the Notion select that then has to be merged
 * back by hand.
 */
function choice(field: string, value: unknown): string {
  const key = trim(value, 40);
  return CATALOGUES[field]?.some((c) => c.value === key) ? key : "";
}

function choices(field: string, value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const allowed = new Set(CATALOGUES[field]?.map((c) => c.value) ?? []);
  return [...new Set(value.map((v) => trim(v, 40)))].filter((v) =>
    allowed.has(v)
  );
}

/**
 * Records a teacher's answers to the discovery survey.
 *
 * Notion and Slack are written first and treated as fatal: these people were
 * emailed five times to get here, and dropping a response because Loops was
 * slow would be the expensive kind of failure. The Loops write that follows is
 * what stops the reminder sequence, so it is retried in spirit — logged loudly
 * and left for the nightly reconciliation rather than shown to the teacher.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SurveyPayload;

    // Honeypot. Answer 200 so the bot has nothing to tune against.
    if (trim(body.website, 100)) {
      return NextResponse.json({ success: true });
    }

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

    const onboardingReached = choice(
      "onboardingReached",
      body.onboardingReached
    );

    const response = {
      name,
      email,
      heardFrom: choice("heardFrom", body.heardFrom),
      heardFromOther: trim(body.heardFromOther, 200),
      understanding: trim(body.understanding),
      signupReasons: choices("signupReasons", body.signupReasons),
      signupReasonOther: trim(body.signupReasonOther, 300),
      teachingPlaces: choices("teachingPlaces", body.teachingPlaces),
      teachingPlaceOther: trim(body.teachingPlaceOther, 200),
      weeklyStudents: choice("weeklyStudents", body.weeklyStudents),
      afterLesson: choice("afterLesson", body.afterLesson),
      afterLessonOther: trim(body.afterLessonOther, 300),
      adminTime: choice("adminTime", body.adminTime),
      buildNext: choice("buildNext", body.buildNext),
      buildNextOther: trim(body.buildNextOther, 300),
      onboardingReached,
      friction: trim(body.friction),
      // Mirrors the form's gate, so a response can't carry a PMF score from
      // someone who never opened the product.
      pmf: PMF_GATE.includes(onboardingReached) ? choice("pmf", body.pmf) : "",
      callInterest: choice("callInterest", body.callInterest),
      callTopics: trim(body.callTopics),
      anythingElse: trim(body.anythingElse),
      source: trim(body.source, 60),
    };

    try {
      await recordSurveyResponse(response, new Date().toISOString());
    } catch (error) {
      console.error("recordSurveyResponse failed:", error);
      return NextResponse.json(
        { success: false, error: "Failed to save your answers" },
        { status: 502 }
      );
    }

    await updateLoops(response);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error in teacher-survey:", message);

    return NextResponse.json(
      { success: false, error: "Failed to save your answers" },
      { status: 500 }
    );
  }
}

/**
 * Marks the contact as done and fires the event the reminder sequence exits on.
 *
 * Both are sent because the two ways of running the sequence need different
 * things: a Loop (automation) exits on the event, a campaign filters on the
 * property. Neither failure is shown to the teacher — the worst case is one
 * extra reminder, and their answers are already safe in Notion.
 */
async function updateLoops(response: {
  email: string;
  buildNext: string;
  callInterest: string;
  weeklyStudents: string;
  onboardingReached: string;
  pmf: string;
  understanding: string;
}): Promise<void> {
  const loopsApiKey = process.env.LOOPS_API_KEY;
  if (!loopsApiKey) return;

  const authHeaders = {
    Authorization: `Bearer ${loopsApiKey}`,
    "Content-Type": "application/json",
  };

  try {
    const update = await fetch(`${LOOPS_BASE}/contacts/update`, {
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify({
        email: response.email,
        surveyCompleted: true,
        wantsFounderCall: response.callInterest === "yes",
        // Kept as a contact property, not just an event property, so a future
        // "the thing you asked for is live" email can segment on it.
        buildNext: response.buildNext,
      }),
    });

    if (!update.ok) {
      console.error("Loops contacts/update failed:", await update.text());
    }
  } catch (error) {
    console.error("Loops contacts/update threw:", error);
  }

  try {
    const event = await fetch(`${LOOPS_BASE}/events/send`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        email: response.email,
        eventName: "teacher_survey_completed",
        eventProperties: {
          buildNext: response.buildNext,
          callInterest: response.callInterest,
          weeklyStudents: response.weeklyStudents,
          onboardingReached: response.onboardingReached,
          pmf: response.pmf,
          understanding: response.understanding.slice(0, 500),
        },
      }),
    });

    if (!event.ok) {
      console.error("Loops events/send failed:", await event.text());
    }
  } catch (error) {
    console.error("Loops events/send threw:", error);
  }
}
