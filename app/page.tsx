import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  CTABand,
  GeoBlock,
  PageHero,
  QuoteBox,
  SectionTitle
} from "@/components/content";
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
    url: siteConfig.url
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
    href: "/cases#spie",
    src: siteConfig.assets.clients.spie,
    alt: "SPIE"
  },
  {
    href: "/cases",
    src: siteConfig.assets.clients.kelpBlue,
    alt: "Kelp Blue"
  }
];

export default function HomePage() {
  return (
    <>
      <Script
        id="home-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
            email: siteConfig.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: "CHQ Building, Custom House Quay",
              addressLocality: "Dublin",
              postalCode: "D01 Y6H7",
              addressCountry: "IE"
            },
            sameAs: [siteConfig.socials.linkedin, siteConfig.socials.youtube, siteConfig.socials.instagram]
          })
        }}
      />

      <PageHero
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
          { label: "Book a 7-minute discovery", href: "/contact", variant: "primary" },
          { label: "See how it works", href: "#how-it-works", variant: "secondary" }
        ]}
      />

      <section className="lm-band" aria-label="Free resource">
        <div className="container">
          <div className="lm-inner">
            <div className="lm-img-wrap">
              <img
                src={siteConfig.assets.leadMagnet}
                alt="Whitepaper: How hard services companies use spend data to negotiate better contracts"
              />
            </div>
            <div className="lm-text">
              <h2>Free Whitepaper</h2>
              <p>How hard services companies use spend data to negotiate better contracts - a practical guide to building a spend baseline your procurement team can act on.</p>
              <Link href="/whitepaper" className="btn btn-primary">
                Download free ↓
              </Link>
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
            lead="Structured to be low-risk, with a clear output at every step."
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
              <p>The system automatically cleans up to 95% of errors and inconsistencies. Items that fall outside confident thresholds get flagged for your team to review - so you stay in control without doing the grunt work. Every human decision feeds back into the system.</p>
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
            <div className="lm-img-wrap">
              <img
                src={siteConfig.assets.home.demo}
                alt="Schedule a Pearstop demo"
              />
            </div>
            <div className="lm-text">
              <h2>Schedule a Demo</h2>
              <p>In 30 minutes we will show you where your data is costing you margin and exactly what a fix looks like. No slides. Just your industry, your numbers, your data.</p>
              <Link href="/contact" className="btn btn-primary">
                Book a 7-minute discovery
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft" aria-labelledby="solutions-heading">
        <div className="container">
          <SectionTitle
            eyebrow="Our Solutions"
            title="What Pearstop does for your business"
            lead="Six core capabilities that give you control over your data, your costs, and your margins."
          />

          <div className="bene-cards">
            <article className="bene-card">
              <h3>Data Quality & Categorisation</h3>
              <p>Clean, structured, consistently categorised data - automatically. The foundation everything else is built on.</p>
              <Link className="bene-link" href="/unspsc">
                UNSPSC → How we clean data →
              </Link>
            </article>
            <article className="bene-card">
              <h3>Asset Management Optimisation</h3>
              <p>Structured asset data that enables predictive maintenance, smarter lifecycle decisions, and reliable bidding.</p>
              <Link className="bene-link" href="/asset-data-management">
                Value out of asset data →
              </Link>
            </article>
            <article className="bene-card">
              <h3>Procurement & Tenders</h3>
              <p>Know exactly what you are buying, from whom, and at what cost - so you can negotiate better contracts and price tenders with confidence.</p>
              <Link className="bene-link" href="/procurement-data-quality">
                Improve your spend visibility →
              </Link>
            </article>
            <article className="bene-card">
              <h3>Fabric Ready</h3>
              <p>Prepare your data for Microsoft Fabric migration. Clean, structured data that lands cleanly from day one - no rework after migration.</p>
              <Link className="bene-link" href="/fabric">
                Get Fabric ready →
              </Link>
            </article>
            <article className="bene-card">
              <h3>AI Readiness</h3>
              <p>Build the data foundation your AI initiatives need. Organisations with governed, structured data are twice as likely to achieve measurable AI ROI within 12 months.</p>
              <Link className="bene-link" href="/ai-readiness">
                Get AI ready →
              </Link>
            </article>
            <article className="bene-card">
              <h3>Data Quality</h3>
              <p>Clean, standardise, and enrich operational data - procurement, assets, invoices, and more - giving your teams a single source of truth they can actually act on.</p>
              <Link className="bene-link" href="/data-quality">
                See the workflow →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock
                title="What is procurement data quality and why do hard services companies need it?"
                copy="Hard services, construction, and infrastructure companies manage purchasing across dozens of sites and suppliers. Invoice data arrives in different formats, supplier names are inconsistent, and spend categories are never applied the same way twice. The result is that category management, the core job of any procurement team, becomes impossible. Pearstop automates the cleaning and classification of this data so procurement teams can see what they are buying, from whom, and at what price - and act on it."
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="blog-heading">
        <div className="container">
          <SectionTitle
            eyebrow="From the Blog"
            title="Latest Insights"
            lead="Practical guides, industry analysis, and data quality thinking for technical businesses."
          />

          <div className="article-grid">
            <article className="blog-card">
              <div className="blog-img-wrap" style={{ background: "#E8E0FC", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--purple)" }}>
                Coming soon
              </div>
              <div className="blog-body">
                <span className="blog-tag">Insights</span>
                <h3 className="blog-title">
                  <Link href="/blog">Articles publishing soon</Link>
                </h3>
                <Link className="blog-read" href="/blog">
                  Visit the blog →
                </Link>
              </div>
            </article>
            <article className="blog-card">
              <div className="blog-img-wrap" style={{ background: "#DCE1F8", display: "flex", alignItems: "center", justifyContent: "center", color: "#7A8BE6" }}>
                Coming soon
              </div>
              <div className="blog-body">
                <span className="blog-tag">Podcast</span>
                <h3 className="blog-title">
                  <Link href="/blog">The Data Edge Podcast - listen on Spotify</Link>
                </h3>
                <Link className="blog-read" href="/blog">
                  Listen on Spotify →
                </Link>
              </div>
            </article>
            <article className="blog-card">
              <div className="blog-img-wrap" style={{ background: "#E8E0FC", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--purple)" }}>
                Coming soon
              </div>
              <div className="blog-body">
                <span className="blog-tag">Insights</span>
                <h3 className="blog-title">
                  <Link href="/blog">More articles on the way</Link>
                </h3>
                <Link className="blog-read" href="/blog">
                  Visit the blog →
                </Link>
              </div>
            </article>
          </div>

          <div className="text-center" style={{ marginTop: "1.8rem" }}>
            <Link href="/blog" className="btn btn-outline">
              View all articles
            </Link>
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Ready to reduce risk?"
        title="Let's talk about the data problem costing you margin."
        lead="Tell us what is slowing your team down. We will show you the quickest path to a clean baseline and the business value on the other side."
        actions={[
          { label: "Get in touch", href: "/contact", variant: "primary" },
          { label: "Book a 7-minute discovery", href: "/contact", variant: "secondary" }
        ]}
      />
    </>
  );
}
