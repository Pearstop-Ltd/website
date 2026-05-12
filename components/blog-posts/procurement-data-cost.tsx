import { BlogQuote, SoftCta } from "@/components/blog";
import Link from "next/link";

export default function ProcurementDataCost() {
  return (
    <>
      <p>Most procurement teams know their data is not perfect. What they consistently underestimate is what that imperfection costs — not as an abstract inefficiency, but as a direct drag on margin.</p>
      <p>The numbers are blunt. Research consistently shows that companies with poor procurement data quality leave between 1% and 3% of total spend on the table every year. On a €50M procurement budget, that is up to €1.5M in avoidable cost. Not because the contracts are bad. Not because the suppliers are overcharging. But because without clean, categorised, consistent data, you simply cannot see where the problem is.</p>

      <h2 id="the-problem">The problem is not the data. It is what you cannot do with it.</h2>
      <p>Most procurement leaders we speak to have data — plenty of it. ERP exports, invoice histories, supplier databases, and spreadsheets maintained by people who know their datasets intimately. The problem is not volume. It is structure.</p>
      <p>When spend data is not consistently categorised, a predictable set of problems emerges:</p>
      <ul>
        <li>The same product appears under five different descriptions across three business units</li>
        <li>The same supplier is registered under four different names, so total spend is invisible</li>
        <li>Category reporting takes weeks to produce and still gets challenged in board meetings</li>
        <li>Analytics and AI tools are implemented on top of messy inputs and deliver unreliable outputs</li>
        <li>Procurement cannot build a credible case for contract renegotiation because the volume data does not hold up</li>
      </ul>

      <h2 id="where-cost-hides">Where the cost hides: three real patterns</h2>
      <p><strong>Pattern 1: Invisible supplier volume.</strong> A large infrastructure company ran a data quality baseline and discovered that a supplier they believed was receiving €300K in annual spend was actually receiving over €1.2M — spread across different invoice descriptions, different business units, and different cost codes that had never been aggregated. That insight led immediately to a renegotiation. The saving in year one covered the cost of the data work many times over.</p>
      <p><strong>Pattern 2: Category spend you cannot act on.</strong> A facilities management company wanted to build a category strategy for HVAC maintenance across their portfolio. When they pulled the data, the same filter type appeared as "HVAC filter 400mm", "air filter F7", "filter panel medium", and "PPE consumables — ventilation" depending on who had entered the invoice. These were the same product, purchased from different suppliers at different prices, with no ability to compare or consolidate.</p>
      <p><strong>Pattern 3: Tender pricing based on guesswork.</strong> A construction company pricing a new facilities contract had historical spend data across dozens of completed projects — but none of it was consistently categorised. Estimators had to rely on memory and judgment rather than pulling actuals by asset type and service category. The result: margins padded to cover uncertainty.</p>

      <h2 id="what-clean-data-enables">What good procurement data actually enables</h2>
      <p>When procurement data is structured, enriched, and consistently categorised — typically using a standard like UNSPSC — the picture changes quickly.</p>
      <ul>
        <li><strong>Supplier consolidation with real leverage.</strong> You can see total spend per supplier across all variants of their name. That figure becomes a negotiating position.</li>
        <li><strong>Genuine category management.</strong> Spend grouped into consistent categories can be analysed, benchmarked, and managed against market rates.</li>
        <li><strong>Faster, more accurate tender pricing.</strong> When cost data is classified and linked to asset types, pricing a new tender means retrieving actuals rather than constructing estimates.</li>
        <li><strong>Analytics and AI that work as advertised.</strong> Clean inputs produce reliable outputs. Messy inputs produce expensive noise.</li>
      </ul>

      <BlogQuote
        quote="For the first time, we could trust our spend reports. I used the outputs to build our first strategic sourcing report that actually held up under CFO scrutiny."
        author="Head of Procurement"
        role="European infrastructure company"
      />

      <h2 id="the-process">The process: how data quality work actually happens</h2>
      <p>The most common misunderstanding is that improving procurement data quality requires a full ERP migration or a multi-year transformation programme. It does not.</p>
      <p><strong>Stage 1 — Baseline.</strong> Understanding what data you currently have: what is missing, what is inconsistent, and where the biggest classification gaps are. This stage produces a cleaned dataset you keep, plus a clear view of what needs to happen next.</p>
      <p><strong>Stage 2 — Automated cleaning and enrichment.</strong> The high-volume, repeatable corrections are handled by automation. The model is trained on your specific data, so it learns how your business describes what it buys. Ambiguous cases are surfaced for human review. This stage typically handles 85–95% of corrections without manual intervention.</p>
      <p><strong>Stage 3 — Ongoing quality control.</strong> New data entering the system is validated against the same standard as the cleaned data. Quality does not degrade over time because the checks run automatically.</p>

      <SoftCta
        type="case-study"
        title="See how Strukton and SPIE cut procurement costs with clean data"
        description="Download our case studies to see how leading hard services companies have built procurement strategies on a reliable data foundation — and what it meant for their margins."
        ctaLabel="Get the case studies →"
        ctaHref="/case-studies"
      />
    </>
  );
}
