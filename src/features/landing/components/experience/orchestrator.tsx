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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    mass: 0.1,
    restDelta: 0.001
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div ref={containerRef} className="relative h-[2500vh] w-full bg-black text-white">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center" style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}>

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
