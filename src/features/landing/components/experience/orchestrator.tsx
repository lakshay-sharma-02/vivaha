"use client"

import { useEffect, useRef } from "react"
import { useScroll } from "framer-motion"
import { SceneHero } from "./scene-hero"
import { SceneIdentity } from "./scene-identity"
import { SceneGallery } from "./scene-gallery"
import { SceneTrust } from "./scene-trust"
import { SceneFinale } from "./scene-finale"

export function Orchestrator() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Prevent default body scrolling behavior to ensure a smooth cinematic track
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div ref={containerRef} className="relative h-[1200vh] w-full bg-black text-white">
      {/* 
        This is the single sticky viewport. 
        All scenes render here simultaneously as absolute overlapping layers.
        Their visibility is purely driven by scrollYProgress.
      */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Ambient Gold Particles - Global */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] bg-amber-500/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}vw`,
                top: `${Math.random() * 100}vh`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 20}s`
              }}
            />
          ))}
        </div>

        <SceneHero progress={scrollYProgress} />
        <SceneIdentity progress={scrollYProgress} />
        <SceneGallery progress={scrollYProgress} />
        <SceneTrust progress={scrollYProgress} />
        <SceneFinale progress={scrollYProgress} />

      </div>
    </div>
  )
}
