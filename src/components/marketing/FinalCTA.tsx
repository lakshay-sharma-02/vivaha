"use client";
import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section className="py-64 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/5 via-black to-black z-0 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-20%" }}
        className="relative z-10 flex flex-col items-center"
      >
        <h2 className="text-5xl md:text-8xl font-serif font-light text-white mb-16 leading-[1.1]">
          Your Legacy <br/> <span className="italic text-[#d4af37]">Begins Today.</span>
        </h2>
        
        <button className="group relative px-14 py-6 bg-transparent overflow-hidden rounded-sm border border-white/10 backdrop-blur-sm pointer-events-auto">
          <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1] z-0" />
          <span className="relative z-10 text-[10px] font-sans tracking-[0.3em] uppercase text-white group-hover:text-black transition-colors duration-700">
            Request an Invitation
          </span>
        </button>
      </motion.div>
    </section>
  );
}
