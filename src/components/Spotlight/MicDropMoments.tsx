"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./MicDropMoments.module.css";
import Image from "next/image";

const momentsData = [
  {
    id: "01",
    title: "Global",
    subtitle: "DOMINATION",
    verticalText: "GLOBAL DOMINATION",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2000&auto=format&fit=crop",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "02",
    title: "Iconic",
    subtitle: "PERFORMANCES",
    verticalText: "ICONIC PERFORMANCES",
    image: "https://images.unsplash.com/photo-1470229722913-7c090be5c560?q=80&w=2000&auto=format&fit=crop",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "03",
    title: "Unmatched",
    subtitle: "ENERGY",
    verticalText: "UNMATCHED ENERGY",
    image: "https://images.unsplash.com/photo-1540039155732-68ee23e15b51?q=80&w=2000&auto=format&fit=crop",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "04",
    title: "Sold Out",
    subtitle: "ARENAS",
    verticalText: "SOLD OUT ARENAS",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
];

export function MicDropMoments() {
  const [activeIndex, setActiveIndex] = useState(2); // Default to 3rd item like image

  return (
    <section className={styles.section} id="showcase-section">
      <div className={styles.container}>

        <ScrollReveal direction="up" className={styles.header}>
          <h2 className={styles.title}>
            MIC DROP <span className={styles.goldText}>MOMENTS</span>
          </h2>
        </ScrollReveal>

        <div className={styles.accordionContainer}>
          {momentsData.map((moment, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={moment.id}
                className={`${styles.card} ${isActive ? styles.activeCard : styles.inactiveCard}`}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {/* Background Image & Video */}
                <div className={styles.bgImageContainer}>
                  <img 
                    src={moment.image} 
                    alt={moment.title} 
                    className={styles.bgImage} 
                  />
                  {isActive && moment.video && (
                    <video
                      src={moment.video}
                      className={styles.bgVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  )}
                  <div className={styles.overlay}></div>
                </div>

                {/* Content */}
                <div className={styles.cardContent}>
                  <div className={styles.topArea}>
                    {/* <span className={styles.number}>{moment.id}</span> */}
                  </div>

                  {isActive ? (
                    <div className={styles.activeBottomArea}>
                      <h3 className={styles.cardTitle}>{moment.title}</h3>
                      <p className={styles.cardSubtitle}>{moment.subtitle}</p>
                    </div>
                  ) : (
                    <div className={styles.inactiveBottomArea}>
                      <span className={styles.verticalText}>{moment.verticalText}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
