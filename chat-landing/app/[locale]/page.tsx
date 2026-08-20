import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AgentDeck } from '@/components/AgentDeck';
import { PersonalityCarousel } from '@/components/PersonalityCarousel';
import { DialogueAnimation } from '@/components/DialogueAnimation';
import { TrackedLink } from '@/components/TrackedLink';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

const loopSteps = [
  { key: 'lesson', image: '/1-on-1-lesson.webp' },
  { key: 'practice', image: '/ai-mobile-app.webp' },
  { key: 'insights', image: '/insights.webp' },
] as const;

const loopNodes = ['lesson', 'practice', 'insights', 'next'] as const;

/** Rests on beige, blooms into colour on hover — same treatment as /creators. */
const pathCards = [
  {
    key: 'tutors',
    href: '/platform',
    eventName: 'cta_learn_platform_clicked',
    hover: '/bg_colored_square.jpg',
  },
  {
    key: 'ai',
    href: '/ai',
    eventName: 'cta_explore_justtalk_ai_clicked',
    hover: '/bg_colored4_square.jpg',
  },
] as const;

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  // Enable static rendering
  params.then(({ locale }) => setRequestLocale(locale));

  const t = useTranslations();

  return (
    <div className="flex min-h-screen flex-col bg-just_white">
      <Header />

      {/* Main Content */}
      <main className="flex flex-col items-center w-full">
        {/* Hero Section */}
        <section className="w-full max-w-[1320px] px-10 pt-12 md:pt-32 pb-8">
          <div className="flex flex-col gap-8">
            {/* Top Row: Text and Image */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Hero Text */}
              <div className="flex flex-col md:items-start items-center text-center md:text-left">
                <h1 className="text-4xl md:text-[64px] font-semibold md:leading-[59.29px] tracking-[-1.763px] text-just_cod-gray mb-0">
                  {t('hero.headline')}
                </h1>
                <div className="pt-8">
                  <p className="text-base md:text-[16.3px] font-normal leading-normal tracking-[-0.17px] text-just_cod-gray max-w-xl">
                    {t('hero.subheadline')}
                  </p>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative h-[440px] md:h-[480px] shrink-0 w-full max-w-[340px] md:max-w-[380px]">
                <AgentDeck />
              </div>
            </div>

            {/* CTA Buttons - Centered Below */}
            <div className="pt-8 flex justify-center">
              <div className="flex flex-col sm:flex-row gap-[17px] items-center">
                <TrackedLink
                  href="https://chat.justtalk.ai/welcome?ref=justtalk.ai"
                  target="_blank"
                  rel="noopener"
                  eventName="cta_start_now_clicked"
                  eventProperties={{ location: 'hero_section' }}
                  includePricingVariant={true}
                >
                  <Button className="cursor-pointer">
                    {t('hero.getStarted')}
                    <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                  </Button>
                </TrackedLink>
                <TrackedLink
                  href="https://apps.apple.com/app/id6760475574"
                  target="_blank"
                  rel="noopener"
                  eventName="cta_get_ios_app_clicked"
                  eventProperties={{ location: 'hero_section' }}
                >
                  <Button variant="outline" className="cursor-pointer">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                    </svg>
                    {t('hero.getIosApp')}
                  </Button>
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>

        {/* The Loop Section */}
        <section id="how-it-works" className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[27.8px] font-medium tracking-[-0.29px] text-just_cod-gray">
              {t('loop.title')}
            </h2>
            <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mt-2">
              {t('loop.description')}
            </p>
          </div>

          <div className="flex flex-col gap-16 md:gap-24">
            {loopSteps.map((step) => (
              <div key={step.key}>
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* Text */}
                  <div className="px-4 md:px-0 md:pr-8">
                    <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                      {t(`loop.steps.${step.key}.title`)}
                    </h3>
                    <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                      {t(`loop.steps.${step.key}.description`)}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="relative w-full aspect-[1618/990] rounded-2xl overflow-hidden">
                    <Image
                      src={step.image}
                      alt={t(`loop.steps.${step.key}.title`)}
                      fill
                      sizes="(min-width: 768px) 560px, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Compounding band */}
          <div className="mt-16 md:mt-24 bg-[#f8f6f0] rounded-2xl px-8 py-10 md:py-14">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-xl md:text-xl font-medium tracking-[-0.5px] text-just_cod-gray mb-2">
                {t('loop.compounding.title')}
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                {t('loop.compounding.description')}
              </p>
            </div>

            <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-3">
              {loopNodes.map((node, index) => (
                <div key={node} className="flex flex-col md:flex-row items-center gap-3">
                  <span
                    className={`rounded-xl px-4 py-3 text-sm font-medium tracking-[-0.14px] text-center ${
                      node === 'next'
                        ? 'bg-just_cod-gray text-just_white'
                        : 'bg-just_white text-just_cod-gray'
                    }`}
                  >
                    {t(`loop.compounding.nodes.${node}`)}
                  </span>
                  {index < loopNodes.length - 1 && (
                    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 shrink-0 text-just_scorpion rotate-90 md:rotate-0" aria-hidden="true">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <TrackedLink
                href="https://chat.justtalk.ai/welcome?ref=justtalk.ai"
                target="_blank"
                rel="noopener"
                eventName="cta_start_now_clicked"
                eventProperties={{ location: 'loop_section' }}
                includePricingVariant={true}
              >
                <Button className="cursor-pointer">
                  {t('hero.getStarted')}
                  <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                </Button>
              </TrackedLink>
            </div>
          </div>
        </section>

        {/* Practice detail */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[27.8px] font-medium tracking-[-0.29px] text-just_cod-gray">
              {t('practice.title')}
            </h2>
            <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mt-2">
              {t('practice.description')}
            </p>
          </div>

          {/* Different personalities */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-24">
            <div className="px-4 md:px-0 md:pr-8">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                {t('features.personalities.title')}
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                {t('features.personalities.description')}
              </p>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden aspect-square md:aspect-4/3">
              <img
                src="/bg_green_square_.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-10 w-full h-full flex items-center">
                <PersonalityCarousel />
              </div>
            </div>
          </div>

          {/* They remember you */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="px-4 md:px-0 md:pr-8">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                {t('features.memory.title')}
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                {t('features.memory.description')}
              </p>
            </div>

            <div className="relative w-full aspect-square md:aspect-4/3 rounded-2xl overflow-hidden">
              <DialogueAnimation />
            </div>
          </div>
        </section>

        {/* Two ways in */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[27.8px] font-medium tracking-[-0.29px] text-just_cod-gray">
              {t('paths.title')}
            </h2>
            <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mt-2">
              {t('paths.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {pathCards.map(({ key, href, eventName, hover }) => (
              <TrackedLink
                key={key}
                href={href}
                rel="noopener"
                eventName={eventName}
                eventProperties={{ location: 'paths_section' }}
                className="group relative flex flex-col overflow-hidden rounded-2xl p-8 text-just_cod-gray hover:text-just_white transition-colors duration-300"
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

                <h3 className="relative z-10 text-xl font-medium leading-[23.15px] tracking-[-0.177px] mb-2">
                  {t(`paths.${key}.title`)}
                </h3>
                <p className="relative z-10 text-base font-normal leading-[22.96px] tracking-[-0.14px] mb-6 grow">
                  {t(`paths.${key}.description`)}
                </p>
                <div className="relative z-10">
                  <Button variant="outline" asChild>
                    <span className="cursor-pointer text-just_cod-gray">
                      {t(`paths.${key}.cta`)}
                      <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
                    </span>
                  </Button>
                </div>
              </TrackedLink>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-[27.8px] font-medium tracking-[-0.29px] text-just_cod-gray">
              {t('faq.title')}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium text-just_cod-gray">
                  {t('faq.items.languageOnly.question')}
                </AccordionTrigger>
                <AccordionContent className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                  {t('faq.items.languageOnly.answer')}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium text-just_cod-gray">
                  {t('faq.items.notFor.question')}
                </AccordionTrigger>
                <AccordionContent className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                  <p className="mb-3">
                    {t('faq.items.notFor.answer1')}
                  </p>
                  <p>
                    {t('faq.items.notFor.answer2')}
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium text-just_cod-gray">
                  {t('faq.items.prepare.question')}
                </AccordionTrigger>
                <AccordionContent className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                  {t('faq.items.prepare.answer')}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-medium text-just_cod-gray">
                  {t('faq.items.lessonOrConversation.question')}
                </AccordionTrigger>
                <AccordionContent className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                  <p className="mb-3">
                    {t('faq.items.lessonOrConversation.answer1')}
                  </p>
                  <p>
                    {t('faq.items.lessonOrConversation.answer2')}
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-medium text-just_cod-gray">
                  {t('faq.items.grammar.question')}
                </AccordionTrigger>
                <AccordionContent className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                  {t('faq.items.grammar.answer')}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg font-medium text-just_cod-gray">
                  {t('faq.items.tutor.question')}
                </AccordionTrigger>
                <AccordionContent className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                  {t('faq.items.tutor.answer')}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-lg font-medium text-just_cod-gray">
                  {t('faq.items.cancel.question')}
                </AccordionTrigger>
                <AccordionContent className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                  {t('faq.items.cancel.answer')}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-lg font-medium text-just_cod-gray">
                  {t('faq.items.privacy.question')}
                </AccordionTrigger>
                <AccordionContent className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                  {t('faq.items.privacy.answer')}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
