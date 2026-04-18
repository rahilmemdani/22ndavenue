"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./FeaturedArtists.module.css";

const artists = [
  { name: "Artful Dodger", role: "Music Artist", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop" },
  { name: "Bryson Tiller", role: "Singer–Songwriter", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop" },
  { name: "Chris Brown", role: "Performer", image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=600&auto=format&fit=crop" },
  { name: "DJ Snoopadelic", role: "DJ & Producer", image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=600&auto=format&fit=crop" },
  { name: "Fetty Wap", role: "Hip-Hop Artist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
  { name: "J & The Rest", role: "Band", image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=600&auto=format&fit=crop" },
  { name: "MIGOS", role: "Hip-Hop Trio", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=600&auto=format&fit=crop" },
  { name: "Paris Hilton", role: "Media Personality", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop" },
  { name: "Amber Davies", role: "TV Personality", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" },
  { name: "Future", role: "Rap Artist", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop" },
];

// Two rows for infinite marquee
const row1 = artists.slice(0, 5);
const row2 = artists.slice(5);

export function FeaturedArtists() {
  return (
    <section className={styles.section} id="featured-artists">
      <div className={styles.ambientGlow} />
      <div className={styles.wrapper}>

        {/* Header */}
        <div className={styles.logoRow}>
          <ScrollReveal direction="up">
            <span className={styles.eyebrow}>Who we work with</span>
            <h2 className={styles.sectionTitle}>
              The Talent<br />
              <span className={styles.goldText}>Pool</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              A curated collective of world-class talent across music, entertainment, and media.
            </p>
          </ScrollReveal>
        </div>

        {/* Scrolling Grid Rows — infinite marquee */}
        <div className={styles.rowsWrapper}>
          {/* Row 1 — scrolls left */}
          <div className={styles.scrollRow}>
            <div className={styles.scrollTrack} data-dir="left">
              {[...row1, ...row1, ...row1].map((artist, i) => (
                <ArtistCard key={`r1-${i}`} artist={artist} />
              ))}
            </div>
          </div>
          {/* Row 2 — scrolls right */}
          <div className={styles.scrollRow}>
            <div className={styles.scrollTrack} data-dir="right">
              {[...row2, ...row2, ...row2].map((artist, i) => (
                <ArtistCard key={`r2-${i}`} artist={artist} />
              ))}
            </div>
          </div>
        </div>

        {/* Counter */}
        <div className={styles.rosterCount}>
          <ScrollReveal direction="up">
            <span className={styles.countNumber}>{artists.length}+</span>
            <span className={styles.countLabel}>Artists in our roster</span>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}

function ArtistCard({ artist }: { artist: typeof artists[0] }) {
  return (
    <div className={styles.artistCard}>
      <div className={styles.imageWrapper}>
        <img src={artist.image} alt={artist.name} className={styles.artistImage} />
        <div className={styles.artistOverlay} />
      </div>
      <div className={styles.nameStrip}>
        <span className={styles.artistRole}>{artist.role}</span>
        <span className={styles.artistName}>{artist.name}</span>
      </div>
    </div>
  );
}
