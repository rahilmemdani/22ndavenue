"use client";

import { ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children?: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
  delay?: number;
  threshold?: number;
  width?: "fit-content" | "100%";
}

export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  threshold = 0.15,
  width = "auto" as "fit-content" | "100%",
}: ScrollRevealProps) {


  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const initial = (() => {
    switch (direction) {
      case "up": return { opacity: 0, y: isMobile ? 10 : 40 };
      case "left": return { opacity: 0, x: isMobile ? -10 : -40 };
      case "right": return { opacity: 0, x: isMobile ? 10 : 40 };
      default: return { opacity: 0 };
    }
  })();

  const animate = (() => {
    switch (direction) {
      case "up": return { opacity: 1, y: 0 };
      case "left": return { opacity: 1, x: 0 };
      case "right": return { opacity: 1, x: 0 };
      default: return { opacity: 1 };
    }
  })();

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration: 0.8,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`scroll-reveal-wrapper ${className}`}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
}
