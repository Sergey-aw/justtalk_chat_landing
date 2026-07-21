/**
 * Source of truth for the hero AgentDeck, from landing_cards_handoff.md (v2).
 *
 * Pure data — no client-only imports — so both components/AgentDeck.tsx and the
 * app/api/get-signed-url route can consume it.
 *
 * Notes carried over from the handoff:
 * - `scenario` is the card's action title (line 1); `name` is line 2 — a persona name
 *   where the handoff gives one, otherwise the coach role.
 * - `description` rephrases each agent's three "Focus" bullets into ~3 lines of prose.
 * - `cues` are the four Speaking-state prompts (Say / Try / Follow up / Stretch), shown
 *   statically during a call.
 * - Portraits live in public/images/justtalk_agent_portraits/, one per agent.
 * - System prompts, voice-collision fixes and ElevenLabs renames are PATCH-in-ElevenLabs
 *   tasks (handoff §6), not represented here.
 */

export interface AgentCue {
  label: string;
  text: string;
}

export interface Agent {
  /** ElevenLabs agent id — each card starts its own agent */
  id: string;
  /** card line 1 — the scenario / action title */
  scenario: string;
  /** card line 2 — persona name, or coach role when the handoff gives no name */
  name: string;
  /** ~3 lines, rephrased from the handoff's Focus bullets */
  description: string;
  image: string;
  /** static Speaking-state prompts */
  cues: AgentCue[];
}

