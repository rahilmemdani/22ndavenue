/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import styles from "./TransformationHero.module.css";

interface TransformationHeroProps {
  data?: {
    desktopVideoUrl?: string;
    mobileVideoUrl?: string;
    fallbackImage?: string;
  };
}

const TransformationHero = ({ data }: TransformationHeroProps) => {
  const [isSplit, setIsSplit] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Auto-play requires mute initially
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Play video only after animation completes (isSplit becomes true)
  useEffect(() => {
    if (isSplit && videoRef.current) {
      videoRef.current.play().catch(err => console.log("Play prevented:", err));
    }
  }, [isSplit]);

  useEffect(() => {
    // Prevent browser from restoring previous scroll position on reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top immediately on load
    window.scrollTo(0, 0);

    const splitTimer = setTimeout(() => {
      setIsSplit(true);
    }, 3800);

    return () => clearTimeout(splitTimer);
  }, []);

  useEffect(() => {
    // Strictly lock scroll while the animation is active
    if (!isSplit) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      // Prevent mobile touch scrolling
      document.body.style.touchAction = "none";
      document.body.classList.add("hero-animating");
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.classList.remove("hero-animating");
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.classList.remove("hero-animating");
    };
  }, [isSplit]);

  const [isVideoVisible, setIsVideoVisible] = useState(true);

  // Pause/resume video based on scroll position.
  // The hero section is inside a position:sticky wrapper so getBoundingClientRect()
  // always stays at y=0. Instead we compare window.scrollY directly against the
  // hero's natural height (one viewport height). When the user scrolls more than
  // 80% of the viewport, we pause the video and hide it to prevent any iOS bleed.
  useEffect(() => {
    if (!videoRef.current) return;

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const pauseAt = heroHeight * 0.8;

      if (window.scrollY > pauseAt) {
        setIsVideoVisible(false); // Hide completely to stop bleeding
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
          videoRef.current.muted = true;
          setIsMuted(true);
        }
      } else {
        setIsVideoVisible(true); // Show when scrolled back up
        // Scroll back up — resume if animation is done
        if (videoRef.current && videoRef.current.paused && isSplit) {
          videoRef.current.play().catch(() => {});
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // check immediately on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSplit]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const videoSrc = (isMobile && data?.mobileVideoUrl ? data.mobileVideoUrl : data?.desktopVideoUrl) || "/assets/hero/Intro AV.mp4";

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
        <div 
          className={styles.videoContainer}
          style={{ visibility: isVideoVisible ? 'visible' : 'hidden' }}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            poster={data?.fallbackImage}
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
        </div>
      </div>

    </section>
  );
};

export default TransformationHero;
