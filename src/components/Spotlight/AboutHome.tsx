"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./AboutHome.module.css";

const stats = [
  { value: "10+", label: "Years of Excellence" },
  { value: "200+", label: "Artists Managed" },
  { value: "50+", label: "Brand Partnerships" },
];

export function AboutHome() {
  return (
    <section className={styles.section} id="about-home">

      {/* Background images — ghosted */}
      <div className={styles.bgImages}>
        <div className={`${styles.frame} ${styles.frame1}`}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
            alt=""
            className={styles.bgImage}
          />
        </div>
        <div className={`${styles.frame} ${styles.frame2}`}>
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop"
            alt=""
            className={styles.bgImage}
          />
        </div>
      </div>

      <div className={styles.inner}>
        {/* Left column: editorial typography */}
        <div className={styles.leftCol}>
          <ScrollReveal direction="up">
            <span className={styles.eyebrow}>Who we are</span>
            <h2 className={styles.mainTitle}>
              We Are <span className={styles.outlineText}>22nd</span>
              <span className={styles.goldText}> Avenue</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200} direction="up">
            <p className={styles.description}>
              Every artist has an inner character waiting to be expressed. We build careers by finding
              the external resources that authentically reflect who they are — partnering talent with
              brands, stages, and stories that elevate their voice.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={350} direction="up">
            <div className={styles.statsRow}>
              {stats.map((stat, i) => (
                <div key={i} className={styles.statItem}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={450} direction="up">
            <a href="#services-section" className={styles.ctaLink}>
              Explore what we do
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.75 9h10.5M10.5 5.25L14.25 9 10.5 12.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </ScrollReveal>
        </div>

        {/* Right column: stacked images */}
        <div className={styles.rightCol}>
          <ScrollReveal direction="right" delay={150}>
            <div className={styles.imageStack}>
              <div className={styles.imageMain}>
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop"
                  alt="Talent"
                  className={styles.image}
                />
              </div>
              <div className={styles.imageSecondary}>
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop"
                  alt="Talent"
                  className={styles.image}
                />
              </div>
              <div className={styles.imageFloat}>
                <div className={styles.floatBadge}>
                  <span className={styles.floatBadgeText}>Est. 2015</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
