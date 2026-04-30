"use client";

import { useState, useEffect, useRef } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./StatsBand.module.css";

const stats = [
  { value: 12, suffix: "+", label: "Years of Legacy" },
  { value: 1000, suffix: "+", label: "Artists Worked With" },
  { value: 2000, suffix: "+", label: "Shows Managed" }
];

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted) {
        setHasStarted(true);
      }
    }, { threshold: 0.1 });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp: number | null = null;
    const duration = 2500; // 2.5s counting animation

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function StatsBand() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {stats.map((stat, idx) => (
          <ScrollReveal key={idx} delay={idx * 150} direction="up" className={styles.statBox}>
            <h2 className={styles.statValue}>
              <CountUp end={stat.value} suffix={stat.suffix} />
            </h2>
            <div className={styles.statFooter}>
              {/* <span className={styles.statDot}></span> */}
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
