/**
 * Writes program applications (ambassador, creator) to Notion and pings Slack.
 *
 * Both are opt-in: with NOTION_TOKEN unset the Notion write is skipped, with
 * SLACK_WEBHOOK_URL unset the ping is skipped, and the calling route behaves
 * exactly as it did before either was configured.
 */

const NOTION_API = "https://api.notion.com/v1/pages";
const NOTION_VERSION = "2022-06-28";

/**
 * Canonical English labels for the stable form keys.
 *
 * Applications arrive in five languages, but the database should read the same
 * whoever filled the form in — so the localized label the applicant saw is
 * deliberately discarded here in favour of these.
 *
 * Notion select/multi-select option names cannot contain commas, which is why
 * the audience buckets are written "1k–10k" rather than "1,000–10,000".
 */
const CHANNEL_LABELS: Record<string, string> = {
  // ambassador — where they teach
  own: "Own private students",
  preply: "Preply",
  italki: "italki",
  cambly: "Cambly",
  verbling: "Verbling",
  superprof: "Superprof",
  school: "School / academy",
  university: "University",
  company: "In-company",
  // creator — where they publish
  youtube: "YouTube",
  tiktok: "TikTok",
  instagram: "Instagram",
  blog: "Blog",
  newsletter: "Newsletter",
  podcast: "Podcast",
  x: "X",
  // shared
  other: "Other",
};

const TRACK_LABELS: Record<string, string> = {
  students: "Bring students",
  teachers: "Grow teachers",
  roleplays: "Share role-plays",
};

const AUDIENCE_LABELS: Record<string, string> = {
  // ambassador roster size
  starting: "Just starting",
  "1to5": "1–5 students",
  "6to15": "6–15 students",
  "16to30": "16–30 students",
  over30: "30+ students",
  // creator following
  under1k: "Under 1k",
  "1kto10k": "1k–10k",
  "10kto50k": "10k–50k",
  "50kto250k": "50k–250k",
  over250k: "250k+",
};

function label(map: Record<string, string>, key: string): string {
  return map[key] ?? key;
}

export interface ApplicationRecord {
  program: "Ambassador" | "Creator";
  name: string;
  email: string;
  based: string;
  /** Stable keys, not display labels. */
  channels: string[];
  otherChannel: string;
  /** Stable key, not a display label. */
  audience: string;
  /** Stable keys; ambassador only. */
  tracks: string[];
  /** Any profile URLs the applicant gave, already trimmed. */
  links: string[];
  reach: string;
  portfolio: string;
  /** Locale the form was filled in, e.g. "pt-BR". */
  locale: string;
}

function richText(content: string) {
  // Notion caps a single rich-text object at 2000 chars; our inputs are trimmed
  // well below that, but clamp anyway so an oversized field can't 400 the write.
  return content ? [{ text: { content: content.slice(0, 1900) } }] : [];
}

/**
 * Creates the Notion page. Returns the page URL, or null when Notion isn't
 * configured. Throws when it is configured and the write fails — the caller
 * treats that as fatal, since Notion is the system of record.
 */
async function writeToNotion(
  record: ApplicationRecord,
  submittedAt: string
): Promise<string | null> {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_APPLICATIONS_DB_ID;

  if (!token || !databaseId) return null;

  const response = await fetch(NOTION_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        Name: { title: richText(record.name || record.email) },
        Email: { email: record.email },
        Program: { select: { name: record.program } },
        Status: { select: { name: "New" } },
        Based: { rich_text: richText(record.based) },
        Channels: {
          multi_select: record.channels.map((c) => ({
            name: label(CHANNEL_LABELS, c),
          })),
        },
        "Other channel": { rich_text: richText(record.otherChannel) },
        ...(record.audience
          ? { Audience: { select: { name: label(AUDIENCE_LABELS, record.audience) } } }
          : {}),
        Tracks: {
          multi_select: record.tracks.map((t) => ({
            name: label(TRACK_LABELS, t),
          })),
        },
        Links: { rich_text: richText(record.links.filter(Boolean).join("\n")) },
        Reach: { rich_text: richText(record.reach) },
        Portfolio: { rich_text: richText(record.portfolio) },
        Submitted: { date: { start: submittedAt } },
        ...(record.locale ? { Locale: { select: { name: record.locale } } } : {}),
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Notion pages.create failed: ${await response.text()}`);
  }

  const page = await response.json();
  return typeof page?.url === "string" ? page.url : null;
}

/**
 * Best-effort Slack ping. Deliberately carries no email, location or social
 * handles — just enough to triage, with the rest behind the Notion link.
 */
async function notifySlack(
  record: ApplicationRecord,
  notionUrl: string | null
): Promise<void> {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) return;

  const facts = [
    record.audience ? label(AUDIENCE_LABELS, record.audience) : null,
    record.channels.length
      ? record.channels.map((c) => label(CHANNEL_LABELS, c)).join(", ")
      : null,
    record.locale ? `applied in ${record.locale}` : null,
  ].filter(Boolean);

  const blocks: unknown[] = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*New ${record.program.toLowerCase()} application* — ${
          record.name || "no name given"
        }`,
      },
    },
  ];

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
          text: { type: "plain_text", text: "Open in Notion" },
          url: notionUrl,
        },
      ],
    });
  }

  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `New ${record.program.toLowerCase()} application`,
      blocks,
    }),
  });

  if (!response.ok) {
    console.error("Slack webhook failed:", await response.text());
  }
}

/**
 * Records an application. Throws only if Notion is configured and rejects the
 * write — Slack failures are logged and swallowed, since a missing ping is not
 * worth making the applicant retype the form.
 */
export async function recordApplication(
  record: ApplicationRecord,
  submittedAt: string
): Promise<void> {
  const notionUrl = await writeToNotion(record, submittedAt);

  try {
    await notifySlack(record, notionUrl);
  } catch (error) {
    console.error("Slack notify threw:", error);
  }
}
