"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-[#1A1814]">
      
      {/* PHYSICAL ARCHITECTURE: The Forest Pathway & Curtains */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/architecture/hero_entrance.jpg"
          alt="Vivaha Garden Entrance"
          fill
          priority
          className="object-cover object-center"
        />
        
        {/* DIRECTIONAL LIGHTING: Morning sunlight cutting across from the top right */}
        <motion.div 
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[70%] h-full bg-gradient-to-bl from-[#FFF8ED]/70 via-[#FFF8ED]/10 to-transparent mix-blend-overlay pointer-events-none transform skew-x-12 origin-top-right"
        />
        {/* Soft natural bounce lighting on the left wall/curtain */}
        <div className="absolute top-1/4 left-0 w-[40%] h-[60%] bg-[radial-gradient(ellipse_at_left,_rgba(255,250,240,0.15)_0%,_transparent_70%)] pointer-events-none mix-blend-screen" />
        
        {/* LOCALIZED MASK: Protects the typography hierarchy without fogging the floor */}
        <div className="absolute top-[10%] left-0 w-[70%] h-[80%] bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none blur-3xl" />
      </div>

      {/* FOREGROUND PRESENCE: Optical depth (out-of-focus framing extremely close to the lens) */}
      <div className="absolute top-0 left-[-5%] w-[10%] h-full bg-gradient-to-r from-black/40 to-transparent blur-2xl pointer-events-none z-20" />
      <div className="absolute top-0 right-[-5%] w-[10%] h-full bg-gradient-to-l from-black/40 to-transparent blur-2xl pointer-events-none z-20" />

      {/* ARCHITECTURAL NAVIGATION: Etched into the top shadow of the entrance */}
      <nav className="absolute top-0 left-0 w-full px-8 md:px-16 py-12 z-30 flex items-center justify-between pointer-events-auto">
        <div 
          className="text-2xl font-display text-[#FDFBF7] tracking-widest uppercase"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 0 16px rgba(0,0,0,0.5)" }}
        >
          Vivaha
        </div>
        <div className="hidden lg:flex items-center space-x-12">
          {["How It Works", "Discover", "Success Stories", "Membership", "About Us"].map((link) => (
            <a 
              key={link} 
              href="#" 
              className="text-sm font-medium text-white/90 hover:text-white transition-colors tracking-wide"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center">
          <button className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
            Create Profile
          </button>
        </div>
      </nav>

      {/* CONTENT: Asymmetrical, Editorial Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col items-start pt-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="max-w-2xl space-y-8"
        >
          {/* Headline perfectly sharp, lit by the environment */}
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl xl:text-[84px] tracking-tight text-[#FDFBF7] font-display leading-[1.05]"
            style={{ textShadow: "0 4px 16px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.8)" }}
          >
            Meaningful<br />relationships<br />begin with trust.
          </h1>
          <p 
            className="text-lg md:text-xl text-white/90 font-medium max-w-[500px] font-body leading-relaxed"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
          >
            Vivaha is a thoughtfully designed space where individuals and families discover lifelong partnerships with confidence and dignity.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-12"
        >
          {/* MATERIAL BUTTON: Warm Limestone / Embossed Paper */}
          <button 
            className="px-10 h-14 rounded-full text-md font-medium transition-all duration-500 group relative overflow-hidden"
            style={{ 
              backgroundColor: "#F2EFE9", 
              color: "#2A2621",
              boxShadow: "0 12px 30px -8px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(0,0,0,0.08), inset 0 2px 4px rgba(255,255,255,0.9)" 
            }}
          >
            <span className="relative z-10">Create Profile</span>
            {/* Natural material shine moving across the button */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out pointer-events-none" />
          </button>
          
          <button 
            className="text-white/90 font-medium hover:text-white transition-colors duration-500 flex items-center gap-2 group"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
          >
            How Vivaha Works 
            <span className="opacity-60 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </motion.div>
      </div>
      
    </section>
  );
}
