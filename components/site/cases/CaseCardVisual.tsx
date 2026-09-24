import { dsRoot } from "../tokens";
import type { CaseVisualVariant } from "@/lib/cases";
import styles from "./CaseCardVisual.module.css";

export interface CaseCardVisualProps {
  variant: CaseVisualVariant;
  className?: string;
}

function Arrow({ color = "var(--navy)" }: { color?: string }) {
  return (
    <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true" className={styles.noShrink}>
      <path d="M0 6 H16" stroke={color} strokeWidth="1.6" />
      <path d="M15 1 L21 6 L15 11 Z" fill={color} />
    </svg>
  );
}

function Brace() {
  return (
    <svg width="30" height="230" viewBox="0 0 30 230" fill="none" aria-hidden="true" className={styles.noShrink}>
      <path
        d="M2 2 Q14 2 14 22 L14 100 Q14 115 28 115 Q14 115 14 130 L14 208 Q14 228 2 228"
        stroke="var(--navy)"
        strokeWidth="1.6"
      />
    </svg>
  );
}

const SUPPLIER_VARIANTS = ["NORDPUMP", "Nordpump B.V.", "Nordpmp", "NORDPUMP NL", "Nordpump Pompen"];

const PRICE_DOTS: Array<{ left: number; tint: "blue" | "purple" }> = [
  { left: 0, tint: "blue" },
  { left: 14, tint: "blue" },
  { left: 30, tint: "blue" },
  { left: 38, tint: "blue" },
  { left: 47, tint: "blue" },
  { left: 58, tint: "blue" },
  { left: 66, tint: "blue" },
  { left: 88, tint: "purple" },
  { left: 95, tint: "purple" },
];

const KEPT_TILES = [7, 13, 22];

function renderVariant(variant: CaseVisualVariant) {
  switch (variant) {
    case "supplierMerge":
      return (
        <div className={styles.merge}>
          <div className={styles.mergeCol}>
            <span className={styles.mergeLabel}>As it arrived</span>
            {SUPPLIER_VARIANTS.map((name) => (
              <span className={styles.mergePill} key={name}>
                {name}
              </span>
            ))}
          </div>
          <Brace />
          <Arrow />
          <div className={styles.mergeOutCol}>
            <span className={styles.mergeLabelGreen}>Canonical supplier</span>
            <span className={styles.mergeResult}>Nordpump</span>
            <span className={styles.mergeCaption}>Names changed. Same shape as the real register.</span>
          </div>
        </div>
      );
    case "taxonomyBars":
      return (
        <div className={styles.taxonomy}>
          <div className={styles.taxonomyBar} style={{ width: "100%", background: "var(--navy)" }} />
          <div className={styles.taxonomyBar} style={{ width: "80%", background: "var(--blue)" }} />
          <div className={styles.taxonomyBar} style={{ width: "60%", background: "var(--light-blue)" }} />
          <div className={styles.taxonomyBar} style={{ width: "40%", background: "var(--purple)" }} />
          <span className={styles.taxonomyCaption}>Segment → Family → Class → Commodity</span>
        </div>
      );
    case "marginBars":
      return (
        <div className={styles.margin}>
          <div className={styles.marginGrid}>
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className={dsRoot(styles.marginCell, i === 2 ? styles.marginCellActive : undefined)} />
            ))}
          </div>
          <span className={styles.marginCaption}>Margin estimate before each container is bought</span>
        </div>
      );
    case "accuracyBars":
      return (
        <div className={styles.accuracy}>
          <div className={styles.accuracyRow}>
            <span className={styles.accuracyRowLabel}>Before</span>
            <div className={styles.accuracyTrack}>
              <div className={styles.accuracyFill} style={{ width: "70%", background: "var(--light-blue)" }} />
            </div>
          </div>
          <div className={styles.accuracyRow}>
            <span className={styles.accuracyRowLabel}>After</span>
            <div className={styles.accuracyTrack}>
              <div className={styles.accuracyFill} style={{ width: "99%", background: "var(--green)" }} />
            </div>
          </div>
          <span className={styles.accuracyCaption}>Invoice extraction accuracy</span>
        </div>
      );
    case "docToDoc":
      return (
        <div className={styles.docToDoc}>
          <div className={styles.docMessy}>
            <div className={styles.docMessyLine} style={{ width: "90%", transform: "rotate(-3deg)" }} />
            <div className={styles.docMessyLine} style={{ width: "60%", transform: "rotate(2deg)" }} />
            <div className={styles.docMessyLine} style={{ width: "80%", transform: "rotate(-1deg)" }} />
            <div className={styles.docMessyLine} style={{ width: "50%", transform: "rotate(4deg)" }} />
          </div>
          <Arrow />
          <div className={styles.docClean}>
            <div className={dsRoot(styles.docCleanLine, styles.docCleanLineStrong)} style={{ width: "100%" }} />
            <div className={dsRoot(styles.docCleanLine, styles.docCleanLineSoft)} style={{ width: "100%" }} />
            <div className={dsRoot(styles.docCleanLine, styles.docCleanLineSoft)} style={{ width: "100%" }} />
            <div className={dsRoot(styles.docCleanLine, styles.docCleanLineSoft)} style={{ width: "70%" }} />
          </div>
        </div>
      );
    case "priceSpread":
      return (
        <div className={styles.priceSpread}>
          <div className={styles.priceTrack}>
            <div className={styles.priceLine} />
            {PRICE_DOTS.map((dot, i) => (
              <span
                key={i}
                className={styles.priceDot}
                style={{ left: `${dot.left}%`, background: dot.tint === "purple" ? "var(--purple)" : "var(--blue)" }}
              />
            ))}
          </div>
          <div className={styles.priceLabels}>
            <span>£36.75</span>
            <span>£53.40</span>
          </div>
        </div>
      );
    case "supplierTiles":
      return (
        <div className={styles.supplierTiles}>
          <div className={styles.tileGrid}>
            {Array.from({ length: 30 }, (_, i) => (
              <div key={i} className={dsRoot(styles.tile, KEPT_TILES.includes(i) ? styles.tileKeep : undefined)} />
            ))}
          </div>
        </div>
      );
    case "partNumber":
      return (
        <div className={styles.partNumber}>
          <div className={styles.partRow}>
            <span className={styles.partOld}>RS-448120</span>
            <Arrow />
            <span className={styles.partNew}>MFR 6205-2RS</span>
          </div>
          <span className={styles.partCaption}>Checked against manufacturer data</span>
        </div>
      );
    default:
      return null;
  }
}

/** Bespoke per-case mini illustrations for the /cases index — mirrors
 * design/refs/cases-index.dc.html. CSS/SVG only, no images. */
export function CaseCardVisual({ variant, className }: CaseCardVisualProps) {
  return <div className={dsRoot(styles.root, className)}>{renderVariant(variant)}</div>;
}
