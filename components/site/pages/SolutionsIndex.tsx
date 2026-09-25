import Link from "next/link";
import { Section } from "../internal/Section";
import { SectionHeader } from "../SectionHeader";
import { FaqSection } from "../FaqSection";
import { ClosingCTA } from "../ClosingCTA";
import { CheckIcon } from "../icons";
import { SampleRequestModal } from "@/components/sample-request-modal";
import { siteConfig } from "@/lib/site";
import styles from "./SolutionsIndex.module.css";

export interface SolutionsIndexCopy {
  breadcrumb: { home: string; current: string };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryLabel: string;
    secondaryLabel: string;
    builtForLabel: string;
    builtFor: { id: string; label: string }[];
  };
  problems: {
    eyebrow: string;
    title: string;
    orderLabel: string;
    order: { id: string; label: string }[];
    items: {
      id: string;
      badgeLabel: string;
      pain: string;
      title: string;
      body: string;
      related: { label: string; href: string }[];
      href: string;
      wide?: boolean;
    }[];
    exploreLink: string;
  };
  who: {
    eyebrow: string;
    title: string;
    items: { id: string; title: string; pain: string; linkLabel: string; href: string }[];
  };
  tools: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string; linkLabel: string; href: string }[];
  };
  approach: {
    eyebrow: string;
    title: string;
    body: string;
    bullets: string[];
    worksWithLabel: string;
    worksCopy: string;
    engineLabel: string;
    engineCopy: string;
    outputLabel: string;
    outputCopy: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  closing: {
    title: string;
    body: string;
    primaryLabel: string;
    secondaryLabel: string;
    tertiaryLabel: string;
  };
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true" className={styles.orderArrow}>
      <path d="M0 5 H10" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 1 L13 5 L9 9" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

/** /solutions index — mirrors design/refs/solutions-index.dc.html. Rendered
 * from a `copy` prop (see CLAUDE.md's site migration convention); each
 * route tree's page.tsx supplies its own copy source and keeps its own
 * metadata/canonical/hreflang/JSON-LD. */
export function SolutionsIndexPage({ copy }: { copy: SolutionsIndexCopy }) {
  return (
    <>
      <Section background="white" paddingBottom={0}>
        <div className={styles.hero}>
          <span className={styles.eyebrow}>{copy.hero.eyebrow}</span>
          <h1 className={styles.heroTitle}>{copy.hero.title}</h1>
          <span aria-hidden="true" className={styles.headlineAccent} />
          <p className={styles.heroLead}>{copy.hero.lead}</p>
          <div className={styles.heroActions}>
            <SampleRequestModal label={copy.hero.primaryLabel} className="btn btn-primary" />
            <Link href="/book-a-demo" className="btn btn-outline">
              {copy.hero.secondaryLabel}
            </Link>
          </div>
          <div className={styles.builtForRow}>
            <span className={styles.builtForLabel}>{copy.hero.builtForLabel}</span>
            {copy.hero.builtFor.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={styles.chip}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </Section>

      <Section background="soft">
        <SectionHeader eyebrow={copy.problems.eyebrow} title={copy.problems.title} />
        <div className={styles.orderRow}>
          <span className={styles.orderLabel}>{copy.problems.orderLabel}</span>
          {copy.problems.order.map((step, i) => (
            <span key={step.id} className={styles.orderStepWrap}>
              <a href={`#${step.id}`} className={styles.orderChip}>
                <span className={styles.orderBadge}>{i + 1}</span>
                {step.label}
              </a>
              {i < copy.problems.order.length - 1 ? <ArrowRightIcon /> : null}
            </span>
          ))}
        </div>
        <div className={styles.problemGrid}>
          {copy.problems.items.map((item, i) => (
            <article id={item.id} key={item.id} className={item.wide ? styles.problemCardWide : styles.problemCard}>
              <div className={styles.problemCardTop}>
                <span className={styles.problemCardBadge}>{i + 1}</span>
                <span className={styles.problemCardLabel}>{item.badgeLabel}</span>
              </div>
              <p className={styles.problemCardPain}>{item.pain}</p>
              <div className={styles.problemCardDivider} />
              <h3 className={styles.problemCardTitle}>{item.title}</h3>
              <p className={styles.problemCardBody}>{item.body}</p>
              {item.related.length ? (
                <div className={styles.relatedRow}>
                  <span className={styles.relatedLabel}>Related:</span>
                  {item.related.map((rel) => (
                    <Link key={rel.href} href={rel.href} className={styles.chip}>
                      {rel.label}
                    </Link>
                  ))}
                </div>
              ) : null}
              <Link href={item.href} className={styles.problemCardLink}>
                {copy.problems.exploreLink}
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section background="white">
        <SectionHeader eyebrow={copy.who.eyebrow} title={copy.who.title} />
        <div className={styles.whoGrid}>
          {copy.who.items.map((item) => (
            <Link id={item.id} key={item.id} href={item.href} className={styles.whoCard}>
              <h3 className={styles.whoCardTitle}>{item.title}</h3>
              <span className={styles.whoCardPain}>{item.pain}</span>
              <span className={styles.whoCardLink}>{item.linkLabel}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section background="soft">
        <SectionHeader eyebrow={copy.tools.eyebrow} title={copy.tools.title} />
        <div className={styles.toolsGrid}>
          {copy.tools.items.map((tool) => (
            <Link key={tool.href} href={tool.href} className={styles.toolCard}>
              <span className={styles.toolCardTitle}>{tool.title}</span>
              <span className={styles.toolCardBody}>{tool.body}</span>
              <span className={styles.toolCardLink}>{tool.linkLabel}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section background="white">
        <div className={styles.approachGrid}>
          <div className={styles.approachCopy}>
            <span className={styles.eyebrow}>{copy.approach.eyebrow}</span>
            <h2 className={styles.approachTitle}>{copy.approach.title}</h2>
            <p className={styles.approachBody}>{copy.approach.body}</p>
            <ul className={styles.approachChecklist}>
              {copy.approach.bullets.map((bullet) => (
                <li key={bullet} className={styles.approachCheckItem}>
                  <CheckIcon />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.approachFlow}>
            <div className={styles.approachFlowStep}>
              <span className={styles.approachFlowLabel}>{copy.approach.worksWithLabel}</span>
              <span className={styles.approachFlowBody}>{copy.approach.worksCopy}</span>
            </div>
            <span className={styles.approachFlowArrow} aria-hidden="true">
              <ArrowRightIcon />
            </span>
            <div className={`${styles.approachFlowStep} ${styles.approachFlowStepPrimary}`}>
              <span className={styles.approachFlowLabel}>{copy.approach.engineLabel}</span>
              <span className={styles.approachFlowBody}>{copy.approach.engineCopy}</span>
            </div>
            <span className={styles.approachFlowArrow} aria-hidden="true">
              <ArrowRightIcon />
            </span>
            <div className={`${styles.approachFlowStep} ${styles.approachFlowStepGreen}`}>
              <span className={styles.approachFlowLabel}>{copy.approach.outputLabel}</span>
              <span className={styles.approachFlowBody}>{copy.approach.outputCopy}</span>
            </div>
          </div>
        </div>
      </Section>

      <FaqSection eyebrow={copy.faq.eyebrow} title={copy.faq.title} items={copy.faq.items} defaultOpenIndex={0} />

      <ClosingCTA
        title={copy.closing.title}
        body={copy.closing.body}
        primaryLabel={copy.closing.primaryLabel}
        primaryAction={(className) => (
          <a href={siteConfig.calendly} target="_blank" rel="noopener noreferrer" className={className}>
            {copy.closing.primaryLabel}
          </a>
        )}
        secondaryAction={(className) => (
          <>
            <SampleRequestModal label={copy.closing.secondaryLabel} className={className} />
            <Link href="/industries" className={styles.viewIndustriesLink}>
              {copy.closing.tertiaryLabel}
            </Link>
          </>
        )}
        footerLine={`© ${new Date().getFullYear()} Pearstop · Privacy · Terms`}
      />
    </>
  );
}
