import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { CTABand, PageHero, QuoteBox, SectionTitle } from "@/components/content";
import { UnspscLookupCta } from "@/components/unspsc-lookup-cta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "UNSPSC Classificatie Nederland | Geautomatiseerde Inkoopclassificatie | Pearstop",
  description:
    "Geautomatiseerde UNSPSC classificatie voor Nederlandse inkoop- en procurement teams. Pearstop classificeert inkoopdata vanuit SAP, AFAS, en andere ERP-systemen — inclusief Peppol-ondersteuning.",
  alternates: {
    canonical: `${siteConfig.url}/unspsc-classification-netherlands`
  },
  openGraph: {
    title: "UNSPSC Classificatie Nederland | Geautomatiseerde Inkoopclassificatie | Pearstop",
    description:
      "Geautomatiseerde UNSPSC classificatie voor Nederlandse inkoop- en procurement teams. Pearstop classificeert inkoopdata vanuit SAP, AFAS, en andere ERP-systemen — inclusief Peppol-ondersteuning.",
    url: `${siteConfig.url}/unspsc-classification-netherlands`,
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
  description:
    "Automated UNSPSC classification for Dutch procurement teams. Pearstop classifies procurement spend data from Dutch ERP systems at scale, supporting Peppol compliance and spend visibility for infrastructure, FM, and construction companies in the Netherlands.",
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
    {
      "@type": "ListItem",
      position: 3,
      name: "UNSPSC Classification Netherlands",
      item: `${siteConfig.url}/unspsc-classification-netherlands`
    }
  ]
};

export default function UnspscNLPage() {
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
        eyebrow="UNSPSC Classificatie Nederland"
        title="UNSPSC classificatie voor Nederlandse infrastructuur-, FM-, en bouwbedrijven."
        lead="Pearstop automatiseert de classificatie van inkoopregels naar UNSPSC-standaard — 90–95% zonder handmatige inspanning. Inclusief ondersteuning voor Peppol e-facturatie en Nederlandse ERP-systemen."
        actions={[
          { label: "Boek een 7-minuten discovery", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "Peppol en UNSPSC", href: "#peppol", variant: "secondary" }
        ]}
      />

      <section id="peppol">
        <div className="container">
          <SectionTitle
            eyebrow="Peppol en UNSPSC in Nederland"
            title="Waarom Nederlandse bedrijven nu aan UNSPSC classificatie werken"
            lead="Peppol e-facturatie is verplicht voor overheidsinkoop in Nederland. UNSPSC is de internationale standaard die daarbij aansluit."
          />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">📋</div>
              <h3>Peppol vereist gestructureerde productcodes</h3>
              <p>Het Peppol-netwerk vereist gestructureerde, machineleesbare factuurdata. UNSPSC is de meest gebruikte internationale classificatiestandaard die hieraan voldoet.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">🔗</div>
              <h3>Consistente categorisering over leveranciers heen</h3>
              <p>Met UNSPSC krijgt elke inkooporder een consistente categorie — ongeacht de leverancier of het systeem.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">✓</div>
              <h3>Spend-zichtbaarheid voor categoriebeheer</h3>
              <p>Een geclassificeerd inkoopbestand is de basis voor categoriebeheer, contractonderhandeling, en het identificeren van besparingsmogelijkheden.</p>
            </article>
          </div>
        </div>
      </section>


      <section className="section-soft">
        <div className="container">
          <SectionTitle
            eyebrow="De aanpak"
            title="Hoe Pearstop Nederlandse inkoopdata classificeert"
            lead="Pearstop verwerkt inkoopdata uit SAP, AFAS, Oracle, en andere systemen — inclusief Nederlandstalige omschrijvingen."
          />
          <div className="hiw-grid">
            <article className="hiw-card">
              <div className="hiw-badge">1</div>
              <h3>Data-export uit uw ERP</h3>
              <p>Exporteer inkooporders, factuurregels, of een combinatie — via CSV of directe API-verbinding vanuit SAP, AFAS, of een ander systeem.</p>
            </article>
            <article className="hiw-card featured">
              <div className="hiw-badge">2</div>
              <h3>Automatische classificatie</h3>
              <p>Pearstop's vier-laags engine classificeert 90–95% van de regels automatisch, inclusief Nederlandstalige omschrijvingen.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">3</div>
              <h3>Menselijke review van twijfelgevallen</h3>
              <p>De resterende 5–10% wordt ter beoordeling aangeboden aan uw team. Elke beslissing verbetert het model.</p>
            </article>
            <article className="hiw-card">
              <div className="hiw-badge">4</div>
              <h3>Geclassificeerde data terug in uw systeem</h3>
              <p>Het geclassificeerde bestand wordt geretourneerd in uw oorspronkelijke formaat — klaar voor SAP, Power BI, of Peppol-facturatie.</p>
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

      <UnspscLookupCta />

      <section className="section-soft" id="faq">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <SectionTitle title="Veelgestelde vragen" />
              <div className="faq-list">
                {[
                  {
                    q: "Is UNSPSC classificatie verplicht in Nederland?",
                    a: "UNSPSC is geen wettelijke verplichting in Nederland, maar wordt steeds meer gebruikt als best-practice standaard. Peppol e-facturatie, verplicht voor overheidsinkoop, vereist gestructureerde productcodes waarbij UNSPSC de meest gebruikte internationale standaard is."
                  },
                  {
                    q: "Wat is Peppol en hoe verhoudt het zich tot UNSPSC?",
                    a: "Peppol is het e-facturatienetwerk dat verplicht is voor overheidsinkoop in Nederland. Peppol vereist gestructureerde factuurdata inclusief product- en dienstcodes. UNSPSC is de meest gebruikte classificatiestandaard die hierbij aansluit."
                  },
                  {
                    q: "Wat is UNSPSC classificatie en waarom is het belangrijk?",
                    a: "UNSPSC staat voor United Nations Standard Products and Services Code. Zonder UNSPSC zijn inkoopdata moeilijk te analyseren — met UNSPSC krijgt elke inkooporder een consistente categorie waardoor spend-analyse, leveranciersconsolidatie en categoriebeheer mogelijk worden."
                  },
                  {
                    q: "Welke Nederlandse bedrijven hebben UNSPSC classificatie het meest nodig?",
                    a: "Nederlandse infrastructuurcontractors, facilitaire dienstverleners, en bouwbedrijven hebben doorgaans de meeste behoefte aan UNSPSC classificatie."
                  },
                  {
                    q: "Hoe classificeert Pearstop Nederlandse inkoopdata?",
                    a: "Pearstop ontvangt inkoopdata via CSV of directe API-verbinding vanuit Nederlandse ERP-systemen inclusief SAP, Oracle, en AFAS. De vier-laags classificatie-engine verwerkt ook Nederlandstalige factuuromschrijvingen."
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
                <div className="story-label">Gerelateerd</div>
                <p>Bekijk de volledige UNSPSC classificatiedienst, Nederlandse cases, en de FM-specifieke aanpak.</p>
                <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <Link href="/unspsc" className="btn btn-secondary">UNSPSC Classificatie</Link>
                  <Link href="/cases" className="btn btn-secondary">Cases</Link>
                  <Link href="/unspsc-classification-facilities-management" className="btn btn-secondary">UNSPSC voor Facilitaire Diensten</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <CTABand
        title="Klaar om uw inkoopclassificatie te automatiseren?"
        lead="Boek een 7-minuten discovery. We laten u zien hoe de classificatie-engine met uw data werkt."
        actions={[{ label: "Boek een 7-minuten discovery", href: siteConfig.calendly, variant: "primary", external: true }]}
      />
    </>
  );
}
