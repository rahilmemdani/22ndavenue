"use client";

import { useState, useEffect } from "react";
import styles from "./TransformationHero.module.css";

const frames = [
  "/assets/hero/model-frame1.jpg",
  "/assets/hero/model-frame2.jpg",
  "/assets/hero/model-frame3.jpg",
  "/assets/hero/model-frame4.jpg"
];

const TransformationHero = () => {
  const [isSplit, setIsSplit] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    // Wait for the full fall-in sequence to complete before splitting the screen
    // WE(0.2) + ARE(0.6) + 22ND(1.1) + AVENUE(1.6) + DOT(2.1) + anim(0.8) = ~3s
    const splitTimer = setTimeout(() => {
      setIsSplit(true);
    }, 3800);

    return () => clearTimeout(splitTimer);
  }, []);

  useEffect(() => {
    // While intro is playing, lock scroll and hide navbar
    if (!isSplit) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("hero-animating");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("hero-animating");
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.classList.remove("hero-animating");
    };
  }, [isSplit]);

  useEffect(() => {
    // Start slider once split has begun
    if (!isSplit) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isSplit]);

  return (
    <section className={`${styles.heroContainer} ${isSplit ? styles.split : ""}`}>
      
      {/* Left Panel: Cream background, holds the typography */}
      <div className={styles.leftPanel}>
        <div className={styles.ambientOrb2}></div>
        <h2 className={styles.splashText}>
          <div>
            <span className={`${styles.splashWord} ${styles.wordWe}`}>WE</span>{" "}
            <span className={`${styles.splashWord} ${styles.wordAre}`}>ARE</span>
          </div>
          <span className={`${styles.splashWord} ${styles.splashOutline}`}>22ND</span>
          <div>
            <span className={`${styles.splashWord} ${styles.splashGold}`}>AVENUE</span>
            <span className={styles.splashDot}>.</span>
          </div>
        </h2>
      </div>

      {/* Right Panel: Showcase Reel */}
      <div className={styles.rightPanel}>
        <div className={styles.backgroundSlider}>
          {frames.map((src, index) => (
            <div 
              key={src} 
              className={`${styles.slide} ${index === currentFrame ? styles.active : ""}`}
            >
              <img src={src} alt={`Showcase Reel ${index + 1}`} className={styles.slideImage} />
            </div>
          ))}
        </div>
        <div className={styles.overlay} />
        <span className={styles.reelLabel}>Showcase Reel</span>
      </div>

    </section>
  );
};

export default TransformationHero;
