'use client';

import { Header } from '@/components/Header';
import { AgentDeck } from '@/components/AgentDeck';

/**
 * Prototype-only route for the hero "welcome agent" card deck.
 * Not linked from navigation — used to iterate on the deck in a hero-like layout
 * before it replaces HeroCarousel on the main page.
 */
export default function AgentDeckPrototype() {
  return (
    <div className="flex min-h-screen flex-col bg-just_white">
      <Header />

      <main className="flex w-full flex-col items-center">
        <section className="w-full max-w-[1320px] px-10 pt-12 pb-8 md:pt-32">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            {/* Hero copy (placeholder, mirrors the real hero) */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <h1 className="mb-0 text-4xl font-semibold tracking-[-1.763px] text-just_cod-gray md:text-[64px] md:leading-[59.29px]">
                Pick someone to talk to
              </h1>
              <div className="pt-8">
                <p className="max-w-xl text-base font-normal leading-normal tracking-[-0.17px] text-just_cod-gray md:text-[16.3px]">
                  Swipe through the deck and start a real voice conversation with
                  the agent that fits what you want to practise.
                </p>
              </div>
            </div>

            {/* Deck sits in the hero image slot */}
            <div className="relative h-[440px] w-full shrink-0 md:h-[480px] md:max-w-[380px]">
              <AgentDeck />
            </div>
          </div>

          <p className="mt-16 text-center text-sm text-just_cod-gray/50">
            Prototype — drag or flick the top card left/right to send it under the deck.
          </p>
        </section>
      </main>
    </div>
  );
}
