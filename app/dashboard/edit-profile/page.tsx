import OnboardingWizard from "@/app/onboarding/onboarding-wizard"

export const metadata = {
  title: "Edit Profile | Vivaha",
  description: "Update your Vivaha profile details.",
}

export default function EditProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <OnboardingWizard editMode={true} />
    </main>
  )
}
