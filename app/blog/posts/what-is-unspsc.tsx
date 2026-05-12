import { BlogQuote, SoftCta } from "@/components/blog";

export default function WhatIsUnspsc() {
  return (
    <>
      <p>UNSPSC stands for United Nations Standard Products and Services Code. It is a global classification system that assigns a standardised eight-digit code to every product or service a business can buy — from electrical cable to pest control to software licences.</p>

      <h2 id="what-is-unspsc">The UNSPSC hierarchy</h2>
      <p>The eight digits sit within a four-level hierarchy:</p>
      <table>
        <thead><tr><th>Level</th><th>Description</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>Segment (2 digits)</td><td>Broad grouping</td><td>46 — Safety and Security</td></tr>
          <tr><td>Family (4 digits)</td><td>Sub-grouping</td><td>4613 — Personal safety and protection</td></tr>
          <tr><td>Class (6 digits)</td><td>Category</td><td>461317 — Hand protection</td></tr>
          <tr><td>Commodity (8 digits)</td><td>Specific product</td><td>46131701 — Disposable gloves</td></tr>
        </tbody>
      </table>
      <p>That level of precision might seem like administrative overhead. For hard services companies managing thousands of procurement lines across multiple sites and systems, it is the difference between spend data you can act on and spend data you are just storing.</p>

      <h2 id="why-it-matters">Why classification matters in practice</h2>
      <p>Most procurement databases in FM, construction, and infrastructure contain the same fundamental problem: line items described in whatever format the person entering them preferred. "Nitrile gloves M" on one site. "Gloves nitrile medium" on another. "PPE consumables — hands" on a third.</p>
      <p>These are the same product. But without consistent UNSPSC classification, they cannot be grouped, compared, or used for volume leverage. Finance sees four different line items. Procurement sees four separate purchases. The supplier sees four transactions that could be one negotiated contract.</p>

      <h2 id="erp-problem">Why ERP systems do not solve this on their own</h2>
      <p>A common assumption is that if your organisation has an ERP — SAP, Oracle, Microsoft Dynamics — the classification problem is handled. In practice, it rarely is. ERP systems capture transactions. They record what was purchased, from whom, at what price. What they do not do is enforce consistent classification at the point of entry.</p>
      <p>Three approaches have historically been used to add classification on top:</p>
      <ul>
        <li><strong>Manual classification</strong> — accurate in expert hands, but at scale it is slow, expensive, and inconsistent across analysts.</li>
        <li><strong>Offshore data teams</strong> — faster than internal manual work, but quality varies and teams lack contextual knowledge of your specific business.</li>
        <li><strong>Rule-based automation</strong> — works well for high-frequency, well-described items. Breaks down on anything ambiguous or abbreviated.</li>
      </ul>
      <p>The approach that works at scale combines all three: deterministic rules for clear cases, a machine learning model trained on your specific data for the middle ground, and human review for genuinely ambiguous items. Every human decision feeds back into the model, improving accuracy over time.</p>

      <h2 id="what-it-unlocks">What UNSPSC classification unlocks</h2>
      <ul>
        <li><strong>Spend aggregation across systems and entities.</strong> Every line item carries a consistent category code, so spend becomes comparable across ERPs, business units, sites, and years.</li>
        <li><strong>Supplier consolidation.</strong> Once you can see total commodity spend, you can identify where multiple suppliers are delivering the same thing at different prices.</li>
        <li><strong>Category strategy.</strong> UNSPSC codes give category managers the data layer they need to manage categories rather than just describe them.</li>
        <li><strong>AI and analytics platform readiness.</strong> Platforms like Microsoft Fabric and Power BI operate best when data is consistently structured. UNSPSC classification is that standardisation layer.</li>
      </ul>

      <BlogQuote
        quote="Before, this meant weeks of manual classification. Now I feed the raw exports in, review what it spits out, and correct the grey areas. My confidence in the dataset jumped. For the first time, management actually trusts the analytics I produce."
        author="Data Analyst"
        role="Industrial construction company"
      />

      <h2 id="maintaining">Maintaining classification over time</h2>
      <p>Classification is not a one-time exercise. New suppliers are added, new products are purchased, and descriptions change. Without active maintenance, the quality of a classification exercise degrades within months as new unclassified data accumulates.</p>
      <p>The practical solution is an automated classification system that processes new data as it arrives — assigning codes to confident items and flagging ambiguous ones for review. The model improves as it processes more of your specific data, and the ongoing maintenance burden drops over time.</p>

      <SoftCta
        type="template"
        title="Not sure where your UNSPSC classification gaps are?"
        description="Book a 7-minute discovery call and we will show you exactly what automated UNSPSC classification looks like on your data — before you commit to anything."
        ctaLabel="Book a discovery call →"
        ctaHref="/contact"
      />
    </>
  );
}
