import { BlogQuote, SoftCta } from "@/components/blog";

export default function ConstructionProcurement() {
  return (
    <>
      <p>Construction procurement operates under pressures that most other sectors do not face: materials with volatile market prices, project-by-project spend that is difficult to aggregate, and a supply chain where cost visibility often ends at the main contractor's invoice. The result is a procurement function that is frequently reactive — responding to price changes rather than anticipating them, negotiating on individual contracts rather than portfolio volume.</p>

      <h2 id="structural-problem">Why construction spend data is structurally different</h2>
      <p>In most industries, procurement data is at least theoretically centralised — a single ERP, a single cost code structure, invoices flowing through one accounts payable function. In construction, spend is distributed by design. Each project has its own cost codes, its own procurement team, and often its own supplier relationships.</p>
      <p>The consequences are specific:</p>
      <ul>
        <li><strong>You cannot see category spend across projects.</strong> Steel purchased on Project A under cost code 4.2.1 and steel purchased on Project B under "raw materials — structural" are the same commodity. But they cannot be aggregated without classification work.</li>
        <li><strong>Price variance is invisible until too late.</strong> If the same grade of steel is being purchased at €920/tonne on one project and €1,040/tonne on another, that gap can only be addressed if you can see it.</li>
        <li><strong>Historical data is project-bound.</strong> When a project closes, its data closes with it. The lessons from that project's material costs rarely flow into a structured historical database that future estimators can draw from.</li>
      </ul>

      <h2 id="steel-case-study">The impact on material cost control: steel as a case study</h2>
      <p>Steel is the most economically significant material category for most structural and civil contractors — and one of the most price-volatile.</p>
      <p>In a well-structured procurement environment, a contractor with €40M in annual steel spend would know their total volume by grade and specification, have a clear view of which suppliers are being used across which projects, be able to identify price variance across sites and periods, and use that volume to negotiate direct-from-mill supply agreements that bypass the distributor margin.</p>
      <p>In practice, most mid-market contractors have none of this visibility. Steel spend is fragmented across project cost codes, invoiced under various descriptions, and purchased through local distributors on project-specific terms. The classification work required to change this is specific: all steel-related line items classified to commodity level across all projects and periods.</p>
      <BlogQuote
        quote="I can now pull a spend report across the whole group and actually believe the numbers."
        author="Commercial Controller"
        role="Construction group"
      />

      <h2 id="spec-standardisation">Specification standardisation: the category management lever</h2>
      <p>Beyond supplier consolidation, the other major cost lever in construction procurement is specification standardisation — reducing the number of different specifications used for the same functional requirement.</p>
      <p>In a distributed organisation, different project architects and engineers specify products independently. The result is a procurement database containing dozens of slightly different specifications for doors, windows, cable trays, and mechanical components — each bought in small quantities from different suppliers.</p>
      <p>The route to standardisation is through data: classify all product spend to commodity level, identify functional equivalents, analyse volume by specification, and mandate a standard for high-frequency items. For a large contractor, this exercise typically reveals that 20–30% of material spend is in categories where standardisation could reduce unit cost by 10–20% through volume concentration.</p>

      <h2 id="software-integration">Integration with construction software</h2>
      <p>Modern construction platforms — Procore, Autodesk Construction Cloud, Oracle Primavera — are increasingly able to handle structured cost data. The limitation is not the platforms. It is the data that flows into them. When procurement data is classified at commodity level, it integrates with project management software in a way that unclassified data cannot. Cost tracking by material category becomes possible in real time. Variance analysis against budget becomes specific rather than aggregate.</p>

      <SoftCta
        type="case-study"
        title="See how Strukton used clean procurement data to control material costs"
        description="Download the Strukton case study to see how a large infrastructure contractor built spend visibility across business units and used it to negotiate better supplier terms."
        ctaLabel="Get the case studies"
        ctaHref="/case-studies"
      />
    </>
  );
}
