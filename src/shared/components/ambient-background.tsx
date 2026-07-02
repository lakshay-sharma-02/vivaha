"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "@/shared/animations"

export function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [reducedMotion])

  const shouldAnimate = !reducedMotion && isVisible

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-background"
    >
      <motion.div
        className="absolute -top-[40%] -left-[20%] h-[120vw] w-[120vw] rounded-full bg-primary/10 blur-[60px] dark:bg-primary/15 dark:blur-[80px]"
        animate={
          shouldAnimate
            ? {
                x: ["0%", "8%", "0%"],
                y: ["0%", "12%", "0%"],
                scale: [1, 1.05, 1],
              }
            : {}
        }
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-[30%] -right-[30%] h-[100vw] w-[100vw] rounded-full bg-primary/15 blur-[60px] dark:bg-primary/20 dark:blur-[70px]"
        animate={
          shouldAnimate
            ? {
                x: ["0%", "-10%", "0%"],
                y: ["0%", "-8%", "0%"],
                scale: [1, 1.1, 1],
              }
            : {}
        }
        transition={{
          duration: 75,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
