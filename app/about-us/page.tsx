import type { Metadata } from "next";
import Link from "next/link";
import { CTABand, GeoBlock, PageHero, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Pearstop",
  description:
    "Pearstop is a data quality company for hard services, construction, and infrastructure. We clean and classify procurement and asset data so technical businesses can manage costs, plan maintenance, and make decisions they can trust.",
  alternates: {
    canonical: `${siteConfig.url}/about-us`
  }
};

const leaders = [
  {
    name: "Stephanie Wiechers",
    role: "CEO",
    copy:
      "Stephanie co-founded Pearstop after years of watching good businesses lose margin to data they could not use. She leads strategic direction, and makes sure the work always connects back to real business outcomes."
  },
  {
    name: "Richard Wallace",
    role: "COO",
    copy:
      "Richard leads client delivery at Pearstop, ensuring every engagement runs smoothly and that what we promise on paper becomes results in practice."
  },
  {
    name: "Erwin de Werd",
    role: "CRO",
    copy:
      "Erwin builds the pipeline and the processes that turn data integrity into commercial growth. If you have had a first conversation with Pearstop, it probably started with Erwin."
  }
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="We started Pearstop because we were fed up."
        lead="Fed up with watching smart people spend their days on manual data work that a machine should be doing. Fed up with insights that never made it to the decision-maker because the data underneath was not good enough. Fed up with inefficiency that was completely, entirely unnecessary."
      />

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="story-label">How it started</div>
              <h2>How it started</h2>
            </div>
            <div className="col-md-7 col-md-offset-1">
              <p className="story-text">
                Pearstop was built from a simple observation: data problems are everywhere in technical industries, they are expensive, and nobody was solving them properly.
              </p>
              <p className="story-text">
                We started by taking on any data problem we could get our hands on - ETL projects, reporting, dashboards, integrations. Then came FARO, a South African retail company. They needed someone to manually categorise every container they were considering purchasing to build a cost picture. Two full-time people, doing repetitive work that added no real value. We automated it, linked it to other databases, and drew up the insights instead.
              </p>
              <p className="story-text story-highlight">That became the foundation for everything Pearstop does today.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center" style={{ marginBottom: "3rem" }}>
              <div className="story-label">The Name</div>
              <h2>Why Pearstop?</h2>
              <p className="light-copy" style={{ maxWidth: "760px", margin: "0.75rem auto 0" }}>
                Hard problems need clear heads. When we would get deep into a tough data challenge - really deep - we would take a break with a big bowl of fruit. Stephanie's go-to was always a pear. So when we needed a name, it was obvious: take a pear. Stop. Come back sharper.
              </p>
              <p style={{ fontWeight: 700, color: "var(--navy)" }}>That is still how we work.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="Leadership Team" lead="A group of problem-solvers who love untangling complexity. We are technical enough to build it, practical enough to make it work for real businesses." />
          <div className="testimonials-grid">
            {leaders.map((leader) => (
              <article key={leader.name} className="person-card">
                <div className="person-photo" />
                <div className="person-body">
                  <h3>{leader.name}</h3>
                  <div className="person-role">{leader.role}</div>
                  <p className="light-copy">{leader.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <SectionTitle title="The Full Team" lead="The people who build, sell, and run Pearstop every day." />
          <div className="industry-grid">
            {[
              { name: "Robin", role: "Team Lead Development" },
              { name: "Sjoerd", role: "Development" },
              { name: "Dean", role: "Sales" },
              { name: "Seb", role: "Technical Advisor" }
            ].map((person) => (
              <div key={person.name} className="team-member">
                <div className="member-photo" />
                <h3>{person.name}</h3>
                <div className="member-role">{person.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="What We Stand For" lead="Three principles that guide everything we build and every client we serve." />
          <div className="bene-cards">
            <article className="values-card">
              <div className="values-icon">✓</div>
              <h3>Data Integrity First</h3>
              <p>We believe clean data is the foundation of every good business decision. We never compromise on accuracy or reliability.</p>
            </article>
            <article className="values-card featured">
              <div className="values-icon">◉</div>
              <h3>Industry Expertise</h3>
              <p>We deeply understand the industries we serve - their pressures, their margins, and their data challenges. Generic solutions do not cut it here.</p>
            </article>
            <article className="values-card">
              <div className="values-icon">↗</div>
              <h3>Measurable Impact</h3>
              <p>Every engagement is measured against real commercial outcomes - margin improvement, time saved, accuracy gained. If it cannot be measured, it does not count.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock
                title="Where We Work"
                copy="Headquartered in Dublin, with local hubs in Ireland, the Netherlands, South Africa, and Italy. Dogpatch Labs, CHQ Building, Custom House Quay, Dublin D01 Y6H7, Ireland. inquiries@pearstop.com."
              />
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Let's talk."
        lead="Got a data problem worth solving? We would love to hear about it."
        actions={[
          { label: "Get in touch", href: "/contact", variant: "primary" },
          { label: "Book a 7-minute discovery", href: "/contact", variant: "secondary" }
        ]}
      />
    </>
  );
}

