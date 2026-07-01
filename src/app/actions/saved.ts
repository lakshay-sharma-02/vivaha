"use server"

import { createClient } from "@/shared/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getSavedProfiles() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  const { data: savedProfiles, error } = await supabase
    .from('saved_profiles')
    .select(`
      id,
      created_at,
      saved_profile_id,
      profiles:saved_profile_id (
        id,
        first_name,
        last_name,
        gender,
        date_of_birth,
        height_cm,
        bio,
        city_id,
        profession_id,
        religion_id,
        verification_status,
        cities (name),
        professions (name),
        religions (name),
        profile_media (
          id,
          bucket_path,
          is_primary
        )
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching saved profiles:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data: savedProfiles }
}

export async function saveProfile(profileId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  if (user.id === profileId) {
    return { success: false, error: "Cannot save your own profile" }
  }

  const { error } = await supabase
    .from('saved_profiles')
    .insert({
      user_id: user.id,
      saved_profile_id: profileId
    })

  if (error) {
    if (error.code === '23505') {
      return { success: false, error: "Profile already saved" }
    }
    console.error('Error saving profile:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/dashboard/saved')
  revalidatePath('/dashboard/discover')

  return { success: true }
}

export async function unsaveProfile(profileId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  const { error } = await supabase
    .from('saved_profiles')
    .delete()
    .eq('user_id', user.id)
    .eq('saved_profile_id', profileId)

  if (error) {
    console.error('Error unsaving profile:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/dashboard/saved')
  revalidatePath('/dashboard/discover')

  return { success: true }
}

export async function isSaved(profileId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "Not authenticated", isSaved: false }
  }

  const { data, error } = await supabase
    .from('saved_profiles')
    .select('id')
    .eq('user_id', user.id)
    .eq('saved_profile_id', profileId)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking saved status:', error)
    return { success: false, error: error.message, isSaved: false }
  }

  return { success: true, isSaved: !!data }
}

export async function getSavedProfileIds() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "Not authenticated", ids: [] }
  }

  const { data, error } = await supabase
    .from('saved_profiles')
    .select('saved_profile_id')
    .eq('user_id', user.id)

  if (error) {
    console.error('Error fetching saved profile IDs:', error)
    return { success: false, error: error.message, ids: [] }
  }

  return {
    success: true,
    ids: data?.map(item => item.saved_profile_id) || []
  }
}
