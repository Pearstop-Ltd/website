import { renderOgImage, OG_SIZE } from "@/components/site/og/OgImage";

import { routing } from "@/i18n/routing";

// Prerender one image per locale so crawlers fetching it hit the CDN, not a function.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Invoice and document extraction";

export default function Image() {
  return renderOgImage({
    variant: "solution",
    eyebrow: "Solutions",
    title: "Invoice and document extraction",
    bottomLine: "Send us 10 invoices, free.",
    visual: "rows",
  });
}
