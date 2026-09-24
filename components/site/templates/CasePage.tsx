import type { ReactNode } from "react";
import { dsRoot } from "../tokens";
import { Section } from "../internal/Section";
import { Breadcrumb } from "../internal/Breadcrumb";
import { SectionHeader } from "../SectionHeader";
import { StatBand, type StatBandItem } from "../StatBand";
import { SourceDiagram, type SourceDiagramProps } from "../SourceDiagram";
import { NumberedStep, type NumberedStepProps } from "../NumberedStep";
import { DataTable, type DataTableProps } from "../DataTable";
import { QuoteCard, type QuoteCardProps } from "../QuoteCard";
import { Card, type CardProps } from "../Card";
import { CaseCard, type CaseCardProps } from "../CaseCard";
import { ClosingCTA, type ClosingCTAProps } from "../ClosingCTA";
import styles from "./CasePage.module.css";

export interface CasePageHero {
  breadcrumbParentLabel: string;
  breadcrumbParentHref: string;
  breadcrumbCurrent: string;
  badgeLabel: ReactNode;
  metaLine?: ReactNode;
  /** The page's single H1. */
  title: ReactNode;
  lead: ReactNode;
  /** Bespoke per-case illustration (fact sheet aside, supplier tile grid,
   * etc.) — not a reusable component, so it's a slot. */
  visual?: ReactNode;
  /** Purple-tint "Illustrative data..." strip — pattern cases only. */
  disclaimer?: ReactNode;
}

export type CaseSection =
  | { type: "statBand"; key?: string; stats: StatBandItem[]; background?: "white" | "soft" }
  | {
      type: "twoColumn";
      key?: string;
      eyebrow: ReactNode;
      title: ReactNode;
      body: ReactNode;
      sidebar?: ReactNode;
      background?: "white" | "soft";
    }
  | {
      type: "diagram";
      key?: string;
      eyebrow: ReactNode;
      title: ReactNode;
      lead?: ReactNode;
      diagram: SourceDiagramProps;
      steps?: NumberedStepProps[];
      background?: "white" | "soft";
    }
  | {
      type: "table";
      key?: string;
      eyebrow: ReactNode;
      title: ReactNode;
      lead?: ReactNode;
      table: DataTableProps;
      background?: "white" | "soft";
    }
  | {
      type: "confidence";
      key?: string;
      eyebrow: ReactNode;
      title: ReactNode;
      body: ReactNode;
      bar: ReactNode;
      quote: QuoteCardProps;
      background?: "white" | "soft";
    }
  | { type: "twoCards"; key?: string; left: CardProps; right: CardProps; background?: "white" | "soft" }
  | { type: "quote"; key?: string; quote: QuoteCardProps; background?: "white" | "soft" }
  | { type: "relatedCases"; key?: string; title: ReactNode; cases: CaseCardProps[]; background?: "white" | "soft" }
  | { type: "custom"; key: string; node: ReactNode };

export interface CasePageProps {
  /** "client" = named work, real data. "pattern" = illustrative data. */
  variant: "client" | "pattern";
  hero: CasePageHero;
  /** Ordered — mix named sections and fully custom ReactNode sections in
   * any order. Case studies vary enough that this is first-class, not an
   * afterthought: every section between the hero and the closing CTA comes
   * from this single ordered list. */
  sections: CaseSection[];
  closingCTA: ClosingCTAProps;
  className?: string;
}

function renderSection(section: CaseSection) {
  switch (section.type) {
    case "statBand":
      return (
        <Section key={section.key ?? "statBand"} background={section.background} paddingTop={0}>
          <StatBand stats={section.stats} />
        </Section>
      );
    case "twoColumn":
      return (
        <Section key={section.key ?? "twoColumn"} background={section.background}>
          <div className={styles.twoColumn}>
            <div className={styles.twoColumnMain}>
              <SectionHeader eyebrow={section.eyebrow} title={section.title} />
              <div className={styles.body}>{section.body}</div>
            </div>
            {section.sidebar ? <div className={styles.sidebar}>{section.sidebar}</div> : null}
          </div>
        </Section>
      );
    case "diagram":
      return (
        <Section key={section.key ?? "diagram"} background={section.background}>
          <div className={styles.stack}>
            <SectionHeader eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
            <SourceDiagram {...section.diagram} />
            {section.steps ? (
              <div className={styles.stepsGrid}>
                {section.steps.map((step, i) => (
                  <NumberedStep {...step} key={i} />
                ))}
              </div>
            ) : null}
          </div>
        </Section>
      );
    case "table":
      return (
        <Section key={section.key ?? "table"} background={section.background}>
          <div className={styles.stack}>
            <SectionHeader eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
            <DataTable {...section.table} />
          </div>
        </Section>
      );
    case "confidence":
      return (
        <Section key={section.key ?? "confidence"} background={section.background}>
          <div className={styles.confidence}>
            <div className={styles.confidenceMain}>
              <SectionHeader eyebrow={section.eyebrow} title={section.title} />
              <div className={styles.body}>{section.body}</div>
              {section.bar}
            </div>
            <QuoteCard {...section.quote} variant="panel" />
          </div>
        </Section>
      );
    case "twoCards":
      return (
        <Section key={section.key ?? "twoCards"} background={section.background}>
          <div className={styles.twoCards}>
            <Card {...section.left} />
            <Card {...section.right} />
          </div>
        </Section>
      );
    case "quote":
      return (
        <Section key={section.key ?? "quote"} background={section.background}>
          <QuoteCard {...section.quote} variant="inline" />
        </Section>
      );
    case "relatedCases":
      return (
        <Section key={section.key ?? "relatedCases"} background={section.background ?? "soft"}>
          <div className={styles.stack}>
            <h2 className={styles.relatedTitle}>{section.title}</h2>
            <div className={styles.relatedGrid}>
              {section.cases.map((card, i) => (
                <CaseCard {...card} key={i} />
              ))}
            </div>
          </div>
        </Section>
      );
    case "custom":
      return <div key={section.key}>{section.node}</div>;
    default:
      return null;
  }
}

export function CasePage({ variant, hero, sections, closingCTA, className }: CasePageProps) {
  return (
    <div className={dsRoot(styles.root, className)}>
      <Section background="white">
        <div className={styles.hero}>
          <Breadcrumb
            parentLabel={hero.breadcrumbParentLabel}
            parentHref={hero.breadcrumbParentHref}
            currentLabel={hero.breadcrumbCurrent}
          />
          <div className={styles.heroGrid}>
            <div className={styles.heroMain}>
              <div className={styles.heroMeta}>
                <span className={dsRoot(styles.badge, variant === "pattern" ? styles.badgePattern : styles.badgeClient)}>
                  {hero.badgeLabel}
                </span>
                {hero.metaLine ? <span className={styles.metaLine}>{hero.metaLine}</span> : null}
              </div>
              <h1 className={styles.title}>{hero.title}</h1>
              <p className={styles.lead}>{hero.lead}</p>
            </div>
            {hero.visual ? <div className={styles.heroVisual}>{hero.visual}</div> : null}
          </div>
        </div>
      </Section>

      {hero.disclaimer ? (
        <div className={styles.disclaimer}>
          <strong>Illustrative data.</strong> {hero.disclaimer}
        </div>
      ) : null}

      {sections.map(renderSection)}

      <ClosingCTA {...closingCTA} />
    </div>
  );
}
