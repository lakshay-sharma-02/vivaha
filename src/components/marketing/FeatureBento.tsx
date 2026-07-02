"use client";
import { motion } from "framer-motion";
import { Shield, Brain, Users, Video, Search, Star } from "lucide-react";

const features = [
  { icon: Brain, title: "AI Matchmaking", desc: "Neuro-linguistic alignment and deep psychological profiling.", col: "md:col-span-2", row: "md:row-span-2" },
  { icon: Shield, title: "Verified Profiles", desc: "Bank-level identity verification for every member.", col: "md:col-span-1", row: "md:row-span-1" },
  { icon: Users, title: "Family Dashboard", desc: "Seamless integration for parents and matchmakers.", col: "md:col-span-1", row: "md:row-span-1" },
  { icon: Video, title: "Video Intros", desc: "Private, timed video introductions.", col: "md:col-span-1", row: "md:row-span-1" },
  { icon: Search, title: "Private Discovery", desc: "Your profile remains completely hidden until you approve.", col: "md:col-span-1", row: "md:row-span-1" },
  { icon: Star, title: "Relationship Insights", desc: "Astrological and psychological compatibility scoring.", col: "md:col-span-2", row: "md:row-span-1" },
];

export function FeatureBento() {
  return (
    <section className="py-40 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 font-light">Engineered for Permanence</h2>
        <p className="text-white/40 text-[9px] tracking-[0.3em] uppercase">The Vivaha Architecture</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 auto-rows-[250px]">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-10%" }}
            className={`group relative rounded-lg overflow-hidden bg-white/[0.01] border border-white/[0.03] hover:border-[#d4af37]/30 transition-all duration-700 p-8 flex flex-col justify-end ${f.col} ${f.row}`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#040405] via-black/50 to-transparent z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-8 left-8 p-3 rounded-full bg-white/[0.02] backdrop-blur-md border border-white/5 group-hover:bg-[#d4af37]/10 transition-colors duration-700 z-10">
              <f.icon className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div className="relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
              <h3 className="text-xl font-serif text-white/90 mb-3 font-light">{f.title}</h3>
              <p className="text-white/40 font-sans font-light text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
