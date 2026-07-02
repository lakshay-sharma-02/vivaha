"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
  { label: "Verified Members", value: "10,000+" },
  { label: "Matches Created", value: "4,500+" },
  { label: "Success Rate", value: "92%" },
  { label: "Years of Trust", value: "05" },
];

export function TrustStrip() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section ref={ref} className="py-40 w-full relative">
      <div className="absolute inset-0 border-y border-white/[0.03] bg-black/40 backdrop-blur-sm pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div style={{ y, opacity }} className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-6">
              <span className="text-4xl md:text-5xl font-serif text-[#d4af37] font-light">{stat.value}</span>
              <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-white/40">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
