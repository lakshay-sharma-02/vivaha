import { Variants } from "framer-motion"
import { easing, durations } from "./easing"
import { getReducedMotion } from "./reduced-motion"

function getAnimationDuration(duration: number): number {
  return getReducedMotion() ? 0.01 : duration
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: getAnimationDuration(durations.normal),
      ease: easing.cinematic,
    },
  },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: getAnimationDuration(durations.slow),
      ease: easing.cinematic,
    },
  },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: getAnimationDuration(durations.slow),
      ease: easing.cinematic,
    },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: getAnimationDuration(durations.slow),
      ease: easing.luxury,
    },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: getAnimationDuration(durations.slow),
      ease: easing.cinematic,
    },
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: getAnimationDuration(durations.slow),
      ease: easing.cinematic,
    },
  },
}

export const reveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: getAnimationDuration(durations.cinematic),
      ease: easing.luxury,
    },
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: getReducedMotion() ? 0 : 0.1,
      delayChildren: getReducedMotion() ? 0 : 0.2,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: getAnimationDuration(durations.normal),
      ease: easing.cinematic,
    },
  },
}
