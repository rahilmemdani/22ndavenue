"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./AboutHome.module.css";

export function AboutHome() {
  return (
    <section className={styles.section} id="about-home">
      {/* Cinematic Backdrop */}
      <div className={styles.bgCard}>
        <img 
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop" 
          alt="Atmosphere" 
          className={styles.backdropImage}
        />
        <div className={styles.accentLine} />
      </div>

      <div className={styles.container}>
        <div className={styles.textStack}>
          <ScrollReveal direction="up" distance={100}>
            <h2 className={styles.outlineTitle}>
              WE ARE
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={200} direction="up" distance={50}>
            <div className={styles.solidTitle}>
              22nd Avenue
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400} direction="up" distance={30}>
            <p className={styles.description}>
              Every artist has an inner character waiting to be expressed. We build careers by finding the external resources that authentically reflect who they are.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
