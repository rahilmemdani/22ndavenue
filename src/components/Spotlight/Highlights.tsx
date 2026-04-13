"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./Highlights.module.css";

export function Highlights() {
  return (
    <section className={styles.section} id="highlights-section">
      <div className={`container ${styles.container}`}>
        <ScrollReveal>
          <h2 className={styles.sectionTitle}>OUR ADVANTAGES</h2>
        </ScrollReveal>

        <div className={styles.bentoGrid}>
          {/* Left Large Image */}
          <ScrollReveal delay={100} className={styles.imageLeft}>
            <div className={styles.card}>
              <img 
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop" 
                alt="Advantage Image Left"
                className={styles.image}
              />
            </div>
          </ScrollReveal>

          {/* Right Top Block */}
          <ScrollReveal delay={200} className={styles.boxIndependent}>
            <div className={`${styles.card} ${styles.textCard}`}>
              <div className={styles.textContent}>
                <h3 className={styles.cardTitle}>INDEPENDENT DESIGNERS</h3>
                <p className={styles.cardDesc}>
                  Our platform celebrates the ingenuity of independent designers, offering a diverse array of fashion-forward garments that reflect clarity and innovation of the artists behind them. Explore curated collections showcasing unique creations.
                </p>
              </div>
              <button className={styles.exploreBtn}>
                <span className={styles.arrowIcon}>↗</span> EXPLORE
              </button>
            </div>
          </ScrollReveal>

          {/* Right Middle Block */}
          <ScrollReveal delay={300} className={styles.boxExclusive}>
            <div className={`${styles.card} ${styles.textCard}`}>
              <div className={styles.textContent}>
                <h3 className={styles.cardTitle}>EXCLUSIVE & UNIQUITY</h3>
                <p className={styles.cardDesc}>
                  Indulge in curated collections showcasing exclusive, one-of-a-kind pieces, each with its own story and charm. Experience the allure of unique fashion pieces that radiate sophistication and individuality.
                </p>
              </div>
              <button className={styles.exploreBtn}>
                <span className={styles.arrowIcon}>↗</span> EXPLORE
              </button>
            </div>
          </ScrollReveal>

          {/* Left Bottom Block 1 */}
          <ScrollReveal delay={400} className={styles.boxHQ}>
            <div className={`${styles.card} ${styles.textCard}`}>
              <div className={styles.textContent}>
                <h3 className={styles.cardTitle}>HIGH QUALITY</h3>
                <p className={styles.cardDesc}>
                  Embrace superior craftsmanship with our meticulously curated, enduring high-quality garments. Discover garments crafted with utmost attention to detail and finest materials.
                </p>
              </div>
              <button className={styles.exploreBtn}>
                <span className={styles.arrowIcon}>↗</span> EXPLORE
              </button>
            </div>
          </ScrollReveal>

          {/* Left Bottom Block 2 */}
          <ScrollReveal delay={500} className={styles.boxEco}>
            <div className={`${styles.card} ${styles.textCard}`}>
              <div className={styles.textContent}>
                <h3 className={styles.cardTitle}>ECO-FRIENDLY</h3>
                <p className={styles.cardDesc}>
                  Join our commitment to sustainability with eco-friendly fashion options. Style isn't mindful of our planet. Explore guilt-free shopping with our eco-conscious collections.
                </p>
              </div>
              <button className={styles.exploreBtn}>
                <span className={styles.arrowIcon}>↗</span> EXPLORE
              </button>
            </div>
          </ScrollReveal>

          {/* Right Bottom Image */}
          <ScrollReveal delay={600} className={styles.imageRight}>
            <div className={styles.card}>
              <img 
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop" 
                alt="Advantage Image Right"
                className={styles.image}
                style={{ objectPosition: 'center 30%' }}
              />
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
