import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
import { BlogCardPattern } from "@/components/blog-card-pattern";

export function LatestBlogPosts({ locale }: { locale: string }) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  const posts = [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <section style={{ background: "#0d1b4b", padding: "4rem 0" }}>
      <div className="container">
        <h2 style={{ color: "#fff", textAlign: "center", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, marginBottom: "2.5rem" }}>
          Latest Insights
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`${prefix}/blog/${post.slug}`}
              style={{ textDecoration: "none", display: "flex", flexDirection: "column", background: "#162054", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", transition: "transform 0.2s, box-shadow 0.2s" }}
              className="latest-post-card"
            >
              <BlogCardPattern category={post.category} image={post.image} />
              <div style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", lineHeight: 1.45, marginBottom: "0.6rem" }}>
                  {post.title}
                </p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", lineHeight: 1.55, marginBottom: "auto", paddingBottom: "1.25rem" }}>
                  {post.description.length > 100 ? post.description.slice(0, 100) + "…" : post.description}
                </p>
                <span style={{ display: "inline-block", background: "#39d353", color: "#0d1b4b", fontWeight: 700, fontSize: "0.78rem", padding: "0.5rem 1.25rem", borderRadius: 8, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "1rem", alignSelf: "flex-start" }}>
                  Read more
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        .latest-post-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.35); }
      `}</style>
    </section>
  );
}
