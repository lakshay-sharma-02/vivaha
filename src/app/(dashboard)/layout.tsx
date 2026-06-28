import { DashboardLayout } from "@/shared/layouts/dashboard-layout/dashboard-layout"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard - Vivaha",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}
