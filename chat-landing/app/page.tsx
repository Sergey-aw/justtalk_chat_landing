import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PersonalityCarousel } from '@/components/PersonalityCarousel';
import { HeroCarousel } from '@/components/HeroCarousel';
import { DialogueAnimation } from '@/components/DialogueAnimation';
import { RolePlayCarousel } from '@/components/RolePlayCarousel';
import { PricingSection } from '@/components/PricingSection';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-just_white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-just_white">
        <div className="mx-auto flex h-16 items-center justify-between px-8">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo.svg" alt="JustTalk" className="h-6 w-auto" />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <a href="#about" className="px-[10px] py-[6px] rounded-lg text-just_scorpion text-sm font-medium tracking-[-0.14px] hover:bg-just_black-5 transition-colors">
              About
            </a>
            <a href="#features" className="px-[10px] py-[6px] rounded-lg text-just_scorpion text-sm font-medium tracking-[-0.14px] hover:bg-just_black-5 transition-colors">
              Features
            </a>
            <a href="#pricing" className="px-[10px] py-[6px] rounded-lg text-just_scorpion text-sm font-medium tracking-[-0.14px] hover:bg-just_black-5 transition-colors">
              Pricing
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            <a href="https://chat.justtalk.ai/signin?ref=justtalk.ai" target="_blank" rel="noopener">
              <Button variant="outline" className="cursor-pointer">
                Log in
              </Button>
            </a>
            <a href="https://chat.justtalk.ai/welcome?ref=justtalk.ai" target="_blank" rel="noopener">
              <Button className="cursor-pointer">
                Sign up
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center w-full">
        {/* Hero Section */}
        <section className="w-full max-w-[1320px] px-10 pt-12 md:pt-32 pb-8">
          <div className="flex flex-col gap-8">
            {/* Top Row: Text and Image */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Hero Text */}
              <div className="flex flex-col md:items-start items-center text-center md:text-left">
                <h1 className="text-5xl md:text-[64px] font-semibold md:leading-[59.29px] tracking-[-1.763px] text-just_cod-gray mb-0">
                  Get better at speaking<br />by speaking
                </h1>
                <div className="pt-8">
                  <p className="text-base md:text-[16.3px] font-normal leading-7 tracking-[-0.17px] text-just_cod-gray">
                    Natural voice conversations that help you improve as you talk
                  </p>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative w-full md:w-[419px] h-[325px] md:h-[450px] shrink-0">
                <HeroCarousel />
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
              className="w-full h-auto aspect-4/3 md:aspect-auto object-cover"
            />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-[28px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray">
              Explore more features in JustTalk AI
            </h2>
          </div>

          {/* Feature 1 - Search the web */}
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
            <div className="relative w-full aspect-square md:aspect-4/3 rounded-2xl overflow-hidden">
              <img 
                src="/progress_card.jpg" 
                alt="Progress tracking chart" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
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

      {/* Footer */}
      <footer className="w-full">
        <div className="mx-auto max-w-[1536px] px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Logo */}
            <div>
              <img src="/logo.svg" alt="JustTalk" className="h-6 w-auto" />
            </div>

            {/* Column 2 */}
            <div>
              <ul className="space-y-3">
                <li><a href="https://justtalk.ai/welcome?ref=justtalk.ai" className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline">Platform</a></li>
                <li><a href="https://chat.justtalk.ai/welcome?ref=justtalk.ai" className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline">Voice Chat</a></li>
                <li><a href="https://docs.justtalk.ai/welcome?ref=justtalk.ai" className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline">Help</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline">Terms of Use</a></li>
                <li><a href="#" className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Big Brand Text */}
          {/* <div className="overflow-hidden mb-12">
            <a href="#" className="block">
              <div className="font-bold text-just_cod-gray hover:opacity-80 transition-opacity text-[clamp(6rem,20vw,20rem)] leading-none tracking-[-0.02em]">
                JustTalk
              </div>
            </a>
          </div> */}

          {/* Bottom Bar */}
          <div className="border-t border-just_cod-gray-5 pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1 text-[13.5px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
              <span>JustTalk AI ©2025–2026</span>
              <a href="#" className="underline hover:no-underline">Manage cookies</a>
            </div>

            <div className="flex items-center gap-6">
              {/* Social Icons */}
              <div className="flex gap-7">
                <a href="#" className="hover:opacity-70 transition-opacity" aria-label="X (Twitter)">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-just_cod-gray">
                    <path d="M11.9 9.4L18.9 1H17.2L11.2 8.3L6.5 1H1L8.3 10.9L1 20H2.7L9 12.3L14 20H19.5L11.9 9.4ZM9.8 11.2L9 10.1L3.3 2.3H5.7L10.3 8.7L11.1 9.8L17.2 18.7H14.8L9.8 11.2Z"/>
                  </svg>
                </a>
                <a href="#" className="hover:opacity-70 transition-opacity" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-just_cod-gray">
                    <path d="M17.5 2.5H2.5C1.39543 2.5 0.5 3.39543 0.5 4.5V15.5C0.5 16.6046 1.39543 17.5 2.5 17.5H17.5C18.6046 17.5 19.5 16.6046 19.5 15.5V4.5C19.5 3.39543 18.6046 2.5 17.5 2.5Z"/>
                    <path d="M6.5 8.5V14.5M6.5 6.5V6.51M10.5 14.5V11C10.5 9.89543 11.3954 9 12.5 9C13.6046 9 14.5 9.89543 14.5 11V14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </a>
              </div>

              {/* Language Selector */}
              <Button variant="ghost" className="cursor-pointer">
                <Image src="/icons/globe.svg" alt="" width={20} height={20} />
                English (US)
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
