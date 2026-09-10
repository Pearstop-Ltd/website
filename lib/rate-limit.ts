import "server-only";

// Per-IP daily rate limit for the free UNSPSC lookup tool, backed by Vercel KV.
// Requires KV_REST_API_URL / KV_REST_API_TOKEN (auto-injected once KV storage
// is enabled on the Vercel project). Without them, this fails open (allows
// the request) rather than breaking the tool in local dev / before KV is set
// up — but that means there is NO real protection until KV is configured.
const DAILY_LIMIT = 5;
const kvConfigured = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

let warnedOnce = false;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  limit: number;
  configured: boolean;
}

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  if (!kvConfigured) {
    if (!warnedOnce) {
      console.warn(
        "[unspsc-lookup] KV_REST_API_URL/KV_REST_API_TOKEN not set — rate limiting is disabled (fail-open). " +
        "Enable Vercel KV storage on this project before relying on this in production."
      );
      warnedOnce = true;
    }
    return { allowed: true, remaining: DAILY_LIMIT, limit: DAILY_LIMIT, configured: false };
  }

  const { kv } = await import("@vercel/kv");
  const day = new Date().toISOString().slice(0, 10);
  const key = `unspsc-lookup:${ip}:${day}`;

  const count = await kv.incr(key);
  if (count === 1) {
    await kv.expire(key, 60 * 60 * 26); // a little over a day, covers timezone edges
  }

  return {
    allowed: count <= DAILY_LIMIT,
    remaining: Math.max(0, DAILY_LIMIT - count),
    limit: DAILY_LIMIT,
    configured: true,
  };
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
