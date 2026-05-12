import { BlogQuote, SoftCta } from "@/components/blog";

export default function AssetRegisterProblems() {
  return (
    <>
      <p>Most facilities management companies have an asset register. Most of them do not trust it. In conversations with asset managers across hard FM and infrastructure, the same pattern comes up: the register exists, people refer to it, but the underlying data is unreliable enough that real decisions — maintenance planning, lifecycle replacement, bid pricing — still get made on instinct or from memory.</p>

      <h2 id="what-bad-looks-like">What a failing asset register actually looks like</h2>
      <p>The signs are specific and recognisable:</p>
      <ul>
        <li><strong>Missing manufacturer and model data.</strong> A significant percentage of assets are listed as "Pump — Building A" or "HVAC Unit — Floor 3" with no manufacturer name, no model number, and no installation date.</li>
        <li><strong>Inconsistent naming conventions.</strong> "Air Handling Unit", "AHU", "air handler", and "ventilation unit" are four descriptions of the same thing — but in a database, they are four separate categories.</li>
        <li><strong>Duplicate records.</strong> The same generator might appear three times with three different asset IDs and three different maintenance histories.</li>
        <li><strong>Decommissioned assets still listed as active.</strong> When assets are removed or replaced, the register often is not updated. Ghost records accumulate with ghost maintenance schedules and ghost insurance premiums.</li>
        <li><strong>No linkage between asset and parts data.</strong> The asset exists in the register but there is no structured connection to the components used to maintain it.</li>
      </ul>

      <h2 id="financial-cost">The financial cost: a real example</h2>
      <p>One Asset Manager we worked with discovered, after running a data quality baseline, that his company had been paying insurance premiums on assets they had sold or decommissioned years earlier. The register had never been updated to reflect the disposals. When the cleaned register was compared against the insurance schedule, the discrepancy was significant. Assets that no longer existed were still being insured. The annual premium adjustment was substantial — and the issue had been invisible until the data was cleaned.</p>

      <h2 id="what-it-enables">What an accurate asset register enables</h2>
      <p><strong>Predictive maintenance.</strong> When assets carry accurate manufacturer, model, and installation date information, you can link them to lifecycle and failure data. The shift from reactive to predictive maintenance is only possible when the data supports it.</p>
      <p><strong>Lifecycle decision-making.</strong> The question "should we repair or replace this asset?" is a straightforward financial calculation — if you know the asset's age, its maintenance history, and its replacement cost.</p>
      <p><strong>Accurate bid pricing.</strong> When pricing a maintenance contract, the asset register is the source of truth for what you are committing to maintain. An inaccurate register means you are pricing based on an estimate of what is on site.</p>
      <p><strong>Rapid recall response.</strong> When a manufacturer issues a recall for a specific model of HVAC motor, the ability to identify every affected unit across a portfolio should take minutes, not weeks.</p>

      <h2 id="missing-data">What is typically missing and how AI fills the gaps</h2>
      <table>
        <thead><tr><th>Field</th><th>Typical gap</th><th>How it gets filled</th></tr></thead>
        <tbody>
          <tr><td>Manufacturer</td><td>Missing or abbreviated</td><td>Matched against supplier invoice data and manufacturer databases</td></tr>
          <tr><td>Model number</td><td>Missing or free-text</td><td>Extracted from maintenance records, PDFs, and previous service reports</td></tr>
          <tr><td>Installation date</td><td>Missing or estimated</td><td>Inferred from commissioning records and historical maintenance logs</td></tr>
          <tr><td>Asset classification</td><td>Inconsistent naming</td><td>Standardised against Uniclass or OmniClass taxonomy</td></tr>
          <tr><td>Component linkage</td><td>Not structured</td><td>Built from MRO purchase history linked to asset ID</td></tr>
        </tbody>
      </table>

      <h2 id="ongoing-maintenance">The ongoing maintenance problem</h2>
      <p>A cleaned asset register degrades without active maintenance. New assets get added, old ones get removed, and unless there is a systematic quality check on incoming data, the problems accumulate again. The sustainable fix is an automated quality control layer: every new asset record is checked against the existing structure and flagged if it is missing key fields or inconsistent with the naming convention.</p>

      <BlogQuote
        quote="I used to dread the phrase data cleanup. Now it is just another click in my week."
        author="Asset Manager"
        role="National utility company"
      />

      <SoftCta
        type="discovery"
        title="Find out what your asset register is actually missing"
        description="In a 7-minute call we will walk through your current asset data structure and show you exactly where the gaps are and what filling them would mean for maintenance costs and bid accuracy."
        ctaLabel="Book a discovery call →"
        ctaHref="/contact"
      />
    </>
  );
}
