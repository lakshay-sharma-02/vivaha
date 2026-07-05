"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative w-full h-screen flex flex-col md:flex-row bg-[#EAE5DF] overflow-hidden">
      
      {/* 
        ARCHITECTURAL SURFACE: The Limestone Column (Left 40%) 
        This is a physical, 100% opaque surface. The text belongs here.
      */}
      <div className="w-full md:w-[40%] h-full flex flex-col justify-center px-8 md:px-16 z-10 bg-[#EAE5DF] shadow-[20px_0_40px_rgba(0,0,0,0.15)] relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <div className="w-12 h-[1px] bg-[#8C7A6B]/40" />
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#2A2621] font-display tracking-tight leading-[1.05]">
            A thoughtful space for meaningful connections.
          </h1>
          
          <p className="text-sm md:text-base text-[#5A534B] font-medium leading-relaxed max-w-[320px]">
            Designed for those who value authenticity, family, and deep respect in their search for a life partner.
          </p>

          <button className="group mt-12 flex items-center gap-4 text-xs font-bold text-[#2A2621] uppercase tracking-[0.2em] transition-all duration-300">
            <span className="border-b border-[#2A2621]/30 pb-1 group-hover:border-[#2A2621] transition-colors">
              Enter The Estate
            </span>
            <span className="w-8 h-[1px] bg-[#2A2621]/30 group-hover:bg-[#2A2621] group-hover:w-12 transition-all duration-500" />
          </button>
        </motion.div>
      </div>

      {/* 
        ENVIRONMENT: The Entrance (Right 60%)
        Completely untouched photography. Zero text overlaid. Zero dark gradients.
      */}
      <div className="w-full md:w-[60%] h-[50vh] md:h-full relative">
        <Image 
          src="/images/architecture/hero_entrance.jpg"
          alt="Vivah Estate Entrance"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

    </section>
  );
}
