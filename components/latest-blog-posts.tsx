import { existsSync, readFileSync } from "fs";
import path from "path";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { blogPosts } from "@/lib/blog-posts";
import { BlogCardPattern } from "@/components/blog-card-pattern";

function getMdxFrontmatter(locale: string, slug: string): { title?: string; description?: string } {
  const tryPath = (loc: string) => path.join(process.cwd(), "content", "blog", loc, `${slug}.mdx`);
  const filePath = existsSync(tryPath(locale)) ? tryPath(locale) : existsSync(tryPath("en")) ? tryPath("en") : null;
  if (!filePath) return {};
  const raw = readFileSync(filePath, "utf-8").replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    fm[key] = line.slice(colon + 1).trim().replace(/^"|"$/g, "");
  }
  return { title: fm.title, description: fm.description };
}

export async function LatestBlogPosts({ locale }: { locale: string }) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations({ locale, namespace: "Blog" });

  const posts = [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <section style={{ background: "#0d1b4b", padding: "4rem 0" }}>
      <div className="container">
        <h2 style={{ color: "#fff", textAlign: "center", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, marginBottom: "2.5rem" }}>
          {t("latestInsights")}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {posts.map((post) => {
            const fm = getMdxFrontmatter(locale, post.slug);
            const title = fm.title || post.title;
            const description = fm.description || post.description;
            return (
              <Link
                key={post.slug}
                href={`${prefix}/blog/${post.slug}`}
                style={{ textDecoration: "none", display: "flex", flexDirection: "column", background: "#162054", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", transition: "transform 0.2s, box-shadow 0.2s" }}
                className="latest-post-card"
              >
                <BlogCardPattern category={post.category} image={post.image} />
                <div style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", lineHeight: 1.45, marginBottom: "0.6rem" }}>
                    {title}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", lineHeight: 1.55, marginBottom: "auto", paddingBottom: "1.25rem" }}>
                    {description.length > 100 ? description.slice(0, 100) + "…" : description}
                  </p>
                  <span style={{ display: "inline-block", background: "#39d353", color: "#0d1b4b", fontWeight: 700, fontSize: "0.78rem", padding: "0.5rem 1.25rem", borderRadius: 8, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "1rem", alignSelf: "flex-start" }}>
                    {t("readMore")}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <style>{`
        .latest-post-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.35); }
      `}</style>
    </section>
  );
}
