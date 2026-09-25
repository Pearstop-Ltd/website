import Link from "next/link";
import Image from "next/image";
import { Section } from "../internal/Section";
import { SectionHeader } from "../SectionHeader";
import { FaqSection } from "../FaqSection";
import { IndustryOverviewCard } from "../IndustryOverviewCard";
import { IndustrySlider } from "../IndustrySlider";
import { TrustStrip } from "../TrustStrip";
import { Card } from "../Card";
import { CalendlyButton } from "@/components/calendly-button";
import { SampleRequestModal } from "@/components/sample-request-modal";
import type { IndustrySectionCopy } from "../IndustrySection";
import styles from "./Industries.module.css";

export interface IndustriesCopy {
  breadcrumb: { home: string; current: string };
  hero: { eyebrow: string; title: string; lead: string; primaryLabel: string; secondaryLabel: string };
  overview: {
    eyebrow: string;
    title: string;
    cards: {
      id: string;
      name: string;
      pain: string;
      outcome: string;
      linkLabel: string;
      href: string;
      photoAlt: string;
      photo: string | null;
    }[];
  };
  sections: IndustrySectionCopy[];
  workingDifferent: { title: string; body: string; primaryLabel: string; secondaryLabel: string };
  technical: { eyebrow: string; title: string; lead: string; blocks: { title: string; copy: string }[] };
  faq: { items: { q: string; a: string }[] };
}

const CARD_TINTS = ["blue", "purple", "green", "soft", "soft", "blue", "purple", "soft", "green"] as const;

/** /industries — the industry-picker hub page: static overview grid, then
 * one horizontal slider of full industry slides. Rendered from a `copy`
 * prop (see CLAUDE.md's site migration convention); each route tree's
 * page.tsx supplies its own copy source and keeps its own
 * metadata/canonical/hreflang/JSON-LD. */
export function IndustriesPage({ copy }: { copy: IndustriesCopy }) {
  return (
    <>
      <Section background="white" paddingTop={0} paddingBottom={72}>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
              <Link href="/">{copy.breadcrumb.home}</Link>
              <span aria-hidden="true">›</span>
              <span>{copy.breadcrumb.current}</span>
            </nav>
            <span className={styles.eyebrow}>{copy.hero.eyebrow}</span>
            <h1 className={styles.heroTitle}>{copy.hero.title}</h1>
            <span aria-hidden="true" className={styles.headlineAccent} />
            <p className={styles.heroLead}>{copy.hero.lead}</p>
            <div className={styles.heroActions}>
              <SampleRequestModal label={copy.hero.primaryLabel} className={styles.heroPrimary} />
              <CalendlyButton label={copy.hero.secondaryLabel} className={styles.heroSecondary} />
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="/images/photos/the-city-1.png"
              alt="City skyline representing the range of industries Pearstop serves"
              fill
              sizes="(max-width: 900px) 100vw, 560px"
              priority
              className={styles.heroImageEl}
            />
          </div>
        </div>
      </Section>

      <Section background="soft" id="all-industries" className={styles.overviewSection}>
        <SectionHeader eyebrow={copy.overview.eyebrow} title={copy.overview.title} />
        <div className={styles.overviewGrid}>
          {copy.overview.cards.map((card, i) => (
            <IndustryOverviewCard
              key={card.id}
              name={card.name}
              pain={card.pain}
              outcome={card.outcome}
              linkLabel={card.linkLabel}
              href={card.href}
              photoAlt={card.photoAlt}
              photo={card.photo}
              tint={CARD_TINTS[i]}
            />
          ))}
        </div>
      </Section>

      <IndustrySlider sections={copy.sections} />

      <TrustStrip />

      <Section background="soft">
        <div className={styles.workingDifferent}>
          <div className={styles.workingDifferentText}>
            <h2 className={styles.workingDifferentTitle}>{copy.workingDifferent.title}</h2>
            <p className={styles.workingDifferentBody}>{copy.workingDifferent.body}</p>
          </div>
          <div className={styles.workingDifferentActions}>
            <CalendlyButton label={copy.workingDifferent.primaryLabel} className={styles.workingDifferentPrimary} />
            <SampleRequestModal label={copy.workingDifferent.secondaryLabel} className={styles.workingDifferentSecondary} />
          </div>
        </div>
      </Section>

      <Section background="white">
        <SectionHeader eyebrow={copy.technical.eyebrow} title={copy.technical.title} lead={copy.technical.lead} />
        <div className={styles.technicalGrid}>
          {copy.technical.blocks.map((block) => (
            <Card key={block.title} title={block.title} body={block.copy} />
          ))}
        </div>
      </Section>

      <FaqSection title="Frequently asked questions" items={copy.faq.items} background="soft" />
    </>
  );
}
