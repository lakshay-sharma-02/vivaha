"use client"

import { motion, MotionValue, useTransform } from "framer-motion"
import { ShieldCheck, LockKeyhole } from "lucide-react"

export function SceneTrust({ progress }: { progress: MotionValue<number> }) {

  const vaultOpacity = useTransform(progress, [0.84, 0.88, 0.94, 0.98], [0, 1, 1, 0])
  const shieldScale = useTransform(progress, [0.84, 0.90], [0.5, 1.2])
  const particlesY = useTransform(progress, [0.84, 0.98], [0, -200])

  // Enhanced animation transforms
  const titleOpacity = useTransform(progress, [0.86, 0.90], [0, 1])
  const titleY = useTransform(progress, [0.86, 0.90], [20, 0])
  const descriptionOpacity = useTransform(progress, [0.88, 0.92], [0, 1])

  return (
    <motion.div style={{ opacity: vaultOpacity }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">

      {/* Deep vault background glow - Enhanced */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black opacity-50 pointer-events-none"
        animate={{
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
        {/* Encrypted Particles */}
        <motion.div style={{ y: particlesY }} className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[8px] font-mono text-zinc-500"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              {Math.random().toString(36).substring(7)}
            </motion.div>
          ))}
        </motion.div>

        <motion.div style={{ scale: shieldScale, transform: "translateZ(0)" }} className="w-full h-full rounded-full border border-zinc-800/50 flex items-center justify-center bg-black/50 backdrop-blur-sm relative shadow-2xl">

          {/* Animated ring pulses */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-zinc-700/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
          />

          <div className="absolute inset-0 rounded-full border-t border-zinc-500/20 animate-spin-slow" />
          <div className="absolute inset-4 rounded-full border-r border-zinc-500/20 animate-reverse-spin" />

          <div className="relative flex flex-col items-center">
            <motion.div
              animate={{
                filter: [
                  "drop-shadow(0 0 15px rgba(255,255,255,0.2))",
                  "drop-shadow(0 0 25px rgba(255,255,255,0.4))",
                  "drop-shadow(0 0 15px rgba(255,255,255,0.2))"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ShieldCheck className="w-20 h-20 text-zinc-300 stroke-1 mb-4" />
            </motion.div>
            <div className="flex items-center gap-2">
              <LockKeyhole className="w-4 h-4 text-zinc-500" />
              <span className="text-zinc-500 text-xs tracking-[0.4em] uppercase">Encrypted</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.h2
        className="mt-12 font-playfair text-4xl md:text-6xl font-light text-zinc-300 tracking-wide"
        style={{ opacity: titleOpacity, y: titleY }}
      >
        Absolute Secrecy
      </motion.h2>
      <motion.p
        className="mt-6 text-zinc-500 font-light max-w-md text-center mx-auto"
        style={{ opacity: descriptionOpacity }}
      >
        Zero public exposure. Invisible to search engines. You control who sees your legacy.
      </motion.p>

    </motion.div>
  )
}
