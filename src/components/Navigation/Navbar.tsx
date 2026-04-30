/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ChevronDown, Rocket, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useMotionValue, useSpring } from "framer-motion";
import styles from "./Navbar.module.css";

const SocialLink = ({ href, icon: Icon, label, colorClass }: { href: string; icon: any; label: string; colorClass: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 14 });
  const springY = useSpring(y, { stiffness: 160, damping: 14 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 1024 || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.25);
    y.set((clientY - (top + height / 2)) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`${styles.socialLink} ${colorClass}`}
    >
      <div className={styles.socialLinkBg} />
      <Icon className={styles.socialLinkIcon} />
      <span className="sr-only">{label}</span>
    </motion.a>
  );
};

interface NavItem {
  name: string;
  path: string;
  children?: { name: string; path: string }[];
}

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Backstage", path: "/#about-home" },
  { name: "Our Collabs", path: "/#featured-artists" },
  { name: "Showcase", path: "/#showcase-section" },
  { name: "Testimonies", path: "/#testimonials-section" },
  { name: "Services", path: "/#services-section" }
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(null);
  const [isForceOpenAtTop, setIsForceOpenAtTop] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("/");
  const pathname = usePathname() || "/";

  const { scrollY } = useScroll();
  const lastYRef = useRef(0);

  // Scrollspy logic to highlight active section in Navbar
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionIds = navItems
      .filter(item => item.path.startsWith("/#"))
      .map(item => item.path.replace("/#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(`/#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-20% 0px -20% 0px", threshold: 0.2 } 
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("/");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isHovered, setIsHovered] = useState(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startHideTimer = () => {
    if (window.innerWidth < 1024) return;
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      if (!isHovered) {
        setIsHidden(true);
      }
    }, 3000);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastYRef.current;

    if (latest > 30) setIsScrolled(true);
    else setIsScrolled(false);

    if (latest > 100) setIsForceOpenAtTop(false);

    // Desktop logic: Show on scroll up, hide after 3s inactivity
    if (window.innerWidth >= 1024) {
      if (diff < -4 || latest < 100) {
        setIsHidden(false);
        startHideTimer();
      } else if (diff > 4 && latest > 100) {
        setIsHidden(true);
      }
    } else {
      // Mobile logic: Regular show/hide
      if (latest > 100 && diff > 4 && !isMobileMenuOpen) {
        setIsHidden(true);
      } else if (diff < -4 || latest < 100) {
        setIsHidden(false);
      }
    }
    
    lastYRef.current = latest;
  });

  // If hovered, clear timer and show
  useEffect(() => {
    if (isHovered && window.innerWidth >= 1024) {
      setIsHidden(false);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    } else if (!isHovered && !isHidden && window.innerWidth >= 1024) {
      startHideTimer();
    }
  }, [isHovered]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileExpandedIndex(null);
    setIsForceOpenAtTop(false);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  }, [pathname]);

  const isTransparentPage = ["/"].includes(pathname);
  const isHeroVideoPage = ["/"].includes(pathname);
  const shouldHideDesktopNavAtTop = isHeroVideoPage && !isScrolled && !isForceOpenAtTop;
  
  const navbarVariants = {
    top: {
      width: "fit-content",
      minWidth: "auto",
      y: 20,
      borderRadius: "99px",
      backgroundColor: "#000000",
      backdropFilter: "blur(0px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
      paddingTop: "6px",
      paddingBottom: "6px",
      paddingLeft: "12px",
      paddingRight: "12px",
    },
    scrolled: {
      width: "fit-content",
      minWidth: "auto",
      y: 20,
      borderRadius: "99px",
      backgroundColor: "#000000", 
      backdropFilter: "blur(0px)",
      border: "1px solid rgba(255, 255, 255, 0.15)", 
      boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
      paddingTop: "8px",
      paddingBottom: "8px",
      paddingLeft: "12px",
      paddingRight: "12px",
    },
    hiddenTop: {
      width: "fit-content",
      y: -100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4 }
    }
  };

  const mobileNavbarVariants = {
    scrolled: {
      y: 0,
      backgroundColor: "rgba(0, 0, 0, 0.95)", 
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
    }
  };

  return (
    <div className={styles.navSystemWrapper}>
      <motion.div
        className={styles.smartScrollWrapper}
        animate={{ y: isHidden ? "-200px" : "0px" }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* DESKTOP MINIMAL NAV (HERO ONLY) */}
        <AnimatePresence>
          {shouldHideDesktopNavAtTop && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className={styles.desktopMinimalNav}
            >
              <div className={styles.pointerAuto}></div>
              <button
                onClick={() => setIsForceOpenAtTop(true)}
                className={styles.minimalMenuBtn}
              >
                <span className={styles.minimalMenuText}>MENU</span>
                <div className={styles.burgerLines}>
                  <span className={styles.burgerLine1}></span>
                  <span className={styles.burgerLine2}></span>
                  <span className={styles.burgerLine3}></span>
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          variants={navbarVariants}
          initial="top"
          animate={shouldHideDesktopNavAtTop ? "hiddenTop" : (isScrolled || !isTransparentPage ? "scrolled" : "top")}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`${styles.desktopNav} ${shouldHideDesktopNavAtTop ? styles.pointerNone : styles.pointerAuto}`}
          style={{ transformOrigin: "top center" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* LOGO */}
          <Link href="/" className={styles.logoLink}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <img
                src="assets/hero/logo.png"
                alt="22nd Avenue Logo"
                className={`${styles.logoImage} ${styles.logoSmall}`}
              />
            </motion.div>
          </Link>

          {/* DIVIDER */}
          <div className={styles.verticalDivider}></div>

          {/* LINKS */}
          <nav className={styles.desktopLinks}>
            {navItems.map((item, index) => {
              const isActive = pathname === '/' ? activeSection === item.path : pathname === item.path;
              return (
                <div
                  key={item.name}
                  className={styles.navItemWrapper}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Link href={item.path} className={`${styles.navLink} ${styles.navLinkDark} ${isActive ? styles.navLinkActive : ""}`}>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className={styles.activePill}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className={styles.navLinkText}>{item.name}</span>
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* CTA */}
          <div className={styles.ctaWrapper}>
            <Link href="/connect" className={styles.sayHelloBtn}>
              Let&apos;s Talk
            </Link>
          </div>
        </motion.div>

        {/* MOBILE BAR */}
        <motion.div
          variants={mobileNavbarVariants}
          animate={isScrolled || !isTransparentPage ? "scrolled" : "top"}
          className={styles.mobileBar}
        >
          <Link href="/" className={styles.mobileLogoLink}>
            <img
              src="assets/hero/logo.png"
              alt="Logo"
              className={`${styles.mobileLogoImage} ${styles.mobileLogoSmall}`}
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`${styles.mobileMenuBtn} ${styles.mobileMenuBtnDark}`}
          >
            <Menu size={32} />
          </button>
        </motion.div>
      </motion.div>

      {/* MOBILE MENU 90% DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className={styles.mobileBackdrop}
            />

            <motion.div
              className={styles.mobileDrawer}
              initial={{ clipPath: "circle(0px at 100% 0%)" }}
              animate={{ clipPath: "circle(150% at 100% 0%)" }}
              exit={{ clipPath: "circle(0px at 100% 0%)" }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className={styles.mobileDrawerDeco} />
              
              <div className={styles.mobileDrawerContent}>
                <div className={styles.mobileDrawerHeader}>
                  <img src="assets/hero/logo.png" alt="Logo" className={styles.mobileDrawerLogo} />
                  <button onClick={() => setIsMobileMenuOpen(false)} className={styles.mobileCloseBtn}>
                    <X size={28} />
                  </button>
                </div>

                <div className={styles.mobileDrawerLinks}>
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.15 + index * 0.05 }}
                    >
                      <div className={styles.mobileDrawerLinkRow}>
                        <Link
                          href={item.path}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setActiveSection(item.path);
                          }}
                          className={`${styles.mobileDrawerLink} ${
                            (pathname === '/' ? activeSection === item.path : pathname === item.path)
                              ? styles.mobileDrawerLinkActive : ""
                          }`}
                        >
                          {item.name}
                        </Link>
                        {item.children && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setMobileExpandedIndex(mobileExpandedIndex === index ? null : index);
                            }}
                            className={styles.mobileDrawerChevronBtn}
                          >
                            <ChevronDown
                              size={22}
                              className={`${styles.mobileDrawerChevron} ${mobileExpandedIndex === index ? styles.mobileDrawerChevronOpen : ""}`}
                            />
                          </button>
                        )}
                      </div>

                      <AnimatePresence>
                        {item.children && mobileExpandedIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className={styles.mobileDrawerSubLinksWrapper}
                          >
                            <div className={styles.mobileDrawerSubLinks}>
                              {item.children.map((child) => (
                                <Link key={child.path} href={child.path} onClick={() => setIsMobileMenuOpen(false)} className={styles.mobileDrawerSubLink}>
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                <div className={styles.mobileDrawerFooter}>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <Link href="/connect" onClick={() => setIsMobileMenuOpen(false)} className={styles.mobileSayHelloBtn}>
                      Let&apos;s Talk <Rocket className={styles.rocketIcon} />
                    </Link>

                    <div className={styles.socialsRow}>
                      <SocialLink href="#" icon={Facebook} label="Facebook" colorClass={styles.fbColor} />
                      <SocialLink href="#" icon={Instagram} label="Instagram" colorClass={styles.igColor} />
                      <SocialLink href="#" icon={Linkedin} label="LinkedIn" colorClass={styles.inColor} />
                      <SocialLink href="#" icon={Twitter} label="Twitter" colorClass={styles.xColor} />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
