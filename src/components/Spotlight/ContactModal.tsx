"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { useContactModal } from "@/components/ui/ContactModalContext";
import styles from "./ContactModal.module.css";

type ContactType = "Artists" | "Careers" | "Business";

export function ContactModal() {
  const { isOpen, closeModal } = useContactModal();
  const [activeType, setActiveType] = useState<ContactType>("Business");
  const [isClosing, setIsClosing] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsClosing(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close with animation
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      closeModal();
      setIsClosing(false);
    }, 250);
  }, [closeModal]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ""}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.modal} ${isClosing ? styles.modalClosing : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleBlock}>
            <h2 className={styles.title}>
              Let&apos;s <span className={styles.gold}>Talk</span>
            </h2>
            <p className={styles.subtitle}>
              Whether you&apos;re an artist, brand, or talent — we&apos;d love to hear from you.
            </p>
          </div>
          <button
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Close contact form"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Type Selector */}
          <div className={styles.typeSelector}>
            {(["Artists", "Careers", "Business"] as ContactType[]).map((type) => (
              <button
                key={type}
                className={`${styles.typeBtn} ${activeType === type ? styles.typeBtnActive : ""}`}
                onClick={() => setActiveType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Full Name</label>
              <input type="text" className={styles.input} placeholder="John Doe" required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address</label>
              <input type="email" className={styles.input} placeholder="john@example.com" required />
            </div>

            {activeType === "Artists" && (
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Portfolio / Social Link</label>
                <input type="url" className={styles.input} placeholder="https://instagram.com/yourhandle" />
              </div>
            )}

            {activeType === "Careers" && (
              <>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Position Interested In</label>
                  <input type="text" className={styles.input} placeholder="e.g. Talent Manager" />
                </div>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Upload Resume / CV</label>
                  <div className={styles.fileInputWrapper}>
                    <input type="file" className={styles.fileInput} accept=".pdf,.doc,.docx" />
                  </div>
                </div>
              </>
            )}

            {activeType === "Business" && (
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Company / Brand Name</label>
                <input type="text" className={styles.input} placeholder="Your Company Ltd." />
              </div>
            )}

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Your Message</label>
              <textarea
                className={styles.textarea}
                placeholder={`Tell us about your ${activeType === "Artists" ? "art" : activeType === "Careers" ? "experience" : "business enquiry"}...`}
                required
              ></textarea>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info Bar */}
        <div className={styles.contactBar}>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>Email</span>
            <a href="mailto:hello@22ndavenue.in" className={styles.contactValue}>hello@22ndavenue.in</a>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>Location</span>
            <span className={styles.contactValue}>Mumbai, India</span>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>Follow</span>
            <a href="#" className={styles.contactValue}>@22ndavenue_mgmt</a>
          </div>
        </div>
      </div>
    </div>
  );
}
