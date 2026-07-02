"use client"

import { motion } from "framer-motion"
import { usePerformanceManager } from "./performance-manager"
import { useMousePosition } from "./mouse-interaction"

export function AmbientBackground() {
  const { quality } = usePerformanceManager()
  const { mouseX, mouseY } = useMousePosition()

  if (quality === "low") {
    return <div className="fixed inset-0 bg-black -z-50 pointer-events-none" />
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50 bg-black">
      {/* Base Grain */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Volumetric Soft Light moving slowly */}
      <motion.div
        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vh] rounded-full mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, rgba(0,0,0,0) 70%)",
        }}
        animate={{
          x: ["0%", "10%", "0%"],
          y: ["0%", "5%", "0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute top-[40%] right-[0%] w-[50vw] h-[70vh] rounded-full mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(217, 119, 6, 0.05) 0%, rgba(0,0,0,0) 60%)",
        }}
        animate={{
          x: ["0%", "-10%", "0%"],
          y: ["0%", "-10%", "0%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Mouse Follow Spotlight (only high quality) */}
      {quality === "high" && (
        <motion.div
          className="absolute w-[40vw] h-[40vw] rounded-full mix-blend-screen -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, rgba(0,0,0,0) 70%)",
            x: mouseX,
            y: mouseY,
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        />
      )}
    </div>
  )
}
