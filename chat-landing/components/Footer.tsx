'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import posthog from 'posthog-js';
import { usePricingVariant } from '@/hooks/usePricingVariant';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { useState, useRef, useEffect } from 'react';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const pricingVariant = usePricingVariant();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleFooterLinkClick = (linkName: string, href: string) => {
    posthog.capture('footer_link_clicked', {
      link_name: linkName,
      href,
      pricing_variant: pricingVariant,
    });
  };
  
  // Construct JustTalk AI URL with pricing_variant
  const justTalkAiUrl = `https://chat.justtalk.ai/welcome?pricing_variant=${pricingVariant}&ref=justtalk.ai`;

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsLangMenuOpen(false);
  };

  return (
    <footer className="w-full">
      <div className="mx-auto max-w-[1536px] px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo */}
          <div>
            {/* <div><img src="/logo.svg" alt="JustTalk" className="h-6 w-auto" /></div> */}
            <a href="https://elevenlabs.io/startup-grants" target="_blank" rel="noopener"><img src="/elevenlabs_logo.webp" alt="ElevenLabs Grants" className="h-4 w-auto" /></a>
          </div>

          {/* Spacer column for extra free space between logo and nav */}
          <div className="hidden md:block" />

          {/* <div>
            <img src="/elevenlabs_logo.webp" alt="ElevenLabs Grants" className="h-4 w-auto" />
          </div> */}

          {/* Column 2 */}
          <div className="md:justify-self-start md:text-left">
            <ul className="space-y-3">
              <li><a href={justTalkAiUrl} className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline" onClick={() => handleFooterLinkClick('Voice Chat', justTalkAiUrl)}>{t('justtalkAi')}</a></li>
              <li><a href={`https://justtalk.ai/${locale}/platform`} className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline" onClick={() => handleFooterLinkClick('Teachers', `https://justtalk.ai/${locale}/platform`)}>{t('justtalkTutors')}</a></li>
              <li><a href="https://docs.justtalk.ai/?ref=justtalk.ai" className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline" onClick={() => handleFooterLinkClick('Help', 'https://docs.justtalk.ai/?ref=justtalk.ai')}>{t('help')}</a></li>
              <li><a href="https://status.justtalk.ai" className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline inline-flex items-center gap-1.5 justify-end" onClick={() => handleFooterLinkClick('Status', 'https://status.justtalk.ai')}>{t('status')}<span className="w-1 h-1 bg-green-500 rounded-full"></span></a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="md:justify-self-start md:text-left">
            <ul className="space-y-3">
              <li><a href={`/${locale}/terms`} className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline" onClick={() => handleFooterLinkClick('Terms of Use', `/${locale}/terms`)}>{t('termsOfUse')}</a></li>
              <li><a href="#" className="text-sm font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray hover:underline" onClick={() => handleFooterLinkClick('Privacy Policy', '#')}>{t('privacyPolicy')}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-just_cod-gray-5 pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-[13.5px] font-normal leading-[22.96px] tracking-[-0.14px] text-just_cod-gray">
            <span>{t('copyright')}</span>
            <a href="#" className="underline hover:no-underline">{t('manageCookies')}</a>
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
            <div className="relative" ref={langMenuRef}>
              <Button 
                variant="ghost" 
                className="cursor-pointer"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              >
                <Image src="/icons/globe.svg" alt="" width={20} height={20} />
                {localeNames[locale]}
              </Button>
              
              {/* Dropdown Menu */}
              {isLangMenuOpen && (
                <div className="absolute bottom-full right-0 mb-2 bg-white border border-just_cod-gray-10 rounded-lg shadow-lg overflow-hidden z-50">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => handleLocaleChange(loc)}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-just_black-5 transition-colors flex items-center gap-2 ${
                        locale === loc ? 'bg-just_black-5 font-medium' : ''
                      }`}
                    >
                      {localeNames[loc]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
