import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { GeoBlock, PageHero } from "@/components/content";
import { Faq, FaqSchema } from "@/components/blog";
import { SampleRequestModal } from "@/components/sample-request-modal";
import { alternateLanguages, siteConfig } from "@/lib/site";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pearstop",
  url: siteConfig.url,
  logo: `${siteConfig.url}/brand/logo-dark.webp`,
  description: siteConfig.description,
  email: siteConfig.email,
  areaServed: "Europe",
  sameAs: [
    siteConfig.socials.linkedin,
    siteConfig.socials.youtube,
    siteConfig.socials.instagram
  ],
  knowsAbout: [
    "UNSPSC Classification",
    "Procurement Data Quality",
    "Asset Data Management",
    "Spend Analysis",
    "Facilities Management Procurement"
  ]
};

export const metadata: Metadata = {
  title: "Pearstop - Know What You Buy, From Whom, At What Price",
  description:
    "Pearstop turns your invoices into spend data you can use. Send us 200 lines and we'll send them back labelled - no clean-up required first.",
  alternates: {
    canonical: siteConfig.url,
    languages: alternateLanguages("")
  },
  openGraph: {
    title: "Pearstop - Know What You Buy, From Whom, At What Price",
    description:
      "Pearstop turns your invoices into spend data you can use. Send us 200 lines and we'll send them back labelled - no clean-up required first.",
    url: siteConfig.url,
    images: ["/opengraph-image"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pearstop - Know What You Buy, From Whom, At What Price",
    description:
      "Pearstop turns your invoices into spend data you can use. Send us 200 lines and we'll send them back labelled - no clean-up required first.",
    images: ["/opengraph-image"]
  }
};

const clientLogos = [
  { href: "/cases#strukton", src: siteConfig.assets.clients.strukton, alt: "Strukton" },
  { href: "/cases#fmo", src: siteConfig.assets.clients.fmo, alt: "FMO" },
  { href: "/cases#faro", src: siteConfig.assets.clients.faro, alt: "FARO" },
  { href: "/cases", src: siteConfig.assets.clients.kelpBlue, alt: "Kelp" },
  { href: "/cases/spie", src: siteConfig.assets.clients.spie, alt: "SPIE" },
  { href: "https://www.lemtech.nl/", src: siteConfig.assets.clients.lemtech, alt: "LemTech", external: true }
];

const problemQuotes = [
  {
    quote: "Most companies are flying blind, and only find out when someone asks a question they cannot answer.",
    source: "Procurement Lead, Infrastructure"
  },
  {
    quote: "You cannot negotiate what you cannot see.",
    source: "Head of Procurement, Facilities Management"
  },
  {
    quote: "If you cannot defend your cost baseline, you are bidding on a feeling.",
    source: "Commercial Director, Construction"
  }
];

const beforeAfterRows = [
  { description: "PMP FLTR 20X24 CS/6", supplier: "AAF INTL", unspsc: "40161505", category: "Air filters", unifiedSupplier: "AAF International", confidence: "High" },
  { description: "FILTER,AIR,20X24,MERV8", supplier: "AAF FLANDERS", unspsc: "40161505", category: "Air filters", unifiedSupplier: "AAF International", confidence: "High" },
  { description: "Air Flt 20x24x2 (6/box)", supplier: "AAF", unspsc: "40161505", category: "Air filters", unifiedSupplier: "AAF International", confidence: "High" },
  { description: "GEN PURP CLNR 5L", supplier: "ISS FACILITY", unspsc: "47131805", category: "General purpose cleaners", unifiedSupplier: "ISS Facility Services", confidence: "High" },
  { description: "Multi-surface cleaner 5ltr", supplier: "ISS", unspsc: "47131805", category: "General purpose cleaners", unifiedSupplier: "ISS Facility Services", confidence: "High" },
  { description: "Additional hours", supplier: "M&P CONTRACTING", unspsc: "80111613", category: "Temporary manual labour", unifiedSupplier: "M&P Contracting Ltd", confidence: "Medium", inferred: true }
];

const whoTiles = [
  {
    title: "Facilities Management",
    copy: "Your data arrives from every service line in a different format.",
    href: "/industries#facilities-management"
  },
  {
    title: "Construction",
    copy: "You're estimating bids from memory because nobody can retrieve historical actuals.",
    href: "/industries#construction"
  },
  {
    title: "Infrastructure",
    copy: "A savings target has been named and the data can't show where it sits.",
    href: "/industries#infrastructure"
  },
  {
    title: "Manufacturing",
    copy: "One entity already runs UNSPSC and another needs to align to it.",
    href: "/industries#manufacturing"
  }
];

const proofCards = [
  {
    title: "Infrastructure Contractor",
    stat: "A named savings target",
    detail: "The data couldn't locate it. Pearstop made it visible.",
    href: "/cases",
    quote: "We used to have two full-time staff working on category assignment. Now the system does this for us – which has unlocked margin estimations further down the line too. It's more reliable at a fraction of the cost.",
    quoteRole: "Head of Procurement, Infrastructure"
  },
  {
    title: "Facilities Management Provider",
    stat: "100,000+ assets cleaned and resolved",
    detail: "93% automated. The remaining 7% routed to domain experts.",
    href: "/cases",
    quote: "Our asset lists worked for mechanics on-site, but did not allow us to plan smart maintenance or manage bid risk in a data-driven way.",
    quoteRole: "Asset Manager, Facilities Management"
  },
  {
    title: "Cleaning Services Company",
    stat: "Extraction accuracy: 70% → 99%",
    detail: "Moved from manual review to an ongoing subscription.",
    href: "/cases",
    quote: "It would have taken five engineers and a full year to clean this up. So we decided to look for a better solution.",
    quoteRole: "Head of Operations, Cleaning Services"
  }
];

const faqItems = [
  {
    q: "What is UNSPSC classification?",
    a: "UNSPSC is a global standard for categorising products and services into a consistent hierarchy. It lets you compare spend across suppliers, sites, and time periods using the same categories, instead of whatever free-text description each invoice happened to use."
  },
  {
    q: "How do you classify spend data that isn't clean?",
    a: "Your data doesn't need to be clean first - that's the work we do. We take invoices, ERP exports, portal downloads, or spreadsheets in whatever state they're in, and extract and classify every line automatically."
  },
  {
    q: "Can you extract data from PDF invoices?",
    a: "Yes. Pearstop reads PDF invoices, scanned documents, and portal exports directly, so you don't need a clean digital export to get started."
  },
  {
    q: "How accurate is automated spend classification?",
    a: "Around 95% of lines are classified automatically. The rest are flagged and routed to a human reviewer, so accuracy stays high without every line needing manual checking."
  },
  {
    q: "How long does spend classification take?",
    a: "A first sample of 200 lines is typically turned around within a few working days. Ongoing classification runs continuously as new invoices arrive."
  }
];

export default function HomePage() {
  return (
    <>
      <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <FaqSchema items={faqItems} slug="home" />

      <PageHero
        className="hero-tall hero-left"
        title={<>Know what you buy, from whom, at what price.</>}
        videoUrl={siteConfig.assets.heroVideo}
        videoPoster={siteConfig.assets.heroVideoPoster}
        lead={
          <>
            Your invoice data is full of answers. Pearstop makes them usable.{" "}
            <span className="hero-objection">Your data doesn&rsquo;t need to be cleaned first.</span> That&rsquo;s the
            work we do.
          </>
        }
        leadingAction={<SampleRequestModal label="Send us 200 lines" className="btn btn-primary" />}
        actions={[
          { label: "Talk to sales", href: siteConfig.calendly, variant: "secondary", external: true }
        ]}
      />

      <section className="clients-strip" aria-label="Trusted by">
        <div className="container">
          <p className="clients-label">Trusted by leading organisations</p>
          <div className="clients-logos">
            {clientLogos.map((logo) => (
              logo.external ? (
                <a key={logo.alt} href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={`${logo.alt} website`}>
                  <img src={logo.src} alt={logo.alt} />
                </a>
              ) : (
                <Link key={logo.alt} href={logo.href} aria-label={`${logo.alt} case study`}>
                  <img src={logo.src} alt={logo.alt} />
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      <section className="lm-band" aria-label="Free sample classification">
        <div className="container">
          <div className="lm-inner">
            <div className="lm-img-wrap">
              <img src={siteConfig.assets.leadMagnet} alt="Pearstop sample classification" />
            </div>
            <div className="lm-text">
              <h2>See it work on your own data</h2>
              <p>
                Send a representative sample of your invoice lines &mdash; up to 200 lines, or a handful of invoices (max
                10) &mdash; and we&rsquo;ll classify them and send them back labelled. No cost, no setup, nothing to
                install. It&rsquo;s the fastest way to see exactly what Pearstop does before you commit to anything.
              </p>
              <div className="hero-actions" style={{ justifyContent: "flex-start", marginTop: "1rem" }}>
                <SampleRequestModal label="Send us 200 lines" className="btn btn-primary" />
                <Link href="/case-studies" className="btn btn-outline">
                  See case studies first
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="problem-quotes" aria-label="What buyers tell us">
        <div className="container">
          <div className="problem-quote-grid">
            {problemQuotes.map((item) => (
              <div key={item.quote}>
                <p className="problem-quote">&ldquo;{item.quote}&rdquo;</p>
                <span className="problem-quote-source">{item.source}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-soft" aria-labelledby="hiw-heading">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "2.75rem" }}>
            <h2 id="hiw-heading">How it works</h2>
          </div>
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <div className="hiw-stage-label">Stage 1</div>
              <h3>Send us what you have</h3>
              <p>PDFs, ERP exports, portal downloads, spreadsheets. API connectors are available for most ERPs.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <div className="hiw-stage-label">Stage 2</div>
              <h3>We clean, enrich, and classify every line</h3>
              <p>
                We extract everything we can find on the line, fill in what&rsquo;s missing using supplier and
                purchasing history, and classify it to UNSPSC &mdash; down to the granularity that actually answers
                your questions, not just a top-level category.
              </p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <div className="hiw-stage-label">Stage 3</div>
              <h3>Your spend stays classified</h3>
              <p>As new invoices arrive, they're classified the same way - no re-cleaning project every year.</p>
            </article>
          </div>

          <div className="before-after-wrap">
            <table className="before-after-table">
              <thead>
                <tr>
                  <th colSpan={2}>As it arrives</th>
                  <th colSpan={4}>What Pearstop adds</th>
                </tr>
                <tr>
                  <th>Invoice description</th>
                  <th>Supplier</th>
                  <th>UNSPSC</th>
                  <th>Category</th>
                  <th>Unified supplier</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {beforeAfterRows.map((row, i) => (
                  <tr key={i}>
                    <td>{row.description}</td>
                    <td>{row.supplier}</td>
                    <td>{row.unspsc}</td>
                    <td>{row.category}{row.inferred ? <sup>*</sup> : null}</td>
                    <td>{row.unifiedSupplier}</td>
                    <td className={row.confidence === "Medium" ? "confidence-medium" : "confidence-high"}>
                      <span className="confidence-pill">{row.confidence}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="before-after-caption">
            Illustrative example: six invoice lines from three suppliers. The original description and supplier are
            kept exactly as they arrived &mdash; Pearstop only adds the columns on the right.
          </p>
          <p className="before-after-footnote">
            * Category inferred from additional data (purchase history and contract context), not stated directly on
            the invoice &mdash; flagged at medium confidence rather than high.
          </p>
        </div>
      </section>

      <section className="section-soft" aria-labelledby="demo-heading">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "2.75rem" }}>
            <h2 id="demo-heading">See it in action</h2>
          </div>
          <div className="screenshot-frame screenshot-frame--compact">
            <video autoPlay muted loop playsInline preload="none" poster={siteConfig.assets.productDemoVideoPoster}>
              <source src={siteConfig.assets.productDemoVideo} type="video/mp4" />
            </video>
          </div>
          <p className="screenshot-caption">
            How Pearstop extracts, classifies, and normalizes supplier and spend data.
          </p>
        </div>
      </section>

      <section className="section-soft" aria-labelledby="who-heading">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "2.75rem" }}>
            <h2 id="who-heading">Who it's for</h2>
          </div>
          <div className="who-grid">
            {whoTiles.map((tile) => (
              <article className="ind-card quote-card" key={tile.title}>
                <h3>{tile.title}</h3>
                <p>{tile.copy}</p>
                <Link className="ind-card-link" href={tile.href}>
                  See how it applies →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Common objections">
        <div className="container">
          <div className="objections-grid">
            <div className="objection-block">
              <h2>&ldquo;Our data isn&rsquo;t clean enough for this.&rdquo;</h2>
              <p>
                That's the most common thing we hear &mdash; and it's the reason to start now rather than wait. Cleaning
                the data is the first thing Pearstop does, not a prerequisite for working with us.
              </p>
            </div>
            <div className="objection-block">
              <h2>&ldquo;Won&rsquo;t it be cheaper to build this ourselves?&rdquo;</h2>
              <p>
                In-house gives you complete control, but expect to dedicate two data or AI specialists to build it
                properly and keep maintaining it as your data changes. We've seen an internal build start as an IT
                team's side project, ship without procurement involved, and turn into a spreadsheet nobody owns within
                months. Pearstop is that system already built &mdash; with a team whose only job is to keep developing
                it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft" aria-labelledby="proof-heading">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "2.75rem" }}>
            <h2 id="proof-heading">Cases</h2>
          </div>
          <div className="bene-cards">
            {proofCards.map((card) => (
              <article className="bene-card" key={card.title}>
                <h3>{card.title}</h3>
                <p><strong>{card.stat}.</strong> {card.detail}</p>
                <p className="proof-quote">
                  &ldquo;{card.quote}&rdquo;
                  <span className="proof-quote-role">{card.quoteRole}</span>
                </p>
                <Link className="bene-link" href={card.href}>
                  Read the case →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dark ccta-dark">
        <div className="container">
          <div className="text-center">
            <h2>Send us 200 lines. We will send them back labelled.</h2>
            <div className="ccta-btns">
              <SampleRequestModal label="Send your sample" className="btn btn-primary" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="home-standalone-faq-heading">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="text-center" style={{ marginBottom: "0.75rem" }}>
                <span className="pill">The question we get most</span>
              </div>
              <div className="quote-card" style={{ textAlign: "center" }}>
                <h2 id="home-standalone-faq-heading" style={{ marginBottom: "0.75rem" }}>
                  We already tried ChatGPT or Copilot on our data - why would this be different?
                </h2>
                <p className="light-copy">
                  Because Pearstop isn&rsquo;t a general-purpose AI tool pointed at your data - it&rsquo;s a
                  dedicated pipeline built specifically for procurement and asset data: deterministic matching
                  first, a large language model for the genuinely ambiguous cases, and a human review step for
                  anything still uncertain. Teams who&rsquo;ve tried a general AI tool on messy spend data
                  consistently find it works fine in a quick trial and breaks down at real volume. Pearstop is
                  built to hold up at that volume, not just in a demo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft" aria-labelledby="home-faq-heading">
        <div className="container">
          <Faq items={faqItems} heading="Frequently asked questions" />
        </div>
      </section>

      <section className="section-soft" aria-labelledby="home-geo-heading">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock
                title="What does Pearstop do?"
                copy="Pearstop helps facilities management, infrastructure, and hard services companies clean procurement and asset data so teams can see what they are buying, plan maintenance more reliably, and feed trustworthy data into AI and reporting tools. If you need one plain answer, it is this: we turn messy operational data into something your business can actually use."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
