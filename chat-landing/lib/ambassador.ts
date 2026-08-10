/**
 * The 10/10/10 offer. Kept in one place so the headline cards, the earnings
 * calculator and the copy interpolations can never drift apart.
 */
export const AMBASSADOR_OFFER = {
  /** Percent of student payments JustTalk keeps. */
  takeRate: 10,
  /** Weeks the take rate is locked for. */
  weeks: 10,
  /** Free lessons an ambassador can hand out across their students. */
  freeLessons: 10,
} as const;
