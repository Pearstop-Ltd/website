import Link from "next/link";
import { CalendlyButton } from "@/components/calendly-button";
import { siteConfig } from "@/lib/site";
import type { ReactNode } from "react";
import { HeroBackgroundVideo } from "@/components/hero-background-video";

type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
  external?: boolean;
};

type HeroProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: HeroAction[];
  videoUrl?: string;
  videoPoster?: string;
  className?: string;
};

export function PageHero({ eyebrow, title, lead, actions, videoUrl, videoPoster, className }: HeroProps) {
  return (
    <header className={`page-hero dark ${className ?? ""}`}>
      {videoUrl ? (
        <HeroBackgroundVideo src={videoUrl} poster={videoPoster ?? "/images/home/spend-control.webp"} />
      ) : (
        <div className="hero-bg" aria-hidden="true" />
      )}

      <div className="container hero-copy">
        <div className="text-center">
          {eyebrow ? <span className="pill">{eyebrow}</span> : null}
          <h1 className="hero-title dark">{title}</h1>
          {lead ? <p className="hero-lead">{lead}</p> : null}
          {actions?.length ? (
            <div className="hero-actions" style={{ marginTop: "1.75rem" }}>
              {actions.map((action) => {
                const className =
                  action.variant === "secondary"
                    ? "btn btn-secondary"
                    : action.variant === "outline"
                      ? "btn btn-outline"
                      : "btn btn-primary";

                if (action.href === siteConfig.calendly) {
                  return <CalendlyButton key={action.label} label={action.label} className={className} />;
                }
                if (action.external) {
                  return (
                    <a key={`${action.label}-${action.href}`} href={action.href} className={className} target="_blank" rel="noopener noreferrer">
                      {action.label}
                    </a>
                  );
                }

                return (
                  <Link key={`${action.label}-${action.href}`} href={action.href} className={className}>
                    {action.label}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

type SectionTitleProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
};

export function SectionTitle({ eyebrow, title, lead, className }: SectionTitleProps) {
  return (
    <div className={`text-center ${className ?? ""}`} style={{ marginBottom: "2.75rem" }}>
      {eyebrow ? <span className="pill">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {lead ? <p className="light-copy" style={{ fontSize: "1.05rem", maxWidth: "760px", margin: "0.75rem auto 0" }}>{lead}</p> : null}
    </div>
  );
}

type GridItem = {
  title: ReactNode;
  copy: ReactNode;
  href?: string;
  eyebrow?: string;
};

type CardGridProps = {
  items: GridItem[];
  columns?: 2 | 3 | 4;
  className?: string;
};

export function CardGrid({ items, columns = 3, className }: CardGridProps) {
  const gridClass = columns === 2 ? "article-grid" : columns === 4 ? "industry-grid" : "bene-cards";

  return (
    <div className={`${gridClass} ${className ?? ""}`}>
      {items.map((item, index) => (
        <article className={columns === 2 ? "blog-card" : "sol-card"} key={`${index}-${typeof item.title === "string" ? item.title : index}`}>
          {item.eyebrow ? <div className="sol-eyebrow">{item.eyebrow}</div> : null}
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
          {item.href ? (
            <Link className="sol-link" href={item.href}>
              Explore solution →
            </Link>
          ) : null}
        </article>
      ))}
    </div>
  );
}

type Stat = {
  value: ReactNode;
  label: ReactNode;
  copy?: ReactNode;
};

export function StatsGrid({ stats, className }: { stats: Stat[]; className?: string }) {
  return (
    <div className={`bene-cards ${className ?? ""}`}>
      {stats.map((stat, index) => (
        <article key={`${index}-${String(stat.value)}`} className="stat-card">
          <div className="stat-num">{stat.value}</div>
          <div className="stat-lbl">{stat.label}</div>
          {stat.copy ? <p>{stat.copy}</p> : null}
        </article>
      ))}
    </div>
  );
}

export function QuoteBox({
  quote,
  author,
  role,
  image,
  dark = false
}: {
  quote: ReactNode;
  author: ReactNode;
  role: ReactNode;
  image?: string;
  dark?: boolean;
}) {
  return (
    <div className={`quote-card ${dark ? "featured-dark" : ""}`}>
      <p style={{ fontStyle: "italic" }}>{quote}</p>
      <div className="quote-author">
        {image
          ? <img src={image} alt={String(author)} className="cf-avatar" style={{ borderRadius: "50%", objectFit: "cover" }} />
          : <div className="cf-avatar" />}
        <div>
          <span className="quote-author-name">{author}</span>
          <span className="quote-author-role">{role}</span>
        </div>
      </div>
    </div>
  );
}

export function GeoBlock({ title, copy }: { title: ReactNode; copy: ReactNode }) {
  return (
    <div className="geo-block">
      <h3>{title}</h3>
      <p>{copy}</p>
    </div>
  );
}

export function CTABand({
  title,
  lead,
  actions,
  eyebrow,
  dark = true
}: {
  title: ReactNode;
  lead?: ReactNode;
  actions: HeroAction[];
  eyebrow?: string;
  dark?: boolean;
}) {
  return (
    <section className={dark ? "dark ccta-dark" : "section-soft"}>
      <div className="container">
        <div className="text-center">
          {eyebrow ? <span className="pill">{eyebrow}</span> : null}
          <h2>{title}</h2>
          {lead ? <p className="ccta-lead" style={{ color: dark ? "rgba(255,255,255,0.8)" : "var(--muted)" }}>{lead}</p> : null}
          <div className="ccta-btns">
            {actions.map((action) => {
              const className =
                action.variant === "secondary"
                  ? "btn btn-secondary"
                  : action.variant === "outline"
                    ? "btn btn-outline"
                    : "btn btn-primary";
              if (action.href === siteConfig.calendly) {
                return <CalendlyButton key={action.label} label={action.label} className={className} />;
              }
              return action.external ? (
                <a key={`${action.label}-${action.href}`} href={action.href} className={className} target="_blank" rel="noopener noreferrer">
                  {action.label}
                </a>
              ) : (
                <Link key={`${action.label}-${action.href}`} href={action.href} className={className}>
                  {action.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
