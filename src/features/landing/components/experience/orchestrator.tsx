"use client"

import { useEffect, useRef } from "react"
import { useScroll, useSpring } from "framer-motion"
import { SceneHero } from "./scene-hero"
import { SceneIdentity } from "./scene-identity"
import { SceneGallery } from "./scene-gallery"
import { SceneTrust } from "./scene-trust"
import { SceneFinale } from "./scene-finale"
import { CanvasParticles } from "./canvas-particles"

export function Orchestrator() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Apply a buttery smooth physics spring to the raw scroll value
  // This completely eliminates jagged mouse-wheel scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
    mass: 0.2,
    restDelta: 0.0001
  })

  // Prevent default body scrolling behavior to ensure a smooth cinematic track
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div ref={containerRef} className="relative h-[3000vh] w-full bg-black text-white">
      {/* 
        This is the single sticky viewport. 
        All scenes render here simultaneously as absolute overlapping layers.
        Their visibility is purely driven by scrollYProgress.
      */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center" style={{ willChange: "transform" }}>
        
        {/* Ambient Gold Particles - Hardware Accelerated Canvas */}
        <CanvasParticles />

        <SceneHero progress={smoothProgress} />
        <SceneIdentity progress={smoothProgress} />
        <SceneGallery progress={smoothProgress} />
        <SceneTrust progress={smoothProgress} />
        <SceneFinale progress={smoothProgress} />

      </div>
    </div>
  )
}
