import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

const interMedium = readFileSync(join(process.cwd(), "assets/fonts/Inter-Medium.ttf"));
const interSemiBold = readFileSync(join(process.cwd(), "assets/fonts/Inter-SemiBold.ttf"));
const logoBase64 = readFileSync(join(process.cwd(), "public/brand/logo-light.png")).toString("base64");
const LOGO_SRC = `data:image/png;base64,${logoBase64}`;
// Real aspect ratio of /brand/logo-light.png (800x178) — sized by height, never stretched.
const LOGO_HEIGHT = 56;
const LOGO_WIDTH = Math.round(LOGO_HEIGHT * (800 / 178));

export const OG_SIZE = { width: 1200, height: 630 };

const COLORS = {
  bg: "#1F2A68",
  headline: "#FFFFFF",
  secondary: "#DCE1F8",
  accent: "#A383FF",
  cardBg: "#FFFFFF",
  bar: "#2A3990",
  check: "#8BC34A",
  rowBar: "#C9CDD8",
};

function CheckBadge() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="13" cy="13" r="13" fill={COLORS.check} />
      <path d="M7.5 13.5 L11.5 17.5 L18.5 9" stroke={COLORS.bg} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
      <path d="M0 10 H30" stroke={COLORS.secondary} strokeWidth="4" />
      <path d="M28 2 L40 10 L28 18 Z" fill={COLORS.secondary} />
    </svg>
  );
}

/** Rotated raw-line bars merging (via a right brace) into one clean, checked
 * card — the "many messy sources become one structured output" visual used
 * on the default OG image and product-agnostic solution pages. */
function MergeVisual() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
        <div style={{ display: "flex", height: 20, width: 96, borderRadius: 6, background: "rgba(220,225,248,0.35)", transform: "rotate(-3deg)" }} />
        <div style={{ display: "flex", height: 20, width: 78, borderRadius: 6, background: "rgba(220,225,248,0.35)", transform: "rotate(2deg)" }} />
        <div style={{ display: "flex", height: 20, width: 104, borderRadius: 6, background: "rgba(220,225,248,0.35)", transform: "rotate(-1.5deg)" }} />
      </div>
      <svg width="24" height="120" viewBox="0 0 24 120" fill="none">
        <path d="M3 3 Q11 3 11 15 L11 48 Q11 60 22 60 Q11 60 11 72 L11 105 Q11 117 3 117" stroke={COLORS.secondary} strokeWidth="4" />
      </svg>
      <Arrow />
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: COLORS.cardBg, borderRadius: 16, padding: 18 }}>
        <CheckBadge />
        <div style={{ display: "flex", height: 20, width: 76, borderRadius: 6, background: COLORS.bar }} />
      </div>
    </div>
  );
}

/** A rotated invoice/document card feeding an arrow into a checked-rows
 * card — the doc-to-structured-rows visual, used on /invoice-data-extraction. */
function RowsVisual() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 104, height: 140, boxSizing: "border-box", background: COLORS.cardBg, borderRadius: 8, padding: "16px 14px", transform: "rotate(-3deg)" }}>
        <div style={{ display: "flex", height: 12, width: 50, borderRadius: 3, background: COLORS.bar }} />
        <div style={{ display: "flex", height: 9, width: "100%", borderRadius: 3, background: COLORS.rowBar }} />
        <div style={{ display: "flex", height: 9, width: "100%", borderRadius: 3, background: COLORS.rowBar }} />
        <div style={{ display: "flex", height: 9, width: "100%", borderRadius: 3, background: COLORS.rowBar }} />
        <div style={{ display: "flex", height: 10, width: "70%", borderRadius: 3, background: COLORS.accent, transform: "rotate(-5deg)" }} />
      </div>
      <Arrow />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, background: COLORS.cardBg, borderRadius: 16, padding: 20 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <CheckBadge />
            <div style={{ display: "flex", height: 18, width: 96, borderRadius: 5, background: COLORS.bar }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export type OgVisual = "merge" | "rows";

export interface OgImageProps {
  /** "default": no eyebrow, plain headline. "solution": eyebrow + product title. */
  variant: "default" | "solution";
  eyebrow?: string;
  title: string;
  bottomLine: string;
  visual: OgVisual;
}

export function renderOgImage({ variant, eyebrow, title, bottomLine, visual }: OgImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          padding: "64px 72px",
          background: COLORS.bg,
          fontFamily: "Inter",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO_SRC} width={LOGO_WIDTH} height={LOGO_HEIGHT} alt="" />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 640, flexShrink: 0 }}>
            {variant === "solution" ? (
              <span style={{ display: "flex", fontSize: 28, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: COLORS.accent }}>
                {eyebrow}
              </span>
            ) : null}
            <h1 style={{ margin: 0, display: "flex", fontSize: 84, lineHeight: 1.04, fontWeight: 600, letterSpacing: "-0.03em", color: COLORS.headline }}>
              {title}
            </h1>
          </div>
          {visual === "merge" ? <MergeVisual /> : <RowsVisual />}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ display: "flex", fontSize: 36, fontWeight: 500, color: COLORS.secondary }}>{bottomLine}</span>
          <span style={{ display: "flex", fontSize: 28, fontWeight: 500, color: COLORS.accent }}>pearstop.com</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Inter", data: interMedium, weight: 500, style: "normal" },
        { name: "Inter", data: interSemiBold, weight: 600, style: "normal" },
      ],
    }
  );
}
