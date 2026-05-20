import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./GlobalFootprint.module.css";

interface GlobalFootprintProps {
  data?: {
    image: string;
  };
}

export function GlobalFootprint({ data }: GlobalFootprintProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal direction="up">
          <h2 className={styles.title}>
            OUR GLOBAL <span className={styles.goldText}>FOOTPRINT</span>
          </h2>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={200} className={styles.imageWrapper}>
          <img 
            src={data?.image || "/assets/hero/Global map.png"} 
            alt="Global Footprint Map" 
            className={styles.mapImage}
            loading="lazy"
            decoding="async"
            width={1400}
            height={700}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
