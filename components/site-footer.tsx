"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { footerCompanyLinks, footerSolutionLinks, siteConfig } from "@/lib/site";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const prefix = locale === "en" ? "" : `/${locale}`;
  const year = new Date().getFullYear();
  const [ftName, setFtName] = useState("");
  const [ftEmail, setFtEmail] = useState("");
  const [ftStatus, setFtStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleFooterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFtStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: ftName, email: ftEmail }),
      });
      setFtStatus(res.ok ? "success" : "error");
    } catch {
      setFtStatus("error");
    }
  }

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
            {ftStatus === "success" ? (
              <p style={{ color: "#a5f3c0", fontSize: "0.9rem", marginTop: "0.5rem" }}>You&apos;re signed up — thanks!</p>
            ) : (
              <form className="ft-form" onSubmit={handleFooterSubmit}>
                <input type="text" placeholder={t("namePlaceholder")} autoComplete="name" required value={ftName} onChange={(e) => setFtName(e.target.value)} />
                <input type="email" placeholder={t("emailPlaceholder")} autoComplete="email" required value={ftEmail} onChange={(e) => setFtEmail(e.target.value)} />
                {ftStatus === "error" && <p style={{ color: "#fca5a5", fontSize: "0.8rem" }}>Something went wrong. Try again.</p>}
                <button type="submit" disabled={ftStatus === "loading"}>{ftStatus === "loading" ? "…" : t("signUp")}</button>
              </form>
            )}
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
