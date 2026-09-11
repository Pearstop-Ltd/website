import { NextRequest, NextResponse } from "next/server";
import { buildIndustryContext, getValidationIndex, isIndustryKey, type IndustryKey } from "@/lib/unspsc-industries";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const BASE_SYSTEM_PROMPT = `You are a UNSPSC classification expert. Your job is to find the single most accurate 8-digit UNSPSC commodity code for a product or service description.

UNSPSC hierarchy:
- Segment (2 digits): broadest category
- Family (4 digits): narrows by type
- Class (6 digits): specific product/service type
- Commodity (8 digits): most precise level — always aim for this

CLASSIFICATION PROCESS — work through this internally before answering:
1. SEGMENT: Which of the ~55 top-level segments fits best? Consider all candidates before choosing.
2. FAMILY: Within that segment, which family is the closest match?
3. CLASS: Within that family, which class fits?
4. COMMODITY: What is the most specific 8-digit code? If multiple commodities could apply, pick the one that most closely matches the exact wording of the description.
5. CONFIDENCE CHECK: Would a procurement professional agree with this code? If not, reconsider.
   - "high": clear, unambiguous match at commodity level
   - "medium": reasonable match but description was vague or could fit multiple codes
   - "low": best guess — description too generic or unusual to classify with certainty

IMPORTANT RULES:
- Never invent codes. Only use codes that exist in the real UNSPSC taxonomy.
- The 8-digit code must follow the pattern: digits 1-2 = segment, digits 3-4 = family, digits 5-6 = class, digits 7-8 = commodity.
- If the description contains a brand name or model number, classify the underlying product type, not the brand.
- For maintenance/repair services, use segment 72 (Construction and Maintenance Services), not the segment for the physical product being maintained.
- For supply/purchase of physical goods, do NOT use segment 72.
- A supplier name, if given, is context only — it narrows which category is plausible, it is never itself the answer.

Respond ONLY with valid JSON — no markdown, no explanation outside the JSON:
{
  "code": "72101505",
  "segment": "72 — Construction and Maintenance Services",
  "family": "7210 — Building and Facility Maintenance Services",
  "class": "721015 — Electrical Systems Maintenance and Repair Services",
  "commodity": "72101505 — Lighting Maintenance and Repair Services",
  "confidence": "high",
  "notes": "Optional: mention only if the description was ambiguous, if a nearby code might also apply, or if the user should verify at commodity level."
}

If the description is completely unclassifiable, return: { "error": "Could not classify: [reason]" }`;

async function verifyRecaptcha(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.warn("[unspsc-lookup] RECAPTCHA_SECRET_KEY not set — bot check is disabled (fail-open).");
    return true;
  }
  if (!token) return false;

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
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

  const captchaOk = await verifyRecaptcha(recaptchaToken, ip);
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

  const industryContext = buildIndustryContext(industryKey);
  const systemPrompt = industryContext
    ? `${BASE_SYSTEM_PROMPT}\n\nThe user has indicated this item is most likely related to one of these UNSPSC categories (real segments/families from the official standard) — strongly prefer a commodity under one of them, but pick a different real segment if the description clearly doesn't fit any of these:\n${industryContext}`
    : BASE_SYSTEM_PROMPT;

  const userMessage = supplier?.trim()
    ? `Supplier: "${supplier.trim()}"\nDescription: "${description.trim()}"\n\nClassify this procurement line and return JSON only.`
    : `Classify this procurement description and return JSON only: "${description.trim()}"`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.1,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content ?? "";

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in response");

    const result = JSON.parse(jsonMatch[0]);

    if (result.error) {
      return NextResponse.json({ ...result, consumed: true, remaining: rateLimit.remaining });
    }

    // Never trust the model's code (or its own hierarchy labels) blindly —
    // verify against the real UNSPSC dataset and, if valid, replace the
    // hierarchy fields with our authoritative titles so they can't drift
    // from what the code actually means.
    const validated = typeof result.code === "string" ? getValidationIndex().get(result.code) : undefined;

    if (!validated) {
      return NextResponse.json({
        error: "Couldn't confidently match this to a verified official UNSPSC code. Try rephrasing with more detail, or book a call for classification support.",
        consumed: true,
        remaining: rateLimit.remaining,
      });
    }

    return NextResponse.json({
      code: validated.commodity.code,
      segment: `${validated.segment.code} — ${validated.segment.title}`,
      family: `${validated.family.code} — ${validated.family.title}`,
      class: `${validated.class.code} — ${validated.class.title}`,
      commodity: `${validated.commodity.code} — ${validated.commodity.title}`,
      confidence: result.confidence === "high" || result.confidence === "medium" || result.confidence === "low" ? result.confidence : "medium",
      notes: typeof result.notes === "string" ? result.notes : undefined,
      consumed: true,
      remaining: rateLimit.remaining,
    });
  } catch {
    return NextResponse.json({ error: "Classification failed. Please try again.", consumed: true, remaining: rateLimit.remaining }, { status: 500 });
  }
}
