import Link from "next/link";
import { SolutionPage, type SolutionSection } from "../templates/SolutionPage";
import { Section } from "../internal/Section";
import { SectionHeader } from "../SectionHeader";
import { StatBand } from "../StatBand";
import { DotList } from "../migrations/DotList";
import { SampleRequestModal } from "@/components/sample-request-modal";
import { siteConfig } from "@/lib/site";
import styles from "./ComplianceQuestion.module.css";

/** Copy for one "Compliance questions" page: `messages/<locale>.json` → `Compliance.<key>`, plus `Compliance.shared`. */
export interface ComplianceQuestionCopy {
  meta: { title: string; description: string };
  shared: {
    sampleLabel: string;
    discoveryLabel: string;
    momentEyebrow: string;
    momentTitle: string;
    hardTitle: string;
    changesEyebrow: string;
    changesTitle: string;
    proofEyebrow: string;
    faqEyebrow: string;
    faqTitle: string;
  };
  hero: { eyebrow: string; title: string; lead: string };
  moments: { title: string; body: string }[];
  hard: string;
  changes: string[];
  registers?: {
    eyebrow: string;
    title: string;
    lead?: string;
    columns: { country: string; registers: string; confirms: string };
    rows: { country: string; registers: string; confirms: string }[];
  };
  proof: {
    title: string;
    stats?: { value: string; caption: string }[];
    cases?: string[];
    /** `path` is locale-agnostic (e.g. "/cases/spie"); the locale prefix is added here. */
    link?: { label: string; path: string };
  };
  faq: { question: string; answer: string }[];
  cta: { title: string; body: string };
}

export function ComplianceQuestionPage({ copy, localePrefix }: { copy: ComplianceQuestionCopy; localePrefix: string }) {
  const { shared } = copy;
  const sections: SolutionSection[] = [
    {
      type: "outcomeCards",
      key: "moments",
      background: "white",
      eyebrow: shared.momentEyebrow,
      title: shared.momentTitle,
      columns: 3,
      cards: copy.moments.map((moment) => ({ title: moment.title, body: moment.body, variant: "tinted-blue" as const })),
    },
    { type: "definition", key: "hard", background: "soft", title: shared.hardTitle, body: copy.hard },
    {
      type: "custom",
      key: "changes",
      node: (
        <Section background="white">
          <SectionHeader eyebrow={shared.changesEyebrow} title={shared.changesTitle} />
          <div className={styles.changes}>
            <DotList items={copy.changes} />
          </div>
        </Section>
      ),
    },
  ];

  if (copy.registers) {
    const { columns, rows } = copy.registers;
    sections.push({
      type: "table",
      key: "registers",
      background: "soft",
      eyebrow: copy.registers.eyebrow,
      title: copy.registers.title,
      lead: copy.registers.lead,
      table: {
        columns: [
          { key: "country", label: columns.country, width: "1fr" },
          { key: "registers", label: columns.registers, width: "2fr" },
          { key: "confirms", label: columns.confirms, width: "2fr" },
        ],
        rows,
      },
    });
  }

  sections.push(
    {
      type: "custom",
      key: "proof",
      node: (
        <Section background={copy.registers ? "white" : "soft"}>
          <div className={styles.proofStack}>
            <SectionHeader eyebrow={shared.proofEyebrow} title={copy.proof.title} />
            {copy.proof.stats ? <StatBand stats={copy.proof.stats} /> : null}
            {copy.proof.cases || copy.proof.link ? (
              <div className={styles.cases}>
                {copy.proof.cases?.map((text) => (
                  <p className={styles.case} key={text}>
                    {text}
                  </p>
                ))}
                {copy.proof.link ? (
                  <Link href={`${localePrefix}${copy.proof.link.path}`} className={styles.link}>
                    {copy.proof.link.label}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
        </Section>
      ),
    },
    {
      type: "faq",
      key: "faq",
      background: copy.registers ? "soft" : "white",
      eyebrow: shared.faqEyebrow,
      title: shared.faqTitle,
      items: copy.faq.map((item) => ({ q: item.question, a: item.answer })),
    }
  );

  return (
    <SolutionPage
      hero={{
        eyebrow: copy.hero.eyebrow,
        title: copy.hero.title,
        lead: copy.hero.lead,
        primaryLabel: shared.sampleLabel,
        primaryAction: (className) => <SampleRequestModal label={shared.sampleLabel} className={className} />,
        secondaryLabel: shared.discoveryLabel,
        secondaryHref: siteConfig.calendly,
      }}
      sections={sections}
      emitFaqSchema={false}
      closingCTA={{
        title: copy.cta.title,
        body: copy.cta.body,
        primaryLabel: shared.sampleLabel,
        primaryAction: (className) => <SampleRequestModal label={shared.sampleLabel} className={className} />,
        secondaryLabel: shared.discoveryLabel,
        secondaryHref: siteConfig.calendly,
        footerLine: `© ${new Date().getFullYear()} Pearstop · Privacy · Terms`,
      }}
    />
  );
}
