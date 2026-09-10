import { CalendlyButton } from "@/components/calendly-button";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { GeoBlock, PageHero, SectionTitle } from "@/components/content";
import { industryCards, siteConfig } from "@/lib/site";

const PAGE_URL = `${siteConfig.url}/industries`;

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Pearstop works with infrastructure, integrated and hard services FM, construction, soft services and cleaning, manufacturing, and asset owner organisations. Each industry has a different data problem - see how we solve it.",
  alternates: {
    canonical: PAGE_URL
  }
};

const FAQ_ITEMS = [
  {
    q: "Which industries does Pearstop work with?",
    a: "Pearstop works with infrastructure and rail operators, integrated FM providers, hard services and technical FM contractors, construction and project-based firms, soft services and cleaning contractors, manufacturers of building systems and equipment, and asset owners who outsource FM delivery. Each has a different version of the same underlying problem: spend or asset data too fragmented or unread to act on."
  },
  {
    q: "Do I need to be a large organisation to benefit?",
    a: "Pearstop fits organisations with several hundred employees or more, operating across multiple sites or projects, with a meaningful volume of external supplier and subcontractor spend. The precondition is not size on its own, it is distributed spend: different suppliers for the same product or service across sites or entities, without anyone having properly mapped it."
  },
  {
    q: "What if my industry is not listed here?",
    a: "The data problems above are not unique to these seven industries. If your team manages complex operational spend or asset data, deals with inconsistent supplier records, or is preparing for a digital transformation, the underlying problem is usually the same one. Book a call and we will tell you plainly whether it is a fit."
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
    { "@type": "ListItem", position: 2, name: "Industries", item: PAGE_URL }
  ]
};

type IndustryPoint = {
  title: string;
  copy: string;
};

type IndustryDetail = {
  id: string;
  title: string;
  copy: string;
  intro: string;
  points: IndustryPoint[];
  changes: string[];
  href: string;
  linkLabel: string;
};

