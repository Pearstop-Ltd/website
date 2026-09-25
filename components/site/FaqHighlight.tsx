import type { ReactNode } from "react";
import { Section } from "./internal/Section";
import styles from "./FaqHighlight.module.css";

export interface FaqHighlightProps {
  eyebrow: ReactNode;
  question: ReactNode;
  answer: ReactNode;
  background?: "white" | "soft";
  className?: string;
}

/** Single-question highlight — a centered eyebrow + H2 question + answer,
 * for a page's "the question we get most" style callout. Distinct from the
 * full accordion in FaqSection, which it sits alongside on some pages. */
export function FaqHighlight({ eyebrow, question, answer, background = "white", className }: FaqHighlightProps) {
  return (
    <Section background={background} className={className}>
      <div className={styles.card}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.question}>{question}</h2>
        <p className={styles.answer}>{answer}</p>
      </div>
    </Section>
  );
}
