'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  HERO_VARIANTS,
  HERO_VARIANT_CONFIG,
  isHeroVariant,
  type HeroVariant,
} from '@/lib/interview-hero';

const LETTERS: Record<HeroVariant, string> = { control: 'A', problem: 'B' };

/**
 * Preview-only tab bar for flipping between the experiment's variants. Rendered only
 * in preview mode, where the PostHog flag is never read, so reviewing the copy can't
 * put anyone into the experiment.
 */
export function HeroVariantSwitcher({
  value,
  onChange,
}: {
  value: HeroVariant;
  onChange: (variant: HeroVariant) => void;
}) {
  return (
    // Desktop: in the empty band between the header and the hero, clear of the CTAs
    // being tested. Mobile: pinned to the bottom, where it can't cover the fold.
    <div className="fixed inset-x-0 bottom-4 md:bottom-auto md:top-[76px] z-[60] flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex max-w-full flex-col items-center gap-1.5 rounded-2xl border border-just_black-10 bg-just_white/95 px-2.5 py-2 shadow-lg backdrop-blur">
        <Tabs
          value={value}
          onValueChange={(v) => isHeroVariant(v) && onChange(v)}
          className="w-auto max-w-full"
        >
          <TabsList className="h-9 max-w-full overflow-x-auto">
            {HERO_VARIANTS.map((variant) => (
              <TabsTrigger
                key={variant}
                value={variant}
                className="cursor-pointer px-3 data-[state=active]:bg-just_cod-gray data-[state=active]:text-white"
                aria-label={`Show variant ${LETTERS[variant]}: ${HERO_VARIANT_CONFIG[variant].name}`}
              >
                <span className="font-semibold">{LETTERS[variant]}</span>
                <span className="hidden sm:inline">· {HERO_VARIANT_CONFIG[variant].name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <p className="hidden sm:block max-w-[560px] px-1 text-center text-xs leading-[16px] tracking-[-0.14px] text-just_scorpion">
          <span className="font-medium text-just_cod-gray">Preview</span> · flag not evaluated ·{' '}
          <span className="font-mono text-[11px] text-just_cod-gray">{value}</span>:{' '}
          {HERO_VARIANT_CONFIG[value].hypothesis}
        </p>
      </div>
    </div>
  );
}
