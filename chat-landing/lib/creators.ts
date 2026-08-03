/**
 * Creator program terms. Kept in one place so the offer cards, the FAQ and the
 * interpolated copy can never state different numbers.
 *
 * `maxRevenueShare` is an "up to" ceiling — the rate a creator actually lands on
 * is agreed during onboarding, so the page never promises a flat figure.
 */
export const CREATOR_PROGRAM = {
  /** Maximum share of a referred subscriber's payments, in percent. */
  maxRevenueShare: 50,
} as const;
