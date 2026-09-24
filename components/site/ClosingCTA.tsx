import type { ReactNode } from "react";
import Link from "next/link";
import { dsRoot } from "./tokens";
import { PearstopMark } from "./internal/PearstopMark";
import styles from "./ClosingCTA.module.css";

export interface ClosingCTAProps {
  title: ReactNode;
  body: ReactNode;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** e.g. "© 2026 Pearstop · Privacy · Terms" */
  footerLine: ReactNode;
  className?: string;
}

/** navy-deep full-width block: white H2, tint-blue body, white primary
 * button + purple text link, footer line with wordmark + copyright. */
export function ClosingCTA({
  title,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
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
          <Link href={primaryHref} className={styles.primary}>
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref ? (
            <Link href={secondaryHref} className={styles.secondary}>
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
      <div className={styles.footer}>
        <PearstopMark color="#ffffff" size={16} wordmarkSize={18} />
        <span className={styles.footerLine}>{footerLine}</span>
      </div>
    </div>
  );
}
