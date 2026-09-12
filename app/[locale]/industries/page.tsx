import { CalendlyButton } from "@/components/calendly-button";
import type { Metadata } from "next";
import { getTranslations , setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Fragment } from "react";
import Script from "next/script";
import { GeoBlock, PageHero, SectionTitle } from "@/components/content";
import { alternateLanguages, industryCards, siteConfig } from "@/lib/site";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Industries", item: `${siteConfig.url}/industries` }
  ]
};

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
      canonical: `${siteConfig.url}/industries`,
      languages: alternateLanguages("/industries")
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

type FaqItem = { q: string; a: string };

type FacilitiesManagementIntro = {
  title: string;
  intro: string;
  links: { label: string; id: string }[];
};

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

  const details = t.raw("details") as IndustryDetail[];
  const faqItems = t.raw("faq.items") as FaqItem[];
  const fm = t.raw("facilitiesManagement") as FacilitiesManagementIntro;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a }
    }))
  };

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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
                {card.links ? (
                  <div className="ind-card-links">
                    {card.links.map((link) => (
                      <Link key={link.href} className="ind-card-link" href={`${prefix}${link.href}`}>
                        {link.label} →
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link className="ind-card-link" href={`${prefix}${card.href}`}>
                    {t("sixIndustries.learnMore")}
                  </Link>
                )}
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
            <CalendlyButton label={t("otherIndustries.bookDiscovery")} className="btn btn-primary" />
          </div>
        </div>
      </section>

      {details.map((detail, index) => (
        <Fragment key={detail.id}>
          {detail.id === "integrated-fm" && (
            <section id="facilities-management" className="ind-detail bg-soft">
              <div className="container">
                <div className="ind-fm-intro">
                  <h2>{fm.title}</h2>
                  <p className="light-copy">{fm.intro}</p>
                  <div className="ind-fm-links">
                    {fm.links.map((link) => (
                      <Link key={link.id} className="btn btn-secondary" href={`${prefix}/industries#${link.id}`}>
                        {link.label} →
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
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
        </Fragment>
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
            <CalendlyButton label={t("readyBanner.bookDiscovery")} className="btn btn-primary" />
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

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h2 style={{ marginBottom: "1.5rem" }}>Frequently asked questions</h2>
              <div className="faq-list">
                {faqItems.map((item, i) => (
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
