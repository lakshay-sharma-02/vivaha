import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout"

export const metadata = {
  title: "Dashboard | Vivaha",
  description: "Your personalized matchmaking concierge.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}
