import AdminVerificationPage from "./verify-page"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  // Check if user exists in the admins table
  const { data: adminCheck } = await supabase
    .from('admins')
    .select('id')
    .eq('id', user.id)
    .single()

  if (!adminCheck) redirect("/dashboard")

  return <AdminVerificationPage />
}
