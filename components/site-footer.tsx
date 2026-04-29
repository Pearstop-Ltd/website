import Link from "next/link";
import { footerCompanyLinks, footerSolutionLinks, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer id="site-footer" role="contentinfo">
      <div className="container">
        <div className="ft-top">
          <div className="ft-brand">
            <img className="ft-logo-image" src={siteConfig.assets.logoInverse} alt={siteConfig.name} width={172} height={52} />
            <div>
              <p className="ft-tagline">Data integrity solutions for technical industries. Because margins do not need to be paper thin.</p>
            </div>
          </div>
        </div>

        <div className="ft-cols">
          <div className="ft-col">
            <div className="ft-col-title">Solutions</div>
            <ul className="ft-list">
              {footerSolutionLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ft-col">
            <div className="ft-col-title">Company</div>
            <ul className="ft-list">
              {footerCompanyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ft-col">
            <div className="ft-col-title">Follow us</div>
            <ul className="ft-list">
              <li>
                <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={siteConfig.socials.youtube} target="_blank" rel="noopener noreferrer">
                  YouTube
                </a>
              </li>
              <li>
                <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div className="ft-col">
            <div className="ft-col-title">Stay informed</div>
            <p className="ft-newsletter-intro">Data quality insights and Pearstop updates. No spam.</p>
            <form className="ft-form" action="https://formspree.io/f/xyklkdkj" method="POST">
              <input type="text" name="name" placeholder="Your name" autoComplete="name" required />
              <input type="email" name="email" placeholder="Your business email" autoComplete="email" required />
              <input type="hidden" name="_subject" value="Newsletter signup — Pearstop" />
              <button type="submit">Sign up</button>
            </form>
          </div>
        </div>

        <div className="ft-bottom">
          <div className="ft-copy">
            &copy; 2026 Pearstop. All rights reserved.
            <span className="ft-sep">·</span>
            <Link href="/privacy">Privacy Policy</Link>
            <span className="ft-sep">·</span>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </div>
          <img className="ft-fav" src={siteConfig.assets.logo} alt="" aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}
