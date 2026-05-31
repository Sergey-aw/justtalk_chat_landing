"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrackedLink } from "@/components/TrackedLink";
import { IELTSReport } from "@/components/IELTSReport";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
import {
  Mic,
  ClipboardCheck,
  ListChecks,
  BookOpen,
  Target,
  Check,
  X,
  Timer,
  MessageSquareText,
  Dumbbell,
} from "lucide-react";

const MOCK_TEST_URL = "https://chat.justtalk.ai/welcome?ref=justtalk.ai";

export default function Ielts() {
  const t = useTranslations("ieltsPage");

  return (
    <div className="flex min-h-screen flex-col bg-just_white">
      <Header />

      <main className="flex flex-col items-center w-full">
        {/* Hero Section */}
        <section className="w-full max-w-[1320px] px-10 pt-8 md:pt-16 pb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Hero Text */}
            <div className="flex flex-col md:items-start items-center text-center md:text-left max-w-2xl">
              <h1 className="text-4xl md:text-[64px] font-semibold md:leading-[59.29px] tracking-[-1.763px] text-just_cod-gray mb-0">
                {t("hero.headline")}
              </h1>
              <p className="pt-8 text-base md:text-[16.3px] font-normal leading-normal tracking-[-0.17px] text-just_cod-gray">
                {t("hero.subheadline")}
              </p>
              <div className="pt-8 flex flex-col sm:flex-row gap-[17px] items-center">
                <div className="flex flex-col items-center sm:items-start gap-2">
                  <TrackedLink
                    href={MOCK_TEST_URL}
                    target="_blank"
                    rel="noopener"
                    eventName="cta_ielts_mock_clicked"
                    eventProperties={{ location: "ielts_hero" }}
                    includePricingVariant={true}
                  >
                    <Button className="cursor-pointer w-full">
                      {t("hero.cta")}
                      <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                    </Button>
                  </TrackedLink>
                  <p className="text-xs text-just_cod-gray/70">{t("hero.ctaNote")}</p>
                </div>
              </div>
            </div>

            {/* Hero Visual — mobile app */}
            <div className="relative w-full md:max-w-[520px] shrink-0 flex justify-center">
              <img
                src="/ielts_mob.webp"
                alt="JustTalk IELTS Speaking mock test on mobile"
                className="w-auto h-auto max-h-[340px] md:max-h-[560px]"
                fetchPriority="high"
              />
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: t("stats.mockValue"), l: t("stats.mockLabel") },
              { v: t("stats.partsValue"), l: t("stats.partsLabel") },
              { v: t("stats.criteriaValue"), l: t("stats.criteriaLabel") },
              { v: t("stats.dailyValue"), l: t("stats.dailyLabel") },
            ].map((s) => (
              <div key={s.l} className="bg-gray-50 rounded-2xl p-6">
                <div className="text-2xl md:text-[28px] font-semibold tracking-[-0.29px] text-just_cod-gray leading-tight">
                  {s.v}
                </div>
                <div className="mt-1 text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/75">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Two AI roles */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-[27.8px] font-medium tracking-[-0.29px] text-just_cod-gray max-w-2xl mx-auto">
              {t("roles.title")}
            </h2>
            <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4 mt-2 max-w-2xl mx-auto">
              {t("roles.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Examiner */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#1E8FFF]/10 flex items-center justify-center">
                  <Mic className="w-5 h-5 text-[#1E8FFF]" strokeWidth={2} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-just_scorpion">
                  {t("roles.examinerTag")}
                </span>
              </div>
              <h3 className="text-xl font-medium leading-[27.11px] tracking-[-0.217px] text-just_cod-gray">
                {t("roles.examinerTitle")}{" "}
                <span className="text-just_cod-gray/50 font-normal">· {t("roles.examinerRole")}</span>
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/75 mt-2 mb-6">
                {t("roles.examinerPitch")}
              </p>
              <ul className="space-y-4">
                {[
                  { n: "P1", title: t("roles.p1Title"), desc: t("roles.p1Desc") },
                  { n: "P2", title: t("roles.p2Title"), desc: t("roles.p2Desc") },
                  { n: "P3", title: t("roles.p3Title"), desc: t("roles.p3Desc") },
                ].map((p) => (
                  <li key={p.n} className="flex gap-3">
                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#1E8FFF]/10 text-[#0A6FE3] text-xs font-bold flex items-center justify-center">
                      {p.n}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-just_cod-gray">{p.title}</div>
                      <div className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/75">
                        {p.desc}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-3 rounded-xl bg-white border border-just_black-5 p-4">
                <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                <p className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/80">
                  {t("roles.examinerCallout")}
                </p>
              </div>
            </div>

            {/* Coach */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#1E8FFF]/10 flex items-center justify-center">
                  <ClipboardCheck className="w-5 h-5 text-[#1E8FFF]" strokeWidth={2} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-just_scorpion">
                  {t("roles.coachTag")}
                </span>
              </div>
              <h3 className="text-xl font-medium leading-[27.11px] tracking-[-0.217px] text-just_cod-gray">
                {t("roles.coachTitle")}{" "}
                <span className="text-just_cod-gray/50 font-normal">· {t("roles.coachRole")}</span>
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/75 mt-2 mb-6">
                {t("roles.coachPitch")}
              </p>
              <ul className="space-y-4">
                {[
                  { icon: ListChecks, title: t("roles.aTitle"), desc: t("roles.aDesc") },
                  { icon: BookOpen, title: t("roles.bTitle"), desc: t("roles.bDesc") },
                  { icon: Target, title: t("roles.cTitle"), desc: t("roles.cDesc") },
                ].map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <li key={i} className="flex gap-3">
                      <span className="shrink-0 w-8 h-8 rounded-lg bg-[#1E8FFF]/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#0A6FE3]" strokeWidth={2} />
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-just_cod-gray">{c.title}</div>
                        <div className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/75">
                          {c.desc}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Frameworks */}
          <div className="relative mt-6 rounded-2xl p-6 overflow-hidden border border-just_cod-gray-10">
            <img src="/bg_beige_square.jpg" alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-just_scorpion shrink-0">
                {t("roles.frameworksLabel")}
              </span>
              <div className="flex flex-wrap gap-2">
                {[t("roles.fw1"), t("roles.fw2"), t("roles.fw3")].map((fw) => (
                  <span
                    key={fw}
                    className="text-sm font-medium px-3 py-1.5 rounded-full bg-just_cod-gray text-white"
                  >
                    {fw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feedback */}
        <section id="feedback" className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-[27.8px] font-medium tracking-[-0.29px] text-just_cod-gray max-w-2xl mx-auto">
              {t("feedback.title")}
            </h2>
            <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4 mt-2 max-w-2xl mx-auto">
              {t("feedback.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Band report */}
            <div className="relative w-full aspect-square md:aspect-4/3 rounded-2xl overflow-hidden bg-gray-50 border border-just_black-5">
              <IELTSReport />
            </div>

            {/* Vague → specific examples */}
            <div className="px-0 md:px-4 space-y-4">
              {[
                { vague: t("feedback.ex1Vague"), good: t("feedback.ex1Good") },
                { vague: t("feedback.ex2Vague"), good: t("feedback.ex2Good") },
                { vague: t("feedback.ex3Vague"), good: t("feedback.ex3Good") },
              ].map((ex, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-5">
                  <p className="text-sm italic text-just_cod-gray/50 mb-2">“{ex.vague}”</p>
                  <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray flex gap-2">
                    <span className="text-[#1E8FFF] font-semibold shrink-0">→</span>
                    <span>{ex.good}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Daily routine */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-[27.8px] font-medium tracking-[-0.29px] text-just_cod-gray max-w-2xl mx-auto">
              {t("routine.title")}
            </h2>
            <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4 mt-2 max-w-2xl mx-auto">
              {t("routine.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Mic, n: 1, title: t("routine.step1Title"), min: t("routine.step1Min"), desc: t("routine.step1Desc") },
              { icon: MessageSquareText, n: 2, title: t("routine.step2Title"), min: t("routine.step2Min"), desc: t("routine.step2Desc") },
              { icon: Dumbbell, n: 3, title: t("routine.step3Title"), min: t("routine.step3Min"), desc: t("routine.step3Desc") },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.n} className="bg-gray-50 rounded-2xl p-6 md:p-8">
                  <Icon className="w-6 h-6 text-[#1E8FFF] mb-3" strokeWidth={2} />
                  <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                    {s.title}
                  </h3>
                  <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/75">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Timer className="w-5 h-5 text-[#1E8FFF]" strokeWidth={2} />
              <div>
                <div className="text-base font-semibold text-just_cod-gray">{t("routine.total")}</div>
                <div className="text-sm font-normal tracking-[-0.14px] text-just_cod-gray/75">{t("routine.totalNote")}</div>
              </div>
            </div>
            <TrackedLink
              href={MOCK_TEST_URL}
              target="_blank"
              rel="noopener"
              eventName="cta_ielts_mock_clicked"
              eventProperties={{ location: "ielts_routine" }}
              includePricingVariant={true}
            >
              <Button className="cursor-pointer">
                {t("hero.cta")}
                <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
              </Button>
            </TrackedLink>
          </div>
        </section>

        {/* Comparison */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-[27.8px] font-medium tracking-[-0.29px] text-just_cod-gray max-w-2xl mx-auto">
              {t("compare.title")}
            </h2>
            <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4 mt-2 max-w-2xl mx-auto">
              {t("compare.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {/* Free */}
            <div className="relative border border-just_cod-gray-10 rounded-xl p-6 md:p-8 overflow-hidden">
              <img src="/bg_beige_square.jpg" alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
              <div className="relative z-10">
                <div className="text-base font-semibold text-just_cod-gray mb-4">{t("compare.freeName")}</div>
                <ul className="space-y-3">
                  <li className="flex gap-2.5 text-sm leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/80">
                    <Check className="w-4 h-4 text-green-600 shrink-0 mt-1" strokeWidth={2.5} />
                    <span>{t("compare.freePro")}</span>
                  </li>
                  <li className="flex gap-2.5 text-sm leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/80">
                    <X className="w-4 h-4 text-just_cod-gray/40 shrink-0 mt-1" strokeWidth={2.5} />
                    <span>{t("compare.freeCon1")}</span>
                  </li>
                  <li className="flex gap-2.5 text-sm leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/80">
                    <X className="w-4 h-4 text-just_cod-gray/40 shrink-0 mt-1" strokeWidth={2.5} />
                    <span>{t("compare.freeCon2")}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* JustTalk — featured */}
            <div className="relative border-2 border-just_cod-gray rounded-xl p-6 md:p-8 overflow-hidden">
              <img src="/bg_beige_square.jpg" alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-base font-semibold text-just_cod-gray">{t("compare.jtName")}</div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-just_cod-gray text-white">
                    {t("compare.jtBadge")}
                  </span>
                </div>
                <ul className="space-y-3">
                  <li className="flex gap-2.5 text-sm leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/80">
                    <Check className="w-4 h-4 text-green-600 shrink-0 mt-1" strokeWidth={2.5} />
                    <span>{t("compare.jtPro1")}</span>
                  </li>
                  <li className="flex gap-2.5 text-sm leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/80">
                    <Check className="w-4 h-4 text-green-600 shrink-0 mt-1" strokeWidth={2.5} />
                    <span>{t("compare.jtPro2")}</span>
                  </li>
                  <li className="flex gap-2.5 text-sm leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/80">
                    <X className="w-4 h-4 text-just_cod-gray/40 shrink-0 mt-1" strokeWidth={2.5} />
                    <span>{t("compare.jtCon")}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Tutor */}
            <div className="relative border border-just_cod-gray-10 rounded-xl p-6 md:p-8 overflow-hidden">
              <img src="/bg_beige_square.jpg" alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
              <div className="relative z-10">
                <div className="text-base font-semibold text-just_cod-gray mb-4">{t("compare.tutorName")}</div>
                <ul className="space-y-3">
                  <li className="flex gap-2.5 text-sm leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/80">
                    <Check className="w-4 h-4 text-green-600 shrink-0 mt-1" strokeWidth={2.5} />
                    <span>{t("compare.tutorPro")}</span>
                  </li>
                  <li className="flex gap-2.5 text-sm leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/80">
                    <X className="w-4 h-4 text-just_cod-gray/40 shrink-0 mt-1" strokeWidth={2.5} />
                    <span>{t("compare.tutorCon1")}</span>
                  </li>
                  <li className="flex gap-2.5 text-sm leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/80">
                    <X className="w-4 h-4 text-just_cod-gray/40 shrink-0 mt-1" strokeWidth={2.5} />
                    <span>{t("compare.tutorCon2")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-[27.8px] font-medium tracking-[-0.29px] text-just_cod-gray">
              {t("faq.title")}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[1, 2, 3, 4, 5].map((i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-lg font-medium text-just_cod-gray">
                    {t(`faq.q${i}`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                    {t(`faq.a${i}`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full max-w-[1186px] px-10 py-16">
          <div className="bg-[#f8f6f0] rounded-2xl px-8 py-16 text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-just_cod-gray text-sm font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              {t("cta.badge")}
            </span>
            <h2 className="text-2xl md:text-[27.3px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray max-w-2xl">
              {t("cta.title")}
            </h2>
            <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/75 mt-3 max-w-xl">
              {t("cta.description")}
            </p>
            <div className="mt-8">
              <TrackedLink
                href={MOCK_TEST_URL}
                target="_blank"
                rel="noopener"
                eventName="cta_ielts_mock_clicked"
                eventProperties={{ location: "ielts_final_cta" }}
                includePricingVariant={true}
              >
                <Button className="cursor-pointer">
                  {t("cta.button")}
                  <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                </Button>
              </TrackedLink>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-8 text-xs leading-relaxed text-just_cod-gray/50 text-center max-w-3xl mx-auto">
            {t("disclaimer")}
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
