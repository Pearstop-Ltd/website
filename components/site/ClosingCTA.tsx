import type { ReactNode } from "react";
import Link from "next/link";
import { dsRoot } from "./tokens";
import { PearstopLogo } from "./internal/PearstopLogo";
import styles from "./ClosingCTA.module.css";

export interface ClosingCTAProps {
  title: ReactNode;
  body: ReactNode;
  primaryLabel: string;
  primaryHref?: string;
  /** Render prop for a non-link primary action (e.g. a modal trigger like
   * SampleRequestModal) instead of a plain link. Receives the primary
   * button's className so the action matches the standard button styling.
   * Takes precedence over primaryHref when both are set. */
  primaryAction?: (className: string) => ReactNode;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryAction?: (className: string) => ReactNode;
  /** e.g. "© 2026 Pearstop · Privacy · Terms". Omit to render the block
   * without the wordmark/copyright footer row. */
  footerLine?: ReactNode;
  className?: string;
}

/** navy-deep full-width block: white H2, tint-blue body, white primary
 * button + purple text link, footer line with wordmark + copyright. */
export function ClosingCTA({
  title,
  body,
  primaryLabel,
  primaryHref,
  primaryAction,
  secondaryLabel,
  secondaryHref,
  secondaryAction,
  footerLine,
  className,
}: ClosingCTAProps) {
  return (
    <div className={dsRoot(styles.root, className)}>
      <div className={styles.top}>
        <div className={styles.copy}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.body}>{body}</p>
        </div>
        <div className={styles.actions}>
          {primaryAction ? (
            primaryAction(styles.primary)
          ) : (
            <Link href={primaryHref!} className={styles.primary}>
              {primaryLabel}
            </Link>
          )}
          {secondaryAction
            ? secondaryAction(styles.secondary)
            : secondaryLabel && secondaryHref ? (
                <Link href={secondaryHref} className={styles.secondary}>
                  {secondaryLabel}
                </Link>
              ) : null}
        </div>
      </div>
      {footerLine ? (
        <div className={styles.footer}>
          <PearstopLogo height={20} />
          <span className={styles.footerLine}>{footerLine}</span>
        </div>
      ) : null}
    </div>
  );
}
