"use client"

import { motion, MotionValue, useTransform } from "framer-motion"

export function SceneHero({ progress }: { progress: MotionValue<number> }) {
  // Scene 1: Arrival & Logo Dissolve (0.0 to 0.12)
  const arrivalOpacity = useTransform(progress, [0, 0.08, 0.12], [1, 1, 0])
  const arrivalScale = useTransform(progress, [0, 0.12], [1, 1.5])
  const arrivalBlur = useTransform(progress, [0, 0.12], ["blur(0px)", "blur(30px)"])

  // Scene 2: 3D Floating Cards Orbit (0.10 to 0.32)
  const cardContainerOpacity = useTransform(progress, [0.10, 0.15, 0.28, 0.32], [0, 1, 1, 0])
  
  const card1X = useTransform(progress, [0.10, 0.20, 0.32], [100, -150, -400])
  const card1Y = useTransform(progress, [0.10, 0.20, 0.32], [50, -50, -100])
  const card1RotateZ = useTransform(progress, [0.10, 0.20, 0.32], [-10, 0, -20])

  const card2X = useTransform(progress, [0.10, 0.20, 0.32], [-100, 150, 400])
  const card2Y = useTransform(progress, [0.10, 0.20, 0.32], [-50, 50, 100])
  const card2RotateZ = useTransform(progress, [0.10, 0.20, 0.32], [10, 0, 20])

  // Scene 3: Connection Nodes (0.18 to 0.32)
  const connectionOpacity = useTransform(progress, [0.18, 0.22, 0.28, 0.32], [0, 1, 1, 0])
  const linePathLength = useTransform(progress, [0.18, 0.25], [0, 1])

  return (
    <>
      {/* Scene 1: The Emblem */}
      <motion.div 
        style={{ opacity: arrivalOpacity, scale: arrivalScale, filter: arrivalBlur }}
        className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none"
      >
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-amber-500/10 to-transparent border border-amber-500/20 shadow-[0_0_100px_rgba(245,158,11,0.2)] flex items-center justify-center">
          <span className="font-playfair text-4xl md:text-6xl text-amber-50/90 font-light tracking-widest">V</span>
        </div>
      </motion.div>

      {/* Scene 2 & 3: Floating Profiles & Connection */}
      <motion.div style={{ opacity: cardContainerOpacity }} className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
        
        {/* Connection Lines (Scene 3) */}
        <motion.div style={{ opacity: connectionOpacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg className="w-full h-full absolute" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(245,158,11,0)" />
                <stop offset="50%" stopColor="rgba(245,158,11,0.8)" />
                <stop offset="100%" stopColor="rgba(245,158,11,0)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 200 500 Q 500 200 800 500"
              fill="none"
              stroke="url(#gold-grad)"
              strokeWidth="2"
              style={{ pathLength: linePathLength }}
            />
            <motion.path
              d="M 200 500 Q 500 800 800 500"
              fill="none"
              stroke="url(#gold-grad)"
              strokeWidth="2"
              style={{ pathLength: linePathLength }}
            />
          </svg>
          
          <div className="absolute text-center flex flex-col items-center justify-center gap-4">
            <span className="text-amber-500/80 text-sm tracking-[0.3em] uppercase font-medium drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">Compatibility Sync</span>
            <div className="flex gap-8">
              {["Values", "Lifestyle", "Goals"].map((node, i) => (
                <div key={node} className="flex flex-col items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,1)]" />
                  <span className="text-white/60 text-xs uppercase tracking-widest">{node}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 1 */}
        <motion.div
          style={{ x: card1X, y: card1Y, rotateZ: card1RotateZ }}
          className="absolute w-64 md:w-80 h-96 rounded-[2rem] glass p-1 shadow-[0_0_50px_rgba(0,0,0,0.8)] border-white/10 overflow-hidden"
        >
          <div className="w-full h-full rounded-[1.8rem] bg-gradient-to-b from-zinc-800/80 to-zinc-950 flex flex-col items-center p-6 relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
            <div className="mt-auto relative z-10 w-full text-left">
              <div className="text-2xl font-playfair font-medium text-white mb-1">Priya, 28</div>
              <div className="text-sm text-white/60 font-light">Investment Banker • New York</div>
            </div>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          style={{ x: card2X, y: card2Y, rotateZ: card2RotateZ }}
          className="absolute w-64 md:w-80 h-96 rounded-[2rem] glass p-1 shadow-[0_0_50px_rgba(0,0,0,0.8)] border-white/10 overflow-hidden"
        >
          <div className="w-full h-full rounded-[1.8rem] bg-gradient-to-b from-zinc-800/80 to-zinc-950 flex flex-col items-center p-6 relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
            <div className="mt-auto relative z-10 w-full text-left">
              <div className="text-2xl font-playfair font-medium text-white mb-1">Rohan, 31</div>
              <div className="text-sm text-white/60 font-light">Venture Partner • London</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}
