"use client";
import { motion } from "framer-motion";

export function EditorialWhy() {
  return (
    <section className="py-40 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
      <div className="flex-1 space-y-12">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-20%" }}
          className="text-4xl md:text-[3.5rem] font-serif font-light text-white leading-[1.1]"
        >
          We rejected the algorithm.<br/>
          <span className="text-white/40 italic">We built an institution.</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-20%" }}
          className="text-white/50 font-sans font-light tracking-wide leading-loose max-w-lg"
        >
          Modern matchmaking has been reduced to infinite scrolling and superficial choices. We believe finding a life partner requires absolute discretion, deep psychological understanding, and curated quality over endless quantity. Vivaha is an exclusive haven designed to foster real, enduring alignment.
        </motion.p>
      </div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-20%" }}
        className="flex-1 w-full aspect-[4/5] rounded-sm overflow-hidden relative border border-white/5 bg-white/[0.02]"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#040405] via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-[#d4af37]/5 backdrop-blur-3xl z-0" />
        {/* Placeholder for a premium architectural/marble texture or high-end fashion shot */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale contrast-125 mix-blend-overlay" />
      </motion.div>
    </section>
  );
}
