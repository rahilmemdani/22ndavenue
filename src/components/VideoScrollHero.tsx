"use client";

import { useRef, useEffect, useCallback } from "react";
import styles from "./VideoScrollHero.module.css";

/* ── Helpers ───────────────────────────────────────────────── */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const remap = (v: number, a: number, b: number) => clamp((v - a) / (b - a), 0, 1);

/* ── Text panels (scroll-synced) ──────────────────────────── */
interface Panel {
  enterAt: number; // progress → start fade-in
  holdAt: number;  // progress → fully visible
  exitAt: number;  // progress → start fade-out
  goneAt: number;  // progress → fully gone
  headline: string[];    // each string is a <span> line
  sub: string;
  accent?: string;
  isGold?: boolean;      // gold sub-label styling
}

const PANELS: Panel[] = [
  {
    enterAt: 0,    holdAt: 0.01, exitAt: 0.06, goneAt: 0.13,
    headline: ["Creative", "Talent"],
    sub: "22nd Avenue Management",
    accent: "Scroll to Discover",
    isGold: true,
  },
  {
    enterAt: 0.14, holdAt: 0.20, exitAt: 0.30, goneAt: 0.36,
    headline: ["Where Beauty", "Meets Vision"],
    sub: "Editorial storytelling at its finest",
  },
  {
    enterAt: 0.38, holdAt: 0.44, exitAt: 0.54, goneAt: 0.60,
    headline: ["Talent for the", "Modern Era"],
    sub: "Redefining representation for today's world",
  },
  {
    enterAt: 0.62, holdAt: 0.68, exitAt: 0.78, goneAt: 0.84,
    headline: ["A New Standard", "in Craft"],
    sub: "From runway to reel — we manage every moment",
  },
  {
    enterAt: 0.86, holdAt: 0.91, exitAt: 0.97, goneAt: 1.0,
    headline: ["22nd", "Avenue"],
    sub: "The agency behind the faces you remember",
    isGold: true,
  },
];

/* ── Panel opacity / Y helpers ─────────────────────────────── */
function panelOpacity(p: Panel, progress: number): number {
  if (progress < p.enterAt) return 0;
  if (progress < p.holdAt)  return remap(progress, p.enterAt, p.holdAt);
  if (progress < p.exitAt)  return 1;
  if (progress < p.goneAt)  return 1 - remap(progress, p.exitAt, p.goneAt);
  return 0;
}
function panelY(p: Panel, progress: number): number {
  if (progress < p.enterAt) return 32;
  if (progress < p.holdAt)  return (1 - remap(progress, p.enterAt, p.holdAt)) * 32;
  if (progress < p.exitAt)  return 0;
  if (progress < p.goneAt)  return -remap(progress, p.exitAt, p.goneAt) * 20;
  return -20;
}

/* ── Component ─────────────────────────────────────────────── */
const VideoScrollHero = () => {
  const sectionRef     = useRef<HTMLDivElement>(null);
  const videoRef       = useRef<HTMLVideoElement>(null);
  const videoWrapRef   = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrollGuideRef = useRef<HTMLDivElement>(null);
  const panelRefs      = useRef<(HTMLDivElement | null)[]>([]);

  /* Scroll state (all refs → no re-renders during RAF) */
  const smoothProg  = useRef(0);
  const targetProg  = useRef(0);
  const scrubMode   = useRef(false);
  const hasScrolled = useRef(false);
  const rafRef      = useRef<number>(0);

  /* Stable helpers */
  const getPanelOpacity = useCallback(panelOpacity, []);
  const getPanelY       = useCallback(panelY, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video   = videoRef.current;
    if (!section || !video) return;

    /* ── RAF loop ─────────────────────────────────────────── */
    const tick = () => {
      smoothProg.current = lerp(smoothProg.current, targetProg.current, 0.065);
      const p = smoothProg.current;

      /* Scrub video */
      if (scrubMode.current && video.readyState >= 2 && video.duration) {
        video.currentTime = clamp(p * video.duration, 0, video.duration);
      }

      /* Zoom parallax on video wrapper */
      if (videoWrapRef.current) {
        const scale = 1 + p * 0.07;
        videoWrapRef.current.style.transform = `scale(${scale})`;
      }

      /* Gold progress bar */
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${p})`;
      }

      /* Hide scroll-indicator early */
      if (scrollGuideRef.current) {
        scrollGuideRef.current.style.opacity = String(Math.max(0, 1 - p * 18));
      }

      /* Text panels – purely DOM driven, zero React renders */
      PANELS.forEach((panel, i) => {
        const el = panelRefs.current[i];
        if (!el) return;
        el.style.opacity   = String(getPanelOpacity(panel, p));
        el.style.transform = `translateY(${getPanelY(panel, p)}px)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    /* ── Scroll listener ──────────────────────────────────── */
    const onScroll = () => {
      const rect          = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const scrolled      = -rect.top;
      targetProg.current  = clamp(scrolled / sectionHeight, 0, 1);

      if (!hasScrolled.current && targetProg.current > 0.004) {
        hasScrolled.current = true;
        scrubMode.current   = true;
        video.pause();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [getPanelOpacity, getPanelY]);

  return (
    <section id="hero-section" ref={sectionRef} className={styles.hero}>
      <div className={styles.stickyCanvas}>

        {/* ── Full-screen video ── */}
        <div ref={videoWrapRef} className={styles.videoWrap}>
          <video
            ref={videoRef}
            className={styles.video}
            src="/assets/hero/Short_D_Graphical_Story_Video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          {/* Cinematic overlays */}
          <div className={styles.overlayDark} />
          <div className={styles.vignetteTop} />
          <div className={styles.vignetteBottom} />
          <div className={styles.vignetteSides} />
        </div>

        {/* ── Text stage ── */}
        <div className={styles.textStage} aria-live="polite">
          {PANELS.map((panel, i) => (
            <div
              key={i}
              ref={(el) => { panelRefs.current[i] = el; }}
              className={styles.textPanel}
              style={{ opacity: i === 0 ? 1 : 0, transform: "translateY(0px)" }}
            >
              {panel.accent && (
                <span className={styles.accentPill}>{panel.accent}</span>
              )}
              <h1 className={styles.headline}>
                {panel.headline.map((line, j) => (
                  <span key={j} className={styles.headlineLine}>{line}</span>
                ))}
              </h1>
              <p className={`${styles.sub} ${panel.isGold ? styles.subGold : ""}`}>
                {panel.sub}
              </p>
            </div>
          ))}
        </div>

        {/* ── Section counter dots ── */}
        <div className={styles.dotTrack} aria-hidden>
          {PANELS.map((_, i) => (
            <div key={i} className={styles.dot} />
          ))}
        </div>

        {/* ── Gold progress bar ── */}
        <div className={styles.progressTrack} aria-hidden>
          <div ref={progressBarRef} className={styles.progressBar} />
        </div>

        {/* ── Scroll indicator ── */}
        <div ref={scrollGuideRef} className={styles.scrollGuide} aria-hidden>
          <span className={styles.scrollLabel}>Scroll to explore</span>
          <div className={styles.scrollChevrons}>
            <span /><span /><span />
          </div>
        </div>

      </div>
    </section>
  );
};

export default VideoScrollHero;
