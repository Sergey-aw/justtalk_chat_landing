# Teacher survey — the five emails

Ready to paste into Loops. Audience: **Features for Teachers**
(`cmpzc9swo4yhg0jzz2xa5f3pt`).

Every email points at the same survey with a different `src` so you can tell
which angle actually worked:

```
https://justtalk.ai/teacher-survey?e={{email}}&n={{firstName}}&src=e1
```

`e` and `n` prefill the name and email fields, so a teacher who clicks from the
email never retypes an address you already have — and a response still ties
back to a contact even if they clear the field. Change `src` to `e2`…`e5` per
email; it lands in the Notion `Source` column and on every PostHog event.

## How to run it

Build it as a **Loop** (automation), not five campaigns. Trigger on list
membership, then five delays with the emails between them.

**Exit condition:** contact performs `teacher_survey_completed`. The survey API
fires that event on every submission, so nobody who answers gets chased. It
also sets three contact properties you can segment on later — `surveyCompleted`
(boolean), `wantsFounderCall` (boolean) and `buildNext` (string, e.g. `summary`).

Run `node scripts/setup-teacher-survey.mjs <notion-parent-page-id>` once first;
it creates those three properties along with the Notion database.

**Suggested cadence** — front-loaded, then backing off, so the sequence stops
feeling like a campaign and starts feeling like someone remembering to follow up:

| # | Send | Angle |
|---|------|-------|
| 1 | Day 0, Tue or Wed ~10:00 their time | The invitation |
| 2 | Day 3 | One question, no preamble |
| 3 | Day 7 | What other teachers said |
| 4 | Day 12 | The call, offered on its own |
| 5 | Day 18 | Closing the survey |

All five are plain-text-style, from a personal address, no header image and no
button graphic — a bare text link outperforms a button when the email is
pretending to be a personal note, and this one isn't pretending.

**Reply-to must be a real inbox you actually read.** Four of the five emails
invite a reply instead of a click, and one of them promises you answer
personally. A reply is a better outcome than a form submission anyway — it
starts a conversation, and it's the only route that works for the teachers who
will never open a survey. The survey page itself makes no such promise, so the
commitment lives entirely in the emails where you can keep it.

Sender: your own name, not "JustTalk Team". Swap `Sergey` below for however you
sign your emails.

---

## Email 1 — The invitation

**Subject:** A question about how you teach
**Preview text:** You signed up early. I'd like to know what you were hoping for.

> Subject line notes: no "survey", no "feedback", no "help us". "A question
> about how you teach" reads like a person wrote it to one person, which is the
> only reason a cold-ish teacher opens anything. The preview text does the
> disclosing so the subject doesn't have to.

Hi {{firstName}},

You signed up for JustTalk early — early enough that there wasn't much to look
at yet. I've been wondering what you were hoping to find.

We're deciding what to build over the next three months, and I'd rather decide
it from what teachers actually tell us than from what we assume in a room by
ourselves. So I've put together twelve questions. Most are one click. It takes
about four minutes.

