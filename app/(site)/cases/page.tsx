import type { Metadata } from "next";
import { CasesIndexPage, type CasesIndexCopy } from "@/components/site/pages/CasesIndex";
import { alternateLanguages, siteConfig } from "@/lib/site";
import enMessages from "../../../messages/en.json";

const copy = enMessages.Cases as unknown as CasesIndexCopy;

export const metadata: Metadata = {
  title: "Client Results",
  description:
    "Real results from hard services, infrastructure, manufacturing, and FM companies that used Pearstop to clean their data, cut manual work, and protect their margins.",
  alternates: {
    canonical: `${siteConfig.url}/cases`,
    languages: alternateLanguages("/cases")
  }
};

export default function CasesPage() {
  return <CasesIndexPage copy={copy} />;
}
