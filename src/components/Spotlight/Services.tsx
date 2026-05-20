/* eslint-disable @next/next/no-img-element */
"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Services.module.css";

// ─── Lazy Video Tile ──────────────────────────────────────────────────────────
// In the gallery grid, video tiles show a thumbnail poster if available,
// or the video's first frame (via preload="metadata") if no thumbnail exists.
// Clicking opens the lightbox — the correct place to play video.
// Zero full-video bytes loaded until the user explicitly clicks.
function VideoTilePoster({ src, poster, className }: { src: string; poster?: string; className?: string }) {
  if (poster) {
    return (
      <img
        src={poster}
        alt=""
        className={className}
        loading="lazy"
        decoding="async"
      />
    );
  }

  // No thumbnail — show video's first frame via preload="metadata"
  // Browser fetches only a tiny metadata chunk, renders frame 0 visually
  return (
    <video
      src={src}
      className={className}
      muted
      playsInline
      preload="metadata"
      style={{ pointerEvents: "none" }}
    />
  );
}
// ─────────────────────────────────────────────────────────────────────────────


interface GalleryMedia {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
}

interface ServicesProps {
  data?: {
    servicesList: {
      title: string;
      description: string;
      image: string;
      shape: string;
      gallery: {
        type: string;
        image?: string;
        videoUrl?: string;
        thumbnail?: string;
      }[];
    }[];
  };
}

