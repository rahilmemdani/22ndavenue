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
  const [showSplash, setShowSplash] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    // Hide splash screen after a longer delay to let the sequence finish
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3800);

    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    // Start slider once splash is gone
    if (showSplash) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [showSplash]);

  return (
    <section className={styles.heroContainer}>
      {/* Splash Screen */}
      <div className={`${styles.splashScreen} ${!showSplash ? styles.hide : ""}`}>
        <h2 className={styles.splashText}>
          <span className={`${styles.splashWord} ${styles.wordWe}`}>WE</span>{" "}
          <span className={`${styles.splashWord} ${styles.wordAre}`}>ARE</span>
          <span className={`${styles.splashWord} ${styles.splashOutline}`}>22ND</span>
          <span className={`${styles.splashWord} ${styles.splashGold}`}>AVENUE.</span>
        </h2>
      </div>

      {/* Background Slider */}
      <div className={styles.backgroundSlider}>
        {frames.map((src, index) => (
          <div 
            key={src} 
            className={`${styles.slide} ${index === currentFrame ? styles.active : ""}`}
          >
            <img src={src} alt={`Hero background ${index + 1}`} className={styles.slideImage} />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className={styles.overlay} />

      {/* Content */}
      <div className={styles.content}>
        <span className={styles.brandLabel}>22nd Avenue</span>
        <h1 className={styles.headline}>
          CREATIVE <span className={styles.italicGold}>TALENT</span>
        </h1>
        <p className={styles.description}>
          Where raw beauty meets editorial vision. Talent management reimagined for the modern era.
        </p>
      </div>
    </section>
  );
};

export default TransformationHero;
