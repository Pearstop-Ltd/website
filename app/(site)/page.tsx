import { CalendlyButton } from "@/components/calendly-button";
import type { Metadata } from "next";
import Link from "next/link";
import { GeoBlock, PageHero, QuoteBox, SectionTitle } from "@/components/content";
import { homeBenefits, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pearstop - Data Quality Solutions for Hard Services",
  description:
    "Pearstop cleans and classifies procurement and asset data for hard services companies. We process 35,000 procurement lines a month, automatically.",
  alternates: {
    canonical: siteConfig.url
  },
  openGraph: {
    title: "Pearstop - Data Quality Solutions for Hard Services",
    description:
      "Pearstop cleans and classifies procurement and asset data for hard services companies. We process 35,000 procurement lines a month, automatically.",
    url: siteConfig.url,
    images: ["/opengraph-image"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pearstop - Data Quality Solutions for Hard Services",
    description:
      "Pearstop cleans and classifies procurement and asset data for hard services companies. We process 35,000 procurement lines a month, automatically.",
    images: ["/opengraph-image"]
  }
};

const clientLogos = [
  {
    href: "/cases#strukton",
    src: siteConfig.assets.clients.strukton,
    alt: "Strukton"
  },
  {
    href: "/cases#fmo",
    src: siteConfig.assets.clients.fmo,
    alt: "FMO"
  },
  {
    href: "/cases#faro",
    src: siteConfig.assets.clients.faro,
    alt: "FARO"
  },
  {
    href: "/cases",
    src: siteConfig.assets.clients.kelpBlue,
    alt: "Kelp"
  }
];

const solutionCards = [
  {
    title: "Data Quality & Categorisation",
    copy: "Clean, structured, consistently categorised data, automatically. The foundation everything else is built on.",
    href: "/unspsc",
    linkText: "UNSPSC → How we clean data →"
  },
  {
    title: "Asset Management Optimisation",
    copy: "Structured asset data that enables predictive maintenance, smarter lifecycle decisions, and reliable bidding.",
    href: "/asset-data-management",
    linkText: "Value out of asset data ->"
  },
  {
    title: "Procurement & Tenders",
    copy: "Know exactly what you are buying, from whom, and at what cost, so you can negotiate better contracts and price tenders with confidence.",
    href: "/procurement-data-quality",
    linkText: "Improve your spend visibility →"
  },
  {
    title: "AI & Reporting Readiness",
    copy: "Your data, ready for Microsoft Fabric, dashboards, and AI tools, without the clean-up project that usually comes first.",
    href: "/ai-readiness",
    linkText: "Get AI ready →"
  }
];


export default function HomePage() {
  return (
    <>
      <PageHero
        className="hero-tall"
        eyebrow="Data Quality Solutions"
        title={
          <>
            We classify 35,000 procurement lines a month.
            <br />
            Automatically.
          </>
        }
        videoUrl={siteConfig.assets.heroVideo}
        videoPoster={siteConfig.assets.heroVideoPoster}
        lead="Pearstop cleans and classifies procurement and asset data for hard services companies so you can negotiate better contracts, plan maintenance smarter, and stop doing it manually. Category management that works."
        actions={[
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "See how it works", href: "#how-it-works", variant: "secondary" }
        ]}
      />

      <section className="lm-band" aria-label="Case studies download">
        <div className="container">
          <div className="lm-inner">
            <div className="lm-img-wrap">
              <img
                src={siteConfig.assets.leadMagnet}
                alt="Pearstop case studies"
              />
            </div>
            <div className="lm-text">
              <h2>Download the case studies</h2>
              <p>See how Strukton, FARO, SPIE, and FMO use Pearstop to clean data, protect margin, and reduce manual work.</p>
              <div className="hero-actions" style={{ justifyContent: "flex-start", marginTop: "1rem" }}>
                <Link href="/case-studies" className="btn btn-primary">
                  Get the case studies
                </Link>
                <a href={siteConfig.downloads.caseStudiesView} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                  View in browser
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="clients-strip" aria-label="Trusted by">
        <div className="container">
          <p className="clients-label">Trusted by leading organisations</p>
          <div className="clients-logos">
            {clientLogos.map((logo) => (
              <Link key={logo.alt} href={logo.href} aria-label={`${logo.alt} case study`}>
                <img src={logo.src} alt={logo.alt} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="How Pearstop helps">
        <div className="container">
          {homeBenefits.map((benefit, index) => (
            <div className={`benefit-block ${index % 2 === 1 ? "reverse" : ""}`} key={benefit.title}>
              <div className="benefit-block-text">
                <div className="benefit-eyebrow">
                  {index === 0 ? "Procurement" : index === 1 ? "Asset Management" : "Operations"}
                </div>
                <h2>{benefit.title}</h2>
                <p className="benefit-lead">
                  <strong>{benefit.copy.split(". ")[0]}.</strong> {benefit.copy.split(". ").slice(1).join(". ")}
                </p>
                <p>
                  <Link href={benefit.href}>
                    {index === 0
                      ? "See how UNSPSC classification works →"
                      : index === 1
                        ? "See how asset data management works →"
                        : "See how data quality works →"}
                  </Link>
                </p>
                <QuoteBox
                  quote={
                    index === 0
                      ? "We used to have two full-time staff working on category assignment. Now the system does this for us - which has unlocked margin estimations further down the line too. It's more reliable at a fraction of the cost."
                      : index === 1
                        ? "Our asset lists worked for mechanics on-site, but did not allow us to plan smart maintenance or manage bid risk in a data-driven way."
                        : "It would have taken five engineers and a full year to clean this up. So we decided to look for a better solution."
                  }
                  author={index === 0 ? "Head of Procurement" : index === 1 ? "Asset Manager" : "Head of Operations"}
                  role={index === 0 ? "Infrastructure Contractor" : index === 1 ? "Facilities Management" : "Technical Services"}
                />
              </div>
              <div className="benefit-block-image">
                <img
                  src={
                    index === 0
                      ? siteConfig.assets.home.spendControl
                      : index === 1
                        ? siteConfig.assets.home.assetManagement
                        : siteConfig.assets.home.scaleConfidence
                  }
                  alt={benefit.title}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="section-soft" aria-labelledby="hiw-heading">
        <div className="container">
          <SectionTitle
            eyebrow="How It Works"
            title="From messy data to a foundation you can act on"
            lead="From messy data to a foundation you can act on — in three stages."
          />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <div className="hiw-stage-label">Stage 1</div>
              <h3>Data Stability Baseline</h3>
              <p>We start with the data you already have. We assess its structure, identify gaps, and deliver one cleaned dataset that is yours to keep - plus a clear report on what needs to happen next. No commitment beyond this step.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <div className="hiw-stage-label">Stage 2</div>
              <h3>Automated Quality Control</h3>
              <p>The system automatically cleans up to 95% of errors and inconsistencies. Items that fall outside confident thresholds get flagged for your team to review — so you stay in control without doing the grunt work. Every human decision feeds directly back into the system, improving accuracy over time.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <div className="hiw-stage-label">Stage 3</div>
              <h3>Ongoing Data Integrity</h3>
              <p>The system learns from your data and your team's input over time. The more it runs, the less manual review is needed. Your data stays clean, structured, and ready to use - without a dedicated team to maintain it.</p>
            </article>
          </div>
          <div className="text-center" style={{ marginTop: "2.2rem" }}>
            <Link href="/contact" className="btn btn-primary">
              Start with a Data Quality Baseline →
            </Link>
          </div>
        </div>
      </section>

      <section className="lm-band" aria-label="Book a demo">
        <div className="container">
          <div className="lm-inner">
            <div className="lm-text">
              <h2>Schedule a Personal Demo</h2>
              <p>In 30 minutes we'll show you where your data is costing you margin and exactly what a fix looks like. No slides. Just your industry, your numbers, your data.</p>
              <div className="hero-actions" style={{ justifyContent: "flex-start", marginTop: "1.25rem" }}>
            <CalendlyButton label="Book your demo" className="btn btn-primary" />
                <Link href="/contact" className="btn btn-secondary">
                  Email us instead
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft" aria-labelledby="solutions-heading">
        <div className="container">
          <SectionTitle
            eyebrow="Our Solutions"
            title="What Pearstop does for your business"
            lead="Four core capabilities that give you control over your data, your costs, and your margins."
          />

          <div className="bene-cards">
            {solutionCards.map((card) => (
              <article className="bene-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <Link className="bene-link" href={card.href}>
                  {card.linkText}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-soft" aria-labelledby="home-geo-heading">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock
                title="What does Pearstop do?"
                copy="Pearstop helps facilities management, infrastructure, and hard services companies clean procurement and asset data so teams can see what they are buying, plan maintenance more reliably, and feed trustworthy data into AI and reporting tools. If you need one plain answer for search or AI tools, it is this: we turn messy operational data into something your business can actually use."
              />
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
