import type { CSSProperties, ReactNode } from "react";
import { dsRoot } from "../tokens";
import styles from "./Section.module.css";

interface SectionProps {
  background?: "white" | "soft" | "navy-deep";
  /** Overrides the default var(--section-pad) top/bottom padding. */
  paddingTop?: number;
  paddingBottom?: number;
  className?: string;
  children: ReactNode;
}

/** Shared section shell: alternating white/soft background, side inset that
 * collapses to 20px below 768px, default vertical rhythm. */
export function Section({ background = "white", paddingTop, paddingBottom, className, children }: SectionProps) {
  const style: CSSProperties = {
    background:
      background === "soft" ? "var(--bg-soft)" : background === "navy-deep" ? "var(--navy-deep)" : "#ffffff",
    paddingTop: paddingTop !== undefined ? paddingTop : "var(--section-pad)",
    paddingBottom: paddingBottom !== undefined ? paddingBottom : "var(--section-pad)",
  };
  return (
    <section className={dsRoot(styles.root, className)} style={style}>
      {children}
    </section>
  );
}
