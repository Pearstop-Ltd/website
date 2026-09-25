import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CTABand, GeoBlock, PageHero, SectionTitle } from "@/components/content";
import { UnspscLookupCta } from "@/components/unspsc-lookup-cta";
import { Faq } from "@/components/site/Faq";
import { alternateLanguages, siteConfig } from "@/lib/site";

const PAGE_URL = `${siteConfig.url}/unspsc-ai-classification-guide`;

export const metadata: Metadata = {
  title: "AI UNSPSC Classification: The Practical Guide",
  description:
    "How Pearstop classifies a large Excel or CSV procurement catalog into UNSPSC with AI: PDF invoice extraction, a free 500-row pilot, supplier-specific memory, and full 8-digit commodity codes for your ERP.",
  keywords: [
    "AI UNSPSC classification",
    "classify Excel catalog UNSPSC",
    "AI procurement classification guide",
    "automated UNSPSC coding",
    "UNSPSC classification software",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: alternateLanguages("/unspsc-ai-classification-guide")
  },
  openGraph: {
    title: "AI UNSPSC Classification: The Practical Guide",
    description:
      "How Pearstop classifies a procurement catalog into UNSPSC: PDF extraction, a free 500-row pilot, supplier-specific memory, and full 8-digit commodity codes.",
    url: PAGE_URL,
    siteName: siteConfig.name,
    images: ["/opengraph-image"]
  }
};

const FAQ_ITEMS = [
  {
    q: "What if I don't have clean invoice data yet?",
    a: "That is the first starting point this guide covers. If your purchasing history exists only as PDF invoices, Pearstop extracts the fields specified for invoices in your industry directly from those PDFs first, so you get a structured spend file before classification begins."
  },
  {
    q: "How accurate is AI-only classification compared to Pearstop's approach?",
    a: "A general model asked directly for a UNSPSC code will answer even when no code fits well, because it is built to produce an answer, not to admit uncertainty. Pearstop checks every proposed code against the real UNSPSC dataset before accepting it, combines that with rules, a supplier database, and supplier-specific memory, and still flags low-confidence lines for human review. On typical procurement datasets this reaches 90 to 95% automatic classification, with the remainder reviewed by a person rather than guessed."
  },
  {
    q: "Can this connect to our ERP?",
    a: "Yes. Classified data exports to Excel, or connects directly via API into SAP, Oracle, and other ERP or P2P platforms. Many clients start with an Excel or CSV export and move to a direct connection once the classification is proven."
  },
  {
    q: "What does the free pilot actually involve?",
    a: "We classify a representative sample of roughly 500 rows from your data at no cost. Your team reviews and corrects that sample, and those corrections become the supplier-specific memory the full-dataset run then uses."
  },
  {
    q: "How is this different from just using ChatGPT or Copilot on our spend file?",
    a: "You can do that yourself, and for a handful of lines it is a reasonable way to get a first answer. It does not scale, and it does not check its own work: there is no validation against the real UNSPSC codeset, no supplier memory that improves with volume, and no built-in review step for the lines it got wrong. Pearstop is built to do all of that on a full file, not a single line."
  },
  {
    q: "Does the system learn, or does every file start from zero?",
    a: "It learns. Corrections from the pilot are stored as supplier-specific memory, so a part description pattern that has already been reviewed for a given supplier does not need to be reasoned through again by the LLM the next time it appears."
  },
  {
    q: "What is NACE, and why would it be part of the taxonomy?",
    a: "NACE is the European statistical classification of economic activities. Where a client's reporting or sector benchmarking runs on NACE alongside UNSPSC, the taxonomy we build is anchored to both, not just to UNSPSC on its own."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a }
  }))
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "UNSPSC Classification", item: `${siteConfig.url}/unspsc` },
    { "@type": "ListItem", position: 3, name: "AI UNSPSC Classification Guide", item: PAGE_URL }
  ]
};

