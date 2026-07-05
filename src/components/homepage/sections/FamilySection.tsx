"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function FamilySection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row bg-[#F4F1EA]">
      
      {/* 
        ARCHITECTURAL SURFACE: The Limestone Wall (Left 50%)
        A solid, opaque surface.
      */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24 z-10 bg-[#F4F1EA] relative shadow-[30px_0_50px_rgba(0,0,0,0.05)]">
        <div className="relative z-10 w-full max-w-lg space-y-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className="text-xs font-bold text-[#8C7A6B] tracking-widest uppercase border-b border-[#8C7A6B]/20 pb-2 inline-block">
              Stories That Inspire
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#2A2621] font-display tracking-tight leading-[1.05]">
              Designed for families.
            </h2>
            <p className="text-sm md:text-base text-[#5A534B] font-medium max-w-[420px] font-body leading-relaxed">
              Because every meaningful relationship includes the ones who matter most. We have created a secure environment where families can participate with dignity and respect.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="text-[#2A2621] font-bold transition-colors duration-500 flex items-center gap-2 group tracking-widest uppercase text-xs border-b border-[#2A2621]/30 hover:border-[#2A2621] pb-1">
              Read Stories
              <span className="opacity-60 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* 
        ENVIRONMENT: The Living Room (Right 50%)
        Untouched. No text. No gradients.
      */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative">
        <Image 
          src="/images/architecture/family.jpg"
          alt="Vivah Living Room"
          fill
          className="object-cover object-center"
        />
      </div>

    </section>
  );
}
