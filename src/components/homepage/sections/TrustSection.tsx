"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function TrustSection() {
  const trustItems = [
    {
      id: "Verified",
      title: "Government ID",
      desc: "Every profile is verified with official identification.",
    },
    {
      id: "Authentic",
      title: "Education Proof",
      desc: "Academic credentials are independently verified.",
    },
    {
      id: "Secure",
      title: "Family Trust",
      desc: "Designed to include families in the journey.",
    },
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col bg-[#F4F1EA]">
      
      {/* 
        ENVIRONMENT: The Gallery (Top 60%)
        Completely unobstructed photograph. No text floats here. 
      */}
      <div className="w-full h-[60vh] relative">
        <Image 
          src="/images/architecture/trust_arch.jpg"
          alt="Vivaha Trust Arch"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* 
        ARCHITECTURAL SURFACE: The Travertine Plinth (Bottom 40%)
        A solid, opaque physical surface where the trust pillars and typography rest.
      */}
      <div className="relative w-full bg-[#EBE6DF] flex flex-col items-center pt-16 pb-32 px-6 z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-8 items-start">
          
          {/* Surface Typography */}
          <div className="w-full lg:w-1/3 space-y-6 lg:pr-12 border-b lg:border-b-0 lg:border-r border-[#8C7A6B]/20 pb-8 lg:pb-0">
            <h2 className="text-3xl md:text-4xl text-[#2A2621] font-display tracking-tight leading-[1.1]">
              Verified.<br/>Authentic.<br/>Secure.
            </h2>
            <p className="text-sm text-[#5A534B] font-medium leading-relaxed">
              We believe every introduction should be genuine. Our verification ensures you connect with real people.
            </p>
          </div>
          
          {/* Physical Stone Pillars resting on the plinth */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustItems.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-8 flex flex-col space-y-8 bg-[#F4F1EA] shadow-[0_15px_30px_rgba(20,18,15,0.05),_inset_0_2px_4px_rgba(255,255,255,0.8)] rounded-sm border border-[#8C7A6B]/10"
              >
                <div className="w-10 h-10 rounded-full border border-[#8C7A6B]/30 flex items-center justify-center text-[#8C7A6B] font-serif italic text-sm">
                  {idx + 1}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-display text-[#2A2621] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5A534B] leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
