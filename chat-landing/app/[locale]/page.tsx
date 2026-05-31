import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PersonalityCarousel } from '@/components/PersonalityCarousel';
import { HeroCarousel } from '@/components/HeroCarousel';
import { DialogueAnimation } from '@/components/DialogueAnimation';
import { RolePlayCarousel } from '@/components/RolePlayCarousel';
import { RolePlaySeries } from '@/components/RolePlaySeries';
import { PricingSection } from '@/components/PricingSection';
import { Conversation } from '@/components/Conversation';
import { ProgressChart } from '@/components/ProgressChart';
import { TrackedLink } from '@/components/TrackedLink';
import { CircularRotation } from '@/components/CircularRotation';
import { PlatformMedia } from '@/components/PlatformMedia';
import { IELTSReport } from '@/components/IELTSReport';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

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
              <div className="relative h-[325px] md:h-[400px] shrink-0 w-full md:max-w-[500px]">
                <HeroCarousel />
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

        {/* Platform Section */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-[27.8px] font-medium tracking-[-0.29px] text-just_cod-gray">
              {t('platform.title')}
            </h2>
             <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4 mt-2 max-w-2xl mx-auto">
                {t('platform.description')}
              </p>
          </div>
          
          <PlatformMedia />
        </section>

        {/* Features Section */}
        <section id="features" className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-[28px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray">
              {t('features.exploreMore')}
            </h2>
          </div>

          {/* Feature 1 - Learning Loop */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
            <div className="px-4 md:px-20">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                {t('features.improvement.title')}
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                {t('features.improvement.description')}
              </p>
            </div>
            
            {/* Circular Rotation */}
            <div className="relative w-full rounded-2xl overflow-hidden aspect-square md:aspect-4/3">
              <img 
                src="/bg_color_rotating.webp" 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                <CircularRotation />
              </div>
            </div>
          </div>

          {/* Feature 2 - Tutors Carousel */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
            <div className="px-4 md:px-20">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                {t('features.personalities.title')}
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                {t('features.personalities.description')}
              </p>
              
            </div>
            
            {/* Tutors Carousel */}
            <div className="relative w-full rounded-2xl overflow-hidden aspect-square md:aspect-4/3">
              <img 
                src="/bg_green_square_.jpg" 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-10 w-full h-full flex items-center p-0 md:p-0">
                <PersonalityCarousel />
              </div>
            </div>
          </div>

          {/* Feature 3 - Memory */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
            <div className="px-4 md:px-20">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                {t('features.memory.title')}
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                {t('features.memory.description')}
              </p>
             
            </div>
            <div className="relative w-full aspect-square md:aspect-4/3 rounded-2xl overflow-hidden">
              <DialogueAnimation />
            </div>
          </div>

          {/* Feature 4 - Role Play Scenarios */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
            <div className="px-4 md:px-20">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                {t('features.scenarios.title')}
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                {t('features.scenarios.description')}
              </p>
              
            </div>
            
            {/* Role Play Carousel */}
            <div className="relative w-full aspect-square md:aspect-4/3 rounded-2xl overflow-hidden">
              <img 
                src="/bg_colored_square.jpg" 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-10 w-full h-full flex items-center p-0">
                <RolePlayCarousel />
              </div>
            </div>
          </div>

          {/* Feature - IELTS Speaking */}
          <div id="ielts" className="grid md:grid-cols-2 gap-8 items-center mb-24">
            <div className="px-4 md:px-20">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                {t('ielts.feature.title')}
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                {t('ielts.feature.description')}
              </p>
            </div>

            {/* IELTS Speaking band report */}
            <div className="relative w-full aspect-square md:aspect-4/3 rounded-2xl overflow-hidden bg-gray-50 border border-just_black-5">
              <IELTSReport />
            </div>
          </div>

          {/* Feature 5 - Role Play Series */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
            <div className="px-4 md:px-20">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                {t('features.roleplay.title')}
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                {t('features.roleplay.description')}
              </p>
              
            </div>
            
            {/* Role Play Series */}
            <div className="relative w-full aspect-square md:aspect-4/3 rounded-2xl overflow-hidden">
              <img 
                src="/bg_colored_orange.jpg" 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-10 w-full h-full flex items-center p-0 pt-3">
                <RolePlaySeries />
              </div>
            </div>
          </div>

          {/* Feature 6 - Personalized Scenarios */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
            <div className="px-4 md:px-20">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                {t('features.personalized.title')}
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                {t('features.personalized.description')}
              </p>
              
            </div>
            
            {/* Personalized Scenarios Image */}
            <div className="relative w-full aspect-square md:aspect-4/3 rounded-2xl overflow-hidden">
              <img 
                src="/personalized_agent.webp" 
                alt="Personalized scenarios" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Feature 7 - Progress Tracking */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="px-4 md:px-20">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                {t('features.progress.title')}
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                {t('features.progress.description')}
              </p>
              
            </div>
            
            {/* Progress Chart */}
            <div className="relative w-full aspect-square md:aspect-4/3 rounded-2xl overflow-hidden bg-gray-50 border border-just_black-5 p-0">
              <ProgressChart />
            </div>
          </div>
        </section>

           {/* Pricing Section */}
        <PricingSection />

        {/* AI to Tutors Section */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">

            <div className="text-center mb-16">
            <h2 className="text-2xl md:text-[27.8px] font-medium tracking-[-0.29px] text-just_cod-gray">
              {t('tutors.title')}
            </h2>
             <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4 mt-2 max-w-2xl mx-auto">
                {t('tutors.description')}
              </p>
          </div>

          <div className="bg-[#f8f6f0] rounded-2xl px-8 py-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Image */}
              <div className="relative w-full aspect-3/2 rounded-2xl overflow-hidden">
                <img 
                  src="/hero_blue_2.jpg" 
                  alt="JustTalk AI Platform connecting to tutors" 
                  className="object-cover h-full w-full"
                  fetchPriority="high"
                />
              </div>

              {/* Text Content - 3 Sections */}
              <div className="px-4 md:px-0 space-y-12">
            

              {/* Section 3 */}
              <div>
                <h3 className="text-xl md:text-xl font-medium tracking-[-0.5px] text-just_cod-gray mb-1">
                  {t('tutors.liveTutoring.title')}
                </h3>
                <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-6">
                  {t('tutors.liveTutoring.description')}
                </p>
                <TrackedLink
                  href="/platform"
                  rel="noopener"
                  eventName="cta_learn_platform_clicked"
                  eventProperties={{ location: 'ai_tutors_section' }}
                >
                  <Button variant="outline" className="cursor-pointer">
                    {t('tutors.learnPlatform')}
                    <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
                  </Button>
                </TrackedLink>
              </div>
            </div>
          </div>
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
