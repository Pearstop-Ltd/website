import { dsRoot } from "../tokens";
import { SectionHeader } from "../SectionHeader";
import styles from "./MigrationJourney.module.css";

const STEPS: Array<{ title: string; body: string; pearstop: boolean }> = [
  {
    title: "Plan and choose a partner",
    body: "The business case is agreed and an implementation partner is chosen.",
    pearstop: false,
  },
  {
    title: "Assess the data",
    body: "What exists, what to move, and what state it is in. Pearstop starts here, by checking and classifying your purchase and supplier data.",
    pearstop: true,
  },
  {
    title: "Design the new system",
    body: "Processes, fields and how old data maps to new. Pearstop maps the cleaned data to the new system's fields.",
    pearstop: true,
  },
  {
    title: "Test the move",
    body: "Before go-live, your partner tests the move by loading the data into a trial version of the new system, often several times. We hand over the cleaned data in the format the new system imports, so those tests don't fail on bad records.",
    pearstop: true,
  },
  {
    title: "Go live",
    body: "The new system goes live for your teams.",
    pearstop: false,
  },
  {
    title: "Run",
    body: "New invoices stay classified, so reporting doesn't slip back.",
    pearstop: true,
  },
];

const PEOPLE = [
  { label: "Finance and procurement", body: "Your teams, who own the data." },
  { label: "IT", body: "Keeps systems, access and integrations running through the move." },
  { label: "Implementation partner", body: "Sets up the new system." },
  { label: "Pearstop", body: "Cleans and classifies the data." },
];

export function MigrationJourney({ className }: { className?: string }) {
  return (
    <div className={dsRoot(styles.stack, className)}>
      <SectionHeader eyebrow="The migration journey" title="Where this fits in your migration" />
      <div className={styles.grid}>
        {STEPS.map((step, i) => (
          <div className={dsRoot(styles.step, step.pearstop && styles.stepHighlight)} key={step.title}>
            <div className={styles.badgeRow}>
              <span className={styles.badge}>{i + 1}</span>
              {step.pearstop ? <span className={styles.pearstopTag}>Pearstop</span> : null}
            </div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepBody}>{step.body}</p>
          </div>
        ))}
      </div>
      <p className={styles.caption}>
        A mid-sized migration often takes six to twelve months; larger SAP and Oracle programmes often run a year or
        more. Data problems usually show up during the test runs, when there is least time to fix them.
      </p>
      <div className={styles.people}>
        {PEOPLE.map((person) => (
          <div key={person.label}>
            <span className={styles.personLabel}>{person.label}</span>
            <p className={styles.personBody}>{person.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
