"use client";

import { useEffect, useState, useRef } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./GlobalFootprint.module.css";

interface Location {
  name: string;
  x: number; // percentage X
  y: number; // percentage Y
  description: string;
}

const locations: Location[] = [
  { name: "Spain", x: 15.3, y: 31.0, description: "International Live Concerts & Arena Shows" },
  { name: "Puerto Rico", x: 26.2, y: 45.0, description: "Artist Bookings & Regional Collaborations" },
  { name: "Abu Dhabi", x: 53.0, y: 33.0, description: "Mega Festivals & Large Scale Productions" },
  { name: "AlUla", x: 62.0, y: 38.0, description: "Exclusive Cultural Events & Heritage Shows" },
  { name: "Doha", x: 56.0, y: 44.0, description: "High-End Corporate Events & Launch Parties" },
  { name: "Qatar", x: 59.0, y: 41.0, description: "Stadium Concerts & International Festivals" },
  { name: "Bahrain", x: 60.0, y: 48.0, description: "Elite Showcases & Luxury Concert Series" },
  { name: "India", x: 71.0, y: 44.0, description: "Global HQ & Nationwide Event Production Hub" },
  { name: "Singapore", x: 76.0, y: 58.0, description: "Asia-Pacific Tours & Brand Collaborations" },
  { name: "Australia", x: 83.0, y: 73.0, description: "Multi-City Arena & Stadium Tours" },
];

export function GlobalFootprint({ data }: { data?: { image: string } }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const mapScrollRef = useRef<HTMLDivElement>(null);

  // Viewport observer to trigger the cinematic entrance sequence
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Coordinated auto-tour animation loop
  useEffect(() => {
    if (!hasEntered) return;

    // Delay start of the auto tour until the cascading pins finish dropping (approx 3 seconds)
    const tourTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % locations.length);
      }, 5000);
      return () => clearInterval(interval);
    }, 3000);

    return () => clearTimeout(tourTimeout);
  }, [hasEntered]);

  // Handle center scroll on mobile
  useEffect(() => {
    if (mapScrollRef.current && window.innerWidth < 768) {
      const scrollContainer = mapScrollRef.current;
      const scrollTarget = scrollContainer.scrollWidth * 0.45;
      scrollContainer.scrollLeft = scrollTarget;
    }
  }, []);

  // Generate curved path
  const getArcPath = (target: Location) => {
    const hub = locations.find((l) => l.name === "India") || locations[7];

    const x1 = (hub.x / 100) * 1000;
    const y1 = (hub.y / 100) * 562.5;
    const x2 = (target.x / 100) * 1000;
    const y2 = (target.y / 100) * 562.5;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 10) return "";

    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const arcHeight = dist * 0.18;
    const cx = mx;
    const cy = my - arcHeight;

    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  };

  const activeTooltipIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <ScrollReveal direction="up">
          <h2 className={styles.title}>
            OUR GLOBAL <span className={styles.goldText}>FOOTPRINT</span>
          </h2>
          <p className={styles.subcopy}>
            INTERNATIONAL ARTIST SHOWS<br />SUCCESSFULLY EXECUTED
          </p>
        </ScrollReveal>

        {/* Mobile Swipe Hint */}
        <div className={styles.swipeHint}>
          <span>← Swipe to explore the map →</span>
        </div>

        <div className={styles.mapViewport} ref={mapScrollRef}>
          <div className={`${styles.mapWrapper} ${hasEntered ? styles.mapEntered : ""}`}>
            {/* World Map Image */}
            <img
              src={data?.image || "/assets/hero/Global map.png"}
              alt="Global Footprint Map"
              className={styles.mapImage}
              loading="lazy"
              decoding="async"
            />

            {/* SVG Connection Lines Overlay */}
            <svg className={styles.svgOverlay} viewBox="0 0 1000 562.5">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E4C057" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#E4C057" stopOpacity="1" />
                  <stop offset="100%" stopColor="#d4af37" stopOpacity="0.1" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Draw connection paths */}
              {hasEntered && locations.map((loc, idx) => {
                if (loc.name === "India") return null;
                const pathData = getArcPath(loc);
                const isActive = activeIndex === idx;

                return (
                  <g key={idx}>
                    {/* Base faint gold guide-line */}
                    <path
                      d={pathData}
                      className={styles.baseArc}
                    />

                    {/* Shooting light beam pulse */}
                    <path
                      d={pathData}
                      className={`${styles.activeArc} ${isActive ? styles.animateArc : ""}`}
                      filter="url(#glow)"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Interactive Pins & Hotspots */}
            {locations.map((loc, idx) => {
              const isActive = activeTooltipIndex === idx;
              const isActualActive = activeIndex === idx;
              const isHub = loc.name === "India";

              return (
                <div
                  key={idx}
                  className={`${styles.pinContainer} ${isHub ? styles.hubContainer : ""} ${hasEntered ? styles.entrancePin : ""
                    }`}
                  style={{
                    left: `${loc.x}%`,
                    top: `${loc.y}%`,
                    animationDelay: `${idx * 0.18}s`
                  }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setActiveIndex(idx)}
                >
                  {/* Glowing Radar Ring */}
                  <span className={`${styles.radarRing} ${isActualActive ? styles.pulseRadar : ""}`} />

                  {/* Central glowing indicator dot */}
                  <span className={`${styles.pinDot} ${isActive ? styles.pinDotActive : ""} ${isHub ? styles.hubDot : ""}`} />

                  {/* Tooltip Popup (Glassmorphic) */}
                  <div className={`${styles.tooltip} ${isActive ? styles.tooltipVisible : ""}`}>
                    <div className={styles.tooltipHeader}>
                      <span className={styles.tooltipIcon}>🌍</span>
                      <h4 className={styles.tooltipTitle}>{loc.name}</h4>
                    </div>
                    <div className={styles.tooltipArrow} />
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
