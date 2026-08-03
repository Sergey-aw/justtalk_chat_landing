"use client";

import { useTranslations } from "next-intl";
import { Handshake, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DialogueAnimation } from "@/components/DialogueAnimation";
import { RolePlayCarousel } from "@/components/RolePlayCarousel";
import { AmbassadorApplyDialog } from "@/components/AmbassadorApplyDialog";
import { AmbassadorEarnings } from "@/components/AmbassadorEarnings";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AMBASSADOR_OFFER } from "@/lib/ambassador";

const SECTION = "w-full max-w-[1160px] mx-auto px-6";

const H2 =
  "text-2xl md:text-[27.8px] font-medium leading-[1.37] tracking-[-0.29px]";

/** The 10/10/10 cards rest on beige and bloom into colour on hover. */
const OFFER_CARDS = [
  { key: "takeRate", value: `${AMBASSADOR_OFFER.takeRate}%`, hover: "/bg_colored3_square.jpg" },
  { key: "weeks", value: `${AMBASSADOR_OFFER.weeks}`, hover: "/bg_green_square_.jpg" },
  { key: "freeLessons", value: `${AMBASSADOR_OFFER.freeLessons}`, hover: "/bg_colored4_square.jpg" },
] as const;

const TRACKS = [
  { key: "students", Icon: Users },
  { key: "teachers", Icon: Handshake },
  { key: "roleplays", Icon: Sparkles },
] as const;

const STEPS = ["apply", "setup", "invite", "teach"] as const;

const PERKS = ["offer", "pro", "spotlight", "directLine"] as const;

const WHO = ["teach", "connect", "build"] as const;

const FAQ = ["cost", "rate", "own", "following", "time", "ip"] as const;

