import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { InterviewHero } from '@/components/InterviewHero';

export const metadata: Metadata = {
  title: 'Interview Prep in English — JustTalk',
  description:
    'Rehearse your job interview in English with an AI interviewer, then get a live mock interview reviewed by an expert.',
  // Out of search while the hero is an experiment; index it once a variant wins.
  robots: { index: false, follow: true },
};

export default async function InterviewPrepPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col bg-just_white">
      <Header />
      <main className="flex flex-col items-center w-full">
        <InterviewHero />
      </main>
      <Footer />
    </div>
  );
}
