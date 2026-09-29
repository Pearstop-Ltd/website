import Image from "next/image";
import Link from "next/link";
import { dsRoot } from "../tokens";
import { Section } from "../internal/Section";
import { Card } from "../Card";
import { ClosingCTA } from "../ClosingCTA";
import { HeadlineAccent } from "../HeadlineAccent";
import { logoFor } from "../migrations/vendor-logos";
import { SampleRequestModal } from "@/components/sample-request-modal";
import { siteConfig } from "@/lib/site";
import { migrationEntries, basePathFor } from "@/content/migrations";
import styles from "./MigrationsHub.module.css";

const VENDOR_ORDER = [
  "SAP",
  "Microsoft Dynamics",
  "Oracle",
  "Infor",
  "Sage",
  "Construction ERP",
  "IFS",
  "IBM Maximo",
  "Exact",
  "Unit4",
  "ECLASS",
];

export function MigrationsHub() {
  const published = migrationEntries.filter((entry) => entry.status === "published");

  const groups = VENDOR_ORDER.map((vendor) => ({
    vendor,
    entries: published.filter((entry) => entry.vendorGroup === vendor),
  })).filter((group) => group.entries.length > 0);

  return (
    <div className={dsRoot()}>
      <Section background="white">
        <div className={styles.hero}>
          <span className={styles.eyebrow}>Migrations</span>
          <h1 className={styles.title}>Clean your purchase data before your next migration</h1>
          <HeadlineAccent />
          <p className={styles.lead}>
            Every ERP migration carries its data along with it, good or bad. Pick your system below for what breaks,
            what it costs to leave uncleaned, and how Pearstop classifies your purchase and supplier data before it
            moves.
          </p>
        </div>
      </Section>

      <Section background="soft" paddingTop={0}>
        <div className={styles.groups}>
          {groups.map((group) => (
            <div key={group.vendor}>
              <h2 className={styles.groupTitle}>{group.vendor}</h2>
              <div className={styles.cardGrid}>
                {group.entries.map((entry) => {
                  const logo = logoFor(entry);
                  return (
                    <Link href={`${basePathFor(entry)}/${entry.slug}`} key={entry.slug} className={styles.cardLink}>
                      <Card
                        title={entry.h1}
                        body={entry.kind === "migration" ? entry.trigger : entry.intro}
                        variant="plain"
                        icon={
                          logo ? (
                            <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className={styles.cardLogo} />
                          ) : undefined
                        }
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <p className={styles.trademarkNote}>
          System names and logos are trademarks of their respective owners. Pearstop is not affiliated with or
          endorsed by any of them.
        </p>
      </Section>

      <ClosingCTA
        title="Send us 200 lines"
        body="We'll classify a sample of your purchase data and send it back so you can see what good data looks like before you commit to cleaning the rest."
        primaryLabel="Send us 200 lines"
        primaryAction={(className) => <SampleRequestModal label="Send us 200 lines" className={className} />}
        secondaryLabel="Book a 15-minute discovery"
        secondaryHref={siteConfig.calendly}
        footerLine={`© ${new Date().getFullYear()} Pearstop · Privacy · Terms`}
      />
    </div>
  );
}
