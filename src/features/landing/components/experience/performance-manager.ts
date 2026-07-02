"use client"

import { useState, useEffect } from "react"

export type QualityLevel = "low" | "mid" | "high"

export interface DeviceCapability {
  quality: QualityLevel
  reducedMotion: boolean
  isMobile: boolean
}

export function usePerformanceManager(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    quality: "high",
    reducedMotion: false,
    isMobile: false,
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const hardwareConcurrency = navigator.hardwareConcurrency || 4
    const isMobile = window.innerWidth < 768
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    
    const updateCapability = (reducedMotion: boolean) => {
      let quality: QualityLevel = "high"
      if (reducedMotion || hardwareConcurrency <= 2) {
        quality = "low"
      } else if (isMobile || hardwareConcurrency <= 4) {
        quality = "mid"
      }
      setCapability({ quality, reducedMotion, isMobile })
    }

    updateCapability(mediaQuery.matches)

    const listener = (e: MediaQueryListEvent) => updateCapability(e.matches)
    mediaQuery.addEventListener("change", listener)
    return () => mediaQuery.removeEventListener("change", listener)
  }, [])

  return capability
}
