import { 
  LandingHero, 
  TrustBar, 
  HowItWorks, 
  WhySahacharDifferent, 
  FeaturedProfiles, 
  SuccessStories, 
  SafetyPrivacy, 
  FinalCTA, 
  Footer 
} from "@/components/landing"

export default async function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <LandingHero />
      <TrustBar />
      <HowItWorks />
      <WhySahacharDifferent />
      <FeaturedProfiles />
      <SuccessStories />
      <SafetyPrivacy />
      <FinalCTA />
      <Footer />
    </div>
  )
}
