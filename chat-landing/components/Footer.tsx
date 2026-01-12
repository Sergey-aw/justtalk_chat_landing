'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import posthog from 'posthog-js';

export function Footer() {
  const handleFooterLinkClick = (linkName: string, href: string) => {
    posthog.capture('footer_link_clicked', {
      link_name: linkName,
      href,
    });
  };

  return (
    <footer className="w-full">
      <div className="mx-auto max-w-[1536px] px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo */}
          <div>
            <img src="/logo.svg" alt="JustTalk" className="h-6 w-auto" />
          </div>

          {/* Spacer column for extra free space between logo and nav */}
          <div className="hidden md:block" />

          {/* Column 2 */}
          <div className="md:justify-self-start md:text-left">
            <ul className="space-y-3">
              <li><a href="https://chat.justtalk.ai/welcome?ref=justtalk.ai" className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline" onClick={() => handleFooterLinkClick('Voice Chat', 'https://chat.justtalk.ai/welcome?ref=justtalk.ai')}>JustTalk AI</a></li>
              <li><a href="https://justtalk.ai/platform" className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline" onClick={() => handleFooterLinkClick('Teachers', 'https://justtalk.ai/platform')}>JustTalk Tutors</a></li>
              <li><a href="https://docs.justtalk.ai/?ref=justtalk.ai" className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline" onClick={() => handleFooterLinkClick('Help', 'https://docs.justtalk.ai/?ref=justtalk.ai')}>Help</a></li>
              <li><a href="https://status.justtalk.ai" className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline inline-flex items-center gap-1.5 justify-end" onClick={() => handleFooterLinkClick('Status', 'https://status.justtalk.ai')}>Status<span className="w-1 h-1 bg-green-500 rounded-full"></span></a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="md:justify-self-start md:text-left">
            <ul className="space-y-3">
              <li><a href="/terms" className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline" onClick={() => handleFooterLinkClick('Terms of Use', '/terms')}>Terms of Use</a></li>
              <li><a href="#" className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline" onClick={() => handleFooterLinkClick('Privacy Policy', '#')}>Privacy Policy</a></li>
            </ul>
          </div>
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
              <a href="https://x.com/JustTalkApp" target="_blank" rel="noopener" className="hover:opacity-70 transition-opacity" aria-label="X (Twitter)" onClick={() => handleFooterLinkClick('Twitter/X', 'https://x.com/JustTalkApp')}>
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
  );
}
