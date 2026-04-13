"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./StatsBar.module.css";

const stats = [
  { value: "150+", label: "DESIGNERS" },
  { value: "500+", label: "CLIENTS" },
  { value: "20K+", label: "MASTERPIECES" },
  { value: "50+", label: "EVENTS" },
];

export function StatsBar() {
  return (
    <section className={styles.section} id="stats-section">
      <div className={`container ${styles.container}`}>
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 100}>
            <div className={styles.stat} id={`stat-${i}`}>
              <span className={styles.label}>{stat.label}</span>
              <span className={styles.value}>{stat.value}</span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
