import { dsRoot } from "../tokens";
import styles from "./DotList.module.css";

export function DotList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={dsRoot(styles.root, className)}>
      {items.map((item) => (
        <li className={styles.item} key={item}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.text}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