const details: IndustryDetail[] = [
  {
    id: "infrastructure",
    title: "Infrastructure",
    copy: "Know where the money goes before you try to save it.",
    intro:
      "A cost-savings target gets named, sometimes running to eight figures, and nobody can point to where in the spend it actually sits. That gap between the target and the data is a recurring pattern in infrastructure and rail: a savings programme identifies tens of millions in potential savings, and the underlying spend data cannot show where to find them.",
    points: [
      {
        title: "A savings target with no data to back it",
        copy:
          "A transformation programme names a number. Spend is not classified consistently enough to say which categories the number is hiding in."
      },
      {
        title: "Framework coverage nobody can see across the business",
        copy:
          "One buyer can see the ten framework agreements for their category. The other fifty categories have no equivalent visibility, so the organisation cannot steer spend onto agreements it already has."
      },
      {
        title: "No baseline to negotiate or tender from",
        copy:
          "Negotiating with a supplier, or pricing a new tender, both start from knowing what you already spend. Without that baseline, every negotiation starts from a guess."
      }
    ],
    changes: [
      "Spend classified consistently enough to show where a named savings target actually sits",
      "Framework and contract coverage visible across every category, not just the ones already being watched",
      "A real spend baseline to negotiate suppliers and price tenders against, not an estimate",
      "Buyer review speed improved by an order of magnitude as classification becomes familiar, not a marginal gain"
    ],
    href: "/procurement-data-quality",
    linkLabel: "See how Pearstop builds a real spend baseline"
  },
  {
    id: "integrated-fm",
    title: "Integrated FM",
    copy: "One contract, five service lines, five data formats.",
    intro:
      "Multi-service FM contracts win on breadth: cleaning, hard services, security, and catering under one roof. The data underneath rarely reflects that unity. Each service line arrives from its own system, in its own format, and asset or cost records that should describe the same thing end up looking like they belong to different companies.",
    points: [
      {
        title: "Reference data that does not match what is installed",
        copy:
          "Manufacturer and equipment reference data supplied at contract start is sometimes simply wrong, and spelling, naming, and coding inconsistencies compound across sites and years."
      },
      {
        title: "Spend and service data siloed by service line",
        copy:
          "Cleaning, hard services, and security each report differently, so nobody sees the full cost or performance picture for a single contract."
      },
      {
        title: "A first pass that delivers less than expected",
        copy:
          "Expectations set at the start of a project often outpace what a first data pass can support, because the underlying reference data was flawed before it reached any system."
      }
    ],
    changes: [
      "Manufacturer and equipment reference data corrected and standardised across every service line and site",
      "One structured dataset instead of five service-line silos, so real contract-level cost and performance is visible",
      "A realistic view of what the data can support, set from a corrected baseline, not the state it arrived in"
    ],
    href: "/data-quality",
    linkLabel: "See how Pearstop unifies FM data"
  },
  {
    id: "hard-services",
    title: "Hard Services (FM)",
    copy: "Stop paying a middleman because nobody can confirm what the part is.",
    intro:
      "When a component arrives with only a supplier's own part code attached, there is no way to buy it from anyone except that supplier. Getting to the original manufacturer code means someone tracing it by hand, and every step of that chain, from the engineer who ordered it to the team who has to ask for a clearer description, costs time most contracts do not budget for.",
    points: [
      {
        title: "The original manufacturer code is hidden behind a supplier code",
        copy:
          "Without it, there is no alternative supplier to buy from, and no way to check the price is fair."
      },
      {
        title: "Vague descriptions create a slow back-and-forth loop",
        copy:
          "An unclear part description sent back to site and back again is the default when descriptions were never captured consistently in the first place."
      },
      {
        title: "No way to check a match before it is used",
        copy:
          "A classification result is only useful once it can be checked against the real part number, not taken on faith."
      }
    ],
    changes: [
      "Original manufacturer codes identified so parts can be bought direct, not through a markup",
      "Consistent part descriptions captured once, not re-requested site to site",
      "Every match traceable back to a real part number, so your team can verify it rather than trust it"
    ],
    href: "/unspsc",
    linkLabel: "See how Pearstop verifies parts and components"
  },
  {
    id: "construction",
    title: "Construction",
    copy: "Turning years of spend into one number should not take years.",
    intro:
      "A construction group doing hundreds of millions in annual spend across more than a dozen entities can state its turnover to the euro and still not know, with any precision, what it actually spent last year, or on what. Framework agreements exist, but they were signed years ago and nobody has checked since whether buying still follows them.",
    points: [
      {
        title: "Group-wide spend nobody can add up precisely",
        copy:
          "Spend spread across many entities and systems means turnover is known to the euro; what was actually bought rarely is."
      },
      {
        title: "Framework agreements nobody has checked lately",
        copy:
          "Agreements signed years ago keep running on trust, with no live comparison of whether current buying still follows them."
      },
      {
        title: "Categorising spend by hand, project after project",
        copy:
          "Translating raw spend into quantities, sections, and contractors manually is still how a categorised view gets built, repeated every reporting cycle."
      }
    ],
    changes: [
      "Group-wide spend visible in one consolidated, coded view, not per entity",
      "Framework agreement compliance checked against live buying, not assumed",
      "Categorisation that happens once per line, not by hand every reporting cycle"
    ],
    href: "/procurement-data-quality",
    linkLabel: "See how Pearstop builds a group-wide spend view"
  },
  {
    id: "soft-services",
    title: "Soft Services (FM)",
    copy: "If the invoice is never read, the spend underneath it does not exist yet.",
    intro:
      "Ask a procurement team in cleaning or soft services how confident they are in their own spend data, and \"ground level\" is a common, self-deprecating answer. Before any of that spend can be categorised or benchmarked, someone has to actually read every invoice, and at real volume, across hundreds of sites, that step is where most soft services providers are still stuck.",
    points: [
      {
        title: "Invoices arriving faster than anyone can read them",
        copy:
          "ERP master data described as too poor for the automatic flow to even start, with deadlines that have been missed for years, not months."
      },
      {
        title: "No justification when a client challenges a price",
        copy:
          "Asked to defend a tender cost, the honest answer is often that nobody knows. The margin on the number was a feeling, not a calculation."
      },
      {
        title: "A supplier that controls the data you need to negotiate",
        copy:
          "When a single supplier accounts for most of a category's spend, they can share only the data that suits them, leaving no independent way to check it."
      }
    ],
    changes: [
      "Invoices and delivery notes read and structured automatically, in any format, so there is something to classify",
      "A real cost baseline to defend pricing under client challenge, not a feeling",
      "Spend visibility that does not depend on what a single supplier chooses to share"
    ],
    href: "/invoice-data-extraction",
    linkLabel: "See how Pearstop reads the invoice first"
  },
  {
    id: "manufacturing",
    title: "Manufacturers of Building Systems",
    copy: "One entity already runs a standard. The rest of the group does not.",
    intro:
      "It is common in multi-entity manufacturers for one part of the business, often the most established or the most recently scrutinised, to already classify spend against a real standard, while sister entities and newer sites still run on inconsistent, free-text supplier and parts data. The gap does not stay contained to one region for long: audits, group reporting, and shared procurement all eventually need the same view everywhere.",
    points: [
      {
        title: "One entity on a standard, others not",
        copy:
          "A group classification standard already exists somewhere in the business. Extending it to every entity by hand is slower than the reason it was requested in the first place."
      },
      {
        title: "Duplicate and inconsistent parts records across plants",
        copy:
          "The same part shows up under different codes and spellings depending on which plant or system entered it, which blocks supplier benchmarking and hides duplicate stock."
      },
      {
        title: "Slow quoting built on manual lookups",
        copy:
          "Re-keying and re-checking part data by hand slows quoting exactly when speed and accuracy both matter."
      }
    ],
    changes: [
      "The group's existing classification standard extended to every entity, not just the one that already had it",
      "Deduplicated, standardised parts data across plants and systems",
      "Faster quoting on cost and supplier data that does not need re-checking by hand"
    ],
    href: "/unspsc",
    linkLabel: "See how Pearstop aligns every entity to one standard"
  },
  {
    id: "asset-owners",
    title: "Asset Owners",
    copy: "You do not touch the invoices. You still need to know what they say.",
    intro:
      "Property investors, landlords, and public estate owners who outsource facilities management do not generate their own spend data. They receive it, filtered through whichever provider delivers the contract. The question that follows is not a category strategy question. It is simpler, and harder to dodge: what is actually being spent on our behalf, is it competitive, and how would we know if it was not.",
    points: [
      {
        title: "Cost data you receive but do not control",
        copy:
          "A managing agent or FM provider reports the numbers. There is rarely an independent way to check them against what similar sites or portfolios pay."
      },
      {
        title: "No benchmark across providers or sites",
        copy:
          "Without a common, classified view of spend, comparing one provider's costs to another, or one site to the next, is not possible."
      },
      {
        title: "Wanting to hold the narrative, not just receive it",
        copy:
          "Reviewing a provider's own reporting after the fact is not the same as holding an independent, comparable record of your own."
      }
    ],
    changes: [
      "An independent, classified view of spend managed on your behalf, not just the provider's own report",
      "Cost benchmarking across providers and sites, on the same basis",
      "Assurance you can bring to a provider review, not just a file you received from one"
    ],
    href: "/asset-data-management",
    linkLabel: "See how Pearstop gives asset owners assurance"
  }
];

