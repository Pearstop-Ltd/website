import type { Metadata } from "next";
import { alternateLanguages, siteConfig } from "@/lib/site";
import { ViewportPreview } from "@/components/site/internal/ViewportPreview";
import { SectionHeader } from "@/components/site/SectionHeader";
import { StatBand } from "@/components/site/StatBand";
import { Card } from "@/components/site/Card";
import { NumberedStep } from "@/components/site/NumberedStep";
import { SourceDiagram } from "@/components/site/SourceDiagram";
import { QuoteCard } from "@/components/site/QuoteCard";
import { DataTable, StatusChip } from "@/components/site/DataTable";
import { ClosingCTA } from "@/components/site/ClosingCTA";
import { CaseCard } from "@/components/site/CaseCard";
import { PhotoBand } from "@/components/site/PhotoBand";
import { Faq } from "@/components/site/Faq";
import { CasePage } from "@/components/site/templates/CasePage";
import { SolutionPage } from "@/components/site/templates/SolutionPage";

export const metadata: Metadata = {
  title: "Design system test",
  description: "Internal preview of the components/site/ design system. Not a live page.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: `${siteConfig.url}/design-test`,
    languages: alternateLanguages("/design-test"),
  },
};

const PLACEHOLDER_IMAGE = { src: "/images/site-placeholder.png", alt: "Placeholder photography", width: 800, height: 600 };

