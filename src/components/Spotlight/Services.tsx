/* eslint-disable @next/next/no-img-element */
"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useEffect, useRef, useState } from "react";
import { X, Play, ArrowLeft, ArrowRight } from "lucide-react";
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
  const [galleryPage, setGalleryPage] = useState(0);
  const ITEMS_PER_PAGE = 4;

  // Disable scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setGalleryPage(0); // Reset page on close
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedService]);

  const totalGalleryPages = selectedService ? Math.ceil(selectedService.gallery.length / ITEMS_PER_PAGE) : 0;
  const currentGalleryItems = selectedService ? selectedService.gallery.slice(galleryPage * ITEMS_PER_PAGE, (galleryPage + 1) * ITEMS_PER_PAGE) : [];

  const nextGallery = () => setGalleryPage(prev => (prev + 1) % totalGalleryPages);
  const prevGallery = () => setGalleryPage(prev => (prev - 1 + totalGalleryPages) % totalGalleryPages);

  return (
    <section className={styles.section} id="services-section">
      <div className={styles.wrapper}>
        {/* Standardized Header */}
        <div className={styles.header}>
          <ScrollReveal direction="up">
            <h2 className={styles.sectionTitle}>
              Live Events | <span className={styles.goldText}>Brand Collabs</span>
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
              <div
                className={styles.serviceCard}
                onClick={() => setSelectedService(service)}
              >
                <div className={`${styles.imageWrapper} ${styles[service.shape]}`}>
                  <img src={service.image} alt={service.title} className={styles.image} />
                  <div className={styles.viewBadge}>View Gallery</div>
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

      {/* Gallery Modal */}
      {selectedService && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedService(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedService(null)}>
              <X size={24} />
            </button>

            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalTitle}>{selectedService.title}</h3>
                <p className={styles.modalSubtitle}>PROJECT SHOWCASE</p>
              </div>

              {totalGalleryPages > 1 && (
                <div className={styles.galleryNav}>
                  <button onClick={prevGallery} className={styles.navBtn} aria-label="Previous Page">
                    <ArrowLeft size={18} />
                  </button>
                  <span className={styles.galleryCounter}>{galleryPage + 1} / {totalGalleryPages}</span>
                  <button onClick={nextGallery} className={styles.navBtn} aria-label="Next Page">
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>

            <div className={styles.mediaGrid}>
              {currentGalleryItems.map((item, index) => (
                <div key={index} className={styles.mediaItem}>
                  {item.type === "image" ? (
                    <img src={item.url} alt={`${selectedService.title} ${index}`} className={styles.galleryImage} />
                  ) : (
                    <div className={styles.videoContainer}>
                      <video
                        src={item.url}
                        className={styles.galleryVideo}
                        controls
                        playsInline
                        poster={item.thumbnail}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

