"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useEffect, useRef, useState } from "react";
import styles from "./Services.module.css";

const services = [
  {
    number: "01",
    title: "Talent Management",
    subtitle: "End-to-end career architecture",
    description: "From discovery to stardom — we map every career milestone, negotiate every deal, and guard every interest with uncompromising precision.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    tag: "Core Service"
  },
  {
    number: "02",
    title: "Brand Collaborations",
    subtitle: "Authentic partnerships, amplified reach",
    description: "We connect talented creators with brands that align with their authentic voice, crafting partnerships that feel organic and drive real engagement.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    tag: "Partnerships"
  },
  {
    number: "03",
    title: "Live Events",
    subtitle: "Moments that define careers",
    description: "From intimate showcases to stadium spectacles — we orchestrate experiences that leave lasting impressions and open new doors.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    tag: "Events"
  },
  {
    number: "04",
    title: "Digital Strategy",
    subtitle: "Your story in the digital age",
    description: "Precision content strategy, social growth, and digital brand architecture built for the modern creator landscape.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
    tag: "Digital"
  }
];

export function Services() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % services.length);
    }, 4000);
  };

  useEffect(() => {
    if (!isPaused) startInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  const goTo = (i: number) => {
    setActive(i);
    // Reset timer on manual navigation
    if (!isPaused) startInterval();
  };

  const current = services[active];

  return (
    <section className={styles.section} id="services-section">
      <div className={styles.ambientGlow} />

      <div className={styles.outer}>

        {/* ── LEFT COLUMN: Heading + description + dots ── */}
        <div className={styles.leftCol}>
          <ScrollReveal direction="up">
            <span className={styles.eyebrow}>What we do</span>
            <h2 className={styles.sectionTitle}>
              The Magic<br />
              <span className={styles.goldText}>We Make</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              A full creative suite designed to build, protect, and elevate careers that matter.
            </p>
          </ScrollReveal>

          {/* Active service info — visible on desktop, below heading */}
          <div className={styles.activeInfo}>
            <div className={styles.activeNumber}>{String(active + 1).padStart(2, "0")}</div>
            <div className={styles.activeDetails}>
              <h3 className={styles.activeTitle}>{current.title}</h3>
              <p className={styles.activeDesc}>{current.description}</p>
            </div>
          </div>

          {/* Dot controls */}
          <div className={styles.controls}>
            <div className={styles.dots}>
              {services.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to service ${i + 1}`}
                />
              ))}
            </div>
            <div className={styles.arrows}>
              <button
                className={styles.arrowBtn}
                onClick={() => goTo((active - 1 + services.length) % services.length)}
                aria-label="Previous"
              >←</button>
              <button
                className={styles.arrowBtn}
                onClick={() => goTo((active + 1) % services.length)}
                aria-label="Next"
              >→</button>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Card Stack ── */}
        <div
          className={styles.rightCol}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={styles.cardStack}>
            {services.map((service, i) => {
              const offset = (i - active + services.length) % services.length;
              return (
                <div
                  key={service.title}
                  className={styles.stackCard}
                  style={{
                    opacity: offset === 0 ? 1 : offset === 1 ? 0.45 : offset === 2 ? 0.2 : 0,
                    transform: `translateY(${offset * 18}px) scale(${1 - offset * 0.04})`,
                    zIndex: services.length - offset,
                    pointerEvents: offset === 0 ? "auto" : "none",
                  }}
                  onClick={() => offset !== 0 && goTo(i)}
                >
                  <div className={styles.imageWrapper}>
                    <img src={service.image} alt={service.title} className={styles.image} />
                    <div className={styles.imageOverlay} />
                    <span className={styles.cardTagBadge}>{service.tag}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      <span className={styles.serviceNumber}>{service.number}</span>
                      <span className={styles.serviceSubtitle}>{service.subtitle}</span>
                    </div>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceDesc}>{service.description}</p>
                  </div>
                  {/* Progress bar on active card */}
                  {offset === 0 && (
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} key={active} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
