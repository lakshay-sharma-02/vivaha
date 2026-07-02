"use client"

import { HeroSection } from "./sections/hero-section"
import { IdentitySection } from "./sections/identity-section"
import { VerificationSection } from "./sections/verification-section"
import { GallerySection } from "./sections/gallery-section"
import { TrustSection } from "./sections/trust-section"
import { FinaleSection } from "./sections/finale-section"
import { CinematicLayout, AmbientBackground, ParticleSystem } from "./experience"

export function LandingExperience() {
  return (
    <CinematicLayout>
      <AmbientBackground />
      <ParticleSystem />
      <HeroSection />
      <IdentitySection />
      <VerificationSection />
      <GallerySection />
      <TrustSection />
      <FinaleSection />
    </CinematicLayout>
  )
}
