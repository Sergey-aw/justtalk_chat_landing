'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useConversation } from '@elevenlabs/react';
import posthog from 'posthog-js';
import {
  Mic,
  MicOff,
  Square,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { agents, type Agent } from '@/lib/agents';
import { TrackedLink } from '@/components/TrackedLink';
import {
  DeckArrows,
  SwipeCard,
  useIsomorphicLayoutEffect,
  useSwipeDeck,
} from '@/components/SwipeDeck';

/** What the top card shows once a call has ended. */
type Phase = 'idle' | 'feedback' | 'thanks';

/**
 * The report is entirely decorative — it's blurred out and exists to tease the real
 * breakdown behind the email gate. Scores and lines are randomised per call so the
 * teaser doesn't look identical every time.
 */
interface Report {
  metrics: { label: string; score: number }[];
  lines: string[];
  paragraph: string;
}

const METRIC_LABELS = ['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'] as const;

const SUMMARY_PARAGRAPHS = [
  'Overall this was a confident, natural conversation — you held the thread well and recovered smoothly whenever you reached for a word. The main thing holding you back is consistency under pressure: the small slips that creep in as you speed up. Slow down by a beat and most of them disappear.',
  'You clearly have the vocabulary to express complex ideas, and your answers were well organised from start to finish. Grammar was mostly accurate, with a few slips in tense and article use. Tightening those would lift your fluency score noticeably next time.',
  'A strong performance with good range and real expression in your voice. Your pronunciation is clear and easy to follow throughout. The quickest win now is stretching each answer with a reason and an example, rather than stopping as soon as the point is made.',
  'Really promising — you took risks with longer sentences instead of playing it safe, and that is exactly how progress happens. A couple of structures wobbled, but your meaning always came through. With a little polish on connected speech you will sound markedly more fluent.',
];

const COACHING_LINES = [
  'Confident, natural pace — you rarely paused mid-sentence.',
  'Good vocabulary range; a few word choices could be sharper.',
  'Watch article usage — "a" vs "the" slipped once or twice.',
  'Past-tense endings dropped under pressure a couple of times.',
  'Strong openings, but some answers trailed off at the end.',
  'Nice linking words tying your ideas together.',
  'Third-person "-s" went missing on a verb or two.',
  'You self-corrected well — a sign of real control.',
  'Clear pronunciation; a handful of vowel sounds to refine.',
  'Great detail — you backed up your points with examples.',
];

const randInt = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min + 1));

/** Client-only (called from a call-ended event, never during SSR). */
function generateReport(): Report {
  const metrics = METRIC_LABELS.map((label) => ({ label, score: randInt(58, 94) }));
  const pool = [...COACHING_LINES];
  const lines: string[] = [];
  for (let i = 0; i < 3 && pool.length; i++) {
    lines.push(pool.splice(randInt(0, pool.length - 1), 1)[0]);
  }
  const paragraph = SUMMARY_PARAGRAPHS[randInt(0, SUMMARY_PARAGRAPHS.length - 1)];
  return { metrics, lines, paragraph };
}

/** Why a call failed to start, so the card can explain it rather than doing nothing. */
type CallError = 'mic-denied' | 'mic-missing' | 'connection';

const ERROR_COPY: Record<CallError, string> = {
  'mic-denied': 'Microphone blocked. Allow mic access in your browser, then try again.',
  'mic-missing': 'No microphone found. Connect one and try again.',
  connection: "Couldn't connect. Please try again.",
};

/** Conversations are capped, matching the existing hero demo copy. */
const CALL_SECONDS = 5 * 60;
/** Below this there isn't enough speech to be worth reporting on. */
const MIN_FEEDBACK_SECONDS = 15;
const BAR_COUNT = 5;

