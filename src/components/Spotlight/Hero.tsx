"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./Hero.module.css";

// High-Continuity Editorial Sequence (Standardized Portrait Position)
// This set uses the same model on a dark/neutral backdrop for the "Reel" transformation feel
const TRANSFORMATION_SEQUENCE = [
  "https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?q=80&w=1600&auto=format&fit=crop", // Natural
  "https://images.unsplash.com/photo-1581404917829-5a5d997ba586?q=80&w=1600&auto=format&fit=crop", // Hair Shift
  "https://images.unsplash.com/photo-1581404921509-f6412e88a385?q=80&w=1600&auto=format&fit=crop", // Detail/Makeup
  "https://images.unsplash.com/photo-1581404505085-f852277bed91?q=80&w=1600&auto=format&fit=crop"  // Final Reveal
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  // Smoothing the scroll progress to ensure liquid scrubbing experience
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // 1. Frame Index Tracking (IG Reel Cut Logic)
  const [currentIndex, setCurrentIndex] = useState(0);
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, TRANSFORMATION_SEQUENCE.length - 1]);

  // Handle frame changes
  useEffect(() => {
    return frameIndex.on("change", (latest) => {
      const index = Math.round(latest);
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    });
  }, [currentIndex, frameIndex]);

  // 2. Cinematic Camera Move (Slow Zoom-in)
  // No tilt or rotation - focusing purely on continuity
  const cameraZoom = useTransform(smoothProgress, [0, 1], [1, 1.25]);

  // 3. Digital "Flash" Transition & Lens Blur Pulse
  const flashOpacity = useMotionValue(0);
  const blurValue = useMotionValue(0);

  useEffect(() => {
    // Pulse the flash and blur whenever the frame swaps
    flashOpacity.set(0.6);
    blurValue.set(8);

    const timer = setTimeout(() => {
      flashOpacity.set(0);
      blurValue.set(0);
    }, 150);

    return () => clearTimeout(timer);
  }, [currentIndex, flashOpacity, blurValue]);

  // Text disappearance logic
  const textOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.15], [0, -30]);

  return (
    <section ref={heroRef} className={styles.heroSequence} id="hero-section">
      <div className={styles.stickyCanvas}>
        <div className={`container ${styles.container}`}>
          <motion.div
            className={styles.textContent}
            style={{ opacity: textOpacity, y: textY }}
          >
            <ScrollReveal direction="none">
              <h1 className={styles.headline}>
                CREATIVE<br />
                TALENT
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200} direction="none">
              <p className={styles.subtitle}>
                22ND AVENUE MANAGEMENT
              </p>
            </ScrollReveal>
          </motion.div>
        </div>

        {/* The "Void" Transformation Stage */}
        <div className={styles.imageLayer}>
          <motion.div
            className={styles.imageReveal}
            style={{
              scale: cameraZoom,
              filter: `blur(${blurValue.get()}px)`,
              willChange: "transform, filter"
            }}
          >
            {/* The Perfectly Aligned Portrait Stack */}
            {TRANSFORMATION_SEQUENCE.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt={`Transformation phase ${i}`}
                className={styles.heroImage}
                style={{
                  opacity: i === currentIndex ? 1 : 0,
                  position: "absolute",
                  inset: 0,
                  zIndex: i === currentIndex ? 2 : 1
                }}
                transition={{ duration: 0.1 }}
              />
            ))}

            {/* The IG Reel Flash Transition */}
            <motion.div
              className={styles.flashOverlay}
              style={{ opacity: flashOpacity }}
            />

            <div className={styles.blendGradient} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
