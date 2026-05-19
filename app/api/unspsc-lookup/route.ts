import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a UNSPSC classification expert. Your job is to find the single most accurate 8-digit UNSPSC commodity code for a product or service description.

UNSPSC hierarchy:
- Segment (2 digits): broadest category
- Family (4 digits): narrows by type
- Class (6 digits): specific product/service type
- Commodity (8 digits): most precise level — always aim for this

CLASSIFICATION PROCESS — work through this internally before answering:
1. SEGMENT: Which of the ~50 top-level segments fits best? Consider all candidates before choosing.
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

export async function POST(req: NextRequest) {
  const { description } = await req.json();

  if (!description || typeof description !== "string" || description.trim().length < 2) {
    return NextResponse.json({ error: "Please provide a description of at least 2 characters." }, { status: 400 });
  }

  if (description.trim().length > 500) {
    return NextResponse.json({ error: "Description must be 500 characters or fewer." }, { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Service not configured." }, { status: 500 });
  }

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
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Classify this procurement description and return JSON only: "${description.trim()}"` },
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
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Classification failed. Please try again." }, { status: 500 });
  }
}
