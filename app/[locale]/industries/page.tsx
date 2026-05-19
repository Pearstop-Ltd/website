import type { Metadata } from "next";
import { getTranslations , setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { GeoBlock, PageHero, SectionTitle } from "@/components/content";
import { industryCards, siteConfig } from "@/lib/site";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Industries" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/industries`
    }
  };
}

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
    id: "soft-services",
    title: "Soft Services (FM)",
    copy: "Identify margin pressure before you commit to a contract.",
    intro:
      "Soft services FM providers face a persistent challenge: fixed-price contracts that look viable at bid stage but erode margins in delivery. The difference between a profitable contract and a loss-maker is often hiding in the data, before the ink is dry.",
    points: [
      {
        title: "Fixed-price contracts creating unseen margin pressure",
        copy:
          "Without accurate cost baselines, it is nearly impossible to price a contract correctly, let alone defend your margin once you are in delivery."
      },
      {
        title: "Inability to demonstrate value beyond basic operations",
        copy:
          "Clients see soft services as a commodity. Without data-backed insights, proving your strategic contribution is difficult."
      },
      {
        title: "Spend data too fragmented to act on",
        copy:
          "Unclassified procurement data across contracts makes it impossible to benchmark costs or identify consolidation opportunities."
      }
    ],
    changes: [
      "Spend baselines that expose loss-making contracts before signing",
      "UNSPSC-coded procurement data to benchmark costs across contracts",
      "Clean data foundation to demonstrate value and retain clients beyond basic delivery"
    ],
    href: "/procurement-data-quality",
    linkLabel: "See how Pearstop helps Soft Services FM"
  },
  {
    id: "construction",
    title: "Construction",
    copy: "Improve margin accuracy before the project starts.",
    intro:
      "Construction margins live or die on the quality of estimates. Inaccurate procurement costs and unreliable people cost data lead to bids that win but bleed and projects that deliver less than they promised.",
    points: [
      {
        title: "Inaccurate procurement and materials cost estimates",
        copy:
          "Without clean cost baselines from previous projects, estimating teams are flying blind - and margin erosion starts at bid stage."
      },
      {
        title: "People cost data too fragmented to rely on",
        copy:
          "Labour is the single biggest cost driver in construction. Without reliable people cost data, it is impossible to price risk accurately."
      },
      {
        title: "No reliable spend baseline across projects",
        copy:
          "Fragmented spend data across subcontractors and categories prevents teams from learning from past performance or benchmarking suppliers."
      }
    ],
    changes: [
      "Accurate procurement cost estimates grounded in clean, classified spend data",
      "Labour cost baselines to protect margin across projects and regions",
      "Spend baselines that improve bid accuracy and reduce post-contract surprises"
    ],
    href: "/procurement-data-quality",
    linkLabel: "See how Pearstop helps Construction"
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    copy: "Better data. Tighter margins.",
    intro:
      "In manufacturing, margin erosion often starts with bad data. Duplicate parts records, inconsistent supplier codes, and unclassified spend make it nearly impossible to benchmark costs, negotiate accurately, or plan procurement efficiently.",
    points: [
      {
        title: "Inaccurate bills of materials",
        copy:
          "Errors in BOMs drive up procurement costs, cause production delays, and make accurate quoting impossible."
      },
      {
        title: "Fragmented supplier and parts data",
        copy:
          "Duplicate and inconsistent records across systems prevent you from benchmarking suppliers or negotiating from a position of strength."
      },
      {
        title: "Slow quoting and bid preparation",
        copy:
          "Manual data lookups and re-entry slow your teams down precisely when speed and accuracy matter most."
      }
    ],
    changes: [
      "UNSPSC-coded spend data for accurate category management and supplier benchmarking",
      "Deduplicated parts master to eliminate ghost stock and cut procurement errors",
      "AI-ready asset and parts data to support predictive maintenance and demand planning",
      "Faster quoting with clean, standardised cost and supplier data"
    ],
    href: "/unspsc",
    linkLabel: "See how Pearstop helps Manufacturers"
  },
  {
    id: "hard-services",
    title: "Hard Services (FM)",
    copy: "Stop losing margin to knowledge gaps and poor data.",
    intro:
      "Hard services FM providers face three compounding challenges: experienced engineers retiring and taking critical knowledge with them; contracts being executed at thin margins because cost data was wrong at bid stage; and digital transformation investments that fail to deliver because the underlying data is not clean enough to build on.",
    points: [
      {
        title: "Workforce knowledge loss as experienced staff retire",
        copy:
          "Critical asset knowledge locked in people's heads, not in systems, creates operational risk and service delivery gaps."
      },
      {
        title: "Low-margin contract execution",
        copy:
          "When labour, parts, and subcontractor cost data is not accurate, bids win and contracts bleed."
      },
      {
        title: "Digital transformation stalling without clean data",
        copy:
          "IoT, predictive maintenance, and digital twins all require a clean, structured data foundation. Without it, transformation budgets are wasted."
      }
    ],
    changes: [
      "Structured asset and maintenance data to retain operational knowledge as teams change",
      "Accurate cost data to prevent low-margin contract execution before it starts",
      "Clean data foundation to support meaningful, revenue-generating digital transformation"
    ],
    href: "/asset-data-management",
    linkLabel: "See how Pearstop helps Hard Services FM"
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    copy: "Critical asset reliability starts with data clarity.",
    intro:
      "Infrastructure operators are being squeezed from both sides, pricing pressure from contracts and rising material and labour costs in delivery. Ensuring critical assets stay reliable while protecting margins requires a level of data clarity that most organisations have not yet achieved.",
    points: [
      {
        title: "Unreliable asset data leading to unexpected failures",
        copy:
          "When asset registers are incomplete or out of date, maintenance planning is reactive - and critical failures become inevitable."
      },
      {
        title: "Rising material costs eroding contract margins",
        copy:
          "Without accurate spend baselines and supply chain visibility, cost increases hit margins without warning and with no data to negotiate against."
      },
      {
        title: "Pricing squeeze with no data leverage",
        copy:
          "Clients push for lower prices while costs rise. Without clean data, infrastructure operators have no basis from which to push back."
      }
    ],
    changes: [
      "Complete, accurate asset registers to support planned maintenance and reduce failures",
      "Clean spend and materials data to track and respond to rising costs in real time",
      "Data clarity that gives procurement teams leverage in supplier and client negotiations"
    ],
    href: "/asset-data-management",
    linkLabel: "See how Pearstop helps Infrastructure"
  },
  {
    id: "building-tech",
    title: "Building Technology",
    copy: "Move beyond commoditization with data as your edge.",
    intro:
      "Building technology providers are under pressure on all fronts: clients treating services as a commodity, digitalization programmes that promise transformation but underdeliver, and acquisitions that take years to integrate. The common thread in all three challenges is data quality.",
    points: [
      {
        title: "Services commoditised - competing on price alone",
        copy:
          "Without clean data to back your value proposition, building technology services look identical to every competitor - and procurement teams buy on price."
      },
      {
        title: "Digitalization investments failing to deliver",
        copy:
          "Smart building platforms, IoT integrations, and analytics dashboards all fail when they are built on poorly structured, unclassified data."
      },
      {
        title: "Acquisitions stalling on data integration",
        copy:
          "M&A synergies depend on integrating people, systems, and data. Without standardised data across entities, integration drags on and synergies evaporate."
      }
    ],
    changes: [
      "Clean product and service data to differentiate on value and escape commoditization",
      "Structured data foundation to make digitalization investments actually deliver ROI",
      "Standardised data across acquired entities to accelerate integration and realise synergies"
    ],
    href: "/ai-readiness",
    linkLabel: "See how Pearstop helps Building Technology"
  }
];

