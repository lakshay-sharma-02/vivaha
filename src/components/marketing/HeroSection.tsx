"use client";
import { motion, Variants } from "framer-motion";

const revealVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 50 },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)", 
    y: 0, 
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } 
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-[120vh] w-full flex items-center justify-center px-6 overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-20%" }}
        className="max-w-5xl text-center z-10 pt-20"
      >
        <motion.p variants={revealVariants} className="text-[#d4af37] text-[10px] tracking-[0.3em] uppercase mb-8">
          The Private Institution of Matchmaking
        </motion.p>
        <motion.h1 variants={revealVariants} className="text-5xl md:text-[7rem] font-serif font-light tracking-tight leading-[1.05] text-white mix-blend-difference">
          Where Meaningful <br/> Relationships <span className="italic text-white/80">Begin.</span>
        </motion.h1>
        <motion.p variants={revealVariants} className="mt-10 text-base md:text-lg font-sans font-light tracking-wide text-white/50 max-w-xl mx-auto leading-relaxed">
          AI-powered matchmaking engineered for those who seek uncompromising quality, absolute privacy, and lifelong partnership.
        </motion.p>
        
        <motion.div variants={revealVariants} className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="px-10 py-5 bg-white text-black font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-[#d4af37] transition-colors duration-500 rounded-sm pointer-events-auto">
            Start Your Journey
          </button>
          <button className="px-10 py-5 bg-transparent border border-white/10 text-white font-sans text-[10px] tracking-[0.25em] uppercase hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-500 rounded-sm backdrop-blur-md pointer-events-auto">
            Explore Success Stories
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
