/* eslint-disable @next/next/no-img-element */
"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import styles from "./Services.module.css";

interface GalleryMedia {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
}

const services = [
  {
    title: "LIVE EVENTS",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    shape: "shapeArch",
    gallery: [
      { type: "image", url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800" },
      { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800" },
      { type: "image", url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800" },
      { type: "image", url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800" },
      { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://images.unsplash.com/photo-1540039155732-68ee23e15b51?q=80&w=800" },
      { type: "image", url: "https://images.unsplash.com/photo-1470229722913-7c090be5c560?q=80&w=800" },
    ]
  },
  {
    title: "BRAND COLLABS",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop",
    shape: "shapeArch",
    gallery: [
      { type: "image", url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800" },
      { type: "image", url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800" },
      { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800" },
      { type: "image", url: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=800" },
      { type: "image", url: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800" },
      { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800" },
    ]
  }
];

export function Services() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [mobileCardIndex, setMobileCardIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const showArrows = services.length > 2;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setLightboxIndex(null);
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedService]);

  // Track active card on mobile via scroll
  const handleCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.scrollWidth / services.length;
    const index = Math.round(scrollLeft / cardWidth);
    setMobileCardIndex(Math.min(index, services.length - 1));
  }, []);

  const scrollToCard = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / services.length;
    el.scrollTo({ left: cardWidth * index, behavior: "smooth" });
  };

  // Lightbox navigation
  const lightboxPrev = () => {
    if (lightboxIndex === null || !selectedService) return;
    setLightboxIndex((lightboxIndex - 1 + selectedService.gallery.length) % selectedService.gallery.length);
  };
  const lightboxNext = () => {
    if (lightboxIndex === null || !selectedService) return;
    setLightboxIndex((lightboxIndex + 1) % selectedService.gallery.length);
  };

  // Keyboard nav for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "ArrowRight") lightboxNext();
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, selectedService]);

  // Masonry row pattern — cycles through layouts for any number of items
  const getMasonryLayout = (totalItems: number) => {
    // Patterns: "triple" = 3 items in a row, "duo" = 2 items, "hero" = 1 wide
    const patterns = ["triple", "duo", "hero", "duo", "triple"];
    const result: { start: number; count: number; type: string }[] = [];
    let idx = 0;
    let patIdx = 0;
    while (idx < totalItems) {
      const pat = patterns[patIdx % patterns.length];
      let count = pat === "triple" ? 3 : pat === "duo" ? 2 : 1;
      // Don't overshoot
      count = Math.min(count, totalItems - idx);
      result.push({ start: idx, count, type: pat });
      idx += count;
      patIdx++;
    }
    return result;
  };

  return (
    <section className={styles.section} id="services-section">
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <ScrollReveal direction="up">
            <h2 className={styles.sectionTitle}>
              Where excellence <span className={styles.goldText}>Runs The Show</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Marquee */}
        <div className={styles.marqueeWrapper}>
          <div className={styles.marquee}>
            <span>OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — </span>
            <span aria-hidden="true">OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — </span>
          </div>
        </div>

        {/* Carousel */}
        <div className={styles.carouselContainer}>
          {/* Desktop arrows — only if > 2 cards */}
          {showArrows && (
            <button
              className={`${styles.desktopArrow} ${styles.desktopArrowLeft}`}
              onClick={() => carouselRef.current?.scrollBy({ left: -370, behavior: "smooth" })}
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <div
            className={styles.servicesCarousel}
            ref={carouselRef}
            onScroll={handleCarouselScroll}
          >
            {services.map((service, i) => (
              <div key={service.title} className={styles.snapSlide}>
                <ScrollReveal delay={100 * i}>
                  <div
                    className={styles.serviceCard}
                    onClick={() => setSelectedService(service)}
                  >
                    <div className={`${styles.imageWrapper} ${styles[service.shape]}`}>
                      <img src={service.image} alt={service.title} className={styles.image} />
                      <div className={styles.viewOverlay}>
                        <span className={styles.viewLabel}>View Gallery</span>
                      </div>
                    </div>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>

          {showArrows && (
            <button
              className={`${styles.desktopArrow} ${styles.desktopArrowRight}`}
              onClick={() => carouselRef.current?.scrollBy({ left: 370, behavior: "smooth" })}
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Mobile dots — only if > 1 */}
        {services.length > 1 && (
          <div className={styles.dotsRow}>
            {services.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${mobileCardIndex === i ? styles.dotActive : ""}`}
                onClick={() => scrollToCard(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════
          GALLERY MODAL — Apple-inspired scrollable gallery
          ═══════════════════════════════════════════════ */}
      {selectedService && (
        <div className={styles.modalOverlay} onClick={() => setSelectedService(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

            {/* Top bar — fixed, Apple style */}
            <div className={styles.modalTopBar}>
              <div className={styles.modalTopBarLeft}>
                <h3 className={styles.modalServiceName}>{selectedService.title}</h3>
                <span className={styles.modalCount}>{selectedService.gallery.length} items</span>
              </div>
              <button className={styles.modalCloseBtn} onClick={() => setSelectedService(null)}>
                <X size={18} />
              </button>
            </div>

            {/* Scrollable masonry gallery */}
            <div className={styles.galleryScroll}>
              {getMasonryLayout(selectedService.gallery.length).map((row, rowIdx) => {
                const items = selectedService.gallery.slice(row.start, row.start + row.count);
                return (
                  <div
                    key={rowIdx}
                    className={`${styles.masonryRow} ${
                      row.count === 1 ? styles.rowHero :
                      row.count === 2 ? styles.rowDuo :
                      styles.rowTriple
                    }`}
                  >
                    {items.map((item, itemIdx) => {
                      const globalIdx = row.start + itemIdx;
                      return (
                        <div
                          key={globalIdx}
                          className={styles.galleryTile}
                          onClick={() => setLightboxIndex(globalIdx)}
                        >
                          {item.type === "image" ? (
                            <img
                              src={item.url}
                              alt={`${selectedService.title} ${globalIdx + 1}`}
                              className={styles.tileMedia}
                              loading="lazy"
                            />
                          ) : (
                            <video
                              src={item.url}
                              className={styles.tileMedia}
                              poster={item.thumbnail}
                              muted
                              playsInline
                              preload="metadata"
                            />
                          )}
                          {/* Hover overlay */}
                          <div className={styles.tileHover}>
                            <Maximize2 size={18} />
                          </div>
                          {/* Video indicator */}
                          {item.type === "video" && (
                            <div className={styles.videoIndicator}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          LIGHTBOX — Full-screen single media viewer
          ═══════════════════════════════════════════════ */}
      {selectedService && lightboxIndex !== null && (
        <div className={styles.lightbox} onClick={() => setLightboxIndex(null)}>
          {/* Close */}
          <button className={styles.lbClose} onClick={() => setLightboxIndex(null)}>
            <Minimize2 size={18} />
          </button>

          {/* Counter */}
          <div className={styles.lbCounter}>
            {lightboxIndex + 1} / {selectedService.gallery.length}
          </div>

          {/* Prev */}
          <button
            className={`${styles.lbNav} ${styles.lbPrev}`}
            onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
          >
            <ChevronLeft size={28} />
          </button>

          {/* Media */}
          <div className={styles.lbMediaWrap} onClick={(e) => e.stopPropagation()}>
            {selectedService.gallery[lightboxIndex].type === "image" ? (
              <img
                src={selectedService.gallery[lightboxIndex].url}
                alt=""
                className={styles.lbMedia}
              />
            ) : (
              <video
                src={selectedService.gallery[lightboxIndex].url}
                className={styles.lbMedia}
                controls
                autoPlay
                playsInline
                poster={selectedService.gallery[lightboxIndex].thumbnail}
              />
            )}
          </div>

          {/* Next */}
          <button
            className={`${styles.lbNav} ${styles.lbNext}`}
            onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </section>
  );
}
