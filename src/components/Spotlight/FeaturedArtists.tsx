/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useCallback } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./FeaturedArtists.module.css";

const baseArtists = [
  { name: "Artful Dodger", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop" },
  { name: "Bryson Tiller", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop" },
  { name: "Chris Brown", image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=600&auto=format&fit=crop" },
  { name: "DJ Snoopadelic", image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=600&auto=format&fit=crop" },
  { name: "Fetty Wap", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
  { name: "J & The Rest", image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=600&auto=format&fit=crop" },
  { name: "MIGOS", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop" },
  { name: "Paris Hilton", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop" },
  { name: "Amber Davies", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" },
  { name: "Future", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop" }
];

// Duplicate 3 times to create 30 artists total
const allArtists = [...baseArtists, ...baseArtists, ...baseArtists].map((artist, idx) => ({
  ...artist,
  uniqueKey: `${artist.name}-${idx}`
}));

const ITEMS_PER_SLIDE = 10;
const totalSlides = Math.ceil(allArtists.length / ITEMS_PER_SLIDE);

export function FeaturedArtists() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToTop = useCallback(() => {
    if (window.innerWidth <= 1024 && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    scrollToTop();
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    scrollToTop();
  };

  const slideChunks = Array.from({ length: totalSlides }, (_, i) => 
    allArtists.slice(i * ITEMS_PER_SLIDE, (i + 1) * ITEMS_PER_SLIDE)
  );

  return (
    <section ref={sectionRef} className={styles.section} id="featured-artists">
      <div className={styles.wrapper}>
        
        <div className={styles.headerRow}>
          <ScrollReveal direction="up">
            <h2 className={styles.sectionTitle}>
              OUR <span className={styles.goldText}>COLLABS</span>
            </h2>
          </ScrollReveal>

        </div>

        <ScrollReveal delay={200} direction="up" className={styles.carouselReveal}>
          <div className={styles.carouselContainer}>
            <div className={styles.carouselViewport}>
              <div 
                className={styles.carouselTrack}
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slideChunks.map((chunk, slideIdx) => (
                  <div key={slideIdx} className={styles.carouselSlide}>
                    <div className={styles.grid}>
                      {chunk.map((artist) => (
                        <div key={artist.uniqueKey} className={styles.artistCard}>
                          <div className={styles.imageWrapper}>
                            <img
                              src={artist.image}
                              alt={artist.name}
                              className={styles.artistImage}
                              loading="lazy"
                            />
                          </div>
                          <div className={styles.nameStrip}>
                            <span className={styles.artistName}>{artist.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Controls: Overlaying the sides, vertically centered */}
            <div className={styles.controlsDesktop}>
              <button onClick={prevSlide} className={styles.arrowBtn} aria-label="Previous Slide">
                <ArrowLeft size={24} />
              </button>
              <button onClick={nextSlide} className={styles.arrowBtn} aria-label="Next Slide">
                <ArrowRight size={24} />
              </button>
            </div>
          </div>

          {/* Desktop Indicators */}
          <div className={styles.indicatorsDesktop}>
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <span 
                key={idx} 
                className={`${styles.indicator} ${currentSlide === idx ? styles.activeIndicator : ""}`}
              />
            ))}
          </div>
        </ScrollReveal>

        {/* Mobile controls */}
        <div className={styles.controlsMobile}>
          <button onClick={prevSlide} className={styles.arrowBtn} aria-label="Previous Slide">
            <ArrowLeft size={20} />
          </button>
          <div className={styles.indicators}>
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <span 
                key={idx} 
                className={`${styles.indicator} ${currentSlide === idx ? styles.activeIndicator : ""}`}
              />
            ))}
          </div>
          <button onClick={nextSlide} className={styles.arrowBtn} aria-label="Next Slide">
            <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
}
