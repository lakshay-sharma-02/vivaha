"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function SuccessStoriesSection() {
  return (
    <section className="relative w-full h-screen flex flex-col md:flex-row bg-[#FDFBF7]">
      
      {/* 
        ENVIRONMENT: The Album (Left 50%)
        Untouched. No text.
      */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full relative">
        <Image 
          src="/images/architecture/success_stories.jpg"
          alt="Vivaha Success Stories Album"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* 
        ARCHITECTURAL SURFACE: The Linen Card (Right 50%)
        Solid opaque surface.
      */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24 z-10 bg-[#FDFBF7] relative shadow-[-30px_0_50px_rgba(0,0,0,0.05)]">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-lg space-y-12"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl text-[#2A2621] font-display tracking-tight">
              Ananya & Rahul
            </h2>
            <p className="text-xs text-[#8C7A6B] uppercase tracking-[0.2em] font-medium">
              Mumbai, Maharashtra
            </p>
          </div>
          
          <p className="text-lg md:text-xl text-[#5A534B] font-serif italic leading-relaxed">
            "We found someone who truly understood our family. Our conversations felt natural from the very beginning. It was never about ticking boxes."
          </p>

          <button className="text-[#2A2621] font-bold transition-colors duration-500 flex items-center gap-2 group tracking-widest uppercase text-xs border-b border-[#2A2621]/30 hover:border-[#2A2621] pb-1">
            Open The Album
            <span className="opacity-60 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </motion.div>
      </div>
      
    </section>
  );
}