**[Answer the twelve questions →](https://justtalk.ai/teacher-survey?e={{email}}&n={{firstName}}&src=e1)**

One of them asks what you think JustTalk is even for, in your own words. Please
guess. If your guess is wrong, that's our fault and we need to know.

And any question you'd rather ask than answer — about the product, the pricing,
where this is going — just hit reply. It comes straight to me and I read and
answer all of them myself.

Thanks,
Sergey

---

## Email 2 — One question, no preamble

**Subject:** If we could only build one thing
**Preview text:** Six options. You pick one. That's the whole email.

> Cold-opens on the single most interesting question in the survey instead of
> asking again for four minutes. Someone who ignored "please do our survey"
> will still have an opinion about a roadmap they get to veto.

Hi {{firstName}},

Quick one.

We can finish one of these properly in the next three months, not all six:

- An automatic summary of every lesson — written for you
- A running record of each student's mistakes over time
- Homework built from what actually happened in the lesson
- Progress reports you can send to students or parents
- AI practice your students do between your lessons
- Scheduling and payments handled for you

Which one would you take?

**[Pick one →](https://justtalk.ai/teacher-survey?e={{email}}&n={{firstName}}&src=e2)**

It's question 8. The other eleven are there if you're willing, but honestly,
that one is the one I want.

Or just reply to this email with the one you'd pick. That counts too, and it
comes straight to me.

Sergey

---

## Email 3 — What other teachers said

**Subject:** What the other teachers told us
**Preview text:** Two answers that surprised us, and the one we can't read yet.

> Social proof plus an open loop. Works because it gives before it asks — the
> reader gets something interesting whether or not they click. Fill in the real
> numbers before sending; if the first two sends were thin, say so plainly
> rather than inventing a figure. Teachers can smell a fake stat and it costs
> you the sequence.

Hi {{firstName}},

[N] teachers have answered so far. Two things I didn't expect:

**[Finding one — e.g. "Most of you spend more time on the admin around a lesson
than we'd budgeted for. Several said more than 30 minutes, per lesson."]**

**[Finding two — e.g. "The feature we were most confident about came fourth out
of six."]**

That second one is the reason I'm asking rather than guessing. We were about to
spend a quarter on it.

There's one answer I still can't read properly, though: what teachers think
JustTalk is *for*, before we explain it. The replies are all over the place,
which tells me we're describing ourselves badly. Yours would help.

**[Add your answer →](https://justtalk.ai/teacher-survey?e={{email}}&n={{firstName}}&src=e3)**

Four minutes, mostly clicking.

Sergey

---

## Email 4 — The call, offered on its own

**Subject:** Half an hour, your actual schedule
**Preview text:** Not a demo. Your students, your week, screen shared.

> The one email that leads with the offer instead of the ask. Some teachers
> won't fill in a form but will take a call — and this is the highest-value
> outcome in the whole sequence anyway. The survey link stays, demoted.

Hi {{firstName}},

Different offer this time.

I do setup calls with teachers myself — half an hour, screen shared, your real
students and your real week. Not a demo. We open your account and set it up
around how you actually teach, and if something's missing you tell me to my
face and I write it down.

I get more out of these than you do, which is why I keep doing them.

**[Ask for a time →](https://justtalk.ai/teacher-survey?e={{email}}&n={{firstName}}&src=e4)**

It's the last question on the survey — say yes there and I'll send you a link.
If you want to answer the other questions on the way past, even better, but the
call is the part I'm asking for.

Or reply with a couple of times that suit you and we'll skip the form entirely.

Sergey

---

## Email 5 — Closing the survey

**Subject:** Closing this on Friday
**Preview text:** Last call, and then I'll stop emailing you about it.

> A real deadline, and an explicit promise to stop. The promise is what makes
> the deadline land rather than read as pressure — and it's the honest thing to
> say to someone who has now ignored four emails. Set a date you'll actually
> honour.

Hi {{firstName}},

I'm closing the teacher survey on Friday and writing up what we learned, so
this is the last time I'll bring it up.

If you've got four minutes, they'd count for a lot — we're a small enough team
that a dozen teachers genuinely move the roadmap.

**[Answer before Friday →](https://justtalk.ai/teacher-survey?e={{email}}&n={{firstName}}&src=e5)**

If you'd rather not, that's completely fine and this is the end of it. But if
there's one thing you'd change about JustTalk, hit reply and tell me in a
sentence. That works too, and I read every one.

Either way — thanks for signing up early, when there wasn't much to go on.

Sergey

---

## Reading the results

The two questions worth checking first, before any counting:

**Q2, "what do you think JustTalk is for."** Read these before you read
anything else, and read them as a batch. If the answers don't converge, the
landing page is the problem, not the product. The exact words teachers use here
are also the best headline copy you will ever get, because you didn't write it.

**Q8, "build next."** Whatever wins, it wins against five real alternatives that
each teacher gave up to vote for it. That's a roadmap input, not an opinion
poll. Cross-tab it against Q5 (weekly students) before acting — what teachers
with 30 students want and what teachers with 3 want are usually different
products, and only one of those is your business.

Then the quieter ones:

- **Q6 × Q7** — teachers who already keep notes *and* spend 15+ minutes per
  lesson doing it are the people the lesson-summary feature is actually for.
  Anyone answering "nothing, it stays in my head" is telling you it isn't a
  habit you can automate, it's one you'd have to create.
- **Q9 → Q10** — the milestone where people stop, plus what they said got in
  the way. Sort by milestone and the drop-off point usually names itself.
- **PMF** — only asked of teachers who invited a student or taught a lesson.
  The number to watch is the share answering "very disappointed"; 40% is the
  conventional threshold, but with a sample this size treat it as a direction,
  not a score.
- **Q1 by response rate** — which channel brought teachers who actually engage,
  not just teachers who signed up.
