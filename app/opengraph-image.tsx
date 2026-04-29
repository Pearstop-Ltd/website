import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(135deg, #1f2a68 0%, #353fff 60%, #a383ff 100%)",
          color: "#fff",
          fontFamily: "Inter, sans-serif"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 24, letterSpacing: 1.6, textTransform: "uppercase", opacity: 0.85 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, maxWidth: 920 }}>
            Procurement and asset data quality for hard services.
          </div>
          <div style={{ fontSize: 30, maxWidth: 900, opacity: 0.9 }}>
            We classify 35,000 procurement lines a month, automatically.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 22, opacity: 0.88 }}>pearstop.com</div>
          <div style={{ fontSize: 22, opacity: 0.88 }}>Dublin · Netherlands · South Africa · Italy</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}

