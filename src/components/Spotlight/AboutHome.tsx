/* eslint-disable @next/next/no-img-element */
"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./AboutHome.module.css";

export function AboutHome() {
  return (
    <section className={styles.section} id="about-home">
      <div className={styles.collageContainer}>
        
        {/* Layered Images */}
        <div className={`${styles.frame} ${styles.frame1}`}>
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" 
            alt="Talent 1" 
            className={styles.image}
          />
        </div>

        <div className={`${styles.frame} ${styles.frame2}`}>
          <img 
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop" 
            alt="Talent 2" 
            className={styles.image}
          />
        </div>

        <div className={`${styles.frame} ${styles.frame3}`}>
          <img 
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop" 
            alt="Talent 3" 
            className={styles.image}
          />
        </div>

        {/* Cinematic Typography Layer */}
        <div className={styles.textColumn}>
          <ScrollReveal direction="up">
            <h2 className={styles.mainTitle}>
              WE ARE <span className={styles.outlineText}>22ND</span>
              <span className={styles.goldText}>AVENUE</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={300} direction="up">
            <div className={styles.descriptionBox}>
              <p className={styles.description}>
                Every artist has an inner character waiting to be expressed. We build careers by finding the external resources that authentically reflect who they are.
              </p>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
