"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function CompatibilityEngine() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="py-40 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 font-light">The Compatibility Engine</h2>
        <p className="text-white/40 text-[9px] tracking-[0.3em] uppercase">Live Interactive Demonstration</p>
      </div>

      <motion.div 
        style={{ scale, opacity }}
        className="relative w-full aspect-video rounded-xl border border-white/10 bg-[#040405] overflow-hidden flex items-center justify-center"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Radial Glowing Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/10 blur-[100px] rounded-full" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-32">
          
          {/* Profile A */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center p-1 relative">
              <svg className="w-full h-full -rotate-90 absolute inset-0" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <motion.circle cx="50" cy="50" r="48" fill="none" stroke="#d4af37" strokeWidth="2" strokeDasharray="300" initial={{ strokeDashoffset: 300 }} whileInView={{ strokeDashoffset: 60 }} transition={{ duration: 2, ease: "easeOut" }} viewport={{ once: true }} />
              </svg>
              <div className="w-full h-full rounded-full bg-white/10 overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" className="w-full h-full object-cover opacity-80" alt="Profile" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-white/80 font-serif">A. Sharma</p>
              <p className="text-white/40 text-[9px] uppercase tracking-widest mt-1">Venture Capital</p>
            </div>
          </div>

          {/* Alignment Score */}
          <div className="flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-6xl font-serif text-[#d4af37] font-light"
            >
              94<span className="text-3xl">%</span>
            </motion.div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-white/50 mt-4">Psychological Alignment</p>
            
            {/* Connecting lines */}
            <div className="absolute top-1/2 left-[30%] right-[30%] h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent -translate-y-1/2 -z-10" />
          </div>

          {/* Profile B */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center p-1 relative">
              <svg className="w-full h-full -rotate-90 absolute inset-0" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <motion.circle cx="50" cy="50" r="48" fill="none" stroke="#d4af37" strokeWidth="2" strokeDasharray="300" initial={{ strokeDashoffset: 300 }} whileInView={{ strokeDashoffset: 40 }} transition={{ duration: 2, ease: "easeOut" }} viewport={{ once: true }} />
              </svg>
              <div className="w-full h-full rounded-full bg-white/10 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" className="w-full h-full object-cover opacity-80" alt="Profile" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-white/80 font-serif">M. Kapoor</p>
              <p className="text-white/40 text-[9px] uppercase tracking-widest mt-1">Corporate Law</p>
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
