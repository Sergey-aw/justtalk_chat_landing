/**
 * The teacher discovery survey — one catalogue, read by the form, the Notion
 * write and the Slack ping, so a reworded option can never mean one thing on
 * the page and another in the database.
 *
 * Wording notes, since they are the point of the instrument rather than
 * decoration:
 *
 * - Nothing asks a teacher to rate how good an idea of ours sounds. People are
 *   generous about hypotheticals and it produces data that always says yes.
 *   Where we want to know if something matters, we ask what they do today
 *   (`afterLesson`, `adminTime`) or force a trade-off (`buildNext`).
 * - `understanding` runs before any question that names a feature. It is the
 *   only unprompted read we will ever get on whether the positioning lands,
 *   and one glance at our own option list would destroy it.
 * - Every list carries a deliberately unflattering escape hatch — "Honestly — I
 *   was just curious", "Nothing — it stays in my head", "I haven't logged in
 *   yet". Without one the respondent rounds up to the answer that makes them
 *   look diligent.
 * - `pmf` is asked only of teachers who got far enough for the answer to mean
 *   anything; see PMF_GATE.
 */

export interface Choice {
  /** Stable key — what we store, analyse and never translate. */
  value: string;
  /**
   * What the teacher reads. Safe to reword without breaking old responses.
   *
   * Must not contain a comma. Every catalogue here lands in a Notion select or
   * multi-select, and Notion rejects commas in option names outright — so a
   * comma doesn't degrade the write, it fails it, and the sink treats a failed
   * Notion write as fatal. Use an em dash instead; `npm run check:survey`
   * fails the build if one slips back in.
   */
  label: string;
}

/** Q1 — self-reported attribution. */
export const HEARD_FROM: Choice[] = [
  { value: "google", label: "Google search" },
  { value: "ai", label: "ChatGPT or another AI assistant" },
  { value: "youtube", label: "YouTube" },
  { value: "social", label: "Instagram or TikTok" },
  { value: "community", label: "A Facebook group or teacher community" },
  { value: "colleague", label: "A friend or colleague told me" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "ad", label: "An ad" },
  { value: "other", label: "Somewhere else" },
];

/** Q3 — the pull, asked only after the unprompted answer is banked. */
export const SIGNUP_REASONS: Choice[] = [
  { value: "ai_class", label: "The AI tools that sit inside the lesson" },
  { value: "admin", label: "Getting note-taking and admin off my plate" },
  { value: "students", label: "A way to find new students" },
  { value: "fees", label: "Keeping more of what I charge" },
  { value: "practice", label: "Somewhere my students can practise between lessons" },
  { value: "progress", label: "Being able to show students their progress properly" },
  { value: "one_place", label: "Having everything in one place instead of five tabs" },
  { value: "curious", label: "Honestly — I was just curious" },
  { value: "other", label: "Something else" },
];

/** Q4 — where they teach now. Doubles as our competitive set. */
export const TEACHING_PLACES: Choice[] = [
  { value: "own", label: "My own private students" },
  { value: "preply", label: "Preply" },
  { value: "italki", label: "italki" },
  { value: "cambly", label: "Cambly" },
  { value: "verbling", label: "Verbling" },
  { value: "superprof", label: "Superprof" },
  { value: "school", label: "A school or language academy" },
  { value: "university", label: "A university or college" },
  { value: "company", label: "In-company / corporate" },
  { value: "notyet", label: "I'm not teaching at the moment" },
  { value: "other", label: "Somewhere else" },
];

/** Q5 — roster size, the crudest but most reliable segmentation we have. */
export const WEEKLY_STUDENTS: Choice[] = [
  { value: "none", label: "None right now" },
  { value: "1to5", label: "1–5" },
  { value: "6to15", label: "6–15" },
  { value: "16to30", label: "16–30" },
  { value: "over30", label: "More than 30" },
];

