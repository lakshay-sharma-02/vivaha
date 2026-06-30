import { redirect } from "next/navigation"
import { createClient } from "@/shared/lib/supabase/server"
import SupportClient from "@/features/dashboard/components/support-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Support — Vivaha",
  description: "Get help and contact Vivaha support.",
}

export default async function SupportPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect("/login")

  return <SupportClient userEmail={user.email ?? ""} />
}
