import { OnboardingLayout } from "@/shared/layouts/onboarding-layout/onboarding-layout"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Onboarding - Vivaha",
  description: "Complete your profile to join Vivaha.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <OnboardingLayout>{children}</OnboardingLayout>
}
