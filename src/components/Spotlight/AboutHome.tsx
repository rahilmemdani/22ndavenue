/* eslint-disable @next/next/no-img-element */
"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./AboutHome.module.css";

export function AboutHome() {
  return (
    <section className={styles.section} id="about-home">
      <div className={styles.container}>
        
        {/* Section Headers */}
        <ScrollReveal direction="up" className={styles.headerReveal}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.eyebrow}>Backstage</h3>
            <h2 className={styles.title}>Behind the Spotlight</h2>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          
          {/* Main Text Content Box */}
          <ScrollReveal delay={100} direction="up" className={styles.bentoItemTextWrapper}>
            <div className={`${styles.bentoCard} ${styles.textCard}`}>
              <div className={styles.textCardInner}>
                <p className={styles.bodyCopy}>
                  22nd Avenue was born from a vision to craft world-class experiences in entertainment, founded by Aditya Mehra, Daryl Sheldon and Manoj Gopalani.
                </p>
                <p className={styles.bodyCopy}>
                  Under Manoj’s leadership, what started as an idea soon evolved into a trusted name in an ever-evolving industry, one that understands both the art and the precision behind great entertainment.
                </p>
                <p className={styles.bodyCopy}>
                  Our mission is simple: to redefine industry norms and stay ahead of the curve. Over the years we’ve built lasting relationships with renowned talent across the global stage.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Founder 1: Aditya Mehra */}
          <ScrollReveal delay={200} direction="up" className={styles.bentoItemAditya}>
            <div className={`${styles.bentoCard} ${styles.founderCard}`}>
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop" 
                alt="Aditya Mehra" 
                className={styles.founderImg}
              />
              <div className={styles.founderOverlay}>
                <h4 className={styles.founderName}>Aditya Mehra</h4>
                <p className={styles.founderTitle}>Director</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Founder 2: Daryl Sheldon */}
          <ScrollReveal delay={300} direction="up" className={styles.bentoItemDaryl}>
            <div className={`${styles.bentoCard} ${styles.founderCard}`}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" 
                alt="Daryl Sheldon" 
                className={styles.founderImg}
              />
              <div className={styles.founderOverlay}>
                <h4 className={styles.founderName}>Daryl Sheldon</h4>
                <p className={styles.founderTitle}>Director</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Founder 3: Manoj Gopalani */}
          <ScrollReveal delay={400} direction="up" className={styles.bentoItemManoj}>
            <div className={`${styles.bentoCard} ${styles.founderCard}`}>
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" 
                alt="Manoj Gopalani" 
                className={styles.founderImg}
              />
              <div className={styles.founderOverlay}>
                <h4 className={styles.founderName}>Manoj Gopalani</h4>
                <p className={styles.founderTitle}>Director</p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
