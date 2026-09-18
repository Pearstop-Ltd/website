import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { getClientIp } from "@/lib/rate-limit";
import { verifyRecaptcha } from "@/lib/recaptcha";

// Sample invoice files can be a few MB each (PDFs/scans); keep the request
// body limit generous but bounded so this route can't be used to smuggle
// arbitrarily large uploads.
export const maxDuration = 60;

const MAX_FILES = 10;
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB per file

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type NotifyPayload = {
  leadId: string;
  contactType: string;
  name: string;
  company: string;
  email: string;
  spend?: string;
  goal?: string;
  files?: { name: string; url: string; downloadUrl: string }[];
};

// Slack default mention: Stephanie, until the Claude Slack app is installed
// in the workspace and SAMPLE_REQUEST_SLACK_MENTION is set to its bot ID
// (e.g. "<@U0123ABCDEF>"), at which point that env var overrides this.
const DEFAULT_SLACK_MENTION = "<@U09MBG8SZ7G>";

// Posts to a Slack incoming webhook (SAMPLE_REQUEST_WEBHOOK_URL) - set one up
// at api.slack.com/apps -> Incoming Webhooks -> Add New Webhook to Workspace,
// pointed at #sales.
function notifySlack(payload: NotifyPayload) {
  const webhookUrl = process.env.SAMPLE_REQUEST_WEBHOOK_URL;
  if (!webhookUrl) return;

  const mention = process.env.SAMPLE_REQUEST_SLACK_MENTION || DEFAULT_SLACK_MENTION;
  const lines = [
    `*${payload.contactType}*`,
    `*Name:* ${payload.name || "Not provided"}`,
    `*Company:* ${payload.company}`,
    `*Email:* ${payload.email}`
  ];
  if (payload.spend) lines.push(`*Spend:* ${payload.spend}`);
  if (payload.goal) lines.push(`*Goal:* ${payload.goal}`);
  if (payload.files?.length) lines.push(`*Files:* ${payload.files.map((f) => f.name).join(", ")}`);
  lines.push(mention);

  fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: lines.join("\n") })
  }).catch(() => {});
}

// Reuses the same Google Sheets webhook as the case-studies download form.
// That automation only knows how to append a row, not look one up and
// update it - so the "start" and "complete" stages of one lead land as two
// separate rows sharing the same leadId, not one row filled in over time.
// If you want them merged into a single row, the Zap/Make scenario itself
// needs a "find row by leadId, then update" step added on its end.
function notifySheet(payload: NotifyPayload) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) return;

  fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      name: payload.name,
      email: payload.email,
      company: payload.company,
      phone: "",
      leadId: payload.leadId,
      contactType: payload.contactType,
      spend: payload.spend || "",
      goal: payload.goal || "",
      files: payload.files?.map((f) => f.name).join(", ") || ""
    })
  }).catch(() => {});
}

function notify(payload: NotifyPayload) {
  notifySlack(payload);
  notifySheet(payload);
}

// Two-stage submission so the email is captured (stage "start") before the
// visitor ever reaches the file upload step (stage "complete") - if they
// abandon after stage one, we still have the lead.
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const stage = (formData.get("stage") as string) === "complete" ? "complete" : "start";
  const ip = getClientIp(req.headers);
  const recaptchaToken = (formData.get("recaptchaToken") as string) || undefined;
  const email = ((formData.get("email") as string) || "").trim();
  const company = ((formData.get("company") as string) || "").trim();
  const name = ((formData.get("name") as string) || "").trim();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!company) {
    return NextResponse.json({ error: "Please enter your company name." }, { status: 400 });
  }

  if (stage === "start") {
    const captchaOk = await verifyRecaptcha(recaptchaToken, ip, "sample_request_start");
    if (!captchaOk) {
      return NextResponse.json({ error: "Bot check failed. Please refresh the page and try again." }, { status: 403 });
    }

    const leadId = randomUUID();
    notify({ leadId, name, email, company, contactType: "Sample request - started" });

    return NextResponse.json({ ok: true, leadId });
  }

  const leadId = (formData.get("leadId") as string) || randomUUID();
  const spend = ((formData.get("spend") as string) || "").trim();
  const goal = ((formData.get("goal") as string) || "").trim();

  const captchaOk = await verifyRecaptcha(recaptchaToken, ip, "sample_request_complete");
  if (!captchaOk) {
    return NextResponse.json({ error: "Bot check failed. Please refresh the page and try again." }, { status: 403 });
  }

  const files = formData.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) {
    return NextResponse.json({ error: `Send at most ${MAX_FILES} files.` }, { status: 400 });
  }
  if (files.some((f) => f.size > MAX_FILE_SIZE)) {
    return NextResponse.json({ error: "Each file must be under 15MB." }, { status: 400 });
  }

  // Invoice data can be sensitive, so these are stored as private blobs -
  // the URL isn't publicly fetchable, it requires the store's own token
  // (i.e. access via the Vercel dashboard/API, not a bare link).
  const uploaded: { name: string; url: string; downloadUrl: string }[] = [];
  for (const file of files) {
    const blob = await put(`sample-requests/${leadId}/${file.name}`, file, {
      access: "private",
      addRandomSuffix: true
    });
    uploaded.push({ name: file.name, url: blob.url, downloadUrl: blob.downloadUrl });
  }

  notify({ leadId, name, email, company, spend, goal, files: uploaded, contactType: "Sample request - completed" });

  return NextResponse.json({ ok: true, filesReceived: uploaded.length });
}
