"use client"

import { useEffect, useRef } from "react"

export function CanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true })
    if (!ctx) return

    let animationFrameId: number
    let particles: { x: number; y: number; radius: number; vx: number; vy: number; alpha: number }[] = []
    const isMobile = window.innerWidth < 768
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      initParticles()
    }

    const initParticles = () => {
      particles = []
      let particleCount

      if (isLowEnd) {
        particleCount = 20
      } else if (isMobile) {
        particleCount = 30
      } else {
        particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 20000), 80)
      }

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: Math.random() * 1.2 + 0.4,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15 - 0.08,
          alpha: Math.random() * 0.4 + 0.15,
        })
      }
    }

    let lastFrameTime = 0
    const targetFPS = isMobile || isLowEnd ? 30 : 60
    const frameInterval = 1000 / targetFPS

    const render = (currentTime: number) => {
      const elapsed = currentTime - lastFrameTime

      if (elapsed > frameInterval) {
        lastFrameTime = currentTime - (elapsed % frameInterval)

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          p.x += p.vx
          p.y += p.vy

          if (p.x < 0) p.x = window.innerWidth
          else if (p.x > window.innerWidth) p.x = 0
          if (p.y < 0) p.y = window.innerHeight
          else if (p.y > window.innerHeight) p.y = 0

          ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resize, 250)
    }

    window.addEventListener("resize", handleResize)
    resize()
    render(0)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-50"
      style={{ transform: "translateZ(0)" }}
    />
  )
}
