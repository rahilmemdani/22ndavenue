"use client";

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
  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
      id="mobile-menu"
    >
      <div className={styles.content}>
        <nav className={styles.nav}>
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${
                pathname === link.href ? styles.active : ""
              }`}
              onClick={onClose}
              style={{ transitionDelay: isOpen ? `${i * 60 + 200}ms` : "0ms" }}
              id={`mobile-nav-${link.href.replace("/", "") || "home"}`}
            >
              <span className={styles.linkLabel}>{link.label}</span>
              <span className={styles.linkSub}>{link.creative}</span>
            </Link>
          ))}
        </nav>

        <div
          className={styles.footer}
          style={{ transitionDelay: isOpen ? "600ms" : "0ms" }}
        >
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
