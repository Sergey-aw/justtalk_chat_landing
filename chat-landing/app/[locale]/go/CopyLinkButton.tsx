"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import posthog from "posthog-js";
import { Button } from "@/components/ui/button";

interface CopyLinkButtonProps {
  /** Canonical https URL to copy so the user can paste it into Safari. */
  url: string;
}

/**
 * Backup path for iOS in-app browsers: copying works inside the webview even
 * though opening the App Store doesn't. The user pastes the link into Safari,
 * where the normal `/go` → App Store flow works.
 */
export function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    posthog.capture("go_inapp_copy_link", { platform: "ios", in_app: true });
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Older webviews: fall back to a hidden textarea + execCommand.
      const el = document.createElement("textarea");
      el.value = url;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="mt-8 flex w-full flex-col items-center gap-2">
      <Button
        variant="outline"
        size="lg"
        className="w-full cursor-pointer"
        onClick={handleCopy}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied — paste in Safari" : "Copy link"}
      </Button>
      <p className="text-xs leading-snug text-just_scorpion/80">
        Then open Safari and paste to continue.
      </p>
    </div>
  );
}
