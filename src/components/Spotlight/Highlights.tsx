"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./Highlights.module.css";

const bentoItems = [
  {
    id: "01",
    title: "Curated Strategy",
    desc: "We do not believe in mass-market approaches. Every campaign is a bespoke strategy tailored to your exact creative DNA.",
    image: "https://images.unsplash.com/photo-1577726590216-953ebbb7f2da?q=80&w=1000&auto=format&fit=crop",
    colSpan: 2,
    rowSpan: 2
  },
  {
    id: "02",
    title: "Exclusive Networks",
    desc: "Direct access to industry-leading brands, global networks, and premium collaborations.",
    image: null,
    colSpan: 1,
    rowSpan: 1,
    icon: "✦"
  },
  {
    id: "03",
    title: "Creative Control",
    desc: "You never lose your voice. We amplify your vision while preserving your total artistic integrity.",
    image: null,
    colSpan: 1,
    rowSpan: 1,
    icon: "◈"
  },
  {
    id: "04",
    title: "Global Reach",
    desc: "From local stages to international campaigns, we scale your presence boundlessly.",
    image: "https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=1000&auto=format&fit=crop",
    colSpan: 2,
    rowSpan: 1
  }
];

export function Highlights() {
  return (
    <section className={styles.section} id="highlights-section">
      <div className={styles.ambientGlow} />
      
      <div className={`container ${styles.container}`}>
        <div className={styles.headerRow}>
          <ScrollReveal direction="up" className={styles.headerText}>
            <span className={styles.eyebrow}>Why Choose Us</span>
            <h2 className={styles.sectionTitle}>
              The <span className={styles.goldText}>Advantage</span>
            </h2>
            <p className={styles.subtitle}>
              We are not just a management agency. We are an ecosystem built for creators who demand zero compromises. 
            </p>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={200} className={styles.statsBox}>
            <div className={styles.statGroup}>
              <span className={styles.statNumber}>150+</span>
              <span className={styles.statLabel}>Global Campaigns</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statGroup}>
              <span className={styles.statNumber}>$50M</span>
              <span className={styles.statLabel}>Brand Value Generated</span>
            </div>
          </ScrollReveal>
        </div>

        <div className={styles.bentoGrid}>
          {bentoItems.map((item, index) => (
            <ScrollReveal 
              key={item.id}
              delay={200 + index * 100}
              className={`${styles.bentoCard} ${item.colSpan === 2 ? styles.colSpan2 : ""} ${item.rowSpan === 2 ? styles.rowSpan2 : ""}`}
            >
              {item.image && (
                <div className={styles.cardImageWrapper}>
                  <img src={item.image} alt={item.title} className={styles.cardImage} />
                  <div className={styles.cardImageOverlay} />
                </div>
              )}
              
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  {item.icon ? (
                    <span className={styles.cardIcon}>{item.icon}</span>
                  ) : (
                    <span className={styles.cardNumber}>{item.id}</span>
                  )}
                </div>
                <div className={styles.cardTextGroup}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={styles.hoverGlow} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
