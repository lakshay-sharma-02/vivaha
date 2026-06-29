"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"

export function SceneFinale() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  // Scene 10 & 11: Membership & Ending
  const invitationOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 0.9], [0, 1, 1, 0])
  const invitationScale = useTransform(scrollYProgress, [0.1, 0.4], [0.8, 1])
  
  const finaleOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1])

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full bg-black">
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center perspective-[1500px]">
        
        {/* Scene 10: Luxury Invitation */}
        <motion.div style={{ opacity: invitationOpacity, scale: invitationScale }} className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="w-[90vw] max-w-lg aspect-[3/4] rounded-sm bg-gradient-to-br from-[#1a1a1a] to-black border border-white/5 shadow-2xl p-12 flex flex-col items-center text-center relative overflow-hidden group">
            
            {/* Gold foil reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -translate-x-full group-hover:translate-x-full transition-transform" />
            
            <div className="w-16 h-16 rounded-full border border-amber-500/30 flex items-center justify-center mb-12 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
              <span className="font-playfair text-2xl text-amber-500/80">V</span>
            </div>
            
            <h3 className="font-playfair text-3xl font-light text-zinc-300 mb-6 uppercase tracking-[0.2em]">Membership</h3>
            
            <div className="w-8 h-[1px] bg-amber-500/30 mb-8" />
            
            <p className="text-zinc-500 text-sm font-light leading-relaxed mb-12 tracking-wide">
              An invitation to the most exclusive matrimonial circle in the world. 
              Membership is strictly curated by our board of directors.
            </p>

            <div className="mt-auto pointer-events-auto">
              <Link href="/register" className="inline-block border border-amber-500/30 px-8 py-3 text-amber-500/80 text-xs uppercase tracking-[0.3em] hover:bg-amber-500/10 transition-colors">
                Request Invitation
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Scene 11: The End */}
        <motion.div style={{ opacity: finaleOpacity }} className="absolute inset-0 bg-black flex flex-col items-center justify-center z-20">
          
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[2px] h-[2px] bg-white/20 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  y: [null, Math.random() * window.innerHeight],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 5 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          <h2 className="font-playfair text-3xl md:text-5xl font-light text-white tracking-widest text-center mb-12 px-6">
            Begin Your Legacy.
          </h2>
          
          <Link href="/register">
            <button className="text-xs uppercase tracking-[0.4em] text-zinc-400 hover:text-white transition-colors pb-1 border-b border-zinc-700 hover:border-white">
              Enter Vivaha
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
