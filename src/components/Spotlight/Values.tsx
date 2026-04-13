"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./Values.module.css";

const valuesData = [
  {
    title: "Authenticity over imitation",
    text: "We reveal your true style through deep creative exploration and brand alignment."
  },
  {
    title: "Confidence and elevation",
    text: "We refine every detail of your public presence to ensure you project maximum impact."
  },
  {
    title: "Ethical & Transparent",
    text: "Long-term management built on trust, honesty, and clear communication channels."
  }
];

export function Values() {
  return (
    <section className={styles.section} id="values-section">
      <div className={styles.container}>
        
        <div className={styles.header}>
          <ScrollReveal direction="up">
            <h2 className={styles.title}>
              CORE <span className={styles.goldText}>VALUES</span>
            </h2>
          </ScrollReveal>
        </div>

        <div className={styles.grid}>
          {valuesData.map((val, i) => (
            <ScrollReveal 
              key={i} 
              delay={i * 150} 
              direction="up" 
              distance={40}
            >
              <div className={styles.card}>
                <div className={styles.glow} />
                <div className={styles.cardNumber}>0{i + 1} // VII</div>
                <h3 className={styles.cardTitle}>{val.title}</h3>
                <p className={styles.cardText}>{val.text}</p>
                <div className={styles.accentLine} />
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
