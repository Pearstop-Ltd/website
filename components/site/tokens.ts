import styles from "./tokens.module.css";

/** Applies the scoped DESIGN.md token set. Safe to call on every top-level
 * components/site/* export, since CSS custom properties inherit down the
 * DOM regardless of how many nested elements also carry the class. */
export function dsRoot(...extra: Array<string | undefined | false>): string {
  return [styles.root, ...extra].filter(Boolean).join(" ");
}
