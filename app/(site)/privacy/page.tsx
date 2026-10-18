import type { Metadata } from "next";
import { PageHero } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";
import enMessages from "../../../messages/en.json";

export const metadata: Metadata = {
  title: enMessages.Privacy.meta.title,
  description: enMessages.Privacy.meta.description,
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
    languages: alternateLanguages("/privacy")
  }
};

type Section = { title: string; paragraphs?: string[]; list?: string[]; paragraphsAfter?: string[] };

const privacy = enMessages.Privacy;
const sections: Section[] = privacy.sections;

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow={privacy.hero.eyebrow} title={privacy.hero.title} lead={privacy.hero.lead} />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <p className="light-copy" style={{ fontSize: "0.85rem", marginBottom: "2.5rem" }}>{privacy.lastUpdated}</p>
              {sections.map((section) => (
                <div key={section.title} style={{ marginBottom: "2.25rem" }}>
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((p) => (
                    <p className="light-copy" key={p}>{p}</p>
                  ))}
                  {section.list ? (
                    <ul className="light-copy">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.paragraphsAfter?.map((p) => (
                    <p className="light-copy" key={p}>{p}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
