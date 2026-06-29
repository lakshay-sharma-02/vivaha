"use client"

import { motion, MotionValue, useTransform } from "framer-motion"
import { ShieldCheck, LockKeyhole } from "lucide-react"

export function SceneTrust({ progress }: { progress: MotionValue<number> }) {
  
  // Scene 8: Privacy Vault (0.8 to 0.95)
  const vaultOpacity = useTransform(progress, [0.75, 0.8, 0.9, 0.95], [0, 1, 1, 0])
  const shieldScale = useTransform(progress, [0.8, 0.9], [0.5, 1.2])
  const particlesY = useTransform(progress, [0.8, 0.95], [0, -200])

  return (
    <motion.div style={{ opacity: vaultOpacity }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
      
      {/* Deep vault background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black opacity-50 pointer-events-none" />

      <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
        {/* Encrypted Particles */}
        <motion.div style={{ y: particlesY }} className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute text-[8px] font-mono text-zinc-500 opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              {Math.random().toString(36).substring(7)}
            </div>
          ))}
        </motion.div>

        <motion.div style={{ scale: shieldScale }} className="w-full h-full rounded-full border border-zinc-800/50 flex items-center justify-center bg-black/50 backdrop-blur-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)] relative">
          <div className="absolute inset-0 rounded-full border-t border-zinc-500/20 animate-spin-slow" />
          <div className="absolute inset-4 rounded-full border-r border-zinc-500/20 animate-reverse-spin" />
          
          <div className="relative flex flex-col items-center">
            <ShieldCheck className="w-20 h-20 text-zinc-300 stroke-1 mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
            <div className="flex items-center gap-2">
              <LockKeyhole className="w-4 h-4 text-zinc-500" />
              <span className="text-zinc-500 text-xs tracking-[0.4em] uppercase">Encrypted</span>
            </div>
          </div>
        </motion.div>
      </div>

      <h2 className="mt-12 font-playfair text-4xl md:text-6xl font-light text-zinc-300 tracking-wide">
        Absolute Secrecy
      </h2>
      <p className="mt-6 text-zinc-500 font-light max-w-md text-center mx-auto">
        Zero public exposure. Invisible to search engines. You control who sees your legacy.
      </p>

    </motion.div>
  )
}
