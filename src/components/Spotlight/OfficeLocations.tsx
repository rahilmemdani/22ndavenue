"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MapPin } from "lucide-react";
import styles from "./OfficeLocations.module.css";

export function OfficeLocations() {
  return (
    <section className={styles.section} id="global-offices">
      <div className={styles.container}>
        <ScrollReveal direction="up">
          <div className={styles.boxedContainer}>
            {/* Ambient Background Glows */}
            <div className={styles.ambientGlow}></div>
            <div className={styles.ambientGlowSecond}></div>

            {/* Header */}
            <div className={styles.header}>
              <span className={styles.presenceLabel}>GLOBAL PRESENCE</span>
              <h2 className={styles.presenceHeading}>
                Our <span className={styles.goldText}>Hubs</span>
              </h2>
            </div>

            {/* Grid of Locations */}
            <div className={styles.presenceGrid}>
              {/* India Column */}
              <div className={styles.hubColumn}>
                <div className={styles.hubHeader}>
                  <span className={styles.hubRegion}>INDIA</span>
                  <span className={styles.hubStatusBadge}>Global HQ</span>
                </div>
                <div className={styles.hubCard}>
                  <div className={styles.hubCityRow}>
                    <span className={styles.radarPulseGold}></span>
                    <span className={styles.hubCity}>Mumbai</span>
                  </div>
                  <p className={styles.hubAddress}>
                    22nd Avenue Talent Management Pvt. Ltd,<br />
                    16th Floor, Aston Building, Sundervan Complex,<br />
                    Lokhandwala Complex, Andheri West,<br />
                    Mumbai, Maharashtra 400053
                  </p>
                </div>
              </div>

              {/* Australia Column */}
              <div className={styles.hubColumn}>
                <div className={styles.hubHeader}>
                  <span className={styles.hubRegion}>AUSTRALIA</span>
                </div>
                <div className={styles.hubCardList}>
                  <div className={`${styles.hubCard} ${styles.hubCardSub}`}>
                    <div className={styles.hubCityRow}>
                      <span className={styles.radarPulseGold}></span>
                      <span className={styles.hubCity}>Sydney</span>
                      <span className={styles.hubTag}>APAC HQ</span>
                    </div>
                    <p className={styles.hubAddress}>
                      14th Floor, 3 Parramatta Square,<br />
                      Parramatta NSW 2150, Australia
                    </p>
                  </div>

                  <div className={`${styles.hubCard} ${styles.hubCardSub}`}>
                    <div className={styles.hubCityRow}>
                      <span className={styles.radarPulse}></span>
                      <span className={styles.hubCity}>Melbourne</span>
                    </div>
                    <p className={styles.hubAddress}>
                      5, 3-70 Main Street, Pakenham, VIC 3810, Australia
                    </p>
                  </div>

                  <div className={`${styles.hubCard} ${styles.hubCardSub}`}>
                    <div className={styles.hubCityRow}>
                      <span className={styles.radarPulse}></span>
                      <span className={styles.hubCity}>Gold Coast</span>
                    </div>
                    <p className={styles.hubAddress}>
                      16, Gunyah Grove, Ashmore, QLD 4214, Australia
                    </p>
                  </div>
                </div>
              </div>

              {/* New Zealand Column */}
              <div className={styles.hubColumn}>
                <div className={styles.hubHeader}>
                  <span className={styles.hubRegion}>NEW ZEALAND</span>
                </div>
                <div className={styles.hubCard}>
                  <div className={styles.hubCityRow}>
                    <span className={styles.radarPulse}></span>
                    <span className={styles.hubCity}>Auckland</span>
                  </div>
                  <p className={styles.hubAddress}>
                    6 Mappin Place, Chatswood,<br />
                    Auckland, NZ 0626
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
