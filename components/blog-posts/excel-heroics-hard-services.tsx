import { BlogQuote, SoftCta } from "@/components/blog";

export default function ExcelHeroics() {
  return (
    <>
      <p>Every hard services company has one. The person who knows the data. They maintain the master spreadsheet that finance depends on. They know which columns to trust and which to ignore. They built the pivot tables that appear in board packs every quarter, and they know exactly which manual adjustments to make before anything goes to leadership. They are valuable, hardworking, and carrying an operational risk the organisation has never formally acknowledged.</p>

      <h2 id="visible-cost">The visible cost vs. the real cost</h2>
      <p>The visible cost of Excel heroics is the person's time. If your best analyst spends 60% of their week cleaning and preparing data rather than analysing it, that is inefficiency most organisations have normalised. The real costs are less visible but more significant:</p>
      <ul>
        <li><strong>Delayed decisions.</strong> When producing a spend report takes a week, decisions get made on last month's data. In a tendering environment, a delayed cost estimate is a missed bid.</li>
        <li><strong>Version risk.</strong> Multiple spreadsheets maintained by multiple people diverge silently over time. The procurement team's version and the finance team's version tell different stories by end of quarter.</li>
        <li><strong>Audit exposure.</strong> Manually prepared reports cannot be traced back to a clean source of truth.</li>
        <li><strong>Scale ceiling.</strong> The system that works for 50 sites cannot work for 200 without hiring more people to do the same thing.</li>
        <li><strong>Key person dependency.</strong> If the person who maintains the master file is unavailable, the organisation loses its ability to produce reliable reporting.</li>
      </ul>

      <h2 id="diagnostic">Are you in Excel heroics territory?</h2>
      <p>A few diagnostic signs:</p>
      <ul>
        <li>Producing a spend or cost report takes more than a few hours of work</li>
        <li>Someone needs to sense-check the numbers before they go to leadership</li>
        <li>A new analyst would need weeks to understand the data structure</li>
        <li>Your reporting would be affected if a specific person was unavailable for two weeks</li>
        <li>You have more than one version of the same dataset maintained by different people</li>
      </ul>

      <h2 id="migration">What the migration away from Excel heroics looks like</h2>
      <p><strong>Stage 1: Establish a data baseline.</strong> Before any automation is introduced, the data needs to be in a known, clean state. This stage reveals the manual work that has been done to make the data usable — the lookup tables, the correction rules, the adjustment notes in cells. Those rules get documented and formalised so they can be applied systematically rather than personally.</p>
      <p><strong>Stage 2: Automate the repeatable corrections.</strong> Deduplicating supplier names, standardising descriptions, filling missing category fields, flagging anomalies for review — these can be automated. The analyst's time shifts from doing the corrections to reviewing the system's work.</p>
      <p><strong>Stage 3: Build ongoing quality control into the data flow.</strong> New data entering the system gets validated against the established structure automatically. Quality is maintained by the process, not by a person.</p>

      <BlogQuote
        quote="Pearstop built a system that automatically pulls the right items from our visiting reports into a clean proposal document. It saves our team a lot of time by eliminating the repetitive tasks of combining the correct items."
        author="Vince Out"
        role="Lemtech · Manufacturing &amp; Air Filtration"
      />

      <h2 id="other-side">What the other side looks like</h2>
      <p>After this transition, the analyst who was maintaining the master file does not lose their role. Their role changes. They move from data preparation to data analysis — from keeping the system running to using it to generate insights.</p>
      <BlogQuote
        quote="For the first time, I feel like I actually do the job I was hired for — analysis, not admin."
        author="Data Analyst"
        role="Procurement team, industrial construction company"
      />
      <SoftCta
        type="template"
        title="Curious what automated data management would look like for your team?"
        description="Book a 7-minute discovery call and we will walk through your current data flow and show you specifically where automation would eliminate the most manual work."
        ctaLabel="Book a discovery call"
        ctaHref="/contact"
      />
    </>
  );
}
