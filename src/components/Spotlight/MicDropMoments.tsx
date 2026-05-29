/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./MicDropMoments.module.css";

interface MicDropMomentsProps {
  data?: {
    categories: {
      categoryName: string;
      tiles: {
        title?: string;
        subtitle?: string;
        imageUrl?: string;
        imageAsset?: string;
        mobileImageUrl?: string;
        mobileImageAsset?: string;
        videoUrl?: string;
        videoAsset?: string;
        mobileVideoUrl?: string;
        mobileVideoAsset?: string;
        image?: string;
        mobileImage?: string;
        video?: string;
        mobileVideo?: string;
      }[];
    }[];
  };
}

interface ShowcaseTile {
  id: string;
  title: string;
  subtitle: string;
  verticalText: string;
  image: string;
  mobileImage?: string;
  video?: string;
  mobileVideo?: string;
}

interface ShowcaseCategory {
  name: string;
  tiles: ShowcaseTile[];
}

const DEFAULT_CATEGORIES: ShowcaseCategory[] = [
  {
    name: "Corporate Events",
    tiles: [
      {
        id: "01",
        title: "Grand",
        subtitle: "LAUNCHES",
        verticalText: "GRAND LAUNCHES",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=75&w=1200&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "02",
        title: "Summit",
        subtitle: "EXPERIENCES",
        verticalText: "SUMMIT EXPERIENCES",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=75&w=1200&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "03",
        title: "Gala",
        subtitle: "NIGHTS",
        verticalText: "GALA NIGHTS",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=75&w=1200&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "04",
        title: "Award",
        subtitle: "CEREMONIES",
        verticalText: "AWARD CEREMONIES",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=75&w=1200&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      }
    ]
  },
  {
    name: "Live Concerts",
    tiles: [
      {
        id: "01",
        title: "Global",
        subtitle: "DOMINATION",
        verticalText: "GLOBAL DOMINATION",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=75&w=1200&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "02",
        title: "Iconic",
        subtitle: "PERFORMANCES",
        verticalText: "ICONIC PERFORMANCES",
        image: "https://images.unsplash.com/photo-1470229722913-7c090be5c560?q=75&w=1200&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "03",
        title: "Unmatched",
        subtitle: "ENERGY",
        verticalText: "UNMATCHED ENERGY",
        image: "https://images.unsplash.com/photo-1540039155732-68ee23e15b51?q=75&w=1200&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "04",
        title: "Sold Out",
        subtitle: "ARENAS",
        verticalText: "SOLD OUT ARENAS",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=75&w=1200&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      }
    ]
  },
  {
    name: "Private Shows",
    tiles: [
      {
        id: "01",
        title: "Exclusive",
        subtitle: "GATHERINGS",
        verticalText: "EXCLUSIVE GATHERINGS",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=75&w=1200&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "02",
        title: "VIP",
        subtitle: "EXPERIENCES",
        verticalText: "VIP EXPERIENCES",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=75&w=1200&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "03",
        title: "Intimate",
        subtitle: "SESSIONS",
        verticalText: "INTIMATE SESSIONS",
        image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=75&w=1200&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      },
      {
        id: "04",
        title: "After",
        subtitle: "PARTIES",
        verticalText: "AFTER PARTIES",
        image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=75&w=1200&auto=format&fit=crop",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
      }
    ]
  }
];

import { getDirectVideoUrl, getDirectImageUrl } from "@/utils/video";

