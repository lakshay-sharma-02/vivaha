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
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    redirect('/onboarding')
  }

  const [professionResult, cityResult, mediaResult, familyResult, compatibilityResult] = await Promise.all([
    profile.profession_id
      ? supabase.from('professions').select('name').eq('id', profile.profession_id).maybeSingle()
      : Promise.resolve({ data: null, error: null }),
    profile.city_id
      ? supabase.from('cities').select('name').eq('id', profile.city_id).maybeSingle()
      : Promise.resolve({ data: null, error: null }),
    supabase.from('profile_media').select('*').eq('profile_id', profile.id).order('display_order', { ascending: true }),
    supabase.from('family_details').select('gotra').eq('profile_id', profile.id).maybeSingle(),
    supabase.from('compatibility_profiles').select('lifestyle').eq('profile_id', profile.id).maybeSingle(),
  ])

  const enrichedProfile = {
    ...profile,
    profession: professionResult.data ? { name: professionResult.data.name } : null,
    city: cityResult.data ? { name: cityResult.data.name } : null,
    profile_media: mediaResult.data || [],
    family_details: familyResult.data ? [familyResult.data] : [],
    compatibility_profiles: compatibilityResult.data ? [compatibilityResult.data] : [],
  }

  return <ProfileClient profile={enrichedProfile as Parameters<typeof ProfileClient>[0]['profile']} />
}
