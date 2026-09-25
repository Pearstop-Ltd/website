import Link from "next/link";
import { dsRoot } from "./tokens";
import { siteConfig } from "@/lib/site";
import styles from "./TrustStrip.module.css";

const LOGOS = [
  { name: "Strukton", href: "/cases#strukton", src: siteConfig.assets.clients.strukton },
  { name: "FMO", href: "/cases#fmo", src: siteConfig.assets.clients.fmo },
  { name: "FARO", href: "/cases#faro", src: siteConfig.assets.clients.faro },
  { name: "Kelp", href: "/cases", src: siteConfig.assets.clients.kelpBlue },
  { name: "SPIE", href: "/cases/spie", src: siteConfig.assets.clients.spie },
  { name: "LemTech", href: "https://www.lemtech.nl/", src: siteConfig.assets.clients.lemtech, external: true }
];

/** navy-deep logo strip, matching the homepage's "Trusted by leading
 * organisations" section (#clients-and-quotes), for reuse on other pages. */
export function TrustStrip({ className }: { className?: string }) {
  return (
    <div className={dsRoot(styles.root, className)}>
      <span className={styles.label}>Trusted by leading organisations</span>
      <div className={styles.logos}>
        {LOGOS.map((logo) =>
          logo.external ? (
            <a key={logo.name} href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={`${logo.name} website`}>
              <img src={logo.src} alt={logo.name} className={styles.logo} />
            </a>
          ) : (
            <Link key={logo.name} href={logo.href} aria-label={`${logo.name} case study`}>
              <img src={logo.src} alt={logo.name} className={styles.logo} />
            </Link>
          )
        )}
      </div>
    </div>
  );
}
