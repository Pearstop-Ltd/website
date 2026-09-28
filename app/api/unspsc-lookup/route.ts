import { NextRequest, NextResponse } from "next/server";
import { getValidationIndex, isIndustryKey, type IndustryKey } from "@/lib/unspsc-industries";
import { searchCandidates, type SearchCandidate } from "@/lib/unspsc-search";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { verifyRecaptcha } from "@/lib/recaptcha";

// Retrieval-first: lib/unspsc-search.ts keyword-matches the description
// against the real ~10,700-commodity dataset first, and the model below only
// ever picks between those real candidates - it can no longer hallucinate a
// plausible-sounding code, or a real code for the wrong item, because every
// option it's shown already exists and is already in roughly the right area.
const SYSTEM_PROMPT = `You are a UNSPSC classification expert. You will be given a procurement line description and a shortlist of candidate UNSPSC commodities retrieved from the real taxonomy for this description. Pick the single candidate whose title most precisely matches the description.

RULES:
- You may only answer with a code from the candidate list below. Never invent a code or use one that isn't listed.
- Match on what the item actually is, not just its general category - e.g. if the description says "toilet tissue" and the list has both "Toilet tissue" and "Parchment paper", pick "Toilet tissue".
- A supplier name, if given, is context only - it narrows which candidate is plausible, it is never itself the answer.
- If the description contains a brand name or model number, classify the underlying product type, not the brand.
- If truly none of the candidates fit the description (they're all about a different, unrelated kind of item), respond with {"no_match": true, "reason": "one sentence why"} instead of forcing a guess.
- confidence: "high" for a clear, unambiguous match; "medium" for a reasonable match where the description was vague or more than one candidate could apply; "low" for a best-effort guess among weak candidates.

Respond ONLY with valid JSON, no markdown, no explanation outside the JSON:
{
  "code": "<one of the candidate codes exactly as listed>",
  "confidence": "high",
  "notes": "Optional: mention only if ambiguous or a nearby candidate might also apply."
}`;

const RECAPTCHA_ACTION = "unspsc_lookup";

