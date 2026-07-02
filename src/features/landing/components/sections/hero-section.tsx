"use client"

import { motion } from "framer-motion"
import { useSmartInView, scaleIn, fadeIn } from "@/shared/animations"

export function HeroSection() {
  const { ref, shouldAnimate } = useSmartInView({ once: true, amount: 0.5 })

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white"
    >
      <motion.div
        className="flex flex-col items-center justify-center z-10"
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        variants={scaleIn}
      >
        <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-amber-500/10 to-transparent border border-amber-500/20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-pulse-glow" />
          <span className="relative font-playfair text-4xl md:text-6xl text-amber-50/90 font-light tracking-widest">
            V
          </span>
        </div>

        <motion.p
          className="mt-6 text-amber-500/60 text-sm tracking-[0.3em] uppercase"
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ delay: 0.3 }}
        >
          Where Souls Connect
        </motion.p>
      </motion.div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.2;
            box-shadow: 0 0 100px rgba(245, 158, 11, 0.2);
          }
          50% {
            opacity: 0.4;
            box-shadow: 0 0 150px rgba(245, 158, 11, 0.4);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-glow {
            animation: none;
            opacity: 0.2;
          }
        }
      `}</style>
    </section>
  )
}