const formatTime = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.max(0, s % 60)).padStart(2, '0')}`;

interface VoiceBarsProps {
  /** agent output spectrum while it speaks, user mic spectrum while it listens */
  getOutputData: () => Uint8Array<ArrayBuffer> | undefined;
  getInputData: () => Uint8Array<ArrayBuffer> | undefined;
  isSpeaking: boolean;
}

function VoiceBars({ getOutputData, getInputData, isSpeaking }: VoiceBarsProps) {
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);
  // read through a ref so flipping speaking/listening doesn't restart the rAF loop
  const speakingRef = useRef(isSpeaking);
  speakingRef.current = isSpeaking;

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const data = speakingRef.current ? getOutputData() : getInputData();

      for (let i = 0; i < BAR_COUNT; i++) {
        let level = 0;
        if (data && data.length) {
          // spread the bars across the lower half of the spectrum, where speech lives
          const band = Math.max(1, Math.floor(data.length / 2 / BAR_COUNT));
          let sum = 0;
          for (let j = 0; j < band; j++) sum += data[i * band + j] ?? 0;
          level = Math.min(1, (sum / band / 255) * 2.4);
        }
        const el = barsRef.current[i];
        if (el) el.style.transform = `scaleY(${Math.max(0.18, level)})`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [getOutputData, getInputData]);

  return (
    <span className="flex h-4 items-center gap-[3px]" aria-hidden="true">
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <span
          key={i}
          ref={(el) => {
            barsRef.current[i] = el;
          }}
          className="h-4 w-[3px] origin-center rounded-full bg-white"
          style={{ transform: 'scaleY(0.18)', willChange: 'transform' }}
        />
      ))}
    </span>
  );
}

interface CardProps {
  agent: Agent;
  index: number;
  /** non-null while this card should fly out; value is the direction (-1 | 1) */
  flyOut: number | null;
  onRequestSwipe: (dir: number) => void;
  onExited: () => void;
  isConnected: boolean;
  isSpeaking: boolean;
  /** seconds left before the conversation auto-ends */
  remaining: number;
  isConnecting: boolean;
  error: CallError | null;
  phase: Phase;
  report: Report | null;
  getOutputData: () => Uint8Array<ArrayBuffer> | undefined;
  getInputData: () => Uint8Array<ArrayBuffer> | undefined;
  onStart: () => void;
  onStop: () => void;
  onSubmitEmail: (email: string) => void;
  onTryAnother: () => void;
  /** run the one-time "swipeable" nudge on this (top) card */
  hint: boolean;
  onHintDone: () => void;
}

function Card({
  agent,
  index,
  flyOut,
  onRequestSwipe,
  onExited,
  isConnected,
  isSpeaking,
  remaining,
  isConnecting,
  error,
  phase,
  report,
  getOutputData,
  getInputData,
  onStart,
  onStop,
  onSubmitEmail,
  onTryAnother,
  hint,
  onHintDone,
}: CardProps) {
  const isTop = index === 0;
  const showReport = isTop && phase !== 'idle';
  const [email, setEmail] = useState('');

  return (
    <SwipeCard
      image={agent.image}
      alt={agent.name}
      index={index}
      flyOut={flyOut}
      onRequestSwipe={onRequestSwipe}
      onExited={onExited}
      draggable={!isConnected && !showReport}
      hint={hint}
      onHintDone={onHintDone}
    >
        {/* Post-call report / thank-you. Nothing here is persisted or sent yet. */}
        {showReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-20 flex flex-col justify-end bg-black/65 p-6"
            onPointerDown={(e) => e.stopPropagation()}
          >
            {phase === 'feedback' ? (
              <>
                <p className="text-[11px] font-medium uppercase tracking-wide text-white/60">
                  Your conversation with {agent.name}
                </p>

                {/* blurred so the scores read as "locked", never as real data */}
                <div
                  className="mt-3 select-none space-y-2 blur-[8px]"
                  aria-hidden="true"
                >
                  {(report?.metrics ?? []).map((m) => (
                    <div key={m.label}>
                      <div className="flex justify-between text-[11px] text-white/80">
                        <span>{m.label}</span>
                        <span>{m.score}%</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/25">
                        <div
                          className="h-full rounded-full bg-white"
                          style={{ width: `${m.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* teaser coaching notes — also locked/blurred */}
                <div
                  className="mt-3 select-none space-y-1 blur-[5px]"
                  aria-hidden="true"
                >
                  {(report?.lines ?? []).map((line, i) => (
                    <p key={i} className="text-[11px] leading-[15px] text-white/80">
                      {line}
                    </p>
                  ))}
                  {report?.paragraph && (
                    <p className="pt-1 text-[11px] leading-[15px] text-white/80">
                      {report.paragraph}
                    </p>
                  )}
                </div>

                <h4 className="mt-4 text-base font-semibold text-white">
                  Get your full results
                </h4>
                <p className="mt-1 text-xs leading-[16px] text-white/70">
                  We&apos;ll email the breakdown of how you spoke.
                </p>

                <form
                  className="mt-3 flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSubmitEmail(email.trim());
                  }}
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    aria-label="Email address"
                    className="min-w-0 flex-1 rounded-full bg-white/15 px-4 py-2 text-sm text-white outline-none transition-colors placeholder:text-white/50 focus:bg-white/25"
                  />
                  <button
                    type="submit"
                    className="shrink-0 cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-medium text-just_cod-gray transition-transform hover:scale-[1.03] active:scale-95"
                  >
                    Send
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-start">
                <CheckCircle2 className="h-8 w-8 text-white" strokeWidth={1.5} />
                <h4 className="mt-3 text-lg font-semibold text-white">Thanks!</h4>
                <p className="mt-1 text-sm leading-[19px] text-white/75">
                  Your results are on the way. Create a free account to save your
                  progress and keep practising.
                </p>
                <div className="mt-4 flex w-full items-center gap-2">
                  <TrackedLink
                    href="https://chat.justtalk.ai/welcome?ref=justtalk.ai"
                    target="_blank"
                    rel="noopener"
                    eventName="agent_deck_signup_clicked"
                    eventProperties={{ location: 'agent_deck_thanks', agent: agent.id, agent_scenario: agent.scenario }}
                    includePricingVariant={true}
                    className="inline-flex flex-1 cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-sm font-medium text-just_cod-gray transition-transform hover:scale-[1.03] active:scale-95"
                  >
                    Create account
                  </TrackedLink>
                  <button
                    type="button"
                    onClick={onTryAnother}
                    className="inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-full border border-white/40 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    Try another
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Extra scrim during an active call: the cue rows sit higher up the card than
            the title block, so darken the bottom half for readability over the photo. */}
        {isConnected && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/55 to-transparent" />
        )}

        {/* Content */}
        <div
          className={`absolute inset-x-0 bottom-0 p-6 ${showReport ? 'invisible' : ''}`}
        >
          {isConnected ? (
            /* In-call: cue prompts replace the title block, controls stay put */
            <>
              <ul className="space-y-1.5">
                {agent.cues.map((cue) => (
                  <li
                    key={cue.label}
                    className="rounded-lg border border-white/25 px-3 py-2 text-sm font-medium leading-[18px] text-white"
                  >
                    <span className="text-white/75">{cue.label}:</span> {cue.text}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onStop}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-just_cod-gray transition-transform hover:scale-[1.03] active:scale-95"
                >
                  <Square className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                  Stop
                </button>

                <VoiceBars
                  getOutputData={getOutputData}
                  getInputData={getInputData}
                  isSpeaking={isSpeaking}
                />

                <span
                  className="text-xs font-medium tabular-nums text-white/85"
                  aria-live="polite"
                >
                  {formatTime(remaining)} left
                </span>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-semibold tracking-[-0.5px] text-white">
                {agent.scenario}
              </h3>
              <p className="mt-0.5 text-base font-semibold text-white/75">{agent.name}</p>

              {/* description + CTA only on the top card */}
              <motion.div
                initial={false}
                animate={{ opacity: isTop ? 1 : 0, y: isTop ? 0 : 8 }}
                transition={{ duration: 0.25 }}
                aria-hidden={!isTop}
                style={{ pointerEvents: isTop ? 'auto' : 'none' }}
              >
                <p className="mt-3 text-sm leading-[20px] text-white/85">
                  {agent.description}
                </p>

                <button
                  type="button"
                  onClick={onStart}
                  disabled={isConnecting}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-just_cod-gray transition-transform hover:scale-[1.03] active:scale-95 disabled:cursor-default disabled:opacity-70 disabled:hover:scale-100"
                >
                  {error === 'mic-denied' || error === 'mic-missing' ? (
                    <MicOff className="h-4 w-4" strokeWidth={2} />
                  ) : (
                    <Mic className="h-4 w-4" strokeWidth={2} />
                  )}
                  {isConnecting ? 'Connecting…' : error ? 'Try again' : 'Start talking'}
                </button>

                {error && (
                  <p
                    role="alert"
                    className="mt-2 flex items-start gap-1.5 text-xs leading-[16px] text-white/85"
                  >
                    <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                    {ERROR_COPY[error]}
                  </p>
                )}
              </motion.div>
            </>
          )}
        </div>
    </SwipeCard>
  );
}

