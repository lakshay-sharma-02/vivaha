import OnboardingWizard from "@/app/onboarding/onboarding-wizard"

export const metadata = {
  title: "Edit Profile | Sahachar",
  description: "Update your Sahachar profile details.",
}

export default function EditProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <OnboardingWizard editMode={true} />
    </main>
  )
}
