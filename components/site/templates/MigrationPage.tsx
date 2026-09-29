import { SolutionPage, type SolutionSection } from "./SolutionPage";
import { Section } from "../internal/Section";
import { ProblemBullets } from "../ProblemBullets";
import { DotList } from "../migrations/DotList";
import { GoodDataChecklist } from "../migrations/GoodDataChecklist";
import { ListSection } from "../migrations/ListSection";
import { MigrationJourney } from "../migrations/MigrationJourney";
import { RelatedLinks } from "../migrations/RelatedLinks";
import { STATIC_PAGE_LABELS } from "../migrations/related-link-labels";
import { SampleRequestModal } from "@/components/sample-request-modal";
import { siteConfig } from "@/lib/site";
import { migrationEntries, basePathFor, type MigrationEntry } from "@/content/migrations";

function resolveRelatedLinks(slugs: string[]): Array<{ href: string; label: string }> {
  return slugs.map((href) => {
    const match = migrationEntries.find((entry) => `${basePathFor(entry)}/${entry.slug}` === href);
    if (match) return { href, label: match.h1 };
    return { href, label: STATIC_PAGE_LABELS[href] ?? href };
  });
}

const COST_OF_LEAVING =
  "Bad data doesn't stay behind when you migrate. It gets carried into the new system, where it causes extra test runs, a delayed go-live, and spend reports nobody trusts once the dust settles.";

const WORK_WITH_YOUR_PARTNER =
  "Most migrations run through an implementation partner. We work alongside them, or directly with you. Your partner sets up the new system; we give them clean, classified data in the format their import tools need. Nobody's scope changes, and your partner's team can spend their time on the new system instead of fixing records.";

const WHY_START_EARLY =
  "Bring us in when you assess the data, not after the first test run fails. You find duplicates, free-text lines and missing categories while there is still time to fix them, nothing has to be cleaned twice, and the test runs go faster because the data goes in cleanly. Some problems only show up once you look closely at how the data behaves, which is why it pays to work with someone who handles this data every day.";

export function MigrationPage({ entry }: { entry: MigrationEntry }) {
  const isEclass = entry.kind === "eclass";
  const standardLabel = entry.standard;

  const sections: SolutionSection[] = [];

  if (entry.kind === "migration") {
    sections.push({
      type: "problem",
      key: "problem",
      background: "soft",
      eyebrow: entry.system,
      title: "Where the data breaks",
      body: <ProblemBullets items={entry.pains} />,
    });
  } else {
    sections.push({
      type: "definition",
      key: "whatIsEclass",
      background: "soft",
      title: "What this means for your data",
      body: entry.intro,
    });
  }

  sections.push({
    type: "definition",
    key: "costOfLeaving",
    title: "What it costs to leave it",
    body: COST_OF_LEAVING,
  });

  if (entry.kind === "migration") {
    sections.push({
      type: "custom",
      key: "journey",
      node: (
        <Section background="soft">
          <MigrationJourney />
        </Section>
      ),
    });
  } else {
    sections.push({
      type: "steps",
      key: "howClassificationWorks",
      background: "soft",
      eyebrow: "How it works",
      title: `How classification to ${standardLabel} works`,
      steps: entry.howClassificationSteps.map((step, i) => ({ number: i + 1, title: step.title, body: step.body })),
    });
  }

  sections.push({
    type: "custom",
    key: "dataFocus",
    node: (
      <ListSection title={isEclass ? `Where ${standardLabel} classification matters` : `The data that matters in a ${entry.system} migration`}>
        <DotList items={entry.dataFocus} />
      </ListSection>
    ),
  });

  sections.push({
    type: "custom",
    key: "goodData",
    node: (
      <ListSection title="What good data looks like" background="soft">
        <GoodDataChecklist items={entry.goodData} />
      </ListSection>
    ),
  });

  sections.push({
    type: "definition",
    key: "howPearstopHandlesIt",
    title: "How Pearstop handles it",
    body: `The data doesn't need to be clean first. AI classification handles the clear cases, and a person reviews anything uncertain. ${standardLabel} labels are mapped to ${entry.system}'s fields, in the format your migration needs. New invoices stay classified after go-live, so reporting doesn't slip back into the same mess.`,
  });

  sections.push({
    type: "definition",
    key: "workWithYourPartner",
    background: "soft",
    title: "Work with your partner",
    body: WORK_WITH_YOUR_PARTNER,
  });

  sections.push({
    type: "definition",
    key: "whyStartEarly",
    title: "Why start early",
    body: WHY_START_EARLY,
  });

  if (entry.proof) {
    sections.push({
      type: "statBand",
      key: "proof",
      background: "soft",
      stats: [{ value: entry.proof.stat, caption: entry.proof.label }],
    });
  }

  sections.push({
    type: "faq",
    key: "faq",
    background: "soft",
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    items: entry.faqs.map((item) => ({ q: item.q, a: item.a })),
  });

  sections.push({
    type: "custom",
    key: "relatedLinks",
    node: (
      <Section>
        <RelatedLinks links={resolveRelatedLinks(entry.relatedSlugs)} />
      </Section>
    ),
  });

  const heroLead = entry.kind === "migration" ? entry.trigger : entry.intro;

  return (
    <SolutionPage
      hero={{
        eyebrow: isEclass ? "ECLASS classification" : `${entry.system} migration`,
        title: entry.h1,
        lead: heroLead,
        primaryLabel: "Send us 200 lines",
        primaryAction: (className) => <SampleRequestModal label="Send us 200 lines" className={className} />,
        secondaryLabel: "Book a 15-minute discovery",
        secondaryHref: siteConfig.calendly,
      }}
      sections={sections}
      closingCTA={{
        title: "Send us 200 lines",
        body: "We'll classify a sample of your purchase data and send it back so you can see what good data looks like before you commit to cleaning the rest.",
        primaryLabel: "Send us 200 lines",
        primaryAction: (className) => <SampleRequestModal label="Send us 200 lines" className={className} />,
        secondaryLabel: "Book a 15-minute discovery",
        secondaryHref: siteConfig.calendly,
        footerLine: `© ${new Date().getFullYear()} Pearstop · Privacy · Terms`,
      }}
    />
  );
}
