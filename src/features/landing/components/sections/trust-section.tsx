"use client"

import { CinematicSection } from "../experience"
import { motion } from "framer-motion"
import { ShieldCheck, LockKeyhole } from "lucide-react"
import { fadeInUp } from "@/shared/animations"

export function TrustSection() {
  return (
    <CinematicSection>
      <div className="relative flex flex-col items-center justify-center w-full h-full py-20">
        <motion.div
          className="relative flex flex-col items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border border-zinc-800/50 flex items-center justify-center bg-gradient-to-br from-zinc-900/50 to-black backdrop-blur-sm shadow-2xl">
            <div className="absolute inset-0 rounded-full bg-zinc-700/10 shield-pulse" />

            <div className="relative flex flex-col items-center">
              <ShieldCheck className="w-20 h-20 md:w-24 md:h-24 text-zinc-300 stroke-1 mb-4" />
              <div className="flex items-center gap-2">
                <LockKeyhole className="w-4 h-4 text-zinc-500" />
                <span className="text-zinc-500 text-xs tracking-[0.4em] uppercase">
                  Encrypted
                </span>
              </div>
            </div>
          </div>

          <h2 className="mt-12 font-playfair text-4xl md:text-6xl font-light text-zinc-300 tracking-wide text-center drop-shadow-md">
            Absolute Secrecy
          </h2>
          <p className="mt-6 text-zinc-500 font-light max-w-md text-center mx-auto px-4">
            Zero public exposure. Invisible to search engines. You control who sees
            your legacy.
          </p>
        </motion.div>

        <style jsx>{`
          @keyframes shield-pulse {
            0%, 100% { opacity: 0.1; transform: scale(1); }
            50% { opacity: 0.3; transform: scale(1.05); }
          }
          .shield-pulse { animation: shield-pulse 4s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .shield-pulse { animation: none; opacity: 0.1; }
          }
        `}</style>
      </div>
    </CinematicSection>
  )
}
