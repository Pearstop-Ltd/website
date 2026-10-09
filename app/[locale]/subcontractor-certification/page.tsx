import type { Metadata } from "next";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ComplianceRoute, complianceCopy, complianceMetadata } from "@/lib/compliance-route";

const KEY = "certification";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  return complianceMetadata(KEY, locale, complianceCopy(await getMessages({ locale }), KEY));
}

export default async function Route({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ComplianceRoute pageKey={KEY} locale={locale} copy={complianceCopy(await getMessages({ locale }), KEY)} />;
}
