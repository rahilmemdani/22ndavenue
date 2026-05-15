/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./AboutHome.module.css";

import type { StaticImageData } from "next/image";

import AdityaMehra from "../../../public/assets/hero/Director photos/Aditya Mehra.png";
import DaryllSheldon from "../../../public/assets/hero/Director photos/Daryl Sheldon.png";
import ManojGoplani from "../../../public/assets/hero/Director photos/Manoj Gopalani.png";

import { PortableText } from "@portabletext/react";

interface Founder {
  name: string;
  title: string;
  image: string | StaticImageData;
}

interface AboutHomeProps {
  data?: {
    directors: Founder[];
    story: any;
  };
}

const DEFAULT_FOUNDERS: Founder[] = [
  {
    name: "Aditya Mehra",
    title: "Director",
    image: AdityaMehra,
  },
  {
    name: "Daryl Sheldon",
    title: "Director",
    image: DaryllSheldon,
  },
  {
    name: "Manoj Gopalani",
    title: "Director",
    image: ManojGoplani,
  },
];

export function AboutHome({ data }: AboutHomeProps) {
  const founders = data?.directors?.length
    ? data.directors
    : DEFAULT_FOUNDERS;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % founders.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [founders.length, isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % founders.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + founders.length) % founders.length);
  };

  return (
    <section className={styles.section} id="about-home">
      {/* Decorative accent line */}
      <div className={styles.accentLine}></div>

      <div className={styles.container}>
        {/* Large editorial title */}
        <ScrollReveal direction="up" className={styles.titleBlock}>
          <h2 className={styles.title}>
            BEHIND THE <span className={styles.goldText}>SPOTLIGHT</span>
          </h2>
        </ScrollReveal>

        {/* Content area */}
        <div className={styles.contentArea}>
          {/* Image Carousel */}
          <div className={styles.imageCol}>
            <ScrollReveal
              delay={150}
              direction="up"
              className={styles.imageReveal}
            >
              <div 
                className={styles.imageFrame}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className={styles.cornerTL}></span>
                <span className={styles.cornerBR}></span>

                <div className={styles.carouselViewport}>
                  <div
                    className={styles.carouselTrack}
                    style={{
                      transform: `translateX(-${currentSlide * 100}%)`,
                    }}
                  >
                    {founders.map((founder, idx) => (
                      <div key={idx} className={styles.founderSlide}>
                        <img
                          src={
                            typeof founder.image === "string"
                              ? founder.image
                              : founder.image.src
                          }
                          alt={founder.name}
                          className={styles.founderImg}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Founder info */}
                <div className={styles.founderInfoBar}>
                  <div className={styles.founderMeta}>
                    <h4 className={styles.founderName}>
                      {founders[currentSlide]?.name}
                    </h4>

                    <p className={styles.founderRole}>
                      {founders[currentSlide]?.title}
                    </p>
                  </div>

                  <div className={styles.navControls}>
                    <button
                      onClick={prevSlide}
                      className={styles.arrowBtn}
                      aria-label="Previous"
                    >
                      <ArrowLeft size={16} />
                    </button>

                    <div className={styles.slideCounter}>
                      <span className={styles.currentNum}>
                        0{currentSlide + 1}
                      </span>

                      <span className={styles.dividerSlash}>/</span>

                      <span className={styles.totalNum}>
                        0{founders.length}
                      </span>
                    </div>

                    <button
                      onClick={nextSlide}
                      className={styles.arrowBtn}
                      aria-label="Next"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Story section */}
          <div className={styles.storyCol}>
            <ScrollReveal delay={300} direction="up">
              <div className={styles.storyInner}>
                <div className={styles.storyAccent}></div>

                {data?.story ? (
                  <div className={styles.portableTextWrapper}>
                    <PortableText 
                      value={data.story} 
                      components={{
                        marks: {
                          textColor: ({ children, value }: any) => {
                            if (value?.color === 'gold') {
                              return <span className={styles.goldText}>{children}</span>;
                            }
                            return <span>{children}</span>;
                          }
                        }
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <p className={styles.leadCopy}>
                      22nd Avenue was born from a vision to craft world-class
                      experiences in entertainment, founded by Aditya Mehra,
                      Daryl Sheldon and Manoj Gopalani.
                    </p>

                    <p className={styles.bodyCopy}>
                      Under{" "}
                      <span className={styles.goldText}>
                        Manoj&apos;s leadership
                      </span>
                      , what started as an idea soon evolved into a{" "}
                      <span className={styles.goldText}>
                        trusted name
                      </span>{" "}
                      in an ever-evolving industry.
                    </p>

                    <p className={styles.bodyCopy}>
                      Our mission is simple: to{" "}
                      <span className={styles.goldText}>
                        redefine industry norms
                      </span>{" "}
                      and{" "}
                      <span className={styles.goldText}>
                        stay ahead of the curve
                      </span>
                      .
                    </p>
                  </>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}