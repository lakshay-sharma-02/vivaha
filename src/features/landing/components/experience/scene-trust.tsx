"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ShieldCheck, LockKeyhole } from "lucide-react"

export function SceneTrust() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Scene 8: Privacy Vault
  const vaultOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0])
  const shieldScale = useTransform(scrollYProgress, [0.3, 0.5], [0.5, 1.2])
  const particlesY = useTransform(scrollYProgress, [0.3, 0.7], [0, -300])

  return (
    <section ref={containerRef} className="relative h-[250vh] w-full bg-zinc-950 overflow-hidden">
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center perspective-[1000px]">
        
        {/* Deep vault background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black pointer-events-none" />

        <motion.div style={{ opacity: vaultOpacity }} className="relative z-10 flex flex-col items-center text-center">
          
          <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
            {/* Encrypted Particles */}
            <motion.div style={{ y: particlesY }} className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 40 }).map((_, i) => (
                <div 
                  key={i} 
                  className="absolute text-[8px] font-mono text-zinc-500 opacity-20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                >
                  {Math.random().toString(36).substring(7)}
                </div>
              ))}
            </motion.div>

            <motion.div style={{ scale: shieldScale }} className="w-full h-full rounded-full border border-zinc-800/50 flex items-center justify-center bg-black/50 backdrop-blur-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)] relative">
              <div className="absolute inset-0 rounded-full border-t border-zinc-500/20 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border-r border-zinc-500/20 animate-reverse-spin" />
              
              <div className="relative flex flex-col items-center">
                <ShieldCheck className="w-20 h-20 text-zinc-300 stroke-1 mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                <div className="flex items-center gap-2">
                  <LockKeyhole className="w-4 h-4 text-zinc-500" />
                  <span className="text-zinc-500 text-xs tracking-[0.4em] uppercase">Encrypted</span>
                </div>
              </div>
            </motion.div>
          </div>

          <h2 className="mt-12 font-playfair text-4xl md:text-6xl font-light text-zinc-300 tracking-wide">
            Absolute Secrecy
          </h2>
          <p className="mt-6 text-zinc-500 font-light max-w-md mx-auto">
            Zero public exposure. Invisible to search engines. You control who sees your legacy.
          </p>

        </motion.div>

      </div>
    </section>
  )
}
