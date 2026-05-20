import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { CTABand, PageHero, QuoteBox, SectionTitle } from "@/components/content";
import { UnspscLookupCta } from "@/components/unspsc-lookup-cta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "UNSPSC Klassifizierung Deutschland | Automatisierte Beschaffungsklassifizierung | Pearstop",
  description:
    "Automatisierte UNSPSC-Klassifizierung für deutsche Beschaffungsteams. Pearstop klassifiziert Einkaufsdaten aus SAP und anderen ERP-Systemen — mit Unterstützung für die deutsche E-Rechnungspflicht 2025.",
  alternates: {
    canonical: `${siteConfig.url}/unspsc-classification-germany`
  },
  openGraph: {
    title: "UNSPSC Klassifizierung Deutschland | Automatisierte Beschaffungsklassifizierung | Pearstop",
    description:
      "Automatisierte UNSPSC-Klassifizierung für deutsche Beschaffungsteams. Pearstop klassifiziert Einkaufsdaten aus SAP und anderen ERP-Systemen — mit Unterstützung für die deutsche E-Rechnungspflicht 2025.",
    url: `${siteConfig.url}/unspsc-classification-germany`,
    siteName: siteConfig.name,
    images: ["/opengraph-image"]
  }
};

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
  description:
    "Automated UNSPSC classification for German procurement teams. Pearstop classifies procurement spend data from German ERP systems at scale, supporting e-invoicing compliance and spend visibility for manufacturing, FM, and infrastructure companies in Germany.",
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
    {
      "@type": "ListItem",
      position: 3,
      name: "UNSPSC Classification Germany",
      item: `${siteConfig.url}/unspsc-classification-germany`
    }
  ]
};