export function AgentDeck() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<CallError | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [report, setReport] = useState<Report | null>(null);
  const { deck, setDeck, flyOut, swipe: handleSwipe, handleExited, showHint, endHint } =
    useSwipeDeck<Agent>(agents, {
      onAdvance: () => {
        setError(null); // the error belonged to the card we just dismissed
        setPhase('idle'); // …so did its report
      },
    });
  // onDisconnect also fires for calls that never connected — only those count as "ended"
  const hasConnectedRef = useRef(false);
  // wall-clock start, so call duration doesn't depend on a possibly-stale state closure
  const callStartedAtRef = useRef(0);
  // both must outlive the call itself — the email is submitted after the session ends
  const conversationIdRef = useRef<string | null>(null);
  const lastCallSecondsRef = useRef(0);

  // Randomize which card leads, once on mount. Done in an effect (not the initial state)
  // so server and first client render agree — Math.random here would break hydration.
  // A layout effect swaps the order before the first paint, so the default order is
  // never visible. Rotates rather than shuffles, keeping the curated order after the lead.
  useIsomorphicLayoutEffect(() => {
    const start = Math.floor(Math.random() * agents.length);
    if (start > 0) {
      setDeck([...agents.slice(start), ...agents.slice(0, start)]);
    }
  }, []);

  const topAgent = deck[0];

  const conversation = useConversation({
    onConnect: () => {
      hasConnectedRef.current = true;
      callStartedAtRef.current = Date.now();
      posthog.capture('voice_conversation_started', {
        variant: 'agent_deck',
        agent: topAgent?.id,
        agent_scenario: topAgent?.scenario,
      });
    },
    onDisconnect: () => {
      let durationSeconds = 0;
      if (hasConnectedRef.current) {
        hasConnectedRef.current = false;
        durationSeconds = (Date.now() - callStartedAtRef.current) / 1000;
        lastCallSecondsRef.current = durationSeconds;
        // only offer a report once there's actually been enough speech to report on
        if (durationSeconds >= MIN_FEEDBACK_SECONDS) {
          setReport(generateReport());
          setPhase('feedback');
        }
      }
      posthog.capture('voice_conversation_ended', {
        variant: 'agent_deck',
        agent: topAgent?.id,
        agent_scenario: topAgent?.scenario,
        duration_seconds: Math.round(durationSeconds),
        report_offered: durationSeconds >= MIN_FEEDBACK_SECONDS,
      });
    },
    onError: (errorMessage, context) => {
      setError('connection');
      posthog.capture('voice_conversation_error', {
        error_message: errorMessage,
        error_context: context,
        variant: 'agent_deck',
        agent: topAgent?.id,
        agent_scenario: topAgent?.scenario,
      });
      posthog.captureException(new Error(errorMessage));
    },
  });

  const isConnected = conversation.status === 'connected';

  const startConversation = useCallback(async () => {
    setError(null);
    setIsConnecting(true);
    try {
      if (typeof window === 'undefined' || !navigator.mediaDevices) {
        setError('mic-missing');
        posthog.capture('voice_conversation_error', {
          variant: 'agent_deck',
          error_type: 'media_devices_unavailable',
          agent: topAgent?.id,
          agent_scenario: topAgent?.scenario,
        });
        return;
      }

      // mic permission is the most common failure — classify it separately from
      // a genuine connection problem so the card can tell the user what to fix
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (micError) {
        const name = micError instanceof Error ? micError.name : '';
        const kind: CallError =
          name === 'NotFoundError' || name === 'DevicesNotFoundError'
            ? 'mic-missing'
            : 'mic-denied';
        setError(kind);
        posthog.capture('voice_conversation_error', {
          variant: 'agent_deck',
          error_type:
            kind === 'mic-missing' ? 'microphone_not_found' : 'microphone_permission_denied',
          error_name: name,
          agent: topAgent?.id,
          agent_scenario: topAgent?.scenario,
        });
        return;
      }

      // each card starts its own ElevenLabs agent; the route allow-lists the id
      const response = await fetch(
        `/api/get-signed-url?agentId=${encodeURIComponent(topAgent.id)}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Failed to get signed url: ${data?.error || response.statusText}`);
      }

      // startSession resolves to the ElevenLabs conversation id — hold onto it so the
      // email submitted after the call can be tied back to this conversation
      const conversationId = await conversation.startSession({ signedUrl: data.signedUrl });
      conversationIdRef.current = conversationId ?? conversation.getId() ?? null;
    } catch (error) {
      setError('connection');
      posthog.capture('voice_conversation_error', {
        error_message: error instanceof Error ? error.message : String(error),
        error_type: 'start_conversation_failed',
        variant: 'agent_deck',
        agent: topAgent?.id,
        agent_scenario: topAgent?.scenario,
      });
      posthog.captureException(error);
    } finally {
      setIsConnecting(false);
    }
  }, [conversation, topAgent]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  // count down while connected, and hang up when the cap is reached
  const [remaining, setRemaining] = useState(CALL_SECONDS);

  useEffect(() => {
    if (!isConnected) {
      setRemaining(CALL_SECONDS);
      return;
    }
    const id = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(id);
  }, [isConnected]);

  useEffect(() => {
    if (isConnected && remaining <= 0) stopConversation();
  }, [isConnected, remaining, stopConversation]);

  const handleSubmitEmail = (email: string) => {
    const conversationId = conversationIdRef.current;
    const durationSeconds = Math.round(lastCallSecondsRef.current);

    // ties the previously-anonymous session to this person
    posthog.identify(email, { email });
    posthog.capture('agent_report_email_submitted', {
      agent: topAgent?.id,
      agent_scenario: topAgent?.scenario,
      conversation_id: conversationId,
      duration_seconds: durationSeconds,
    });

    // optimistic: the user is told their results are on the way regardless of the save
    setPhase('thanks');

    void fetch('/api/agent-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        conversationId,
        agentId: topAgent?.id,
        durationSeconds,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`agent-report responded ${res.status}`);
      })
      .catch((err) => {
        // we already promised the user it worked, so PostHog is the recovery path —
        // the email is included deliberately so a Loops outage doesn't lose it
        posthog.capture('agent_report_save_failed', {
          email,
          agent: topAgent?.id,
          agent_scenario: topAgent?.scenario,
          conversation_id: conversationId,
          error_message: err instanceof Error ? err.message : String(err),
        });
      });
  };

  const handleTryAnother = () => {
    setPhase('idle');
    handleSwipe(1);
  };

  const visible = deck.slice(0, 3);

  return (
    <div
      className="relative h-full w-full select-none rounded-3xl"
      role="group"
      aria-roledescription="carousel"
      aria-label={`Choose an agent to talk to. Showing ${topAgent?.name}.`}
      // not focusable itself — keydown bubbles up from the focused arrow button,
      // so arrow keys work without outlining the whole deck on click
      onKeyDown={(e) => {
        if (isConnected) return;
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleSwipe(1);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handleSwipe(-1);
        }
      }}
    >
      <DeckArrows
        disabled={isConnected || flyOut !== null}
        onSwipe={handleSwipe}
        itemLabel="agent"
      />

      {visible.map((agent, i) => (
        <Card
          key={agent.id}
          agent={agent}
          index={i}
          flyOut={i === 0 ? flyOut : null}
          onRequestSwipe={handleSwipe}
          onExited={handleExited}
          isConnected={i === 0 && isConnected}
          isSpeaking={conversation.isSpeaking}
          remaining={remaining}
          isConnecting={i === 0 && isConnecting}
          error={i === 0 ? error : null}
          phase={i === 0 ? phase : 'idle'}
          report={i === 0 ? report : null}
          getOutputData={conversation.getOutputByteFrequencyData}
          getInputData={conversation.getInputByteFrequencyData}
          onStart={startConversation}
          onStop={stopConversation}
          onSubmitEmail={handleSubmitEmail}
          onTryAnother={handleTryAnother}
          hint={i === 0 && showHint && !isConnected && flyOut === null}
          onHintDone={endHint}
        />
      ))}
    </div>
  );
}
