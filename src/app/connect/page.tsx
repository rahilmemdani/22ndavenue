"use client";

import styles from "./page.module.css";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function ConnectPage() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <div className={styles.ambientGlow} />
        
        <div className={styles.container}>
          <ScrollReveal direction="up">
            <span className={styles.eyebrow}>Let&apos;s Connect</span>
            <h1 className={styles.title}>
              Start A <span className={styles.goldText}>Conversation</span>
            </h1>
            <p className={styles.subtitle}>
              Whether you are an artist ready to take the next step, a brand looking for the perfect creative partner, or press reaching out. Our DMs are open.
            </p>
          </ScrollReveal>

          <div className={styles.contentGrid}>
            <ScrollReveal delay={200} className={styles.contactInfo}>
              <div className={styles.infoBlock}>
                <h3 className={styles.infoTitle}>General Inquiries</h3>
                <a href="mailto:hello@22ndavenue.com" className={styles.infoLink}>hello@22ndavenue.com</a>
              </div>
              
              <div className={styles.infoBlock}>
                <h3 className={styles.infoTitle}>Talent & Booking</h3>
                <a href="mailto:booking@22ndavenue.com" className={styles.infoLink}>booking@22ndavenue.com</a>
              </div>

              <div className={styles.infoBlock}>
                <h3 className={styles.infoTitle}>Headquarters</h3>
                <p className={styles.infoText}>Mumbai, India<br />Available Worldwide</p>
              </div>

              <div className={styles.socialRow}>
                <a href="#" className={styles.socialBtn}>IG</a>
                <a href="#" className={styles.socialBtn}>TW</a>
                <a href="#" className={styles.socialBtn}>LI</a>
                <a href="#" className={styles.socialBtn}>YT</a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400} className={styles.formContainer}>
              <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Your Name</label>
                  <input type="text" id="name" className={styles.input} placeholder="John Doe" required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email Address</label>
                  <input type="email" id="email" className={styles.input} placeholder="john@example.com" required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="interest" className={styles.label}>Area of Interest</label>
                  <select id="interest" className={styles.select} required>
                    <option value="" disabled selected>Select an option</option>
                    <option value="booking">Book an Artist</option>
                    <option value="representation">Seeking Representation</option>
                    <option value="brand">Brand Collaboration</option>
                    <option value="press">Press / Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Message</label>
                  <textarea id="message" className={styles.textarea} placeholder="Tell us about your project..." rows={5} required />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Send Message
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
