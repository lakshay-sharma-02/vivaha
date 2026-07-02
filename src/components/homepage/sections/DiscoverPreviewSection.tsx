"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function DiscoverPreviewSection() {
  const portraits = [
    { id: 1, name: "Ananya", age: 28, city: "Mumbai", src: "/images/placeholders/woman-1.jpg", size: "large", rotation: "-2deg" },
    { id: 2, name: "Karan", age: 31, city: "Delhi", src: "/images/placeholders/man-1.jpg", size: "medium", rotation: "1deg" },
    { id: 3, name: "Rohan", age: 29, city: "Pune", src: "/images/placeholders/man-2.jpg", size: "medium", rotation: "-1deg" },
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col bg-[#F4F1EA]">
      
      {/* 
        ENVIRONMENT: The Portrait Hall (Top 50%)
        Completely unobstructed photograph. 
      */}
      <div className="w-full h-[50vh] relative">
        <Image 
          src="/images/architecture/discover.jpg"
          alt="Vivaha Portrait Gallery"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* 
        ARCHITECTURAL SURFACE: The Display Table (Bottom 50%)
        A solid, opaque cream surface. Typography and portraits rest physically here, overlapping the edge.
      */}
      <div className="relative w-full bg-[#F4F1EA] pt-32 pb-24 px-6 z-10 border-t border-[#8C7A6B]/20">
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-16">
          
          {/* Surface Typography (Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-1/3 space-y-8"
          >
            <h2 className="text-4xl md:text-5xl text-[#2A2621] font-display tracking-tight leading-[1.1]">
              Discover<br />meaningful<br />profiles.
            </h2>
            <p className="text-sm text-[#5A534B] font-medium leading-relaxed">
              Curated profiles. Real people. Shared values. Explore the gallery of those seeking authentic partnership.
            </p>
            
            <button className="text-[#2A2621] font-bold transition-colors duration-500 flex items-center gap-2 group tracking-widest uppercase text-xs border-b border-[#2A2621]/30 hover:border-[#2A2621] pb-1">
              Explore Gallery 
              <span className="opacity-60 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </motion.div>

          {/* Physical Portraits Resting on the Table (Right) 
              We use negative top margin to make them physically lean against the top photograph
          */}
          <div className="w-full md:w-2/3 relative h-[400px] flex items-end justify-center -mt-64">
            {portraits.map((portrait, idx) => (
              <motion.div
                key={portrait.id}
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: portrait.rotation }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, delay: idx * 0.2, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute flex flex-col bg-[#FDFBF7] p-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3),_inset_0_2px_4px_rgba(255,255,255,1)] border border-[#8C7A6B]/15 ${
                  portrait.size === "large" ? "w-[280px] h-[380px] z-20 bottom-0 left-1/2 -translate-x-1/2" : 
                  idx === 1 ? "w-[200px] h-[280px] z-10 left-[10%] bottom-[40px]" : 
                  "w-[200px] h-[280px] z-10 right-[10%] bottom-[40px]"
                }`}
              >
                <div className="relative w-full flex-1 overflow-hidden bg-[#D9D0C5]">
                  <div className="absolute inset-0 bg-[#3A352D]/5" />
                </div>
                <div className="pt-4 flex justify-between items-end px-1">
                  <div>
                    <h3 className="text-base font-display text-[#2A2621] tracking-tight">{portrait.name}, {portrait.age}</h3>
                    <p className="text-[10px] text-[#8C7A6B] font-medium uppercase tracking-widest">{portrait.city}</p>
                  </div>
                  <div className="w-5 h-5 rounded-full border border-[#8C7A6B]/30 flex items-center justify-center text-[#8C7A6B]">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
