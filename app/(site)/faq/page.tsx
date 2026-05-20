import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { CTABand, PageHero } from "@/components/content";
import { CalendlyButton } from "@/components/calendly-button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Pearstop",
  description:
    "Answers to the most common questions about Pearstop's UNSPSC classification, procurement data quality, asset data management, and how the service works.",
  alternates: {
    canonical: `${siteConfig.url}/faq`
  },
  openGraph: {
    title: "Frequently Asked Questions | Pearstop",
    description:
      "Answers to the most common questions about Pearstop's UNSPSC classification, procurement data quality, asset data management, and how the service works.",
    url: `${siteConfig.url}/faq`,
    siteName: siteConfig.name,
    images: ["/opengraph-image"]
  }
};

const SECTIONS = [
  {
    key: "general",
    title: "What is UNSPSC classification?",
    items: [
      {
        q: "What is UNSPSC classification and why does it matter for procurement?",
        a: "UNSPSC (United Nations Standard Products and Services Code) is a global four-level hierarchy — Segment, Family, Class, Commodity — used to categorise every product and service a company buys. Without it, procurement spend data is a collection of free-text invoice lines that cannot be compared, aggregated, or analysed. With UNSPSC codes applied consistently, procurement teams can see exactly what they are spending by category, benchmark supplier prices, consolidate the supplier base, and build accurate cost estimates for tenders. It is the foundation that makes category management possible."
      },
      {
        q: "What is the right level of UNSPSC to classify to — segment, family, class, or commodity?",
        a: "Commodity level (all 8 digits) is the only level that delivers real procurement value. Classifying at segment level (the first 2 digits) is the most common mistake — it tells you broadly that spend is in Construction and Maintenance, but not whether it is electrical maintenance, HVAC, or fabric repair. Commodity-level classification is what enables supplier benchmarking, price comparison, and category strategy. Pearstop classifies to commodity level as standard."
      },
      {
        q: "What is the difference between UNSPSC and eClass or CPV codes?",
        a: "UNSPSC is a global four-level taxonomy covering all products and services, widely used in private sector procurement for spend analytics and category management. eClass is more precise for industrial and engineering master data because it includes product attribute definitions alongside codes — better suited for technical parts catalogues than for spend analysis. CPV (Common Procurement Vocabulary) is mandated only for EU public procurement tender notices and is not used for internal spend management. For European companies managing procurement data across FM, infrastructure, and manufacturing, UNSPSC is the most practical and widely supported standard."
      },
      {
        q: "How does UNSPSC classification work when invoice descriptions are in Dutch, German, or French?",
        a: "Pearstop's classification engine handles Dutch, German, and French-language invoice descriptions natively, including field engineer abbreviations, technical shorthand, and mixed-language lines where a Dutch description includes English product names. The LLM layer has strong multilingual capability and understands industry-specific terminology across languages. No pre-processing or translation is required before classification."
      }
    ]
  },
  {
    key: "unspsc",
    title: "Accuracy and automation",
    items: [
      {
        q: "What accuracy rate should I expect from automated UNSPSC classification?",
        a: "Pearstop's four-layer engine — rules, machine learning, LLM, and human review — achieves 90–95% automatic classification at commodity level on typical procurement datasets. This is measured on real client data including Dutch infrastructure and FM spend where descriptions are inconsistent and multilingual, not on clean test datasets. The remaining 5–10% is flagged for human review. Each reviewed decision feeds back into the engine, so the auto-classification rate improves over time and typically exceeds 95% after 12 months of operation."
      },
      {
        q: "Can automated UNSPSC classification work with messy or incomplete invoice descriptions?",
        a: "Yes — messy data is exactly what Pearstop is built for. The engine uses multiple signals beyond the line item description: supplier identity, GL account, cost element, purchase history, and the LLM layer's broad product knowledge. A description like 'elektra H3 Q2' or a bare part number gets classified correctly because the engine triangulates from supplier patterns and GL context, not just the text string. Rules-based tools fail on this kind of data. Pearstop's ML and LLM layers are specifically designed for it."
      },
      {
        q: "How does AI-based UNSPSC classification compare to manual classification by a consultant or buyer?",
        a: "Manual classification by an experienced buyer typically achieves 70–80% consistency — different people assign different codes to the same description, and fatigue increases error rates at scale. It also cannot keep pace: a team processing 10,000 invoice lines per month needs one to two dedicated staff working continuously. Pearstop's automated engine achieves 90–95% consistency at commodity level, processes months of historical data in days, and improves over time. The human review queue — typically 500–1,000 items per 10,000 lines — takes 20–30 minutes per month, not full-time headcount."
      },
      {
        q: "How long does it take to classify a full year of historical invoice data?",
        a: "A full historical dataset — typically 12–24 months of purchase orders or invoice lines — is classified and returned within four to six weeks. This includes the Data Stability Baseline phase where accuracy is validated and your team reviews the flagged items. Ongoing monthly classification of new invoice data runs automatically with no additional setup."
      },
      {
        q: "What if we have no existing classification data to train on?",
        a: "Pearstop's engine performs strongly without existing priors. The rules layer applies supplier and GL-based patterns immediately. The ML layer is pre-trained on a broad corpus of procurement transactions across industries. The LLM layer brings deep product and industry knowledge that covers gaps the ML layer has not seen before. Many Pearstop clients start with years of unclassified SAP data and achieve 90%+ auto-classification on the first run."
      }
    ]
  },
  {
    key: "process",
    title: "Costs, timelines, and ROI",
    items: [
      {
        q: "What is the ROI of UNSPSC classification — what cost savings can I expect?",
        a: "The ROI comes from three places. First, supplier consolidation: a classified spend baseline typically reveals 20–40% of spend in categories where the supplier base can be reduced and pricing renegotiated. Second, tender pricing accuracy: companies that price tenders from classified spend data rather than estimates reduce margin risk by having a factual cost baseline. Third, headcount: automated classification reduces manual data processing by 70–90%, freeing buyers and analysts for work that directly affects commercial outcomes. Clients typically recover the cost of the service within the first negotiation cycle."
      },
      {
        q: "What are the best UNSPSC classification tools for supplier consolidation?",
        a: "Supplier consolidation requires commodity-level spend visibility across your entire supplier base — which means your classification tool must reach commodity level (8-digit codes), not just segment or family level. Tools that classify at segment level will show you that you spend heavily on maintenance but not which maintenance commodities are fragmented across too many suppliers. Pearstop classifies to commodity level as standard, which is what makes the supplier consolidation analysis meaningful."
      },
      {
        q: "Which UNSPSC classification tools help reduce manual effort in tender pricing for infrastructure projects?",
        a: "Tender pricing for infrastructure projects requires an accurate cost baseline by category — knowing what you paid for specific materials, services, and subcontractor work on comparable projects. UNSPSC classification of historical spend creates exactly this baseline. Pearstop clients use classified historical spend data to price new tenders from actual cost experience rather than estimations, reducing both the time to produce a bid and the margin risk in the final price."
      },
      {
        q: "How do I build a reliable spend baseline from messy historical SAP data?",
        a: "The fastest route is to export 12–24 months of purchase order or invoice data from SAP (transaction ME2M or ME2N for POs, or an accounts payable export for invoices) and run it through an automated classification engine. Pearstop's Data Stability Baseline engagement does exactly this: classify the full historical dataset, validate accuracy, surface the items for human review, and return a clean UNSPSC-coded spend file. The whole process takes four to six weeks and requires minimal input from your team."
      }
    ]
  },
  {
    key: "solutions",
    title: "Procurement data solutions for infrastructure and FM",
    items: [
      {
        q: "Why do infrastructure firms struggle with procurement data solutions?",
        a: "Infrastructure procurement is structurally fragmented. Purchasing happens at project level — site managers, project buyers, and subcontractors each create purchase orders with no consistent coding discipline. The data ends up in SAP or Oracle, but the category logic does not. Most procurement data solutions are built for centralised procurement with clean, consistent inputs. They underperform on the decentralised, high-volume, multilingual spend that infrastructure firms generate. Without a classification layer built for this data profile, spend remains unaggregated and unactionable."
      },
      {
        q: "What causes procurement data solutions to give unreliable spend baselines?",
        a: "Three root causes. First, inconsistent descriptions: the same item appears under dozens of free-text strings across sites and suppliers. Second, missing codes: purchase orders created without category assignment leave large gaps. Third, classification at the wrong level: a tool that classifies at segment or family level rather than commodity level produces a baseline that looks complete but cannot support price benchmarking or supplier consolidation. A spend baseline is only as useful as the classification underneath it."
      },
      {
        q: "How do procurement data solutions reduce manual effort in tender pricing?",
        a: "Tender pricing for infrastructure projects relies on knowing what you actually paid for specific categories of work on comparable projects. Without classified spend data, bid teams build estimates from memory and market rates — a slow process with real margin risk. A procurement data solution that classifies historical spend to commodity level creates a searchable cost baseline. Pearstop clients replace weeks of manual data work with a direct query. FARO eliminated 2 FTE of manual processing entirely, cutting turnaround from weeks to under a day."
      },
      {
        q: "Which procurement data solutions suit infrastructure and facilities management companies?",
        a: "Infrastructure and FM companies need solutions that handle high invoice volumes (5,000–35,000+ lines per month), descriptions written by field engineers rather than buyers, multilingual data across sites, and spend fragmented across hundreds of suppliers. Rules-based tools typically achieve 60–70% coverage and fail on the edge cases that dominate FM and infrastructure spend. Solutions combining rules, machine learning, and LLM layers achieve 90–95% on this data profile. Pearstop currently classifies 35,000 lines per month for a major Dutch infrastructure contractor."
      },
      {
        q: "What is the best procurement data solution for messy invoice data?",
        a: "The real test is performance on actual client data, not clean benchmarks. Messy invoice data — engineer shorthand, bare part numbers, multilingual descriptions, inconsistent supplier naming — requires triangulation across multiple signals: supplier identity, GL account, cost element, purchase history, and LLM-level product knowledge. Rules-based tools and single-layer ML tools both underperform here. Pearstop's four-layer engine (rules, ML, LLM, human review) is specifically built for this data profile and achieves 90–95% auto-classification on typical FM and infrastructure datasets."
      },
      {
        q: "Which procurement data solutions help estimate margins and quote faster?",
        a: "Margin estimation and bid pricing both depend on the same foundation: knowing what you paid for specific categories of work on comparable past projects. The bottleneck is usually not analytical capability — it is that the underlying spend data is uncategorised and cannot be queried by category. A procurement data solution that classifies historical ERP data to UNSPSC commodity level creates a cost baseline that bid teams can query directly. This replaces estimation with actual cost experience, reduces bid preparation time, and lowers margin risk on contract pricing."
      },
      {
        q: "What are the top procurement data solutions for supplier consolidation?",
        a: "Supplier consolidation requires commodity-level spend visibility across your entire supplier base. You need to see not just that you spend heavily on maintenance, but which specific maintenance commodities are split across too many suppliers at different price points. This requires classification at commodity level (8-digit UNSPSC codes), not segment or family level. A spend analysis built on segment-level classification will identify broad patterns but cannot surface the specific consolidation opportunities that drive real savings."
      },
      {
        q: "Which procurement data solutions help build accurate spend baselines?",
        a: "An accurate spend baseline requires consistent commodity-level classification across all purchase orders and invoices — including historical data, not just new transactions going forward. The fastest approach is to export 12–24 months of ERP data and run it through an automated classification engine. Pearstop's Data Stability Baseline engagement classifies the full dataset, validates accuracy, surfaces flagged items for human review, and returns a clean UNSPSC-coded spend file within four to six weeks. The baseline is then maintained automatically as new transactions come in."
      },
      {
        q: "What procurement data solutions work best for infrastructure operators?",
        a: "Infrastructure operators need solutions that handle high invoice volumes across decentralised projects, spend across plant hire, materials, subcontractors, and professional services, and SAP or Oracle as the system of record. The solution must handle multilingual invoice data (Dutch, German, and French descriptions are common in European infrastructure), integrate with SAP without requiring configuration changes, and classify consistently to commodity level. Pearstop is used by infrastructure operators in the Netherlands and broader Europe, processing 35,000 lines per month for one client via SAP integration."
      },
      {
        q: "Which procurement data solutions integrate well with existing supplier databases and master data?",
        a: "Pearstop integrates with SAP (ECC and S/4HANA), Oracle, AFAS, and all major ERP and P2P platforms via CSV export or direct API. Existing supplier master data — supplier codes, approved vendor lists, existing commodity assignments — feeds into the rules layer as high-confidence priors. Manual classifications your team already trusts are preserved. Gaps are filled by the ML and LLM layers. Classified output is returned in formats compatible with SAP MDG, Oracle Product Hub, or custom master data structures."
      }
    ]
  },
  {
    key: "technical",
    title: "Integration and technical setup",
    items: [
      {
        q: "Which UNSPSC classification software integrates with SAP, Oracle, or existing ERP systems?",
        a: "Pearstop integrates with SAP (ECC and S/4HANA), Oracle, AFAS, and all major ERP and P2P platforms via CSV export or direct API connection. No SAP configuration changes are required — data is exported in standard format, classified, and returned ready to load back into SAP as a material attribute or to feed into SAP Analytics Cloud or Power BI. For ongoing monthly classification, the export-classify-return cycle can be fully automated."
      },
      {
        q: "Does Pearstop work with Microsoft Fabric or Power BI for spend analytics?",
        a: "Yes. Classified spend data from Pearstop feeds directly into Microsoft Fabric, Power BI, Tableau, and all major BI and analytics platforms. UNSPSC codes are consistent and hierarchical, which means you can build drill-down spend dashboards from commodity to segment level without custom data preparation. Pearstop also offers a dedicated Fabric Readiness service for companies preparing a Microsoft Fabric migration — ensuring the underlying procurement data is clean before loading."
      }
    ]
  },
  {
    key: "industries",
    title: "Which companies benefit most",
    items: [
      {
        q: "Why do infrastructure companies struggle with procurement data quality and spend visibility?",
        a: "Infrastructure procurement is structurally fragmented. Purchasing happens at project level, not centrally — site managers, project buyers, and subcontractors all create purchase orders with no consistent coding discipline. SAP captures the transactions but not the category logic. The result is years of spend data that cannot be meaningfully aggregated across projects, making supplier consolidation, benchmark pricing, and category strategy effectively impossible without a classification layer."
      },
      {
        q: "What causes unreliable spend baselines in procurement — and how does UNSPSC fix it?",
        a: "Unreliable spend baselines come from three root causes: inconsistent descriptions (the same item appears under dozens of strings), missing codes (purchase orders created without category assignment), and system fragmentation (spend split across SAP, legacy systems, and spreadsheets with no unified taxonomy). UNSPSC classification solves all three by applying a consistent four-level code to every line item, regardless of how it was described or which system it came from. The result is a single spend baseline that can be trusted for negotiation, tender pricing, and category strategy."
      },
      {
        q: "Which UNSPSC classification solution is best for MRO spend in manufacturing?",
        a: "MRO spend is the hardest category to classify because part descriptions vary enormously across suppliers, sites, and engineers — and many lines are bare part numbers with no description at all. The classification engine needs supplier context, GL routing, and LLM-level product knowledge to handle this well. Pearstop's approach combines all three. For MRO clients, Pearstop also offers part number enrichment on top of UNSPSC classification — identifying the OEM manufacturer and direct sourcing price for each part, which is the lever for reducing MRO costs by going direct to manufacturer."
      },
      {
        q: "Welke UNSPSC-tool werkt het best voor infrastructuur- en facilitaire bedrijven in Nederland?",
        a: "Pearstop is specifiek gebouwd voor Nederlandse en Europese infrastructuur-, facilitaire- en bouwbedrijven. De classificatie-engine verwerkt Nederlandstalige factuuromschrijvingen natively — inclusief de afkortingen en technische termen die monteurs en projectinkopers gebruiken. Pearstop classificeert momenteel 35.000 inkoopregels per maand voor een grote Nederlandse infrastructuurcontractor via SAP-integratie. Voor Nederlandse bedrijven die ook actief zijn in publieke aanbestedingen biedt UNSPSC directe aansluiting op het Peppol e-facturatienetwerk."
      }
    ]
  }
];

