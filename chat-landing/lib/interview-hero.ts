/**
 * The interview-prep hero experiment: two ways of pitching the Interview Audit on
 * interview.justtalk.ai, each beside the same stack of Audit cards. Pure data, so the
 * page, the preview switcher and any future server-side assignment all read the same
 * definitions.
 *
 * Each variant tests one hypothesis about why people click through:
 * - control: lead with the Audit, in the destination's own words, so the page people
 *            land on says what the hero promised.
 * - problem: name the problem — sounding as good as you are — before naming a product.
 *
 * Only the Audit is marketed here; the Sprint is left to interview.justtalk.ai.
 * No prices anywhere: interview.justtalk.ai is A/B testing the Audit at $99 and $149,
 * so any figure here would contradict the page some visitors land on.
 * Claims below mirror interview.justtalk.ai; keep them in step with that page.
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

export interface Offer {
  key: OfferKey;
  title: string;
  /** line 2 on the card */
  subtitle: string;
  /** shown on the top card only */
  description: string;
  cta: string;
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
  {
    key: 'audit',
    title: 'Interview Audit',
    subtitle: 'Live mock + expert report',
    description:
      'A 50-minute mock interview built from your CV and the job details. An expert report follows within 24 hours, with what to fix first.',
    cta: 'Get your Audit',
    path: '/audit',
    image: '/images/justtalk_agent_portraits/01_hot_seat.webp',
  },
  {
    key: 'report',
    title: 'Expert report',
    subtitle: 'Within 24 hours',
    description:
      'Your mock reviewed across Content, Structure, Delivery, Interaction and Language: strengths, weaknesses and priority fixes, with directions to practise.',
    cta: 'Get your Audit',
    path: '/audit',
    image: '/images/justtalk_agent_portraits/07_sarah_coach.webp',
  },
  {
    key: 'sessions',
    title: 'Inside a real mock',
    subtitle: 'On video',
    description:
      'Short clips from real JustTalk mock interviews. See how the live interview every Audit starts with actually runs.',
    cta: 'Watch the clips',
    path: '/#sessions',
    image: '/images/justtalk_agent_portraits/06_sean_work.webp',
  },
];

interface HeroCta {
  label: string;
  /** path on interview.justtalk.ai, optionally with a #hash */
  path: string;
}

export interface HeroVariantConfig {
  /** short name for the preview switcher */
  name: string;
  hypothesis: string;
  headline: string;
  subheadline: string;
  primary: HeroCta;
  secondary: HeroCta;
}

/** Both variants send people to the same places, so the test isolates the message. */
const AUDIT_CTAS = {
  primary: { label: 'Get your Interview Audit', path: '/audit' },
  secondary: { label: 'See how the Audit works', path: '/#how' },
};

export const HERO_VARIANT_CONFIG: Record<HeroVariant, HeroVariantConfig> = {
  control: {
    name: 'Lead with the Audit',
    hypothesis: 'Using the destination’s own words means visitors land on what was promised.',
    headline: 'Interview abroad at the level you’ve earned',
    subheadline:
      'A live 50-minute mock interview for your target role, then an expert report within 24 hours: what strengthens your case, what weakens it, and what to fix first.',
    ...AUDIT_CTAS,
  },
  problem: {
    name: 'Name the problem',
    hypothesis: 'Naming the problem converts better than naming the product.',
    headline: 'You know your work. Make your answers sound like it',
    subheadline:
      'Interviewing in English when it isn’t your first language? Rehearse a live mock for the role you want, and an expert shows you exactly what to fix first.',
    ...AUDIT_CTAS,
  },
};

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
