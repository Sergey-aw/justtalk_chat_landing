'use client';

import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { OfferDeck } from '@/components/OfferDeck';
import { TrackedLink } from '@/components/TrackedLink';
import { HeroVariantSwitcher } from '@/components/HeroVariantSwitcher';
import { useInterviewHeroVariant } from '@/hooks/useInterviewHeroVariant';
import {
  HERO_VARIANT_CONFIG,
  interviewUrl,
  isHeroVariant,
  OFFERS,
  type HeroSlot,
  type HeroVariant,
  type Offer,
} from '@/lib/interview-hero';

/** The one conversion event the experiment's primary metric is built on. */
const CTA_EVENT = 'interview_hero_cta_clicked';

/**
 * Preview mode is on in development, or anywhere with ?preview=1 (a Vercel preview, a
 * link sent for review). It shows the variant switcher and never evaluates the flag.
 * ?hero=control|problem picks the starting variant, so a variant can be linked directly.
 */
function readPreview(): HeroVariant | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const enabled = process.env.NODE_ENV === 'development' || params.get('preview') === '1';
  if (!enabled) return null;
  const requested = params.get('hero');
  return isHeroVariant(requested) ? requested : 'control';
}

// the URL only changes through selectPreview, which re-renders via state anyway
const noopSubscribe = () => () => {};

/**
 * The home hero's layout and card stack, pitched at interview.justtalk.ai: the cards
 * are offers that link there, not voice agents. Which pitch a visitor sees comes from
 * the `interview-hero` PostHog experiment.
 */
export function InterviewHero() {
  // The URL decides whether this is a preview. The server can't see it, so it renders
  // `undefined` ("not known yet"), which keeps the flag unread until the client knows.
  const fromUrl = useSyncExternalStore<HeroVariant | null | undefined>(
    noopSubscribe,
    readPreview,
    () => undefined
  );
  // a tab picked in the switcher wins over the one the URL opened with
  const [picked, setPicked] = useState<HeroVariant | null>(null);
  const previewVariant = fromUrl ? (picked ?? fromUrl) : fromUrl;

  const { variant, source } = useInterviewHeroVariant(previewVariant);
  // the copy stays hidden until a variant is known, so nobody sees one pitch swap for another
  const config = variant ? HERO_VARIANT_CONFIG[variant] : null;
  const shown = variant ?? 'control';

  // context carried by every event from this hero, cards included
  const analytics = useMemo(
    () => ({
      page: 'interview_prep',
      hero_variant: variant ?? 'pending',
      hero_variant_source: source ?? 'pending',
      ...(source === 'preview' && { hero_preview: true }),
    }),
    [variant, source]
  );

  const ctaLink = (slot: HeroSlot, path: string, label: string) => ({
    href: interviewUrl(path, shown, slot),
    eventName: CTA_EVENT,
    eventProperties: { slot, cta_label: label, ...analytics },
  });

  // card links name the offer in utm_content too, e.g. problem_card_coaching
  const offerLink = (offer: Offer, rotations: number) => ({
    href: interviewUrl(offer.path, shown, `card_${offer.key}`),
    eventName: CTA_EVENT,
    eventProperties: {
      slot: 'card' as const,
      offer: offer.key,
      cta_label: offer.cta,
      deck_rotations: rotations,
      ...analytics,
    },
  });

  const selectPreview = useCallback((next: HeroVariant) => {
    setPicked(next);
    // keep the choice in the URL, so a reload or a shared link opens the same variant
    const url = new URL(window.location.href);
    url.searchParams.set('hero', next);
    window.history.replaceState(null, '', url);
  }, []);

  return (
    <section className="w-full max-w-[1320px] px-10 pt-12 md:pt-32 pb-8">
      <div className="flex flex-col gap-8">
        {/* Top Row: Text and Image */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Hero Text */}
          <div
            className={`flex flex-col md:items-start items-center text-center md:text-left ${
              config ? '' : 'invisible'
            }`}
          >
            <h1 className="text-4xl md:text-[64px] font-semibold md:leading-[59.29px] tracking-[-1.763px] text-just_cod-gray mb-0">
              {HERO_VARIANT_CONFIG[shown].headline}
            </h1>
            <div className="pt-8">
              <p className="text-base md:text-[16.3px] font-normal leading-normal tracking-[-0.17px] text-just_cod-gray max-w-xl">
                {HERO_VARIANT_CONFIG[shown].subheadline}
              </p>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[440px] md:h-[480px] shrink-0 w-full max-w-[340px] md:max-w-[380px]">
            {/* keyed by variant: switching pitch in preview restarts the stack */}
            <OfferDeck key={shown} offers={OFFERS} linkFor={offerLink} />
          </div>
        </div>

        {/* CTA Buttons - Centered Below */}
        <div className={`pt-8 flex justify-center ${config ? '' : 'invisible'}`}>
          <div className="flex flex-col sm:flex-row gap-[17px] items-center">
            <Button asChild className="cursor-pointer">
              <TrackedLink
                target="_blank"
                rel="noopener"
                {...ctaLink('primary', HERO_VARIANT_CONFIG[shown].primary.path, HERO_VARIANT_CONFIG[shown].primary.label)}
              >
                {HERO_VARIANT_CONFIG[shown].primary.label}
                <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
              </TrackedLink>
            </Button>
            <Button asChild variant="outline" className="cursor-pointer">
              <TrackedLink
                target="_blank"
                rel="noopener"
                {...ctaLink('secondary', HERO_VARIANT_CONFIG[shown].secondary.path, HERO_VARIANT_CONFIG[shown].secondary.label)}
              >
                {HERO_VARIANT_CONFIG[shown].secondary.label}
              </TrackedLink>
            </Button>
          </div>
        </div>
      </div>

      {source === 'preview' && <HeroVariantSwitcher value={shown} onChange={selectPreview} />}
    </section>
  );
}
