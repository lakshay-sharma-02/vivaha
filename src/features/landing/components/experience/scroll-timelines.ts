"use client"

import { useScroll, useTransform, MotionValue } from "framer-motion"
import { RefObject } from "react"

export interface CinematicTimeline {
  opacity: MotionValue<number>
  scale: MotionValue<number>
  blur: MotionValue<string>
  y: MotionValue<number>
}

export function useCinematicTimeline(
  targetRef: RefObject<HTMLElement | null>,
  isFirst: boolean = false
): CinematicTimeline {
  // We use ["start end", "end start"] to track when the section is in the viewport at all.
  // But for sticky overlap, it's easier to use ["start start", "end start"] 
  // because the section becomes sticky when its top hits the top of the viewport.
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  // The section is 200vh. It overlaps the previous by 100vh.
  // When scrollYProgress is 0, the section is sticky at the top.
  // When scrollYProgress is 1, the section is completely scrolled past.
  // For isFirst: 
  // 0 -> 0.5: Sustaining (fully visible)
  // 0.5 -> 1: Exiting (fading out, scaling down slightly)
  // For others:
  // -1 to 0: Coming into view (but we only track from 0 to 1 with this offset, wait.
  // Actually, we should use ["start center", "end start"] or just ["start start", "end start"] 
  // and handle the fade in during the early part of scrollYProgress.
  // Wait, if we use "-mt-[100vh]", the section hits "start start" right as the previous section reaches 0.5 progress (100vh out of 200vh).
  // So for Section 2, `scrollYProgress` = 0 means it has just become sticky, and Section 1 is at `scrollYProgress` = 0.5.
  // So Section 2 should fade in from 0 to 0.5.
  // Section 1 should fade out from 0.5 to 1.
  
  const opacity = useTransform(
    scrollYProgress,
    isFirst ? [0, 0.5, 1] : [0, 0.5, 0.8, 1],
    isFirst ? [1, 1, 0] : [0, 1, 1, 0]
  )

  const scale = useTransform(
    scrollYProgress,
    isFirst ? [0.5, 1] : [0, 0.5, 0.8, 1],
    isFirst ? [1, 0.9] : [1.05, 1, 1, 0.9]
  )

  const y = useTransform(
    scrollYProgress,
    isFirst ? [0, 1] : [0, 0.5, 0.8, 1],
    isFirst ? [0, -100] : [50, 0, 0, -100]
  )

  const blur = useTransform(
    scrollYProgress,
    isFirst ? [0.6, 1] : [0, 0.5, 0.8, 1],
    isFirst ? ["blur(0px)", "blur(20px)"] : ["blur(10px)", "blur(0px)", "blur(0px)", "blur(20px)"]
  )

  return {
    opacity,
    scale,
    blur,
    y
  }
}
