"use client"

import { ReactNode, useRef } from "react"
import { motion } from "framer-motion"
import { useCinematicTimeline } from "./scroll-timelines"

interface CinematicSectionProps {
  children: ReactNode
  isFirst?: boolean
  className?: string
}

export function CinematicSection({ children, isFirst = false, className = "" }: CinematicSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const { opacity, scale, y, blur } = useCinematicTimeline(ref, isFirst)

  // -mt-[100vh] ensures the next section overlaps the previous one halfway through its scroll
  return (
    <section 
      ref={ref} 
      className={`relative w-full ${isFirst ? "h-[200vh]" : "h-[300vh] -mt-[100vh]"} ${className}`}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden pointer-events-none">
        <motion.div
          className="w-full h-full flex items-center justify-center relative pointer-events-auto"
          style={{ opacity, scale, y, filter: blur }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

interface CinematicLayoutProps {
  children: ReactNode
}

export function CinematicLayout({ children }: CinematicLayoutProps) {
  return (
    <div className="w-full bg-black text-white relative">
      {children}
      <div className="h-[100vh]" /> {/* Buffer for the last section to finish scrolling */}
    </div>
  )
}
