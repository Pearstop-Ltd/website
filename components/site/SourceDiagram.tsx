import type { ReactNode } from "react";
import { dsRoot } from "./tokens";
import { PearstopLogo } from "./internal/PearstopLogo";
import styles from "./SourceDiagram.module.css";

export interface SourceDiagramProps {
  inputs: ReactNode[];
  /** Lines shown inside the blue "pearstop." box, e.g. numbered steps. */
  processLines: ReactNode[];
  outputs: Array<{ label: ReactNode; tint: "blue" | "purple" | "green" }>;
  className?: string;
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg width="36" height="12" viewBox="0 0 36 12" fill="none" aria-hidden="true" className={className}>
      <path d="M0 6 H30" stroke="var(--navy)" strokeWidth="1.6" />
      <path d="M28 1 L35 6 L28 11 Z" fill="var(--navy)" />
    </svg>
  );
}

/** input boxes -> arrow -> blue "pearstop." process box -> arrow -> tinted
 * output boxes. Never four separate arrows into the box (DESIGN.md rule).
 * Below 768px the layout becomes vertical: inputs, process box, outputs. */
export function SourceDiagram({ inputs, processLines, outputs, className }: SourceDiagramProps) {
  return (
    <div className={dsRoot(styles.root, className)}>
      <div className={styles.stack}>
        {inputs.map((item, i) => (
          <div className={styles.inputBox} key={i}>
            {item}
          </div>
        ))}
      </div>

      <Arrow className={styles.arrow} />

      <div className={styles.processBox}>
        <PearstopLogo height={19} />
        <div className={styles.processLines}>
          {processLines.map((line, i) => (
            <span key={i}>{processLines.length > 1 ? `${i + 1} · ` : ""}{line}</span>
          ))}
        </div>
      </div>

      <Arrow className={styles.arrow} />

      <div className={styles.outputStack}>
        {outputs.map((output, i) => (
          <div className={dsRoot(styles.outputBox, styles[`tint-${output.tint}`])} key={i}>
            {output.label}
          </div>
        ))}
      </div>
    </div>
  );
}
