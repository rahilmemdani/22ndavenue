import Link from "next/link";
import styles from "./Footer.module.css";

const quickLinks = [
  { href: "/", label: "The Spotlight" },
  { href: "/talent", label: "The Talent Pool" },
  { href: "/backstage", label: "The Backstage" },
  { href: "/magic", label: "The Magic We Make" },
  { href: "/hype", label: "The Hype Corner" },
  { href: "/connect", label: "Let's Connect" },
];

const services = [
  "Talent Management",
  "Brand Collaborations",
  "Event Representation",
  "Strategic Partnerships",
];

const socials = [
  { label: "Instagram", href: "#", icon: "IG" },
  { label: "YouTube", href: "#", icon: "YT" },
  { label: "LinkedIn", href: "#", icon: "LI" },
  { label: "Twitter", href: "#", icon: "TW" },
];

export function Footer() {
  return (
    <footer className={styles.footer} id="site-footer">
      {/* Top CTA Strip */}
      <div className={styles.ctaStrip}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaHeading}>
            Ready to make <span className={styles.ctaAccent}>magic</span>?
          </h2>
          <p className={styles.ctaSub}>
            Let&apos;s turn your vision into an unforgettable moment.
          </p>
          <Link href="/connect" className={styles.ctaButton} id="footer-cta">
            Start a Conversation
          </Link>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className={styles.main}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoText}>22nd</span>
              <span className={styles.logoAccent}>Avenue</span>
            </Link>
            <p className={styles.tagline}>
              Where Talent Meets The Spotlight. We are a creative talent
              management agency bridging artists, brands, and unforgettable
              experiences.
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

          {/* Quick Links */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Navigate</h3>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Services</h3>
            <ul className={styles.linkList}>
              {services.map((s) => (
                <li key={s}>
                  <span className={styles.serviceItem}>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Get in Touch</h3>
            <div className={styles.contactInfo}>
              <a href="mailto:hello@22ndavenue.com" className={styles.link}>
                hello@22ndavenue.com
              </a>
              <p className={styles.contactText}>Mumbai, India</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} 22nd Avenue Creative Talent Management. All
            rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>
              Privacy Policy
            </a>
            <a href="#" className={styles.bottomLink}>
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
