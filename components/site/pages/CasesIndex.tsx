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

const QUOTES: { personId: PersonId; quote: string }[] = [
  {
    personId: "bartVanPeij",
    quote:
      "The confidence scoring meant our team knew where to spend their review time first, instead of starting from scratch on 200,000 rows.",
  },
  {
    personId: "davidTorr",
    quote:
      "We had thousands of product lines that needed to be categorised before we could even begin to understand our costs. Pearstop classified them in under a week.",
  },
  {
    personId: "vinceOut",
    quote: "It saves our team a lot of time by eliminating the repetitive tasks of combining the correct items.",
  },
];

/** /cases index — mirrors design/refs/cases-index.dc.html. Rendered
 * identically by both route trees; case data comes from lib/cases.ts only. */
export function CasesIndexPage() {
  return (
    <div className={dsRoot()}>
      <Section background="white" paddingBottom={24}>
        <CasesHero
          eyebrow="Cases"
          title="Real work. Real margins."
          lead="How project-based businesses in FM, construction, infrastructure and manufacturing turn messy procurement and asset data into something they can act on."
          jumpLinks={[
            { label: "Client cases", href: "#client-cases", dot: "client" },
            { label: "Patterns", href: "#patterns", dot: "pattern" },
          ]}
        />
      </Section>

      <Section background="white" paddingTop={24}>
        <CaseFeatured
          metaLabel="Featured client case"
          tag={featuredCase.tag}
          title={featuredCase.headline}
          summary={featuredCase.summary}
          stats={featuredCase.stats ?? []}
          linkLabel="Read the case"
          href={featuredCase.href}
          logo={featuredCase.logo}
          visual={<CaseCardVisual variant={featuredCase.visual} />}
        />
      </Section>

      <Section background="white">
        <div id="client-cases" className={styles.sectionStack}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Client cases</h2>
            <span className={styles.sectionCaption}>Named work, real data</span>
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
                linkLabel="Read the case"
                visual={<CaseCardVisual variant={c.visual} />}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section background="soft">
        <div id="patterns" className={styles.sectionStack}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Patterns we see</h2>
            <span className={styles.sectionCaption}>Illustrative data, based on real client patterns</span>
          </div>
          <div className={styles.patternsGrid}>
            {patternCases.map((c) => (
              <PatternCard
                key={c.slug}
                eyebrow={c.tag}
                title={c.headline}
                summary={c.summary}
                linkLabel="See the pattern"
                href={c.href}
                visual={<CaseCardVisual variant={c.visual} />}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section background="white">
        <div className={styles.sectionStack}>
          <h2 className={styles.sectionTitle}>In their words</h2>
          <div className={styles.quotesGrid}>
            {QUOTES.map((q) => (
              <CaseQuote key={q.personId} personId={q.personId} quote={q.quote} />
            ))}
          </div>
        </div>
      </Section>

      <ClosingCTA
        title="Send us 200 lines. We send them back labelled."
        body="No clean-up first, no cost, nothing to install. The fastest way to see what your own data looks like classified."
        primaryLabel="Send your sample"
        primaryAction={(className) => <SampleRequestModal label="Send your sample" className={className} />}
        secondaryLabel="Or talk to Sales →"
        secondaryHref="/book-a-demo"
        footerLine={`© ${new Date().getFullYear()} Pearstop · Privacy · Terms`}
      />
    </div>
  );
}
