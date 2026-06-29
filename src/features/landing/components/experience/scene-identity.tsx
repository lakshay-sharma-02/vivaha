"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { CheckCircle2, ScanFace, FileSignature } from "lucide-react"

export function SceneIdentity() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Scene 4: Build Identity
  const buildY = useTransform(scrollYProgress, [0.1, 0.3], [100, 0])
  const buildOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.4, 0.5], [0, 1, 1, 0])
  const profileCompletion = useTransform(scrollYProgress, [0.2, 0.4], [0, 100])

  // Scene 5: Verification
  const verifyScale = useTransform(scrollYProgress, [0.5, 0.6], [0.8, 1])
  const verifyOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.75, 0.85], [0, 1, 1, 0])
  const scanPosition = useTransform(scrollYProgress, [0.55, 0.7], ["0%", "100%"])

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full bg-zinc-950 text-white">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        
        {/* Ambient lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950 to-black pointer-events-none" />

        {/* Scene 4: Identity Build */}
        <motion.div style={{ y: buildY, opacity: buildOpacity }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <h2 className="font-playfair text-4xl md:text-5xl mb-12 font-light tracking-wide text-zinc-300">Crafting Your Narrative</h2>
          
          <div className="w-[80vw] max-w-2xl h-80 glass rounded-3xl p-8 border-white/5 flex flex-col shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-zinc-800 animate-pulse" />
              <div className="flex-1 space-y-4">
                <div className="h-6 w-1/3 bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-1/4 bg-zinc-800/50 rounded animate-pulse" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="h-4 w-full bg-zinc-800/30 rounded" />
              <div className="h-4 w-5/6 bg-zinc-800/30 rounded" />
              <div className="h-4 w-4/6 bg-zinc-800/30 rounded" />
            </div>

            {/* Progress Bar overlay */}
            <div className="absolute bottom-0 left-0 h-1 bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.8)]" style={{ width: "100%" }}>
              <motion.div 
                className="absolute inset-0 bg-amber-400"
                style={{ scaleX: useTransform(profileCompletion, v => v / 100), transformOrigin: "left" }} 
              />
            </div>
            <motion.div className="absolute bottom-4 right-8 font-mono text-amber-500/80">
              {/* @ts-ignore - framer motion transforms */}
              <motion.span>{useTransform(profileCompletion, v => `${Math.round(v)}%`)}</motion.span>
            </motion.div>
          </div>
        </motion.div>

        {/* Scene 5: Verification Process */}
        <motion.div style={{ scale: verifyScale, opacity: verifyOpacity }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <h2 className="font-playfair text-4xl md:text-5xl mb-16 font-light text-zinc-300">Uncompromising Standards</h2>
          
          <div className="flex items-center gap-12">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center border-white/10 bg-zinc-900/50">
                <FileSignature className="w-8 h-8 text-zinc-400" />
              </div>
              <span className="text-xs uppercase tracking-widest text-zinc-500">Identity</span>
            </div>

            <div className="w-16 h-[1px] bg-zinc-800 relative">
              <motion.div 
                className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.5)]" 
                style={{ scaleX: useTransform(scrollYProgress, [0.55, 0.6], [0, 1]), transformOrigin: "left" }} 
              />
            </div>

            <div className="flex flex-col items-center gap-4 relative">
              <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center border-white/10 bg-zinc-900/50 relative overflow-hidden">
                <ScanFace className="w-8 h-8 text-zinc-400" />
                {/* Scanning line */}
                <motion.div 
                  className="absolute left-0 right-0 h-[2px] bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,1)]"
                  style={{ top: scanPosition }}
                />
              </div>
              <span className="text-xs uppercase tracking-widest text-zinc-500">Biometric</span>
            </div>

            <div className="w-16 h-[1px] bg-zinc-800 relative">
              <motion.div 
                className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                style={{ scaleX: useTransform(scrollYProgress, [0.65, 0.7], [0, 1]), transformOrigin: "left" }} 
              />
            </div>

            <div className="flex flex-col items-center gap-4">
              <motion.div 
                style={{ 
                  scale: useTransform(scrollYProgress, [0.7, 0.75], [0, 1]),
                  opacity: useTransform(scrollYProgress, [0.7, 0.75], [0, 1])
                }}
                className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.2)]"
              >
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </motion.div>
              <motion.span 
                style={{ opacity: useTransform(scrollYProgress, [0.72, 0.75], [0, 1]) }}
                className="text-xs uppercase tracking-widest text-green-500"
              >
                Verified
              </motion.span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
