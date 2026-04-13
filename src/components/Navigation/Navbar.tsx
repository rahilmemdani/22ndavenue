"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "#hero-section", label: "START" },
  { href: "#about-home", label: "ABOUT" },
  { href: "#values-section", label: "VALUES" },
  { href: "#services-section", label: "SERVICES" },
  { href: "#featured-artists", label: "ROSTER" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("#hero-section");
  const [logoError, setLogoError] = useState(false);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className={styles.dock}>
        <div className={styles.capsule}>
          {/* Logo / Brand Section */}
          <div className={styles.brand}>
            {!logoError ? (
              <img
                src="assets/hero/logo.png"
                alt="22nd Avenue"
                className={styles.logoImage}
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className={styles.logoText}>
                22ND<span className={styles.logoAccent}>AVENUE</span>
              </div>
            )}
          </div>

          <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.15)" }} />

          {/* Mobile Menu Trigger */}
          <button
            className={styles.menuToggle}
            onClick={toggleMenu}
          >
            <div className={styles.burger}>
              <span />
              <span />
              <span />
            </div>
            <span>MENU</span>
          </button>

          {/* Desktop Links */}
          <div className={styles.desktopNav}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`${styles.navLinkDesktop} ${activeTab === link.href ? styles.active : ""}`}
                onClick={() => setActiveTab(link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.15)" }} />

          <button className={styles.contactBtn}>CONTACT</button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`${styles.sidebarOverlay} ${isOpen ? styles.sidebarActive : ""}`}>
        <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <ul className={styles.navList}>
          {navLinks.map((link) => (
            <li key={link.href} className={styles.navItem}>
              <a
                href={link.href}
                className={styles.navLinkSidebar}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
