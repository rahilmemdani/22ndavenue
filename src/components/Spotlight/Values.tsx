"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./Values.module.css";

const valuesData = [
  {
    title: "Authenticity Over Imitation",
    text: "We reveal your true style through deep creative exploration and strategic brand alignment."
  },
  {
    title: "Confidence & Elevation",
    text: "We refine every detail of your public presence to ensure you project maximum authority and impact."
  },
  {
    title: "Ethical & Transparent",
    text: "Long-term legacy management built on unwavering trust, honesty, and clear communication."
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

        {/* Gliding Monoliths Carousel */}
        <div className={styles.carousel}>
          {valuesData.map((val, i) => (
            <ScrollReveal 
              key={i} 
              delay={i * 150} 
              direction="up"
            >
              <div className={styles.card}>
                <div className={styles.glare} />
                <div className={styles.cardNumber}>CORE PRINCIPLE 0{i + 1} — VII</div>
                <h3 className={styles.cardTitle}>{val.title}</h3>
                <p className={styles.cardText}>{val.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Scroll Guide */}
        <div className={styles.guide}>
          <div className={styles.line} />
          <span className={styles.guideText}>Swipe to Navigate</span>
          <div className={styles.line} />
        </div>

      </div>
    </section>
  );
}
