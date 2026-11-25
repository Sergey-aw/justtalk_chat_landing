'use client';

import { useEffect, useState } from 'react';
import posthog from 'posthog-js';
import { INTERVIEW_HERO_FLAG, isHeroVariant, type HeroVariant } from '@/lib/interview-hero';

/**
 * How the variant was chosen, sent on every hero event so analysis can drop anything
 * that wasn't a real experiment assignment.
 * - flag:     PostHog assigned it; the user is in the experiment.
 * - default:  flags loaded but the flag is off or missing, so control is shown.
 * - fallback: flags didn't arrive in time (blocked, offline, bot), so control is shown.
 * - preview:  forced by the preview switcher; the flag is never evaluated.
 */
export type HeroVariantSource = 'flag' | 'default' | 'fallback' | 'preview';

/**
 * How long a visitor can be switched off control once their flag arrives. Control is
 * on screen meanwhile; past this, they stay on it and out of the experiment rather than
 * see the copy change under them late. Measured from a far-from-US machine, PostHog's
 * US endpoint answers in ~1.1–2.8s through the /ingest proxy.
 */
const FLAG_TIMEOUT_MS = 3000;

/**
 * @param previewVariant the variant forced by preview mode; `null` when this is a real
 *   visit; `undefined` while the page hasn't worked out which yet. Only `null` ever
 *   reads the flag.
 */
export function useInterviewHeroVariant(previewVariant: HeroVariant | null | undefined): {
  variant: HeroVariant | null;
  source: HeroVariantSource | null;
} {
  const [resolved, setResolved] = useState<{
    variant: HeroVariant;
    source: HeroVariantSource;
  } | null>(null);

  useEffect(() => {
    // Preview never touches the flag: reading it would log an exposure and put
    // whoever is reviewing the copy into the experiment. Nor does the moment before
    // we know whether this is a preview.
    if (previewVariant !== null) return;

    let settled = false;
    const settle = (variant: HeroVariant, source: HeroVariantSource) => {
      if (settled) return;
      settled = true;
      setResolved({ variant, source });
    };

    const unsubscribe = posthog.onFeatureFlags((_flags, _variants, context) => {
      // If the fallback already showed control, reading the flag now would log an
      // exposure for a variant this visitor never saw. Leave them out instead.
      if (settled) return;
      // Peek first: an exposure is only worth logging for a real assignment, not for
      // a failed request or a flag that doesn't exist yet.
      const peek = context?.errorsLoading
        ? undefined
        : posthog.getFeatureFlag(INTERVIEW_HERO_FLAG, { send_event: false });
      if (!isHeroVariant(peek)) {
        settle('control', context?.errorsLoading ? 'fallback' : 'default');
        return;
      }
      // This read logs $feature_flag_called: the exposure the experiment counts.
      posthog.getFeatureFlag(INTERVIEW_HERO_FLAG);
      settle(peek, 'flag');
    });
    const timer = setTimeout(() => settle('control', 'fallback'), FLAG_TIMEOUT_MS);

    return () => {
      unsubscribe?.();
      clearTimeout(timer);
    };
  }, [previewVariant]);

  if (previewVariant) return { variant: previewVariant, source: 'preview' };
  return resolved ?? { variant: null, source: null };
}