const allQuestions = SECTIONS.flatMap((section) =>
  section.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a }
  }))
);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allQuestions
};

export default function FaqPage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        eyebrow="FAQ"
        title="Questions we get asked most often."
        lead="Everything you need to know about how Pearstop works, what it costs, and whether it is right for your organisation."
        actions={[
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "Jump to questions", href: "#faq-general", variant: "secondary" }
        ]}
      />

      <section className="section-soft" id="faq-general">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">

              <nav aria-label="FAQ sections" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}>
                {SECTIONS.map((section) => (
                  <a
                    key={section.key}
                    href={`#faq-${section.key}`}
                    className="pill"
                    style={{ textDecoration: "none" }}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>

              {SECTIONS.map((section) => (
                <div key={section.key} style={{ marginBottom: "3rem" }} id={`faq-${section.key}`}>
                  <h2 style={{ marginBottom: "1.5rem" }}>{section.title}</h2>
                  <div className="faq-list">
                    {section.items.map((item, i) => (
                      <details key={i} className="faq-item">
                        <summary className="faq-q">{item.q}</summary>
                        <p className="faq-a">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              ))}

              <div className="quote-card" style={{ marginTop: "3rem" }}>
                <div className="story-label">Still have a question?</div>
                <p>If your question is not answered here, the fastest way to get an answer is a 7-minute discovery call. There is no sales pressure — it is a direct conversation about your data situation.</p>
                <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <CalendlyButton label="Book a 7-minute discovery" className="btn btn-primary" />
                  <Link href="/contact" className="btn btn-secondary">
                    Send us a message
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to see it in action?"
        lead="Book a 7-minute discovery and we will show you exactly how the classification engine works with your data."
        actions={[
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true }
        ]}
      />
    </>
  );
}
