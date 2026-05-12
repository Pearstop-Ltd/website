import Link from "next/link";
import Script from "next/script";
import type { ReactNode } from "react";
import { TableOfContents, type TocItem } from "@/components/blog-toc";
import { siteConfig } from "@/lib/site";

export function ArticleSchema({ title, description, slug, publishedAt, authorName }: {
  title: string; description: string; slug: string; publishedAt: string; authorName: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: publishedAt,
    url: `${siteConfig.url}/blog/${slug}`,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorName === "Stephanie Wiechers" ? "https://www.linkedin.com/in/stephanie-wiechers" : `${siteConfig.url}/about-us`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}${siteConfig.assets.logo}` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/blog/${slug}` },
  };
  return <Script id={`article-schema-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function FaqSchema({ items, slug }: { items: { q: string; a: string }[]; slug: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return <Script id={`faq-schema-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

type AuthorKey = "stephanie" | "richard" | "team";

const AUTHORS: Record<AuthorKey, { name: string; role: string; bio: string; linkedin: string; avatar: string }> = {
  stephanie: {
    name: "Stephanie Wiechers",
    role: "CEO & Co-founder, Pearstop",
    bio: "Stephanie leads Pearstop's go-to-market and strategic direction. She works directly with procurement and FM leaders across Europe to understand how data quality affects margins, contracts, and AI readiness.",
    linkedin: "https://www.linkedin.com/in/stephanie-wiechers",
    avatar: "/images/clients/stephanie-headshot.png",
  },
  richard: {
    name: "Richard Wallace",
    role: "Co-founder, Pearstop",
    bio: "Richard brings deep commercial experience in hard services and FM. He works with clients to design data quality programmes that translate directly into procurement performance and contract accuracy.",
    linkedin: "https://www.linkedin.com/company/pearstop",
    avatar: "/images/clients/richard-headshot.png",
  },
  team: {
    name: "Pearstop Team",
    role: "Pearstop",
    bio: "Pearstop helps procurement and operations teams in hard services, FM, construction, and manufacturing turn messy data into a reliable foundation for decisions, AI, and category management.",
    linkedin: "https://www.linkedin.com/company/pearstop",
    avatar: "/brand/logo-dark.webp",
  },
};

export function AuthorBlock({ authorKey }: { authorKey: AuthorKey }) {
  const a = AUTHORS[authorKey];
  return (
    <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border, #e5e7eb)", display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
      <img src={a.avatar} alt={a.name} style={{ width: 56, height: 56, borderRadius: authorKey === "team" ? 6 : "50%", objectFit: authorKey === "team" ? "contain" : "cover", flexShrink: 0, padding: authorKey === "team" ? 4 : 0 }} />
      <div>
        <p style={{ fontWeight: 700, marginBottom: "0.1rem", fontSize: "0.95rem" }}>{a.name}</p>
        <p style={{ color: "var(--muted)", fontSize: "0.8rem", marginBottom: "0.5rem" }}>{a.role}</p>
        <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: "0.5rem", lineHeight: 1.6 }}>{a.bio}</p>
        <a href={a.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>LinkedIn →</a>
      </div>
    </div>
  );
}

