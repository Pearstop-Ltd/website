import { renderOgImage, OG_SIZE } from "@/components/site/og/OgImage";

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
