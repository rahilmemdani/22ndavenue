"use client";

import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";
import { useContactModal } from "@/components/ui/ContactModalContext";
import styles from "./Footer.module.css";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/22ndavenuetalentmanagement/",
    icon: <Instagram size={18} strokeWidth={1.5} />
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/twenty-second-avenue-talent-management-company",
    icon: <Linkedin size={18} strokeWidth={1.5} />
  },
];

export function Footer() {
  const { openModal } = useContactModal();

  return (
    <footer className={styles.footer} id="site-footer">
      {/* Subtle warm ambient glow in background */}
      <div className={styles.ambientGlow}></div>

      <div className={styles.container}>
        {/* CTA section */}
        <div className={styles.ctaStrip}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaHeading}>
              Ready to make <span className={styles.ctaAccent}>magic</span>?
            </h2>
            <p className={styles.ctaSub}>
              Let&apos;s turn your vision into an unforgettable moment.
            </p>
            <button onClick={openModal} className={styles.ctaButton} id="footer-cta">
              Start a Conversation
            </button>
          </div>
        </div>

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
              Where Talent Meets <span className={styles.goldText}>The Spotlight</span>.
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
            <span className={styles.contactLabel}>LET&apos;S CREATE MAGIC</span>
            <a href="mailto:experiences@22ndavenue.co.in" className={styles.email}>
              experiences@22ndavenue.co.in
            </a>
            <p className={styles.location}>Mumbai, India</p>
          </div>
        </div>

        {/* Divider Line */}
        {/* <div className={styles.divider}></div> */}

        {/* Bottom Row: Copyright & Policy Links */}
        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} 22nd Avenue Talent Management Pvt.Ltd. All rights reserved.
          </p>
          {/* <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>
              Privacy Policy
            </a>
            <span className={styles.slash}>/</span>
            <a href="#" className={styles.bottomLink}>
              Terms & Conditions
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
