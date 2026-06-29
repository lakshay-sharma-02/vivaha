import { OnboardingWizard } from "@/features/onboarding/components/onboarding-wizard"

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/30 selection:text-white flex flex-col">
      <OnboardingWizard />
    </main>
  )
}
