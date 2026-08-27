# Pearstop content strategy

This file is read by the weekly blog-topic-assignment agent (see the
`#blog-ideas` Slack channel and the "blog-topic-assignment" routine at
claude.ai/code/routines) to weigh topic suggestions against current company
and marketing priorities. Edit it directly — the agent picks up whatever is
here at the start of each run, no code changes needed.

## Slack message style

Every message the pipeline posts to #blog-ideas (assignments, reminders,
draft sign-off requests) should be as short as possible. Cut anything that
isn't load-bearing — no restating context the thread already has, no
filler sentences, no over-explaining. A topic + a one-line direction beats
a topic + a paragraph. When in doubt, cut it shorter.

## Standard writers

These people always get 2-3 blog assignments every week, even if nobody
posted a suggestion for them — the agent invents topics grounded in the
priorities below and in coverage gaps when there's nothing suggested for
them specifically. This does NOT infer writer status from bios in
`components/blog.tsx` — update this list directly as the roster changes.

- Stephanie (AUTHORS key: `stephanie`)
- Rae (AUTHORS key: `rae`)
- Neharika (AUTHORS key: `neharika`)

<!-- Richard: excluded, not a writer (publicly announced he's on Challengers
Crease). Seb: deferred, on holiday — revisit adding him later. -->

Anyone else on the team can still post a topic suggestion in #blog-ideas and
have it picked up and assigned to them for that week — they're just not on
the standing rotation above, so they don't get an invented topic on a quiet
week. Only the "invent something if nothing was suggested" behaviour is
restricted to the standard writers list.

## Voice profiles

Before drafting for a writer, check `content/voice-profiles/<AUTHORS-key>.md`.
If one exists, it is the authoritative voice reference — follow its rules
exactly, especially any "hard constraints" / never-use list. If no profile
exists for that writer yet, fall back to reading 2-3 of their own existing
published articles in `content/blog/en/` as a style reference instead.

Profiles available: `stephanie`. Not yet available: `rae`, `neharika` — use
the fallback for these until a profile is added.

---

# Pearstop: Company & Marketing Context

Use this to weigh whether a topic is worth writing about. When something
here conflicts with an older strategy doc, this wins — it's built from the
most recent signal (client calls, team check-ins), not the archived plans.

## What Pearstop does

Go-to data quality and data integrity player for asset-heavy companies.
Wedge: hard facilities management first, then construction, infrastructure,
manufacturing. Same shape of messy data across these industries means
repeatable patterns and faster delivery.

## The problem we write about

Client spend and asset data is inconsistent, messy, context-dependent. They
can't trust their own reports or asset lists. Humans are stitching data
together by hand, and it never gets fixed because that's not their actual
job. What they want isn't "clean data" as an abstraction — it's trusting
their numbers, moving faster, and not needing an analyst to spend a week
cleaning a spreadsheet before any real decision gets made.

### Trigger moments (what actually gets someone looking for us)

Write toward these — they're the real reasons someone starts searching, not
the abstract "we have messy data" framing.

- **ERP migration.** Moving to SAP S/4HANA, Microsoft Dynamics Business
  Central, or Microsoft Fabric forces a clean baseline before go-live, and
  nobody has one. This is the single most reliable trigger — data has to be
  right before the new system goes live, not after.
- **UNSPSC (or similar taxonomy) mandate.** Head office, a parent company,
  or a client requires standardised classification and the team has no
  in-house expertise to do it, so it stalls.
- **New head of procurement.** Someone starts, goes looking for a
  categorisation or classification baseline, and finds there isn't one.
  This is often the moment someone first reaches for AI as the fix.
- **The Copilot dead end.** They try Microsoft Copilot (or a general AI
  tool) on the classification problem, it hallucinates categories or can't
  hold consistency across thousands of lines, and they realise
  general-purpose AI isn't built for this. This is the "we tried the
  obvious thing and it didn't work" beat — a strong angle because it meets
  people exactly where they are, mid-frustration.

These four show up in that rough order in real conversations. A topic that
speaks to one of these moments directly is worth more than a topic that
only speaks to the abstract pain.

## Who we're writing for

- **Personas:** Head of Procurement, CFO, Commercial Director.
  - Procurement: data isn't good enough to support analysis.
  - CFO: no spend visibility.
  - Commercial Director: losing tenders to competitors with better cost
    data.
- **Company size:** £/€/$50m+ revenue.
- **Verticals:** hard FM (cleaning, HVAC, electrical, plumbing, lifts,
  building maintenance), construction, infrastructure, manufacturing.

## Current positioning (as of Aug 2026 — treat as live)

Don't lead with "cost savings." It's overused and prospects are numb to it.
Lead with **not being able to trust your numbers / better decision making
through data quality**.

AI is a bolt-on to what they already run (CAFM, ERP), not a replacement
platform. Fragmentation across incompatible systems — data duplicated,
inconsistently formatted, nobody able to talk to anybody else's system — is
a live, resonant pain point.

Outbound targets procurement managers and data analysts as champions who
carry it to the actual decision-maker, not the CEO directly.

## Content stances (recurring positions — reuse, don't contradict)

- Data quality before AI: if the data is fragmented, AI gives confident
  answers to the wrong questions. You get faster at being wrong.
- The problem is ownership, not technology: nobody owns data quality end to
  end, so it degrades quietly.
- Speed + reliability + pragmatism beat elegant internals or clever
  features. Clients don't care about the latter.

## Format rules

- Tagline/framing: `{concrete result} {for who}`. Lead with the number, end
  with the audience.
- Categories (use exactly): Procurement, AI & Digital, Data Quality, Data
  Management, Asset Management, Construction, Commercial FM.
- Don't list geographies by default.

## Lead magnets

None currently live — don't reference or link any lead magnet until this
section is updated.

## Cadence

Weekly blog post. Weekly podcast. Continuous LinkedIn. Monthly lead magnet
iteration.
