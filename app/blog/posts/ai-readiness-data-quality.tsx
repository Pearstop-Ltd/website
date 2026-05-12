import { BlogQuote, ChecklistSection, SoftCta } from "@/components/blog";
import Link from "next/link";

export default function AiReadinessDataQuality() {
  return (
    <>
      <p>Every organisation we speak to wants to use AI. Most of them cannot — not because the technology is unavailable, but because their data is not ready for it. AI tools do not create structure from chaos. They amplify whatever structure already exists. If your input data is inconsistent, fragmented, and poorly classified, the AI output will be confidently, expensively wrong.</p>

      <h2 id="what-ai-requires">What AI tools actually require from your data</h2>
      <p>Modern AI platforms — including Microsoft Copilot, Power BI with AI features, Microsoft Fabric, and third-party procurement intelligence tools — share a common assumption: the data they operate on is structured, consistent, and trustworthy.</p>
      <p><strong>Structured</strong> means fields contain what they are supposed to contain. Asset type is an asset type, not a free-text field that reads "pump (check with Brian)". <strong>Consistent</strong> means the same concept is described the same way across the dataset. <strong>Trustworthy</strong> means the data has been validated against a known standard, not just accumulated without quality checks.</p>
      <p>When these conditions are not met, AI tools do not fail cleanly. They produce outputs that look authoritative — well-formatted dashboards, confident predictions — but are based on inputs that do not accurately represent the business.</p>

      <h2 id="fabric-reality">The Microsoft Fabric reality</h2>
      <p>Many organisations in hard services, construction, and infrastructure are currently planning or executing a migration to Microsoft Fabric. This is a reasonable strategic direction. Fabric is powerful and well-integrated with the Microsoft ecosystem.</p>
      <p>The problem is timing. Fabric migrations surface data quality issues in an uncomfortable way — at exactly the moment when the organisation is most invested in making the platform work. The pattern is consistent: the migration begins, the data is loaded, and the dashboards reveal inconsistencies that were not visible before. The first months of a Fabric deployment get consumed by data remediation rather than value creation.</p>
      <p>The organisations that get the most from Fabric are the ones that resolve their data quality issues before migration. The data that flows into the platform is clean, classified, and consistently structured. The deployment delivers value from day one.</p>

      <h2 id="checklist">AI readiness: a practical checklist</h2>
      <p>Before your organisation is ready to extract value from AI tools, five data conditions need to be in place:</p>
      <ChecklistSection
        title="AI Data Readiness Checklist"
        items={[
          { label: "Consistent spend classification", detail: "Are all procurement lines classified to a recognised standard such as UNSPSC or eClass? Or described in free text that varies by user, site, and system?" },
          { label: "Deduplicated supplier records", detail: "Does each supplier appear as one record? Siemens Building Technologies Ltd, Siemens BT, and Siemens invoice are three records that should be one." },
          { label: "Accurate asset data", detail: "Do asset records contain manufacturer name, model number, and installation date — or just a label and a location?" },
          { label: "Validated data entry", detail: "When new data enters the system, is it checked against your existing data structure automatically, or does it arrive in whatever format the sender used?" },
          { label: "Historical data quality baseline", detail: "Do you know what percentage of your current data is correctly classified, complete, and consistent — or is that an open question?" },
        ]}
      />
      <p>If two or more of these conditions are not met, your AI readiness is lower than the IT roadmap suggests.</p>

      <h2 id="preparation">What good data preparation looks like</h2>
      <p><strong>Phase 1 — Baseline assessment.</strong> A structured evaluation of the current data: what is missing, what is inconsistent, and where the biggest quality gaps are. Output: a cleaned sample dataset and a clear action plan.</p>
      <p><strong>Phase 2 — Automated cleaning and enrichment.</strong> Machine learning handles the high-volume corrections. Cases requiring judgement are flagged for human review. This phase typically handles 85–95% of the remediation work without manual intervention.</p>
      <p><strong>Phase 3 — Ongoing quality control.</strong> A continuous layer that validates new data as it enters the system, maintaining the quality standard rather than allowing it to degrade over time.</p>
      <p>If you want to understand how ready your data actually is, a <Link href="/contact">data quality baseline</Link> is the right starting point.</p>

      <SoftCta
        type="checklist"
        title="Download: AI Data Readiness Checklist"
        description="A one-page checklist you can run against your current ERP and asset data today. Identify exactly where your data readiness gaps are before your next AI or Fabric project."
        ctaLabel="Book a 7-minute discovery call"
        ctaHref="/contact"
      />
    </>
  );
}