export default function UnspscDEPage() {
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
        eyebrow="UNSPSC Klassifizierung Deutschland"
        title="UNSPSC-Klassifizierung für deutsche Fertigungs-, FM- und Infrastrukturunternehmen."
        lead="Pearstop automatisiert die Klassifizierung von Einkaufszeilen nach UNSPSC-Standard — 90–95% ohne manuellen Aufwand. Mit Unterstützung für die deutsche E-Rechnungspflicht 2025 und SAP-Integration."
        actions={[
          { label: "7-minütige Discovery buchen", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "E-Rechnung und UNSPSC", href: "#einvoicing", variant: "secondary" }
        ]}
      />

      <section id="einvoicing">
        <div className="container">
          <SectionTitle
            eyebrow="E-Rechnungspflicht 2025 und UNSPSC"
            title="Warum deutsche Unternehmen jetzt an strukturierter Produktcodierung arbeiten"
            lead="Das Wachstumschancengesetz 2025 verpflichtet deutsche Unternehmen zur strukturierten B2B-E-Rechnung. UNSPSC ist der internationale Standard, der dies ermöglicht."
          />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">📋</div>
              <h3>E-Rechnungspflicht erfordert Produktcodes</h3>
              <p>Die deutsche E-Rechnungspflicht 2025 erfordert strukturierte, maschinenlesbare Rechnungsdaten. UNSPSC bietet das international anerkannte Klassifizierungssystem, das diese Anforderung erfüllt.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">🔗</div>
              <h3>Konsistente Kategorisierung über Lieferanten hinweg</h3>
              <p>Mit UNSPSC erhält jede Bestellung eine konsistente Kategorie — unabhängig von Lieferant oder System.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">✓</div>
              <h3>Ausgabentransparenz für das Kategoriemanagement</h3>
              <p>Eine klassifizierte Einkaufsdatenbasis ist die Grundlage für Kategoriemanagement, Vertragsverhandlungen und Einsparidentifikation.</p>
            </article>
          </div>
        </div>
      </section>


      <section className="section-soft">
        <div className="container">
          <SectionTitle
            eyebrow="Wie Pearstop vorgeht"
            title="Wie Pearstop deutsche Einkaufsdaten klassifiziert"
            lead="Pearstop verarbeitet Einkaufsdaten aus SAP, Oracle und anderen deutschen ERP-Systemen — einschließlich deutschsprachiger Beschreibungen."
          />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Datenexport aus Ihrem ERP</h3>
              <p>Exportieren Sie Bestellungen, Rechnungszeilen oder beides — per CSV oder direkter API-Verbindung aus SAP, Oracle oder einem anderen System.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>Automatische Klassifizierung</h3>
              <p>Pearstops vier-schichtige Engine klassifiziert 90–95% der Zeilen automatisch, einschließlich deutschsprachiger Beschreibungen.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>Manuelle Überprüfung von Grenzfällen</h3>
              <p>Die verbleibenden 5–10% werden Ihrem Team zur Überprüfung vorgelegt. Jede Entscheidung verbessert das Modell.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">4</div>
              <h3>Klassifizierte Daten zurück in Ihr System</h3>
              <p>Die klassifizierte Datei wird in Ihrem Originalformat zurückgegeben — bereit für SAP, Power BI oder E-Rechnungssysteme.</p>
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

      <UnspscLookupCta />

      <section className="section-soft" id="faq">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <SectionTitle title="Häufig gestellte Fragen" />
              <div className="faq-list">
                {[
                  {
                    q: "Ist UNSPSC-Klassifizierung in Deutschland Pflicht?",
                    a: "UNSPSC ist keine gesetzliche Pflicht, aber die E-Rechnungspflicht 2025 erfordert strukturierte Produktcodes. UNSPSC ist der meistgenutzte internationale Standard, der diese Anforderung erfüllt."
                  },
                  {
                    q: "Wie wirkt sich die deutsche E-Rechnungspflicht auf die Beschaffungsklassifizierung aus?",
                    a: "Die E-Rechnungspflicht 2025 erfordert strukturierte, maschinenlesbare Rechnungsdaten für B2B-Transaktionen. UNSPSC bietet ein konsistentes, international anerkanntes Codierungssystem, das diese Anforderung erfüllt."
                  },
                  {
                    q: "Was ist UNSPSC-Klassifizierung und warum brauchen deutsche Unternehmen sie?",
                    a: "UNSPSC steht für United Nations Standard Products and Services Code. Deutsche Unternehmen nutzen UNSPSC, um Einkaufsausgaben zu kategorisieren, Lieferanten zu vergleichen und die Ausgabentransparenz zu verbessern."
                  },
                  {
                    q: "Welche deutschen Branchen profitieren am meisten?",
                    a: "Deutsche Fertigungsunternehmen, Maschinenbauunternehmen, Facility-Management-Unternehmen und Infrastrukturunternehmen profitieren am meisten. Fertigungsunternehmen mit großem MRO-Anteil gewinnen besonders durch konsistente Teilecodierung."
                  },
                  {
                    q: "Kann Pearstop deutschsprachige Einkaufsdaten klassifizieren?",
                    a: "Ja. Pearstops Klassifizierungs-Engine verarbeitet deutschsprachige Rechnungsbeschreibungen nativ, einschließlich gängiger Abkürzungen und technischer Terminologie."
                  }
                ].map((item, i) => (
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

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="quote-card">
                <div className="story-label">Verwandte Seiten</div>
                <p>Entdecken Sie den vollständigen UNSPSC-Klassifizierungsservice, unsere Niederlande-Seite und den FM-spezifischen Ansatz.</p>
                <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <Link href="/unspsc" className="btn btn-secondary">UNSPSC Klassifizierung</Link>
                  <Link href="/unspsc-classification-netherlands" className="btn btn-secondary">UNSPSC Klassifizierung Niederlande</Link>
                  <Link href="/unspsc-classification-facilities-management" className="btn btn-secondary">UNSPSC für Facility Management</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <CTABand
        title="Bereit, Ihre Beschaffungsklassifizierung zu automatisieren?"
        lead="Buchen Sie eine 7-minütige Discovery. Wir zeigen Ihnen, wie die Klassifizierungs-Engine mit Ihren Daten funktioniert."
        actions={[{ label: "7-minütige Discovery buchen", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
