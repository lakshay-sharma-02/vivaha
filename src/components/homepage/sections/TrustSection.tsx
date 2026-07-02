"use client";

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
    <section className="relative w-full h-full flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-[#FBFBF9]">
      {/* Material Suggestion: Deep stone gallery texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none z-0" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Lighting System: Museum skylight gently drifting */}
      <motion.div 
        initial={{ opacity: 0.7, y: "-5%" }}
        animate={{ opacity: 0.9, y: "5%" }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-[radial-gradient(ellipse_at_top,_rgba(255,252,245,1)_0%,_transparent_70%)] pointer-events-none z-0 blur-3xl" 
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center space-y-20">
        <div className="space-y-6">
          <h2 
            className="text-4xl md:text-5xl text-[var(--color-text-primary)] font-display tracking-tight"
            style={{ textShadow: "0 1px 1px rgba(255,255,255,1), 0 -1px 1px rgba(0,0,0,0.02)" }}
          >
            Verified. Authentic. Secure.
          </h2>
          <p className="text-md md:text-lg text-[var(--color-text-secondary)] max-w-[640px] mx-auto leading-relaxed">
            We believe that every introduction should be genuine. Our comprehensive verification process ensures that you spend time connecting with real people, not algorithms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {trustItems.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-10 rounded-[var(--radius-xl)] bg-white/40 backdrop-blur-md border-t border-white/60 border-b border-black/[0.03] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.03)] flex flex-col items-center text-center space-y-6 group"
            >
              {/* Museum display lighting: gentle spotlight from above */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-transparent opacity-50 rounded-[var(--radius-xl)] pointer-events-none" />
              
              <div className="relative z-10 space-y-4 flex flex-col items-center">
                <div 
                  className="text-sm font-medium text-[var(--color-primary-600)] tracking-widest opacity-80"
                  style={{ textShadow: "0 1px 0 rgba(255,255,255,0.8)" }}
                >
                  {item.id}
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-[200px]">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Continuity Transition: Gallery stone transitions into the open pathway of the next section */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#F9F8F6] to-transparent z-0 pointer-events-none" />
    </section>
  );
}
