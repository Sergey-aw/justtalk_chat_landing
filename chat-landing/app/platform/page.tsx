"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PersonalityCarousel } from '@/components/PersonalityCarousel';
import { HeroCarousel } from '@/components/HeroCarousel';
import { DialogueAnimation } from '@/components/DialogueAnimation';
import { TutorsCarousel } from '@/components/TutorsCarousel';
import { RolePlayCarousel } from '@/components/RolePlayCarousel';
import { PricingSection } from '@/components/PricingSection';
import { Conversation } from '@/components/Conversation';
import { ProgressChart } from '@/components/ProgressChart';
import { ChatInterface } from '@/components/ChatInterface';
import { WaitlistDialog } from '@/components/WaitlistDialog';
import { TrackedLink } from '@/components/TrackedLink';
import { useState, useRef } from 'react';
import { Fullscreen, User, TrendingUp, Brain, MessageCircle, Shuffle, BarChart3, DollarSign, Calendar, Monitor, CreditCard, MessagesSquare } from 'lucide-react';

export default function Platform() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("students");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (video) {
      // Standard fullscreen API
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } 
      // Safari iOS fullscreen API
      else if ((video as any).webkitEnterFullscreen) {
        (video as any).webkitEnterFullscreen();
      }
      // Fallback for older webkit browsers
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
                <h1 className="text-5xl md:text-[64px] font-semibold leading-12 tracking-tight text-just_cod-gray mb-0 text-center md:text-left md:leading-16">
                  Learn with real tutors—without starting over
                </h1>
                <div className="pt-8">
                  <p className="text-base md:text-[16.3px] font-normal leading-normal tracking-[-0.17px] text-just_cod-gray">
                    {/* The most powerful seamless experience between JustTalk AI interactions and one-on-one lessons with real human teachers */}
                    JustTalk connects live tutoring to your speaking history, so lessons begin with context—not re-diagnosis
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
                <div className="flex flex-col items-center gap-2 max-w-[240px]">
                  <WaitlistDialog>
                    <Button className="cursor-pointer w-full">
                      Join the waitlist
                      <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                    </Button>
                  </WaitlistDialog>
                  <p className="text-xs text-just_cod-gray/70 text-center">Early access for students</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <a href="https://app.justtalk.ai/signup" target="_blank" rel="noopener">
                    <Button variant="outline" className="cursor-pointer">
                      Become a powerful teacher
                      <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
                    </Button>
                  </a>
                  <p className="text-sm text-transparent select-none whitespace-nowrap">Placeholder</p>
                </div>
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

        {/* Talking Works Section */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-[27.8px] font-medium tracking-[-0.29px] text-just_cod-gray mb-4">
              The hidden friction in traditional tutoring
            </h2>
            <p className="text-base md:text-[16.3px] font-normal leading-normal tracking-[-0.17px] text-just_cod-gray max-w-3xl mx-auto">
              Your learning history doesn't travel with you—so every tutor session starts from scratch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Image */}
            <div className="relative w-full rounded-2xl overflow-hidden aspect-square">
              <img 
                src="/bg_platforms0.jpg" 
                alt="Traditional tutoring platforms" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Right Side - Text Content */}
            <div className="px-4 md:px-8 space-y-8">
              <div>
                <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                  Every new tutor asks about your level
                </h3>
                <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/75">
                  You waste valuable lesson time explaining what you already know instead of building new skills.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                  You repeat your goals and weak points
                </h3>
                <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/75">
                  The context you've built with previous tutors doesn't transfer, so you're constantly reintroducing yourself.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                  Early lessons feel like warm-ups
                </h3>
                <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/75">
                  Real progress only starts after they've figured out your needs—time you could have spent learning.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                  Changing tutors resets your progress
                </h3>
                <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray/75">
                  The new tutor has no visibility into what you've practiced, struggled with, or mastered—so the cycle repeats.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full max-w-[1186px] px-10 py-16 md:py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-[28px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray">
              Explore more features in JustTalk AI
            </h2>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="teachers">Teachers</TabsTrigger>
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
                Speak with a live tutor
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                Find a tutor matched to your personal needs and goals. Every tutor is supported by AI insights. Lessons stay personalized, efficient, and focused on your progress.
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

          {/* Feature 2 - Tutors Carousel */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
            <div className="px-4 md:px-20">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                Your progress stays with you
              </h3>
              <div className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                <p>
                  On JustTalk, tutoring isn't tied to a single person.
                </p>
                <p className="mb-3">
                  Your speaking history carries forward, so lessons stay productive even if you change tutors.
                </p>
                
                <ul className="list-none space-y-0 ml-0">
                  <li>- No rebuilding your foundation</li>
                  <li>- No repeating the same early lessons</li>
                  <li>- Freedom to choose tutors based on fit</li>
                </ul>
              </div>
              
            </div>
            
            {/* Tutors Carousel */}
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

          {/* Feature 3 - Memory
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
          </div> */}

          {/* Feature 3 - Focused, speaking-first lessons */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
            <div className="px-4 md:px-20">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                Focused, speaking-first lessons
              </h3>
              <div className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                <p className="mb-3">
                  Tutoring on JustTalk is designed around real communication.
                </p>
                
                <ul className="list-none space-y-0 ml-0">
                  <li>- Lessons centered on speaking, not worksheets</li>
                  <li>- Clear focus areas instead of generic conversation</li>
                  <li>- Progress that builds across sessions</li>
                </ul>
              </div>
              
            </div>
            
            {/* Role Play Carousel */}
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

          {/* How it works - Students */}
          <div className="mt-24">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-[28px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray">
                How it works
              </h2>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4 mt-2 max-w-2xl mx-auto">
                Effortlessly track student progress, mistakes, and vocabulary—all in one place. Save time and let AI handle the details while you focus on what matters most.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <div className="mb-4">
                  <TrendingUp className="w-6 h-6 text-pink-500" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                  True personalization
                </h3>
                <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                  We track every word you say (and don't) to deliver a hyper-personalized roadmap to fluency.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <div className="mb-4">
                  <BarChart3 className="w-6 h-6 text-orange-500" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                  CEFR-based progression
                </h3>
                <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                  Our curriculum is built on CEFR—the global standard—so your progress is real, not just "points".
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <div className="mb-4">
                  <User className="w-6 h-6 text-yellow-500" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                  Smarter human tutoring
                </h3>
                <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                  Every tutor is backed by real-time AI insights to focus each lesson on what matters most for you.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <div className="mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-500" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                  AI that remembers you
                </h3>
                <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                  Our AI partner gives you unlimited speaking practice and remembers everything you've discussed with your tutor.
                </p>
              </div>

              {/* Card 5 */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <div className="mb-4">
                  <Shuffle className="w-6 h-6 text-purple-500" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                  Seamless integration
                </h3>
                <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                  AI and tutor work in sync. Everything you say improves your personalized path to fluency.
                </p>
              </div>

              {/* Card 6 */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <div className="mb-4">
                  <Brain className="w-6 h-6 text-indigo-500" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                  Visualize Progress
                </h3>
                <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                  See all the data insights in simple diagrams
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

               {/* Feature 1 - Speak with a live tutor */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
            <div className="px-4 md:px-20">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                Teach English online—on your terms
              </h3>
              <div className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
              
                <p className="mb-3">
                  Set your rates, manage your availability, and teach speaking-focused lessons on a clean, modern platform.
                </p>
                
              </div>
                <div className="pt-4">
                <TrackedLink href="https://app.justtalk.ai/signup" eventName="apply_to_become_tutor_clicked">
                  <Button className="cursor-pointer w-fit">
                        Apply to become a tutor
                        <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                      </Button>
                </TrackedLink>
              </div>
            </div>
            
            {/* Static Image */}
            <div className="relative w-full rounded-2xl overflow-hidden aspect-square md:aspect-4/3">
              <img 
                src="/teachers_1.jpg" 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover"
              />
           
            </div>
          </div>

            
              {/* How it works - Tutors */}
              <div className="mt-24">
                <div className="text-center mb-16">
                  <h2 className="text-2xl md:text-[28px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray">
                    How it works
                  </h2>
                  <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4 mt-2 max-w-2xl mx-auto">
                    Empower your teaching with AI-driven insights. Track student progress, identify patterns, and deliver personalized lessons with confidence.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Card 1 */}
                  <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                    <div className="mb-4">
                      <DollarSign className="w-6 h-6 text-indigo-500" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                      Set your own rates
                    </h3>
                    <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                      Charge what you want, change it anytime
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                    <div className="mb-4">
                      <Calendar className="w-6 h-6 text-orange-500" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                      Teach on your schedule
                    </h3>
                    <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                      Open availability when it works for you
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                    <div className="mb-4">
                      <MessageCircle className="w-6 h-6 text-blue-500" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                      Message students easily
                    </h3>
                    <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                      All communication in one place
                    </p>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                    <div className="mb-4">
                      <MessagesSquare className="w-6 h-6 text-pink-500" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                      Conversation-based teaching
                    </h3>
                    <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                      Teach through real conversation
                    </p>
                  </div>

                  {/* Card 5 */}
                  <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                    <div className="mb-4">
                      <CreditCard className="w-6 h-6 text-yellow-500" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                      Payments handled by the platform
                    </h3>
                    <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                      No invoicing or admin required
                    </p>
                  </div>

                  {/* Card 6 */}
                  <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                    <div className="mb-4">
                      <Monitor className="w-6 h-6 text-purple-500" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                      A clean, modern teaching workspace
                    </h3>
                    <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                      Designed for online tutoring
                    </p>
                  </div>
                </div>
              </div>
              </motion.div>
            </TabsContent>

          </Tabs>
        </section>

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
