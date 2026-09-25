import { renderOgImage, OG_SIZE } from "@/components/site/og/OgImage";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Spend classification for consultancies";

export default function Image() {
  return renderOgImage({
    variant: "solution",
    eyebrow: "Solutions",
    title: "Spend classification for consultancies",
    bottomLine: "Send us 200 lines, free.",
    visual: "merge",
  });
}
