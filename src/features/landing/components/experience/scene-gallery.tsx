"use client"

import { motion, MotionValue, useTransform } from "framer-motion"

export function SceneGallery({ progress }: { progress: MotionValue<number> }) {
  
  // Scene 6: Floating Gallery (0.65 to 0.8)
  const galleryOpacity = useTransform(progress, [0.6, 0.65, 0.8, 0.85], [0, 1, 1, 0])
  const galleryScale = useTransform(progress, [0.6, 0.7, 0.85], [0.8, 1, 1.2])

  // Sub-transforms for parallax shifting based on progress range
  const shiftY1 = useTransform(progress, [0.6, 0.85], [200, -200])
  const shiftY2 = useTransform(progress, [0.6, 0.85], [-150, 300])
  const shiftY3 = useTransform(progress, [0.6, 0.85], [300, -100])
  const shiftY4 = useTransform(progress, [0.6, 0.85], [-50, 150])

  return (
    <motion.div style={{ opacity: galleryOpacity, scale: galleryScale }} className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
      
      <div className="absolute text-center z-50 mb-40">
        <h2 className="font-playfair text-5xl md:text-7xl text-white font-medium drop-shadow-2xl">The Gallery</h2>
        <p className="text-zinc-400 mt-4 tracking-widest uppercase text-sm">Where art meets connection</p>
      </div>

      <motion.div style={{ y: shiftY1 }} className="absolute left-[-10%] md:left-[10%] top-[20%] w-40 md:w-48 h-56 md:h-64 glass rounded-3xl p-2 border-white/5 shadow-2xl rotate-[-10deg]">
        <div className="w-full h-full rounded-2xl bg-zinc-900 bg-[url('https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=600&auto=format&fit=crop')] bg-cover opacity-60" />
      </motion.div>
      
      <motion.div style={{ y: shiftY2 }} className="absolute right-[-10%] md:right-[15%] top-[15%] w-48 md:w-56 h-64 md:h-72 glass rounded-3xl p-2 border-white/5 shadow-2xl rotate-[5deg]">
        <div className="w-full h-full rounded-2xl bg-zinc-900 bg-[url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop')] bg-cover opacity-60" />
      </motion.div>

      <motion.div style={{ y: shiftY3 }} className="absolute left-[5%] md:left-[20%] bottom-[20%] w-56 md:w-64 h-72 md:h-80 glass rounded-3xl p-2 border-white/5 shadow-2xl rotate-[12deg]">
        <div className="w-full h-full rounded-2xl bg-zinc-900 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop')] bg-cover opacity-60" />
      </motion.div>

      <motion.div style={{ y: shiftY4 }} className="absolute right-[5%] md:right-[25%] bottom-[15%] w-48 md:w-52 h-56 md:h-64 glass rounded-3xl p-2 border-white/5 shadow-2xl rotate-[-8deg]">
        <div className="w-full h-full rounded-2xl bg-zinc-900 bg-[url('https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop')] bg-cover opacity-60" />
      </motion.div>

    </motion.div>
  )
}
