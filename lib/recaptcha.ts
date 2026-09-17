// Shared server-side verification for reCAPTCHA v3 (score-based, invisible).
// siteverify returns a 0.0-1.0 score and the action name alongside success -
// both need checking, not just success, or a low-score bot pass would pass.
const RECAPTCHA_SCORE_THRESHOLD = 0.5;

export async function verifyRecaptcha(token: string | undefined, ip: string, action: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.warn(`[recaptcha] RECAPTCHA_SECRET_KEY not set — bot check disabled (fail-open) for action "${action}".`);
    return true;
  }
  if (!token) return false;

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip })
    });
    const data = await res.json();
    if (data.success !== true) return false;
    if (typeof data.score === "number" && data.score < RECAPTCHA_SCORE_THRESHOLD) return false;
    if (typeof data.action === "string" && data.action !== action) return false;
    return true;
  } catch {
    return false;
  }
}
