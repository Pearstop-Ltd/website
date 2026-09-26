"use client";

import type { FormEvent } from "react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site";

export function ContactMailtoForm() {
  const t = useTranslations("ContactMailtoForm");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const notProvided = t("email.notProvided");

    const subject = encodeURIComponent(
      `${t("email.subject")}${name ? ` ${t("email.subjectFrom", { name })}` : ""}${company ? ` ${t("email.subjectAt", { company })}` : ""}`
    );
    const body = encodeURIComponent(
      [
        t("email.greeting"),
        "",
        t("email.intro"),
        "",
        message,
        "",
        t("email.detailsHeading"),
        `${t("email.name")}: ${name}`,
        `${t("email.email")}: ${email}`,
        `${t("email.company")}: ${company || notProvided}`,
        "",
        t("email.signoff")
      ].join("\n")
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder={t("namePlaceholder")} autoComplete="name" required aria-label={t("namePlaceholder")} />
      <input type="email" name="email" placeholder={t("emailPlaceholder")} autoComplete="email" required aria-label={t("emailPlaceholder")} />
      <input type="text" name="company" placeholder={t("companyPlaceholder")} autoComplete="organization" aria-label={t("companyPlaceholder")} />
      <textarea name="message" placeholder={t("messagePlaceholder")} rows={6} required aria-label={t("messagePlaceholder")} />
      <button type="submit" className="btn btn-primary">
        {t("submit")}
      </button>
      <p className="contact-form-note">{t("note")}</p>
    </form>
  );
}
