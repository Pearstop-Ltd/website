import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { CTABand, PageHero, QuoteBox, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "UnspscNL" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/unspsc-classification-netherlands`
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `${siteConfig.url}/unspsc-classification-netherlands`,
      siteName: siteConfig.name,
      images: ["/opengraph-image"]
    }
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is UNSPSC classification required in the Netherlands?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UNSPSC is not a legal requirement in the Netherlands, but it is increasingly used as a best-practice standard for procurement classification. The Peppol e-invoicing network, which is now mandatory for government procurement in the Netherlands, uses structured coding that aligns with UNSPSC. Dutch companies that adopt UNSPSC classification gain spend visibility that supports both internal category management and external compliance with public sector procurement requirements."
      }
    },
    {
      "@type": "Question",
      name: "What is Peppol and how does it relate to UNSPSC in the Netherlands?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Peppol (Pan-European Public Procurement On-Line) is the e-invoicing network mandated for Dutch government procurement. Peppol requires structured invoice data including product and service codes. UNSPSC is the most widely adopted classification standard used alongside Peppol in the Netherlands, allowing companies to submit structured, machine-readable invoices and maintain consistent spend categorisation across their supplier base."
      }
    },
    {
      "@type": "Question",
      name: "Wat is UNSPSC classificatie en waarom is het belangrijk?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UNSPSC staat voor United Nations Standard Products and Services Code. Het is een wereldwijd classificatiesysteem voor inkoopcategorieën. Bedrijven gebruiken UNSPSC om inkoopuitgaven te categoriseren, leveranciers te vergelijken en te rapporteren. Zonder UNSPSC classificatie zijn inkoopdata moeilijk te analyseren en te vergelijken — met UNSPSC krijgt elke inkooporder een consistente categorie, waardoor spend-analyse, leveranciersconsolidatie en categoriebeheer mogelijk worden."
      }
    },
    {
      "@type": "Question",
      name: "Which Dutch companies need UNSPSC classification most urgently?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dutch infrastructure contractors, facilities management companies, and construction firms typically have the most urgent need for UNSPSC classification. These organisations manage high volumes of procurement spend across many suppliers and sites, with invoice lines that are difficult to categorise consistently. Companies supplying to government under Peppol requirements also need structured coding for compliance."
      }
    },
    {
      "@type": "Question",
      name: "How does Pearstop classify procurement data for Dutch companies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pearstop receives procurement data via CSV or direct API connection from Dutch ERP systems including SAP, Oracle, and AFAS. The classification engine applies a four-layer approach — rules, machine learning, LLM, and human review — to assign UNSPSC codes at commodity level. Dutch-language invoice descriptions are handled natively. Output is returned in the same format, ready for SAP, BI tools, or Peppol-compliant invoicing systems."
      }
    }
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "UNSPSC Classification Netherlands",
  description: "Automated UNSPSC classification for Dutch procurement teams. Pearstop classifies procurement spend data from Dutch ERP systems at scale, supporting Peppol compliance and spend visibility for infrastructure, FM, and construction companies in the Netherlands.",
  provider: {
    "@type": "Organization",
    name: "Pearstop",
    url: siteConfig.url
  },
  serviceType: "Procurement Data Classification",
  areaServed: {
    "@type": "Country",
    name: "Netherlands"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "UNSPSC Classification", item: `${siteConfig.url}/unspsc` },
    { "@type": "ListItem", position: 3, name: "UNSPSC Classification Netherlands", item: `${siteConfig.url}/unspsc-classification-netherlands` }
  ]
};

export default async function UnspscNLPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations({ locale, namespace: "UnspscNL" });

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        actions={[
          { label: t("hero.cta"), href: siteConfig.calendly, variant: "primary", external: true },
          { label: t("hero.secondary"), href: "#peppol", variant: "secondary" }
        ]}
      />

      <section id="peppol">
        <div className="container">
          <SectionTitle
            eyebrow={t("peppol.eyebrow")}
            title={t("peppol.title")}
            lead={t("peppol.lead")}
          />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">📋</div>
              <h3>{t("peppol.b1.title")}</h3>
              <p>{t("peppol.b1.copy")}</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">🔗</div>
              <h3>{t("peppol.b2.title")}</h3>
              <p>{t("peppol.b2.copy")}</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">✓</div>
              <h3>{t("peppol.b3.title")}</h3>
              <p>{t("peppol.b3.copy")}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <SectionTitle
            eyebrow={t("challenge.eyebrow")}
            title={t("challenge.title")}
            lead={t("challenge.lead")}
          />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>{t("solution.step1.title")}</h3>
              <p>{t("solution.step1.copy")}</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>{t("solution.step2.title")}</h3>
              <p>{t("solution.step2.copy")}</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>{t("solution.step3.title")}</h3>
              <p>{t("solution.step3.copy")}</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">4</div>
              <h3>{t("solution.step4.title")}</h3>
              <p>{t("solution.step4.copy")}</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox
                quote="We used to have two full-time staff working on category assignment. Now the system does this for us — which has unlocked margin estimations further down the line too."
                author="Head of Procurement"
                role="Infrastructure Contractor, Netherlands"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft" id="faq">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <SectionTitle title={t("faq.title")} />
              <div className="faq-list">
                {(["0", "1", "2", "3", "4"] as const).map((i) => (
                  <details key={i} className="faq-item">
                    <summary className="faq-q">{t(`faq.items.${i}.q`)}</summary>
                    <p className="faq-a">{t(`faq.items.${i}.a`)}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="quote-card">
                <div className="story-label">{t("related.label")}</div>
                <p>{t("related.copy")}</p>
                <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <Link href={`${prefix}/unspsc`} className="btn btn-secondary">{t("related.link1")}</Link>
                  <Link href={`${prefix}/cases`} className="btn btn-secondary">{t("related.link2")}</Link>
                  <Link href={`${prefix}/unspsc-classification-facilities-management`} className="btn btn-secondary">{t("related.link3")}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title={t("cta.title")}
        lead={t("cta.lead")}
        actions={[{ label: t("cta.button"), href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
