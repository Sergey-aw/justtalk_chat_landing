"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrackedLink } from "@/components/TrackedLink";
import { LearningScience } from "@/components/LearningScience";
import { FeatureDeepDives } from "@/components/FeatureDeepDives";
import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Fullscreen } from 'lucide-react';

export default function BecomeTeacher() {
  const t = useTranslations('becometeacherPage');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
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
                <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[clamp(2.5rem,5vw,4rem)] tracking-tight text-just_cod-gray mb-0 text-center md:text-left">
                  {t('hero.headline')}
                </h1>
                <div className="pt-8">
                  <p className="text-base md:text-[16.3px] font-normal leading-normal tracking-[-0.17px] text-just_cod-gray">
                    {t('hero.subheadline')}
                  </p>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative w-full md:w-3/5 shrink-0 rounded-2xl overflow-hidden">
                <img 
                  src="/become_teacher.webp" 
                  alt="JustTalk Platform" 
                  className="w-full object-cover aspect-16/10"
                />
              </div>
            </div>
            
            {/* CTA Buttons - Centered Below */}
            <div className="pt-8 flex justify-center">
              <div className="flex flex-col sm:flex-row gap-[17px] items-center">
                <div className="flex flex-col items-center gap-2 max-w-[240px]">
                  <TrackedLink href="https://app.justtalk.ai/signup" eventName="apply_to_teach_clicked">
                    <Button className="cursor-pointer w-full">
                      {t('hero.applyToTeach')}
                      <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                    </Button>
                  </TrackedLink>
                  
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TrackedLink
                    href="https://cal.com/justtalk/demo"
                    eventName="cta_book_demo_clicked"
                    eventProperties={{ location: 'become_teacher_page' }}
                  >
                    <Button variant="outline" className="cursor-pointer">
                      {t('hero.bookDemo')}
                      <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
                    </Button>
                  </TrackedLink>
                  
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seamless experience - Video */}
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

        {/* Teacher Features */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-16">
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
          <div className="grid md:grid-cols-2 gap-8 items-center mb-0">
            <div className="px-4 md:px-20">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                {t('teachers.teachOnline.title')}
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                {t('teachers.teachOnline.description')}
              </p>
              <div className="pt-4">
                <TrackedLink href="https://app.justtalk.ai/signup" eventName="apply_to_become_tutor_clicked" eventProperties={{ location: 'become_teacher_features' }}>
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
        </section>

        {/* Learning Science */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <LearningScience />
        </section>

        {/* AI to Tutors Connection Section */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="bg-[#f8f6f0] rounded-2xl px-8 py-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Image */}
              <div className="relative w-full aspect-3/2 rounded-2xl overflow-hidden">
                <img 
                  src="/bring_students.webp" 
                  alt="JustTalk AI Platform connecting to tutors" 
                  className="object-cover h-full w-full"
                />
              </div>

              {/* Text Content - 3 Sections */}
              <div className="px-4 md:px-0 space-y-12">
                {/* Section 1 */}
                <div>
                  <h3 className="text-xl md:text-xl font-medium tracking-[-0.5px] text-just_cod-gray mb-1">
                    {t('bringStudents.title')}
                  </h3>
                  <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-6">
                    {t('bringStudents.description')}
                  </p>
                  <TrackedLink
                    href="https://cal.com/justtalk/tutors"
                    eventName="schedule_call_clicked"
                    eventProperties={{ location: 'become_teacher_bring_students' }}
                  >
                    <Button className="cursor-pointer">
                      {t('bringStudents.scheduleCall')}
                      <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                    </Button>
                  </TrackedLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Deep-Dives */}
        <section className="w-full max-w-[820px] px-10 py-16 md:py-24">
          <FeatureDeepDives />
        </section>
      </main>

      <Footer />
    </div>
  );
}
