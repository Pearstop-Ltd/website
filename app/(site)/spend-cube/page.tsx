import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CTABand, GeoBlock, PageHero, QuoteBox, SectionTitle } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI-Built Spend Cubes & Procurement Dashboards",
  description:
    "A spend cube classified and structured by category, supplier, and time, ready to feed Power BI, Microsoft Fabric, or your own dashboard, built in days instead of a manual quarter-long project.",
  alternates: {
    canonical: `${siteConfig.url}/spend-cube`,
    languages: alternateLanguages("/spend-cube")
  }
};

const FAQ_ITEMS = [
  {
    q: "What is a spend cube?",
    a: "A spend cube is spend data structured across multiple dimensions, typically category, supplier, and time or site, so you can drill from a total figure down into what's actually driving it. It's the structure most procurement dashboards are built on top of."
  },
  {
    q: "Can this feed Power BI or Microsoft Fabric?",
    a: "Yes. Output is delivered in the structure your existing BI tool already expects, so it plugs into a Power BI or Fabric dashboard rather than requiring a new platform."
  },
  {
    q: "How often is the data refreshed?",
    a: "New spend is classified the same way as it arrives, so the cube stays current continuously rather than being rebuilt as a one-off project."
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

export default function SpendCubePage() {
  return (
    <>
      <Script id="spendcube-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PageHero
        eyebrow="Spend Cube & Dashboards"
        title="A spend cube built in days, not a manual quarter-long project"
        lead="A spend cube is only useful if it's built on classified, consistent data and stays current. Pearstop classifies your spend once and keeps classifying it as new invoices and purchase orders arrive, so the cube, and whatever dashboard sits on top of it, doesn't go stale the week after it's delivered."
        actions={[
          { label: "Talk to sales", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "See how it works", href: "#how-it-works", variant: "secondary" }
        ]}
      />

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="benefit-eyebrow">The Problem</div>
              <h2>The dashboard is only as good as what's underneath it</h2>
              <p className="light-copy">
                Building a spend cube by hand means classifying years of invoice lines and purchase orders into consistent categories and suppliers before any dashboard can be built on top. Most teams either never finish it, or finish it once and watch it go stale the moment new spend arrives in the old, unclassified format.
              </p>
              <ul className="ind-pains">
                <li>
                  <span className="ind-ok">×</span>
                  <div>Manual spend-cube builds take a quarter or more, and are out of date again within weeks</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Dashboarding tools show whatever&rsquo;s underneath them; if the categories aren&rsquo;t consistent, the chart just displays the mess faster</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>New spend keeps arriving in whatever format the source system produces, so the cube needs constant manual upkeep to stay current</div>
                </li>
                <li>
                  <span className="ind-ok">×</span>
                  <div>Multi-site or multi-entity spend rarely shares the same category logic, so cross-site comparison breaks down</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-soft">
        <div className="container">
          <SectionTitle eyebrow="The Problem" title="From classified spend to a live cube" lead="The classification pipeline structures your spend along the dimensions a cube actually needs, then keeps it current." />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Classify by category and supplier</h3>
              <p>Every line is matched to a consistent category (UNSPSC or your own taxonomy) and a canonical supplier name, the two dimensions most spend cubes break on first.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>Structure the cube</h3>
              <p>Classified spend is structured across category, supplier, site or entity, and time, ready to load into a BI tool or dashboard.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>Feed your existing tools</h3>
              <p>Output lands in the format Power BI, Microsoft Fabric, or your own BI stack already expects, so the dashboard you build on it works from day one.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="What a live cube makes possible" />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>Drill down by category, not just total spend</h3>
              <p>See what's actually driving a number, down to the category and supplier, instead of a single top-line figure.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">≡</div>
              <h3>Compare across sites or entities</h3>
              <p>The same category means the same thing everywhere, so a cross-site or cross-entity comparison is actually comparing like with like.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>A dashboard that doesn't go stale</h3>
              <p>New spend is classified the same way as it arrives, so the cube, and any dashboard built on it, updates instead of drifting out of date.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock
                title="What is a spend cube and how is it different from a spend report?"
                copy="A spend cube is spend data structured across three or more dimensions, typically category, supplier, and time or site, so it can be sliced and compared rather than read as a single static report. A spend report answers one question at a time; a spend cube supports drilling from a total down to the category, supplier, or site driving it. Building one manually means classifying every invoice line and purchase order into consistent categories and suppliers first, which is where most manual spend-cube projects stall or go stale. Pearstop classifies spend continuously, so the cube it feeds into Power BI, Microsoft Fabric, or another BI tool stays current as new spend arrives, instead of being a one-off snapshot."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox
                quote="We've got all this information, but what are we using it for?"
                author="Commercial lead"
                role="Real estate & integrated FM"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <SectionTitle
            eyebrow="Further Reading"
            title="More on building a spend cube"
            lead="A closer look at the framework this page's pipeline is built on."
          />
          <div className="row" style={{ gap: "2rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="quote-card" style={{ height: "100%" }}>
                <div className="story-label">The spend cube framework, executed with AI</div>
                <p className="light-copy">
                  The classic three-dimension spend cube, adapted for an AI classification pipeline: what changes in speed, cost, and staying power after delivery day.
                </p>
                <Link className="bene-link" href="/blog/spend-cube-execution-framework">
                  Read the article →
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="quote-card" style={{ height: "100%" }}>
                <div className="story-label">How to build a spend cube with AI</div>
                <p className="light-copy">
                  The five steps to building a spend cube, what data you need, and when a consultant is still the better choice than an AI classification pipeline.
                </p>
                <Link className="bene-link" href="/blog/how-to-build-a-spend-cube-with-ai">
                  Read the article →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h2 style={{ marginBottom: "1.5rem" }}>Frequently asked questions</h2>
              <div className="faq-list">
                {FAQ_ITEMS.map((item, i) => (
                  <details key={i} className="faq-item">
                    <summary className="faq-q">{item.q}</summary>
                    <p className="faq-a">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to see your own spend cube?"
        lead="Talk to sales and we'll show you what your spend data looks like structured into a cube, ready for your dashboard."
        actions={[{ label: "Talk to sales", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
