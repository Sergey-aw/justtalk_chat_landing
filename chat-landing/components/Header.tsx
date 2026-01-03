"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-just_white">
        <div className="mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo.svg" alt="JustTalk" className="h-6 w-auto" />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <a href="/platform" className="px-[10px] py-[6px] rounded-lg text-just_scorpion text-sm font-medium tracking-[-0.14px] hover:bg-just_black-5 transition-colors">
              Platform
            </a>
            <a href="/" className="px-[10px] py-[6px] rounded-lg text-just_scorpion text-sm font-medium tracking-[-0.14px] hover:bg-just_black-5 transition-colors">
              JustTalk AI
            </a>
            <a href="#features" className="px-[10px] py-[6px] rounded-lg text-just_scorpion text-sm font-medium tracking-[-0.14px] hover:bg-just_black-5 transition-colors">
              Features
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            {/* Hide Log in button on mobile */}
            <a href="https://chat.justtalk.ai/signin?ref=justtalk.ai" target="_blank" rel="noopener" className="hidden md:block">
              <Button variant="outline" className="cursor-pointer">
                Log in
              </Button>
            </a>
            {/* Show Sign up button on mobile only when menu is closed */}
            {!isMobileMenuOpen && (
              <a href="https://chat.justtalk.ai/welcome?ref=justtalk.ai" target="_blank" rel="noopener" className="md:hidden">
                <Button className="cursor-pointer">
                  Sign up
                </Button>
              </a>
            )}
            {/* Show Sign up button on desktop */}
            <a href="https://chat.justtalk.ai/welcome?ref=justtalk.ai" target="_blank" rel="noopener" className="hidden md:block">
              <Button className="cursor-pointer">
                Sign up
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
              <img src="/logo.svg" alt="JustTalk" className="h-6 w-auto" />
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 flex flex-col px-8 py-8 space-y-4">
              <a 
                href="/platform" 
                className="text-lg font-medium text-just_cod-gray"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Platform
              </a>
              <a 
                href="/" 
                className="text-lg font-medium text-just_cod-gray"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                JustTalk AI
              </a>
              <a 
                href="#features" 
                className="text-lg font-medium text-just_cod-gray"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
            </nav>

            {/* Bottom Buttons */}
            <div className="px-8 pb-8 flex flex-row gap-3">
              <a href="https://chat.justtalk.ai/signin?ref=justtalk.ai" target="_blank" rel="noopener" className="flex-1">
                <Button variant="outline" className="w-full cursor-pointer">
                  Log in
                </Button>
              </a>
              <a href="https://chat.justtalk.ai/welcome?ref=justtalk.ai" target="_blank" rel="noopener" className="flex-1">
                <Button className="w-full cursor-pointer">
                  Sign up
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
