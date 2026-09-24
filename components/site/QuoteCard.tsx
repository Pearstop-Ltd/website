import type { ReactNode } from "react";
import { dsRoot } from "./tokens";
import styles from "./QuoteCard.module.css";

export interface QuoteCardProps {
  quote: ReactNode;
  name: ReactNode;
  role: ReactNode;
  /** Initials shown in the avatar circle, e.g. "BP". */
  initials: string;
  variant?: "panel" | "inline";
  className?: string;
}

const QuoteMark = () => (
  <svg width="36" height="28" viewBox="0 0 36 28" fill="none" aria-hidden="true">
    <path
      d="M0 28 V16 C0 7 5 1.5 14 0 L15.5 4 C10 5.5 7.5 9 7.5 13 H14 V28 Z M21 28 V16 C21 7 26 1.5 35 0 L36 4 C31 5.5 28.5 9 28.5 13 H35 V28 Z"
      fill="var(--purple)"
    />
  </svg>
);

/** panel: navy background, purple quote mark, large white quote (case study
 * pull-quotes). inline: bordered row with a circular initials avatar. */
export function QuoteCard({ quote, name, role, initials, variant = "panel", className }: QuoteCardProps) {
  if (variant === "inline") {
    return (
      <figure className={dsRoot(styles.inlineRoot, className)}>
        <span className={styles.inlineAvatar}>{initials}</span>
        <div className={styles.inlineBody}>
          <blockquote className={styles.inlineQuote}>&ldquo;{quote}&rdquo;</blockquote>
          <figcaption className={styles.inlineCaption}>
            <strong className={styles.inlineName}>{name}</strong> · {role}
          </figcaption>
        </div>
      </figure>
    );
  }

  return (
    <figure className={dsRoot(styles.panelRoot, className)}>
      <QuoteMark />
      <blockquote className={styles.panelQuote}>{quote}</blockquote>
      <figcaption className={styles.panelCaption}>
        <span className={styles.panelAvatar}>{initials}</span>
        <span className={styles.panelPerson}>
          <strong className={styles.panelName}>{name}</strong>
          <span className={styles.panelRole}>{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
