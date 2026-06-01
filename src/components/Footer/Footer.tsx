"use client";

import Link from "next/link";
import { Instagram, Linkedin, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { useContactModal } from "@/components/ui/ContactModalContext";
import styles from "./Footer.module.css";

const socials = [
  {
    label: "Email",
    href: "mailto:experiences@22ndavenue.co.in",
    icon: <Mail size={18} strokeWidth={1.5} />
  },
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

        {/* Main Content Grid (Brand Left, Address Columns Right) */}
        <div className={styles.footerContent}>
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
              Leading entertainment curators, <br /> crafting impact through <span className={styles.goldText}>artist-led experiences</span>.
            </p>
            
            <div className={styles.socialRow}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className={styles.socialIcon}
                  target={s.label !== "Email" ? "_blank" : undefined}
                  rel={s.label !== "Email" ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.addressBlock}>
            <div className={styles.addressHeader}>
              <span className={styles.addressHeaderLabel}>OUR PRESENCE</span>
              <span className={styles.addressHeaderLine}></span>
            </div>
            <div className={styles.addressGrid}>
              {/* Column 1: India (Mumbai) */}
              <a
                href={offices[0].mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.addressCol} ${styles.colIndia} ${styles.addressColHQ}`}
                title={`View address for ${offices[0].city}: ${offices[0].address}`}
              >
                <div className={styles.addressMeta}>
                  <span className={styles.officeRegion}>{offices[0].region}</span>
                  <span className={styles.badgeHQ}>{offices[0].tag}</span>
                </div>
                <div className={styles.cityRow}>
                  <MapPin size={13} className={styles.mapIcon} />
                  <h4 className={styles.officeCity}>{offices[0].city}</h4>
                  <ArrowUpRight size={11} className={styles.cityArrow} />
                </div>
                <p className={styles.officeAddress}>{offices[0].address}</p>
              </a>

              {/* Divider 1 */}
              <div className={`${styles.verticalDivider} ${styles.dividerOne}`}></div>

              {/* Column 2: Australia (Sydney, Melbourne, Gold Coast) */}
              {offices.slice(1, 4).map((office, idx) => (
                <a
                  key={office.city}
                  href={office.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.addressCol} ${styles.colAus} ${
                    idx === 0 ? styles.ausSydney : idx === 1 ? styles.ausMelb : styles.ausGoldCoast
                  }`}
                  title={`View address for ${office.city}: ${office.address}`}
                >
                  <div className={styles.addressMeta}>
                    <span className={styles.officeRegion}>{office.region}</span>
                    {office.tag && <span className={styles.badgeAPAC}>{office.tag}</span>}
                  </div>
                  <div className={styles.cityRow}>
                    <MapPin size={13} className={styles.mapIcon} />
                    <h4 className={styles.officeCity}>{office.city}</h4>
                    <ArrowUpRight size={11} className={styles.cityArrow} />
                  </div>
                  <p className={styles.officeAddress}>{office.address}</p>
                </a>
              ))}

              {/* Divider 2 */}
              <div className={`${styles.verticalDivider} ${styles.dividerTwo}`}></div>

              {/* Column 3: New Zealand (Auckland) */}
              <a
                href={offices[4].mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.addressCol} ${styles.colNZ}`}
                title={`View address for ${offices[4].city}: ${offices[4].address}`}
              >
                <div className={styles.addressMeta}>
                  <span className={styles.officeRegion}>{offices[4].region}</span>
                </div>
                <div className={styles.cityRow}>
                  <MapPin size={13} className={styles.mapIcon} />
                  <h4 className={styles.officeCity}>{offices[4].city}</h4>
                  <ArrowUpRight size={11} className={styles.cityArrow} />
                </div>
                <p className={styles.officeAddress}>{offices[4].address}</p>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        {/* Bottom Row: Copyright */}
        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} 22nd Avenue Talent Management Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
