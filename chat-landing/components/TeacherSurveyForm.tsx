"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { Button } from "@/components/ui/button";
import {
  ADMIN_TIME,
  AFTER_LESSON,
  BUILD_NEXT,
  CALL_INTEREST,
  HEARD_FROM,
  ONBOARDING_REACHED,
  PMF,
  PMF_GATE,
  SIGNUP_REASONS,
  TEACHING_PLACES,
  WEEKLY_STUDENTS,
  type Choice,
} from "@/lib/teacher-survey";

/** How many reasons a teacher may pick in Q3. Forcing a shortlist is the point. */
const MAX_REASONS = 2;

const fieldClass =
  "w-full px-3 py-2.5 border border-just_black-10 rounded-lg bg-just_white text-sm tracking-[-0.14px] text-just_cod-gray placeholder:text-just_cod-gray/40 focus:outline-none focus:ring-2 focus:ring-just_cod-gray/20";

interface State {
  heardFrom: string;
  heardFromOther: string;
  understanding: string;
  signupReasons: string[];
  signupReasonOther: string;
  teachingPlaces: string[];
  teachingPlaceOther: string;
  weeklyStudents: string;
  afterLesson: string;
  afterLessonOther: string;
  adminTime: string;
  buildNext: string;
  buildNextOther: string;
  onboardingReached: string;
  friction: string;
  pmf: string;
  callInterest: string;
  callTopics: string;
  anythingElse: string;
  name: string;
  email: string;
}

const EMPTY: State = {
  heardFrom: "",
  heardFromOther: "",
  understanding: "",
  signupReasons: [],
  signupReasonOther: "",
  teachingPlaces: [],
  teachingPlaceOther: "",
  weeklyStudents: "",
  afterLesson: "",
  afterLessonOther: "",
  adminTime: "",
  buildNext: "",
  buildNextOther: "",
  onboardingReached: "",
  friction: "",
  pmf: "",
  callInterest: "",
  callTopics: "",
  anythingElse: "",
  name: "",
  email: "",
};

/**
 * A numbered question block. The number is cosmetic but load-bearing for
 * completion: it tells someone mid-form exactly how much is left, which a
 * progress bar alone only approximates.
 */
