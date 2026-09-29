import type { ReactNode } from "react";
import { Section } from "../internal/Section";
import { SectionHeader } from "../SectionHeader";
import styles from "./ListSection.module.css";

export function ListSection({
  title,
  background,
  children,
}: {
  title: ReactNode;
  background?: "white" | "soft";
  children: ReactNode;
}) {
  return (
    <Section background={background}>
      <div className={styles.stack}>
        <SectionHeader title={title} />
        {children}
      </div>
    </Section>
  );
}
