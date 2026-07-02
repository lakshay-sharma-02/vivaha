"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function TrustSection() {
  const trustItems = [
    {
      id: "01",
      title: "Government ID",
      desc: "Every profile requires official identification.",
    },
    {
      id: "02",
      title: "Education Proof",
      desc: "Academic credentials are independently verified.",
    },
    {
      id: "03",
      title: "Family Trust",
      desc: "Designed to include families in the journey.",
    },
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-[#FAF9F7]">
      
      {/* PHYSICAL ARCHITECTURE: The Bronze Floral Arch */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/architecture/trust_arch.jpg"
          alt="Vivaha Trust Arch"
          fill
          className="object-cover object-center"
        />
        {/* Gallery lighting atmosphere overlay */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
        
        {/* Soft overhead museum spotlight hitting the floor in the center */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70%] h-[70%] bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.5)_0%,_transparent_70%)] pointer-events-none mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center space-y-20 mt-16">
        <div className="space-y-6">
          <h2 
            className="text-4xl md:text-5xl text-[#2A2621] font-display tracking-tight"
            style={{ textShadow: "0 2px 8px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.5)" }}
          >
            Verified. Authentic. Secure.
          </h2>
          <p className="text-md md:text-lg text-[#4A453E] font-medium max-w-[640px] mx-auto leading-relaxed drop-shadow-sm">
            We believe that every introduction should be genuine. Our comprehensive verification process ensures that you spend time connecting with real people, not algorithms.
          </p>
        </div>
        
        {/* Trust Stones (Replacing Cards) resting beneath the Arch */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {trustItems.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-10 rounded-[var(--radius-xl)] bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_30px_60px_-20px_rgba(42,38,33,0.1),_inset_0_1px_0_rgba(255,255,255,1)] flex flex-col items-center text-center space-y-6 group"
            >
              <div className="relative z-10 space-y-4 flex flex-col items-center">
                <div className="text-sm font-medium text-[#8F7D6B] tracking-widest uppercase">
                  {item.id}
                </div>
                <h3 className="text-xl font-semibold text-[#2A2621] tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-[#4A453E] leading-relaxed max-w-[200px]">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CONTINUITY: The wooden floor of the arch blends perfectly into the next garden pathway section */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FAF9F7] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#F9F8F6] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