function Demo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ padding: "48px 40px", borderTop: "1px solid #e5e7eb" }}>
      <h2 style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 20 }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function DesignTestPage() {
  return (
    <ViewportPreview>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Demo title="SectionHeader">
          <div style={{ padding: "0 40px" }}>
            <SectionHeader eyebrow="How it worked" title="Matched against the list the client already trusts" lead="Every row was matched against the client's own approved list, and nothing else." />
          </div>
        </Demo>

        <Demo title="StatBand">
          <div style={{ padding: "0 40px" }}>
            <StatBand
              stats={[
                { value: "9,175 → 1,493", caption: "supplier name variants consolidated" },
                { value: "73.1%", caption: "matches confirmed against the approved list" },
                { value: "107,081", caption: "lines enhanced with family and variant" },
                { value: "100%", caption: "of records scored for confidence" },
              ]}
            />
          </div>
        </Demo>

        <Demo title="Card (variants + icon + image)">
          <div style={{ padding: "0 40px", display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 20 }}>
            <Card variant="plain" title="Invoices arrive as PDFs" body="Line detail sits inside documents nobody re-reads." />
            <Card variant="tinted-blue" title="What you spend, per product" body="Off-contract and outlier lines, side by side." />
            <Card variant="tinted-purple" title="Queued for review" body="Highest priority first." />
            <Card variant="tinted-green" title="With a photo slot" body="Optional image prop, next/image under the hood." image={PLACEHOLDER_IMAGE} />
          </div>
        </Demo>

        <Demo title="NumberedStep">
          <div style={{ padding: "0 40px", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20 }}>
            <NumberedStep number={1} title="Deterministic matching first" body="Exact, prefix and edit-distance matching, wherever a rule could decide." />
            <NumberedStep number={2} title="An independent second opinion" body="A language model checked each match on its own." />
            <NumberedStep number={3} title="People decide the hard ones" body="Conflicting matches went to the client's data team." />
          </div>
        </Demo>

        <Demo title="SourceDiagram">
          <div style={{ padding: "0 40px" }}>
            <SourceDiagram
              inputs={["Maintenance systems", "Contractor uploads", "Manual entry"]}
              processLines={["Match against the approved list", "Cross-check with a language model", "Route conflicts to a person"]}
              outputs={[
                { label: "Canonical supplier", tint: "green" },
                { label: "Product family + variant", tint: "blue" },
                { label: "Confidence + review priority", tint: "purple" },
              ]}
            />
          </div>
        </Demo>

        <Demo title="QuoteCard (panel + inline)">
          <div style={{ padding: "0 40px", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 24 }}>
            <QuoteCard
              variant="panel"
              initials="AB"
              name="Alex B."
              role="Head of Master Data, Example Co"
              quote="The confidence scoring meant our team knew where to spend their review time first."
            />
            <QuoteCard
              variant="inline"
              initials="JD"
              name="Jamie D."
              role="Project Manager, Example Co"
              quote="This project taught us a lot about data cleaning with AI."
            />
          </div>
        </Demo>

        <Demo title="DataTable + StatusChip">
          <div style={{ padding: "0 40px" }}>
            <DataTable
              columns={[
                { key: "desc", label: "Description", width: "2fr" },
                { key: "qty", label: "Qty" },
                { key: "cost", label: "Unit cost" },
                { key: "status", label: "Status" },
              ]}
              rows={[
                { desc: "Toilet roll, case of 36", qty: "12", cost: "£19.20", status: <StatusChip tone="done" label="Read" /> },
                { desc: "Handwritten amendment", qty: "2", cost: "unclear", status: <StatusChip tone="review" label="To review" /> },
              ]}
              footnote="2 of 5 shown · illustrative example"
            />
          </div>
        </Demo>

        <Demo title="ClosingCTA">
          <ClosingCTA
            title="Same problem in your data?"
            body="Send a sample. We send it back scored, so you see a first pass on your own records."
            primaryLabel="Send a sample"
            primaryHref="#"
            secondaryLabel="Or talk to sales →"
            secondaryHref="#"
            footerLine="© 2026 Pearstop · Privacy · Terms"
          />
        </Demo>

        <Demo title="CaseCard (client + pattern + image)">
          <div style={{ padding: "0 40px", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20 }}>
            <CaseCard
              variant="client"
              eyebrow="Infrastructure · Procurement"
              title="Spend lines a month classified to commodity level"
              stats={[{ value: "0", label: "history at start" }, { value: "Weekly", label: "feedback loop" }]}
              href="#"
              linkLabel="Read the case"
            />
            <CaseCard
              variant="pattern"
              eyebrow="Pattern · Cleaning"
              title="Suppliers in twelve months, and nobody chose them"
              stats={[{ value: "68%", label: "price spread" }, { value: "24%", label: "spend uncategorised" }]}
              href="#"
              linkLabel="See the pattern"
            />
            <CaseCard
              variant="client"
              eyebrow="Retail · Procurement"
              title="With an image slot instead of a bespoke visual"
              stats={[{ value: "95%", label: "classified automatically" }, { value: "1 week", label: "vs six months by hand" }]}
              href="#"
              linkLabel="Read the case"
              image={PLACEHOLDER_IMAGE}
            />
          </div>
        </Demo>

        <Demo title="PhotoBand">
          <div style={{ padding: "0 40px" }}>
            <PhotoBand {...PLACEHOLDER_IMAGE} alt="Placeholder — engineer on site photography goes here" caption="Placeholder. Real photography lands in public/images/photos/ later." />
          </div>
        </Demo>

        <Demo title="Faq (SSR-visible answers)">
          <div style={{ padding: "0 40px" }}>
            <Faq
              items={[
                { q: "Are answers in the HTML when closed?", a: "Yes — this uses native details/summary, so every answer is present in the markup regardless of open state." },
                { q: "Does this ship its own JSON-LD?", a: "SolutionPage builds FAQPage JSON-LD from the same items automatically." },
              ]}
            />
          </div>
        </Demo>

        <Demo title="Template: CasePage (client variant)">
          <CasePage
            variant="client"
            hero={{
              breadcrumbParentLabel: "Cases",
              breadcrumbParentHref: "#",
              breadcrumbCurrent: "Example Co",
              badgeLabel: "Client case",
              metaLine: "Hard services FM · Asset data",
              title: "9,175 supplier spellings brought back to 1,493 for Example Co",
              lead: "Example Co's asset register had been fed by maintenance systems, contractors and manual entry for years.",
              visual: (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <strong>Client</strong>
                  <span>Example Co</span>
                </div>
              ),
            }}
            sections={[
              {
                type: "statBand",
                stats: [
                  { value: "9,175 → 1,493", caption: "supplier name variants consolidated" },
                  { value: "73.1%", caption: "matches confirmed" },
                ],
              },
              {
                type: "custom",
                key: "bespoke-note",
                node: (
                  <div style={{ padding: "24px 40px", fontFamily: "system-ui, sans-serif", fontSize: 13, color: "#6b7280", background: "#fef3c7" }}>
                    This block is a fully custom ReactNode section, mixed in between two template sections — demonstrating the ordered `sections` API.
                  </div>
                ),
              },
              {
                type: "twoColumn",
                eyebrow: "The situation",
                title: "One manufacturer, a dozen spellings",
                body: <p>Over the years the register was filled from different systems, contractor uploads and manual entry.</p>,
                sidebar: <div>Why this is our problem too.</div>,
              },
            ]}
            closingCTA={{
              title: "Same problem in your asset register?",
              body: "Send a sample of your asset or equipment data.",
              primaryLabel: "Send a sample",
              primaryHref: "#",
              secondaryLabel: "Or talk to Sales →",
              secondaryHref: "#",
              footerLine: "© 2026 Pearstop · Privacy · Terms",
            }}
          />
        </Demo>

        <Demo title="Template: SolutionPage">
          <SolutionPage
            hero={{
              eyebrow: "Invoice & document extraction",
              title: "If nobody reads the invoice, the data inside it does not exist.",
              lead: "PDFs, scans and delivery notes arrive faster than anyone can read them.",
              primaryLabel: "Send us 10 invoices",
              primaryHref: "#",
              secondaryLabel: "See how it works →",
              secondaryHref: "#how-it-works-demo",
              visual: <div>Doc-to-rows illustration slot</div>,
            }}
            sections={[
              { type: "statBand", stats: [{ value: "70% → 99%", caption: "first-pass accuracy" }, { value: "Any format", caption: "PDF, scan, photo or EDI" }, { value: "Days", caption: "to first structured output" }] },
              {
                type: "problem",
                eyebrow: "The problem",
                title: "Why spend data stays unusable months after the invoice arrives",
                body: <p>Every supplier lays out an invoice differently.</p>,
                quote: { variant: "panel", initials: "PL", name: "Procurement lead", role: "Multi-site cleaning contractor", quote: "Our internal systems are lacking." },
              },
              {
                type: "painCards",
                cards: [
                  { title: "Unread in the inbox", body: "Nobody has time to open invoices." },
                  { title: "One supplier, many layouts", body: "The layout changes with the depot." },
                ],
              },
              {
                type: "diagram",
                anchorId: "how-it-works-demo",
                eyebrow: "How it works",
                title: "From unread document to structured line item",
                diagram: {
                  inputs: ["PDF invoices", "Scanned paper"],
                  processLines: ["Ingest", "Read and check", "Deliver"],
                  outputs: [{ label: "Your ERP", tint: "blue" }],
                },
                steps: [{ number: 1, title: "Ingest, in any format", body: "No fixed template per supplier." }],
              },
              {
                type: "definition",
                title: "What is invoice data extraction and why does it matter?",
                body: "It is the step that has to happen before classification or spend analysis is even possible.",
              },
              {
                type: "faq",
                eyebrow: "Questions",
                title: "Frequently asked",
                items: [{ q: "Can it read scanned paper invoices?", a: "Yes, digital PDFs, scans and photographed delivery notes." }],
              },
            ]}
            closingCTA={{
              title: "Still keying invoices in by hand?",
              body: "Send us up to ten invoices, in whatever state they are in.",
              primaryLabel: "Send your invoices",
              primaryHref: "#",
              secondaryLabel: "Or talk to Sales →",
              secondaryHref: "#",
              footerLine: "© 2026 Pearstop · Privacy · Terms",
            }}
          />
        </Demo>
      </div>
    </ViewportPreview>
  );
}
