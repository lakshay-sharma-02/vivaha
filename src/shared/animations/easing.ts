/**
 * Centralized easing curves for consistent animation feel across the application.
 * All curves use cubic-bezier format compatible with Framer Motion and CSS.
 */

export const easing = {
  cinematic: [0.16, 1, 0.3, 1] as const,
  luxury: [0.22, 1, 0.36, 1] as const,
  instant: [0.4, 0, 0.2, 1] as const,
  smooth: [0.45, 0, 0.55, 1] as const,
} as const

export const durations = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  cinematic: 1.2,
} as const

export const spring = {
  gentle: {
    stiffness: 50,
    damping: 20,
    mass: 0.1,
  },
  responsive: {
    stiffness: 100,
    damping: 15,
    mass: 0.5,
  },
  snappy: {
    stiffness: 200,
    damping: 20,
    mass: 0.5,
  },
} as const
