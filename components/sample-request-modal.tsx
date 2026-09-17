"use client";

import { useRef, useState, type FormEvent } from "react";
import { RecaptchaNotice, RecaptchaScript, useRecaptchaV3 } from "@/components/recaptcha-widget";

type Step = "email" | "details" | "success";
type Status = "idle" | "submitting" | "error";

export function SampleRequestModal({ label = "Send us 200 lines", className = "btn btn-primary" }: { label?: string; className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const detailsFormRef = useRef<HTMLFormElement>(null);
  const { getToken } = useRecaptchaV3();

  const [step, setStep] = useState<Step>("email");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [leadId, setLeadId] = useState("");

  const openModal = () => dialogRef.current?.showModal();

  const reset = () => {
    setStep("email");
    setStatus("idle");
    setErrorMessage("");
    setEmail("");
    setCompany("");
    setLeadId("");
    detailsFormRef.current?.reset();
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
    const submittedEmail = String(formData.get("email") || "").trim();
    const submittedCompany = String(formData.get("company") || "").trim();

    try {
      const recaptchaToken = await getToken("sample_request_start");
      const body = new FormData();
      body.set("stage", "start");
      body.set("email", submittedEmail);
      body.set("company", submittedCompany);
      if (recaptchaToken) body.set("recaptchaToken", recaptchaToken);

      const response = await fetch("/api/sample-request", { method: "POST", body });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMessage(data.error || "Something went wrong — please try again.");
        setStatus("idle");
        return;
      }

      setEmail(submittedEmail);
      setCompany(submittedCompany);
      setLeadId(data.leadId || "");
      setStatus("idle");
      setStep("details");
    } catch {
      setErrorMessage("Something went wrong — please try again.");
      setStatus("idle");
    }
  };

  const handleDetailsStep = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      const recaptchaToken = await getToken("sample_request_complete");
      formData.set("stage", "complete");
      formData.set("email", email);
      formData.set("company", company);
      formData.set("leadId", leadId);
      if (recaptchaToken) formData.set("recaptchaToken", recaptchaToken);

      const response = await fetch("/api/sample-request", { method: "POST", body: formData });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(data.error || "Something went wrong — please try again.");
        setStatus("idle");
        return;
      }

      setStatus("idle");
      setStep("success");
    } catch {
      setErrorMessage("Something went wrong — please try again.");
      setStatus("idle");
    }
  };

  return (
    <>
      <RecaptchaScript />
      <button type="button" className={className} onClick={openModal}>
        {label}
      </button>
      <dialog ref={dialogRef} className="sample-modal" aria-labelledby="sample-modal-title">
        <button type="button" className="sample-modal-close" onClick={closeModal} aria-label="Close">
          &times;
        </button>

        {step === "success" ? (
          <>
            <h2 id="sample-modal-title">Sample received</h2>
            <p className="sample-modal-lead">
              Thanks &mdash; we&rsquo;ve got your files and details. We&rsquo;ll come back to you at {email} once your
              sample is classified.
            </p>
            <button type="button" className="btn btn-primary" onClick={closeModal}>
              Done
            </button>
          </>
        ) : step === "email" ? (
          <>
            <h2 id="sample-modal-title">Send us a sample</h2>
            <p className="sample-modal-lead">
              Send a representative sample of your invoice lines &mdash; up to 200 lines, or a handful of invoices
              (max 10) &mdash; and we&rsquo;ll classify them to show you exactly how it works. No cost, no commitment.
            </p>
            <form className="contact-form" onSubmit={handleEmailStep}>
              <input type="text" name="company" placeholder="Company name" autoComplete="organization" required aria-label="Company name" />
              <input type="email" name="email" placeholder="Your email" autoComplete="email" required aria-label="Your email" />
              {errorMessage ? <p className="sample-modal-error">{errorMessage}</p> : null}
              <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
                {status === "submitting" ? "Continuing…" : "Continue"}
              </button>
              <RecaptchaNotice />
              <p className="sample-modal-legal">
                By continuing, you agree to Pearstop&rsquo;s <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> and{" "}
                <a href="/terms-and-conditions" target="_blank" rel="noreferrer">Terms</a>.
              </p>
            </form>
          </>
        ) : (
          <>
            <h2 id="sample-modal-title">Almost there</h2>
            <p className="sample-modal-lead">
              A couple more details, then attach your files &mdash; up to 200 lines, or a handful of invoices (max
              10).
            </p>
            <form ref={detailsFormRef} className="contact-form" onSubmit={handleDetailsStep}>
              <select name="spend" defaultValue="" aria-label="Approximate procurement spend">
                <option value="" disabled>Approximate procurement spend</option>
                <option value="Under €5M">Under €5M</option>
                <option value="€5M–€50M">€5M–€50M</option>
                <option value="€50M–€500M">€50M–€500M</option>
                <option value="€500M–€1B">€500M–€1B</option>
                <option value="€1B+">€1B+</option>
              </select>
              <textarea name="goal" placeholder="What are you hoping to get out of this? (optional)" rows={3} aria-label="Your goal" />
              <label className="sample-modal-file-label" htmlFor="sample-files">
                Invoice files (up to 10, PDF/Excel/CSV/images)
              </label>
              <input id="sample-files" type="file" name="files" multiple aria-label="Invoice files" />
              {errorMessage ? <p className="sample-modal-error">{errorMessage}</p> : null}
              <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : "Send sample"}
              </button>
              <RecaptchaNotice />
              <p className="contact-form-note">Your files are sent straight to us and never shared elsewhere.</p>
              <p className="sample-modal-legal">
                By sending, you agree to Pearstop&rsquo;s <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> and{" "}
                <a href="/terms-and-conditions" target="_blank" rel="noreferrer">Terms</a>.
              </p>
            </form>
          </>
        )}
      </dialog>
    </>
  );
}