const trustedCompanies = [
  { name: "Strukton", href: "/cases#strukton", src: siteConfig.assets.clients.strukton },
  { name: "FMO", href: "/cases#fmo", src: siteConfig.assets.clients.fmo },
  { name: "FARO", href: "/cases#faro", src: siteConfig.assets.clients.faro },
  { name: "Kelp", href: "/cases", src: siteConfig.assets.clients.kelpBlue },
  { name: "SnapFix", href: "/contact" },
  { name: "Manufacturing | Air Filtration Units", href: "/contact" }
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

export default async function IndustriesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations({ locale, namespace: "Industries" });

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
      />

      <section>
        <div className="container">
          <SectionTitle
            title={t("sixIndustries.title")}
            lead={t("sixIndustries.lead")}
          />
          <div className="industry-grid">
            {industryCards.map((card) => (
              <article key={card.title} className="ind-card">
                <div className="ind-card-icon">●</div>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <Link className="ind-card-link" href={`${prefix}${card.href}`}>
                  {t("sixIndustries.learnMore")}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="ind-wide-banner">
            <h3>{t("otherIndustries.title")}</h3>
            <p>{t("otherIndustries.copy")}</p>
            <a href={siteConfig.calendly} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              {t("otherIndustries.bookDiscovery")}
            </a>
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
                <Link className="ind-card-link" href={`${prefix}${detail.href}`}>
                  {detail.linkLabel} →
                </Link>
              </div>
              <div className="ind-detail-aside">
                <div className="quote-card">
                  <div className="story-label">{t("whatChanges")}</div>
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
          <SectionTitle title={t("trusted.title")} />
          <div className="industry-grid">
            {trustedCompanies.map((company) => (
              <article key={company.name} className="quote-card trusted-company-card">
                <Link href={`${prefix}${company.href}`} aria-label={`${company.name} case study`} style={{ display: "block" }}>
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
            <h3>{t("readyBanner.title")}</h3>
            <p>{t("readyBanner.copy")}</p>
            <a href={siteConfig.calendly} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              {t("readyBanner.bookDiscovery")}
            </a>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <SectionTitle
            eyebrow={t("technical.eyebrow")}
            title={t("technical.title")}
            lead={t("technical.lead")}
          />
          <div className="row">
            {technicalBlocks.map((block) => (
              <div key={block.title} className="col-md-4">
                <GeoBlock title={block.title} copy={block.copy} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
