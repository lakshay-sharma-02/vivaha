"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

export function SceneHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Scene 1: Arrival & Logo Dissolve
  const arrivalOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0])
  const arrivalScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.5])
  const arrivalBlur = useTransform(scrollYProgress, [0, 0.2], ["blur(0px)", "blur(20px)"])

  // Scene 2: 3D Floating Cards Orbit (0.1 to 0.4)
  const cardContainerOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.45, 0.6], [0, 1, 1, 0])
  
  const card1X = useTransform(scrollYProgress, [0.2, 0.4, 0.5], [100, -100, -300])
  const card1Y = useTransform(scrollYProgress, [0.2, 0.4, 0.5], [50, -50, -100])
  const card1RotateZ = useTransform(scrollYProgress, [0.2, 0.4, 0.5], [-10, 0, -20])
  const card1RotateY = useTransform(scrollYProgress, [0.2, 0.4], [30, 0])

  const card2X = useTransform(scrollYProgress, [0.2, 0.4, 0.5], [-100, 100, 300])
  const card2Y = useTransform(scrollYProgress, [0.2, 0.4, 0.5], [-50, 50, 100])
  const card2RotateZ = useTransform(scrollYProgress, [0.2, 0.4, 0.5], [10, 0, 20])
  const card2RotateY = useTransform(scrollYProgress, [0.2, 0.4], [-30, 0])

  // Scene 3: Connection Nodes (0.4 to 0.6)
  const connectionOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0])
  const linePathLength = useTransform(scrollYProgress, [0.4, 0.5], [0, 1])
  
  if (!mounted) return null;

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-black">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center perspective-[1000px]">
        
        {/* Ambient Gold Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-500/50 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: Math.random() * 0.5 + 0.1
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                opacity: [null, Math.random(), 0]
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Scene 1: The Emblem */}
        <motion.div 
          style={{ opacity: arrivalOpacity, scale: arrivalScale, filter: arrivalBlur }}
          className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none"
        >
          <motion.div 
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-amber-500/10 to-transparent border border-amber-500/20 shadow-[0_0_100px_rgba(245,158,11,0.2)] flex items-center justify-center"
          >
            <span className="font-playfair text-4xl md:text-6xl text-amber-50/90 font-light tracking-widest">V</span>
          </motion.div>
        </motion.div>

        {/* Scene 2 & 3: Floating Profiles & Connection */}
        <motion.div style={{ opacity: cardContainerOpacity }} className="absolute inset-0 flex items-center justify-center">
          
          {/* Connection Lines (Scene 3) */}
          <motion.div style={{ opacity: connectionOpacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
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
                  <motion.div key={node} className="flex flex-col items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,1)]" />
                    <span className="text-white/60 text-xs uppercase tracking-widest">{node}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 1 */}
          <motion.div
            style={{ 
              x: card1X, y: card1Y, rotateZ: card1RotateZ, rotateY: card1RotateY,
              transformStyle: "preserve-3d"
            }}
            className="absolute w-64 md:w-80 h-96 rounded-[2rem] glass p-1 shadow-[0_0_50px_rgba(0,0,0,0.5)] border-white/10 overflow-hidden z-20"
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
            style={{ 
              x: card2X, y: card2Y, rotateZ: card2RotateZ, rotateY: card2RotateY,
              transformStyle: "preserve-3d"
            }}
            className="absolute w-64 md:w-80 h-96 rounded-[2rem] glass p-1 shadow-[0_0_50px_rgba(0,0,0,0.5)] border-white/10 overflow-hidden z-20"
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
      </div>
    </section>
  )
}
