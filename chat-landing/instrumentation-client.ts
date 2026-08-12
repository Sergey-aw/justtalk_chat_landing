import posthog from "posthog-js";

/**
 * Query params that carry personal data and must never reach analytics.
 *
 * The teacher survey is linked from Loops with `?e={{email}}&n={{firstName}}`
 * so a teacher doesn't retype an address we already have. Without this, that
 * address would be captured verbatim in `$current_url` on the pageview, and
 * again in `$referrer` on every navigation afterwards.
 */
const PII_PARAMS = ["e", "n"];

/** Redacts PII_PARAMS from any URL-shaped property value. */
function scrubUrl(value: unknown): unknown {
  if (typeof value !== "string" || !value.includes("?")) return value;

  try {
    const url = new URL(value, "https://justtalk.ai");
    let touched = false;

    for (const param of PII_PARAMS) {
      if (url.searchParams.has(param)) {
        url.searchParams.set(param, "redacted");
        touched = true;
      }
    }

    if (!touched) return value;
    // Keep the original shape: relative properties stay relative.
    return value.startsWith("http") ? url.toString() : url.pathname + url.search;
  } catch {
    return value;
  }
}

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: "/ingest",
  ui_host: "https://us.posthog.com",
  // Include the defaults option as required by PostHog
  defaults: '2025-05-24',
  // Enables capturing unhandled exceptions via Error Tracking
  capture_exceptions: true,
  // Turn on debug in development mode
  debug: process.env.NODE_ENV === "development",
  before_send: (event) => {
    if (!event?.properties) return event;

    for (const key of [
      "$current_url",
      "$referrer",
      "$initial_current_url",
      "$initial_referrer",
    ]) {
      if (key in event.properties) {
        event.properties[key] = scrubUrl(event.properties[key]);
      }
    }

    return event;
  },
});

// IMPORTANT: Never combine this approach with other client-side PostHog initialization approaches,
// especially components like a PostHogProvider. instrumentation-client.ts is the correct solution
// for initializing client-side PostHog in Next.js 15.3+ apps.
