"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

interface GoTrackerProps {
  platform: "ios" | "android" | "other";
  inApp: boolean;
}

/**
 * Fires a single PostHog event on mount recording which platform the `/go`
 * page detected server-side (and whether it's an in-app browser), so the
 * device split can be analyzed against the `go_redirect_clicked` click events.
 */
export function GoTracker({ platform, inApp }: GoTrackerProps) {
  useEffect(() => {
    posthog.capture("go_page_viewed", { platform, in_app: inApp });
  }, [platform, inApp]);

  return null;
}