function Question({
  index,
  title,
  hint,
  optional,
  children,
}: {
  index: number;
  title: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  // Labelled by the visible heading rather than an sr-only <legend>, which
  // would make a screen reader read every question twice.
  const headingId = `q${index}-heading`;

  return (
    <fieldset
      aria-labelledby={headingId}
      className="border-t border-just_black-10 pt-7"
    >
      <div className="flex gap-3">
        <span
          aria-hidden
          className="shrink-0 text-sm font-medium tabular-nums text-just_cod-gray/35 pt-0.5"
        >
          {String(index).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <p
            id={headingId}
            className="text-base sm:text-[16.3px] font-medium leading-snug tracking-[-0.17px] text-just_cod-gray"
          >
            {title}
            {optional && (
              <span className="font-normal text-just_cod-gray/45">
                {" "}
                (optional)
              </span>
            )}
          </p>
          {hint && (
            <p className="mt-1.5 text-sm leading-relaxed tracking-[-0.14px] text-just_scorpion">
              {hint}
            </p>
          )}
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </fieldset>
  );
}

function OptionCard({
  type,
  name,
  checked,
  disabled,
  onChange,
  label,
}: {
  type: "radio" | "checkbox";
  name: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label
      className={[
        "flex items-start gap-2.5 px-3.5 py-2.5 rounded-lg border text-sm leading-snug tracking-[-0.14px] transition-colors",
        disabled
          ? "border-just_black-10 text-just_cod-gray/35 cursor-not-allowed"
          : "cursor-pointer hover:bg-just_black-5",
        checked
          ? "border-just_cod-gray bg-just_cod-gray/5 text-just_cod-gray"
          : "border-just_black-10 text-just_cod-gray",
      ].join(" ")}
    >
      <input
        type={type}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="mt-0.5 w-4 h-4 accent-just_cod-gray shrink-0 cursor-[inherit]"
      />
      <span>{label}</span>
    </label>
  );
}

function Radios({
  name,
  options,
  value,
  onChange,
  columns = 1,
}: {
  name: string;
  options: Choice[];
  value: string;
  onChange: (value: string) => void;
  columns?: 1 | 2;
}) {
  return (
    <div
      className={`grid gap-2 ${columns === 2 ? "sm:grid-cols-2" : "grid-cols-1"}`}
    >
      {options.map((option) => (
        <OptionCard
          key={option.value}
          type="radio"
          name={name}
          checked={value === option.value}
          onChange={() => onChange(option.value)}
          label={option.label}
        />
      ))}
    </div>
  );
}

function Checkboxes({
  name,
  options,
  values,
  onChange,
  max,
  columns = 1,
}: {
  name: string;
  options: Choice[];
  values: string[];
  onChange: (values: string[]) => void;
  max?: number;
  columns?: 1 | 2;
}) {
  const full = max !== undefined && values.length >= max;

  return (
    <div
      className={`grid gap-2 ${columns === 2 ? "sm:grid-cols-2" : "grid-cols-1"}`}
    >
      {options.map((option) => {
        const checked = values.includes(option.value);
        return (
          <OptionCard
            key={option.value}
            type="checkbox"
            name={name}
            checked={checked}
            disabled={full && !checked}
            onChange={() =>
              onChange(
                checked
                  ? values.filter((v) => v !== option.value)
                  : [...values, option.value]
              )
            }
            label={option.label}
          />
        );
      })}
    </div>
  );
}

export function TeacherSurveyForm() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<State>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const started = useRef(false);

  // Loops merge tags fill these in on the link, so a teacher who clicks from
  // the email never retypes an address we already have — and a response can
  // still be tied back to a contact if they skip the field entirely.
  const linkedEmail = searchParams.get("e") ?? "";
  const linkedName = searchParams.get("n") ?? "";
  const source = searchParams.get("src") ?? "";

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      email: prev.email || linkedEmail,
      name: prev.name || linkedName,
    }));

    // Take the address out of the address bar the moment it's been read. It
    // stays in `state`, so nothing is lost, but it no longer rides along in a
    // screenshot, a shared link, or an outbound Referer header. PostHog is
    // handled separately, in instrumentation-client.ts.
    if ((linkedEmail || linkedName) && typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("e");
      url.searchParams.delete("n");
      window.history.replaceState(null, "", url.toString());
    }
  }, [linkedEmail, linkedName]);

  useEffect(() => {
    posthog.capture("teacher_survey_opened", { source });
    if (linkedEmail) posthog.identify(linkedEmail);
  }, [source, linkedEmail]);

  const set = <K extends keyof State>(key: K, value: State[K]) => {
    if (!started.current) {
      started.current = true;
      posthog.capture("teacher_survey_started", { source });
    }
    setState((prev) => ({ ...prev, [key]: value }));
  };

  /** Only teachers who got far enough for the answer to mean anything. */
  const showPmf = PMF_GATE.includes(state.onboardingReached);

  const required = useMemo(
    () => [
      state.heardFrom,
      state.understanding.trim(),
      state.signupReasons.length ? "y" : "",
      state.teachingPlaces.length ? "y" : "",
      state.weeklyStudents,
      state.afterLesson,
      state.adminTime,
      state.buildNext,
      state.onboardingReached,
      state.callInterest,
      state.email.trim(),
    ],
    [state]
  );

  const answered = required.filter(Boolean).length;
  const progress = Math.round((answered / required.length) * 100);
  const complete = answered === required.length;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...state,
      // Drop a PMF answer the gate has since closed — e.g. someone picked
      // "taught a lesson", answered, then corrected themselves to "never
      // logged in". The server re-checks this too.
      pmf: showPmf ? state.pmf : "",
      source,
      website: honeypot,
    };

    try {
      const response = await fetch("/api/teacher-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setSent(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        posthog.capture("teacher_survey_submitted", {
          source,
          buildNext: state.buildNext,
          callInterest: state.callInterest,
          weeklyStudents: state.weeklyStudents,
          onboardingReached: state.onboardingReached,
          pmf: payload.pmf,
        });
        if (state.callInterest === "yes") {
          posthog.capture("teacher_survey_call_requested", { source });
        }
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="max-w-[560px]">
        <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight text-just_cod-gray">
          Thank you — that was genuinely useful.
        </h1>
        <p className="mt-5 text-base leading-relaxed tracking-[-0.17px] text-just_scorpion">
          Every answer gets read, and the ones that change our mind get acted
          on. If you asked for a call, you&apos;ll have a link to book it within
          a couple of days.
        </p>
        <p className="mt-4 text-base leading-relaxed tracking-[-0.17px] text-just_scorpion">
          If something occurs to you later, just reply to the email that brought
          you here — it comes straight to me.
        </p>
        <div className="mt-8">
          <Button asChild variant="outline" size="lg">
            <a href="https://app.justtalk.ai">Back to JustTalk</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[680px]">
      <header>
        <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-just_cod-gray">
          You signed up early. Help us decide what we build next.
        </h1>
        <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed tracking-[-0.17px] text-just_scorpion">
          <p>
            You were one of the first teachers to put your name down for
            JustTalk, before there was much to see. That makes your answers
            worth more to us than any amount of guessing internally.
          </p>
          <p>
            Twelve questions, about four minutes. The unflattering answers are
            the most useful ones — if you think we&apos;ve got something wrong,
            that&apos;s exactly what we want to know.
          </p>
        </div>
      </header>

      {/* Sticky so the cost of finishing stays visible while scrolling. */}
      <div className="sticky top-0 z-10 -mx-5 sm:mx-0 mt-10 mb-2 bg-just_white/95 backdrop-blur-sm px-5 sm:px-0 py-3">
        <div className="flex items-center gap-3">
          <div
            className="h-1 flex-1 rounded-full bg-just_black-10 overflow-hidden"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Survey progress"
          >
            <div
              className="h-full bg-just_cod-gray transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[13px] tabular-nums tracking-[-0.14px] text-just_cod-gray/55">
            {answered} / {required.length}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <Question index={1} title="How did you first hear about JustTalk?">
          <Radios
            name="heardFrom"
            options={HEARD_FROM}
            value={state.heardFrom}
            onChange={(v) => set("heardFrom", v)}
            columns={2}
          />
          {state.heardFrom === "other" && (
            <input
              type="text"
              value={state.heardFromOther}
              onChange={(e) => set("heardFromOther", e.target.value)}
              placeholder="Where was it?"
              className={`${fieldClass} mt-2.5`}
            />
          )}
        </Question>

        {/*
          Deliberately before any question that names a feature. This is the
          only unprompted read we get on whether the positioning lands, and it
          would be worthless after we'd shown a list of our own answers.
        */}
        <Question
          index={2}
          title="Before we describe anything — in your own words, what do you think JustTalk is for?"
          hint="A sentence is plenty, and guessing is completely fine. We're measuring how well we explained ourselves, not testing you."
        >
          <textarea
            rows={3}
            value={state.understanding}
            onChange={(e) => set("understanding", e.target.value)}
            placeholder="It looks like it's for…"
            className={`${fieldClass} resize-y`}
          />
        </Question>

        <Question
          index={3}
          title="What made you actually sign up, rather than close the tab?"
          hint={`Pick up to ${MAX_REASONS}.`}
        >
          <Checkboxes
            name="signupReasons"
            options={SIGNUP_REASONS}
            values={state.signupReasons}
            onChange={(v) => set("signupReasons", v)}
            max={MAX_REASONS}
          />
          {state.signupReasons.includes("other") && (
            <input
              type="text"
              value={state.signupReasonOther}
              onChange={(e) => set("signupReasonOther", e.target.value)}
              placeholder="What was it?"
              className={`${fieldClass} mt-2.5`}
            />
          )}
        </Question>

        <Question
          index={4}
          title="Where do you teach at the moment?"
          hint="Pick everything that applies."
        >
          <Checkboxes
            name="teachingPlaces"
            options={TEACHING_PLACES}
            values={state.teachingPlaces}
            onChange={(v) => set("teachingPlaces", v)}
            columns={2}
          />
          {state.teachingPlaces.includes("other") && (
            <input
              type="text"
              value={state.teachingPlaceOther}
              onChange={(e) => set("teachingPlaceOther", e.target.value)}
              placeholder="Name the platform or school"
              className={`${fieldClass} mt-2.5`}
            />
          )}
        </Question>

        <Question index={5} title="How many students do you teach in a typical week?">
          <Radios
            name="weeklyStudents"
            options={WEEKLY_STUDENTS}
            value={state.weeklyStudents}
            onChange={(v) => set("weeklyStudents", v)}
            columns={2}
          />
        </Question>

        {/*
          Q6 and Q7 replace "how valuable would automatic summaries be?" — a
          question everyone answers "very" and nobody answers usefully. What a
          teacher already does unpaid after every lesson, and how long it costs
          them, is the only evidence that the feature replaces a real habit.
        */}
        <Question
          index={6}
          title="After a lesson ends, what do you actually do to record what happened?"
          hint="What you really do on a normal week — not what you'd do in an ideal one."
        >
          <Radios
            name="afterLesson"
            options={AFTER_LESSON}
            value={state.afterLesson}
            onChange={(v) => set("afterLesson", v)}
          />
          {state.afterLesson === "other" && (
            <input
              type="text"
              value={state.afterLessonOther}
              onChange={(e) => set("afterLessonOther", e.target.value)}
              placeholder="What does that look like?"
              className={`${fieldClass} mt-2.5`}
            />
          )}
        </Question>

        <Question
          index={7}
          title="Roughly how much time does everything around one lesson take you?"
          hint="Notes, homework, prep, messages — the unpaid part."
        >
          <Radios
            name="adminTime"
            options={ADMIN_TIME}
            value={state.adminTime}
            onChange={(v) => set("adminTime", v)}
            columns={2}
          />
        </Question>

        {/*
          The forced trade-off. A teacher who wants everything has told us
          nothing; a teacher who gives up five things to keep one has told us
          where to point the roadmap.
        */}
        <Question
          index={8}
          title="If we could only finish one of these in the next three months, which would you take?"
          hint="Only one. This is the question that decides what we build."
        >
          <Radios
            name="buildNext"
            options={BUILD_NEXT}
            value={state.buildNext}
            onChange={(v) => set("buildNext", v)}
          />
          {state.buildNext === "other" && (
            <input
              type="text"
              value={state.buildNextOther}
              onChange={(e) => set("buildNextOther", e.target.value)}
              placeholder="What would you have us build?"
              className={`${fieldClass} mt-2.5`}
            />
          )}
        </Question>

        <Question index={9} title="How far did you get after signing up?">
          <Radios
            name="onboardingReached"
            options={ONBOARDING_REACHED}
            value={state.onboardingReached}
            onChange={(v) => set("onboardingReached", v)}
          />
        </Question>

        <Question
          index={10}
          title="What slowed you down, confused you, or stopped you altogether?"
          hint="Be blunt. &ldquo;I couldn't work out what to click&rdquo; is a genuinely useful answer, and a common one."
          optional
        >
          <textarea
            rows={3}
            value={state.friction}
            onChange={(e) => set("friction", e.target.value)}
            placeholder="The bit where I got stuck was…"
            className={`${fieldClass} resize-y`}
          />
        </Question>

        {showPmf && (
          <Question
            index={11}
            title="How would you feel if you could no longer use JustTalk?"
          >
            <Radios
              name="pmf"
              options={PMF}
              value={state.pmf}
              onChange={(v) => set("pmf", v)}
              columns={2}
            />
          </Question>
        )}

        <Question
          index={showPmf ? 12 : 11}
          title="Would you like half an hour with me to set your account up around the way you actually teach?"
          hint="No pitch and no slides — a screen share with your real students and your real schedule. I do these myself."
        >
          <Radios
            name="callInterest"
            options={CALL_INTEREST}
            value={state.callInterest}
            onChange={(v) => set("callInterest", v)}
            columns={2}
          />
          {state.callInterest === "yes" && (
            <input
              type="text"
              value={state.callTopics}
              onChange={(e) => set("callTopics", e.target.value)}
              placeholder="Anything specific you'd want to cover? (optional)"
              className={`${fieldClass} mt-2.5`}
            />
          )}
        </Question>

        <Question
          index={showPmf ? 13 : 12}
          title="Anything we should have asked and didn't?"
          optional
        >
          <textarea
            rows={3}
            value={state.anythingElse}
            onChange={(e) => set("anythingElse", e.target.value)}
            placeholder="The thing you really want us to know…"
            className={`${fieldClass} resize-y`}
          />
        </Question>

        <div className="border-t border-just_black-10 pt-7">
          <p className="text-base font-medium leading-snug tracking-[-0.17px] text-just_cod-gray">
            So we can tie this back to your account
          </p>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="ts-name"
                className="block mb-1.5 text-sm font-medium tracking-[-0.14px] text-just_cod-gray"
              >
                Your name{" "}
                <span className="font-normal text-just_cod-gray/45">
                  (optional)
                </span>
              </label>
              <input
                id="ts-name"
                type="text"
                value={state.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Marta Silva"
                className={fieldClass}
              />
            </div>
            <div>
              <label
                htmlFor="ts-email"
                className="block mb-1.5 text-sm font-medium tracking-[-0.14px] text-just_cod-gray"
              >
                Email
              </label>
              <input
                id="ts-email"
                type="email"
                required
                value={state.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@example.com"
                className={fieldClass}
              />
            </div>
          </div>
        </div>

        {/* Honeypot — hidden from people, irresistible to bots. */}
        <div className="hidden" aria-hidden>
          <label htmlFor="ts-website">Website</label>
          <input
            id="ts-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 pb-4">
          <Button type="submit" size="lg" disabled={loading} className="cursor-pointer">
            {loading ? "Sending…" : "Send my answers"}
          </Button>
          {!complete && (
            <span className="text-[13px] tracking-[-0.14px] text-just_cod-gray/55">
              {required.length - answered} left
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
