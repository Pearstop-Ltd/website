import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations , setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { CTABand, PageHero, QuoteBox, SectionTitle } from "@/components/content";
import { UnspscLookupCta } from "@/components/unspsc-lookup-cta";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "UnspscDE" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/unspsc-classification-germany`
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `${siteConfig.url}/unspsc-classification-germany`,
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
      name: "Is UNSPSC classification required in Germany?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Germany's B2B e-invoicing mandate came into force in 2025 under the Growth Opportunities Act (Wachstumschancengesetz). While UNSPSC is not the only coding option, it is the most widely adopted international procurement classification standard and is recommended for companies that supply across multiple European markets. German companies that adopt UNSPSC gain consistent spend categorisation that supports both VAT reporting and cross-border procurement compliance."
      }
    },
    {
      "@type": "Question",
      name: "How does Germany's e-invoicing mandate affect procurement classification?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Germany's e-invoicing mandate requires structured, machine-readable invoice data for B2B transactions. Structured invoicing requires product and service codes. UNSPSC provides a consistent, internationally recognised coding system that satisfies this requirement while also enabling internal spend analysis, supplier benchmarking, and category management — making it the most practical choice for German procurement teams already managing structured data."
      }
    },
    {
      "@type": "Question",
      name: "Was ist UNSPSC-Klassifizierung und warum brauchen deutsche Unternehmen sie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UNSPSC steht für United Nations Standard Products and Services Code. Es ist ein hierarchisches Klassifizierungssystem für Beschaffungskategorien, das weltweit von Organisationen verwendet wird. Deutsche Unternehmen nutzen UNSPSC, um Einkaufsausgaben zu kategorisieren, Lieferanten zu vergleichen und die Ausgabentransparenz zu verbessern. Mit der deutschen E-Rechnungspflicht 2025 wird eine strukturierte Produktcodierung zunehmend zu einem praktischen Standard."
      }
    },
    {
      "@type": "Question",
      name: "Which German industries benefit most from UNSPSC classification?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "German manufacturing, engineering, facilities management, and infrastructure companies benefit most from UNSPSC classification. Manufacturing firms with large MRO (maintenance, repair, and operations) spend gain significant value from consistent part coding. Infrastructure and FM companies managing decentralised procurement across multiple sites reduce manual effort by 70–90% through automated classification."
      }
    },
    {
      "@type": "Question",
      name: "Can Pearstop classify German-language procurement data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Pearstop's classification engine handles German-language invoice descriptions natively, including common abbreviations and technical terminology. Data is received via CSV or API from SAP, Oracle, or other ERP systems used in Germany. The four-layer engine — rules, machine learning, LLM, and human review — achieves 90–95% automatic classification on German procurement datasets."
      }
    }
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "UNSPSC Classification Germany",
  description: "Automated UNSPSC classification for German procurement teams. Pearstop classifies procurement spend data from German ERP systems at scale, supporting e-invoicing compliance and spend visibility for manufacturing, FM, and infrastructure companies in Germany.",
  provider: {
    "@type": "Organization",
    name: "Pearstop",
    url: siteConfig.url
  },
  serviceType: "Procurement Data Classification",
  areaServed: {
    "@type": "Country",
    name: "Germany"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "UNSPSC Classification", item: `${siteConfig.url}/unspsc` },
    { "@type": "ListItem", position: 3, name: "UNSPSC Classification Germany", item: `${siteConfig.url}/unspsc-classification-germany` }
  ]
};

export default async function UnspscDEPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations({ locale, namespace: "UnspscDE" });

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
          { label: t("hero.secondary"), href: "#einvoicing", variant: "secondary" }
        ]}
      />

      <section id="einvoicing">
        <div className="container">
          <SectionTitle
            eyebrow={t("einvoicing.eyebrow")}
            title={t("einvoicing.title")}
            lead={t("einvoicing.lead")}
          />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">📋</div>
              <h3>{t("einvoicing.b1.title")}</h3>
              <p>{t("einvoicing.b1.copy")}</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">🔗</div>
              <h3>{t("einvoicing.b2.title")}</h3>
              <p>{t("einvoicing.b2.copy")}</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">✓</div>
              <h3>{t("einvoicing.b3.title")}</h3>
              <p>{t("einvoicing.b3.copy")}</p>
            </article>
          </div>
        </div>
      </section>


      <section className="section-soft">
        <div className="container">
          <SectionTitle
            eyebrow={t("solution.eyebrow")}
            title={t("solution.title")}
            lead={t("solution.lead")}
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
                quote="It would have taken five engineers and a full year to clean this up manually. We needed a better solution — and the turnaround went from weeks to under a day."
                author="Head of Operations"
                role="FARO"
              />
            </div>
          </div>
        </div>
      </section>

      <UnspscLookupCta prefix={prefix} />

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
                  <Link href={`${prefix}/unspsc-classification-netherlands`} className="btn btn-secondary">{t("related.link2")}</Link>
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
