"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

interface GoTrackerProps {
  platform: "ios" | "android" | "other";
}

/**
 * Fires a single PostHog event on mount recording which platform the `/go`
 * page detected server-side, so the device split can be analyzed against the
 * `go_redirect_clicked` click events.
 */
export function GoTracker({ platform }: GoTrackerProps) {
  useEffect(() => {
    posthog.capture("go_page_viewed", { platform });
  }, [platform]);

  return null;
}
