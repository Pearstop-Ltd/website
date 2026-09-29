import type { Metadata } from "next";
import { MigrationsHub } from "@/components/site/pages/MigrationsHub";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "ERP migration data cleaning | Pearstop",
  description: "Clean and classify your purchase and supplier data before your ERP migration, by system.",
  alternates: {
    canonical: `${siteConfig.url}/migrations`,
    languages: alternateLanguages("/migrations"),
  },
};

export default function MigrationsHubPage() {
  return <MigrationsHub />;
}
