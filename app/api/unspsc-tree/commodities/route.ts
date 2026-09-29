import { NextRequest, NextResponse } from "next/server";
import { getCommoditiesForClass } from "@/lib/unspsc-tree-server";

// Backs the interactive taxonomy browser (components/unspsc-tree.tsx): the
// commodity level of a UNSPSC class is only fetched when a visitor actually
// expands that class, rather than shipping all ~150k commodity titles to
// every visitor up front.
export async function GET(req: NextRequest) {
  const classCode = req.nextUrl.searchParams.get("class");
  if (!classCode || !/^\d{6}$/.test(classCode)) {
    return NextResponse.json({ error: "Provide a 6-digit class code." }, { status: 400 });
  }
  const commodities = getCommoditiesForClass(classCode);
  return NextResponse.json({ commodities });
}
