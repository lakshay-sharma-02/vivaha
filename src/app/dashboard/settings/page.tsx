import { redirect } from "next/navigation"
import { createClient } from "@/shared/lib/supabase/server"
import SettingsClient from "@/features/dashboard/components/settings-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings — Vivaha",
  description: "Manage your account settings and preferences.",
}

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect("/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name, is_paused, is_active")
    .eq("id", user.id)
    .single()

  return <SettingsClient user={user} profile={profile} />
}
