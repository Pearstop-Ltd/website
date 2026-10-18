"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

// GA4 and Microsoft Clarity set cookies, so under GDPR/ePrivacy they only load
// after the visitor clicks "Accept". Vercel Analytics is cookieless and runs
// for everyone (rendered separately in the layouts).
const GA_MEASUREMENT_ID = "G-VKJM4RYZHN";
const CLARITY_PROJECT_ID = "yznu4y55gy";

const STORAGE_KEY = "pearstop-analytics-consent";
const OPEN_EVENT = "pearstop:open-cookie-settings";

type Consent = "granted" | "denied";

function readConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function writeConsent(value: Consent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
}

// Remove the cookies GA4 and Clarity set, for when consent is withdrawn.
function clearAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!/^(_ga|_gid|_gat|_clck|_clsk|CLID|MUID)/.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; path=/; max-age=0${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

/** Footer link that reopens the consent banner. */
export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="ft-cookie-settings"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      {label}
    </button>
  );
}

export function AnalyticsConsent() {
  const t = useTranslations("Common.consent");
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;
  const [consent, setConsent] = useState<Consent | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    setBannerOpen(stored === null);
    const open = () => setBannerOpen(true);
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  function choose(value: Consent) {
    const wasGranted = consent === "granted";
    writeConsent(value);
    setConsent(value);
    setBannerOpen(false);
    if (value === "denied" && wasGranted) {
      // The scripts are already running; clear their cookies and reload so
      // nothing keeps tracking on this page.
      clearAnalyticsCookies();
      window.location.reload();
    }
  }

  const trackingEnabled = consent === "granted" && process.env.NODE_ENV === "production";

  return (
    <>
      {trackingEnabled ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
          </Script>
          {CLARITY_PROJECT_ID ? (
            <Script id="clarity-init" strategy="afterInteractive">
              {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
window.clarity("consent");`}
            </Script>
          ) : null}
        </>
      ) : null}

      {bannerOpen ? (
        <div className="cookie-banner" role="dialog" aria-live="polite" aria-label={t("label")}>
          <p className="cookie-banner-text">
            {t("message")}{" "}
            <Link href={`${prefix}/privacy`}>{t("privacyLink")}</Link>
          </p>
          <div className="cookie-banner-actions">
            <button type="button" className="cookie-banner-btn cookie-banner-btn-secondary" onClick={() => choose("denied")}>
              {t("decline")}
            </button>
            <button type="button" className="cookie-banner-btn cookie-banner-btn-primary" onClick={() => choose("granted")}>
              {t("accept")}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
