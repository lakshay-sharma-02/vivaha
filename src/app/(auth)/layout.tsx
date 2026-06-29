import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Secure login and membership application for Vivaha.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
