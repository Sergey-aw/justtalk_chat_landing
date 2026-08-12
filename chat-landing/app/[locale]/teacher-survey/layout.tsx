import type { Metadata } from "next";

/**
 * Research instrument, not a landing page — it only ever reaches people we
 * emailed a link to, so it stays out of the index and out of the sitemap.
 */
export const metadata: Metadata = {
  title: "Help us build JustTalk for teachers",
  description:
    "A short survey for the teachers who signed up early. About four minutes.",
  robots: { index: false, follow: false },
};

export default function TeacherSurveyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
