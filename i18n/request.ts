import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

function deepMerge(base: Record<string, unknown>, override: Record<string, unknown>): Record<string, unknown> {
  const result = { ...base };
  for (const key of Object.keys(override)) {
    const b = base[key];
    const o = override[key];
    if (b && o && typeof b === "object" && typeof o === "object" && !Array.isArray(b) && !Array.isArray(o)) {
      result[key] = deepMerge(b as Record<string, unknown>, o as Record<string, unknown>);
    } else {
      result[key] = o;
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "en" | "nl")) {
    locale = routing.defaultLocale;
  }

  const localeMessages = (await import(`../messages/${locale}.json`)).default;

  // Deep-merge locale messages over English so untranslated keys fall back to EN
  const messages = locale === "en"
    ? localeMessages
    : deepMerge(
        (await import("../messages/en.json")).default as Record<string, unknown>,
        localeMessages as Record<string, unknown>
      );

  return {
    locale,
    messages,
    onError(error) {
      if (error.code === "MISSING_MESSAGE") return;
      console.error(error);
    },
    getMessageFallback({ key, namespace }) {
      return `${namespace}.${key}`;
    },
  };
});
