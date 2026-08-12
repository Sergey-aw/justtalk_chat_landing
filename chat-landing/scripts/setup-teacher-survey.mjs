#!/usr/bin/env node
/**
 * One-time provisioning for the teacher discovery survey.
 *
 *   node scripts/setup-teacher-survey.mjs <notion-parent-page-id>
 *
 * Creates:
 *   1. the Notion database that lib/teacher-survey-sink.ts writes to, and
 *   2. the three Loops contact properties app/api/teacher-survey/route.ts sets.
 *
 * Safe to re-run for Loops (existing properties are left alone). Notion has no
 * "create if absent" for databases, so re-running makes a second one — the
 * script prints the id it created and stops there rather than guessing.
 *
 * Select and multi-select options are deliberately not pre-declared: Notion
 * creates them on first use, which keeps this script from drifting out of step
 * with the catalogue in lib/teacher-survey.ts every time an option is reworded.
 */

import { readFileSync } from "node:fs";

const NOTION_VERSION = "2022-06-28";

/** Mirrors the property names in lib/teacher-survey-sink.ts exactly. */
const PROPERTIES = {
  Name: { title: {} },
  Email: { email: {} },
  Status: {
    select: {
      options: [
        { name: "New", color: "blue" },
        { name: "Read", color: "gray" },
        { name: "Call booked", color: "green" },
        { name: "Followed up", color: "purple" },
      ],
    },
  },
  "Heard from": { select: {} },
  "Heard from — other": { rich_text: {} },
  "What they think it's for": { rich_text: {} },
  "Why they signed up": { multi_select: {} },
  "Why — other": { rich_text: {} },
  "Teaches on": { multi_select: {} },
  "Teaches on — other": { rich_text: {} },
  "Weekly students": { select: {} },
  "After a lesson": { select: {} },
  "After a lesson — other": { rich_text: {} },
  "Admin time per lesson": { select: {} },
  "Build next": { select: {} },
  "Build next — other": { rich_text: {} },
  "Got as far as": { select: {} },
  "What got in the way": { rich_text: {} },
  PMF: { select: {} },
  "Founder call": { select: {} },
  "Call topics": { rich_text: {} },
  "Anything else": { rich_text: {} },
  Submitted: { date: {} },
  Source: { rich_text: {} },
};

/** Set by app/api/teacher-survey/route.ts on every completed response. */
const LOOPS_PROPERTIES = [
  { name: "surveyCompleted", type: "boolean" },
  { name: "wantsFounderCall", type: "boolean" },
  { name: "buildNext", type: "string" },
];

/** Minimal .env.local reader — this runs outside Next, so nothing loads it. */
function loadEnv() {
  try {
    for (const line of readFileSync(".env.local", "utf8").split("\n")) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
      if (match && !process.env[match[1]]) {
        process.env[match[1]] = match[2].trim().replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    // no .env.local — fall back to whatever is already exported
  }
}

async function createNotionDatabase(parentPageId) {
  const token = process.env.NOTION_TOKEN;
  if (!token) {
    console.log("• NOTION_TOKEN not set — skipping the Notion database.");
    return;
  }

  const response = await fetch("https://api.notion.com/v1/databases", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { type: "page_id", page_id: parentPageId },
      title: [{ type: "text", text: { content: "Teacher survey responses" } }],
      description: [
        {
          type: "text",
          text: {
            content:
              "Discovery survey sent to teachers who signed up early. Written by /api/teacher-survey.",
          },
        },
      ],
      properties: PROPERTIES,
    }),
  });

  const body = await response.json();

  if (!response.ok) {
    console.error("✗ Notion databases.create failed:", body?.message ?? body);
    if (body?.code === "object_not_found") {
      console.error(
        "  The integration probably isn't added to that page yet — open it, ⋯ → Connections → add your integration."
      );
    }
    process.exitCode = 1;
    return;
  }

  console.log("✓ Notion database created.");
  console.log(`  ${body.url}`);
  console.log("");
  console.log("  Add this to .env.local (and to your Vercel env):");
  console.log(`  NOTION_TEACHER_SURVEY_DB_ID=${body.id.replace(/-/g, "")}`);
}

async function createLoopsProperties() {
  const key = process.env.LOOPS_API_KEY;
  if (!key) {
    console.log("• LOOPS_API_KEY not set — skipping the Loops properties.");
    return;
  }

  const headers = {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };

  const existingResponse = await fetch(
    "https://app.loops.so/api/v1/contacts/properties?list=custom",
    { headers }
  );

  if (!existingResponse.ok) {
    console.error(
      "✗ Could not read Loops properties:",
      await existingResponse.text()
    );
    process.exitCode = 1;
    return;
  }

  const existing = new Set((await existingResponse.json()).map((p) => p.key));

  for (const property of LOOPS_PROPERTIES) {
    if (existing.has(property.name)) {
      console.log(`• Loops property "${property.name}" already exists.`);
      continue;
    }

    const response = await fetch(
      "https://app.loops.so/api/v1/contacts/properties",
      { method: "POST", headers, body: JSON.stringify(property) }
    );

    if (response.ok) {
      console.log(`✓ Loops property "${property.name}" created.`);
    } else {
      console.error(
        `✗ Loops property "${property.name}" failed:`,
        await response.text()
      );
      process.exitCode = 1;
    }
  }
}

const parentPageId = process.argv[2];

if (!parentPageId) {
  console.error(
    "Usage: node scripts/setup-teacher-survey.mjs <notion-parent-page-id>\n\n" +
      "The parent page is any Notion page you can share with the integration.\n" +
      "Its id is the 32-hex string at the end of the page URL."
  );
  process.exit(1);
}

loadEnv();
await createNotionDatabase(parentPageId);
console.log("");
await createLoopsProperties();
