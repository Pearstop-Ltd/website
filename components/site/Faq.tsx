import type { ReactNode } from "react";
import { dsRoot } from "./tokens";
import styles from "./Faq.module.css";

export interface FaqItem {
  q: ReactNode;
  a: ReactNode;
}

export interface FaqProps {
  items: FaqItem[];
  className?: string;
  /** Index of the item to render already expanded (native `open` attribute
   * on its <details>). Omit for all items collapsed, the default. */
  defaultOpenIndex?: number;
}

/** Accordion look from the refs, built on native <details>/<summary> so
 * every answer is present in the HTML even when closed — crawlers and
 * answer engines can read it, nothing is click-to-mount. */
export function Faq({ items, className, defaultOpenIndex }: FaqProps) {
  return (
    <div className={dsRoot(styles.root, className)}>
      {items.map((item, i) => (
        <details className={styles.item} key={i} open={i === defaultOpenIndex}>
          <summary className={styles.question}>
            <span>{item.q}</span>
            <span className={styles.sign} aria-hidden="true" />
          </summary>
          <p className={styles.answer}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
