import type { Metadata } from "next";
import { ComplianceRoute, complianceCopy, complianceMetadata } from "@/lib/compliance-route";
import enMessages from "../../../messages/en.json";

const KEY = "recycling";
const copy = complianceCopy(enMessages, KEY);

export const metadata: Metadata = complianceMetadata(KEY, "en", copy);

export default function Route() {
  return <ComplianceRoute pageKey={KEY} locale="en" copy={copy} />;
}
