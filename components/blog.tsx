import Link from "next/link";
import Script from "next/script";
import type { ReactNode } from "react";
import { TableOfContents, type TocItem } from "@/components/blog-toc";
import { siteConfig } from "@/lib/site";
import { UnspscLookupCta } from "@/components/unspsc-lookup-cta";
import { BlogNewsletterWidget } from "@/components/blog-newsletter-widget";
import { CalendlyButton } from "@/components/calendly-button";
import { blogPosts, type BlogPost } from "@/lib/blog-posts";

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

export type AuthorKey = "stephanie" | "richard" | "rae" | "seb" | "sjoerd" | "dania" | "neharika" | "team";

export function isAuthorKey(value: string): value is AuthorKey {
  return value in AUTHORS;
}

export const AUTHORS: Record<AuthorKey, { name: string; role: string; bio: string; linkedin: string; avatar: string }> = {
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
  rae: {
    name: "Rae Thomas",
    role: "Director of Operations, Pearstop",
    bio: "Rae heads up operations at Pearstop, in both the traditional and non-traditional sense. She's as committed to the internal success of the business as she is to the value clients get out of it, which is why she leads delivery on most projects and is the main point of contact for clients throughout.",
    linkedin: "https://www.linkedin.com/in/raeesah-thomas-114937158/",
    avatar: "/images/clients/raeesah-headshot.png",
  },
  seb: {
    name: "Sebastiaan Wiechers",
    role: "Classification Logic, Pearstop",
    bio: "Seb designs the classification logic behind Pearstop. He built the rule set model that lets clients steer how their spend is categorised, combining machine classification with deterministic rules so that results stay explainable rather than opaque. His work focuses on the engineering problem most AI procurement tools avoid, which is making automated labels auditable line by line.",
    linkedin: "https://www.linkedin.com/in/sebastiaanwiechers/",
    avatar: "/images/clients/seb-headshot.png",
  },
  sjoerd: {
    name: "Sjoerd Schoufs",
    role: "Data Extraction & Classification, Pearstop",
    bio: "Sjoerd works on data extraction and classification at Pearstop. He built a metadata extraction algorithm that pulls structured attributes out of engineering and technical files that would otherwise have to be opened and read one at a time. He also works on the classification pipeline itself.",
    linkedin: "https://www.linkedin.com/in/sjoerd-schoufs-15a51a349/",
    avatar: "/images/clients/sjoerd-headshot.png",
  },
  dania: {
    name: "Dania Butt",
    role: "Full Stack Developer, Pearstop",
    bio: "Dania is a full stack developer at Pearstop. Recent work includes the classification ruleset upload flow, giving procurement teams direct control over how their data is labelled through override, boost and block rules, and the onboarding experience that takes a client from raw file to classified spend.",
    linkedin: "https://www.linkedin.com/in/dania-butt-27b5871a1/",
    avatar: "/images/clients/dania-headshot.png",
  },
  neharika: {
    name: "Neharika Kishore",
    role: "Content & Visibility, Pearstop",
    bio: "Neha works on content and visibility at Pearstop. She writes articles on procurement data quality for facilities management, construction and infrastructure teams, and supports The Data Edge podcast. She also runs outreach to procurement and finance leaders, which keeps her writing close to the problems those teams are actually raising.",
    linkedin: "https://www.linkedin.com/in/neharika-kishore-9474361b7/",
    avatar: "/images/clients/neharika-headshot.png",
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

function getRelatedPosts(currentSlug: string, currentTags: string[]): BlogPost[] {
  const others = blogPosts.filter((p) => p.slug !== currentSlug);
  const scored = others.map((p) => ({
    post: p,
    score: p.tags.filter((t) => currentTags.includes(t)).length,
  }));
  scored.sort((a, b) => b.score - a.score || new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime());
  return scored.slice(0, 2).map((s) => s.post);
}

export function BlogLayout({ children, tocItems, tocHeading, author, publishedAt, readingTime, category, slug, tags }: {
  children: ReactNode; tocItems: TocItem[]; tocHeading?: string; author: AuthorKey; publishedAt: string; readingTime: number; category: string; slug: string; tags: string[];
}) {
  const related = getRelatedPosts(slug, tags);
  return (
    <div className="container" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
      <div className="blog-layout-grid">
        <article className="blog-article" style={{ minWidth: 0 }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", fontSize: "0.8rem", color: "var(--muted)", marginBottom: "2.5rem", flexWrap: "wrap" }}>
            <span style={{ background: "var(--purple-soft)", color: "var(--primary-dark)", padding: "0.25rem 0.75rem", borderRadius: "999px", fontWeight: 600, fontSize: "0.75rem" }}>{category}</span>
            <span>{new Date(publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span>{readingTime} min read</span>
          </div>
          {children}
          {tags.some(t => t.toLowerCase() === "unspsc") && <UnspscLookupCta />}
          <AuthorBlock authorKey={author} />
          {related.length > 0 && (
            <section style={{ marginTop: "4rem", paddingTop: "2.5rem", borderTop: "1px solid var(--border, #e5e7eb)" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.5rem", color: "var(--primary-dark)" }}>Further reading</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
                {related.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: "none", display: "block", border: "1px solid var(--border, #e5e7eb)", borderRadius: 12, padding: "1.25rem 1.5rem", transition: "box-shadow 0.2s", background: "#fff" }} className="related-post-card">
                    <span style={{ background: "var(--purple-soft)", color: "var(--primary-dark)", padding: "0.2rem 0.6rem", borderRadius: "999px", fontWeight: 600, fontSize: "0.7rem", display: "inline-block", marginBottom: "0.6rem" }}>{p.category}</span>
                    <p style={{ fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.45, color: "var(--foreground, #111)", marginBottom: "0.5rem" }}>{p.title}</p>
                    <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.55 }}>{p.description}</p>
                    <span style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 600, marginTop: "0.75rem", display: "inline-block" }}>Read more →</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
        <aside style={{ display: "none" }} className="blog-toc-col">
          <TableOfContents items={tocItems} heading={tocHeading} />
          <div style={{ position: "sticky", top: "6rem", marginTop: "2rem" }}>
            <BlogNewsletterWidget />
          </div>
        </aside>
      </div>
      <style>{`
        .blog-layout-grid { display: grid; grid-template-columns: 1fr; align-items: start; }
        @media (min-width: 1024px) { .blog-layout-grid { grid-template-columns: minmax(0,1fr) 280px; gap: 4rem; } }
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
        .related-post-card:hover { box-shadow: 0 4px 16px rgba(107,70,193,0.12); border-color: var(--primary) !important; }
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
        {ctaHref === siteConfig.calendly ? (
          <CalendlyButton label={ctaLabel} className="btn btn-primary" style={{ fontSize: "0.875rem" }} />
        ) : external ? (
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
