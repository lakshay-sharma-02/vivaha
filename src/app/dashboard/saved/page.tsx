import { redirect } from "next/navigation"
import { createClient } from "@/shared/lib/supabase/server"
import SavedClient from "@/features/dashboard/components/saved-client"

export default async function SavedPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }

  return <SavedClient />
}
