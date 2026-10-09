import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { complianceKeyForPath } from "./lib/compliance-pages";

const intlMiddleware = createMiddleware(routing);

// Vercel's edge geo header -> the site locale a visitor from that country
// should land on. Anything not listed here (including no header at all,
// e.g. local dev) falls through to next-intl's normal Accept-Language /
// cookie-based detection.
const COUNTRY_LOCALE: Record<string, string> = {
  NL: "nl",
  FR: "fr",
  DE: "de",
  AT: "de",
  CH: "de",
};

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasLocalePrefix = routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  const hasStoredPreference = request.cookies.has("NEXT_LOCALE");

  // Only geo-steer a first-time visitor hitting an un-prefixed URL (e.g. "/"
  // or "/industries") - never override a URL that already names a locale
  // (a visitor or link explicitly asked for that language), and never
  // override someone who has already picked a language on a prior visit.
  if (!hasLocalePrefix && !hasStoredPreference) {
    const country = request.headers.get("x-vercel-ip-country");
    const geoLocale = country ? COUNTRY_LOCALE[country.toUpperCase()] : undefined;
    if (geoLocale) {
      const url = request.nextUrl.clone();
      url.pathname = `/${geoLocale}${pathname === "/" ? "" : pathname}`;
      const response = NextResponse.redirect(url);
      response.cookies.set("NEXT_LOCALE", geoLocale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
      return response;
    }
  }

  const response = intlMiddleware(request);

  // next-intl's alternate-link header assumes one slug for every locale. The
  // compliance pages have a slug per locale and emit the right hreflang set in
  // their own metadata, so the header would only contradict it.
  if (complianceKeyForPath(pathname)) response.headers.delete("link");

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\..*).*)",
  ],
};
