'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TrackedLink } from '@/components/TrackedLink';
import { SwipeCard, useSwipeDeck } from '@/components/SwipeDeck';
import type { Offer } from '@/lib/interview-hero';

interface OfferLink {
  href: string;
  eventName: string;
  eventProperties: Record<string, unknown>;
}

/**
 * How long each offer stays on top before the stack moves on. Long enough to read a
 * card's ~25-word description, which matters on phones, where there's no hover to pause.
 */
const ROTATE_MS = 6000;

// Reduced motion is a media query the server can't see: it renders as "no preference"
// and the client corrects it long before the first rotation could fire.
const noopSubscribe = () => () => {};
const readReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * The home hero's card stack, with offers on it instead of voice agents: each card
 * links to a page on interview.justtalk.ai. No microphone, no ElevenLabs.
 *
 * Visitors aren't offered a way to page through the cards — no arrows, no dragging.
 * The stack rotates on its own instead, and holds still while the pointer or keyboard
 * focus is on it, so the button never changes under someone about to click it.
 */
export function OfferDeck({
  offers,
  linkFor,
}: {
  /** in display order: the first one starts on top */
  offers: Offer[];
  /** builds each card's tracked link, so the page decides where clicks go and what's sent */
  linkFor: (offer: Offer, rotations: number) => OfferLink;
}) {
  // sent with each click: did they take the lead offer, or one that came round later?
  const [rotations, setRotations] = useState(0);
  const { deck, flyOut, swipe, handleExited } = useSwipeDeck(offers, {
    onAdvance: () => setRotations((n) => n + 1),
  });
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useSyncExternalStore(noopSubscribe, readReducedMotion, () => false);
  const paused = hovered || focused || reducedMotion;

  // re-armed after every rotation (the deck changes) and whenever the pause lifts
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => swipe(1), ROTATE_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, deck]);

  const top = deck[0];

  return (
    <div
      className="relative h-full w-full select-none rounded-3xl"
      role="group"
      aria-roledescription="carousel"
      aria-label={`Ways to prepare. Showing ${top?.title}.`}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        // still focused if focus only moved to another element inside the stack
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      {deck.slice(0, 3).map((offer, i) => {
        const isTop = i === 0;
        const link = linkFor(offer, rotations);
        return (
          <SwipeCard
            key={offer.key}
            image={offer.image}
            alt=""
            index={i}
            flyOut={isTop ? flyOut : null}
            onRequestSwipe={swipe}
            onExited={handleExited}
            draggable={false}
            hint={false}
            onHintDone={() => {}}
          >
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="text-2xl font-semibold tracking-[-0.5px] text-white">
                {offer.title}
              </h3>
              <p className="mt-0.5 text-base font-semibold text-white/75">{offer.subtitle}</p>

              {/* description + CTA only on the top card */}
              <motion.div
                initial={false}
                animate={{ opacity: isTop ? 1 : 0, y: isTop ? 0 : 8 }}
                transition={{ duration: 0.25 }}
                // inert, not just hidden: the link underneath must not take keyboard focus
                inert={!isTop}
                style={{ pointerEvents: isTop ? 'auto' : 'none' }}
              >
                <p className="mt-3 text-sm leading-[20px] text-white/85">{offer.description}</p>

                <TrackedLink
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  eventName={link.eventName}
                  eventProperties={link.eventProperties}
                  className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-just_cod-gray transition-transform hover:scale-[1.03] active:scale-95"
                >
                  {offer.cta}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </TrackedLink>
              </motion.div>
            </div>
          </SwipeCard>
        );
      })}
    </div>
  );
}
