"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { RecaptchaNotice, RecaptchaScript, useRecaptchaV3 } from "@/components/recaptcha-widget";
import { siteConfig } from "@/lib/site";

type Step = "email" | "details" | "fallback" | "success";
type Status = "idle" | "submitting";

export function SampleRequestModal({ label, className = "btn btn-primary" }: { label?: string; className?: string }) {
  const t = useTranslations("SampleRequestModal");
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const detailsFormRef = useRef<HTMLFormElement>(null);
  const { getToken } = useRecaptchaV3();

  const [step, setStep] = useState<Step>("email");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [leadId, setLeadId] = useState("");
  const [fallbackMailto, setFallbackMailto] = useState("");

  const openModal = () => dialogRef.current?.showModal();

  const reset = () => {
    setStep("email");
    setStatus("idle");
    setErrorMessage("");
    setName("");
    setEmail("");
    setCompany("");
    setLeadId("");
    setFallbackMailto("");
    detailsFormRef.current?.reset();
  };

  const buildFallbackMailto = (companyName: string, contactEmail: string, spend: string, goal: string) => {
    const subject = encodeURIComponent(`Sample lines for classification (upload failed) – ${companyName}`);
    const notProvided = t("fallbackEmail.notProvided");
    const body = encodeURIComponent(
      [
        t("fallbackEmail.greeting"),
        "",
        t("fallbackEmail.uploadFailed"),
        "",
        `${t("fallbackEmail.company")}: ${companyName}`,
        `${t("fallbackEmail.spend")}: ${spend || notProvided}`,
        `${t("fallbackEmail.goal")}: ${goal || notProvided}`,
        `${t("fallbackEmail.email")}: ${contactEmail}`,
        "",
        t("fallbackEmail.attached"),
        "",
        t("fallbackEmail.signoff")
      ].join("\n")
    );
    return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  const closeModal = () => {
    dialogRef.current?.close();
    reset();
  };

  const handleEmailStep = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const submittedName = String(formData.get("name") || "").trim();
    const submittedEmail = String(formData.get("email") || "").trim();
    const submittedCompany = String(formData.get("company") || "").trim();

    try {
      const recaptchaToken = await getToken("sample_request_start");
      const body = new FormData();
      body.set("stage", "start");
      body.set("name", submittedName);
      body.set("email", submittedEmail);
      body.set("company", submittedCompany);
      if (recaptchaToken) body.set("recaptchaToken", recaptchaToken);

      const response = await fetch("/api/sample-request", { method: "POST", body });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMessage(data.error || t("error"));
        setStatus("idle");
        return;
      }

      setName(submittedName);
      setEmail(submittedEmail);
      setCompany(submittedCompany);
      setLeadId(data.leadId || "");
      setStatus("idle");
      setStep("details");
    } catch {
      setErrorMessage(t("error"));
      setStatus("idle");
    }
  };

  const handleDetailsStep = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const spend = String(formData.get("spend") || "");
    const goal = String(formData.get("goal") || "");

    const fallToEmail = () => {
      const mailto = buildFallbackMailto(company, email, spend, goal);
      setFallbackMailto(mailto);
      setStatus("idle");
      setStep("fallback");
      window.location.href = mailto;
    };

    try {
      const recaptchaToken = await getToken("sample_request_complete");
      formData.set("stage", "complete");
      formData.set("name", name);
      formData.set("email", email);
      formData.set("company", company);
      formData.set("leadId", leadId);
      if (recaptchaToken) formData.set("recaptchaToken", recaptchaToken);

      const response = await fetch("/api/sample-request", { method: "POST", body: formData });

      if (!response.ok) {
        fallToEmail();
        return;
      }

      setStatus("idle");
      setStep("success");
    } catch {
      fallToEmail();
    }
  };

  return (
    <>
      <RecaptchaScript />
      <button type="button" className={className} onClick={openModal}>
        {label}
      </button>
      <dialog ref={dialogRef} className="sample-modal" aria-labelledby={titleId}>
        <button type="button" className="sample-modal-close" onClick={closeModal} aria-label={t("close")}>
          &times;
        </button>

        {step === "success" ? (
          <>
            <h2 id={titleId}>{t("success.title")}</h2>
            <p className="sample-modal-lead">{t("success.lead", { email })}</p>
            <button type="button" className="btn btn-primary" onClick={closeModal}>
              {t("success.done")}
            </button>
          </>
        ) : step === "email" ? (
          <>
            <h2 id={titleId}>{t("email.title")}</h2>
            <p className="sample-modal-lead">{t("email.lead")}</p>
            <form className="contact-form" onSubmit={handleEmailStep}>
              <input type="text" name="name" placeholder={t("email.namePlaceholder")} autoComplete="name" required aria-label={t("email.namePlaceholder")} />
              <input type="text" name="company" placeholder={t("email.companyPlaceholder")} autoComplete="organization" required aria-label={t("email.companyPlaceholder")} />
              <input type="email" name="email" placeholder={t("email.emailPlaceholder")} autoComplete="email" required aria-label={t("email.emailPlaceholder")} />
              {errorMessage ? <p className="sample-modal-error">{errorMessage}</p> : null}
              <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
                {status === "submitting" ? t("email.continuing") : t("email.continueLabel")}
              </button>
              <RecaptchaNotice />
              <p className="sample-modal-legal">
                {t.rich("email.legal", {
                  privacyLink: (chunks) => <a href="/privacy" target="_blank" rel="noreferrer">{chunks}</a>,
                  termsLink: (chunks) => <a href="/terms-and-conditions" target="_blank" rel="noreferrer">{chunks}</a>
                })}
              </p>
            </form>
          </>
        ) : step === "fallback" ? (
          <>
            <h2 id={titleId}>{t("fallback.title")}</h2>
            <p className="sample-modal-lead">{t("fallback.lead", { email: siteConfig.email })}</p>
            <div className="hero-actions" style={{ justifyContent: "flex-start" }}>
              <a href={fallbackMailto} className="btn btn-primary">{t("fallback.openEmail")}</a>
              <button type="button" className="btn btn-outline" onClick={closeModal}>{t("fallback.close")}</button>
            </div>
          </>
        ) : (
          <>
            <h2 id={titleId}>{t("details.title")}</h2>
            <p className="sample-modal-lead">{t("details.lead")}</p>
            <form ref={detailsFormRef} className="contact-form" onSubmit={handleDetailsStep}>
              <select name="spend" defaultValue="" aria-label={t("details.spendLabel")}>
                <option value="" disabled>{t("details.spendLabel")}</option>
                <option value="Under €5M">{t("details.spendOptions.under5m")}</option>
                <option value="€5M–€50M">{t("details.spendOptions.m5to50")}</option>
                <option value="€50M–€500M">{t("details.spendOptions.m50to500")}</option>
                <option value="€500M–€1B">{t("details.spendOptions.m500to1b")}</option>
                <option value="€1B+">{t("details.spendOptions.over1b")}</option>
              </select>
              <textarea name="goal" placeholder={t("details.goalPlaceholder")} rows={3} aria-label={t("details.goalPlaceholder")} />
              <label className="sample-modal-file-label" htmlFor="sample-files">
                {t("details.filesLabel")}
              </label>
              <input id="sample-files" type="file" name="files" multiple aria-label={t("details.filesLabel")} />
              <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
                {status === "submitting" ? t("details.sending") : t("details.sendSample")}
              </button>
              <RecaptchaNotice />
              <p className="contact-form-note">{t("details.note")}</p>
              <p className="sample-modal-legal">
                {t.rich("details.legal", {
                  privacyLink: (chunks) => <a href="/privacy" target="_blank" rel="noreferrer">{chunks}</a>,
                  termsLink: (chunks) => <a href="/terms-and-conditions" target="_blank" rel="noreferrer">{chunks}</a>
                })}
              </p>
            </form>
          </>
        )}
      </dialog>
    </>
  );
}
