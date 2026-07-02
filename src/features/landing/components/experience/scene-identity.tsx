"use client"

import { motion, MotionValue, useTransform } from "framer-motion"
import { CheckCircle2, ScanFace, FileSignature } from "lucide-react"

export function SceneIdentity({ progress }: { progress: MotionValue<number> }) {

  const buildOpacity = useTransform(progress, [0.30, 0.34, 0.46, 0.50], [0, 1, 1, 0])
  const buildY = useTransform(progress, [0.30, 0.38], [100, 0])
  const profileCompletion = useTransform(progress, [0.34, 0.46], [0, 100])

  const verifyOpacity = useTransform(progress, [0.48, 0.52, 0.62, 0.66], [0, 1, 1, 0])
  const verifyScale = useTransform(progress, [0.48, 0.52], [0.8, 1])
  const scanPosition = useTransform(progress, [0.53, 0.58], ["0%", "100%"])

  // Enhanced animation transforms
  const titleOpacity = useTransform(progress, [0.30, 0.34], [0, 1])
  const titleScale = useTransform(progress, [0.30, 0.34], [0.95, 1])
  const avatarOpacity = useTransform(progress, [0.32, 0.36], [0, 1])
  const avatarScale = useTransform(progress, [0.32, 0.36], [0.8, 1])
  const profileLine1Scale = useTransform(progress, [0.34, 0.38], [0, 1])
  const profileLine2Scale = useTransform(progress, [0.36, 0.40], [0, 1])
  const contentLine1Scale = useTransform(progress, [0.36, 0.40], [0, 1])
  const contentLine2Scale = useTransform(progress, [0.38, 0.42], [0, 1])
  const contentLine3Scale = useTransform(progress, [0.40, 0.44], [0, 1])
  const progressBarScale = useTransform(profileCompletion, v => v / 100)
  const percentageText = useTransform(profileCompletion, v => `${Math.round(v)}%`)
  const percentageOpacity = useTransform(progress, [0.38, 0.42], [0, 1])

  return (
    <>
      {/* Scene 4: Identity Build - Enhanced with typing effect */}
      <motion.div style={{ y: buildY, opacity: buildOpacity }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30">
        <motion.h2
          className="font-playfair text-4xl md:text-5xl mb-12 font-light tracking-wide text-zinc-300"
          style={{ opacity: titleOpacity, scale: titleScale }}
        >
          Crafting Your Narrative
        </motion.h2>

        <div className="w-[90vw] max-w-2xl h-80 glass rounded-3xl p-8 border-white/5 flex flex-col shadow-2xl relative overflow-hidden bg-black/40 backdrop-blur-xl">
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5"
            animate={{ x: [-1000, 1000] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          <div className="flex items-center gap-6 mb-8 relative z-10">
            <motion.div
              className="w-24 h-24 rounded-full bg-zinc-800/80 border border-white/5"
              style={{ opacity: avatarOpacity, scale: avatarScale }}
            />
            <div className="flex-1 space-y-4">
              <motion.div
                className="h-6 w-1/3 bg-zinc-800/80 rounded"
                style={{ scaleX: profileLine1Scale, transformOrigin: "left" }}
              />
              <motion.div
                className="h-4 w-1/4 bg-zinc-800/50 rounded"
                style={{ scaleX: profileLine2Scale, transformOrigin: "left" }}
              />
            </div>
          </div>

          <div className="space-y-4 relative z-10">
            <motion.div className="h-4 bg-zinc-800/30 rounded" style={{ width: '100%', scaleX: contentLine1Scale, transformOrigin: "left" }} />
            <motion.div className="h-4 bg-zinc-800/30 rounded" style={{ width: '83.33%', scaleX: contentLine2Scale, transformOrigin: "left" }} />
            <motion.div className="h-4 bg-zinc-800/30 rounded" style={{ width: '66.67%', scaleX: contentLine3Scale, transformOrigin: "left" }} />
          </div>

          <div className="absolute bottom-0 left-0 h-1 bg-zinc-800/50 w-full">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.6)]"
              style={{ scaleX: progressBarScale, transformOrigin: "left" }}
            />
          </div>
          <motion.div
            className="absolute bottom-4 right-8 font-mono text-amber-500/90 font-semibold"
            style={{ opacity: percentageOpacity }}
          >
            {/* @ts-ignore */}
            <motion.span>{percentageText}</motion.span>
          </motion.div>
        </div>
      </motion.div>

      {/* Scene 5: Verification Process */}
      <motion.div style={{ scale: verifyScale, opacity: verifyOpacity }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30">
        <h2 className="font-playfair text-4xl md:text-5xl mb-16 font-light text-zinc-300">Uncompromising Standards</h2>
        
        <div className="flex items-center gap-4 md:gap-12 scale-75 md:scale-100">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center border-white/10 bg-zinc-900/50 shadow-xl">
              <FileSignature className="w-8 h-8 text-zinc-400" />
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500">Identity</span>
          </div>

          <div className="w-12 md:w-16 h-[1px] bg-zinc-800 relative">
            <motion.div 
              className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.5)]" 
              style={{ scaleX: useTransform(progress, [0.50, 0.53], [0, 1]), transformOrigin: "left" }} 
            />
          </div>

          <div className="flex flex-col items-center gap-4 relative">
            <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center border-white/10 bg-zinc-900/50 relative overflow-hidden shadow-xl">
              <ScanFace className="w-8 h-8 text-zinc-400" />
              <motion.div 
                className="absolute left-0 right-0 h-[2px] bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,1)]"
                style={{ top: scanPosition }}
              />
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500">Biometric</span>
          </div>

          <div className="w-12 md:w-16 h-[1px] bg-zinc-800 relative">
            <motion.div 
              className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
              style={{ scaleX: useTransform(progress, [0.58, 0.61], [0, 1]), transformOrigin: "left" }} 
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <motion.div 
              style={{ 
                scale: useTransform(progress, [0.61, 0.63], [0, 1]),
                opacity: useTransform(progress, [0.61, 0.63], [0, 1])
              }}
              className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.2)]"
            >
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </motion.div>
            <motion.span 
              style={{ opacity: useTransform(progress, [0.62, 0.64], [0, 1]) }}
              className="text-[10px] md:text-xs uppercase tracking-widest text-green-500"
            >
              Verified
            </motion.span>
          </div>
        </div>
      </motion.div>
    </>
  )
}
