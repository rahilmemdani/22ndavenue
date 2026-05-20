"use client";

import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";
import styles from "./Footer.module.css";

const socials = [
  { 
    label: "Instagram", 
    href: "https://www.instagram.com/22ndavenuetalentmanagement/", 
    icon: <Instagram size={18} strokeWidth={1.5} /> 
  },
  { 
    label: "LinkedIn", 
    href: "https://www.linkedin.com/in/twenty-second-avenue-talent-management-company/", 
    icon: <Linkedin size={18} strokeWidth={1.5} /> 
  },
];

export function Footer() {
  return (
    <footer className={styles.footer} id="site-footer">
      <div className={styles.container}>
        {/* Top Separator Line */}
        <div className={styles.topDivider}></div>

        {/* Top Row: Brand & Contact Info */}
        <div className={styles.topRow}>
          {/* Brand Info (Left) */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <img
                src="/assets/hero/logo.png"
                alt="22nd Avenue Logo"
                className={styles.footerLogo}
              />
            </Link>
            <p className={styles.tagline}>
              Where Talent Meets The Spotlight.
            </p>
            <div className={styles.socialRow}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className={styles.socialIcon}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact (Right) */}
          <div className={styles.contact}>
            <h3 className={styles.colTitle}>Get in Touch</h3>
            <a href="mailto:experiences@22ndavenue.co.in" className={styles.email}>
              experiences@22ndavenue.co.in
            </a>
          </div>
        </div>

        {/* Divider Line */}
        <div className={styles.divider}></div>

        {/* Bottom Row: Copyright & Policy Links */}
        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} 22nd Avenue Talent Management Pvt.Ltd. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>
              Privacy Policy
            </a>
            <span className={styles.slash}>/</span>
            <a href="#" className={styles.bottomLink}>
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
