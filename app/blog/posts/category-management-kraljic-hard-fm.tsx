import { BlogQuote, KraljicMatrix, SoftCta } from "@/components/blog";

export default function CategoryManagementKraljic() {
  return (
    <>
      <p>Category management has been a standard framework in procurement for decades. The theory is well understood: group spend into strategic categories, analyse each as a business unit, and use that structure to make better sourcing, supplier, and contracting decisions. The practice is harder — not because the frameworks are unclear, but because they require clean, classified, consistent spend data that most hard services companies do not have in working order.</p>

      <h2 id="kraljic">The Kraljic Matrix: still the most useful tool in procurement strategy</h2>
      <p>Developed by Peter Kraljic in 1983 and published in Harvard Business Review, the Kraljic Matrix organises spend into four quadrants based on two dimensions: supply risk and profit impact.</p>

      <KraljicMatrix />

      <table>
        <thead><tr><th>Quadrant</th><th>Hard FM Example</th><th>Strategy</th></tr></thead>
        <tbody>
          <tr><td><strong>Strategic</strong></td><td>Main M&amp;E maintenance contractor, BMS provider</td><td>Long-term partnership, joint planning, SLA integration</td></tr>
          <tr><td><strong>Leverage</strong></td><td>Electricity, HVAC consumables at scale</td><td>Volume consolidation, competitive tender, price pressure</td></tr>
          <tr><td><strong>Bottleneck</strong></td><td>Specialist elevator parts, building controls components</td><td>Dual sourcing, safety stock, security of supply</td></tr>
          <tr><td><strong>Non-Critical</strong></td><td>General MRO, stationery, cleaning consumables</td><td>e-catalogues, automation, procurement efficiency</td></tr>
        </tbody>
      </table>

      <h2 id="data-problem">The problem: you cannot use Kraljic without spend visibility</h2>
      <p>Placing spend accurately in the Kraljic quadrants requires knowing — with precision — what you are buying, from whom, at what volume, and at what risk level. That information lives in your procurement data. If that data is not classified consistently, the matrix becomes a theoretical exercise rather than a practical tool.</p>
      <p>In most FM procurement environments, the data problem manifests in three specific ways:</p>
      <ul>
        <li><strong>You cannot see total commodity spend.</strong> The same HVAC filter is recorded as "HVAC filter 400mm", "air filter", "F7 filter panel", and "ventilation consumables" depending on site and user. Without classification, there is no reliable view of total filter spend — so you cannot assess whether this is a leverage or non-critical category.</li>
        <li><strong>You cannot assess supplier concentration.</strong> A bottleneck risk assessment requires knowing who supplies critical components and whether alternatives exist. Fragmented supplier data makes this impossible.</li>
        <li><strong>You cannot track category performance over time.</strong> Category management is a continuous cycle. Progress requires a stable, classified data foundation.</li>
      </ul>

      <h2 id="five-scenarios">Category strategy in practice: the five scenarios</h2>
      <table>
        <thead><tr><th>Context</th><th>First move</th><th>Data requirement</th></tr></thead>
        <tbody>
          <tr><td><strong>Construction ~€50M</strong></td><td>Pre-qualified vendor list for top 3 trades — portfolio pricing vs one-off rates</td><td>Subcontractor spend classified by trade type and project</td></tr>
          <tr><td><strong>Construction €500M+</strong></td><td>Standard parts library mandated in design phase — remove bespoke cost</td><td>Spend at commodity level, linked to project type and spec</td></tr>
          <tr><td><strong>Hard FM</strong></td><td>Universal asset tagging and critical spares commonality</td><td>Accurate, enriched asset register with manufacturer data</td></tr>
          <tr><td><strong>Soft FM</strong></td><td>Chemical and consumable consolidation — cost-per-user contracts</td><td>Invoice-level consumable classification across all sites</td></tr>
          <tr><td><strong>MRO</strong></td><td>Virtual catalogue of 500 most-purchased items at fixed pricing</td><td>SKU-level classification of high-frequency purchases</td></tr>
        </tbody>
      </table>

      <h2 id="data-as-fuel">Data quality as category management fuel</h2>
      <p>What connects all five scenarios is the same requirement: spend data that is classified, consistent, and usable for analysis. Without that, a category manager spends 80% of their time preparing data and 20% on strategy. With it, that ratio inverts.</p>

      <BlogQuote
        quote="For the first time, we could trust our spend reports. I used the outputs to build our first strategic sourcing report that actually held up under CFO scrutiny."
        author="Head of Procurement"
        role="European infrastructure company"
      />

      <SoftCta
        type="case-study"
        title="See how Strukton and SPIE use Pearstop for category management"
        description="Download the case studies to see how leading hard services companies have used clean procurement data to build category strategies that deliver measurable savings."
        ctaLabel="Get the case studies →"
        ctaHref="/case-studies"
      />
    </>
  );
}
