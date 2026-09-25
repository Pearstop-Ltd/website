import styles from "./HeroTransform.module.css";

export interface HierarchyLevel {
  level: string;
  code: string;
  name: string;
  bg: string;
  fg: string;
}

export interface BeforeAfterRow {
  raw: string;
  clean: string;
  unit: string;
}

export interface NameVariant {
  name: string;
  source: string;
}

export type HeroTransformInput =
  | { variant: "rawLine"; label: string; value: string }
  | { variant: "nameList"; items: NameVariant[] };

export type HeroTransformOutput =
  | { variant: "hierarchy"; levels: HierarchyLevel[]; matchLabel: string }
  | { variant: "table"; columns: [string, string, string]; rows: BeforeAfterRow[] }
  | { variant: "merge"; supplierLabel: string; supplierName: string; mergedChip: string; matchedOn: string[] };

function Arrow() {
  return (
    <svg width="32" height="12" viewBox="0 0 32 12" fill="none" aria-hidden="true" className={styles.arrow}>
      <path d="M0 6 H26" stroke="var(--navy)" strokeWidth="1.6" />
      <path d="M24 1 L31 6 L24 11 Z" fill="var(--navy)" />
    </svg>
  );
}

function Elbow({ opacity }: { opacity: number }) {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true" className={styles.hierarchyElbow} style={{ opacity }}>
      <path d="M1 0 V7 H11" stroke="#C9CDD8" strokeWidth="1.4" />
    </svg>
  );
}

function MiniArrow() {
  return (
    <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true" className={styles.beforeAfterMiniArrow}>
      <path d="M0 5 H13" stroke="var(--blue)" strokeWidth="1.5" />
      <path d="M12 1 L17 5 L12 9 Z" fill="var(--blue)" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12 L10 18 L20 6" />
    </svg>
  );
}

function renderInput(input: HeroTransformInput) {
  if (input.variant === "rawLine") {
    return (
      <div className={styles.rawLineCard}>
        <span className={styles.rawLineLabel}>{input.label}</span>
        <span className={styles.rawLineValue}>{input.value}</span>
      </div>
    );
  }
  return (
    <div className={styles.nameList}>
      {input.items.map((item, i) => (
        <div className={styles.nameCard} key={i}>
          <span className={styles.nameCardName}>{item.name}</span>
          <span className={styles.nameCardSource}>{item.source}</span>
        </div>
      ))}
    </div>
  );
}

function renderOutput(output: HeroTransformOutput) {
  if (output.variant === "hierarchy") {
    return (
      <div className={styles.hierarchy}>
        {output.levels.map((level, i) => (
          <div className={styles.hierarchyLevel} key={i}>
            <Elbow opacity={i === 0 ? 0 : 1} />
            <div className={styles.hierarchyBox} style={{ background: level.bg, color: level.fg }}>
              <span className={styles.hierarchyMeta}>
                {level.level} · {level.code}
              </span>
              <span className={styles.hierarchyName}>{level.name}</span>
            </div>
          </div>
        ))}
        <span className={styles.hierarchyMatch}>{output.matchLabel}</span>
      </div>
    );
  }
  if (output.variant === "table") {
    return (
      <div className={styles.beforeAfterTable}>
        <div className={styles.beforeAfterHeader}>
          <span>{output.columns[0]}</span>
          <span />
          <span>{output.columns[1]}</span>
          <span>{output.columns[2]}</span>
        </div>
        {output.rows.map((row, i) => (
          <div className={styles.beforeAfterRow} key={i}>
            <span className={styles.beforeAfterRaw}>{row.raw}</span>
            <MiniArrow />
            <span className={styles.beforeAfterClean}>{row.clean}</span>
            <span className={styles.beforeAfterUnit}>{row.unit}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={styles.mergeResult}>
      <div className={styles.mergeHeader}>
        <span className={styles.mergeHeaderLabel}>{output.supplierLabel}</span>
        <span className={styles.mergeHeaderName}>{output.supplierName}</span>
      </div>
      <div className={styles.mergeBody}>
        <span className={styles.mergeChip}>{output.mergedChip}</span>
        {output.matchedOn.map((item, i) => (
          <span className={styles.mergeMatch} key={i}>
            <CheckIcon />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Hero visual: input card(s) on the left, an arrow, an output panel on the
 * right — the shared shape behind every solution page's hero visual (see
 * design/refs/hero-visuals.dc.html items 02, 03 and 05). The doc-to-rows
 * variant (item 01) is /invoice-data-extraction's own bespoke component. */
export function HeroTransform({ input, output }: { input: HeroTransformInput; output: HeroTransformOutput }) {
  return (
    <div className={styles.root}>
      {renderInput(input)}
      <Arrow />
      {renderOutput(output)}
    </div>
  );
}
