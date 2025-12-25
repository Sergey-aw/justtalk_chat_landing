import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PersonalityCarousel } from '@/components/PersonalityCarousel';
import { HeroCarousel } from '@/components/HeroCarousel';
import { DialogueAnimation } from '@/components/DialogueAnimation';

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
            <Button className="cursor-pointer">
              Log in
            </Button>
            <Button variant="outline" className="cursor-pointer">
              Sign up
            </Button>
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
                <Button className="cursor-pointer">
                  Start now
                  <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                </Button>
                <Button variant="outline" className="cursor-pointer">
                  Learn about JustTalk AI platform
                  <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Section */}
        <section className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-[27.8px] font-medium tracking-[-0.29px] text-just_cod-gray">
              Seamless experience with the JustTalk platform<br />for one-on-one learning
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
              <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                Search the web
              </h3>
              <p className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                Click the web search icon to get fast, timely<br />answers with links to relevant web sources.
              </p>
              <a href="#" className="inline-flex items-center gap-1 text-[13.7px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline">
                Learn more
                <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
              </a>
            </div>
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
              <DialogueAnimation />
            </div>
          </div>

          {/* Feature 2 - Tutors Carousel */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
            <div className="px-4 md:px-20">
              <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                Collaborate on writing and code
              </h3>
              <p className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                With canvas, you can work with ChatGPT on<br />projects that require editing and revisions.
              </p>
              <a href="#" className="inline-flex items-center gap-1 text-[13.7px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline">
                Learn more
                <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
              </a>
            </div>
            
            {/* Tutors Carousel */}
            <div className="relative w-full rounded-2xl overflow-hidden aspect-square">
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

          {/* Feature 3 - Same as Feature 2 but repeated */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="px-4 md:px-20">
              <h3 className="text-lg font-medium leading-[23.15px] tracking-[-0.177px] text-just_cod-gray mb-2">
                Collaborate on writing and code
              </h3>
              <p className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-4">
                With canvas, you can work with ChatGPT on<br />projects that require editing and revisions.
              </p>
              <a href="#" className="inline-flex items-center gap-1 text-[13.7px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline">
                Learn more
                <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
              </a>
            </div>
            
            {/* Tutors Card Grid */}
            <div className="relative w-full aspect-square rounded-2xl bg-gradient-to-br from-purple-200 to-pink-200 p-6 flex flex-col gap-4 justify-center">
              <div className="flex gap-4 justify-center">
                {[1, 2].map((i) => (
                  <div key={`b-${i}`} className="bg-just_white border border-[#f3f3f3] rounded-[32px] p-2 shadow-md w-[200px]">
                    <div className="relative h-[200px] rounded-[28px] bg-gradient-to-br from-pink-300 to-orange-200 flex items-center justify-center">
                      <div className="absolute bottom-2 left-2 right-2 bg-just_white rounded-2xl px-3 py-1.5">
                        <p className="font-semibold text-xs text-just_black">Samantha</p>
                        <p className="font-normal text-[10px] text-just_black/75">Supportive · Encouraging</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 justify-end pr-4">
                {[1, 2].map((i) => (
                  <div key={`c-${i}`} className="bg-just_white border border-[#f3f3f3] rounded-[32px] p-2 shadow-md w-[200px]">
                    <div className="relative h-[200px] rounded-[28px] bg-gradient-to-br from-pink-300 to-orange-200 flex items-center justify-center">
                      <div className="absolute bottom-2 left-2 right-2 bg-just_white rounded-2xl px-3 py-1.5">
                        <p className="font-semibold text-xs text-just_black">Samantha</p>
                        <p className="font-normal text-[10px] text-just_black/75">Supportive · Encouraging</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full max-w-[1186px] px-10 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-[27.9px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray mb-8">
              Start improving your English today
            </h2>
            <Button variant="outline" className="mx-auto cursor-pointer">
              View pricing plans
              <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="border border-just_cod-gray-10 rounded p-6 flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-medium leading-[27.11px] tracking-[-0.217px] text-just_cod-gray mb-2">
                    Free
                  </h3>
                  <p className="text-base font-normal leading-7 tracking-[-0.17px] text-just_cod-gray">
                    Intelligence for everyday tasks
                  </p>
                </div>

                <ul className="space-y-2 mb-6">
                  {['Advanced reasoning with GPT-5', 'Limited messages and uploads', 'Limited and slower image generation', 'Limited deep research', 'Limited memory and context'].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-[13.3px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                      <Image src="/icons/check.svg" alt="" width={16} height={16} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <p className="text-[13.3px] font-normal italic leading-[22.96px] tracking-[-0.14px] text-just_cod-gray mb-6">
                  Have an existing plan? See <span className="underline">billing help</span>
                </p>
              </div>

              <div>
                <div className="flex items-end gap-2 mb-6">
                  <span className="text-[21.4px] font-medium leading-[27.11px] tracking-[-0.217px] text-just_cod-gray">$0</span>
                  <span className="text-[13.9px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">/ month</span>
                </div>
                <Button className="w-full cursor-pointer">
                  Get Free
                  <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                </Button>
              </div>
            </div>

            {/* Plus Plan */}
            <div className="border border-just_cod-gray-10 rounded p-6 flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-medium leading-[27.11px] tracking-[-0.217px] text-just_cod-gray mb-2">
                    Plus
                  </h3>
                  <p className="text-base font-normal leading-7 tracking-[-0.17px] text-just_cod-gray">
                    More access to advanced intelligence
                  </p>
                </div>

                <ul className="space-y-2 mb-6">
                  {['Advanced reasoning with GPT-5', 'Expanded messaging and uploads', 'Expanded and faster image creation', 'Expanded deep research and agent mode', 'Expanded memory and context', 'Projects, tasks and custom GPTs', 'Limited access to Sora 1 video generation', 'Codex agent'].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-[13.3px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
                      <Image src="/icons/check.svg" alt="" width={16} height={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-end gap-2 mb-6">
                  <span className="text-[20.9px] font-medium leading-[27.11px] tracking-[-0.217px] text-just_cod-gray">$20</span>
                  <span className="text-[13.9px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">/ month</span>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 cursor-pointer">
                    Get Plus
                    <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
                  </Button>
                  <Button variant="outline" className="whitespace-nowrap cursor-pointer">
                    Limits apply
                    <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Overlay Section */}
        <section className="w-full max-w-[1186px] px-10 py-16">
          <div className="bg-just_mercury-30 rounded-2xl px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <h2 className="text-2xl md:text-[27.3px] font-medium leading-[38.31px] tracking-[-0.29px] text-just_cod-gray max-w-md">
              Join first and try JustTalk today
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="cursor-pointer">
                Try ChatGPT
                <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
              </Button>
              <Button variant="outline" className="cursor-pointer">
                Try it on WhatsApp
                <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-just_cod-gray-5">
        <div className="mx-auto max-w-[1536px] px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Logo */}
            <div>
              <img src="/logo.svg" alt="JustTalk" className="h-6 w-auto" />
            </div>

            {/* Column 2 */}
            <div>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline">API</a></li>
                <li><a href="#" className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline">Sora</a></li>
                <li><a href="#" className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline">News</a></li>
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
          <div className="overflow-hidden mb-12">
            <a href="#" className="block">
              <div className="font-bold text-just_cod-gray hover:opacity-80 transition-opacity text-[clamp(6rem,20vw,20rem)] leading-none tracking-[-0.02em]">
                JustTalk
              </div>
            </a>
          </div>

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
