export interface Person {
  id: string;
  name: string;
  role: string;
  company: string;
  /** Path to an existing headshot image (see lib/site.ts `assets`). Left
   * unset where no real photo of this specific person exists yet — the
   * quote falls back to an initials avatar rather than risk showing a
   * different person's photo under their name. */
  headshot?: string;
}

/**
 * Every named person quoted anywhere on the live site. QuoteCard /
 * CaseQuoteCard / CaseQuoteBig take a person id and resolve name, role,
 * company and headshot from here, so a named person shows the same
 * attribution and photo everywhere they're quoted. Anonymous quotes (role
 * only, no name — anonymized pattern cases) don't have an entry here and
 * are passed a plain `role` instead of a person id.
 */
export const people = {
  bartVanPeij: {
    id: "bartVanPeij",
    name: "Bart van Peij",
    role: "Head of Master Data Management",
    company: "SPIE Building Solutions",
    headshot: "/images/clients/bart-headshot.jpg",
  },
  martijnVanBalkom: {
    id: "martijnVanBalkom",
    name: "Martijn van Balkom",
    role: "Project Manager",
    company: "SPIE Building Solutions",
    headshot: "/images/clients/martijn-headshot.jpg",
  },
  vinceOut: {
    id: "vinceOut",
    name: "Vince Out",
    role: "Commercial Manager",
    company: "Lemtech",
    headshot: "/images/clients/vince-headshot.jpg",
  },
  davidTorr: {
    id: "davidTorr",
    name: "David Torr",
    role: "CEO",
    company: "FARO",
    headshot: "/images/clients/david-headshot.jpg",
  },
  strukton: {
    id: "strukton",
    name: "Strukton",
    role: "Infrastructure, Netherlands",
    company: "Strukton",
  },
} as const satisfies Record<string, Person>;

export type PersonId = keyof typeof people;

export function getPerson(id: PersonId): Person {
  return people[id];
}
