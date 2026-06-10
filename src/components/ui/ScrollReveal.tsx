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
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // On mobile: no spatial movement — only fade opacity to avoid the upward jerk
  const getInitial = () => {
    if (isMobile) return { opacity: 0 };
    switch (direction) {
      case "up": return { opacity: 0, y: 40 };
      case "left": return { opacity: 0, x: -40 };
      case "right": return { opacity: 0, x: 40 };
      default: return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    if (isMobile) return { opacity: 1 };
    switch (direction) {
      case "up": return { opacity: 1, y: 0 };
      case "left": return { opacity: 1, x: 0 };
      case "right": return { opacity: 1, x: 0 };
      default: return { opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, amount: threshold }}
      transition={{ 
        duration: isMobile ? 0.5 : 0.8, 
        delay: delay / 1000, // delay is passed in ms previously, Framer expects seconds
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
}
