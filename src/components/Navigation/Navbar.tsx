"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

// Creative nav labels matching the agency brief
const navLinks = [
  { href: "/#hero-section", label: "The Spotlight", short: "Home" },
  { href: "/#about-home", label: "The Backstage", short: "About" },
  { href: "/#highlights-section", label: "Why Us", short: "Why Us" },
  { href: "/#values-section", label: "Values", short: "Values" },
  { href: "/#services-section", label: "Magic We Make", short: "Services" },
  { href: "/#featured-artists", label: "Talent Pool", short: "Roster" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("#hero-section");
  const [logoError, setLogoError] = useState(false);

  // Track scroll to add backdrop shadow and active tab
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scroll Spy Logic
      let currentActiveId = activeTab;
      for (const link of navLinks) {
        const id = link.href.split("#")[1]; // Get just the ID part
        if (!id) continue;
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          // If the section is currently occupying the middle part of the screen
          if (rect.top <= window.innerHeight / 2.5 && rect.bottom >= window.innerHeight / 2.5) {
            currentActiveId = link.href;
          }
        }
      }

      setActiveTab(currentActiveId);
    };

    // Run once on load
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // No manual handleNavClick needed: Next.js Link handles # hashes correctly

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className={`${styles.dock} ${scrolled ? styles.dockScrolled : ""}`}>
        <div className={styles.capsule}>

          {/* Logo / Brand */}
          <Link href="/" className={styles.brand} onClick={() => setIsOpen(false)}>
            {!logoError ? (
              <img
                src="assets/hero/logo.png"
                alt="22nd Avenue"
                className={styles.logoImage}
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className={styles.logoText}>
                22nd<span className={styles.logoAccent}>Avenue</span>
              </div>
            )}
          </Link>

          <div className={styles.divider} />

          {/* Desktop Links */}
          <div className={styles.desktopNav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLinkDesktop} ${activeTab === link.href ? styles.active : ""}`}
                onClick={() => setActiveTab(link.href)}
              >
                {link.short}
              </Link>
            ))}
          </div>

          <div className={styles.divider} />

          {/* CTA */}
          <Link href="/connect" className={styles.contactBtn}>Let&apos;s Connect</Link>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.menuToggle}
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <div className={`${styles.burger} ${isOpen ? styles.burgerOpen : ""}`}>
              <span />
              <span />
              <span />
            </div>
          </button>

        </div>
      </nav>

      {/* Full-screen Mobile Menu */}
      <div
        className={`${styles.mobileOverlay} ${isOpen ? styles.mobileOverlayOpen : ""}`}
        aria-hidden={!isOpen}
      >
        {/* Mobile menu header with logo */}
        <div className={styles.mobileHeader}>
          <div className={styles.mobileLogo}>
            {!logoError ? (
              <img
                src="assets/hero/logo.png"
                alt="22nd Avenue"
                className={styles.mobileLogoImg}
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className={styles.mobileLogoText}>
                22nd<span className={styles.logoAccent}>Avenue</span>
              </span>
            )}
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 5L5 17M5 5l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <nav className={styles.mobileNav}>
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${activeTab === link.href ? styles.active : ""}`}
              style={{ transitionDelay: isOpen ? `${i * 60 + 100}ms` : "0ms" }}
              onClick={() => {
                setActiveTab(link.href);
                setIsOpen(false);
              }}
            >
              <span className={styles.mobileLinkLabel}>{link.label}</span>
              <span className={styles.mobileLinkSub}>{link.short}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.mobileFooter} style={{ transitionDelay: isOpen ? "450ms" : "0ms" }}>
          <Link href="/connect" className={styles.mobileCtaBtn} onClick={() => setIsOpen(false)}>
            Let&apos;s Connect
          </Link>
          <p className={styles.mobileEmail}>hello@22ndavenue.com</p>
        </div>
      </div>
    </>
  );
}
