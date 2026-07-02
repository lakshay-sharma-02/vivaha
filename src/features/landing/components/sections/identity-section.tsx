"use client"

import { CinematicSection, use3DTilt } from "../experience"
import { motion } from "framer-motion"
import { useRef } from "react"
import { fadeInUp } from "@/shared/animations"

export function IdentitySection() {
  const cardRef = useRef<HTMLDivElement>(null)
  const { rotateX, rotateY } = use3DTilt(cardRef, 10)

  return (
    <CinematicSection>
      <div className="relative flex flex-col items-center justify-center w-full h-full py-20 px-4">
        <motion.h2
          className="font-playfair text-4xl md:text-5xl mb-16 font-light tracking-wide text-zinc-300 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Crafting Your Narrative
        </motion.h2>

        <motion.div
          ref={cardRef}
          className="w-[90vw] max-w-2xl rounded-3xl p-8 border border-white/5 flex flex-col shadow-2xl relative overflow-hidden bg-black/40 backdrop-blur-xl"
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-6 mb-8 relative z-10">
            <div className="w-24 h-24 rounded-full bg-zinc-800/80 border border-white/5 shadow-inner" />
            <div className="flex-1 space-y-4">
              <div className="h-6 w-1/3 bg-zinc-800/80 rounded" />
              <div className="h-4 w-1/4 bg-zinc-800/50 rounded" />
            </div>
          </div>

          <div className="space-y-4 relative z-10 mb-8">
            <div className="h-4 bg-zinc-800/30 rounded w-full" />
            <div className="h-4 bg-zinc-800/30 rounded" style={{ width: "83.33%" }} />
            <div className="h-4 bg-zinc-800/30 rounded" style={{ width: "66.67%" }} />
          </div>

          <div className="relative h-1 bg-zinc-800/50 w-full rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.6)] profile-progress" />
          </div>
          <div className="mt-4 text-right font-mono text-amber-500/90 font-semibold text-sm">
            100%
          </div>
        </motion.div>

        <style jsx>{`
          @keyframes profile-progress {
            0% { transform: scaleX(0); transform-origin: left; }
            100% { transform: scaleX(1); transform-origin: left; }
          }
          .profile-progress { animation: profile-progress 2s ease-out forwards; }
          @media (prefers-reduced-motion: reduce) {
            .profile-progress { animation: none; transform: scaleX(1); }
          }
        `}</style>
      </div>
    </CinematicSection>
  )
}
