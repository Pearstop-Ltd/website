import { UnderConstructionPage } from "@/components/under-construction-page";

export default function NotFound() {
  return (
    <UnderConstructionPage
      eyebrow="Page not found"
      title="This page is still being built."
      lead="We kept the site live so dead links do not stop visitors. Use one of the working paths below, or book directly if you already know what you need."
      ctaLabel="Book a 7-minute discovery"
    />
  );
}
