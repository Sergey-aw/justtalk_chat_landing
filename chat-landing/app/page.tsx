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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
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
                  Build real speaking confidence in English
                </h1>
                <div className="pt-8">
                  <p className="text-base md:text-[16.3px] font-normal leading-normal tracking-[-0.17px] text-just_cod-gray max-w-xl">
                    Practice English through realistic conversations with AI that remembers how you speak and builds every session on the last.
                  </p>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative h-[325px] md:h-[450px] shrink-0 w-full md:max-w-[500px]">
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
                >
                  <Button className="cursor-pointer">
                    Get Started
                    <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                  </Button>
                </TrackedLink>
                {/* <TrackedLink
                  href="/platform"
                  rel="noopener"
                  eventName="cta_learn_platform_clicked"
                  eventProperties={{ location: 'hero_section' }}
                >
                  <Button variant="outline" className="cursor-pointer">
                    Learn about JustTalk Tutors
                    <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
                  </Button>
                </TrackedLink> */}
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
              Talking works—when it's tracked
            </h2>
             <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4 mt-2 max-w-2xl mx-auto">
                Most speaking tools let you talk but don't track real progress. JustTalk AI analyzes what you say and builds every session on your history—so improvement is cumulative, not random.
              </p>
          </div>
          
          <PlatformMedia />
        </section>

        {/* Features Section */}
        <section id="features" className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-[28px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray">
              Explore more features in JustTalk AI
            </h2>
          </div>

          {/* Feature 1 - Learning Loop */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
            <div className="px-4 md:px-20">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                How improvement actually happens
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                One conversation doesn't change much. But when every session is tracked, understood, and used to shape the next one, progress compounds naturally.
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
                Talk with different personalities
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
               Some are supportive. Some challenge you. All help you practice real conversations
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
                They remember you
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                Our AI personalities remember previous conversations, allowing you to pick up right where you left off.
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
                Practice speaking inside realistic scenarios
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                Choose the situation, the role, and the difficulty—and build skill inside a consistent context. 
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

          {/* Feature 5 - Role Play Series */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
            <div className="px-4 md:px-20">
              <h3 className="text-xl font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                Ongoing roleplay with memory and personality
              </h3>
              <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                Some scenarios unfold over multiple sessions. This isn't one-off roleplay. It's sustained speaking practice with continuity.
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

          {/* Feature 6 - Progress Tracking */}
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

         {/* Platform Section */}
        
        
           {/* Pricing Section */}
        <PricingSection />

        {/* AI to Tutors Section */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">

            <div className="text-center mb-16">
            <h2 className="text-2xl md:text-[27.8px] font-medium tracking-[-0.29px] text-just_cod-gray">
              When you're ready, JustTalk AI connects to real tutors
            </h2>
             <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4 mt-2 max-w-2xl mx-auto">
                JustTalk AI is designed to integrate with live tutors. When you take lessons, tutors can build on your AI practice instead of starting from scratch.
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
                  Live tutoring marketplace launching soon
                </h3>
                <p className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-6">
                  Connect with experienced tutors who understand your AI practice and can accelerate your progress with targeted guidance.
                </p>
                <TrackedLink
                  href="/platform"
                  rel="noopener"
                  eventName="cta_learn_platform_clicked"
                  eventProperties={{ location: 'ai_tutors_section' }}
                >
                  <Button variant="outline" className="cursor-pointer">
                    Learn about the platform
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
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium text-just_cod-gray">
                  Is this only for English?
                </AccordionTrigger>
                <AccordionContent className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                  Yes. We're currently focused on English to deliver the deepest possible speaking feedback.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium text-just_cod-gray">
                  Who is this not for?
                </AccordionTrigger>
                <AccordionContent className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                  <p className="mb-3">
                    If you're a beginner, or looking for grammar lessons, exercises, or passive study — this probably isn't the right fit.
                  </p>
                  <p>
                    JustTalk is built for people who want to learn by speaking.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium text-just_cod-gray">
                  Do I need to prepare anything before starting?
                </AccordionTrigger>
                <AccordionContent className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                  No. You can start speaking immediately — no prompts, setup, or exercises.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-medium text-just_cod-gray">
                  Is this a lesson or a conversation?
                </AccordionTrigger>
                <AccordionContent className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                  <p className="mb-3">
                    It's a real conversation — guided and adaptive, not exercises or drills.
                  </p>
                  <p>
                    There are no drills or scripted responses. The focus is on expressing ideas clearly and naturally.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-medium text-just_cod-gray">
                  Will it correct my grammar?
                </AccordionTrigger>
                <AccordionContent className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                  Yes — without interrupting your flow. Most corrections appear after you speak, or during the conversation only when they genuinely help.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg font-medium text-just_cod-gray">
                  Do I need a tutor?
                </AccordionTrigger>
                <AccordionContent className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                  No. JustTalk AI works completely on its own. Live tutors are optional.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-lg font-medium text-just_cod-gray">
                  Can I cancel anytime?
                </AccordionTrigger>
                <AccordionContent className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                  Yes. You can manage or cancel your subscription at any time from your account.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-lg font-medium text-just_cod-gray">
                  Is my conversation data public or shared?
                </AccordionTrigger>
                <AccordionContent className="text-base font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                  No. Your conversations are private and used only to improve your experience in JustTalk.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

       

        {/* CTA Overlay Section */}
        {/* <section className="w-full max-w-[1186px] px-10 py-16">
          <div className="bg-[#f8f6f0] rounded-2xl px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <h2 className="text-2xl md:text-[27.3px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray max-w-md">
              Join first and try JustTalk today
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <TrackedLink
                href="https://chat.justtalk.ai/welcome?ref=justtalk.ai"
                eventName="cta_try_justtalk_clicked"
                eventProperties={{ location: 'bottom_cta_section' }}
              >
                <Button className="cursor-pointer">
                  Try JustTalk AI
                  <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                </Button>
              </TrackedLink>
              <TrackedLink
                href="https://calendly.com/justtalk"
                eventName="cta_book_demo_clicked"
                eventProperties={{ location: 'bottom_cta_section' }}
              >
                <Button variant="outline" className="cursor-pointer">
                  Book a demo
                  <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
                </Button>
              </TrackedLink>
            </div>
          </div>
        </section> */}
      </main>

      <Footer />
    </div>
  );
}
