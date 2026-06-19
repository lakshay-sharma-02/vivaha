"use server"

import { createClient } from "@/lib/supabase/server"

export async function getProfilesPage(page: number, pageSize: number = 20) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data: currentUserProfile } = await supabase
    .from('profiles')
    .select('subscription_ends_at')
    .eq('id', user.id)
    .single()

  const isSubscribed = currentUserProfile?.subscription_ends_at 
    ? new Date(currentUserProfile.subscription_ends_at) > new Date() 
    : false;

  const from = page * pageSize
  const to = from + pageSize - 1

  const baseFields = 'id, full_name, profile_photo_path, date_of_birth, town, religion, caste, education, profession, about_me'
  const premiumFields = ', income_range, diet, smoking, drinking, hobbies'

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select(isSubscribed ? baseFields + premiumFields : baseFields)
    .eq('status', 'VERIFIED')
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error("Error fetching profiles:", error)
    return []
  }

  return profiles
}
