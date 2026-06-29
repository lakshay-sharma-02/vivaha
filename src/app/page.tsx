"use client"

import { useEffect } from "react"
import { SiteHeader } from "@/features/landing/components/site-header"
import { SceneHero } from "@/features/landing/components/experience/scene-hero"
import { SceneIdentity } from "@/features/landing/components/experience/scene-identity"
import { SceneGallery } from "@/features/landing/components/experience/scene-gallery"
import { SceneTrust } from "@/features/landing/components/experience/scene-trust"
import { SceneFinale } from "@/features/landing/components/experience/scene-finale"

export default function Home() {
  
  // Smooth scroll behavior for the cinematic experience
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    }
  }, [])

  return (
    <div className="bg-black text-white selection:bg-amber-500/30 selection:text-amber-200">
      <SiteHeader />
      
      <main className="w-full flex flex-col">
        {/* The entire page is a sequence of scroll-driven cinematic scenes */}
        <SceneHero />
        <SceneIdentity />
        <SceneGallery />
        <SceneTrust />
        <SceneFinale />
      </main>
    </div>
  )
}
