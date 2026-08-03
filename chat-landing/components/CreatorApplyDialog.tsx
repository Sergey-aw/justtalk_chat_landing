"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import posthog from "posthog-js";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  checkboxClass,
  checkboxLabelClass,
  fieldClass,
  labelClass,
} from "@/lib/apply-form";

/** Values are stable analytics keys; labels come from the catalogue. */
const CHANNELS = [
  "youtube",
  "tiktok",
  "instagram",
  "blog",
  "newsletter",
  "podcast",
  "x",
  "other",
] as const;

const AUDIENCE_SIZES = [
  "under1k",
  "1kto10k",
  "10kto50k",
  "50kto250k",
  "over250k",
] as const;

interface CreatorApplyDialogProps {
  /** The trigger element that opens the dialog. */
  children: React.ReactNode;
  /** Where on the page the dialog was opened from — sent to PostHog. */
  location: string;
}

export function CreatorApplyDialog({
  children,
  location,
}: CreatorApplyDialogProps) {
  const t = useTranslations("creatorsPage.apply");
  const tHero = useTranslations("creatorsPage.hero");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      posthog.capture("creator_apply_opened", { location });
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      based: String(data.get("based") ?? ""),
      channels: data.getAll("channel").map(String),
      primaryUrl: String(data.get("primaryUrl") ?? ""),
      audience: String(data.get("audience") ?? ""),
      topics: String(data.get("topics") ?? ""),
      ideas: String(data.get("ideas") ?? ""),
    };

    try {
      const response = await fetch("/api/creator-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setSent(true);
        posthog.capture("creator_application_submitted", {
          location,
          channels: payload.channels,
          audience: payload.audience,
        });
      } else {
        setError(result.error || t("error"));
      }
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-[560px] bg-just_white">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-medium leading-tight tracking-[-0.177px] text-just_cod-gray">
            {sent ? t("success.title") : t("title")}
          </DialogTitle>
          <DialogDescription className="text-sm font-normal leading-relaxed tracking-[-0.14px] text-just_cod-gray/70 pt-1">
            {sent ? t("success.description") : t("description")}
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="pt-2">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            >
              {t("success.close")}
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 pt-2 max-h-[58vh] overflow-y-auto pr-1"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cf-name" className={labelClass}>
                  {t("fields.name")}
                </label>
                <input
                  id="cf-name"
                  name="name"
                  type="text"
                  required
                  placeholder={t("placeholders.name")}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="cf-email" className={labelClass}>
                  {t("fields.email")}
                </label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  required
                  placeholder={t("placeholders.email")}
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="cf-based" className={labelClass}>
                {t("fields.based")}
              </label>
              <input
                id="cf-based"
                name="based"
                type="text"
                required
                placeholder={t("placeholders.based")}
                className={fieldClass}
              />
            </div>

            <fieldset>
              <legend className={labelClass}>{t("fields.channels")}</legend>
              <div className="grid sm:grid-cols-2 gap-2">
                {CHANNELS.map((channel) => (
                  <label key={channel} className={checkboxLabelClass}>
                    <input
                      type="checkbox"
                      name="channel"
                      value={channel}
                      className={checkboxClass}
                    />
                    {t(`channels.${channel}`)}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="cf-url" className={labelClass}>
                {t("fields.primaryUrl")}
              </label>
              <input
                id="cf-url"
                name="primaryUrl"
                type="text"
                required
                placeholder={t("placeholders.primaryUrl")}
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="cf-audience" className={labelClass}>
                {t("fields.audience")}
              </label>
              <select
                id="cf-audience"
                name="audience"
                required
                defaultValue=""
                className={fieldClass}
              >
                <option value="" disabled>
                  {t("placeholders.audience")}
                </option>
                {AUDIENCE_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {t(`audienceSizes.${size}`)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="cf-topics" className={labelClass}>
                {t("fields.topics")}
              </label>
              <textarea
                id="cf-topics"
                name="topics"
                rows={3}
                placeholder={t("placeholders.topics")}
                className={`${fieldClass} resize-y`}
              />
            </div>

            <div>
              <label htmlFor="cf-ideas" className={labelClass}>
                {t("fields.ideas")}{" "}
                <span className="font-normal text-just_cod-gray/55">
                  {t("fields.optional")}
                </span>
              </label>
              <textarea
                id="cf-ideas"
                name="ideas"
                rows={3}
                placeholder={t("placeholders.ideas")}
                className={`${fieldClass} resize-y`}
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-2.5 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="cursor-pointer"
              >
                {loading ? t("sending") : t("submit")}
              </Button>
              <span className="text-[13px] tracking-[-0.14px] text-just_cod-gray/55">
                {tHero("note")}
              </span>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
