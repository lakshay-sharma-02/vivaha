import { redirect } from "next/navigation"
import { createClient } from "@/shared/lib/supabase/server"
import VerificationClient from "@/features/dashboard/components/verification-client"

export default async function VerificationPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('verification_status')
    .eq('id', user.id)
    .single()

  return <VerificationClient status={profile?.verification_status} />
}
