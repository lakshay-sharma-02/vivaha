import OnboardingWizard from "@/app/onboarding/onboarding-wizard"

export const metadata = {
  title: "Edit Profile | Sahachar",
  description: "Update your Sahachar profile details.",
}

export default function EditProfilePage() {
  return (
    <main className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-4xl pt-8 pb-16 px-4">
        <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
        <OnboardingWizard editMode={true} />
      </div>
    </main>
  )
}