/**
 * Q6 — what they actually do after a lesson.
 *
 * This is the load-bearing question of the survey. "How valuable would an
 * automatic lesson summary be?" gets a five out of everyone and tells us
 * nothing; what someone already does, unpaid, every single lesson, tells us
 * whether the summary replaces a real habit or invents one.
 */
export const AFTER_LESSON: Choice[] = [
  { value: "nothing", label: "Nothing — it stays in my head" },
  { value: "notes", label: "Quick notes in a notebook or my phone" },
  { value: "doc", label: "A document or spreadsheet per student" },
  { value: "platform", label: "Whatever the platform I teach on gives me" },
  { value: "own_system", label: "A proper system I built myself" },
  { value: "other", label: "Something else" },
];

/** Q7 — sizes the pain Q6 uncovered. */
export const ADMIN_TIME: Choice[] = [
  { value: "under5", label: "Under 5 minutes" },
  { value: "5to15", label: "5–15 minutes" },
  { value: "15to30", label: "15–30 minutes" },
  { value: "over30", label: "More than 30 minutes" },
  { value: "unsure", label: "I've genuinely never counted" },
];

/**
 * Q8 — forced trade-off. Pick-one is the whole design: a teacher who wants
 * everything has told us nothing, and a teacher who gives up five things to
 * keep one has told us where to point the roadmap.
 */
export const BUILD_NEXT: Choice[] = [
  { value: "summary", label: "An automatic summary of every lesson — written for me" },
  { value: "mistakes", label: "A running record of each student's mistakes over time" },
  { value: "homework", label: "Homework built from what actually happened in the lesson" },
  { value: "reports", label: "Progress reports I can send to students or parents" },
  { value: "practice", label: "AI practice my students do between our lessons" },
  { value: "admin", label: "Scheduling and payments handled for me" },
  { value: "other", label: "Something else entirely" },
];

/** Q9 — concrete milestones beat asking someone to rate onboarding 1–5. */
export const ONBOARDING_REACHED: Choice[] = [
  { value: "notyet", label: "I haven't logged in yet" },
  { value: "account", label: "Created my account and stopped there" },
  { value: "profile", label: "Set up my profile" },
  { value: "explored", label: "Had a look around the classroom on my own" },
  { value: "invited", label: "Invited a student" },
  { value: "taught", label: "Taught at least one real lesson" },
];

/**
 * Milestones that earn the PMF question. Asking someone who never logged in
 * how disappointed they'd be to lose us produces a number that looks like
 * product-market fit data and isn't.
 */
export const PMF_GATE = ["invited", "taught"];

/** Q11 — Sean Ellis, gated by PMF_GATE. */
export const PMF: Choice[] = [
  { value: "very", label: "Very disappointed" },
  { value: "somewhat", label: "Somewhat disappointed" },
  { value: "not", label: "Not disappointed" },
];

/** Q12 — the ask. Plain invitation; the pitch would cost us the honest no. */
export const CALL_INTEREST: Choice[] = [
  { value: "yes", label: "Yes — send me a time" },
  { value: "later", label: "Maybe later" },
  { value: "no", label: "No thanks" },
];

/** Every catalogue, keyed by the payload field it belongs to. */
export const CATALOGUES: Record<string, Choice[]> = {
  heardFrom: HEARD_FROM,
  signupReasons: SIGNUP_REASONS,
  teachingPlaces: TEACHING_PLACES,
  weeklyStudents: WEEKLY_STUDENTS,
  afterLesson: AFTER_LESSON,
  adminTime: ADMIN_TIME,
  buildNext: BUILD_NEXT,
  onboardingReached: ONBOARDING_REACHED,
  pmf: PMF,
  callInterest: CALL_INTEREST,
};

/**
 * Turns a stored key back into its English label. Unknown keys pass through
 * unchanged so a response recorded before an option was renamed still reads.
 */
export function labelFor(field: string, value: string): string {
  const choice = CATALOGUES[field]?.find((c) => c.value === value);
  return choice?.label ?? value;
}

export function labelsFor(field: string, values: string[]): string[] {
  return values.map((value) => labelFor(field, value));
}
