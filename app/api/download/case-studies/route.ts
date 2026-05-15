import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const name = (body.get("name") as string) ?? "";
  const email = (body.get("email") as string) ?? "";
  const company = (body.get("company") as string) ?? "";

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          name,
          email,
          company,
          phone: "",
          leadId: randomUUID()
        })
      });
    } catch {
      // Non-blocking — still redirect to PDF even if sheet write fails
    }
  }

  return NextResponse.redirect(siteConfig.downloads.caseStudiesPdf, { status: 303 });
}
