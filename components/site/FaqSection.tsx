import type { ReactNode } from "react";
import { Section } from "./internal/Section";
import { SectionHeader } from "./SectionHeader";
import { Faq, type FaqItem } from "./Faq";
import styles from "./FaqSection.module.css";

export interface FaqSectionProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  items: FaqItem[];
  background?: "white" | "soft";
  className?: string;
  /** See Faq's `defaultOpenIndex` — which item (if any) starts expanded. */
  defaultOpenIndex?: number;
}

/** FAQ section matching SolutionPage's "faq" section type exactly (eyebrow +
 * H2 + two-column grid with the accordion) — for pages that render a FAQ
 * outside the SolutionPage template. */
export function FaqSection({ eyebrow, title, items, background = "soft", className, defaultOpenIndex }: FaqSectionProps) {
  return (
    <Section background={background} className={className}>
      <div className={styles.faqGrid}>
        <SectionHeader eyebrow={eyebrow} title={title} />
        <Faq items={items} defaultOpenIndex={defaultOpenIndex} />
      </div>
    </Section>
  );
}
