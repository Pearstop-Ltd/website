"use client";

import { useCallback } from "react";
import Script from "next/script";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

/**
 * reCAPTCHA v3 (score-based, invisible) — the key in use is registered as
 * v3, not v2 checkbox, so this must load the v3 script (?render=SITE_KEY)
 * and get a fresh token per submit via execute(), not render a widget.
 * v3 tokens expire after ~2 minutes, so always fetch one right before
 * submitting rather than caching it in state ahead of time.
 */
export function useRecaptchaV3() {
  const getToken = useCallback(async (action: string): Promise<string | null> => {
    if (!SITE_KEY || typeof window === "undefined" || !window.grecaptcha) return null;
    return new Promise((resolve) => {
      window.grecaptcha!.ready(() => {
        window
          .grecaptcha!.execute(SITE_KEY, { action })
          .then((token) => resolve(token))
          .catch(() => resolve(null));
      });
    });
  }, []);

  return { getToken, configured: Boolean(SITE_KEY) };
}

export function RecaptchaScript() {
  if (!SITE_KEY) return null;
  return <Script src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`} strategy="afterInteractive" />;
}

/** Google requires this disclosure wherever the default v3 badge is hidden; shown here regardless since it's small and standard practice. */
export function RecaptchaNotice() {
  if (!SITE_KEY) {
    return (
      <p style={{ fontSize: "0.78rem", color: "#b45309", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "0.6rem 0.85rem" }}>
        Bot protection isn&apos;t configured yet (missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY) — lookups will be rejected until it is.
      </p>
    );
  }
  return (
    <p style={{ fontSize: "0.72rem", color: "#888" }}>
      This site is protected by reCAPTCHA and the Google{" "}
      <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>{" "}
      and{" "}
      <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms of Service</a>{" "}
      apply.
    </p>
  );
}
