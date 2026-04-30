/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useCallback, useEffect } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowLeft, ArrowRight, Play, X, Quote } from "lucide-react";
import styles from "./Testimonials.module.css";

interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote?: string;   // Text-only testimonials
  video?: string;   // Video-only testimonials
}

const testimonials: Testimonial[] = [
  {
    name: "Rahul Sharma",
    role: "Event Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    quote: "22nd Avenue transformed our corporate gala into an unforgettable experience. Their attention to detail is unmatched."
  },
  {
    name: "Priya Kapoor",
    role: "Music Producer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    name: "Arjun Mehta",
    role: "Brand Strategist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
    quote: "The team's creative vision elevated our brand launch to a whole new level. Truly world-class execution."
  },
  {
    name: "Sneha Iyer",
    role: "Artist Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    name: "Vikram Desai",
    role: "Concert Promoter",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    quote: "They don't just manage events — they craft experiences that leave audiences speechless."
  },
  {
    name: "Ananya Reddy",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
];

const VISIBLE_COUNT = 4;

export function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);
  const [videoModal, setVideoModal] = useState<string | null>(null);
  const [textModal, setTextModal] = useState<{name: string, role: string, quote: string} | null>(null);

  const visibleTestimonials = [];
  for (let i = 0; i < VISIBLE_COUNT; i++) {
    visibleTestimonials.push(testimonials[(startIndex + i) % testimonials.length]);
  }

  const next = useCallback(() => {
    setStartIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setStartIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance removed per request

  return (
    <section className={styles.section} id="testimonials-section">
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <ScrollReveal direction="up">
            <h2 className={styles.title}>
              THE BUZZ IS <span className={styles.goldText}>REAL</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Pills — alternating up/down */}
        <div className={styles.pillsContainer}>
          {visibleTestimonials.map((t, i) => {
            const isDown = i % 2 !== 0;
            const globalIndex = (startIndex + i) % testimonials.length;
            const isVideo = !!t.video;
            const isText = !!t.quote;

            return (
              <div
                key={`${globalIndex}-${startIndex}`}
                className={`${styles.pillWrapper} ${isDown ? styles.pillDown : styles.pillUp}`}
              >
                <div
                  className={styles.pill}
                  onClick={() => isVideo && t.video && setVideoModal(t.video)}
                >
                  {/* Image */}
                  <div className={styles.mediaArea}>
                    <img src={t.image} alt={t.name} className={styles.pillImage} />

                    {/* Video badge */}
                    {isVideo && (
                      <div className={styles.playBadge}>
                        <Play size={18} fill="white" stroke="white" />
                      </div>
                    )}

                    {/* Text quote overlay */}
                    {isText && t.quote && (
                      <div className={styles.quoteOverlay}>
                        <Quote size={18} className={styles.quoteIcon} />
                        <p className={styles.quoteText}>
                          {t.quote.length > 80 ? (
                            <>
                              {t.quote.substring(0, 80)}...
                              <span 
                                className={styles.readMore}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setTextModal({name: t.name, role: t.role, quote: t.quote!});
                                }}
                              >
                                Read More
                              </span>
                            </>
                          ) : (
                            t.quote
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Info bar at bottom */}
                  <div className={styles.pillInfo}>
                    <h4 className={styles.pillName}>{t.name}</h4>
                    <p className={styles.pillRole}>{t.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
 
        {/* Nav Controls at bottom */}
        <div className={styles.navControlsWrapper}>
          <div className={styles.navControls}>
            <button onClick={prev} className={styles.arrowBtn} aria-label="Previous">
              <ArrowLeft size={16} />
            </button>
            <span className={styles.counter}>
              {String(startIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
            <button onClick={next} className={styles.arrowBtn} aria-label="Next">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* ===== TEXT MODAL ===== */}
      {textModal && (
        <div className={styles.modalBackdrop} onClick={() => setTextModal(null)}>
          <div className={styles.textModalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setTextModal(null)} aria-label="Close">
              <X size={22} />
            </button>
            <div className={styles.textModalHeader}>
              <Quote size={32} className={styles.quoteIconLarge} />
              <h4 className={styles.textModalName}>{textModal.name}</h4>
              <p className={styles.textModalRole}>{textModal.role}</p>
            </div>
            <div className={styles.textModalBody}>
              <p className={styles.fullQuote}>{textModal.quote}</p>
            </div>
          </div>
        </div>
      )}
 
      {/* ===== VIDEO MODAL ===== */}
      {videoModal && (
        <div className={styles.modalBackdrop} onClick={() => setVideoModal(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setVideoModal(null)} aria-label="Close">
              <X size={22} />
            </button>
            <video
              src={videoModal}
              className={styles.modalVideo}
              autoPlay
              controls
              playsInline
            />
          </div>
        </div>
      )}
    </section>
  );
}
