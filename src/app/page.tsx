import { SiteHeader } from "@/features/landing/components/site-header"
import { HeroSection } from "@/features/landing/components/hero-section"
import { BentoFeatures } from "@/features/landing/components/bento-features"
import { FinalCTA } from "@/features/landing/components/final-cta"
import { SiteFooter } from "@/features/landing/components/site-footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/30">
      {/* 
        The layout.tsx provides the global AmbientBackground.
        This page acts as the structural container for the luxury sections.
      */}
      <SiteHeader />
      
      <main className="flex-1 flex flex-col items-center w-full">
        <div className="w-full">
          <HeroSection />
        </div>

        <div className="w-full max-w-7xl mx-auto">
          <BentoFeatures />
        </div>

        <div className="w-full mt-24">
          <FinalCTA />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
