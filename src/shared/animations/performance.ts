"use client"

export interface DeviceCapability {
  isLowEnd: boolean
  isMobile: boolean
  reducedMotion: boolean
  hardwareConcurrency: number
}

export function detectDeviceCapability(): DeviceCapability {
  if (typeof window === "undefined") {
    return {
      isLowEnd: false,
      isMobile: false,
      reducedMotion: false,
      hardwareConcurrency: 4,
    }
  }

  const isMobile = window.innerWidth < 768
  const hardwareConcurrency = navigator.hardwareConcurrency || 4
  const isLowEnd = hardwareConcurrency < 4
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  return {
    isLowEnd,
    isMobile,
    reducedMotion,
    hardwareConcurrency,
  }
}

export function shouldUseReducedAnimations(): boolean {
  if (typeof window === "undefined") return false

  const capability = detectDeviceCapability()
  return capability.reducedMotion || capability.isLowEnd
}
