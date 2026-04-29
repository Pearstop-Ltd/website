import type { Metadata } from "next";
import Link from "next/link";
import { CTABand, GeoBlock, PageHero, SectionTitle } from "@/components/content";
import { industryCards, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Pearstop works with facilities management, construction, infrastructure, manufacturing, and building technology companies. Each industry has different data challenges - we have solved them all.",
  alternates: {
    canonical: `${siteConfig.url}/industries`
  }
};

const details = [
  {
    id: "hard-services",
    title: "Hard Services (FM)",
    copy: "Stop losing margin to knowledge gaps and poor data.",
    points: [
      "Workforce knowledge loss as experienced staff retire",
      "Low-margin contract execution",
      "Digital transformation stalling without clean data"
    ]
  },
  {
    id: "construction",
    title: "Construction",
    copy: "Improve margin accuracy before the project starts.",
    points: [
      "Inaccurate procurement and materials cost estimates",
      "People cost data too fragmented to rely on",
      "No reliable spend baseline across projects"
    ]
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    copy: "Better data. Tighter margins.",
    points: [
      "Inaccurate bills of materials",
      "Fragmented supplier and parts data",
      "Slow quoting and bid preparation"
    ]
  },
  {
    id: "soft-services",
    title: "Soft Services (FM)",
    copy: "Know where fixed-price contracts are creating margin pressure before you sign.",
    points: [
      "Fixed-price contracts creating margin pressure",
      "Need to show operational value beyond basic delivery",
      "Service data spread across multiple client workstreams"
    ]
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    copy: "Critical asset reliability starts with data clarity.",
    points: [
      "Unreliable asset data leading to unexpected failures",
      "Rising material costs eroding contract margins",
      "Pricing squeeze with no data leverage"
    ]
  },
  {
    id: "building-tech",
    title: "Building Technology",
    copy: "Move beyond commoditisation and turn digitalisation into an advantage.",
    points: [
      "Acquisitions that need data integration fast",
      "Reporting that needs a single clean source",
      "Tools that underdeliver when data quality is weak"
    ]
  }
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Six industries. One platform."
        lead="Pearstop delivers data integrity solutions for the industries that build, maintain, and operate our world. From facilities management to infrastructure - we clean messy data so your margins can breathe."
      />

      <section>
        <div className="container">
          <SectionTitle title="Six industries, one solution" lead="Every industry has unique data challenges. Pearstop solves them all." />
          <div className="industry-grid">
            {industryCards.map((card) => (
              <article key={card.title} className="ind-card">
                <div className="ind-card-icon">●</div>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <Link className="ind-card-link" href={card.href}>
                  Learn more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {details.map((detail, index) => (
        <section key={detail.id} id={detail.id} className={index % 2 ? "bg-soft" : ""}>
          <div className="container">
            <div className={`ind-detail-inner ${index % 2 ? "reverse" : ""}`}>
              <div className="ind-detail-text">
                <div className="ind-detail-eyebrow">{detail.title}</div>
                <h2>{detail.copy}</h2>
                <ul className="ind-pains">
                  {detail.points.map((point) => (
                    <li key={point}>
                      <span className="ind-pains-icon">×</span>
                      <div>
                        <strong>{point}</strong>
                        <p>
                          Pearstop helps technical teams turn this into reliable procurement, asset, and operational data that can be acted on.
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ind-detail-aside">
                <div className="quote-card">
                  <div className="story-label">What changes with Pearstop</div>
                  <p>Clean data you can trust, less manual rework, and better decisions across teams and systems.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section>
        <div className="container">
          <div className="ind-wide-banner">
            <h3>Working in a different industry?</h3>
            <p>Data quality problems are not unique to the industries above. If your teams are managing complex operational data, dealing with inconsistent supplier records, or preparing for a digital transformation, the chances are we can help. Let's find out.</p>
            <Link href="/contact" className="btn btn-primary">
              Book a 7-minute discovery →
            </Link>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock
                title="Why do technical industries struggle with data quality?"
                copy="Hard services, construction, infrastructure, and manufacturing companies share a common challenge: operational data that is decentralised, inconsistent, and difficult to use across teams and systems. Poor procurement data quality, unreliable asset registers, and unclassified spend are the most common blockers to category management, predictive maintenance, and digital transformation in these industries. Pearstop specialises in cleaning and structuring this operational data so technical businesses can act on it."
              />
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to clean your data?"
        lead="Whichever industry you are in, Pearstop has solved your data problem before."
        actions={[
          { label: "Book a 7-minute discovery", href: "/contact", variant: "primary" },
          { label: "Explore solutions", href: "/solutions", variant: "secondary" }
        ]}
      />
    </>
  );
}

