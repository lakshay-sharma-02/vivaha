"use client";

import { motion } from "framer-motion";

export function FamilySection() {
  const principles = [
    { title: "Respect", description: "Every individual makes their own decisions." },
    { title: "Transparency", description: "Families understand the journey together." },
    { title: "Privacy", description: "Personal information remains protected." },
    { title: "Communication", description: "Open conversations build stronger relationships." },
  ];

  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center px-6 text-center bg-[#FFFDF9] overflow-hidden">
      {/* Lighting System: Golden living room sunlight from a window, shifting softly as if clouds are passing */}
      <motion.div 
        initial={{ opacity: 0.4, scale: 1 }}
        animate={{ opacity: 0.7, scale: 1.05 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[60%] h-full bg-[radial-gradient(ellipse_at_center_right,_rgba(255,235,180,0.2)_0%,_transparent_60%)] pointer-events-none z-0 blur-3xl" 
      />
      
      {/* Environmental Storytelling: Curtain shadow swaying in a gentle morning breeze */}
      <motion.div 
        initial={{ skewX: -6, opacity: 0.5, x: 0 }}
        animate={{ skewX: -8, opacity: 0.6, x: -10 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-black/[0.02] to-transparent pointer-events-none z-0 blur-2xl transform origin-top mix-blend-multiply" 
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-stretch lg:text-left gap-16 w-full pt-12">
        {/* Left: Editorial Photography - Living Room Warmth */}
        <div className="w-full lg:w-1/2 flex flex-col order-2 lg:order-1 relative">
          <div className="w-full h-[500px] lg:h-[600px] bg-[#F5F2EC] rounded-[var(--radius-xl)] flex items-center justify-center text-[var(--color-text-secondary)] shadow-inner overflow-hidden relative">
            <span className="text-sm font-medium tracking-wide mix-blend-multiply opacity-50">Natural Living Room Photography</span>
            
            {/* Sun flare over the image placeholder drifting slowly */}
            <motion.div 
              initial={{ y: "-10%", opacity: 0.3 }}
              animate={{ y: "5%", opacity: 0.5 }}
              transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
              className="absolute top-0 left-0 w-full h-[150%] bg-gradient-to-b from-white/40 via-transparent to-transparent pointer-events-none transform -rotate-12" 
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-12 order-1 lg:order-2">
          <div className="space-y-6">
            {/* Engraved Typography */}
            <h2 
              className="text-4xl md:text-5xl text-[var(--color-text-primary)] font-display tracking-tight leading-tight"
              style={{ textShadow: "0 1px 1px rgba(255,255,255,1), 0 -1px 1px rgba(0,0,0,0.03)" }}
            >
              Designed For<br />Families.
            </h2>
            <p className="text-md md:text-lg text-[var(--color-text-secondary)] max-w-[600px] leading-relaxed">
              Vivaha supports both individuals and families throughout the matchmaking journey. Every relationship remains based on mutual understanding and consent.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {principles.map((principle, index) => (
              <div key={index} className="flex flex-col space-y-3 group border-l border-black/[0.05] pl-4 transition-colors duration-700 hover:border-[var(--color-primary-300)]">
                <h3 className="text-lg font-medium text-[var(--color-text-primary)]">
                  {principle.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Continuity Transition: Golden living room transitions into the soft paper of the Invitation room */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#FDFBF7] to-transparent z-0 pointer-events-none" />
    </section>
  );
}
