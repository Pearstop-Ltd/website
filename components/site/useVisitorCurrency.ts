"use client";

import { useEffect, useState } from "react";
import { COUNTRY_COOKIE, currencyForCountry, type CurrencyInfo } from "@/lib/currency";

/** The visitor's display currency, from the country cookie proxy.ts sets.
 * Renders EUR on the server and on first paint (keeping the page static and
 * hydration-safe), then switches once the cookie has been read. */
export function useVisitorCurrency(): CurrencyInfo {
  const [currency, setCurrency] = useState<CurrencyInfo>(() => currencyForCountry(null));
  useEffect(() => {
    const match = document.cookie.match(new RegExp(`(?:^|; )${COUNTRY_COOKIE}=([A-Za-z]{2})`));
    if (match) setCurrency(currencyForCountry(match[1]));
  }, []);
  return currency;
}