export default function AmbassadorProgram() {
  const t = useTranslations("ambassadorPage");

  return (
    <div className="flex min-h-screen flex-col bg-just_white overflow-x-hidden">
      <Header />

      <main className="flex flex-col w-full">
        {/* Hero */}
        <section className={`${SECTION} pt-12 md:pt-18 pb-16 md:pb-24`}>
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 pl-2.5 pr-3 py-1.5 border border-just_cod-gray-10 rounded-full text-[11px] font-medium uppercase tracking-[0.025em] text-just_scorpion">
                <span className="w-1.5 h-1.5 rounded-full bg-just_cod-gray" />
                {t("hero.eyebrow")}
              </div>

              <h1 className="mt-5 text-[clamp(2.5rem,5.4vw,4rem)] font-medium leading-[0.93] tracking-[-0.0276em] text-just_cod-gray text-balance">
                {t("hero.headline")}
              </h1>

              <p className="mt-5 max-w-[30em] text-lg leading-[1.44] tracking-[-0.18px] text-just_cod-gray/70 text-pretty">
                {t("hero.subheadline")}
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <AmbassadorApplyDialog location="ambassador_hero">
                  <Button size="lg" className="cursor-pointer">
                    {t("hero.apply")}
                  </Button>
                </AmbassadorApplyDialog>
                <Button asChild size="lg" variant="outline" className="cursor-pointer">
                  <a href="#math">{t("hero.seeEarnings")}</a>
                </Button>
              </div>

              <p className="mt-4.5 text-[13px] tracking-[-0.14px] text-just_cod-gray/55">
                {t("hero.deadline")}
              </p>
            </div>

            <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden bg-[#FAFAFA] border border-just_cod-gray-5">
              <DialogueAnimation />
            </div>
          </div>
        </section>

        {/* The 10/10/10 offer */}
        <section className={`${SECTION} py-16 md:py-22`}>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <h2 className={`${H2} text-just_cod-gray`}>{t("offer.title")}</h2>
            <p className="max-w-[26em] text-base leading-[1.435] tracking-[-0.14px] text-just_cod-gray/70">
              {t("offer.description")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {OFFER_CARDS.map(({ key, value, hover }) => (
              <div
                key={key}
                className="group relative overflow-hidden rounded-xl p-6 text-just_cod-gray hover:text-just_white transition-colors duration-300"
              >
                <img
                  src="/bg_beige_square.jpg"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <img
                  src={hover}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="relative z-10 pointer-events-none flex flex-wrap items-baseline gap-2.5">
                  <div className="text-[clamp(3.5rem,6vw,5.25rem)] font-medium leading-[0.86] tracking-[-0.0206em] tabular-nums">
                    {value}
                  </div>
                  <div className="text-xl font-medium leading-[1.27] tracking-[-0.217px]">
                    {t(`offer.${key}.label`)}
                  </div>
                </div>
                <p className="relative z-10 pointer-events-none mt-3.5 text-sm leading-[1.2] tracking-[-0.14px]">
                  {t(`offer.${key}.description`, {
                    rate: AMBASSADOR_OFFER.takeRate,
                    keep: 100 - AMBASSADOR_OFFER.takeRate,
                    weeks: AMBASSADOR_OFFER.weeks,
                    lessons: AMBASSADOR_OFFER.freeLessons,
                  })}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Earnings calculator */}
        <section id="math" className={`${SECTION} scroll-mt-20 py-16 md:py-24`}>
          <AmbassadorEarnings />
        </section>

        {/* Three ways to take part */}
        <section className={`${SECTION} pt-6 pb-16 md:pb-24`}>
          <h2 className={`${H2} max-w-[22em] text-just_cod-gray text-balance`}>
            {t("tracks.title")}
          </h2>

          <div className="grid md:grid-cols-3 gap-5 mt-11">
            {TRACKS.map(({ key, Icon }) => (
              <div
                key={key}
                className="border border-just_cod-gray-10 rounded-3xl p-7 md:p-[30px] bg-just_white hover:bg-just_cod-gray-5 hover:border-just_black-15 transition-colors"
              >
                <Icon className="w-5.5 h-5.5 text-just_cod-gray" strokeWidth={1.75} />
                <h3 className="mt-5 text-[21.4px] font-medium leading-[1.267] tracking-[-0.0101em] text-just_cod-gray">
                  {t(`tracks.${key}.title`)}
                </h3>
                <p className="mt-2.5 text-base leading-[1.435] tracking-[-0.14px] text-just_cod-gray/70 text-pretty">
                  {t(`tracks.${key}.description`)}
                </p>
                <p className="mt-5 pt-4 border-t border-just_cod-gray-10 text-sm leading-[1.64] tracking-[-0.14px] text-just_cod-gray/55">
                  {t(`tracks.${key}.fit`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="w-full bg-just_cod-gray-5">
          <div className={`${SECTION} py-16 md:py-22`}>
            <h2 className={`${H2} text-just_cod-gray`}>{t("steps.title")}</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {STEPS.map((step, index) => (
                <div key={step} className="pt-5 border-t border-just_black-15">
                  <div className="text-[13px] tracking-[-0.14px] text-just_cod-gray/55 tabular-nums">
                    {t("steps.step", { number: index + 1 })}
                  </div>
                  <h3 className="mt-3 text-xl font-medium leading-[1.27] tracking-[-0.0101em] text-just_cod-gray">
                    {t(`steps.${step}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.64] tracking-[-0.14px] text-just_cod-gray/70">
                    {t(`steps.${step}.description`, {
                      lessons: AMBASSADOR_OFFER.freeLessons,
                      keep: 100 - AMBASSADOR_OFFER.takeRate,
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Role-plays */}
        <section className="relative w-full overflow-hidden bg-just_cod-gray text-just_white">
          <div
            className="absolute inset-0 bg-[#12B0BA] bg-cover bg-center"
            style={{ backgroundImage: "url('/bg_green_banner.webp')" }}
            aria-hidden="true"
          />
          <div className={`relative ${SECTION} pt-16 md:pt-22 pb-6`}>
            <div className="grid md:grid-cols-2 gap-8 items-end">
              <h2 className={`${H2} text-balance`}>{t("roleplays.title")}</h2>
              <p className="text-base leading-[1.435] tracking-[-0.14px] text-just_white/85 text-pretty">
                {t("roleplays.description")}
              </p>
            </div>
          </div>
          <div className="relative pt-8 pb-16 md:pb-22">
            <RolePlayCarousel />
          </div>
        </section>

        {/* Perks */}
        <section className={`${SECTION} py-16 md:py-24`}>
          <h2 className={`${H2} text-just_cod-gray`}>{t("perks.title")}</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 mt-11 -ml-px">
            {PERKS.map((perk) => (
              <div
                key={perk}
                className="bg-just_white px-6 pt-7 pb-8 border-t border-l border-just_cod-gray-10"
              >
                <h3 className="text-lg font-medium leading-[1.286] tracking-[-0.0098em] text-just_cod-gray">
                  {t(`perks.${perk}.title`, {
                    rate: AMBASSADOR_OFFER.takeRate,
                    weeks: AMBASSADOR_OFFER.weeks,
                  })}
                </h3>
                <p className="mt-2.5 text-sm leading-[1.64] tracking-[-0.14px] text-just_cod-gray/70">
                  {t(`perks.${perk}.description`, {
                    rate: AMBASSADOR_OFFER.takeRate,
                    weeks: AMBASSADOR_OFFER.weeks,
                    lessons: AMBASSADOR_OFFER.freeLessons,
                  })}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Who we're looking for */}
        <section className="w-full bg-just_cod-gray text-just_white">
          <div className={`${SECTION} py-16 md:py-22`}>
            <h2 className={H2}>{t("who.title")}</h2>

            <div className="grid md:grid-cols-3 gap-9 mt-12">
              {WHO.map((item) => (
                <div key={item}>
                  <h3 className="text-[21.4px] font-medium leading-[1.267] tracking-[-0.0101em]">
                    {t(`who.${item}.title`)}
                  </h3>
                  <p className="mt-2.5 text-base leading-[1.435] tracking-[-0.14px] text-just_white/70">
                    {t(`who.${item}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full max-w-[820px] mx-auto px-6 py-16 md:py-24">
          <h2 className={`${H2} text-just_cod-gray mb-8`}>{t("faq.title")}</h2>

          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((item) => (
              <AccordionItem key={item} value={item}>
                <AccordionTrigger className="text-base md:text-lg tracking-[-0.14px] text-just_cod-gray">
                  {t(`faq.${item}.question`)}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-[1.5] tracking-[-0.14px] text-just_cod-gray/70">
                  {t(`faq.${item}.answer`, {
                    rate: AMBASSADOR_OFFER.takeRate,
                    weeks: AMBASSADOR_OFFER.weeks,
                    lessons: AMBASSADOR_OFFER.freeLessons,
                  })}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Apply */}
        <section id="apply" className={`${SECTION} py-16 md:py-24`}>
          <div className="relative overflow-hidden rounded-2xl text-just_cod-gray">
            <img
              src="/bg_rose_banner.webp"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative px-6 py-20 md:py-24 text-center">
              <h2 className="mx-auto max-w-[20em] text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[0.93] tracking-[-0.0276em] text-balance">
                {t("cta.title")}
              </h2>
              <p className="mx-auto mt-5 max-w-[34em] text-lg leading-[1.44] tracking-[-0.18px] text-just_cod-gray/70">
                {t("cta.description")}
              </p>
              <div className="flex justify-center flex-wrap gap-3 mt-9">
                <AmbassadorApplyDialog location="ambassador_footer_cta">
                  <Button size="lg" className="cursor-pointer">
                    {t("cta.button")}
                  </Button>
                </AmbassadorApplyDialog>
              </div>
              <p className="mt-4.5 text-[13px] tracking-[-0.14px] text-just_cod-gray/55">
                {t("hero.deadline")}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
