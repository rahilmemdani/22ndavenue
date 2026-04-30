/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./MicDropMoments.module.css";

const showcaseCategories = [
  {
    name: "Corporate Events",
    tiles: [
      {
        id: "01",
        title: "Grand",
        subtitle: "LAUNCHES",
        verticalText: "GRAND LAUNCHES",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "02",
        title: "Summit",
        subtitle: "EXPERIENCES",
        verticalText: "SUMMIT EXPERIENCES",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2000&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "03",
        title: "Gala",
        subtitle: "NIGHTS",
        verticalText: "GALA NIGHTS",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "04",
        title: "Award",
        subtitle: "CEREMONIES",
        verticalText: "AWARD CEREMONIES",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      }
    ]
  },
  {
    name: "Live Concerts",
    tiles: [
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
    ]
  },
  {
    name: "Private Shows",
    tiles: [
      {
        id: "01",
        title: "Exclusive",
        subtitle: "GATHERINGS",
        verticalText: "EXCLUSIVE GATHERINGS",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2000&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "02",
        title: "VIP",
        subtitle: "EXPERIENCES",
        verticalText: "VIP EXPERIENCES",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2000&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "03",
        title: "Intimate",
        subtitle: "SESSIONS",
        verticalText: "INTIMATE SESSIONS",
        image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2000&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "04",
        title: "After",
        subtitle: "PARTIES",
        verticalText: "AFTER PARTIES",
        image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2000&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      }
    ]
  }
];

export function MicDropMoments() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isSliding, setIsSliding] = useState(false);

  const currentCategory = showcaseCategories[activeCategoryIndex];

  const nextCategory = () => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      setActiveCategoryIndex((prev) => (prev + 1) % showcaseCategories.length);
      setActiveIndex(0);
      setHoveredIndex(null);
      setIsSliding(false);
    }, 500);
  };

  const prevCategory = () => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      setActiveCategoryIndex((prev) => (prev - 1 + showcaseCategories.length) % showcaseCategories.length);
      setActiveIndex(0);
      setHoveredIndex(null);
      setIsSliding(false);
    }, 500);
  };

  return (
    <section className={styles.section} id="showcase-section">
      <div className={styles.container}>

        {/* Header Row: Title + Category Nav */}
        <div className={styles.headerRow}>
          <ScrollReveal direction="up" className={styles.headerLeft}>
            <h2 className={styles.title}>
              MIC DROP <span className={styles.goldText}>MOMENTS</span>
            </h2>
          </ScrollReveal>

          <div className={styles.categoryNav}>
            <button onClick={prevCategory} className={styles.catArrowBtn} aria-label="Previous Category">
              <ArrowLeft size={16} />
            </button>
            
            <div className={styles.categoryLabel}>
              <span className={styles.categoryName}>{currentCategory.name}</span>
              <span className={styles.categoryCounter}>
                {String(activeCategoryIndex + 1).padStart(2, "0")} / {String(showcaseCategories.length).padStart(2, "0")}
              </span>
            </div>

            <button onClick={nextCategory} className={styles.catArrowBtn} aria-label="Next Category">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Accordion — slides on category change */}
        <div className={styles.accordionWrapper}>
          <div className={`${styles.accordionContainer} ${isSliding ? styles.sliding : ""}`}>
            {currentCategory.tiles.map((tile, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={`${activeCategoryIndex}-${tile.id}`}
                  className={`${styles.card} ${isActive ? styles.activeCard : styles.inactiveCard}`}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => {
                    setActiveIndex(index);
                    setHoveredIndex(index);
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Background Image & Video */}
                  <div className={styles.bgImageContainer}>
                    <img
                      src={tile.image}
                      alt={tile.title}
                      className={styles.bgImage}
                    />
                    {hoveredIndex === index && tile.video && (
                      <video
                        src={tile.video}
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
                      <span className={styles.number}>{tile.id}</span>
                    </div>

                    {isActive ? (
                      <div className={styles.activeBottomArea}>
                        <h3 className={styles.cardTitle}>{tile.title}</h3>
                        <p className={styles.cardSubtitle}>{tile.subtitle}</p>
                      </div>
                    ) : (
                      <div className={styles.inactiveBottomArea}>
                        <span className={styles.verticalText}>{tile.verticalText}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
