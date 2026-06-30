import { redirect } from "next/navigation"
import { createClient } from "@/shared/lib/supabase/server"
import MembershipClient from "@/features/dashboard/components/membership-client"

export default async function MembershipPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }

  const { data: profile } = await supabase.from('profiles').select('first_name, last_name, phone').eq('id', user.id).single()

  return <MembershipClient userEmail={user.email} userProfile={profile} />
}
