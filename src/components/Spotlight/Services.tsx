/* eslint-disable @next/next/no-img-element */
"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useEffect, useRef } from "react";
import styles from "./Services.module.css";

const services = [
  {
    title: "TALENT MANAGEMENT",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
    shape: "shape1"
  },
  {
    title: "BRAND COLLABS",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop",
    shape: "shape2"
  },
  {
    title: "LIVE EVENTS",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",
    shape: "shape3"
  }
];

export function Services() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const maxScroll = scrollWidth - clientWidth;
        
        if (scrollLeft >= maxScroll - 5) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({ left: clientWidth * 0.8, behavior: "smooth" });
        }
      }
    }, 4000); // Auto-scroll every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.section} id="services-section">
      <div className={styles.wrapper}>
        {/* Standardized Header */}
        <div className={styles.header}>
          <ScrollReveal direction="up">
            <h2 className={styles.sectionTitle}>
              OUR <span className={styles.goldText}>SERVICES</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Marquee Header */}
        <div className={styles.marqueeWrapper}>
          <div className={styles.marquee}>
            <span>OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — </span>
            <span aria-hidden="true">OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — </span>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div className={styles.servicesCarousel} ref={carouselRef}>
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={100 * i}>
              <div className={styles.serviceCard}>
                <div className={`${styles.imageWrapper} ${styles[service.shape]}`}>
                  <img src={service.image} alt={service.title} className={styles.image} />
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Swipe Guide */}
        <div className={styles.carouselGuide}>
          <div className={styles.guideLine} />
          <span className={styles.guideText}>Explore Services</span>
          <div className={styles.guideLine} />
        </div>
      </div>
    </section>
  );
}
