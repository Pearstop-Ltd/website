import { dsRoot } from "../tokens";
import { Section } from "../internal/Section";
import { CasesHero } from "../cases/CasesHero";
import { CaseFeatured } from "../cases/CaseFeatured";
import { CaseCard } from "../CaseCard";
import { PatternCard } from "../cases/PatternCard";
import { CaseCardVisual } from "../cases/CaseCardVisual";
import { CaseQuote } from "../cases/CaseQuote";
import { ClosingCTA } from "../ClosingCTA";
import { SampleRequestModal } from "@/components/sample-request-modal";
import { featuredCase, clientCases, patternCases } from "@/lib/cases";
import type { PersonId } from "@/lib/people";
import styles from "./CasesIndex.module.css";

export interface CasesIndexCopy {
  hero: { eyebrow: string; title: string; lead: string };
  index: {
    jumpLinkClientCases: string;
    jumpLinkPatterns: string;
    featuredLabel: string;
    readCase: string;
    clientCasesTitle: string;
    clientCasesCaption: string;
    patternsTitle: string;
    seePattern: string;
    inTheirWords: string;
    closingTitle: string;
    closingBody: string;
    closingPrimaryLabel: string;
    closingSecondaryLabel: string;
  };
  testimonials: {
    t1: { text: string };
    t2: { text: string };
    t3: { text: string };
  };
}

/** /cases index — mirrors design/refs/cases-index.dc.html. Rendered
 * identically by both route trees; case data comes from lib/cases.ts only. */
export function CasesIndexPage({ copy }: { copy: CasesIndexCopy }) {
  const QUOTES: { personId: PersonId; quote: string }[] = [
    { personId: "bartVanPeij", quote: copy.testimonials.t1.text },
    { personId: "vinceOut", quote: copy.testimonials.t2.text },
    { personId: "davidTorr", quote: copy.testimonials.t3.text },
  ];

  return (
    <div className={dsRoot()}>
      <Section background="white" paddingBottom={24}>
        <CasesHero
          eyebrow={copy.hero.eyebrow}
          title={copy.hero.title}
          lead={copy.hero.lead}
          jumpLinks={[
            { label: copy.index.jumpLinkClientCases, href: "#client-cases", dot: "client" },
            { label: copy.index.jumpLinkPatterns, href: "#patterns", dot: "pattern" },
          ]}
        />
      </Section>

      <Section background="white" paddingTop={24}>
        <CaseFeatured
          metaLabel={copy.index.featuredLabel}
          tag={featuredCase.tag}
          title={featuredCase.headline}
          summary={featuredCase.summary}
          stats={featuredCase.stats ?? []}
          linkLabel={copy.index.readCase}
          href={featuredCase.href}
          logo={featuredCase.logo}
          visual={<CaseCardVisual variant={featuredCase.visual} />}
        />
      </Section>

      <Section background="white">
        <div id="client-cases" className={styles.sectionStack}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>{copy.index.clientCasesTitle}</h2>
            <span className={styles.sectionCaption}>{copy.index.clientCasesCaption}</span>
          </div>
          <div className={styles.clientGrid}>
            {clientCases.map((c) => (
              <CaseCard
                key={c.slug}
                id={c.anchorId}
                variant="client"
                eyebrow={c.tag}
                title={c.headline}
                stats={c.stats ?? []}
                href={c.href}
                linkLabel={copy.index.readCase}
                visual={<CaseCardVisual variant={c.visual} />}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section background="soft">
        <div id="patterns" className={styles.sectionStack}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>{copy.index.patternsTitle}</h2>
          </div>
          <div className={styles.patternsGrid}>
            {patternCases.map((c) => (
              <PatternCard
                key={c.slug}
                eyebrow={c.tag}
                title={c.headline}
                summary={c.summary}
                linkLabel={copy.index.seePattern}
                href={c.href}
                visual={<CaseCardVisual variant={c.visual} />}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section background="white">
        <div className={styles.sectionStack}>
          <h2 className={styles.sectionTitle}>{copy.index.inTheirWords}</h2>
          <div className={styles.quotesGrid}>
            {QUOTES.map((q) => (
              <CaseQuote key={q.personId} personId={q.personId} quote={q.quote} />
            ))}
          </div>
        </div>
      </Section>

      <ClosingCTA
        title={copy.index.closingTitle}
        body={copy.index.closingBody}
        primaryLabel={copy.index.closingPrimaryLabel}
        primaryAction={(className) => <SampleRequestModal label={copy.index.closingPrimaryLabel} className={className} />}
        secondaryLabel={copy.index.closingSecondaryLabel}
        secondaryHref="/book-a-demo"
        footerLine={`© ${new Date().getFullYear()} Pearstop · Privacy · Terms`}
      />
    </div>
  );
}
