/**
 * Writes teacher discovery survey responses to Notion and pings Slack.
 *
 * Deliberately a separate sink from lib/application-sink.ts: applications are a
 * pipeline you move people through, survey responses are a dataset you slice.
 * The schemas have almost nothing in common, and sharing one would have meant
 * squashing a dozen codeable answers into free text nobody can filter on.
 *
 * Both destinations are opt-in. With NOTION_TOKEN or
 * NOTION_TEACHER_SURVEY_DB_ID unset the Notion write is skipped; with
 * SLACK_WEBHOOK_URL unset the ping is skipped.
 */

import { labelFor, labelsFor } from "@/lib/teacher-survey";

const NOTION_API = "https://api.notion.com/v1/pages";
const NOTION_VERSION = "2022-06-28";

export interface SurveyResponse {
  name: string;
  email: string;
  /** Stable keys throughout — labels are resolved at write time. */
  heardFrom: string;
  heardFromOther: string;
  /** Unprompted answer to "what do you think JustTalk is for". */
  understanding: string;
  signupReasons: string[];
  signupReasonOther: string;
  teachingPlaces: string[];
  teachingPlaceOther: string;
  weeklyStudents: string;
  afterLesson: string;
  afterLessonOther: string;
  adminTime: string;
  buildNext: string;
  buildNextOther: string;
  onboardingReached: string;
  friction: string;
  /** Empty unless onboardingReached cleared PMF_GATE. */
  pmf: string;
  callInterest: string;
  callTopics: string;
  anythingElse: string;
  /** Which email drove the click, from ?src= on the survey link. */
  source: string;
}

function richText(content: string) {
  // Notion caps a single rich-text object at 2000 chars. The form caps its
  // textareas well below that; clamp anyway so a long paste can't 400 the write
  // and cost us the whole response.
  return content ? [{ text: { content: content.slice(0, 1900) } }] : [];
}

/** Notion rejects an empty select, so absent answers drop the property. */
function select(field: string, value: string) {
  return value ? { select: { name: labelFor(field, value) } } : undefined;
}

function multiSelect(field: string, values: string[]) {
  return {
    multi_select: labelsFor(field, values).map((name) => ({ name })),
  };
}

/** Strips the properties `select()` returned undefined for. */
function compact<T extends Record<string, unknown>>(properties: T) {
  return Object.fromEntries(
    Object.entries(properties).filter(([, v]) => v !== undefined)
  );
}

/**
 * Creates the Notion page. Returns the page URL, or null when Notion isn't
 * configured. Throws when it is configured and the write fails — Notion is the
 * system of record, and a survey response is not something the teacher will
 * sit down and retype.
 */
async function writeToNotion(
  response: SurveyResponse,
  submittedAt: string
): Promise<string | null> {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_TEACHER_SURVEY_DB_ID;

  if (!token || !databaseId) return null;

  const properties = compact({
    Name: { title: richText(response.name || response.email) },
    Email: { email: response.email },
    Status: { select: { name: "New" } },
    "Heard from": select("heardFrom", response.heardFrom),
    "Heard from — other": { rich_text: richText(response.heardFromOther) },
    "What they think it's for": { rich_text: richText(response.understanding) },
    "Why they signed up": multiSelect("signupReasons", response.signupReasons),
    "Why — other": { rich_text: richText(response.signupReasonOther) },
    "Teaches on": multiSelect("teachingPlaces", response.teachingPlaces),
    "Teaches on — other": { rich_text: richText(response.teachingPlaceOther) },
    "Weekly students": select("weeklyStudents", response.weeklyStudents),
    "After a lesson": select("afterLesson", response.afterLesson),
    "After a lesson — other": { rich_text: richText(response.afterLessonOther) },
    "Admin time per lesson": select("adminTime", response.adminTime),
    "Build next": select("buildNext", response.buildNext),
    "Build next — other": { rich_text: richText(response.buildNextOther) },
    "Got as far as": select("onboardingReached", response.onboardingReached),
    "What got in the way": { rich_text: richText(response.friction) },
    PMF: select("pmf", response.pmf),
    "Founder call": select("callInterest", response.callInterest),
    "Call topics": { rich_text: richText(response.callTopics) },
    "Anything else": { rich_text: richText(response.anythingElse) },
    Submitted: { date: { start: submittedAt } },
    Source: { rich_text: richText(response.source) },
  });

  const notionResponse = await fetch(NOTION_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties,
    }),
  });

  if (!notionResponse.ok) {
    throw new Error(
      `Notion pages.create failed: ${await notionResponse.text()}`
    );
  }

  const page = await notionResponse.json();
  return typeof page?.url === "string" ? page.url : null;
}

/**
 * Best-effort Slack ping.
 *
 * Leads with the two answers worth interrupting someone for — what they'd have
 * us build next, and whether they want the founder call — and follows the
 * application sink's convention of keeping the email address out of the
 * channel. Everything else is one click away behind the Notion link.
 */
async function notifySlack(
  response: SurveyResponse,
  notionUrl: string | null
): Promise<void> {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) return;

  const wantsCall = response.callInterest === "yes";
  const who = response.name || "A teacher";

  const headline = wantsCall
    ? `:fire: *${who} answered the survey — and wants the founder call*`
    : `*${who} answered the teacher survey*`;

  const facts = [
    response.weeklyStudents
      ? `${labelFor("weeklyStudents", response.weeklyStudents)} students/week`
      : null,
    response.onboardingReached
      ? labelFor("onboardingReached", response.onboardingReached)
      : null,
    response.pmf ? `PMF: ${labelFor("pmf", response.pmf)}` : null,
    response.source ? `via ${response.source}` : null,
  ].filter(Boolean);

  const blocks: unknown[] = [
    { type: "section", text: { type: "mrkdwn", text: headline } },
  ];

  if (response.buildNext) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Would have us build next:* ${labelFor(
          "buildNext",
          response.buildNext
        )}`,
      },
    });
  }

  // The unprompted "what is this for" answer is the one line worth reading in
  // the channel rather than in Notion — it is how we find out our own pitch.
  if (response.understanding) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Thinks JustTalk is for:* _${response.understanding.slice(
          0,
          280
        )}_`,
      },
    });
  }

  if (facts.length) {
    blocks.push({
      type: "context",
      elements: [{ type: "mrkdwn", text: facts.join("  ·  ") }],
    });
  }

  if (notionUrl) {
    blocks.push({
      type: "actions",
      elements: [
        {
          type: "button",
          text: { type: "plain_text", text: "Read the full response" },
          url: notionUrl,
          ...(wantsCall ? { style: "primary" } : {}),
        },
      ],
    });
  }

  const slackResponse = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: wantsCall
        ? "New teacher survey response — wants the founder call"
        : "New teacher survey response",
      blocks,
    }),
  });

  if (!slackResponse.ok) {
    console.error("Slack webhook failed:", await slackResponse.text());
  }
}

/**
 * Records a survey response. Throws only if Notion is configured and rejects
 * the write — Slack failures are logged and swallowed, since a missing ping is
 * not worth making a teacher fill the form in twice.
 */
export async function recordSurveyResponse(
  response: SurveyResponse,
  submittedAt: string
): Promise<void> {
  const notionUrl = await writeToNotion(response, submittedAt);

  try {
    await notifySlack(response, notionUrl);
  } catch (error) {
    console.error("Slack notify threw:", error);
  }
}
