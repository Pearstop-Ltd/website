"use client";

import { useEffect, useId, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    grecaptcha?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => number;
      reset: (widgetId?: number) => void;
      ready: (cb: () => void) => void;
    };
  }
}

/**
 * Google reCAPTCHA v2 (checkbox) widget. Renders nothing (and never calls
 * onToken) if NEXT_PUBLIC_RECAPTCHA_SITE_KEY isn't set, so local dev without
 * a site key doesn't crash — the form's own submit handler blocks sending
 * without a token either way, so an unconfigured widget just means the tool
 * can't be submitted until it is configured, not a broken request.
 *
 * If the key you have is actually a v3 (invisible, score-based) key rather
 * than a v2 checkbox key, this needs a different render call
 * (grecaptcha.execute with an action, no visible widget) — check which type
 * before wiring in a real key.
 */
export function RecaptchaWidget({ onToken, reset }: { onToken: (token: string | null) => void; reset?: number }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const containerId = useId().replace(/[:]/g, "");
  const widgetId = useRef<number | null>(null);

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;
    const tryRender = () => {
      if (cancelled || !window.grecaptcha || widgetId.current !== null) return;
      widgetId.current = window.grecaptcha.render(containerId, {
        sitekey: siteKey,
        callback: (token: string) => onToken(token),
        "expired-callback": () => onToken(null),
        "error-callback": () => onToken(null),
      });
    };
    if (window.grecaptcha) window.grecaptcha.ready(tryRender);
    else {
      const interval = setInterval(() => {
        if (window.grecaptcha) {
          clearInterval(interval);
          window.grecaptcha.ready(tryRender);
        }
      }, 200);
      return () => { cancelled = true; clearInterval(interval); };
    }
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey]);

  useEffect(() => {
    if (reset === undefined || widgetId.current === null) return;
    window.grecaptcha?.reset(widgetId.current);
  }, [reset]);

  if (!siteKey) {
    return (
      <p style={{ fontSize: "0.78rem", color: "#b45309", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "0.6rem 0.85rem" }}>
        Bot protection isn&apos;t configured yet (missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY) — lookups will be rejected until it is.
      </p>
    );
  }

  return (
    <>
      <Script src="https://www.google.com/recaptcha/api.js" strategy="afterInteractive" />
      <div id={containerId} />
    </>
  );
}
