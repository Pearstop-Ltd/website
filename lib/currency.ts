import { headers } from "next/headers";

export type CurrencyCode = "GBP" | "EUR" | "USD" | "ZAR";

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  /** Multiplier applied to a GBP base amount. For ZAR this is a flat 15x
   * "feels right" multiplier the business chose instead of the real ~20x
   * GBP→ZAR FX rate, since illustrative UK/EU prices read as too high for
   * the South African market. */
  rate: number;
}

const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  GBP: { code: "GBP", symbol: "£", rate: 1 },
  EUR: { code: "EUR", symbol: "€", rate: 1.16 },
  USD: { code: "USD", symbol: "$", rate: 1.27 },
  ZAR: { code: "ZAR", symbol: "R", rate: 15 },
};

// ISO 3166-1 alpha-2 codes for Europe (EU + EEA/UK-adjacent), excluding GB
// (handled separately, above the Europe check) and ZA (handled separately
// too). Everything else falls back to USD.
const EUROPE_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES",
  "SE", "NO", "CH", "IS", "LI", "AL", "AD", "BA", "MC", "ME", "MK", "RS", "SM",
  "VA", "MD", "UA", "XK",
]);

export function currencyForCountry(countryCode: string | null | undefined): CurrencyInfo {
  const cc = (countryCode ?? "").toUpperCase();
  // No geo signal at all (e.g. local dev, where the Vercel edge header is
  // absent) - default to EUR rather than guessing USD.
  if (!cc) return CURRENCIES.EUR;
  if (cc === "GB") return CURRENCIES.GBP;
  if (cc === "ZA") return CURRENCIES.ZAR;
  if (EUROPE_COUNTRIES.has(cc)) return CURRENCIES.EUR;
  return CURRENCIES.USD;
}

/** Reads the visitor's country from the Vercel edge geo header (set
 * automatically in production; absent in local dev, where we fall back to
 * EUR — see currencyForCountry). Call once per request from a server
 * component and thread the result down as a prop — cheaper than re-reading
 * headers() per section. */
export async function getRequestCurrency(): Promise<CurrencyInfo> {
  const headerList = await headers();
  const country = headerList.get("x-vercel-ip-country");
  return currencyForCountry(country);
}

/** Converts a GBP base amount into the target currency and formats it with
 * the currency's symbol, e.g. formatMoney(29600, EUR) -> "€34,336". */
export function formatMoney(amountGBP: number, currency: CurrencyInfo, decimals = false): string {
  const converted = amountGBP * currency.rate;
  const formatted = converted.toLocaleString("en-US", {
    minimumFractionDigits: decimals ? 2 : 0,
    maximumFractionDigits: decimals ? 2 : 0,
  });
  return `${currency.symbol}${formatted}`;
}