// order = handoff demand order, with Level Check promoted to first
export const agents: Agent[] = [
  {
    id: 'agent_1701ky18t3hmeewbc9g6rxs0cfps',
    scenario: 'Check Your English Level',
    name: 'Level assessor',
    description:
      'Three short speaking tasks that get gradually harder. Just speak naturally — fillers are fine — and at the end you get an honest CEFR level and one clear next step.',
    image: '/images/justtalk_agent_portraits/02_level_check.webp',
    cues: [
      { label: 'Say', text: '"Let me think… well…" — fillers are okay' },
      { label: 'Try', text: 'Answer in three sentences, not one' },
      { label: 'Follow up', text: 'Tell a short story in past tense' },
      { label: 'Stretch', text: 'Give an opinion — "I think… because…"' },
    ],
  },
  {
    id: 'agent_9001ky0enfxke19sqqd74chetxzz',
    scenario: 'Job Interview: Hot Seat',
    name: 'Interviewer',
    description:
      'A real interview under pressure — rapid questions with live follow-ups. Structure your answers with STAR (situation, action, result) and keep each one to 60–90 seconds.',
    image: '/images/justtalk_agent_portraits/01_hot_seat.webp',
    cues: [
      { label: 'Say', text: '"In my last role, I…"' },
      { label: 'Try', text: 'Quantify it — "cut costs by 15%"' },
      { label: 'Follow up', text: 'Say what you learned from it' },
      { label: 'Stretch', text: 'End with why you want this job' },
    ],
  },
  {
    id: 'agent_2501ky0endp7er2bp2yz848s1rc2',
    scenario: 'IELTS Speaking: Part 1',
    name: 'IELTS examiner',
    description:
      'Real Part 1 questions on familiar topics — home, work, study, free time. Extend every answer with a reason and an example, aiming for 20–30 seconds without memorising.',
    image: '/images/justtalk_agent_portraits/03_ielts_examiner.webp',
    cues: [
      { label: 'Say', text: '"I live in… and what I like about it is…"' },
      { label: 'Try', text: 'Add a reason — "mainly because…"' },
      { label: 'Follow up', text: 'Add one real example' },
      { label: 'Stretch', text: 'Start one answer with "To be honest…"' },
    ],
  },
  {
    id: 'agent_7601ky0encgtf1bryhzjb62czkhr',
    scenario: 'Fix Common Grammar Mistakes',
    name: 'Grammar teacher',
    description:
      'A friendly mini-lesson on the mistakes almost every learner makes — "I agree", "depends on", past tense. He explains each one, you try it out loud, and you leave with 2–3 rules that stick.',
    image: '/images/justtalk_agent_portraits/04_grammar_teacher.webp',
    cues: [
      { label: 'Say', text: '"I agree with that" — not "I am agree"' },
      { label: 'Try', text: '"It depends on…" — never "of"' },
      { label: 'Follow up', text: 'Retell it in past tense — "Yesterday I…"' },
      { label: 'Stretch', text: '"She works" — don’t drop the s' },
    ],
  },
  {
    id: 'agent_0701kxxg4npbfe9a5krn7r3cyegf',
    scenario: '2-Minute Warm-Up',
    name: 'Maya',
    description:
      'Two gentle minutes to get your English brain running before work or class. Talk through your day — past, present and plans — in full sentences, with no pressure.',
    image: '/images/justtalk_agent_portraits/05_maya_warmup.webp',
    cues: [
      { label: 'Say', text: '"This morning I…"' },
      { label: 'Try', text: 'Add one feeling word' },
      { label: 'Follow up', text: 'One plan — "Today I’m going to…"' },
      { label: 'Stretch', text: 'Say it again, smoother' },
    ],
  },
  {
    id: 'agent_8001kxxg4qw3fyb8z1nj6k01p862',
    scenario: 'Work English Practice',
    name: 'Sean',
    description:
      'Workplace English — describe your job and current project, then give an update with progress and one blocker. Clear beats complex, so short sentences win.',
    image: '/images/justtalk_agent_portraits/06_sean_work.webp',
    cues: [
      { label: 'Say', text: '"In our team, we…"' },
      { label: 'Try', text: 'Explain a task you own' },
      { label: 'Follow up', text: 'One challenge + how you solved it' },
      { label: 'Stretch', text: 'Summarize it all in one sentence' },
    ],
  },
  {
    id: 'agent_6001kxxg4pwkf6s8s9v7m3cf3br5',
    scenario: 'Polish Your Interview Answer',
    name: 'Sarah',
    description:
      'Work one interview answer — "Tell me about yourself" — until it truly lands. Structure it present → past → future, and add one number that proves it.',
    image: '/images/justtalk_agent_portraits/07_sarah_coach.webp',
    cues: [
      { label: 'Say', text: '"I’m a [role] with X years in…"' },
      { label: 'Try', text: 'Present → past → future order' },
      { label: 'Follow up', text: 'Add one proof number' },
      { label: 'Stretch', text: 'Now trim it to 45 seconds' },
    ],
  },
  {
    id: 'agent_9101ky18t4jtffdtx770yx97jv6g',
    scenario: 'Tell a Great Story',
    name: 'Storytelling coach',
    description:
      'Turn something that happened to you into a story worth hearing. Build the arc — beginning, middle, twist, ending — let past tenses carry it, and let one sensory detail do the work of five adjectives.',
    image: '/images/justtalk_agent_portraits/08_storytelling.webp',
    cues: [
      { label: 'Say', text: '"This happened last year, when…"' },
      { label: 'Try', text: 'Set the scene — where, when, who' },
      { label: 'Follow up', text: '"And then, suddenly…"' },
      { label: 'Stretch', text: 'End with what it taught you' },
    ],
  },
  {
    id: 'agent_2901ky18t5q7ew0brsh1wz88jx73',
    scenario: 'Debate a Hot Topic',
    name: 'Debate partner',
    description:
      'Pick a topic, take a side and defend it — friendly sparring that stretches your English. State your opinion with two reasons, handle the counter-argument politely, and change your mind if you’re convinced.',
    image: '/images/justtalk_agent_portraits/09_debate.webp',
    cues: [
      { label: 'Say', text: '"I believe… for two reasons"' },
      { label: 'Try', text: '"On the other hand…" — argue the other side' },
      { label: 'Follow up', text: 'Concede — "That’s fair, but…"' },
      { label: 'Stretch', text: 'Rebut with a real example' },
    ],
  },
  {
    id: 'agent_2701ky0ena8dexcv35ayxesd72e9',
    scenario: 'Speed Date',
    name: 'Alina',
    description:
      'A fun first date in English — keep it light and keep it flowing. Answer, then add a detail; ask questions back to show interest; react first, then relate it to yourself.',
    image: '/images/justtalk_agent_portraits/10_alina_date.webp',
    cues: [
      { label: 'Say', text: '"So, what do you do for fun?"' },
      { label: 'Try', text: 'Answer, then add one detail' },
      { label: 'Follow up', text: 'Ask her the same question back' },
      { label: 'Stretch', text: 'Tell a 30-second story' },
    ],
  },
  {
    id: 'agent_1601ky0enbc4fr5v6z1jzps377gy',
    scenario: 'Speed Date',
    name: 'Mateo',
    description:
      'A relaxed first date in English — charm works in a second language too. Keep it light, share a little then ask back, and remember a short story beats a long answer.',
    image: '/images/justtalk_agent_portraits/11_mateo_date.webp',
    cues: [
      { label: 'Say', text: '"Tell me something surprising about you"' },
      { label: 'Try', text: 'React — "No way! Then what?"' },
      { label: 'Follow up', text: 'Relate it to your own life' },
      { label: 'Stretch', text: 'Compliment without the word "nice"' },
    ],
  },
];

/** Allow-list for the signed-url route, so we never proxy an arbitrary agent id. */
export const AGENT_IDS = new Set(agents.map((a) => a.id));
