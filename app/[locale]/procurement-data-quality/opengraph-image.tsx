import { renderOgImage, OG_SIZE } from "@/components/site/og/OgImage";

import { routing } from "@/i18n/routing";

// Prerender one image per locale so crawlers fetching it hit the CDN, not a function.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Procurement data quality";

export default function Image() {
  return renderOgImage({
    variant: "solution",
    eyebrow: "Solutions",
    title: "Procurement data quality",
    bottomLine: "Send us 200 lines, free.",
    visual: "merge",
  });
}
