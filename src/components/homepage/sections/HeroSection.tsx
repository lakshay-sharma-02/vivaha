"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/shared/ui";

export function HeroSection() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-[#FAF9F7]">
      
      {/* PHYSICAL ARCHITECTURE: The Forest Pathway & Curtains */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/architecture/hero_entrance.jpg"
          alt="Vivaha Garden Entrance"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Atmospheric Diffusion: Creates realistic air depth and ensures typography is legible while preserving the architecture */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F7]/60 via-transparent to-[#FAF9F7]/20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-white/25 backdrop-blur-[2px]" />
        
        {/* Morning Sunlight Ray (Environmental Motion) */}
        <motion.div 
          initial={{ opacity: 0.3, scale: 1 }}
          animate={{ opacity: 0.6, scale: 1.05 }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-[radial-gradient(circle_at_center,_rgba(255,250,240,0.8)_0%,_transparent_60%)] pointer-events-none mix-blend-screen"
        />
      </div>

      {/* CONTENT: Resting inside the physical space */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-10 mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="space-y-8"
        >
          {/* Ambient Occlusion Typography */}
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#2A2621] font-display leading-[1.1]"
            style={{ textShadow: "0 2px 4px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.6)" }}
          >
            Meaningful relationships<br />begin with trust.
          </h1>
          <p className="text-lg md:text-xl text-[#4A453E] font-medium max-w-[640px] mx-auto font-body leading-relaxed drop-shadow-sm">
            Vivaha is a thoughtfully designed space where individuals and families discover lifelong partnerships with confidence and dignity.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center gap-6 pt-4"
        >
          <Button variant="primary" size="lg" className="px-10 h-14 text-md bg-[#2A2621] text-[#FDFBF7] shadow-[0_10px_30px_-10px_rgba(42,38,33,0.4)] hover:shadow-[0_15px_40px_-10px_rgba(42,38,33,0.5)] transition-all duration-700">
            Create Profile
          </Button>
          <Button variant="text" size="lg" className="text-[#2A2621] font-medium hover:text-black transition-colors duration-500" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}>
            How Vivaha Works
          </Button>
        </motion.div>
      </div>
      
      {/* PATHWAY CONTINUITY: The stone floor physically transitions into the Trust Gallery */}
      <div className="absolute bottom-0 left-0 w-full h-56 bg-gradient-to-t from-[#FAF9F7] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
