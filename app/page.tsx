import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { LandingHero, TrustSection, SampleProfilesSection } from "@/components/landing"

export default async function Index() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <LandingHero />
      <TrustSection />
      <SampleProfilesSection />
    </div>
  )
}
