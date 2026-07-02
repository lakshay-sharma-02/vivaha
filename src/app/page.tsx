"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./vivaha.module.css";
import Lenis from "lenis";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1.2, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );

  return (
    <main className={styles.main} ref={containerRef}>
      <div className={styles.threadVertical} />

      {/* SCENE 1: Arrival */}
      <section className={`${styles.scene} ${styles.scene1}`}>
        <div className={styles.contentWrapper}>
          <FadeIn>
            <p className={styles.sans} style={{ marginBottom: "2rem", opacity: 0.6 }}>Vivaha</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1>The beginning of<br />someone&apos;s love story.</h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className={styles.wovenThread} style={{ margin: "4rem auto" }} />
          </FadeIn>
        </div>
      </section>

      {/* SCENE 2: Why it's difficult */}
      <section className={styles.scene}>
        <div className={styles.contentWrapper}>
          <FadeIn>
            <h2>Because forever deserves<br />more than endless swiping.</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ marginTop: "2rem", marginInline: "auto" }}>
              Finding the right person has become a game of metrics and algorithms. 
              We swipe through lives in seconds, hoping for a spark in a sea of noise. 
              But meaningful relationships aren&apos;t built on volume. They are built on understanding.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* SCENE 3: Introduce Vivaha */}
      <section className={`${styles.scene} ${styles.sceneDark}`}>
        <div className={styles.contentWrapper}>
          <FadeIn>
            <div className={styles.splitContent}>
              <div style={{ flex: 1 }}>
                <p className={styles.sans} style={{ opacity: 0.5, marginBottom: "1rem" }}>A Thoughtful Guide</p>
                <h3>Technology should quietly<br />disappear into the background.</h3>
                <p>
                  Vivaha is not a software product you use to filter through matches. 
                  It is a calm, intentional space designed to guide you toward the person 
                  who truly aligns with your future. We listen to the unspoken nuances 
                  of your life and introduce you to those who understand them.
                </p>
              </div>
              <div style={{ flex: 1 }}>
                <div className={styles.imageContainer}>
                  <img src="/images/arrival_scene_1782999627161.jpg" alt="Soft linen texture in warm light" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SCENE 4: Meaningful Compatibility */}
      <section className={styles.scene}>
        <div className={styles.contentWrapper}>
          <FadeIn>
            <h2>Every meaningful relationship<br />begins with understanding.</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ marginTop: "2rem", marginInline: "auto" }}>
              We don&apos;t match based on superficial data points. We seek to understand 
              your values, your dreams, your family expectations, and your habits. 
              Because true compatibility is found in shared silence just as much as in shared conversation.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
             <div className={styles.wovenThread} style={{ margin: "4rem auto 0" }} />
          </FadeIn>
        </div>
      </section>

      {/* SCENE 5: Stories instead of profiles */}
      <section className={styles.scene}>
        <div className={styles.contentWrapper}>
          <FadeIn>
            <div className={`${styles.splitContent} ${styles.reverse}`}>
              <div style={{ flex: 1 }}>
                <p className={styles.sans} style={{ opacity: 0.5, marginBottom: "1rem" }}>Moments over metrics</p>
                <h3>&quot;I never miss Sunday breakfast.&quot;</h3>
                <p>
                  People are not feature lists. They are a collection of habits, beliefs, and quiet moments. 
                  On Vivaha, you won&apos;t see a resume. You will see stories. You will learn that they still write birthday letters, 
                  that they dream of living near the mountains, and that their parents are their best friends.
                </p>
              </div>
              <div style={{ flex: 1 }}>
                <div className={styles.imageContainer}>
                  <img src="/images/moments_coffee_1782999639198.jpg" alt="Two coffee cups in morning sunlight" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SCENE 6: Families */}
      <section className={`${styles.scene} ${styles.sceneDark}`}>
        <div className={styles.contentWrapper}>
          <FadeIn>
            <div className={styles.splitContent}>
              <div style={{ flex: 1 }}>
                <p className={styles.sans} style={{ opacity: 0.5, marginBottom: "1rem" }}>Generations</p>
                <h3>Honoring roots while<br />growing new branches.</h3>
                <p>
                  Marriage is the coming together of two individuals, and the blending of two families. 
                  Vivaha respects the delicate balance between modern values and traditional warmth, 
                  ensuring your family feels as confident in your choice as you do.
                </p>
              </div>
              <div style={{ flex: 1 }}>
                <div className={styles.imageContainer}>
                  <img src="/images/families_gathering_1782999657901.jpg" alt="Family gathering around a wooden table" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SCENE 7: Trust */}
      <section className={styles.scene}>
        <div className={styles.contentWrapper}>
          <FadeIn>
            <h2>Built on absolute trust.</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ marginTop: "2rem", marginInline: "auto" }}>
              In a space where the stakes are this high, authenticity is paramount. 
              Every individual is verified. Every interaction is private. 
              We protect your journey so you can focus entirely on what matters.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* SCENE 8: Life after */}
      <section className={styles.scene}>
        <div className={styles.contentWrapper}>
          <FadeIn>
            <div className={styles.splitContent}>
              <div style={{ flex: 1 }}>
                <p className={styles.sans} style={{ opacity: 0.5, marginBottom: "1rem" }}>The Future</p>
                <h3>The smallest shared moments<br />often become lifelong memories.</h3>
                <p>
                  Imagine the quiet evenings, the morning coffee, the celebrations, and the 
                  challenges faced together. We are not just helping you find a match. 
                  We are helping you imagine a life.
                </p>
              </div>
              <div style={{ flex: 1 }}>
                <div className={styles.imageContainer}>
                  <img src="/images/life_after_1782999667571.jpg" alt="Peaceful modern home living room" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SCENE 9: Final Invitation */}
      <section className={styles.scene}>
        <div className={styles.contentWrapper}>
          <FadeIn>
             <svg className={styles.finalThread} viewBox="0 0 100 300" preserveAspectRatio="none">
               <motion.path 
                 d="M 40 0 Q 60 150 50 300" 
                 initial={{ pathLength: 0, opacity: 0 }}
                 whileInView={{ pathLength: 1, opacity: 1 }}
                 viewport={{ once: true, margin: "-20%" }}
                 transition={{ duration: 3, ease: "easeInOut" }}
               />
               <motion.path 
                 d="M 60 0 Q 40 150 50 300" 
                 initial={{ pathLength: 0, opacity: 0 }}
                 whileInView={{ pathLength: 1, opacity: 1 }}
                 viewport={{ once: true, margin: "-20%" }}
                 transition={{ duration: 3, ease: "easeInOut", delay: 0.2 }}
               />
             </svg>
          </FadeIn>
          <FadeIn delay={0.5}>
            <h2>Some journeys are<br />worth taking slowly.</h2>
          </FadeIn>
          <FadeIn delay={0.8}>
            <button className={styles.ctaButton}>
              Begin Your Story
            </button>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
