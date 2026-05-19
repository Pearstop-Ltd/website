import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a UNSPSC classification expert. Given a product or service description, return the best matching UNSPSC commodity code.

UNSPSC has 4 levels:
- Segment (2 digits): broadest category
- Family (4 digits): subcategory
- Class (6 digits): specific type
- Commodity (8 digits): most specific

Always classify to commodity level (8 digits) when possible.

Respond ONLY with valid JSON in this exact format:
{
  "code": "72101505",
  "segment": "72 — Construction and Maintenance Services",
  "family": "7210 — Building and Facility Maintenance Services",
  "class": "721015 — Electrical Systems Maintenance and Repair Services",
  "commodity": "72101505 — Lighting Maintenance and Repair Services",
  "confidence": "high",
  "notes": "Optional short note if the description was ambiguous or if a nearby code might also apply."
}

Confidence levels: "high" (clear match), "medium" (reasonable match, description was ambiguous), "low" (best guess, description was too vague).
If the description is completely unclassifiable or nonsensical, return: { "error": "Could not classify: [reason]" }`;

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
          { role: "user", content: `Classify this description: "${description.trim()}"` },
        ],
        temperature: 0.1,
        max_tokens: 512,
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
