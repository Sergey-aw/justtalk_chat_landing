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
                <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[clamp(2.5rem,5vw,4rem)] tracking-tight text-just_cod-gray mb-0 text-center md:text-left">
                  Teach English online—on your terms
                </h1>
                <div className="pt-8">
                  <p className="text-base md:text-[16.3px] font-normal leading-normal tracking-[-0.17px] text-just_cod-gray">
                    {/* The most powerful seamless experience between JustTalk AI interactions and one-on-one lessons with real human teachers */}
                    Set your rates, manage your availability, and teach speaking-focused lessons on a clean, modern platform.
                  </p>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative w-full md:w-3/5 shrink-0 rounded-2xl overflow-hidden">
                <img 
                  src="/hero_blue_2.jpg" 
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
                      Apply to teach
                      <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                    </Button>
                  </TrackedLink>
                  
                </div>
                <div className="flex flex-col items-center gap-2">
                  <a href="/becameteacher" rel="noopener">
                    <Button variant="outline" className="cursor-pointer">
                      Book a demo
                      <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
                    </Button>
                  </a>
                  
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

        {/* How it works - Tutors */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div>
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
                             Low commission—with lower rates as you teach more
                           </p>
                         </div>
       
                         {/* Card 6 */}
                         <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                           <div className="mb-4">
                             <User className="w-6 h-6 text-purple-500" strokeWidth={2} />
                           </div>
                           <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                             Bring your own students
                           </h3>
                           <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-2">
                             Earn more when you invite students to learn with you on JustTalk
                           </p>
                         </div>
            </div>
          </div>
        </section>

        {/* AI to Tutors Connection Section */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="bg-[#f8f6f0] rounded-2xl px-8 py-8">
                       <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                         {/* Image */}
                         <div className="relative w-full aspect-3/2 rounded-2xl overflow-hidden">
                           <img 
                             src="/bring_students.jpg" 
                             alt="JustTalk AI Platform connecting to tutors" 
                             className="object-cover h-full w-full"
                           />
                         </div>

                         {/* Text Content - 3 Sections */}
                         <div className="px-4 md:px-0 space-y-12">
                           {/* Section 1 */}
                           <div>
                             <h3 className="text-xl md:text-xl font-medium tracking-[-0.5px] text-just_cod-gray mb-1">
                               Bring your students
                             </h3>
                             <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-6">
                               Already have students? Invite them to join you on JustTalk and earn more with lower commission rates. We'll help you transition seamlessly.
                             </p>
                             <a href="https://calendly.com/justtalk" target="_blank" rel="noopener">
                               <Button className="cursor-pointer">
                                 Schedule a call
                                 <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                               </Button>
                             </a>
                           </div>
                         </div>
            </div>
          </div>
        </section>

  
      </main>

      <Footer />
    </div>
  );
}
