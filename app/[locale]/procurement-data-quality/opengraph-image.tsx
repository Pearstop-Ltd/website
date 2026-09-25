import { renderOgImage, OG_SIZE } from "@/components/site/og/OgImage";

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
