/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Maximize } from "lucide-react";
import styles from "./TransformationHero.module.css";

const TransformationHero = () => {
  const [isSplit, setIsSplit] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Auto-play requires mute initially
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // If user loads the page and is already scrolled down, SKIP the animation instantly
    if (window.scrollY > 50) {
      setIsSplit(true);
      return;
    }

    // Function to immediately skip animation if user scrolls
    const handleScrollAttempt = () => {
      setIsSplit(true);
    };

    window.addEventListener("scroll", handleScrollAttempt, { passive: true });
    window.addEventListener("wheel", handleScrollAttempt, { passive: true });
    window.addEventListener("touchmove", handleScrollAttempt, { passive: true });

    // Otherwise, wait for the full fall-in sequence to complete
    const splitTimer = setTimeout(() => {
      setIsSplit(true);
    }, 3800);

    return () => {
      clearTimeout(splitTimer);
      window.removeEventListener("scroll", handleScrollAttempt);
      window.removeEventListener("wheel", handleScrollAttempt);
      window.removeEventListener("touchmove", handleScrollAttempt);
    };
  }, []);

  useEffect(() => {
    // While intro is playing, lock scroll ONLY if at the absolute top
    if (!isSplit && window.scrollY <= 50) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("hero-animating");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("hero-animating");
    }

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("hero-animating");
    };
  }, [isSplit]);

  // Intersection Observer to auto-mute video when scrolling out of view
  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Mute video if user scrolls past the hero section
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
            }
          }
        });
      },
      { threshold: 0.1 } // Trigger when 90% out of view
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current as any;
    if (!video) return;

    try {
      // Try container-level fullscreen first (works on Android/Desktop)
      const container = video.parentElement;
      if (container?.requestFullscreen) {
        container.requestFullscreen();
        return;
      }
      if (container?.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
        return;
      }

      // iOS Safari: must use video element's native fullscreen
      if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
    } catch (err) {
      // Last resort: try video element directly
      try {
        if (video.webkitEnterFullscreen) {
          video.webkitEnterFullscreen();
        }
      } catch (e2) {
        console.error("Fullscreen not supported:", e2);
      }
    }
  };

  return (
    <section ref={containerRef} className={`${styles.heroContainer} ${isSplit ? styles.split : ""}`}>
      
      {/* Left Panel: Cream background, holds the typography */}
      <div className={styles.leftPanel}>
        <div className={styles.ambientOrb2}></div>
        <div className={styles.splashTextContainer}>
          <h2 className={styles.splashText}>
            <div>
              <span className={`${styles.splashWord} ${styles.wordWe}`}>WE</span>{" "}
              <span className={`${styles.splashWord} ${styles.wordAre}`}>ARE</span>
            </div>
            <span className={`${styles.splashWord} ${styles.splashOutline}`}>22ND</span>
            <div>
              <span className={`${styles.splashWord} ${styles.splashGold}`}>AVENUE</span>
              <span className={styles.splashDot}>.</span>
            </div>
          </h2>
        </div>
      </div>

      {/* Right Panel: Showcase Reel */}
      <div className={styles.rightPanel}>
        <div className={styles.videoContainer}>
          <video
            ref={videoRef}
            src="/assets/hero/showcase.mp4"
            className={styles.showcaseVideo}
            autoPlay
            loop
            muted={isMuted}
            playsInline
          />
        </div>
        
        <div className={styles.overlay} />
        
        {/* Video Controls Overlay */}
        <div className={styles.videoControls}>
          <button onClick={toggleMute} className={styles.controlBtn} aria-label="Toggle Mute">
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <button onClick={toggleFullscreen} className={styles.controlBtn} aria-label="Fullscreen">
            <Maximize size={20} />
          </button>
        </div>

        <span className={styles.reelLabel}>Showcase Reel</span>
      </div>

    </section>
  );
};

export default TransformationHero;
