import { dsRoot } from "./tokens";
import styles from "./HeadlineAccent.module.css";

export interface HeadlineAccentProps {
  /** "light" (default) = blue bar, for the H1 on a white/soft background.
   * "dark" = pale-blue bar, for an H1 on a navy background. */
  tone?: "light" | "dark";
  className?: string;
}

/** Decorative dash rendered directly under every page H1 in a template
 * hero: 72x4px, 2px radius, aria-hidden. See DESIGN.md "Headline accent". */
export function HeadlineAccent({ tone = "light", className }: HeadlineAccentProps) {
  return <span aria-hidden="true" className={dsRoot(styles.root, tone === "dark" ? styles.dark : undefined, className)} />;
}
