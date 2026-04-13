"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./FeaturedArtists.module.css";

const artists = [
  { name: "Artful Dodger", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop" },
  { name: "Bryson Tiller", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop" },
  { name: "Chris Brown", image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=600&auto=format&fit=crop" },
  { name: "DJ Snoopadelic", image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=600&auto=format&fit=crop" },
  { name: "Fetty Wap", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
  { name: "J & The Rest", image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=600&auto=format&fit=crop" },
  { name: "MIGOS", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop" },
  { name: "Paris Hilton", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop" },
  { name: "Amber Davies", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" },
  { name: "Future", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop" }
];

// Trimmed to 10 artists so it neatly fits a 100vh 5x2 grid without overflowing

export function FeaturedArtists() {
  return (
    <section className={`snap-section ${styles.section}`} id="featured-artists">
      <div className={styles.wrapper}>
        <div className={styles.logoRow}>
          <ScrollReveal direction="up">
            <h2 className={styles.agencyTitle}>OUR ROSTER</h2>
          </ScrollReveal>
        </div>

        <div className={styles.grid}>
          {artists.map((artist, i) => (
            <ScrollReveal key={artist.name} delay={(i % 5) * 50}>
              <div className={styles.artistCard}>
                <div className={styles.imageWrapper}>
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className={styles.artistImage}
                  />
                </div>
                <div className={styles.nameStrip}>
                  <span className={styles.artistName}>{artist.name}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
