"use client"

import { useInView } from "framer-motion"
import { RefObject, useRef } from "react"
import { useReducedMotion } from "./reduced-motion"

export interface UseSmartInViewOptions {
  once?: boolean
  amount?: number | "some" | "all"
  margin?: string
}

export interface UseSmartInViewResult {
  ref: RefObject<HTMLElement | null>
  isInView: boolean
  shouldAnimate: boolean
}

export function useSmartInView(
  options: UseSmartInViewOptions = {}
): UseSmartInViewResult {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  const inViewOptions: any = {
    once: options.once ?? true,
    amount: options.amount ?? 0.3,
  }

  if (options.margin) {
    inViewOptions.margin = options.margin
  }

  const isInView = useInView(ref, inViewOptions)

  return {
    ref,
    isInView,
    shouldAnimate: !reducedMotion && isInView,
  }
}
