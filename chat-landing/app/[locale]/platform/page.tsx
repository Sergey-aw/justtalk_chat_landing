"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TutorsCarousel } from '@/components/TutorsCarousel';
import { ProgressChart } from '@/components/ProgressChart';
import { WaitlistDialog } from '@/components/WaitlistDialog';
import { TrackedLink } from '@/components/TrackedLink';
import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Fullscreen, User, TrendingUp, Brain, MessageCircle, Shuffle, BarChart3 } from 'lucide-react';

export default function Platform() {
  const t = useTranslations('platformPage');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("students");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } 
      else if ((video as any).webkitEnterFullscreen) {
        (video as any).webkitEnterFullscreen();
      }
      else if ((video as any).webkitRequestFullscreen) {
        (video as any).webkitRequestFullscreen();
      }
    }
  };

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
              <div className="flex flex-col items-start max-w-2xl">
                <h1 className="text-4xl md:text-[64px] font-semibold tracking-tight text-just_cod-gray mb-0 text-center md:text-left md:leading-16">
                  {t('hero.headline')}
                </h1>
                <div className="pt-8">
                  <p className="text-base md:text-[16.3px] font-normal leading-normal tracking-[-0.17px] text-just_cod-gray">
                    {t('hero.subheadline')}
                  </p>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative w-auto md:w-150 lg:w-175 shrink-0 rounded-2xl overflow-hidden">
                <img 
                  src="/hero_blue_2.jpg" 
                  alt="JustTalk Platform" 
                  className="w-full object-cover aspect-16/10 md:aspect-auto"
                  fetchPriority="high"
                />
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="pt-8 flex justify-center">
              <div className="flex flex-col sm:flex-row gap-[17px] items-center">
                <div className="flex flex-col items-center gap-2 max-w-[240px]">
                  <WaitlistDialog>
                    <Button className="cursor-pointer w-full">
                      {t('cta.joinWaitlist')}
                      <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                    </Button>
                  </WaitlistDialog>
                  <p className="text-xs text-just_cod-gray/70 text-center">{t('cta.earlyAccess')}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <a href="/becometeacher" rel="noopener">
                    <Button variant="outline" className="cursor-pointer">
                      {t('cta.becomeTeacher')}
                      <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
                    </Button>
                  </a>
                  <p className="text-sm text-transparent select-none whitespace-nowrap">Placeholder</p>
                </div>
              </div>
            </div>
          </div> 
        </section>

        {/* Platform Section */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-[27.8px] font-medium tracking-[-0.29px] text-just_cod-gray max-w-lg mx-auto">
              {t('seamless.title')}
            </h2>
          </div>
          
          <div className="relative w-full rounded-2xl overflow-hidden">
            <img 
              src="/platform_blue_16x9.jpg" 
              alt="JustTalk Platform" 
              className={`w-full h-auto aspect-4/3 md:aspect-auto object-cover transition-opacity duration-300 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
            />
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setIsVideoLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
              <source src="/platform_1080p_25fps.mp4" type="video/mp4" />
            </video>
            <button
              onClick={handleFullscreen}
              className="md:hidden absolute bottom-1 right-1 p-1 text-white hover:opacity-80 transition-opacity"
              aria-label="Fullscreen"
            >
              <Fullscreen className="w-6 h-6" />
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full max-w-[1186px] px-10 py-16 md:py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-[28px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray">
              {t('exploreFeatures')}
            </h2>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="students">{t('tabs.students')}</TabsTrigger>
              <TabsTrigger value="teachers">{t('tabs.teachers')}</TabsTrigger>
            </TabsList>

            <TabsContent value="students" className="mt-0">
              <motion.div
                key="students"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {/* Feature 1 - Speak with a live tutor */}
                <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
                  <div className="px-4 md:px-20">
                    <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                      {t('students.speakWithTutor.title')}
                    </h3>
                    <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                      {t('students.speakWithTutor.description')}
                    </p>
                  </div>
                  
                  <div className="relative w-full rounded-2xl overflow-hidden aspect-square md:aspect-4/3">
                    <img 
                      src="/platform_feature_1.jpg" 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Feature 2 - Progress stays */}
                <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
                  <div className="px-4 md:px-20">
                    <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                      {t('students.progressStays.title')}
                    </h3>
                    <div className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                      <p>{t('students.progressStays.description')}</p>
                      <p className="mb-3">{t('students.progressStays.description2')}</p>
                      <ul className="list-none space-y-0 ml-0">
                        <li>- {t('students.progressStays.bullet1')}</li>
                        <li>- {t('students.progressStays.bullet2')}</li>
                        <li>- {t('students.progressStays.bullet3')}</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="relative w-full rounded-2xl overflow-hidden aspect-square md:aspect-4/3">
                    <img 
                      src="/bg_green_square_.jpg" 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="relative z-10 w-full h-full flex items-center p-0">
                      <TutorsCarousel />
                    </div>
                  </div>
                </div>

                {/* Feature 3 - Speaking first */}
                <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
                  <div className="px-4 md:px-20">
                    <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                      {t('students.speakingFirst.title')}
                    </h3>
                    <div className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                      <p className="mb-3">{t('students.speakingFirst.description')}</p>
                      <ul className="list-none space-y-0 ml-0">
                        <li>- {t('students.speakingFirst.bullet1')}</li>
                        <li>- {t('students.speakingFirst.bullet2')}</li>
                        <li>- {t('students.speakingFirst.bullet3')}</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="relative w-full aspect-square md:aspect-4/3 rounded-2xl overflow-hidden">
                    <img 
                      src="/speaking_first_orange2.jpg" 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Feature 4 - Progress Tracking */}
                <div className="grid md:grid-cols-2 gap-8 items-center mb-0">
                  <div className="px-4 md:px-20">
                    <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                      {t('students.trackProgress.title')}
                    </h3>
                    <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                      {t('students.trackProgress.description')}
                    </p>
                  </div>
                  
                  <div className="relative w-full aspect-square md:aspect-4/3 rounded-2xl overflow-hidden bg-gray-50 border border-just_black-5 p-0">
                    <ProgressChart />
                  </div>
                </div>

                {/* How it works */}
                <div className="mt-24">
                  <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-[28px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray">
                      {t('howItWorks.title')}
                    </h2>
                    <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4 mt-2 max-w-2xl mx-auto">
                      {t('howItWorks.description')}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                      <div className="mb-4">
                        <TrendingUp className="w-6 h-6 text-pink-500" strokeWidth={2} />
                      </div>
                      <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                        {t('howItWorks.cards.personalization.title')}
                      </h3>
                      <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                        {t('howItWorks.cards.personalization.description')}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                      <div className="mb-4">
                        <BarChart3 className="w-6 h-6 text-orange-500" strokeWidth={2} />
                      </div>
                      <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                        {t('howItWorks.cards.cefr.title')}
                      </h3>
                      <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                        {t('howItWorks.cards.cefr.description')}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                      <div className="mb-4">
                        <User className="w-6 h-6 text-yellow-500" strokeWidth={2} />
                      </div>
                      <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                        {t('howItWorks.cards.smarterTutoring.title')}
                      </h3>
                      <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                        {t('howItWorks.cards.smarterTutoring.description')}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                      <div className="mb-4">
                        <MessageCircle className="w-6 h-6 text-blue-500" strokeWidth={2} />
                      </div>
                      <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                        {t('howItWorks.cards.aiRemembers.title')}
                      </h3>
                      <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                        {t('howItWorks.cards.aiRemembers.description')}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                      <div className="mb-4">
                        <Shuffle className="w-6 h-6 text-purple-500" strokeWidth={2} />
                      </div>
                      <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                        {t('howItWorks.cards.integration.title')}
                      </h3>
                      <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                        {t('howItWorks.cards.integration.description')}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                      <div className="mb-4">
                        <Brain className="w-6 h-6 text-indigo-500" strokeWidth={2} />
                      </div>
                      <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                        {t('howItWorks.cards.visualize.title')}
                      </h3>
                      <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                        {t('howItWorks.cards.visualize.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="teachers" className="mt-0">
              <motion.div
                key="teachers"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {/* AI Insights */}
                <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
                  <div className="px-4 md:px-20">
                    <div className="flex items-start gap-3 mb-2">
                      <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray">
                        {t('teachers.aiAssistant.title')}
                      </h3>
                      <span className="bg-gray-800 text-white/90 text-xs font-medium px-2 py-1 rounded">beta</span>
                    </div>
                    <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                      {t('teachers.aiAssistant.description')}
                    </p>
                  </div>
                  
                  <div className="relative w-full rounded-2xl overflow-hidden aspect-4/3 md:aspect-4/3 border border-gray-100">
                    <img 
                      src="/tutors_insights.jpg" 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Custom Scenarios */}
                <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
                  <div className="px-4 md:px-20">
                    <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                      {t('teachers.customScenarios.title')}
                    </h3>
                    <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                      {t('teachers.customScenarios.description')}
                    </p>
                  </div>
                  
                  <div className="relative w-full rounded-2xl overflow-hidden aspect-square md:aspect-4/3">
                    <picture>
                      <source media="(min-width: 768px)" srcSet="/agent_create.webp" />
                      <img 
                        src="/agent_create_mob.webp" 
                        alt="Create customized agent" 
                        className="absolute inset-0 w-full h-full object-cover"
                        fetchPriority="high"
                      />
                    </picture>
                  </div>
                </div>

                {/* Visual Flow */}
                <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
                  <div className="px-4 md:px-20">
                    <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                      {t('teachers.visualFlow.title')}
                    </h3>
                    <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                      {t('teachers.visualFlow.description')}
                    </p>
                  </div>
                  
                  <div className="relative w-full rounded-2xl overflow-hidden aspect-square md:aspect-4/3">
                    <img 
                      src="/promt-engine.webp" 
                      alt="Prompt-to-scenario engine" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Teach Online */}
                <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
                  <div className="px-4 md:px-20">
                    <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                      {t('teachers.teachOnline.title')}
                    </h3>
                    <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                      {t('teachers.teachOnline.description')}
                    </p>
                    <div className="pt-4">
                      <TrackedLink href="https://app.justtalk.ai/signup" eventName="apply_to_become_tutor_clicked">
                        <Button className="cursor-pointer w-fit">
                          {t('teachers.teachOnline.cta')}
                          <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                        </Button>
                      </TrackedLink>
                    </div>
                  </div>
                  
                  <div className="relative w-full rounded-2xl overflow-hidden aspect-square md:aspect-4/3">
                    <img 
                      src="/teachers_1.jpg" 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Friction Section - Students only */}
        {activeTab === "students" && (
          <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-[27.8px] font-medium tracking-[-0.29px] text-just_cod-gray mb-4">
                {t('friction.title')}
              </h2>
              <p className="text-base md:text-[16.3px] font-normal leading-normal tracking-[-0.17px] text-just_cod-gray max-w-3xl mx-auto">
                {t('friction.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative w-full rounded-2xl overflow-hidden aspect-4/3">
                <img 
                  src="/bg_platforms1.jpg" 
                  alt="Traditional tutoring platforms" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="px-4 md:px-8 space-y-8">
                <div>
                  <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                    {t('friction.items.level.title')}
                  </h3>
                  <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/75">
                    {t('friction.items.level.description')}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                    {t('friction.items.goals.title')}
                  </h3>
                  <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/75">
                    {t('friction.items.goals.description')}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                    {t('friction.items.warmups.title')}
                  </h3>
                  <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/75">
                    {t('friction.items.warmups.description')}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                    {t('friction.items.reset.title')}
                  </h3>
                  <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/75">
                    {t('friction.items.reset.description')}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section - Teachers */}
        {activeTab === "teachers" && (
          <section className="w-full max-w-[1186px] px-10 py-16">
            <div className="bg-[#f8f6f0] rounded-2xl px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <h2 className="text-2xl md:text-[27.3px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray max-w-md">
                {t('ctaSection.joinFirst')}
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="cursor-pointer">
                  {t('ctaSection.tryTutors')}
                  <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                </Button>
                <TrackedLink
                  href="https://cal.com/justtalk/demo"
                  eventName="cta_book_demo_clicked"
                  eventProperties={{ location: 'platform_page' }}
                >
                  <Button variant="outline" className="cursor-pointer">
                    {t('ctaSection.bookDemo')}
                    <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
                  </Button>
                </TrackedLink>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section - Students */}
        {activeTab === "students" && (
          <section className="w-full max-w-[1186px] px-10 py-16">
            <div className="bg-[#f8f6f0] rounded-2xl px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <h2 className="text-2xl md:text-[27.3px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray max-w-md">
                {t('ctaSection.joinFirst')}
              </h2>
              <div className="space-y-2">
                <WaitlistDialog>
                  <Button className="cursor-pointer w-fit">
                    {t('ctaSection.joinWaitlist')}
                    <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                  </Button>
                </WaitlistDialog>
                <p className="text-xs text-just_cod-gray/70 text-center">{t('cta.earlyAccess')}</p>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