const trustedCompanies = [
  {
    name: "Strukton",
    href: "/cases#strukton",
    src: siteConfig.assets.clients.strukton
  },
  {
    name: "FMO",
    href: "/cases#fmo",
    src: siteConfig.assets.clients.fmo
  },
  {
    name: "FARO",
    href: "/cases#faro",
    src: siteConfig.assets.clients.faro
  },
  {
    name: "Kelp",
    href: "/cases",
    src: siteConfig.assets.clients.kelpBlue
  },
  {
    name: "SnapFix",
    href: "/contact"
  },
  {
    name: "Manufacturing | Air Filtration Units",
    href: "/contact"
  }
];

const technicalBlocks = [
  {
    title: "Operational data that is decentralised, inconsistent, and difficult to act on",
    copy:
      "Poor procurement data quality, unreliable asset registers, and unclassified spend are the most common blockers to category management, predictive maintenance, and digital transformation in these industries. Pearstop specialises in cleaning and structuring this operational data so technical businesses can act on it."
  },
  {
    title: "Inconsistent supplier records and fragmented procurement data",
    copy:
      "Supplier data in hard services and construction is rarely standardised. Different ERP exports, legacy systems, and manual spreadsheets mean the same supplier or product can appear dozens of ways. Pearstop resolves and standardises this data automatically - creating a single, trusted procurement dataset."
  },
  {
    title: "Digital transformation initiatives stalling on data readiness",
    copy:
      "Microsoft Fabric, SAP migrations, AI tools, and BI platforms all depend on clean, structured input data. In technical industries, the data is rarely ready. Pearstop builds the data foundation - classified, deduplicated, and consistently structured - so digital transformation projects can proceed without months of manual preparation."
  }
];

