/** Display labels for the fixed, non-migration pages that migration/ECLASS
 * pages link out to from their "Related reading" section. Migration and
 * ECLASS pages link to each other using their own h1/title instead (see
 * resolveRelatedLinks in MigrationPage.tsx). */
export const STATIC_PAGE_LABELS: Record<string, string> = {
  "/unspsc": "UNSPSC classification",
  "/procurement-data-quality": "Procurement data quality",
  "/spend-cube": "Spend cube",
  "/fabric": "Microsoft Fabric",
  "/data-quality": "Data quality",
  "/asset-data-management": "Asset data management",
  "/industries#hard-services": "Hard services industries",
};
