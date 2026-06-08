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

import { getDirectVideoUrl } from "@/utils/video";

const TransformationHero = ({ data }: TransformationHeroProps) => {
  const [isSplit, setIsSplit] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Auto-play requires mute initially
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const rawVideoUrl = (isMobile && data?.mobileVideoUrl ? data.mobileVideoUrl : data?.desktopVideoUrl) || "/assets/hero/Intro AV.mp4";
  const videoSrc = getDirectVideoUrl(rawVideoUrl);

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

  // Aggressive autoplay immediately on load to pre-buffer the video
  useEffect(() => {
    if (!videoRef.current || !videoSrc) return;
    const video = videoRef.current;

    const handlePlay = () => {
      video.play().catch((err) => {
        console.warn("⚠️ Autoplay blocked, retrying...", err);
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.play().catch((e) => console.error("❌ Hero autoplay failed:", e));
          }
        }, 150);
      });
    };

    video.addEventListener("canplay", handlePlay);
    if (video.readyState >= 3) {
      handlePlay();
    }

    return () => {
      video.removeEventListener("canplay", handlePlay);
    };
  }, [videoSrc]);

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

  // Use scroll listener with requestAnimationFrame to mute/pause video on mobile
  // and hide video when scrolled past on desktop
  useEffect(() => {
    if (!videoRef.current) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const heroHeight = containerRef.current?.offsetHeight || window.innerHeight;
          const scrolled = window.scrollY;
          // 80% through the hero section
          const threshold = heroHeight * 0.8;
          const isPast = scrolled > threshold;

          setIsVideoVisible((prev) => {
            if (isPast && prev) {
              // Scrolled past 80%: mute + pause
              if (videoRef.current && !videoRef.current.paused) {
                videoRef.current.pause();
              }
              if (videoRef.current) {
                videoRef.current.muted = true;
                setIsMuted(true);
              }
              return false;
            } else if (!isPast && !prev) {
              // Scrolled back: resume (only if hero animation done)
              if (videoRef.current && videoRef.current.paused && isSplit) {
                videoRef.current.play().catch(() => {});
              }
              return true;
            }
            return prev;
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger check immediately

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSplit]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
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
            </div>
          </h2>
        </div>
      </div>

      {/* Right Panel: Showcase Reel */}
      <div 
        className={styles.rightPanel} 
        style={{ 
          opacity: isVideoVisible ? undefined : 0, 
          pointerEvents: isVideoVisible ? 'auto' : 'none' 
        }}
      >
        <div className={styles.videoContainer}>
          <video
            key={videoSrc}
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
