"use client";

import { useState, useEffect, useCallback } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Values.module.css";

const valuesData = [
  {
    title: "Authenticity Over Imitation",
    text: "We reveal your true style through deep creative exploration and strategic brand alignment."
  },
  {
    title: "Confidence & Elevation",
    text: "We refine every detail of your public presence to ensure you project maximum authority and impact."
  },
  {
    title: "Ethical & Transparent",
    text: "Long-term legacy management built on unwavering trust, honesty, and clear communication."
  }
];

export function Values() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % valuesData.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + valuesData.length) % valuesData.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className={styles.section} id="values-section">
      <div className={styles.container}>
        
        {/* Left Side: Header */}
        <div className={styles.leftCol}>
          <ScrollReveal direction="up">
            <h2 className={styles.title}>
              CORE <span className={styles.goldText}>VALUES</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Right Side: Carousel with Arrows */}
        <div className={styles.rightCol}>
          <button className={`${styles.arrowButton} ${styles.prevButton}`} onClick={prevSlide} aria-label="Previous value">
            <ChevronLeft size={32} />
          </button>
          
          <div className={styles.carouselViewport}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={styles.card}
              >
                <div className={styles.glare} />
                <div className={styles.cardNumber}>CORE PRINCIPLE 0{currentIndex + 1} — VII</div>
                <h3 className={styles.cardTitle}>{valuesData[currentIndex].title}</h3>
                <p className={styles.cardText}>{valuesData[currentIndex].text}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className={`${styles.arrowButton} ${styles.nextButton}`} onClick={nextSlide} aria-label="Next value">
            <ChevronRight size={32} />
          </button>
        </div>

      </div>
    </section>
  );
}
