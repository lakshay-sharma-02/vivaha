"use client"

import { CinematicSection } from "../experience"
import { motion } from "framer-motion"
import { useSmartInView, scaleIn, fadeIn } from "@/shared/animations"

export function HeroSection() {
  const { ref, shouldAnimate } = useSmartInView<HTMLDivElement>({ once: true, amount: 0.5 })

  return (
    <CinematicSection isFirst>
      <div
        ref={ref}
        className="relative flex flex-col items-center justify-center overflow-hidden w-full h-full"
      >
        <motion.div
          className="flex flex-col items-center justify-center z-10"
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          variants={scaleIn}
        >
          <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-amber-500/10 to-transparent border border-amber-500/20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-amber-500/10 animate-pulse-glow" />
            <span className="relative font-playfair text-4xl md:text-6xl text-amber-50/90 font-light tracking-widest drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              V
            </span>
          </div>

          <motion.p
            className="mt-8 text-amber-500/60 text-sm tracking-[0.4em] uppercase"
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
          >
            Where Souls Connect
          </motion.p>
        </motion.div>

        <style jsx>{`
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.2; box-shadow: 0 0 80px rgba(245, 158, 11, 0.1); }
            50% { opacity: 0.5; box-shadow: 0 0 120px rgba(245, 158, 11, 0.2); }
          }
          .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .animate-pulse-glow { animation: none; opacity: 0.2; }
          }
        `}</style>
      </div>
    </CinematicSection>
  )
}
