"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HowItWorksSection() {
  const steps = [
    { num: "1", title: "Create Profile", desc: "Help others understand you." },
    { num: "2", title: "Verification", desc: "Identity and profile review for your safety." },
    { num: "3", title: "Discover", desc: "Meaningful information and shared values." },
    { num: "4", title: "Conversations", desc: "Respectful and secure interactions." },
    { num: "5", title: "Build a Journey", desc: "The journey continues offline." },
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col bg-[#F4F1EA]">
      
      {/* 
        ENVIRONMENT: The Pergola Walkway (Top 55%) 
        Completely unobstructed photograph. No text floats here.
      */}
      <div className="w-full h-[55vh] relative">
        <Image 
          src="/images/architecture/how_it_works.jpg"
          alt="Vivah Garden Pathway"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* 
        ARCHITECTURAL SURFACE: The Physical Ground (Bottom 45%)
        A solid, opaque pathway block.
      */}
      <div className="relative w-full bg-[#EBE6DF] flex flex-col items-center pt-16 pb-24 px-6 z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
          
          <div className="space-y-4 text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-[#2A2621] font-display tracking-tight">
              A Thoughtful Journey
            </h2>
            <p className="text-sm text-[#5A534B] font-medium tracking-wide">
              We guide you through every step with care and clarity.
            </p>
          </div>

          {/* Stepping Stones embedded in the solid ground surface */}
          <div className="relative w-full max-w-5xl mx-auto">
            {/* Subtle connecting line etched into the ground surface */}
            <div className="absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-[#8C7A6B]/20 pointer-events-none" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-4 relative z-10">
              {steps.map((step, idx) => (
                <motion.div 
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1.2, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center space-y-6 flex-1"
                >
                  {/* Physical Marker */}
                  <div 
                    className="w-16 h-20 flex flex-col items-center justify-center relative bg-[#F4F1EA] shadow-[0_10px_20px_-5px_rgba(20,18,15,0.1),_inset_0_2px_4px_rgba(255,255,255,1)] border border-[#8C7A6B]/15"
                    style={{ borderRadius: "2px 2px 8px 8px" }}
                  >
                    <div className="text-sm font-serif text-[#8C7A6B] italic mb-1">{step.num}</div>
                    <div className="w-6 h-6 rounded-full border border-[#8C7A6B]/20" />
                  </div>
                  
                  {/* Text resting directly on the solid CSS ground */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-display text-[#2A2621] tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#5A534B] leading-relaxed max-w-[140px] mx-auto font-medium">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
