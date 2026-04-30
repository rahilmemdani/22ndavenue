/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./AboutHome.module.css";

const FOUNDERS = [
  {
    name: "Aditya Mehra",
    title: "Director",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Daryl Sheldon",
    title: "Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Manoj Gopalani",
    title: "Director",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"
  }
];

export function AboutHome() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % FOUNDERS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + FOUNDERS.length) % FOUNDERS.length);
  };

  return (
    <section className={styles.section} id="about-home">

      {/* Decorative accent line */}
      <div className={styles.accentLine}></div>

      <div className={styles.container}>

        {/* Large editorial title — spans full width */}
        <ScrollReveal direction="up" className={styles.titleBlock}>
          <h2 className={styles.title}>
            BEHIND THE <span className={styles.goldText}>SPOTLIGHT</span>
          </h2>
          {/* <div className={styles.titleUnderline}></div> */}
        </ScrollReveal>

        {/* Content area: Image + Story */}
        <div className={styles.contentArea}>

          {/* Image / Carousel — takes the dominant visual space */}
          <div className={styles.imageCol}>
            <ScrollReveal delay={150} direction="up" className={styles.imageReveal}>
              <div className={styles.imageFrame}>
                {/* Decorative corner marks */}
                <span className={styles.cornerTL}></span>
                <span className={styles.cornerBR}></span>

                <div className={styles.carouselViewport}>
                  <div
                    className={styles.carouselTrack}
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {FOUNDERS.map((founder, idx) => (
                      <div key={idx} className={styles.founderSlide}>
                        <img
                          src={founder.image}
                          alt={founder.name}
                          className={styles.founderImg}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Founder info — overlaid at bottom */}
                <div className={styles.founderInfoBar}>
                  <div className={styles.founderMeta}>
                    <h4 className={styles.founderName}>{FOUNDERS[currentSlide].name}</h4>
                    <p className={styles.founderRole}>{FOUNDERS[currentSlide].title}</p>
                  </div>
                  <div className={styles.navControls}>
                    <button onClick={prevSlide} className={styles.arrowBtn} aria-label="Previous">
                      <ArrowLeft size={16} />
                    </button>
                    <div className={styles.slideCounter}>
                      <span className={styles.currentNum}>0{currentSlide + 1}</span>
                      <span className={styles.dividerSlash}>/</span>
                      <span className={styles.totalNum}>0{FOUNDERS.length}</span>
                    </div>
                    <button onClick={nextSlide} className={styles.arrowBtn} aria-label="Next">
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Story text — sits alongside with editorial spacing */}
          <div className={styles.storyCol}>
            <ScrollReveal delay={300} direction="up">
              <div className={styles.storyInner}>
                <div className={styles.storyAccent}></div>
                <p className={styles.leadCopy}>
                  22nd Avenue was born from a vision to craft world-class experiences in entertainment, founded by Aditya Mehra, Daryl Sheldon and Manoj Gopalani.
                </p>
                <p className={styles.bodyCopy}>
                  Under <span className={styles.goldText}>Manoj&apos;s leadership</span>, what started as an idea soon evolved into a <span className={styles.goldText}>trusted name</span> in an ever-evolving industry, one that understands both the <span className={styles.goldText}>art and the precision</span> behind great entertainment.
                </p>
                <p className={styles.bodyCopy}>
                  Our mission is simple: to <span className={styles.goldText}>redefine industry norms</span> and <span className={styles.goldText}>stay ahead of the curve</span>. Over the years we&apos;ve built <span className={styles.goldText}>lasting relationships</span> with <span className={styles.goldText}>renowned talent</span> across the global stage.
                </p>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
