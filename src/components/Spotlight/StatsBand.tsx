"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./StatsBand.module.css";

const stats = [
  { value: "12+", label: "Years of Legacy" },
  { value: "1000+", label: "Artists Worked With" },
  { value: "2000+", label: "Shows Managed" }
];

export function StatsBand() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {stats.map((stat, idx) => (
          <ScrollReveal key={idx} delay={idx * 150} direction="up" className={styles.statBox}>
            <h2 className={styles.statValue}>{stat.value}</h2>
            <div className={styles.statFooter}>
              <span className={styles.statDot}></span>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
