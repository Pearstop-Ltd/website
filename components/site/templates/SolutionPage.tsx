import type { ReactNode } from "react";
import Script from "next/script";
import { dsRoot } from "../tokens";
import { Section } from "../internal/Section";
import { SectionHeader } from "../SectionHeader";
import { StatBand, type StatBandItem } from "../StatBand";
import { Card, type CardProps } from "../Card";
import { SourceDiagram, type SourceDiagramProps } from "../SourceDiagram";
import { NumberedStep, type NumberedStepProps } from "../NumberedStep";
import { DataTable, type DataTableProps } from "../DataTable";
import { QuoteCard, type QuoteCardProps } from "../QuoteCard";
import { Faq, type FaqItem } from "../Faq";
import { ClosingCTA, type ClosingCTAProps } from "../ClosingCTA";
import { HeadlineAccent } from "../HeadlineAccent";
import styles from "./SolutionPage.module.css";

export interface SolutionPageHero {
  eyebrow: ReactNode;
  /** The page's single H1. */
  title: ReactNode;
  lead: ReactNode;
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
  visual?: ReactNode;
}

export type SolutionSection =
  | { type: "statBand"; key?: string; stats: StatBandItem[]; background?: "white" | "soft" }
  | {
      type: "problem";
      key?: string;
      eyebrow: ReactNode;
      title: ReactNode;
      body: ReactNode;
      quote?: QuoteCardProps;
      background?: "white" | "soft";
    }
  | { type: "painCards"; key?: string; title?: ReactNode; cards: CardProps[]; background?: "white" | "soft" }
  | {
      type: "diagram";
      key?: string;
      eyebrow: ReactNode;
      title: ReactNode;
      lead?: ReactNode;
      diagram: SourceDiagramProps;
      steps?: NumberedStepProps[];
      background?: "white" | "soft";
      anchorId?: string;
    }
  | {
      type: "table";
      key?: string;
      eyebrow: ReactNode;
      title: ReactNode;
      lead?: ReactNode;
      table: DataTableProps;
      caption?: ReactNode;
      background?: "white" | "soft";
    }
  | { type: "outcomeCards"; key?: string; eyebrow?: ReactNode; title: ReactNode; cards: CardProps[]; background?: "white" | "soft" }
  | { type: "quote"; key?: string; quote: QuoteCardProps; background?: "white" | "soft" }
  | { type: "definition"; key?: string; title: ReactNode; body: ReactNode; background?: "white" | "soft" }
  | { type: "faq"; key?: string; eyebrow?: ReactNode; title: ReactNode; items: FaqItem[]; background?: "white" | "soft" }
  | { type: "custom"; key: string; node: ReactNode };

export interface SolutionPageProps {
  hero: SolutionPageHero;
  /** Ordered — every section between the hero and the closing CTA. */
  sections: SolutionSection[];
  closingCTA: ClosingCTAProps;
  /** Set to false when the page route already renders its own FAQPage
   * JSON-LD (e.g. to keep a pre-existing schema byte-for-byte during a
   * migration) — otherwise this would double-emit FAQPage schema. Defaults
   * to true. */
  emitFaqSchema?: boolean;
  className?: string;
}

function faqTextOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  return "";
}

function renderSection(section: SolutionSection) {
  switch (section.type) {
    case "statBand":
      return (
        <Section key={section.key ?? "statBand"} background={section.background} paddingTop={0}>
          <StatBand stats={section.stats} />
        </Section>
      );
    case "problem":
      return (
        <Section key={section.key ?? "problem"} background={section.background ?? "soft"}>
          <div className={styles.stack}>
            <div className={styles.problemGrid}>
              <SectionHeader eyebrow={section.eyebrow} title={section.title} />
              {section.quote ? <QuoteCard {...section.quote} variant="panel" /> : null}
            </div>
            <div className={styles.body}>{section.body}</div>
          </div>
        </Section>
      );
    case "painCards":
      return (
        <Section key={section.key ?? "painCards"} background={section.background}>
          <div className={styles.stack}>
            {section.title ? <h2 className={styles.plainTitle}>{section.title}</h2> : null}
            <div className={styles.cardsGrid4}>
              {section.cards.map((card, i) => (
                <Card {...card} key={i} />
              ))}
            </div>
          </div>
        </Section>
      );
    case "diagram":
      return (
        <Section key={section.key ?? "diagram"} background={section.background}>
          <div id={section.anchorId} className={styles.stack}>
            <SectionHeader eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
            <SourceDiagram {...section.diagram} />
            {section.steps ? (
              <div className={styles.cardsGrid3}>
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
            <div className={styles.tableHeaderRow}>
              <SectionHeader eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
              {section.caption ? <span className={styles.caption}>{section.caption}</span> : null}
            </div>
            <DataTable {...section.table} />
          </div>
        </Section>
      );
    case "outcomeCards":
      return (
        <Section key={section.key ?? "outcomeCards"} background={section.background}>
          <div className={styles.stack}>
            <SectionHeader eyebrow={section.eyebrow} title={section.title} />
            <div className={styles.cardsGrid3}>
              {section.cards.map((card, i) => (
                <Card {...card} key={i} />
              ))}
            </div>
          </div>
        </Section>
      );
    case "quote":
      return (
        <Section key={section.key ?? "quote"} background={section.background}>
          <QuoteCard {...section.quote} variant="inline" />
        </Section>
      );
    case "definition":
      return (
        <Section key={section.key ?? "definition"} background={section.background}>
          <SectionHeader title={section.title} lead={section.body} />
        </Section>
      );
    case "faq":
      return (
        <Section key={section.key ?? "faq"} background={section.background ?? "soft"}>
          <div className={styles.faqGrid}>
            <SectionHeader eyebrow={section.eyebrow} title={section.title} />
            <Faq items={section.items} />
          </div>
        </Section>
      );
    case "custom":
      return <div key={section.key}>{section.node}</div>;
    default:
      return null;
  }
}

export function SolutionPage({ hero, sections, closingCTA, emitFaqSchema = true, className }: SolutionPageProps) {
  const faqItems = sections.filter((s): s is Extract<SolutionSection, { type: "faq" }> => s.type === "faq").flatMap((s) => s.items);

  const faqSchema =
    emitFaqSchema && faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: faqTextOf(item.q),
            acceptedAnswer: { "@type": "Answer", text: faqTextOf(item.a) },
          })),
        }
      : null;

  return (
    <div className={dsRoot(styles.root, className)}>
      {faqSchema ? (
        <Script
          id="site-solution-faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <Section background="white">
        <div className={styles.heroGrid}>
          <div className={styles.heroMain}>
            <span className={styles.eyebrow}>{hero.eyebrow}</span>
            <h1 className={styles.title}>{hero.title}</h1>
            <HeadlineAccent />
            <p className={styles.lead}>{hero.lead}</p>
            <div className={styles.heroActions}>
              {hero.primaryAction ? (
                hero.primaryAction(styles.primary)
              ) : (
                <a href={hero.primaryHref} className={styles.primary}>
                  {hero.primaryLabel}
                </a>
              )}
              {hero.secondaryAction
                ? hero.secondaryAction(styles.secondary)
                : hero.secondaryLabel && hero.secondaryHref ? (
                    <a href={hero.secondaryHref} className={styles.secondary}>
                      {hero.secondaryLabel}
                    </a>
                  ) : null}
            </div>
          </div>
          {hero.visual ? <div className={styles.heroVisual}>{hero.visual}</div> : null}
        </div>
      </Section>

      {sections.map(renderSection)}

      <ClosingCTA {...closingCTA} />
    </div>
  );
}
