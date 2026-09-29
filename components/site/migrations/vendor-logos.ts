import type { MigrationEntry } from "@/content/migrations";

export interface VendorLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** Official vendor/brand logos shown on each migration card. Sourced from
 * each vendor's own trademark assets (see public/images/vendors/) —
 * displayed for identification only, not as a claimed partnership.
 * width/height are each file's own intrinsic size, so next/image reserves
 * the right aspect ratio; actual display size is fixed by CSS
 * (MigrationsHub.module.css .cardLogo). Skipped brands (Unit4, Access/
 * COINS) had no usable official asset — a raster tagline lockup and a
 * white-only mark that disappears on a light background — so those cards
 * render without a logo rather than with a wrong one. */
export const VENDOR_LOGOS: Record<string, VendorLogo> = {
  sap: { src: "/images/vendors/sap.svg", alt: "SAP", width: 412, height: 204 },
  microsoft: { src: "/images/vendors/microsoft.svg", alt: "Microsoft", width: 23, height: 23 },
  oracle: { src: "/images/vendors/oracle.svg", alt: "Oracle", width: 231, height: 30 },
  infor: { src: "/images/vendors/infor.svg", alt: "Infor", width: 1280, height: 744 },
  sage: { src: "/images/vendors/sage.svg", alt: "Sage", width: 1024, height: 446 },
  ifs: { src: "/images/vendors/ifs.png", alt: "IFS", width: 2095, height: 974 },
  ibm: { src: "/images/vendors/ibm.svg", alt: "IBM", width: 194, height: 28 },
  exact: { src: "/images/vendors/exact.svg", alt: "Exact", width: 168, height: 36 },
  trimble: { src: "/images/vendors/trimble.svg", alt: "Trimble", width: 790, height: 185 },
  eclass: { src: "/images/vendors/eclass.svg", alt: "ECLASS", width: 369, height: 73 },
  "4ps": { src: "/images/vendors/4ps.svg", alt: "4PS", width: 125, height: 135 },
};

const VENDOR_GROUP_LOGO_KEYS: Record<string, keyof typeof VENDOR_LOGOS> = {
  SAP: "sap",
  "Microsoft Dynamics": "microsoft",
  Oracle: "oracle",
  Infor: "infor",
  Sage: "sage",
  IFS: "ifs",
  "IBM Maximo": "ibm",
  Exact: "exact",
  ECLASS: "eclass",
};

/** Construction ERP groups three distinct brands under one heading, so
 * those need a per-entry lookup instead of the one-key-per-group map
 * above. */
const CONSTRUCTION_ENTRY_LOGO_KEYS: Record<string, keyof typeof VENDOR_LOGOS> = {
  "4ps-to-4ps-construct": "4ps",
  "viewpoint-vista-to-trimble-construction-one": "trimble",
};

export function logoFor(entry: MigrationEntry): VendorLogo | undefined {
  const key =
    entry.vendorGroup === "Construction ERP"
      ? CONSTRUCTION_ENTRY_LOGO_KEYS[entry.slug]
      : VENDOR_GROUP_LOGO_KEYS[entry.vendorGroup];
  return key ? VENDOR_LOGOS[key] : undefined;
}
