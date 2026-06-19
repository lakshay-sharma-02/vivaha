import OnboardingWizard from "./onboarding-wizard"

export const metadata = {
  title: "Onboarding | Sahachar",
  description: "Complete your profile to find your perfect match.",
}

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <OnboardingWizard />
    </main>
  )
}
