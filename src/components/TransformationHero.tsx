"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import styles from "./TransformationHero.module.css";

const frames = [
  "/assets/hero/model-frame1.jpg",
  "/assets/hero/model-frame2.jpg",
  "/assets/hero/model-frame3.jpg",
  "/assets/hero/model-frame4.jpg"
];

const frameLabels = ["", "", "", ""];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const TransformationHero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [currentFrame, setCurrentFrame] = useState(0);
  const prevFrameRef = useRef(0);
  const smoothProgress = useRef(0);
  const targetProgress = useRef(0);
  const rafRef = useRef<number>(0);

  const triggerFlash = useCallback(() => {
    const el = flashRef.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.opacity = "1";
    el.offsetHeight;
    el.style.transition = "opacity 0.25s ease-out";
    el.style.opacity = "0";
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tick = () => {
      smoothProgress.current = lerp(
        smoothProgress.current,
        targetProgress.current,
        0.08
      );

      const p = smoothProgress.current;

      // 1. Zoom Logic specifically for the image box
      if (imageRevealRef.current) {
        const scale = 1 + p * 0.15; // Controlled zoom
        imageRevealRef.current.style.transform = `scale(${scale})`;
      }

      // 2. Headline Fade Logic
      if (headlineRef.current) {
        const headlineP = Math.max(0, Math.min(1, (p - 0.1) / 0.25));
        headlineRef.current.style.opacity = String(1 - headlineP);
        headlineRef.current.style.filter = `blur(${headlineP * 20}px)`;
      }

      // 3. Frame Swapping (1-by-1)
      const frameIndex = Math.max(0, Math.min(3, Math.floor(p * 4)));
      if (frameIndex !== prevFrameRef.current) {
        prevFrameRef.current = frameIndex;
        setCurrentFrame(frameIndex);
        triggerFlash();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      targetProgress.current = Math.max(0, Math.min(1, scrolled / sectionHeight));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [triggerFlash]);

  return (
    <section id="hero-section" ref={sectionRef} className={styles.hero}>
      <div className={styles.stickyWrapper} style={{ height: "100dvh" }}>

        <div className={styles.contentRow}>

          {/* Left Column: Typography */}
          <div className={styles.textColumn}>
            <span className={styles.brandLabel}>22nd Avenue</span>
            <h1 className={styles.headline}>
              Creative
              <span className={styles.italicGold}>Talent</span>
            </h1>
            <p className={styles.description}>
              Where raw beauty meets editorial vision. Talent management reimagined for the modern era.
            </p>
          </div>

          {/* Right Column: Contained Image Stage */}
          <div className={styles.imageColumn}>
            <div className={styles.imageFrame}>
              <div
                ref={imageRevealRef}
                className={styles.imageReveal}
                style={{ width: "100%", height: "100%" }}
              >
                {frames.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={frameLabels[i]}
                    className={styles.modelImage}
                    style={{
                      opacity: i === currentFrame ? 1 : 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      inset: 0
                    }}
                  />
                ))}
              </div>

              {/* Interface on the image */}
              <div className={styles.interfaceOverlay}>
                <p className={styles.phaseTitle}>{frameLabels[currentFrame]}</p>
                <div className={styles.progressBar}>
                  {frames.map((_, i) => (
                    <div
                      key={i}
                      className={`${styles.step} ${i <= currentFrame ? styles.stepActive : ""}`}
                    />
                  ))}
                </div>
              </div>

              {/* Strobe Effect */}
              <div ref={flashRef} className={styles.flash} />
            </div>
          </div>

        </div>

        {/* Center Bottom: Scroll Indicator */}
        <div ref={scrollIndicatorRef} className={styles.scrollGuide}>
          <span className={styles.scrollText}>Scroll to transform</span>
          <div className={styles.scrollLine} />
        </div>

      </div>
    </section>
  );
};

export default TransformationHero;
