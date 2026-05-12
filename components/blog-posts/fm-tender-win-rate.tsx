import { BlogQuote, ComparisonCards, SoftCta } from "@/components/blog";

export default function FmTenderWinRate() {
  return (
    <>
      <p>Losing a tender is expensive. You have spent the hours, done the site visits, written the methodology — and you are out. But there is a category of tender loss even more frustrating: losing because your pricing was either too high to be competitive, or too tight to be profitable. Both outcomes have the same root cause: insufficient visibility into your own cost data.</p>

      <h2 id="pricing-problem">The pricing confidence problem</h2>
      <p>Most FM companies price tenders using a combination of historical data, estimator judgment, and margin padding that accounts for uncertainty. The estimators are usually right — within a range. But that range is the problem. When you do not have clean, classified historical cost data, two things happen: you pad margins to cover uncertainty, making you uncompetitive; or you compress margins under pricing pressure without data to back it up.</p>

      <h2 id="two-scenarios">Scenario A vs Scenario B: the cost of guessing</h2>
      <p>Consider two FM companies pricing the same 5-year maintenance contract on a 50,000 sqm commercial building:</p>
      <ComparisonCards
        labelA="Scenario A — pricing without clean data"
        labelB="Scenario B — pricing with clean data"
        itemsA={[
          "4 days reconciling inconsistent ERP exports and spreadsheets",
          "M&E costs incomparable across projects due to different cost structures",
          "Blanket 14% margin applied to cover data uncertainty",
          "Final price: €2.4M/year",
        ]}
        itemsB={[
          "Historical cost data retrieved by asset type and region in 2 hours",
          "Last 3 comparable contracts directly comparable",
          "Contingency sized precisely to lines with genuine uncertainty",
          "Final price: €2.23M/year with margin intact",
        ]}
        outcomeA="Outcome: second place. Winning bid was €2.25M."
        outcomeB="Outcome: won. Margin protected."
      />

      <h2 id="what-slows">What slows bid teams down</h2>
      <p>In most FM bid processes, the slowdown is not the strategic decisions — it is the data retrieval. Finding historical cost data means emailing multiple departments, waiting for exports from different systems, and reconciling figures that do not match because they were categorised differently by different people at different times.</p>
      <BlogQuote
        quote="Prep time used to take four days just to clean the data before pricing could even begin."
        author="Commercial Manager"
        role="European FM company"
      />

      <h2 id="what-changes">What changes with structured cost data</h2>
      <ul>
        <li><strong>Retrieval becomes fast.</strong> Historical benchmarks are accessible in minutes. What did HVAC maintenance cost per square metre on our last five contracts has a reliable answer immediately.</li>
        <li><strong>Margin simulation becomes real.</strong> You can model pricing scenarios against actual cost data. What is the margin impact if we sharpen 3% on the labour line is a calculation, not a guess.</li>
        <li><strong>Accuracy improves.</strong> When estimates are grounded in actuals, the gap between estimated and actual cost on won contracts narrows — meaning fewer contracts that erode margin through delivery.</li>
      </ul>

      <h2 id="compounding">The compounding effect</h2>
      <p>Better tender data does not just improve individual bids. Each completed contract produces better historical data for the next bid. The estimators get smarter benchmarks. The process gets faster. Win rates on competitive tenders improve — not because the service offering changed, but because the pricing became accurate enough to be competitive without being irresponsible.</p>

      <SoftCta
        type="discovery"
        title="See what your bid data could look like"
        description="In a 7-minute call we will show you how other FM companies have cut bid prep time from days to hours, and what that means for pricing accuracy and win rate."
        ctaLabel="Book a 7-minute discovery"
        ctaHref="/contact"
      />
    </>
  );
}
