"use client"

import { motion } from "framer-motion"

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-background">
      {/* 
        A highly dynamic, luxurious aurora mesh gradient.
        We use higher opacities but massive blur to create a rich 'silk' effect.
      */}
      <motion.div
        className="absolute -top-[40%] -left-[20%] h-[120vw] w-[120vw] rounded-full bg-primary/10 blur-[180px] dark:bg-primary/15 dark:blur-[220px]"
        animate={{
          x: ["0%", "8%", "0%"],
          y: ["0%", "12%", "0%"],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-[30%] -right-[30%] h-[100vw] w-[100vw] rounded-full bg-primary/15 blur-[160px] dark:bg-primary/20 dark:blur-[200px]"
        animate={{
          x: ["0%", "-10%", "0%"],
          y: ["0%", "-8%", "0%"],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-[20%] left-[20%] h-[80vw] w-[80vw] rounded-full bg-secondary/30 blur-[150px] dark:bg-secondary/10 dark:blur-[180px]"
        animate={{
          x: ["0%", "5%", "0%"],
          y: ["0%", "-10%", "0%"],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Film grain overlay for editorial texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  )
}
