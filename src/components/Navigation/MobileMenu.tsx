"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./MobileMenu.module.css";

const navLinks = [
  { href: "/", label: "The Spotlight", creative: "Home" },
  { href: "/talent", label: "The Talent Pool", creative: "Artists" },
  { href: "/backstage", label: "The Backstage", creative: "About" },
  { href: "/magic", label: "The Magic We Make", creative: "Services" },
  { href: "/hype", label: "The Hype Corner", creative: "Press" },
  { href: "/connect", label: "Let's Connect", creative: "Contact" },
];

const socials = [
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
      id="mobile-menu"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      {/* Dramatic curtain panels that wipe in */}
      <div className={styles.curtain1} />
      <div className={styles.curtain2} />

      {/* Gold accent line — draws across on open */}
      <div className={styles.accentLine} />

      {/* Close area — tap backdrop to close */}
      <button className={styles.backdropClose} onClick={onClose} aria-label="Close menu" />

      <div className={styles.content}>

        {/* Brand wordmark in corner */}
        <div className={styles.brandMark}>
          <span className={styles.brandText}>22ND</span>
          <span className={styles.brandDot}>.</span>
        </div>

        {/* Nav links */}
        <nav className={styles.nav} aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${pathname === link.href ? styles.active : ""}`}
              onClick={onClose}
              style={{ "--i": i } as React.CSSProperties}
              id={`mobile-nav-${link.href.replace("/", "") || "home"}`}
            >
              {/* Index number */}
              <span className={styles.linkIndex}>0{i + 1}</span>

              <span className={styles.linkInner}>
                <span className={styles.linkLabel}>{link.label}</span>
                <span className={styles.linkSub}>{link.creative}</span>
              </span>

              {/* Hover arrow */}
              <span className={styles.linkArrow}>→</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.dividerLine} />
          <div className={styles.socials}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label}
              </a>
            ))}
          </div>
          <p className={styles.email}>hello@22ndavenue.com</p>
        </div>
      </div>
    </div>
  );
}
