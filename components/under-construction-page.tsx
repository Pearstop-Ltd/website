import { CardGrid, CTABand, PageHero, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

const livePages = [
  {
    eyebrow: "Live now",
    title: "Solutions",
    copy: "See the six live solution pages that explain how Pearstop helps with procurement, assets, AI readiness, and Fabric readiness.",
    href: "/solutions"
  },
  {
    eyebrow: "Live now",
    title: "Case studies",
    copy: "Read the current case-study hub and open the public deck if you want the short version first.",
    href: "/case-studies"
  },
  {
    eyebrow: "Live now",
    title: "Book a call",
    copy: "Jump straight to Stephanie's 7-minute discovery link or use the contact page if you prefer email.",
    href: "/contact"
  }
];

export function UnderConstructionPage({
  eyebrow,
  title,
  lead,
  ctaLabel = "Book a 7-minute discovery",
  ctaHref = siteConfig.calendly
}: {
  eyebrow: string;
  title: string;
  lead: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        actions={[
          { label: ctaLabel, href: ctaHref, variant: "primary", external: ctaHref.startsWith("http") },
          { label: "Explore solutions", href: "/solutions", variant: "secondary" },
          { label: "View case studies", href: "/case-studies", variant: "outline" }
        ]}
      />

      <section className="section-soft">
        <div className="container">
          <SectionTitle
            title="The live paths"
            lead="If you landed on a page that is not finished yet, these are the parts of the site that are ready to use today."
          />
          <CardGrid items={livePages} columns={3} />
        </div>
      </section>

      <CTABand
        eyebrow="Need a hand?"
        title="If you were sent here by an old link, we can point you to the right page."
        lead="The main site is live, and the remaining gaps are being wrapped up behind the scenes."
        actions={[
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "Go to contact", href: "/contact", variant: "secondary" }
        ]}
      />
    </>
  );
}
