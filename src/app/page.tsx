"use client"

import { LandingExperience } from "@/features/landing/components/landing-experience"
import { SiteHeader } from "@/features/landing/components/site-header"

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-amber-500/30 selection:text-amber-200">
      <SiteHeader />
      <LandingExperience />
    </div>
  )
}
