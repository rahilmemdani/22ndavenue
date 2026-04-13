"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./Services.module.css";

const services = [
  {
    title: "TALENT MANAGEMENT",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
    shape: "shape1"
  },
  {
    title: "BRAND COLLABS",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
    shape: "shape2"
  },
  {
    title: "LIVE EVENTS",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
    shape: "shape3"
  }
];

export function Services() {
  return (
    <section className={`snap-section ${styles.section}`} id="services-section">
      <div className={styles.wrapper}>
        {/* Marquee Header */}
        <div className={styles.marqueeWrapper}>
          <div className={styles.marquee}>
            <span>OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — </span>
            <span aria-hidden="true">OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — </span>
          </div>
        </div>

        <div className={`container ${styles.container}`}>
          <div className={styles.servicesGrid}>
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
        </div>
      </div>
    </section>
  );
}
