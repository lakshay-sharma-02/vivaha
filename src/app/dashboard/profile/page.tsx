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
    .select(`
      *,
      profession:profession_id(name), 
      city:city_id(name),
      profile_media(bucket_path, is_primary),
      family_details(gotra),
      compatibility_profiles(lifestyle)
    `)
    .eq('id', user.id)
    .single()

  if (!profile) {
    redirect('/onboarding')
  }

  return <ProfileClient profile={profile as Parameters<typeof ProfileClient>[0]['profile']} />
}
