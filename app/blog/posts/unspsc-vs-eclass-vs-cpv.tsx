import { SoftCta } from "@/components/blog";
import Link from "next/link";

export default function UnspscVsEclassVsCpv() {
  return (
    <>
      <p>If you have started looking into procurement data classification, you have likely encountered more than one standard. UNSPSC, eClass, CPV, GPC — each claims to be the right framework for organising what your business buys. The truth is that the best standard depends on who you are buying for, who you are reporting to, and what you want to do with the data.</p>

      <h2 id="unspsc">UNSPSC — United Nations Standard Products and Services Code</h2>
      <p>UNSPSC is the most widely used global classification standard for procurement. It covers both products and services across a four-level hierarchy: Segment, Family, Class, and Commodity. Maintained by GS1 US on behalf of the UN and updated quarterly.</p>
      <table>
        <thead><tr><th>Code</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>46000000</td><td>Defence, Law Enforcement, Security and Safety Equipment</td></tr>
          <tr><td>46130000</td><td>Personal safety and protection</td></tr>
          <tr><td>46131700</td><td>Protective gloves and accessories</td></tr>
          <tr><td>46131701</td><td>Disposable gloves</td></tr>
          <tr><td>72154100</td><td>Facilities maintenance and repair services</td></tr>
          <tr><td>72154103</td><td>HVAC system maintenance</td></tr>
        </tbody>
      </table>
      <p><strong>Best for:</strong> Private sector companies, multinational organisations, and any business that wants to classify spend for internal analytics, supplier consolidation, or category management. The de facto standard in hard services, FM, construction, and manufacturing. Most procurement software platforms — SAP Ariba, Coupa, Oracle — support UNSPSC natively.</p>

      <h2 id="eclass">eClass — European Classification Standard</h2>
      <p>eClass is a product classification standard developed primarily for industrial and engineering procurement. Particularly strong for technical products — mechanical components, electrical parts, MRO supplies — where precise product attributes matter as much as the category. Unlike UNSPSC, eClass includes product attribute definitions alongside the codes. You do not just classify a product as "centrifugal pump" — you can also specify flow rate, pressure rating, material of construction, and connection type.</p>
      <p><strong>Best for:</strong> Manufacturing, engineering, and MRO environments where product-level precision is required. Widely used in German-speaking markets and across European industrial sectors.</p>

      <h2 id="cpv">CPV — Common Procurement Vocabulary</h2>
      <p>CPV is the classification system mandated by the European Union for public procurement. If you are tendering for public sector contracts in the EU, CPV codes are compulsory — they appear on contract notices published in the Official Journal of the EU.</p>
      <table>
        <thead><tr><th>Code</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>45000000</td><td>Construction work</td></tr>
          <tr><td>45300000</td><td>Building installation work</td></tr>
          <tr><td>45331200</td><td>Ventilation and air-conditioning installation work</td></tr>
          <tr><td>90910000</td><td>Cleaning services</td></tr>
          <tr><td>90919200</td><td>Office cleaning services</td></tr>
        </tbody>
      </table>
      <p><strong>Best for:</strong> Public sector suppliers and organisations operating in regulated procurement markets. Not designed for internal spend management.</p>

      <h2 id="which-to-use">Which standard should you use?</h2>
      <table>
        <thead><tr><th>Standard</th><th>Best used by</th><th>Primary use case</th></tr></thead>
        <tbody>
          <tr><td><strong>UNSPSC</strong></td><td>Private sector, all industries</td><td>Spend analytics, category management, supplier consolidation</td></tr>
          <tr><td><strong>eClass</strong></td><td>Industrial, engineering, MRO</td><td>Master data management, attribute-level product specification</td></tr>
          <tr><td><strong>CPV</strong></td><td>Public sector suppliers, EU-regulated procurement</td><td>Contract notice classification, OJEU compliance</td></tr>
        </tbody>
      </table>
      <p>For most private sector companies in hard services, FM, construction, and manufacturing, <strong>UNSPSC is the right starting point</strong>. It is the most widely supported, the most globally recognised, and the most useful for spend analytics and category management.</p>

      <h2 id="implementation">The implementation reality: why the standard is the easy part</h2>
      <p>Whichever standard you choose, the hard part is not the standard itself. It is the classification of your existing data against it. Procurement databases in complex organisations contain tens of thousands of distinct line item descriptions — many inconsistent, ambiguous, or unique to the person who entered them. Manually mapping those descriptions to UNSPSC commodity codes is not feasible at scale.</p>
      <p>What works is a three-layer classification system:</p>
      <ul>
        <li><strong>Layer 1 — Deterministic rules.</strong> For clear, high-frequency items, rules map specific descriptions to specific codes. This layer handles the confident majority quickly.</li>
        <li><strong>Layer 2 — Machine learning.</strong> A model trained on your specific data handles the middle ground — items that follow learnable patterns. The model learns how your organisation describes what it buys.</li>
        <li><strong>Layer 3 — Human review.</strong> Genuinely ambiguous items — typically 5–15% of volume — are surfaced for review. Every human decision feeds back into Layer 2, improving accuracy over time.</li>
      </ul>
      <p>This three-layer approach is the core of how Pearstop classifies procurement data at scale: accurately, quickly, and in a way that improves continuously rather than requiring periodic re-classification exercises.</p>

      <SoftCta
        type="discovery"
        title="Not sure which standard is right for your data?"
        description="In a 7-minute call we will walk through your current procurement data and show you exactly what automated classification would look like — including which standard fits your industry and reporting requirements."
        ctaLabel="Book a 7-minute discovery"
        ctaHref="/contact"
      />
    </>
  );
}
