import { redirect } from "next/navigation"
import { createClient } from "@/shared/lib/supabase/server"
import ProfileClient from "@/features/dashboard/components/profile-client"

export default async function ProfilePage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }

  // Fetch their profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name, gender, date_of_birth, profession:profession_id(name), city:city_id(name), phone, instagram')
    .eq('id', user.id)
    .single()

  return <ProfileClient profile={profile} />
}