function formatCandidates(candidates: SearchCandidate[]): string {
  return candidates
    .map((c) => `${c.code} — ${c.title} (Class: ${c.classTitle}; Family: ${c.familyTitle}; Segment: ${c.segmentTitle})`)
    .join("\n");
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { description, supplier, industry, recaptchaToken } = body ?? {};

  if (!description || typeof description !== "string" || description.trim().length < 2) {
    return NextResponse.json({ error: "Please provide a description of at least 2 characters." }, { status: 400 });
  }
  if (description.trim().length > 500) {
    return NextResponse.json({ error: "Description must be 500 characters or fewer." }, { status: 400 });
  }
  if (supplier !== undefined && (typeof supplier !== "string" || supplier.length > 200)) {
    return NextResponse.json({ error: "Supplier must be 200 characters or fewer." }, { status: 400 });
  }
  const industryKey: IndustryKey | null = isIndustryKey(industry) ? industry : null;

  const ip = getClientIp(req.headers);

  const captchaOk = await verifyRecaptcha(recaptchaToken, ip, RECAPTCHA_ACTION);
  if (!captchaOk) {
    return NextResponse.json({ error: "Bot check failed. Please refresh the page and try again." }, { status: 403 });
  }

  const rateLimit = await checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: `You've reached the free limit of ${rateLimit.limit} lookups per day. Book a call for bulk classification.`, rateLimited: true },
      { status: 429 }
    );
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Service not configured." }, { status: 500 });
  }

  const trimmedDescription = description.trim();
  const candidates = searchCandidates(trimmedDescription, industryKey, 25);

  if (candidates.length === 0) {
    return NextResponse.json({
      error: "Couldn't find any close matches for this description. Try rephrasing with more detail, or book a call for classification support.",
      consumed: false,
      remaining: rateLimit.remaining,
    });
  }

  const candidateByCode = new Map(candidates.map((c) => [c.code, c]));

  const userMessage = [
    supplier?.trim() ? `Supplier: "${supplier.trim()}"` : null,
    `Description: "${trimmedDescription}"`,
    "",
    "Candidates:",
    formatCandidates(candidates),
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        // llama-3.3-70b-versatile was decommissioned by Groq on 2026-08-16;
        // gpt-oss-120b is Groq's recommended replacement. It's a reasoning
        // model - include_reasoning: false keeps its chain-of-thought out of
        // message.content (reasoning models can otherwise leak reasoning
        // text into content on some requests).
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
        temperature: 0.1,
        max_tokens: 1024,
        reasoning_effort: "medium",
        include_reasoning: false,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      console.error(`Groq API error: ${response.status} ${errorBody}`);
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content ?? "";

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in response");

    const result = JSON.parse(jsonMatch[0]);

    if (result.no_match || result.error) {
      return NextResponse.json({
        error: "Couldn't confidently match this to a verified official UNSPSC code. Try rephrasing with more detail, or book a call for classification support.",
        consumed: true,
        remaining: rateLimit.remaining,
      });
    }

    // The model may only pick from the candidates it was shown, but never
    // trust it blindly - confirm the code is one of those candidates (falling
    // back to the full validated dataset only as a last-resort safety net)
    // and always serve our own authoritative titles, never the model's.
    const rawCode = typeof result.code === "string" || typeof result.code === "number" ? String(result.code).trim() : "";
    const fromCandidates = candidateByCode.get(rawCode);
    const fromFullIndex = !fromCandidates && rawCode ? getValidationIndex().get(rawCode) : undefined;

    const hierarchy = fromCandidates
      ? {
          code: fromCandidates.code,
          segmentCode: fromCandidates.segmentCode,
          segmentTitle: fromCandidates.segmentTitle,
          familyCode: fromCandidates.familyCode,
          familyTitle: fromCandidates.familyTitle,
          classCode: fromCandidates.classCode,
          classTitle: fromCandidates.classTitle,
          commodityTitle: fromCandidates.title,
        }
      : fromFullIndex
        ? {
            code: fromFullIndex.commodity.code,
            segmentCode: fromFullIndex.segment.code,
            segmentTitle: fromFullIndex.segment.title,
            familyCode: fromFullIndex.family.code,
            familyTitle: fromFullIndex.family.title,
            classCode: fromFullIndex.class.code,
            classTitle: fromFullIndex.class.title,
            commodityTitle: fromFullIndex.commodity.title,
          }
        : null;

    if (!hierarchy) {
      console.error("UNSPSC model picked a code outside the candidate list:", { rawCode, modelOutput: text, candidateCodes: candidates.map((c) => c.code) });
      return NextResponse.json({
        error: "Couldn't confidently match this to a verified official UNSPSC code. Try rephrasing with more detail, or book a call for classification support.",
        consumed: true,
        remaining: rateLimit.remaining,
      });
    }

    return NextResponse.json({
      code: hierarchy.code,
      segment: `${hierarchy.segmentCode} — ${hierarchy.segmentTitle}`,
      family: `${hierarchy.familyCode} — ${hierarchy.familyTitle}`,
      class: `${hierarchy.classCode} — ${hierarchy.classTitle}`,
      commodity: `${hierarchy.code} — ${hierarchy.commodityTitle}`,
      confidence: result.confidence === "high" || result.confidence === "medium" || result.confidence === "low" ? result.confidence : "medium",
      notes: typeof result.notes === "string" ? result.notes : undefined,
      consumed: true,
      remaining: rateLimit.remaining,
    });
  } catch (err) {
    console.error("UNSPSC lookup failed:", err);
    return NextResponse.json({ error: "Classification failed. Please try again.", consumed: true, remaining: rateLimit.remaining }, { status: 500 });
  }
}
