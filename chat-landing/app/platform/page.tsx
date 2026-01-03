"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PersonalityCarousel } from '@/components/PersonalityCarousel';
import { HeroCarousel } from '@/components/HeroCarousel';
import { DialogueAnimation } from '@/components/DialogueAnimation';
import { RolePlayCarousel } from '@/components/RolePlayCarousel';
import { PricingSection } from '@/components/PricingSection';
import { Conversation } from '@/components/Conversation';
import { ProgressChart } from '@/components/ProgressChart';
import { ChatInterface } from '@/components/ChatInterface';
import { useState } from 'react';

export default function Platform() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

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
                <h1 className="text-5xl md:text-[64px] font-semibold leading-12 tracking-tight text-just_cod-gray mb-0 text-center md:text-left md:leading-16">
                  The Fastest Way to Speak a New Language
                </h1>
                <div className="pt-8">
                  <p className="text-base md:text-[16.3px] font-normal leading-normal tracking-[-0.17px] text-just_cod-gray">
                    The most powerful seamless experience between JustTalk AI Chat interactions and one-on-one lessons with real human teachers
                  </p>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative w-auto md:w-150 lg:w-175 shrink-0 rounded-2xl overflow-hidden">
                <img 
                  src="/hero_blue_2.jpg" 
                  alt="JustTalk Platform" 
                  className="w-full object-cover aspect-16/10 md:aspect-auto"
                />
              </div>
            </div>
            
            {/* CTA Buttons - Centered Below */}
            <div className="pt-8 flex justify-center">
              <div className="flex flex-col sm:flex-row gap-[17px] items-center">
                <a href="https://chat.justtalk.ai/welcome?ref=justtalk.ai" target="_blank" rel="noopener">
                  <Button className="cursor-pointer">
                    Start now
                    <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                  </Button>
                </a>
                <a href="https://justtalk.ai" target="_blank" rel="noopener">
                  <Button variant="outline" className="cursor-pointer">
                    Learn about JustTalk AI platform
                    <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
                  </Button>
                </a>
              </div>
            </div>

            {/* Voice Conversation Demo */}
            {/* <div className="pt-12 flex justify-center">
              <div className="w-full max-w-2xl bg-just_white border border-just_black-5 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.5px] text-just_cod-gray mb-2">
                    Try JustTalk Now
                  </h3>
                  <p className="text-base text-just_cod-gray/75">
                    Start a voice conversation instantly—no signup required
                  </p>
                </div>
                <Conversation />
              </div>
            </div> */}
          </div> 
        </section>

        {/* Platform Section */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-[27.8px] font-medium tracking-[-0.29px] text-just_cod-gray">
              Seamless experience with JustTalk platform<br />for one-on-one learning
            </h2>
          </div>
          
          <div className="relative w-full rounded-2xl overflow-hidden">
            <img 
              src="/platform_blue_16x9.jpg" 
              alt="JustTalk Platform" 
              className={`w-full h-auto aspect-4/3 md:aspect-auto object-cover transition-opacity duration-300 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
            />
            <video
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setIsVideoLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
              <source src="/platform_1080p_25fps.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-[28px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray">
              Explore more features in JustTalk AI
            </h2>
          </div>

          {/* Feature 1 - Tutors Carousel */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
            <div className="px-4 md:px-20">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                Speak with a live tutor
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                Find a tutor matched to your personal needs and goals. Every tutor is supported by AI insights. Lessons stay personalized, efficient, and focused on your progress.
              </p>
              
            </div>
            
            {/* Tutors Carousel */}
            <div className="relative w-full rounded-2xl overflow-hidden aspect-square md:aspect-4/3">
              <img 
                src="/platform_feature_1.jpg" 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover"
              />
           
            </div>
          </div>

          {/* Feature 2 - Memory */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
            <div className="px-4 md:px-20">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                Practice with AI between lessons
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                Dynamic goal-setting and personalized practice plans. AI remembers your past lessons and conversations with human tutors, creating context-aware practice sessions.
              </p>
             
            </div>
            <div className="relative w-full aspect-square md:aspect-4/3 rounded-2xl overflow-hidden">
              <ChatInterface />
            </div>
          </div>

          {/* Feature 3 - Role Play Scenarios */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
            <div className="px-4 md:px-20">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                Practice real-world scenarios
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                Choose from various role-play scenarios to<br />practice conversations in different contexts.
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

          {/* Feature 4 - Progress Tracking */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="px-4 md:px-20">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                Track your progress over time
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                See how your speaking skills improve with detailed analytics and progress charts.
              </p>
              
            </div>
            
            {/* Progress Chart */}
            <div className="relative w-full aspect-square md:aspect-4/3 rounded-2xl overflow-hidden bg-gray-50 border border-just_black-5 p-0">
              <ProgressChart />
            </div>
          </div>

          {/* Feature 5 - Pronunciation Practice */}
          {/* <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="px-4 md:px-20">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                Perfect your pronunciation
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                Get instant feedback on your pronunciation and improve your accent with targeted practice.
              </p>
              
            </div> */}
            
            {/* Pronunciation Image */}
            {/* <div className="relative w-full aspect-square md:aspect-4/3 rounded-2xl overflow-hidden">
              <img 
                src="/pronouncation.jpg" 
                alt="Pronunciation practice" 
                className="w-full h-full object-cover object-top"
              />
            </div> 
           </div> */}
        </section>

        {/* Pricing Section */}
        <PricingSection />

        {/* CTA Overlay Section */}
        <section className="w-full max-w-[1186px] px-10 py-16">
          <div className="bg-[#f8f6f0] rounded-2xl px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <h2 className="text-2xl md:text-[27.3px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray max-w-md">
              Join first and try JustTalk today
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="cursor-pointer">
                Try JustTalk AI
                <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
              </Button>
              <Button variant="outline" className="cursor-pointer">
                Book a demo
                <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
