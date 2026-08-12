#!/usr/bin/env node
/**
 * Guards the one constraint in lib/teacher-survey.ts that TypeScript can't:
 * every option label lands in a Notion select or multi-select, and Notion
 * rejects commas in option names outright.
 *
 * This isn't cosmetic. lib/teacher-survey-sink.ts treats a failed Notion write
 * as fatal, so a single comma in a label means every teacher who picks that
 * option gets an error and loses answers they spent four minutes on. The
 * failure only shows up in production, only for some respondents, and only
 * after they've already been emailed five times to get there.
 *
 * Run by `npm run check:survey`, which `npm run build` depends on.
 */

import { readFileSync } from "node:fs";

const SOURCE = "lib/teacher-survey.ts";
const source = readFileSync(SOURCE, "utf8");

// Line numbers make the failure actionable rather than a scavenger hunt.
const offenders = [];
source.split("\n").forEach((line, index) => {
  const match = line.match(/label:\s*"([^"]*)"/);
  if (match && match[1].includes(",")) {
    offenders.push({ line: index + 1, label: match[1] });
  }
});

if (offenders.length === 0) {
  console.log(`✓ ${SOURCE}: no commas in option labels`);
  process.exit(0);
}

console.error(
  `✗ ${SOURCE}: ${offenders.length} option label(s) contain a comma.\n` +
    `  Notion rejects commas in select and multi-select option names, and the\n` +
    `  survey sink treats a failed Notion write as fatal — so this would lose\n` +
    `  real responses. Use an em dash (—) instead.\n`
);

for (const { line, label } of offenders) {
  console.error(`  ${SOURCE}:${line}  "${label}"`);
}

process.exit(1);