const DEFAULT_SERVICES = [
  {
    title: "LIVE EVENTS",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    shape: "shapeArch",
    num: "01",
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
    num: "02",
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

// ─── Scroll lock helpers (iOS-safe, no-jump) ─────────────────────────────────
function lockScroll() {
  if (document.body.dataset.scrollLocked) return;
  document.body.dataset.scrollLocked = "1";
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}

function unlockScroll() {
  if (!document.body.dataset.scrollLocked) return;
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  delete document.body.dataset.scrollLocked;
}
import { getDirectVideoUrl } from "@/utils/video";

// ─────────────────────────────────────────────────────────────────────────────

export function Services({ data }: ServicesProps) {
  const services = data?.servicesList?.length
    ? data.servicesList.map(s => {
      const defaultService = DEFAULT_SERVICES.find(
        ds => ds.title.toUpperCase() === s.title.toUpperCase()
      );

      // Build gallery from Sanity, filter out items with no URL
      const sanityGallery = (s.gallery || [])
        .map(g => ({
          type: g.type as "image" | "video",
          url: (g.type === "video" ? getDirectVideoUrl(g.videoUrl) : g.image) || "",
          thumbnail: g.thumbnail
        }))
        .filter(g => g.url.length > 0);

      // Fall back to the matching default gallery if Sanity has none
      const gallery = sanityGallery.length > 0
        ? sanityGallery
        : (defaultService?.gallery || []);

      return {
        ...s,
        image: s.image || defaultService?.image || "",
        shape: s.shape || "shapeDiamond",
        gallery,
      };
    })
    : DEFAULT_SERVICES;

  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [mobileCardIndex, setMobileCardIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  
  const showArrows = services.length > 2;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (selectedService) {
      lockScroll();
    } else {
      unlockScroll();
      setLightboxIndex(null);
    }
    return () => { unlockScroll(); };
  }, [selectedService]);

  // Handle video playback safely
  useEffect(() => {
    if (lightboxIndex !== null && selectedService?.gallery[lightboxIndex].type === 'video' && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Automatic playback failed or was interrupted, ignore the error
        });
      }
    }
  }, [lightboxIndex, selectedService]);

  const handleCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const itemWidth = el.scrollWidth / services.length;
    const index = Math.round(scrollLeft / itemWidth);
    setMobileCardIndex(Math.min(index, services.length - 1));
  }, [services.length]);

  const scroll = (direction: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth; 
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  const scrollToCard = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const itemWidth = el.scrollWidth / services.length;
    el.scrollTo({ left: itemWidth * index, behavior: "smooth" });
  };

  const lightboxPrev = () => {
    if (lightboxIndex === null || !selectedService) return;
    setLightboxIndex((lightboxIndex - 1 + selectedService.gallery.length) % selectedService.gallery.length);
  };
  const lightboxNext = () => {
    if (lightboxIndex === null || !selectedService) return;
    setLightboxIndex((lightboxIndex + 1) % selectedService.gallery.length);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIndex !== null) setLightboxIndex(null);
        else if (selectedService) setSelectedService(null);
      }
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "ArrowRight") lightboxNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, selectedService]);

  const getMasonryLayout = (totalItems: number) => {
    const patterns = ["triple", "duo", "hero", "duo", "triple"];
    const result: { start: number; count: number; type: string }[] = [];
    let idx = 0;
    let patIdx = 0;
    while (idx < totalItems) {
      const pat = patterns[patIdx % patterns.length];
      let count = pat === "triple" ? 3 : pat === "duo" ? 2 : 1;
      count = Math.min(count, totalItems - idx);
      result.push({ start: idx, count, type: pat });
      idx += count;
      patIdx++;
    }
    return result;
  };

  const modalPortal = mounted && selectedService ? createPortal(
    <div
      className={styles.modalOverlay}
      onClick={() => setSelectedService(null)}
      role="dialog"
      aria-modal="true"
      aria-label={`${selectedService.title} gallery`}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalAccentLine} />
        <div className={styles.modalTopBar}>
          <div className={styles.modalTopBarLeft}>
            <div>
              <h3 className={styles.modalServiceName}>{selectedService.title}</h3>
              <span className={styles.modalCount}>{selectedService.gallery.length} items in collection</span>
            </div>
          </div>
          <button
            className={styles.modalCloseBtn}
            onClick={() => setSelectedService(null)}
            aria-label="Close gallery"
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.galleryScroll}>
          <div className={styles.masonryGrid}>
            {selectedService.gallery.map((item, globalIdx) => (
              <div
                key={globalIdx}
                className={styles.galleryTile}
                onClick={() => setLightboxIndex(globalIdx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(globalIdx)}
              >
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt={`${selectedService.title} ${globalIdx + 1}`}
                    className={styles.tileMedia}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  /* Show poster thumbnail in grid — click opens lightbox to play */
                  <VideoTilePoster
                    src={item.url}
                    poster={item.thumbnail}
                    className={styles.tileMedia}
                  />
                )}
                <div className={styles.tileHover}></div>
                {item.type === "video" && (
                  <div className={styles.videoIndicator}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className={styles.lightbox}
          onClick={(e) => {
            e.stopPropagation();
            setLightboxIndex(null);
          }}
        >
          <button
            className={styles.lbClose}
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(null);
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className={styles.lbCounter}>
            {lightboxIndex + 1} / {selectedService.gallery.length}
          </div>
          <button
            className={`${styles.lbNav} ${styles.lbPrev}`}
            onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
            aria-label="Previous"
          >
            <ChevronLeft size={26} />
          </button>
          <div className={styles.lbMediaWrap} onClick={(e) => e.stopPropagation()}>
            {selectedService.gallery[lightboxIndex].type === "image" ? (
              <img
                src={selectedService.gallery[lightboxIndex].url}
                alt=""
                className={styles.lbMedia}
              />
            ) : (
              <video
                ref={videoRef}
                src={selectedService.gallery[lightboxIndex].url}
                className={styles.lbMedia}
                controls
                playsInline
                autoPlay
                preload="auto"
                poster={selectedService.gallery[lightboxIndex].thumbnail}
              />
            )}
          </div>
          <button
            className={`${styles.lbNav} ${styles.lbNext}`}
            onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
            aria-label="Next"
          >
            <ChevronRight size={26} />
          </button>
        </div>
      )}
    </div>,
    document.body
  ) : null;

  return (
    <section className={styles.section} id="services-section">
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <ScrollReveal direction="up">
            <h2 className={styles.sectionTitle}>
              Where Excellence<br />
              <span className={styles.goldText}>Runs The Show</span>
            </h2>
          </ScrollReveal>
        </div>

        <div className={styles.marqueeWrapper}>
          <div className={styles.marquee}>
            <span>OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — </span>
            <span aria-hidden="true">OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — OUR SERVICES — </span>
          </div>
        </div>

        <div className={styles.carouselContainer}>
          {showArrows && (
            <button
              className={`${styles.desktopArrow} ${styles.desktopArrowLeft}`}
              onClick={() => scroll('left')}
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
                <ScrollReveal delay={100 * i} width="100%">
                  <div
                    className={styles.serviceCard}
                    onClick={() => setSelectedService(service)}
                  >
                    <div className={styles.cardBorderGlow}></div>
                    <div className={`${styles.imageWrapper} ${styles[service.shape]}`}>
                      <img src={service.image} alt={service.title} className={styles.image} />
                      <div className={styles.cinemaOverlay}></div>
                      <div className={styles.cardContent}>
                        <div className={styles.contentInner}>
                          <div className={styles.shimmerLine}></div>
                          <h3 className={styles.serviceTitle}>{service.title}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="7" y1="17" x2="17" y2="7"></line>
                              <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                          </h3>
                          {/* {service.description && (
                            <p className={styles.serviceDesc}>{service.description}</p>
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>

          {showArrows && (
            <button
              className={`${styles.desktopArrow} ${styles.desktopArrowRight}`}
              onClick={() => scroll('right')}
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

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

      {modalPortal}
    </section>
  );
}
