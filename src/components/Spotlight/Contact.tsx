"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./Contact.module.css";

type ContactType = "Artists" | "Careers" | "Business";

export function Contact() {
  const [activeType, setActiveType] = useState<ContactType>("Business");

  return (
    <section className={styles.section} id="contact-section">
      <div className={styles.backgroundGlow} />
      <div className={styles.backgroundGlow2} />
      
      <div className={styles.container}>
        {/* INFO SIDE */}
        <div className={styles.infoSide}>
          <ScrollReveal direction="left">
            <h2 className={styles.title}>
              Let&apos;s <span className={styles.gold}>Talk</span>
            </h2>
            <p className={styles.description}>
              Whether you&apos;re an artist looking for management, a brand seeking collaboration, or a talent looking to join our team.
            </p>

            <div className={styles.contactDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Email us</span>
                <a href="mailto:hello@22ndavenue.in" className={styles.detailValue}>hello@22ndavenue.in</a>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Visit us</span>
                <span className={styles.detailValue}>Mumbai, India</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Follow</span>
                <a href="#" className={styles.detailValue}>@22ndavenue_mgmt</a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* FORM SIDE */}
        <div className={styles.formSide}>
          <ScrollReveal direction="right" delay={200}>
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
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
