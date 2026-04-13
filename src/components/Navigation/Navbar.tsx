"use client";

import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "#hero-section", label: "START" },
  { href: "#about-home", label: "ABOUT" },
  { href: "#values-section", label: "VALUES" },
  { href: "#services-section", label: "SERVICES" },
  { href: "#featured-artists", label: "ROSTER" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("#hero-section");

  // A very basic scroll active section detector
  // Due to snap-scroll, this can just check what is mostly in view
  useEffect(() => {
    const handleScroll = () => {
      // In a real snap container, we check the intersection observer
      // But for simplicity in this demo, let's keep it simple
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={styles.dock}>
      <div className={styles.capsule}>
        <div className={styles.brand}>22ND</div>
        <div className={styles.divider} />
        <ul className={styles.navItems}>
          {navLinks.map((link) => (
            <li key={link.href} className={styles.navItem}>
              <a 
                href={link.href} 
                className={`${styles.navLink} ${activeSection === link.href ? styles.active : ""}`}
                onClick={() => setActiveSection(link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.divider} />
        <button className={styles.contactBtn}>CONTACT</button>
      </div>
    </nav>
  );
}
