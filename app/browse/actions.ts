"use server"

import { createClient } from "@/lib/supabase/server"

export async function getProfilesPage(page: number, pageSize: number = 20) {
  const supabase = await createClient()
  
  const from = page * pageSize
  const to = from + pageSize - 1

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, full_name, profile_photo_path, date_of_birth, town, religion, caste, education, profession, about_me')
    .eq('status', 'VERIFIED')
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error("Error fetching profiles:", error)
    return []
  }

  return profiles
}
