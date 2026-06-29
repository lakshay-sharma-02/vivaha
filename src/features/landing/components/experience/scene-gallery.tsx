"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function SceneGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Scene 6: Floating Gallery
  const galleryOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0])
  const galleryScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.8, 1, 1.2])

  // Cards shifting randomly
  const shiftY1 = useTransform(scrollYProgress, [0, 1], [200, -200])
  const shiftY2 = useTransform(scrollYProgress, [0, 1], [-150, 300])
  const shiftY3 = useTransform(scrollYProgress, [0, 1], [300, -100])
  const shiftY4 = useTransform(scrollYProgress, [0, 1], [-50, 150])

  return (
    <section ref={containerRef} className="relative h-[250vh] w-full bg-black overflow-hidden">
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center perspective-[1200px]">
        
        <motion.div style={{ opacity: galleryOpacity, scale: galleryScale }} className="relative w-full h-full flex items-center justify-center">
          
          <div className="absolute text-center z-50 pointer-events-none mb-40">
            <h2 className="font-playfair text-5xl md:text-7xl text-white font-medium drop-shadow-2xl">The Gallery</h2>
            <p className="text-zinc-400 mt-4 tracking-widest uppercase text-sm">Where art meets connection</p>
          </div>

          <motion.div style={{ y: shiftY1 }} className="absolute left-[10%] top-[20%] w-48 h-64 glass rounded-3xl p-2 border-white/5 shadow-2xl rotate-[-10deg]">
            <div className="w-full h-full rounded-2xl bg-zinc-900 bg-[url('https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=600&auto=format&fit=crop')] bg-cover opacity-60" />
          </motion.div>
          
          <motion.div style={{ y: shiftY2 }} className="absolute right-[15%] top-[15%] w-56 h-72 glass rounded-3xl p-2 border-white/5 shadow-2xl rotate-[5deg]">
            <div className="w-full h-full rounded-2xl bg-zinc-900 bg-[url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop')] bg-cover opacity-60" />
          </motion.div>

          <motion.div style={{ y: shiftY3 }} className="absolute left-[20%] bottom-[20%] w-64 h-80 glass rounded-3xl p-2 border-white/5 shadow-2xl rotate-[12deg]">
            <div className="w-full h-full rounded-2xl bg-zinc-900 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop')] bg-cover opacity-60" />
          </motion.div>

          <motion.div style={{ y: shiftY4 }} className="absolute right-[25%] bottom-[15%] w-52 h-64 glass rounded-3xl p-2 border-white/5 shadow-2xl rotate-[-8deg]">
            <div className="w-full h-full rounded-2xl bg-zinc-900 bg-[url('https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop')] bg-cover opacity-60" />
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
