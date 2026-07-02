"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { usePerformanceManager } from "./performance-manager"

// High performance CSS-based particle system
export function ParticleSystem() {
  const { quality } = usePerformanceManager()
  const [particles, setParticles] = useState<{ id: number, x: number, y: number, s: number, d: number }[]>([])

  useEffect(() => {
    if (quality === "low") return

    const count = quality === "high" ? 40 : 15
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 2 + 0.5,
      d: Math.random() * 15 + 10,
    }))
    setParticles(newParticles)
  }, [quality])

  if (quality === "low") return null

  return (
    <div className="fixed inset-0 pointer-events-none -z-40 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-500/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
          }}
          animate={{
            y: ["0vh", "-20vh"],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.d,
            repeat: Infinity,
            ease: "linear",
            delay: -Math.random() * p.d
          }}
        />
      ))}
    </div>
  )
}
