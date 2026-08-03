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

/** Values are stable analytics keys; labels come from the catalogue. */
const PLATFORMS = [
  "own",
  "preply",
  "italki",
  "cambly",
  "verbling",
  "superprof",
  "school",
  "university",
  "company",
  "other",
] as const;

const TRACKS = ["students", "teachers", "roleplays"] as const;

const ROSTER_SIZES = ["starting", "1to5", "6to15", "16to30", "over30"] as const;

const fieldClass =
  "w-full px-3 py-2.5 border border-just_black-10 rounded-lg bg-just_white text-sm tracking-[-0.14px] text-just_cod-gray focus:outline-none focus:ring-2 focus:ring-just_cod-gray/20";

const labelClass =
  "block mb-1.5 text-sm font-medium tracking-[-0.14px] text-just_cod-gray";

const checkboxLabelClass =
  "flex items-center gap-2.5 text-sm tracking-[-0.14px] text-just_cod-gray cursor-pointer";

const checkboxClass =
  "w-4 h-4 accent-just_cod-gray cursor-pointer";

interface AmbassadorApplyDialogProps {
  /** The trigger element that opens the dialog. */
  children: React.ReactNode;
  /** Where on the page the dialog was opened from — sent to PostHog. */
  location: string;
}

export function AmbassadorApplyDialog({
  children,
  location,
}: AmbassadorApplyDialogProps) {
  const t = useTranslations("ambassadorPage.apply");
  const tHero = useTranslations("ambassadorPage.hero");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      posthog.capture("ambassador_apply_opened", { location });
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
      platforms: data.getAll("platform").map(String),
      platformOther: String(data.get("platformOther") ?? ""),
      students: String(data.get("students") ?? ""),
      tracks: data.getAll("track").map(String),
      linkedin: String(data.get("linkedin") ?? ""),
      social: String(data.get("social") ?? ""),
      reach: String(data.get("reach") ?? ""),
      built: String(data.get("built") ?? ""),
    };

    try {
      const response = await fetch("/api/ambassador-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setSent(true);
        posthog.capture("ambassador_application_submitted", {
          location,
          platforms: payload.platforms,
          tracks: payload.tracks,
          students: payload.students,
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
                <label htmlFor="af-name" className={labelClass}>
                  {t("fields.name")}
                </label>
                <input
                  id="af-name"
                  name="name"
                  type="text"
                  required
                  placeholder={t("placeholders.name")}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="af-email" className={labelClass}>
                  {t("fields.email")}
                </label>
                <input
                  id="af-email"
                  name="email"
                  type="email"
                  required
                  placeholder={t("placeholders.email")}
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="af-based" className={labelClass}>
                {t("fields.based")}
              </label>
              <input
                id="af-based"
                name="based"
                type="text"
                required
                placeholder={t("placeholders.based")}
                className={fieldClass}
              />
            </div>

            <fieldset>
              <legend className={labelClass}>{t("fields.platforms")}</legend>
              <div className="grid sm:grid-cols-2 gap-2">
                {PLATFORMS.map((platform) => (
                  <label key={platform} className={checkboxLabelClass}>
                    <input
                      type="checkbox"
                      name="platform"
                      value={platform}
                      className={checkboxClass}
                    />
                    {t(`platforms.${platform}`)}
                  </label>
                ))}
              </div>
              <input
                name="platformOther"
                type="text"
                placeholder={t("placeholders.platformOther")}
                className={`${fieldClass} mt-2.5`}
              />
            </fieldset>

            <div>
              <label htmlFor="af-students" className={labelClass}>
                {t("fields.students")}
              </label>
              <select
                id="af-students"
                name="students"
                required
                defaultValue=""
                className={fieldClass}
              >
                <option value="" disabled>
                  {t("placeholders.students")}
                </option>
                {ROSTER_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {t(`rosterSizes.${size}`)}
                  </option>
                ))}
              </select>
            </div>

            <fieldset>
              <legend className={labelClass}>{t("fields.tracks")}</legend>
              <div className="flex flex-col gap-2">
                {TRACKS.map((track) => (
                  <label key={track} className={checkboxLabelClass}>
                    <input
                      type="checkbox"
                      name="track"
                      value={track}
                      className={checkboxClass}
                    />
                    {t(`tracks.${track}`)}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="af-linkedin" className={labelClass}>
                  {t("fields.linkedin")}
                </label>
                <input
                  id="af-linkedin"
                  name="linkedin"
                  type="text"
                  placeholder={t("placeholders.linkedin")}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="af-social" className={labelClass}>
                  {t("fields.social")}
                </label>
                <input
                  id="af-social"
                  name="social"
                  type="text"
                  placeholder={t("placeholders.social")}
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="af-reach" className={labelClass}>
                {t("fields.reach")}
              </label>
              <textarea
                id="af-reach"
                name="reach"
                rows={3}
                placeholder={t("placeholders.reach")}
                className={`${fieldClass} resize-y`}
              />
            </div>

            <div>
              <label htmlFor="af-built" className={labelClass}>
                {t("fields.built")}{" "}
                <span className="font-normal text-just_cod-gray/55">
                  {t("fields.optional")}
                </span>
              </label>
              <textarea
                id="af-built"
                name="built"
                rows={3}
                placeholder={t("placeholders.built")}
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
                {tHero("deadline")}
              </span>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