export function MicDropMoments({ data }: MicDropMomentsProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let showcaseCategories: ShowcaseCategory[] = DEFAULT_CATEGORIES;

  if (data?.categories && data.categories.length > 0) {
    showcaseCategories = data.categories.map((cat) => ({
      name: cat.categoryName || "Unnamed Category",
      tiles: (cat.tiles || []).map((t, index) => {
        // Resolve desktop & mobile images (prioritize Drive/external URL, fallback to Sanity Asset)
        let resolvedImage = t.imageUrl ? getDirectImageUrl(t.imageUrl) : "";
        if (!resolvedImage && t.imageAsset) {
          resolvedImage = t.imageAsset + "?w=1200&h=800&fit=crop&auto=format&q=80&fm=webp";
        }

        let resolvedMobileImage = t.mobileImageUrl ? getDirectImageUrl(t.mobileImageUrl) : "";
        if (!resolvedMobileImage && t.mobileImageAsset) {
          resolvedMobileImage = t.mobileImageAsset + "?w=800&h=1200&fit=crop&auto=format&q=80&fm=webp";
        }

        // Resolve videos (prioritize Drive/external URL, fallback to Sanity Asset)
        const resolvedVideo = getDirectVideoUrl(t.videoUrl || t.videoAsset || t.video);
        const resolvedMobileVideo = getDirectVideoUrl(t.mobileVideoUrl || t.mobileVideoAsset || t.mobileVideo);

        return {
          id: `${t.title || "Moment"}-${index}`,
          title: t.title || "",
          subtitle: t.subtitle || "",
          verticalText: `${t.title || ''} ${t.subtitle || ''}`.trim() || "Moment",
          image: resolvedImage || t.image || "",
          mobileImage: resolvedMobileImage || t.mobileImage || resolvedImage || t.image || "",
          video: resolvedVideo,
          mobileVideo: resolvedMobileVideo || resolvedVideo,
        };
      }),
    }));
  }

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isSliding, setIsSliding] = useState(false);

  const currentCategory = showcaseCategories[activeCategoryIndex] || showcaseCategories[0];

  const nextCategory = () => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      setActiveCategoryIndex((prev) => (prev + 1) % showcaseCategories.length);
      setActiveIndex(0);
      setHoveredIndex(null);
      setIsSliding(false);
    }, 500);
  };

  const prevCategory = () => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      setActiveCategoryIndex((prev) => (prev - 1 + showcaseCategories.length) % showcaseCategories.length);
      setActiveIndex(0);
      setHoveredIndex(null);
      setIsSliding(false);
    }, 500);
  };

  if (!currentCategory) return null;

  return (
    <section className={styles.section} id="showcase-section">
      <div className={styles.container}>

        {/* Header Row: Title Only */}
        <div className={styles.headerRow}>
          <ScrollReveal direction="up" className={styles.headerLeft}>
            <h2 className={styles.title}>
              MIC DROP <span className={styles.goldText}>MOMENTS</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Accordion — slides on category change */}
        <div className={styles.accordionWrapper}>
          <div className={`${styles.accordionContainer} ${isSliding ? styles.sliding : ""}`}>
            {currentCategory.tiles.map((tile, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={`${activeCategoryIndex}-${tile.id}`}
                  className={`${styles.card} ${isActive ? styles.activeCard : styles.inactiveCard}`}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => {
                    setActiveIndex(index);
                    setHoveredIndex(index);
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Background Image & Video */}
                  <div className={styles.bgImageContainer}>
                    <img
                      src={isMobile ? tile.mobileImage : tile.image}
                      alt={tile.title}
                      className={styles.bgImage}
                    />
                    {activeIndex === index && (isMobile ? tile.mobileVideo : tile.video) && (
                      <video
                        key={isMobile ? `mobile-${tile.mobileVideo}` : `desktop-${tile.video}`}
                        src={isMobile ? tile.mobileVideo : tile.video}
                        className={styles.bgVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    )}
                    <div className={styles.overlay}></div>
                  </div>

                    {/* Content */}
                  <div className={styles.cardContent}>
                    <div className={styles.topArea}>
                      {/* Numbering removed */}
                    </div>

                    {isActive ? (
                      <div className={styles.activeBottomArea}>
                        <h3 className={styles.cardTitle}>{tile.title}</h3>
                        <p className={styles.cardSubtitle}>{tile.subtitle}</p>
                      </div>
                    ) : (
                      <div className={styles.inactiveBottomArea}>
                        <span className={styles.verticalText}>{tile.verticalText}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Nav — MOVED TO BOTTOM */}
        <div className={styles.footerNav}>
          <div className={styles.categoryNav}>
            <button onClick={prevCategory} className={styles.catArrowBtn} aria-label="Previous Category">
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            
            <div className={styles.categoryLabel}>
              <span className={styles.categoryName}>{currentCategory.name}</span>
            </div>

            <button onClick={nextCategory} className={styles.catArrowBtn} aria-label="Next Category">
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
