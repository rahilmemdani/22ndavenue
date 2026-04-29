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
  { name: "Our Story", path: "/#about-home" },
  { name: "Expertise", path: "/#services-section" },
  { name: "Showcase", path: "/#hero-section" },
  { name: "Testimonies", path: "/#testimonials" },
  { name: "Let’s Talk", path: "/#contact" }
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(null);
  const pathname = usePathname() || "/";

  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isNavHoveredRef = useRef(false);
  const [isForceOpenAtTop, setIsForceOpenAtTop] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastYRef.current;
    if (latest > 30) setIsScrolled(true);
    else setIsScrolled(false);

    if (latest > 50 && isForceOpenAtTop) setIsForceOpenAtTop(false);

    if (latest > 100 && diff > 4 && !isMobileMenuOpen) {
      setIsHidden(true);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    } else if (diff < -4 || latest < 100) {
      setIsHidden(false);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      
      if (latest > 100 && !isNavHoveredRef.current) {
        hideTimeoutRef.current = setTimeout(() => {
          if (!isNavHoveredRef.current) setIsHidden(true);
        }, 1500);
      }
    }
    lastYRef.current = latest;
  });

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileExpandedIndex(null);
    setIsForceOpenAtTop(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const handleNavMouseEnter = () => {
    isNavHoveredRef.current = true;
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const handleNavMouseLeave = () => {
    isNavHoveredRef.current = false;
    if (scrollY.get() > 100 && !isHidden) {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = setTimeout(() => {
        if (!isNavHoveredRef.current) setIsHidden(true);
      }, 1500);
    }
  };

  const navbarVariants = {
    top: {
      width: "fit-content",
      minWidth: "760px",
      y: 16,
      borderRadius: "99px",
      backgroundColor: "rgba(0, 0, 0, 0.25)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
      paddingTop: "10px",
      paddingBottom: "10px",
      paddingLeft: "36px",
      paddingRight: "14px",
    },
    scrolled: {
      width: "fit-content",
      minWidth: "800px",
      y: 20,
      borderRadius: "99px",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(24px)",
      borderBottom: "1px solid rgba(255,255,255,0.8)",
      boxShadow: "0 20px 50px -12px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.5)",
      paddingTop: "14px",
      paddingBottom: "14px",
      paddingLeft: "48px",
      paddingRight: "16px",
    },
    hiddenTop: {
      width: "fit-content",
      minWidth: "760px",
      y: -100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4 }
    }
  };

  const isTransparentPage = ["/"].includes(pathname);
  // 22ndAvenue Home hero is a cream background, so we need dark text/logo initially!
  const isDarkNavbar = false; 
  const isHeroVideoPage = ["/"].includes(pathname);
  const shouldHideDesktopNavAtTop = isHeroVideoPage && !isScrolled && !isForceOpenAtTop;

  const mobileNavbarVariants = {
    top: {
      y: 0,
      backgroundColor: "rgba(0, 0, 0, 0.25)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255,255,255,0.1)"
    },
    scrolled: {
      y: 0,
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(0,0,0,0.05)",
      boxShadow: "0 4px 20px -5px rgba(0,0,0,0.05)"
    }
  };

  return (
    <div className={styles.navSystemWrapper}>
      {/* SMART SCROLL WRAPPER */}
      <motion.div
        className={styles.smartScrollWrapper}
        animate={{ y: isHidden ? "-200px" : "0px" }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        onMouseEnter={handleNavMouseEnter}
        onMouseLeave={handleNavMouseLeave}
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

        {/* DESKTOP NAV */}
        <motion.div
          variants={navbarVariants}
          initial="top"
          animate={shouldHideDesktopNavAtTop ? "hiddenTop" : (isScrolled || !isTransparentPage ? "scrolled" : "top")}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`${styles.desktopNav} ${shouldHideDesktopNavAtTop ? styles.pointerNone : styles.pointerAuto}`}
          style={{ transformOrigin: "top center" }}
        >
          {/* LOGO */}
          <Link href="/" className={styles.logoLink}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <img
                src="assets/hero/logo.png"
                alt="22nd Avenue Logo"
                className={`${styles.logoImage} ${isScrolled ? styles.logoSmall : styles.logoLarge} ${isDarkNavbar ? styles.logoInvert : ""}`}
              />
            </motion.div>
          </Link>

          {/* LINKS */}
          <nav className={styles.desktopLinks}>
            {navItems.map((item, index) => {
              const isActive = pathname === item.path || (item.path.startsWith('/#') && pathname === '/');
              return (
                <div
                  key={item.name}
                  className={styles.navItemWrapper}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Link href={item.path} className={`${styles.navLink} ${isDarkNavbar ? styles.navLinkDark : styles.navLinkLight} ${isActive ? styles.navLinkActive : ""}`}>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className={styles.activePill}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className={styles.navLinkText}>{item.name}</span>
                    {item.children && (
                      <ChevronDown className={`${styles.chevron} ${hoveredIndex === index ? styles.chevronOpen : ""} ${isDarkNavbar ? styles.chevronDark : styles.chevronLight}`} />
                    )}
                  </Link>

                  <AnimatePresence>
                    {item.children && hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        className={styles.dropdown}
                      >
                        <div className={styles.dropdownInner}>
                          {item.children.map((child) => (
                            <Link key={child.path} href={child.path} className={styles.dropdownItem}>
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* CTA */}
          <div className={styles.ctaWrapper}>
            <Link href="/#contact" className={styles.sayHelloBtn}>
              CONTACT
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
              className={`${styles.mobileLogoImage} ${isScrolled ? styles.mobileLogoSmall : styles.mobileLogoLarge}`}
              style={{ filter: isDarkNavbar ? "brightness(0) invert(1)" : "none" }}
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`${styles.mobileMenuBtn} ${isDarkNavbar ? styles.mobileMenuBtnDark : styles.mobileMenuBtnLight}`}
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
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`${styles.mobileDrawerLink} ${pathname === item.path ? styles.mobileDrawerLinkActive : ""}`}
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
                    <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)} className={styles.mobileSayHelloBtn}>
                      Let's Talk <Rocket className={styles.rocketIcon} />
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
