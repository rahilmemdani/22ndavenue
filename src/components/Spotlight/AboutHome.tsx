/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./AboutHome.module.css";

const FOUNDERS = [
  {
    name: "Aditya Mehra",
    title: "Director",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Daryl Sheldon",
    title: "Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Manoj Gopalani",
    title: "Director",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"
  }
];

export function AboutHome() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % FOUNDERS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + FOUNDERS.length) % FOUNDERS.length);
  };

  return (
    <section className={styles.section} id="about-home">
      <div className={styles.container}>
        
        {/* Left Column: Text & Header */}
        <div className={styles.leftCol}>
          <ScrollReveal direction="up">
            <h2 className={styles.title}>
              <span className={styles.goldText}>Backstage</span>
              <br />
              Behind the Spotlight
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200} direction="up" className={styles.textContentWrapper}>
            <div className={styles.textContent}>
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
          </ScrollReveal>
        </div>

        {/* Right Column: Founder Carousel */}
        <div className={styles.rightCol}>
          <ScrollReveal delay={400} direction="up" className={styles.carouselReveal}>
            <div className={styles.carouselContainer}>
              
              <div className={styles.carouselViewport}>
                <div 
                  className={styles.carouselTrack}
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {FOUNDERS.map((founder, idx) => (
                    <div key={idx} className={styles.founderSlide}>
                      <img 
                        src={founder.image} 
                        alt={founder.name} 
                        className={styles.founderImg}
                      />
                      <div className={styles.founderOverlay}>
                        <h4 className={styles.founderName}>{founder.name}</h4>
                        <p className={styles.founderTitle}>{founder.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className={styles.controls}>
                <button onClick={prevSlide} className={styles.arrowBtn} aria-label="Previous Founder">
                  <ArrowLeft size={24} />
                </button>
                <div className={styles.indicators}>
                  {FOUNDERS.map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`${styles.indicator} ${currentSlide === idx ? styles.activeIndicator : ""}`}
                    />
                  ))}
                </div>
                <button onClick={nextSlide} className={styles.arrowBtn} aria-label="Next Founder">
                  <ArrowRight size={24} />
                </button>
              </div>

            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