export default function UnspscAiGuidePage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        eyebrow="AI UNSPSC Classification Guide"
        title="You have a large Excel catalog. You want AI to classify it into UNSPSC."
        lead="That is the request we hear most often, sometimes as a spend file that has never carried a code, sometimes as a stack of PDF invoices that has not even become a spend file yet. This guide describes the actual process: how Pearstop turns either starting point into a UNSPSC-coded dataset, what a pilot measures before you commit to the full file, and why the classification does not come from simply asking a model what a code should be."
        actions={[
          { label: "Talk to sales", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "See the process", href: "#process", variant: "secondary" }
        ]}
      />

      <section id="starting-points">
        <div className="container">
          <SectionTitle
            eyebrow="Where you start"
            title="Where does your data start today?"
            lead="Two different situations walk in the door. Pearstop covers both, and does not ask you to do more than the step you actually need."
          />
          <div className="row" style={{ gap: "2rem", flexWrap: "wrap" }}>
            <div className="col-md-6" style={{ flex: "1 1 320px" }}>
              <div className="quote-card" style={{ height: "100%" }}>
                <div className="story-label">Starting point one</div>
                <h3 style={{ marginTop: "0.5rem" }}>PDF invoices, not yet structured</h3>
                <p className="light-copy">
                  Some clients hold years of purchasing history as scanned or exported PDF invoices and nothing else. Before any UNSPSC code is possible, that data has to become rows: supplier, description, quantity, unit price, date. Pearstop extracts the fields specified for invoices in your industry directly from the PDFs, so the output lands as a normal spend file rather than a folder of documents nobody can query.
                </p>
              </div>
            </div>
            <div className="col-md-6" style={{ flex: "1 1 320px" }}>
              <div className="quote-card" style={{ height: "100%" }}>
                <div className="story-label">Starting point two</div>
                <h3 style={{ marginTop: "0.5rem" }}>Already a CSV or Excel file</h3>
                <p className="light-copy">
                  Other clients already have a structured spend file, exported from SAP, Oracle, or a P2P system, or maintained by hand. If that is where you are, the PDF extraction step is skipped entirely and classification starts directly on the file you already have.
                </p>
              </div>
            </div>
          </div>
          <p className="light-copy" style={{ marginTop: "2rem", maxWidth: 760 }}>
            These are two separate workflows, not one all-or-nothing pipeline. If you only need the classification step, that is what you get. If you need both, PDF extraction runs first and classification runs on what comes out of it.
          </p>
        </div>
      </section>

      <section id="process" className="section-soft">
        <div className="container">
          <SectionTitle
            eyebrow="The process"
            title="What happens once your data is structured?"
            lead="From here the process is the same regardless of which starting point you came from."
          />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Build a taxonomy anchored to UNSPSC</h3>
              <p>We generate a four-level procurement taxonomy for your spend and anchor it to the official UNSPSC hierarchy, and to NACE where your sector calls for it. This taxonomy is what every line will eventually sit under, not just a code returned per row.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">2</div>
              <h3>Classify a free sample of about 500 rows</h3>
              <p>We run a representative sample of roughly 500 rows through the engine as a pilot, at no cost. That is small enough to review by hand and large enough to show real accuracy, not a handful of easy examples.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>You review and correct</h3>
              <p>Your team checks the sample against what you know about your own data and corrects what is wrong. This step is where the real signal comes from: not whether the engine can produce a code, but whether your own procurement people agree with it.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">4</div>
              <h3>Corrections become supplier-specific memory</h3>
              <p>Every correction is stored against the supplier and the description pattern that produced it. The system remembers, for example, that this supplier&rsquo;s &lsquo;gloves&rsquo; line is always cleaning gloves, not medical gloves, without needing that spelled out again.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">5</div>
              <h3>The full dataset is classified using that memory</h3>
              <p>With the pilot corrected and the memory in place, we run classification across the full file. Lines that match a known supplier pattern go through with the memory already applied. New patterns still go through the same rules, keyword checks, and LLM layer the pilot did.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">6</div>
              <h3>Export to Excel, or connect directly to your ERP</h3>
              <p>Results come back as an Excel file, or through a direct API connection into your ERP, so the classified data lands where your team already works rather than in a separate tool.</p>
            </article>
          </div>
          <div className="quote-card" style={{ marginTop: "2rem" }}>
            <div className="story-label">The advantage</div>
            <p className="light-copy" style={{ marginBottom: 0 }}>
              Every line gets the full hierarchy, not a bare code: segment, family, class, and the actual 8-digit UNSPSC commodity code, each with its title in plain language, so a reviewer can see what a code means without looking it up separately.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row" style={{ alignItems: "flex-start", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-7">
              <div className="benefit-eyebrow">Why this is reliable</div>
              <h2>Why not just ask ChatGPT for the code?</h2>
              <p className="light-copy">
                Paste a description into a general model and ask for a UNSPSC code, and it will give you one. It will also give you one when no real code fits well, because a language model answers the question it is asked rather than admitting it does not know. That is a hallucinated code: confident, specific, and hard to catch on a spreadsheet full of them.
              </p>
              <p className="light-copy">
                Pearstop does not ask a model for a code and take the answer. The description goes through an AI and LLM classification layer, but the code that layer proposes is then checked against the real UNSPSC dataset itself, every segment, family, class and commodity, before it is accepted. If a proposed code does not exist in the actual standard, it is rejected rather than shown as a result.
              </p>
              <p className="light-copy">
                Alongside that check, deterministic keyword rules catch the patterns that do not need a model at all. A supplier-specific database narrows the field before classification starts, the same way knowing a supplier sells electrical components rules out irrigation parts. Supplier-specific memory, built from your own reviewed corrections, means the second time a pattern appears, it does not need to be reasoned through from scratch. And where your own data already carries some category structure, purchase groups, GL codes, existing tags, that structure is used to narrow and check the result, rather than starting from zero as if the file had no history.
              </p>
            </div>
            <div className="col-md-4" style={{ marginLeft: "auto" }}>
              <div className="quote-card">
                <div className="story-label">What is left</div>
                <p className="light-copy" style={{ marginBottom: 0 }}>
                  What is left after rules, the supplier database, memory, and validation still gets a confidence check. Anything low confidence is flagged for a person, not returned as fact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <SectionTitle
            eyebrow="Running a pilot"
            title="What should you actually check in a pilot?"
            lead="If you are testing this, we would always recommend measuring three things, not just whether it &lsquo;worked&rsquo;."
          />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon" style={{ fontSize: "2rem", fontWeight: 700 }}>%</div>
              <h3>UNSPSC accuracy percentage</h3>
              <p>The share of sampled rows where the code returned matches what your own reviewers would have chosen.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon" style={{ fontSize: "2rem", fontWeight: 700 }}>÷</div>
              <h3>Auto-classified vs flagged for review</h3>
              <p>The split between rows the engine was confident enough to complete on its own, and rows it flagged for a person. A pilot that auto-classifies everything with nothing flagged is not more accurate. It is just not checking itself.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon" style={{ fontSize: "2rem", fontWeight: 700 }}>8</div>
              <h3>Depth reached in the hierarchy</h3>
              <p>Whether the result lands at segment, family, class, or the full 8-digit commodity level. A code that only reaches segment tells you this was a maintenance service. A code that reaches commodity tells you it was elevator maintenance specifically, the level you need to benchmark suppliers or feed an ERP field that expects a real commodity code.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="benefit-eyebrow">Economics</div>
              <h2>Why does cost per record go down as volume goes up?</h2>
              <p className="light-copy">
                Every row that goes through a fresh LLM call costs tokens, and token use is what drives the cost of AI classification. Early in a dataset, most rows are new: new suppliers, new part descriptions, nothing in memory yet to shortcut the reasoning.
              </p>
              <p className="light-copy">
                That changes as volume grows. Supplier-specific memory means a description pattern only needs a full LLM pass once. After that correction is stored, the same supplier&rsquo;s recurring patterns are matched against memory rather than reasoned through again. At small volume, almost nothing repeats, so almost every row costs full price. At large volume, the same suppliers and the same part descriptions come back constantly, so a shrinking share of rows need a fresh model call at all. Cost per record falls because the system does less new reasoning per record, not because of a lower price per token.
              </p>
            </div>
          </div>
        </div>
      </section>

      <UnspscLookupCta />

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h2 style={{ marginBottom: "1.5rem" }}>Is this what you actually need?</h2>
              <div className="quote-card" style={{ marginBottom: "1.25rem" }}>
                <p style={{ marginBottom: 0 }}>You need 100,000 procurement transactions turned into one consistent taxonomy aligned to UNSPSC. That is exactly what this is built for.</p>
              </div>
              <div className="quote-card">
                <p style={{ marginBottom: 0 }}>You need every SKU or line carrying an actual 8-digit UNSPSC code you can load into your ERP. That is exactly what this is built for, too.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock
                title="How does AI UNSPSC classification actually work?"
                copy="AI UNSPSC classification takes a procurement description, whether from a structured spend file or extracted from a PDF invoice, and assigns it the correct 8-digit UNSPSC commodity code. Done well, it does not mean asking a language model for a code and trusting the answer. Pearstop's engine proposes a code with an LLM layer, then validates that code against the real UNSPSC dataset before accepting it, combines that with deterministic keyword rules and a supplier-specific database, and stores every human correction as supplier-specific memory so the same pattern does not need reasoning through twice. A free pilot of roughly 500 rows lets a customer check accuracy, the auto-classified versus flagged-for-review split, and how deep the result reaches into the four-level hierarchy, before the same process runs across a full dataset."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h2 style={{ marginBottom: "1.5rem" }}>Frequently asked questions</h2>
              <Faq items={FAQ_ITEMS} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="story-label" style={{ marginBottom: "1rem" }}>More UNSPSC resources</div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/unspsc" className="btn btn-secondary">
                  UNSPSC Classification
                </Link>
                <Link href="/unspsc-code-lookup" className="btn btn-secondary">
                  Free UNSPSC Code Lookup
                </Link>
                <Link href="/unspsc-classification-demo" className="btn btn-secondary">
                  UNSPSC Taxonomy Tree
                </Link>
                <Link href="/faq" className="btn btn-secondary">
                  Full FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to see this run against your own data?"
        lead="Talk to sales, or test a single description on the free lookup tool first."
        actions={[
          { label: "Talk to sales", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "Try the free lookup", href: "/unspsc-code-lookup", variant: "secondary" }
        ]}
      />
    </>
  );
}
