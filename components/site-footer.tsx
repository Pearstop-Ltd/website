"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { footerCompanyLinks, footerSolutionLinks, siteConfig } from "@/lib/site";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" role="contentinfo">
      <div className="container">
        <div className="ft-top">
          <div className="ft-brand">
            <img className="ft-logo-image" src={siteConfig.assets.logoInverse} alt={siteConfig.name} width={172} height={52} />
            <div>
              <p className="ft-tagline">{t("tagline")}</p>
            </div>
          </div>
        </div>

        <div className="ft-cols">
          <div className="ft-col">
            <div className="ft-col-title">{t("solutions")}</div>
            <ul className="ft-list">
              {footerSolutionLinks.map((link) => (
                <li key={link.href}>
                  <Link href={`${prefix}${link.href}`}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ft-col">
            <div className="ft-col-title">{t("company")}</div>
            <ul className="ft-list">
              {footerCompanyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={`${prefix}${link.href}`}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ft-col">
            <div className="ft-col-title">{t("followUs")}</div>
            <ul className="ft-list">
              <li>
                <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer">
                  {t("linkedin")}
                </a>
              </li>
              <li>
                <a href={siteConfig.socials.youtube} target="_blank" rel="noopener noreferrer">
                  {t("youtube")}
                </a>
              </li>
              <li>
                <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer">
                  {t("instagram")}
                </a>
              </li>
            </ul>
          </div>

          <div className="ft-col">
            <div className="ft-col-title">{t("stayInformed")}</div>
            <p className="ft-newsletter-intro">{t("newsletterIntro")}</p>
            <form className="ft-form" action="https://formspree.io/f/xyklkdkj" method="POST">
              <input type="text" name="name" placeholder={t("namePlaceholder")} autoComplete="name" required />
              <input type="email" name="email" placeholder={t("emailPlaceholder")} autoComplete="email" required />
              <input type="hidden" name="_subject" value={t("newsletterSubject")} />
              <button type="submit">{t("signUp")}</button>
            </form>
          </div>
        </div>

        <div className="ft-bottom">
          <div className="ft-copy">
            {t("copyright", { year })}
            <span className="ft-sep">·</span>
            <Link href={`${prefix}/privacy`}>{t("privacyPolicy")}</Link>
            <span className="ft-sep">·</span>
            <Link href={`${prefix}/terms-and-conditions`}>{t("termsConditions")}</Link>
          </div>
          <img className="ft-fav" src={siteConfig.assets.logo} alt="" aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}
