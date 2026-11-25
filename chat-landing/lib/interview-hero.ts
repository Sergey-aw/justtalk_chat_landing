/**
 * The home hero experiment: two ways of pitching the Interview Audit on
 * interview.justtalk.ai, each beside the same stack of Audit cards. Pure data, so the
 * hero, the preview switcher and any future server-side assignment all read the same
 * definitions. The copy itself lives in messages/*.json under `interviewHero`.
 *
 * Each variant tests one hypothesis about why people click through:
 * - control: lead with the Audit, in the destination's own words, so the page people
 *            land on says what the hero promised.
 * - problem: name the problem — sounding as good as you are — before naming a product.
 *
 * Only the Audit is marketed here; the Sprint is left to interview.justtalk.ai.
 * No prices anywhere: interview.justtalk.ai is A/B testing the Audit at $99 and $149,
 * so any figure here would contradict the page some visitors land on.
 * The copy mirrors interview.justtalk.ai; keep it in step with that page.
 */

/** PostHog multivariate flag. Experiments require the first variant to be `control`. */
export const INTERVIEW_HERO_FLAG = 'interview-hero';

export const HERO_VARIANTS = ['control', 'problem'] as const;
export type HeroVariant = (typeof HERO_VARIANTS)[number];

export const isHeroVariant = (value: unknown): value is HeroVariant =>
  typeof value === 'string' && (HERO_VARIANTS as readonly string[]).includes(value);

/** Where a click came from inside the hero, carried in utm_content and on the event. */
export type HeroSlot = 'primary' | 'secondary' | 'card';

export const OFFER_KEYS = ['audit', 'report', 'sessions'] as const;
export type OfferKey = (typeof OFFER_KEYS)[number];

/** Where a card links and what it shows; its words come from `interviewHero.offers.<key>`. */
export interface Offer {
  key: OfferKey;
  /** path on interview.justtalk.ai, optionally with a #hash */
  path: string;
  image: string;
}

/**
 * The cards beside both variants, all about the Audit: what it is, what you get from
 * it, and proof of how it runs. Portraits are the home deck's agent portraits, used as
 * illustration only: no names, so no card claims to show a particular expert.
 */
export const OFFERS: Offer[] = [
  { key: 'audit', path: '/audit', image: '/images/justtalk_agent_portraits/01_hot_seat.webp' },
  { key: 'report', path: '/audit', image: '/images/justtalk_agent_portraits/07_sarah_coach.webp' },
  { key: 'sessions', path: '/#sessions', image: '/images/justtalk_agent_portraits/06_sean_work.webp' },
];

/**
 * Per-variant settings. Headline and subheadline come from
 * `interviewHero.variants.<variant>`; `name` and `hypothesis` are English on purpose —
 * they only appear in the preview switcher.
 */
export interface HeroVariantConfig {
  name: string;
  hypothesis: string;
}

export const HERO_VARIANT_CONFIG: Record<HeroVariant, HeroVariantConfig> = {
  control: {
    name: 'Lead with the Audit',
    hypothesis: 'Using the destination’s own words means visitors land on what was promised.',
  },
  problem: {
    name: 'Name the problem',
    hypothesis: 'Naming the problem converts better than naming the product.',
  },
};

/** Both variants send people to the same places, so the test isolates the message. */
export const HERO_CTAS = {
  primary: '/audit',
  secondary: '/#how',
} as const;

/**
 * A link into interview.justtalk.ai. `ref` matches the site's other outbound links;
 * the utm_* params are what PostHog records on the destination, and utm_content
 * carries variant + slot so a conversion there can be traced to the exact button.
 */
export function interviewUrl(path: string, variant: HeroVariant, slot: string) {
  const url = new URL(path, 'https://interview.justtalk.ai');
  url.search = new URLSearchParams({
    ref: 'justtalk.ai',
    utm_source: 'justtalk.ai',
    utm_medium: 'landing',
    utm_campaign: 'interview_hero',
    utm_content: `${variant}_${slot}`,
  }).toString();
  return url.toString();
}
