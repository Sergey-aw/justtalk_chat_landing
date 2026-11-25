'use client';

import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { OfferDeck, type OfferCard } from '@/components/OfferDeck';
import { TrackedLink } from '@/components/TrackedLink';
import { HeroVariantSwitcher } from '@/components/HeroVariantSwitcher';
import { useInterviewHeroVariant } from '@/hooks/useInterviewHeroVariant';
import {
  HERO_CTAS,
  interviewUrl,
  isHeroVariant,
  OFFERS,
  type HeroSlot,
  type HeroVariant,
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
 * The home hero: the Interview Audit on interview.justtalk.ai, pitched one of two
 * ways by the `interview-hero` PostHog experiment, beside a stack of offer cards that
 * link there.
 *
 * Control is on screen from the first frame, so nobody waits on PostHog. Visitors it
 * puts in `problem` see that copy fade in once their flag arrives; if it takes longer
 * than the hook's budget, they stay on control and out of the experiment.
 */
export function InterviewHero({ page }: { page: string }) {
  const t = useTranslations('interviewHero');

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
  const shown: HeroVariant = variant ?? 'control';

  // context carried by every event from this hero, cards included: what the visitor
  // actually saw, and whether that came from the experiment
  const analytics = useMemo(
    () => ({
      page,
      hero_variant: shown,
      hero_variant_source: source ?? 'pending',
      ...(source === 'preview' && { hero_preview: true }),
    }),
    [page, shown, source]
  );

  const ctaLink = (slot: HeroSlot, path: string) => ({
    href: interviewUrl(path, shown, slot),
    eventName: CTA_EVENT,
    eventProperties: { slot, ...analytics },
  });

  // card links name the offer in utm_content too, e.g. problem_card_report
  const offerLink = (offer: OfferCard, rotations: number) => ({
    href: interviewUrl(offer.path, shown, `card_${offer.key}`),
    eventName: CTA_EVENT,
    eventProperties: { slot: 'card' as const, offer: offer.key, deck_rotations: rotations, ...analytics },
  });

  const offers: OfferCard[] = OFFERS.map((offer) => ({
    ...offer,
    title: t(`offers.${offer.key}.title`),
    subtitle: t(`offers.${offer.key}.subtitle`),
    description: t(`offers.${offer.key}.description`),
    cta: t(`offers.${offer.key}.cta`),
  }));

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
          {/* Hero Text. Keyed by variant: control renders straight away (and on the
              server); a later swap to another variant fades in rather than jumping. */}
          <motion.div
            key={shown}
            initial={shown === 'control' ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:items-start items-center text-center md:text-left"
          >
            <h1 className="text-4xl md:text-[64px] font-semibold md:leading-[59.29px] tracking-[-1.763px] text-just_cod-gray mb-0">
              {t(`variants.${shown}.headline`)}
            </h1>
            <div className="pt-8">
              <p className="text-base md:text-[16.3px] font-normal leading-normal tracking-[-0.17px] text-just_cod-gray max-w-xl">
                {t(`variants.${shown}.subheadline`)}
              </p>
            </div>
          </motion.div>

          {/* Hero Image */}
          <div className="relative h-[440px] md:h-[480px] shrink-0 w-full max-w-[340px] md:max-w-[380px]">
            <OfferDeck
              offers={offers}
              linkFor={offerLink}
              describe={(title) => t('deckLabel', { title })}
            />
          </div>
        </div>

        {/* CTA Buttons - Centered Below */}
        <div className="pt-8 flex justify-center">
          <div className="flex flex-col sm:flex-row gap-[17px] items-center">
            <Button asChild className="cursor-pointer">
              <TrackedLink target="_blank" rel="noopener" {...ctaLink('primary', HERO_CTAS.primary)}>
                {t('cta.primary')}
                <Image src="/icons/arrow-right.svg" alt="" width={16} height={16} className="brightness-0 invert" />
              </TrackedLink>
            </Button>
            <Button asChild variant="outline" className="cursor-pointer">
              <TrackedLink target="_blank" rel="noopener" {...ctaLink('secondary', HERO_CTAS.secondary)}>
                {t('cta.secondary')}
              </TrackedLink>
            </Button>
          </div>
        </div>
      </div>

      {source === 'preview' && <HeroVariantSwitcher value={shown} onChange={selectPreview} />}
    </section>
  );
}
