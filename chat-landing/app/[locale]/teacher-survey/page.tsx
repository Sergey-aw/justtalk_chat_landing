import { Suspense } from "react";
import { Link } from "@/i18n/routing";
import { TeacherSurveyForm } from "@/components/TeacherSurveyForm";

/**
 * The teacher discovery survey.
 *
 * Sits under [locale] so it inherits the root layout, fonts and PostHog, but
 * carries no translations: the emails driving traffic here are English, and
 * free-text answers are worth far more when they all arrive in one language
 * somebody can actually read and code. `/teacher-survey` resolves to en-US
 * under the `as-needed` locale prefix, so that's the link to put in Loops.
 *
 * Chrome is deliberately stripped back to a logo — the site nav on a survey
 * page is just a set of exits.
 */
export default function TeacherSurveyPage() {
  return (
    <div className="min-h-screen bg-just_white">
      <div className="mx-auto max-w-[880px] px-5 sm:px-8 py-10 sm:py-16">
        <Link href="/" className="inline-block mb-12">
          {/* eslint-disable-next-line @next/next/no-img-element -- matches components/Header.tsx; the logo is a 2kb svg */}
          <img src="/logo.svg" alt="JustTalk" className="h-6 w-auto" />
        </Link>

        <Suspense fallback={null}>
          <TeacherSurveyForm />
        </Suspense>
      </div>
    </div>
  );
}
