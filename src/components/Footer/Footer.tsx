"use client";

import Link from "next/link";
import { Instagram, Linkedin, ArrowUpRight } from "lucide-react";
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

const offices = [
  {
    city: "Mumbai",
    region: "India",
    tag: "Global HQ",
    address: "22nd Avenue Talent Management Pvt. Ltd, 16th Floor, Aston Building, Sundervan Complex, Andheri West, Mumbai 400053",
    mapLink: "https://www.google.com/maps/search/?api=1&query=22nd+Avenue+Talent+Management+Aston+Building+Andheri+West+Mumbai",
    isHQ: true,
  },
  {
    city: "Sydney",
    region: "Australia",
    tag: "APAC HQ",
    address: "14th Floor, 3 Parramatta Square, Parramatta NSW 2150",
    mapLink: "https://www.google.com/maps/search/?api=1&query=3+Parramatta+Square+Parramatta+NSW+2150+Australia",
    isHQ: true,
  },
  {
    city: "Melbourne",
    region: "Australia",
    address: "5, 3-70 Main Street, Pakenham, VIC 3810",
    mapLink: "https://www.google.com/maps/search/?api=1&query=3-70+Main+Street+Pakenham+VIC+3810+Australia",
  },
  {
    city: "Gold Coast",
    region: "Australia",
    address: "16, Gunyah Grove, Ashmore, QLD 4214",
    mapLink: "https://www.google.com/maps/search/?api=1&query=16+Gunyah+Grove+Ashmore+QLD+4214+Australia",
  },
  {
    city: "Auckland",
    region: "New Zealand",
    address: "6 Mappin Place, Chatswood, Auckland 0626",
    mapLink: "https://www.google.com/maps/search/?api=1&query=6+Mappin+Place+Chatswood+Auckland+New+Zealand",
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
          </div>
        </div>

        {/* Structured Address Grid (Integrated & Cohesive) */}
        <div className={styles.divider}></div>

        <div className={styles.addressBlock}>
          <div className={styles.addressHeader}>
            <span className={styles.addressHeaderLabel}>Our Presence</span>
            <span className={styles.addressHeaderLine}></span>
          </div>

          <div className={styles.addressGrid}>
            {offices.map((office) => (
              <a
                key={office.city}
                href={office.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.addressCol} ${office.isHQ ? styles.addressColHQ : ""}`}
              >
                <div className={styles.addressMeta}>
                  <span className={styles.officeRegion}>{office.region}</span>
                  {office.tag && (
                    <span className={office.city === "Mumbai" ? styles.badgeHQ : styles.badgeAPAC}>
                      {office.tag}
                    </span>
                  )}
                </div>

                <div className={styles.cityRow}>
                  <h4 className={styles.officeCity}>{office.city}</h4>
                  <ArrowUpRight size={12} className={styles.cityArrow} />
                </div>

                <p className={styles.addressText}>{office.address}</p>
              </a>
            ))}
          </div>
        </div>

        <div className={styles.divider}></div>

        {/* Bottom Row: Copyright & Policy Links */}
        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} 22nd Avenue Talent Management Pvt.Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
