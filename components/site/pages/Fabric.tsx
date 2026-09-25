import { SolutionPage, type SolutionSection } from "../templates/SolutionPage";
import { HeroTransform } from "../HeroTransform";
import { ProblemBullets } from "../ProblemBullets";
import { SampleRequestModal } from "@/components/sample-request-modal";

export interface FabricCopy {
  common: { sendSample: string; bookDiscovery: string };
  hero: { eyebrow: string; title: string; lead: string };
  problem: { eyebrow: string; title: string; copy: string; bullets: string[] };
  howItWorks: {
    title: string;
    step1: { title: string; copy: string };
    step2: { title: string; copy: string };
    step3: { title: string; copy: string };
  };
  stats: { value: string; label: string; copy: string }[];
  quote: { text: string; author: string; role: string };
  geoBlock: { title: string; copy: string };
  faq: { question: string; answer: string }[];
  cta: { title: string; lead: string };
}

const BEFORE_AFTER_ROWS = [
  { raw: "PMP FLTR 20X24 CS/6", clean: "Air filters", unit: "40161505" },
  { raw: "FILTER,AIR,20X24,MERV8", clean: "Air filters", unit: "40161505" },
  { raw: "GEN PURP CLNR 5L", clean: "General purpose cleaners", unit: "47131805" },
  { raw: "Additional hours", clean: "Temporary manual labour", unit: "80111613" },
];

export function FabricPage({ copy }: { copy: FabricCopy }) {
  const sections: SolutionSection[] = [
    {
      type: "statBand",
      key: "stats",
      stats: copy.stats.map((s) => ({ value: s.value, caption: s.label })),
    },
    {
      type: "problem",
      key: "problem",
      eyebrow: copy.problem.eyebrow,
      title: copy.problem.title,
      body: (
        <>
          <p>{copy.problem.copy}</p>
          <ProblemBullets items={copy.problem.bullets} />
        </>
      ),
    },
    {
      type: "steps",
      key: "howItWorks",
      anchorId: "how-it-works",
      eyebrow: "How it works",
      title: copy.howItWorks.title,
      background: "soft",
      steps: [
        { number: 1, title: copy.howItWorks.step1.title, body: copy.howItWorks.step1.copy },
        { number: 2, title: copy.howItWorks.step2.title, body: copy.howItWorks.step2.copy },
        { number: 3, title: copy.howItWorks.step3.title, body: copy.howItWorks.step3.copy },
      ],
    },
    {
      type: "quote",
      key: "quote",
      quote: { variant: "inline", role: `${copy.quote.author}, ${copy.quote.role}`, quote: copy.quote.text },
    },
    {
      type: "definition",
      key: "definition",
      background: "soft",
      title: copy.geoBlock.title,
      body: copy.geoBlock.copy,
    },
    {
      type: "faq",
      key: "faq",
      eyebrow: "Questions",
      title: "Frequently asked",
      items: copy.faq.map((item) => ({ q: item.question, a: item.answer })),
    },
  ];

  return (
    <SolutionPage
      hero={{
        eyebrow: copy.hero.eyebrow,
        title: copy.hero.title,
        lead: copy.hero.lead,
        primaryLabel: copy.common.sendSample,
        primaryAction: (className) => <SampleRequestModal label={copy.common.sendSample} className={className} />,
        secondaryLabel: copy.common.bookDiscovery,
        secondaryHref: "/book-a-demo",
        visual: (
          <HeroTransform
            input={{ variant: "rawLine", label: "Line as entered", value: "PMP FLTR 20X24 CS/6" }}
            output={{ variant: "table", columns: ["As entered", "Category", "UNSPSC"], rows: BEFORE_AFTER_ROWS }}
          />
        ),
      }}
      sections={sections}
      emitFaqSchema={false}
      closingCTA={{
        title: copy.cta.title,
        body: copy.cta.lead,
        primaryLabel: copy.common.sendSample,
        primaryAction: (className) => <SampleRequestModal label={copy.common.sendSample} className={className} />,
        secondaryLabel: copy.common.bookDiscovery,
        secondaryHref: "/book-a-demo",
        footerLine: `© ${new Date().getFullYear()} Pearstop · Privacy · Terms`,
      }}
    />
  );
}
