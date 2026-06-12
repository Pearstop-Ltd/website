"use client";

import { useEffect, useState } from "react";

export type TocItem = {
  id: string;
  label: string;
};

export function TableOfContents({ items, heading = "In this article" }: { items: TocItem[]; heading?: string }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -75% 0px" }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Table of contents" style={{ position: "sticky", top: "6rem", alignSelf: "start" }}>
      <p style={{
        fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase",
        letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "0.75rem", margin: 0
      }}>
        {heading}
      </p>
      <ol style={{ listStyle: "none", padding: 0, margin: "0.75rem 0 0" }}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              style={{
                display: "block",
                padding: "0.35rem 0.5rem 0.35rem 0.75rem",
                borderLeft: `2px solid ${activeId === item.id ? "var(--primary)" : "var(--border, #e5e7eb)"}`,
                color: activeId === item.id ? "var(--primary)" : "var(--muted)",
                fontWeight: activeId === item.id ? 600 : 400,
                fontSize: "0.875rem",
                textDecoration: "none",
                transition: "all 0.15s ease",
                lineHeight: 1.4,
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
