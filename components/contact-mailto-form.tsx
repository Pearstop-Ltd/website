"use client";

import type { FormEvent } from "react";
import { siteConfig } from "@/lib/site";

export function ContactMailtoForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(`Pearstop enquiry${name ? ` from ${name}` : ""}${company ? ` at ${company}` : ""}`);
    const body = encodeURIComponent(
      [
        "Hi Pearstop,",
        "",
        "I'd like to talk about:",
        "",
        message,
        "",
        "Contact details",
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "Not provided"}`,
        "",
        "Thanks,"
      ].join("\n")
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Your name" autoComplete="name" required aria-label="Your name" />
      <input type="email" name="email" placeholder="Your email" autoComplete="email" required aria-label="Your email" />
      <input type="text" name="company" placeholder="Company (optional)" autoComplete="organization" aria-label="Company" />
      <textarea name="message" placeholder="What would you like to talk about?" rows={6} required aria-label="Your message" />
      <button type="submit" className="btn btn-primary">
        Open email draft
      </button>
      <p className="contact-form-note">Your email app will open with a prefilled message ready to send.</p>
    </form>
  );
}
