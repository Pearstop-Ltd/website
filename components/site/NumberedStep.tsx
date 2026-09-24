import type { ReactNode } from "react";
import { dsRoot } from "./tokens";
import styles from "./NumberedStep.module.css";

export interface NumberedStepProps {
  number: number;
  title: ReactNode;
  body: ReactNode;
  className?: string;
}

export function NumberedStep({ number, title, body, className }: NumberedStepProps) {
  return (
    <div className={dsRoot(styles.root, className)}>
      <span className={styles.badge}>{number}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.body}>{body}</p>
    </div>
  );
}
