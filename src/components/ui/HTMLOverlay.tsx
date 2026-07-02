"use client";

import { motion } from "framer-motion";

const revealVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

export function HTMLOverlay() {
  return (
    <div className="relative z-10 w-full text-white/90 selection:bg-[#d4af37]/30 selection:text-white">
      
      {/* 1. Arrival (Unknown -> Curiosity) */}
      <section className="h-[150vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-20%" }}
          className="max-w-xl"
        >
          <motion.h1 
            variants={revealVariants}
            className="text-5xl md:text-7xl font-serif tracking-widest mb-8 text-[#e8cfa6]"
          >
            VIVAHA
          </motion.h1>
          <motion.p 
            variants={revealVariants}
            className="text-sm md:text-base font-sans font-light tracking-[0.2em] text-white/50 uppercase"
          >
            An Institution of Connection
          </motion.p>
        </motion.div>
      </section>

      {/* 2. Invitation (Wonder) */}
      <section className="h-[150vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-20%" }}
          className="max-w-3xl"
        >
          <motion.h2 
            variants={revealVariants}
            className="text-4xl md:text-6xl font-serif font-light leading-tight text-white/90"
          >
            Not a platform.<br />
            <span className="italic text-[#d4af37]">A private legacy.</span>
          </motion.h2>
        </motion.div>
      </section>

      {/* 3. Discovery (Calm) */}
      <section className="h-[150vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-20%" }}
          className="max-w-3xl"
        >
          <motion.h2 
            variants={revealVariants}
            className="text-3xl md:text-5xl font-serif font-light leading-relaxed text-white/80"
          >
            For those who seek meaning.<br />
            For those who belong.
          </motion.h2>
        </motion.div>
      </section>

      {/* 4. Connection (Trust) - The Signature Moment */}
      <section className="h-[200vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-20%" }}
          className="max-w-2xl pointer-events-none"
        >
          {/* Subtle typography over the converging particles */}
          <motion.p 
            variants={revealVariants}
            className="text-xs md:text-sm font-sans font-light tracking-[0.3em] text-white/40 mb-4"
          >
            04 / THE ALIGNMENT
          </motion.p>
          <motion.h2 
            variants={revealVariants}
            className="text-2xl md:text-4xl font-serif italic text-white/60"
          >
            Where chaos finds clarity.
          </motion.h2>
        </motion.div>
      </section>

      {/* 5. Trust (Belonging) */}
      <section className="h-[150vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-20%" }}
          className="max-w-3xl"
        >
          <motion.h2 
            variants={revealVariants}
            className="text-4xl md:text-6xl font-serif font-light leading-tight text-white/90"
          >
            Absolute discretion.<br />
            Unwavering trust.
          </motion.h2>
        </motion.div>
      </section>

      {/* 6. Legacy (Hope -> Commitment) & 7. Membership (Decision) */}
      <section className="min-h-[150vh] flex flex-col items-center justify-end pb-32 text-center px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-20%" }}
          className="max-w-lg w-full"
        >
          <motion.h2 
            variants={revealVariants}
            className="text-4xl font-serif font-light mb-12 text-[#e8cfa6]"
          >
            Request Membership
          </motion.h2>
          
          <motion.form 
            variants={revealVariants}
            className="flex flex-col gap-6 text-left glass p-10 rounded-2xl shadow-2xl relative overflow-hidden group"
          >
            {/* Subtle glow behind form */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10 flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-white/50">Email Address</label>
              <input 
                type="email" 
                placeholder="Exquire@domain.com" 
                className="bg-transparent border-b border-white/20 py-3 text-white font-serif text-lg focus:outline-none focus:border-[#d4af37] transition-colors placeholder:text-white/20"
              />
            </div>
            
            <button 
              type="button" 
              className="relative z-10 mt-6 overflow-hidden bg-white text-black py-4 rounded font-sans uppercase tracking-[0.15em] text-sm font-medium hover:bg-[#d4af37] hover:text-white transition-all duration-500 ease-out"
            >
              Submit Inquiry
            </button>
            <p className="relative z-10 mt-4 text-center text-xs text-white/30 font-light tracking-wide">
              Membership is strictly by invitation or private review.
            </p>
          </motion.form>
        </motion.div>
      </section>

    </div>
  );
}
