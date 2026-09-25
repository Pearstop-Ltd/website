import type { CSSProperties, ReactNode } from "react";
import { dsRoot } from "../tokens";
import styles from "./Section.module.css";

interface SectionProps {
  background?: "white" | "soft" | "navy-deep" | "purple";
  /** Overrides the default var(--section-pad) top/bottom padding. */
  paddingTop?: number;
  paddingBottom?: number;
  id?: string;
  className?: string;
  /** Use the page's own `.container` width (min(1140px, 100% - 48px)),
   * centered, instead of the design system's 160px side inset. For a
   * Section dropped into a page that still uses the legacy `.container`
   * class everywhere else (e.g. the homepage), so it lines up with the
   * rest of that page instead of running wider. */
  contained?: boolean;
  children: ReactNode;
}

/** Shared section shell: alternating white/soft background, side inset that
 * collapses to 20px below 768px, default vertical rhythm. */
export function Section({ background = "white", paddingTop, paddingBottom, id, className, contained, children }: SectionProps) {
  const style: CSSProperties = {
    background:
      background === "soft"
        ? "var(--bg-soft)"
        : background === "navy-deep"
          ? "var(--navy-deep)"
          : background === "purple"
            ? "var(--purple-soft)"
            : "#ffffff",
    paddingTop: paddingTop !== undefined ? paddingTop : "var(--section-pad)",
    paddingBottom: paddingBottom !== undefined ? paddingBottom : "var(--section-pad)",
  };
  return (
    <section id={id} className={dsRoot(contained ? undefined : styles.root, className)} style={style}>
      {contained ? <div className={styles.contained}>{children}</div> : children}
    </section>
  );
}
