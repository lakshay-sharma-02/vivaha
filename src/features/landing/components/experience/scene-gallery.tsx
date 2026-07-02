"use client"

import { motion, MotionValue, useTransform } from "framer-motion"

export function SceneGallery({ progress }: { progress: MotionValue<number> }) {

  const galleryOpacity = useTransform(progress, [0.64, 0.68, 0.82, 0.86], [0, 1, 1, 0])
  const galleryScale = useTransform(progress, [0.64, 0.75, 0.86], [0.8, 1, 1.2])

  const shiftY1 = useTransform(progress, [0.64, 0.86], [200, -200])
  const shiftY2 = useTransform(progress, [0.64, 0.86], [-150, 300])
  const shiftY3 = useTransform(progress, [0.64, 0.86], [300, -100])
  const shiftY4 = useTransform(progress, [0.64, 0.86], [-50, 150])

  // Enhanced animation transforms
  const titleOpacity = useTransform(progress, [0.66, 0.70], [0, 1])
  const titleY = useTransform(progress, [0.66, 0.70], [30, 0])
  const subtitleOpacity = useTransform(progress, [0.68, 0.72], [0, 1])
  const lightBeamsOpacity = useTransform(progress, [0.68, 0.75, 0.82], [0, 0.3, 0])
  const imageOverlayOpacity = useTransform(progress, [0.68, 0.75], [0, 1])

  return (
    <motion.div style={{ opacity: galleryOpacity, scale: galleryScale, transform: "translateZ(0)" }} className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">

      <div className="absolute text-center z-50 mb-40">
        <motion.h2
          className="font-playfair text-5xl md:text-7xl text-white font-medium drop-shadow-2xl"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          The Gallery
        </motion.h2>
        <motion.p
          className="text-zinc-400 mt-4 tracking-widest uppercase text-sm"
          style={{ opacity: subtitleOpacity }}
        >
          Where art meets connection
        </motion.p>
      </div>

      {/* Light beams effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: lightBeamsOpacity,
          background: "radial-gradient(ellipse at center, rgba(245,158,11,0.1) 0%, transparent 70%)"
        }}
      />

      <motion.div style={{ y: shiftY1, transform: "translateZ(0)" }} className="absolute left-[-10%] md:left-[10%] top-[20%] w-40 md:w-48 h-56 md:h-64 glass rounded-3xl p-2 border-white/5 shadow-2xl rotate-[-10deg]">
        <motion.div
          className="w-full h-full rounded-2xl bg-zinc-900 bg-[url('https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=600&auto=format&fit=crop')] bg-cover opacity-60 relative overflow-hidden"
          whileHover={{ opacity: 0.8, scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            style={{ opacity: imageOverlayOpacity }}
          />
        </motion.div>
      </motion.div>

      <motion.div style={{ y: shiftY2, transform: "translateZ(0)" }} className="absolute right-[-10%] md:right-[15%] top-[15%] w-48 md:w-56 h-64 md:h-72 glass rounded-3xl p-2 border-white/5 shadow-2xl rotate-[5deg]">
        <motion.div
          className="w-full h-full rounded-2xl bg-zinc-900 bg-[url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop')] bg-cover opacity-60 relative overflow-hidden"
          whileHover={{ opacity: 0.8, scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            style={{ opacity: imageOverlayOpacity }}
          />
        </motion.div>
      </motion.div>

      <motion.div style={{ y: shiftY3, transform: "translateZ(0)" }} className="absolute left-[5%] md:left-[20%] bottom-[20%] w-56 md:w-64 h-72 md:h-80 glass rounded-3xl p-2 border-white/5 shadow-2xl rotate-[12deg]">
        <motion.div
          className="w-full h-full rounded-2xl bg-zinc-900 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop')] bg-cover opacity-60 relative overflow-hidden"
          whileHover={{ opacity: 0.8, scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            style={{ opacity: imageOverlayOpacity }}
          />
        </motion.div>
      </motion.div>

      <motion.div style={{ y: shiftY4, transform: "translateZ(0)" }} className="absolute right-[5%] md:right-[25%] bottom-[15%] w-48 md:w-52 h-56 md:h-64 glass rounded-3xl p-2 border-white/5 shadow-2xl rotate-[-8deg]">
        <motion.div
          className="w-full h-full rounded-2xl bg-zinc-900 bg-[url('https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop')] bg-cover opacity-60 relative overflow-hidden"
          whileHover={{ opacity: 0.8, scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            style={{ opacity: imageOverlayOpacity }}
          />
        </motion.div>
      </motion.div>

    </motion.div>
  )
}
