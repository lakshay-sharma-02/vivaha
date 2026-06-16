"use client"

import { createClient } from "@/lib/supabase/client"
import { OnboardingData } from "@/lib/validations/onboarding"

export async function saveOnboardingProgress(
  step: number,
  data: Partial<OnboardingData>,
  isCompleted: boolean = false
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Unauthorized")

  // Split data between profiles and profile_details
  const profileFields = ["full_name", "date_of_birth", "gender", "avatar_url"]
  
  const profileUpdate: any = {
    onboarding_step: step,
    onboarding_completed: isCompleted,
  }

  if (isCompleted) {
    profileUpdate.status = 'pending'
  }

  const detailsUpdate: any = {}

  Object.entries(data).forEach(([key, value]) => {
    if (profileFields.includes(key)) {
      profileUpdate[key] = value
    } else if (key !== "verification_doc_url") {
      detailsUpdate[key] = value
    }
  })

  // Update profiles
  const { error: profileError } = await supabase
    .from("profiles")
    .update(profileUpdate)
    .eq("id", user.id)

  if (profileError) throw profileError

  // Update profile_details
  if (Object.keys(detailsUpdate).length > 0) {
    const { error: detailsError } = await supabase
      .from("profile_details")
      .update(detailsUpdate)
      .eq("profile_id", user.id)

    if (detailsError) throw detailsError
  }

  // Handle verification doc separately if provided
  if (data.verification_doc_url) {
    const { error: docError } = await supabase
      .from("verification_docs")
      .insert({
        profile_id: user.id,
        doc_type: "aadhaar",
        doc_url: data.verification_doc_url,
        status: "pending"
      })
    
    if (docError) throw docError
  }

  return { success: true }
}

export async function getOnboardingProgress() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*, profile_details(*)")
    .eq("id", user.id)
    .single()

  if (profileError) return null

  return profile
}