export function BlogLayout({ children, tocItems, author, publishedAt, readingTime, category }: {
  children: ReactNode; tocItems: TocItem[]; author: AuthorKey; publishedAt: string; readingTime: number; category: string;
}) {
  return (
    <div className="container" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 220px", gap: "4rem", alignItems: "start" }}>
        <article className="blog-article" style={{ minWidth: 0 }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", fontSize: "0.8rem", color: "var(--muted)", marginBottom: "2.5rem", flexWrap: "wrap" }}>
            <span style={{ background: "var(--purple-soft)", color: "var(--primary-dark)", padding: "0.25rem 0.75rem", borderRadius: "999px", fontWeight: 600, fontSize: "0.75rem" }}>{category}</span>
            <span>{new Date(publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span>{readingTime} min read</span>
          </div>
          {children}
          <AuthorBlock authorKey={author} />
        </article>
        <aside style={{ display: "none" }} className="blog-toc-col">
          <TableOfContents items={tocItems} />
        </aside>
      </div>
      <style>{`
        @media (min-width: 1024px) { .blog-toc-col { display: block !important; } }
        .blog-article h2 { margin-top: 2.5rem; scroll-margin-top: 5.5rem; }
        .blog-article h3 { margin-top: 1.75rem; scroll-margin-top: 5.5rem; }
        .blog-article p { line-height: 1.8; margin-bottom: 1.1rem; }
        .blog-article ul, .blog-article ol { padding-left: 1.5rem; margin-bottom: 1.1rem; }
        .blog-article li { line-height: 1.75; margin-bottom: 0.35rem; }
        .blog-article table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem; }
        .blog-article th { background: var(--purple-soft); color: var(--primary-dark); font-weight: 600; text-align: left; padding: 0.65rem 1rem; }
        .blog-article td { padding: 0.6rem 1rem; border-bottom: 1px solid var(--border, #e5e7eb); vertical-align: top; }
        .blog-article tr:last-child td { border-bottom: none; }
      `}</style>
    </div>
  );
}

export function BlogQuote({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <blockquote style={{ borderLeft: "4px solid var(--primary)", margin: "2rem 0", padding: "1.25rem 1.5rem", background: "var(--purple-soft)", borderRadius: "0 12px 12px 0" }}>
      <p style={{ fontSize: "1.1rem", fontStyle: "italic", lineHeight: 1.75, color: "var(--primary-dark)", marginBottom: "0.75rem", fontWeight: 500 }}>"{quote}"</p>
      <footer style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
        <strong style={{ color: "var(--primary-dark)" }}>{author}</strong>
        {role ? <span> — {role}</span> : null}
      </footer>
    </blockquote>
  );
}

type SoftCtaProps = { type: "checklist" | "case-study" | "discovery" | "template"; title: string; description: string; ctaLabel: string; ctaHref: string; external?: boolean; };

export function SoftCta({ type, title, description, ctaLabel, ctaHref, external }: SoftCtaProps) {
  const icons: Record<SoftCtaProps["type"], string> = { checklist: "✓", "case-study": "→", discovery: "◎", template: "⬡" };
  return (
    <div style={{ background: "linear-gradient(135deg, var(--purple-soft) 0%, #f0eeff 100%)", border: "1px solid var(--primary, #6b46c1)", borderRadius: 16, padding: "1.75rem 2rem", margin: "2.5rem 0", display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
      <div style={{ width: 44, height: 44, borderRadius: "50%", flexShrink: 0, background: "var(--primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", fontWeight: 700 }}>{icons[type]}</div>
      <div>
        <p style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.35rem" }}>{title}</p>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "1rem", lineHeight: 1.6 }}>{description}</p>
        {external ? (
          <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: "0.875rem" }}>{ctaLabel}</a>
        ) : (
          <Link href={ctaHref} className="btn btn-primary" style={{ fontSize: "0.875rem" }}>{ctaLabel}</Link>
        )}
      </div>
    </div>
  );
}

export function ComparisonCards({ labelA, labelB, itemsA, itemsB, outcomeA, outcomeB }: {
  labelA: string; labelB: string; itemsA: string[]; itemsB: string[]; outcomeA: string; outcomeB: string;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", margin: "2rem 0" }}>
      {[
        { label: labelA, items: itemsA, outcome: outcomeA, bad: true },
        { label: labelB, items: itemsB, outcome: outcomeB, bad: false },
      ].map(({ label, items, outcome, bad }) => (
        <div key={label} style={{ border: `2px solid ${bad ? "#fca5a5" : "#86efac"}`, borderRadius: 12, padding: "1.25rem", background: bad ? "#fef2f2" : "#f0fdf4" }}>
          <p style={{ fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.06em", color: bad ? "#dc2626" : "#16a34a", marginBottom: "0.75rem" }}>{label}</p>
          <ul style={{ paddingLeft: "1.25rem", marginBottom: "1rem" }}>
            {items.map((item) => <li key={item} style={{ fontSize: "0.875rem", marginBottom: "0.3rem", lineHeight: 1.6 }}>{item}</li>)}
          </ul>
          <div style={{ borderTop: `1px solid ${bad ? "#fca5a5" : "#86efac"}`, paddingTop: "0.75rem", fontSize: "0.875rem", color: bad ? "#dc2626" : "#16a34a", fontWeight: 600 }}>{outcome}</div>
        </div>
      ))}
    </div>
  );
}

export function ChecklistSection({ title, items }: { title: string; items: { label: string; detail?: string }[] }) {
  return (
    <div style={{ background: "var(--purple-soft)", borderRadius: 16, padding: "1.75rem 2rem", margin: "2rem 0" }}>
      <p style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "1rem" }}>{title}</p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item) => (
          <li key={item.label} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", alignItems: "flex-start" }}>
            <span style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0, marginTop: "0.1rem" }}>✓</span>
            <div>
              <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.label}</span>
              {item.detail && <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: "0.2rem", marginBottom: 0, lineHeight: 1.5 }}>{item.detail}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function KraljicMatrix() {
  return (
    <figure style={{ margin: "2rem 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, borderRadius: 12, overflow: "hidden", border: "1px solid var(--border, #e5e7eb)" }}>
        {[
          { label: "Leverage", desc: "High value, low risk — e.g. HVAC consumables at scale", bg: "#7c3aed", fg: "#fff" },
          { label: "Strategic", desc: "High value, high risk — e.g. main M&E contractor", bg: "#6b46c1", fg: "#fff" },
          { label: "Non-Critical", desc: "Low value, low risk — e.g. general MRO, stationery", bg: "#f5f3ff", fg: "#6b7280" },
          { label: "Bottleneck", desc: "Low value, high risk — e.g. specialist elevator parts", bg: "#ede9fe", fg: "#4c1d95" },
        ].map(({ label, desc, bg, fg }) => (
          <div key={label} style={{ background: bg, padding: "1.5rem", minHeight: 120 }}>
            <p style={{ color: fg, fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.4rem" }}>{label}</p>
            <p style={{ color: fg, fontSize: "0.78rem", opacity: 0.85, lineHeight: 1.5, margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>
      <figcaption style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.5rem", textAlign: "center" }}>
        The Kraljic Matrix — applied to hard FM spend categories
      </figcaption>
    </figure>
  );
}
