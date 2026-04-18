"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./Values.module.css";

const valuesData = [
  {
    number: "01",
    title: "Authenticity",
    subtitle: "Over Imitation",
    text: "We reveal your true style through deep creative exploration and strategic brand alignment — because the world doesn't need another copy.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop"
  },
  {
    number: "02",
    title: "Confidence",
    subtitle: "& Elevation",
    text: "We refine every detail of your public presence to ensure you project maximum authority and impact across every platform.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
  },
  {
    number: "03",
    title: "Integrity",
    subtitle: "& Transparency",
    text: "Long-term legacy management built on unwavering trust, honesty, and clear communication — always in your corner.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop"
  },
  {
    number: "04",
    title: "Strategy",
    subtitle: "And Vision",
    text: "Every career move is a calculated step. We align your artistry with market timing and opportunity to maximize your impact.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
  }
];

export function Values() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <section className={styles.section} id="values-section">
      <div className={styles.headerArea}>
        <ScrollReveal direction="up">
          <span className={styles.eyebrow}>What drives us</span>
          <h2 className={styles.title}>
            Our Core <span className={styles.goldText}>Values</span>
          </h2>
        </ScrollReveal>
      </div>

      <div className={styles.accordionContainer}>
        {valuesData.map((val, i) => {
          const isActive = hoveredIndex === i;
          return (
            <div
              key={val.number}
              className={`${styles.panel} ${isActive ? styles.panelActive : ""}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onClick={() => setHoveredIndex(i)}
            >
              <div className={styles.panelBackground}>
                <img src={val.image} alt={val.title} className={styles.panelImage} />
                <div className={styles.panelOverlay} />
              </div>
              
              <div className={styles.panelContent}>
                <div className={styles.panelTop}>
                  <span className={styles.panelNumber}>{val.number}</span>
                </div>
                
                <div className={styles.panelBottom}>
                  <div className={styles.titleBox}>
                    <h3 className={styles.panelTitle}>{val.title}</h3>
                    <p className={styles.panelSubtitle}>{val.subtitle}</p>
                  </div>
                  
                  <div className={styles.hiddenTextWrapper}>
                    <p className={styles.panelText}>{val.text}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