export default function IndustriesPage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        eyebrow="Industries"
        title="Industries We Serve"
        lead="Pearstop cleans and classifies operational data for the industries carrying the heaviest, messiest spend: infrastructure, facilities management, construction, and manufacturing. Find your industry below."
      />

      <section>
        <div className="container">
          <SectionTitle
            title="Where Pearstop Fits"
            lead="Seven industries, seven different ways the same problem shows up: spend or asset data nobody can act on yet."
          />
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

      <section>
        <div className="container">
          <div className="ind-wide-banner">
            <h3>Working in a different industry?</h3>
            <p>
              Data quality problems are not unique to the industries above. If your teams are managing complex operational data, dealing with inconsistent supplier records, or preparing for a digital transformation, the chances are we can help. Let&apos;s find out.
            </p>
            <CalendlyButton label="Book a 7-minute discovery →" className="btn btn-primary" />
          </div>
        </div>
      </section>

      {details.map((detail, index) => (
        <section key={detail.id} id={detail.id} className={index % 2 ? "ind-detail bg-soft" : "ind-detail"}>
          <div className="container">
            <div className={`ind-detail-inner ${index % 2 ? "reverse" : ""}`}>
              <div className="ind-detail-text">
                <div className="ind-detail-eyebrow">{detail.title}</div>
                <h2>{detail.copy}</h2>
                <p className="light-copy">{detail.intro}</p>
                <ul className="ind-pains">
                  {detail.points.map((point) => (
                    <li key={point.title}>
                      <span className="ind-pains-icon">•</span>
                      <div>
                        <strong>{point.title}</strong>
                        <p>{point.copy}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link className="ind-card-link" href={detail.href}>
                  {detail.linkLabel} →
                </Link>
              </div>
              <div className="ind-detail-aside">
                <div className="quote-card">
                  <div className="story-label">What changes with Pearstop</div>
                  <ul className="ind-pains">
                    {detail.changes.map((change) => (
                      <li key={change}>
                        <span className="ind-ok">✓</span>
                        <div>{change}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section>
        <div className="container">
          <SectionTitle title="Trusted by leading companies in technical industries" />
          <div className="industry-grid">
            {trustedCompanies.map((company) => (
              <article key={company.name} className="quote-card trusted-company-card">
                <Link href={company.href} aria-label={`${company.name} case study`} style={{ display: "block" }}>
                  {company.src ? (
                    <img
                      src={company.src}
                      alt={company.name}
                      style={{ maxWidth: "160px", maxHeight: "64px", objectFit: "contain" }}
                    />
                  ) : (
                    <div className="trusted-company-name">{company.name}</div>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="ind-wide-banner">
            <h3>Ready to Clean Your Data?</h3>
            <p>We have solved this exact problem in infrastructure, facilities management, construction, and manufacturing. If yours is a different industry with the same kind of data, tell us about it.</p>
            <CalendlyButton label="Book a 7-Minute Discovery" className="btn btn-primary" />
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <SectionTitle
            eyebrow="Technical Industries"
            title="Why Do Technical Industries Struggle With Data Quality?"
            lead="Hard services, construction, infrastructure, and manufacturing companies share a common challenge."
          />
          <div className="row" style={{ gap: "1.5rem" }}>
            {technicalBlocks.map((block) => (
              <div key={block.title} className="col-md-4" style={{ flex: "1 1 260px" }}>
                <GeoBlock title={block.title} copy={block.copy} />
              </div>
            ))}
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
    </>
  );
}
