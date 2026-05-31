"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import posthog from 'posthog-js';
import { usePricingVariant } from '@/hooks/usePricingVariant';
import { locales, localeNames, type Locale } from '@/i18n/config';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pricingVariant = usePricingVariant();
  
  // Use different URLs for platform and becometeacher pages
  const isPlatformPage = pathname === '/platform';
  const isBecomeTeacherPage = pathname === '/becometeacher';
  const loginUrl = isPlatformPage 
    ? 'https://app.justtalk.ai/login' 
    : 'https://chat.justtalk.ai/signin?ref=justtalk.ai';
  const signupUrl = (isPlatformPage || isBecomeTeacherPage)
    ? 'https://app.justtalk.ai/signup' 
    : `https://chat.justtalk.ai/welcome?pricing_variant=${pricingVariant}&ref=justtalk.ai`;
  const signupButtonText = isBecomeTeacherPage ? t('apply') : t('signup');

  const handleLoginClick = (location: 'desktop' | 'mobile') => {
    posthog.capture('header_login_clicked', { 
      location,
      page: pathname,
      url: loginUrl,
      pricing_variant: pricingVariant,
    });
  };

  const handleSignupClick = (location: 'desktop' | 'mobile') => {
    posthog.capture('header_signup_clicked', { 
      location,
      page: pathname,
      url: signupUrl,
      pricing_variant: pricingVariant,
    });
  };

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-just_white">
        <div className="mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <a href={`/${locale}`}>
              <img src="/logo.svg" alt="JustTalk" className="h-6 w-auto" />
            </a>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <a href={`/${locale}`} className="px-[10px] py-[6px] rounded-lg text-just_scorpion text-sm font-medium tracking-[-0.14px] hover:bg-just_black-5 transition-colors">
              {t('justtalkAi')}
            </a>
              <a href={`/${locale}/platform`} className="px-[10px] py-[6px] rounded-lg text-just_scorpion text-sm font-medium tracking-[-0.14px] hover:bg-just_black-5 transition-colors">
              {t('justtalkTutors')}
            </a>
            <a href={`/${locale}/becometeacher`} className="px-[10px] py-[6px] rounded-lg text-just_scorpion text-sm font-medium tracking-[-0.14px] hover:bg-just_black-5 transition-colors">
              {t('becomeTeacher')}
            </a>
            <a href={`/${locale}/ielts`} className="px-[10px] py-[6px] rounded-lg text-just_scorpion text-sm font-medium tracking-[-0.14px] hover:bg-just_black-5 transition-colors">
              {t('ielts')}
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            {/* Hide Log in button on mobile */}
            <a href={loginUrl} rel="noopener" className="hidden md:block" onClick={() => handleLoginClick('desktop')}>
              <Button variant="outline" className="cursor-pointer">
                {t('login')}
              </Button>
            </a>
            {/* Show Sign up button on mobile only when menu is closed */}
            {!isMobileMenuOpen && (
              <a href={signupUrl}  rel="noopener" className="md:hidden" onClick={() => handleSignupClick('mobile')}>
                <Button className="cursor-pointer">
                  {signupButtonText}
                </Button>
              </a>
            )}
            {/* Show Sign up button on desktop */}
            <a href={signupUrl} rel="noopener" className="hidden md:block" onClick={() => handleSignupClick('desktop')}>
              <Button className="cursor-pointer">
                {signupButtonText}
              </Button>
            </a>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-just_black-5 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-just_cod-gray" />
              ) : (
                <Menu className="h-6 w-6 text-just_cod-gray" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-just_white md:hidden opacity-0 animate-[fadeIn_0.2s_ease-out_forwards]">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center h-16 px-8">
              <a href={`/${locale}`}>
                <img src="/logo.svg" alt="JustTalk" className="h-6 w-auto" />
              </a>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 flex flex-col px-8 py-8 space-y-4">
            
              <a 
                href={`/${locale}`} 
                className="text-lg font-medium text-just_cod-gray"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('justtalkAi')}
              </a>
                <a 
                href={`/${locale}/platform`} 
                className="text-lg font-medium text-just_cod-gray"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('justtalkTutors')}
              </a>
              <a
                href={`/${locale}/becometeacher`}
                className="text-lg font-medium text-just_cod-gray"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('becomeTeacher')}
              </a>
              <a
                href={`/${locale}/ielts`}
                className="text-lg font-medium text-just_cod-gray"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('ielts')}
              </a>

              {/* Language Selector in Mobile Menu */}
              {/* <div className="pt-4 border-t border-just_cod-gray-10 mt-4">
                <p className="text-sm text-just_cod-gray/70 mb-2">Language / Язык</p>
                <div className="flex gap-2">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => handleLocaleChange(loc)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        locale === loc 
                          ? 'bg-just_cod-gray text-white' 
                          : 'bg-just_black-5 text-just_cod-gray hover:bg-just_black-10'
                      }`}
                    >
                      {localeNames[loc]}
                    </button>
                  ))}
                </div>
              </div> */}
            </nav>

            {/* Bottom Buttons */}
            <div className="px-8 pb-8 flex flex-row gap-3">
              <a href={loginUrl} target="_blank" rel="noopener" className="flex-1" onClick={() => handleLoginClick('mobile')}>
                <Button variant="outline" className="w-full cursor-pointer">
                  {t('login')}
                </Button>
              </a>
              <a href={signupUrl} target="_blank" rel="noopener" className="flex-1" onClick={() => handleSignupClick('mobile')}>
                <Button className="w-full cursor-pointer">
                  {t('signup')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
