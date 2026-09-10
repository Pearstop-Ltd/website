"use client";

import { useEffect, useId, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

/**
 * Cloudflare Turnstile widget. Renders nothing (and calls onToken with a
 * placeholder) if NEXT_PUBLIC_TURNSTILE_SITE_KEY isn't set, so local dev
 * without a site key doesn't hard-block the form — the server route still
 * requires a valid token once TURNSTILE_SECRET_KEY is configured, so an
 * unconfigured widget just means requests get rejected server-side instead.
 */
export function TurnstileWidget({ onToken, reset }: { onToken: (token: string | null) => void; reset?: number }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerId = useId().replace(/[:]/g, "");
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!siteKey || !window.turnstile) return;
    widgetId.current = window.turnstile.render(`#${containerId}`, {
      sitekey: siteKey,
      callback: (token: string) => onToken(token),
      "expired-callback": () => onToken(null),
      "error-callback": () => onToken(null),
    });
    return () => {
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey]);

  useEffect(() => {
    if (reset === undefined) return;
    if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  }, [reset]);

  if (!siteKey) {
    return (
      <p style={{ fontSize: "0.78rem", color: "#b45309", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "0.6rem 0.85rem" }}>
        Bot protection isn&apos;t configured yet (missing NEXT_PUBLIC_TURNSTILE_SITE_KEY) — lookups will be rejected until it is.
      </p>
    );
  }

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      <div id={containerId} />
    </>
  );
}
