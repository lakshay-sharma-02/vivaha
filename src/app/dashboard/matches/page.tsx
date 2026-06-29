import { redirect } from "next/navigation"
import { createClient } from "@/shared/lib/supabase/server"
import MatchesClient from "@/features/dashboard/components/matches-client"

export default async function MatchesPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }

  return <MatchesClient />
}
