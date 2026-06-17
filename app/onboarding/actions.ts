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

  const profileUpdate: any = {
    onboarding_step: step,
  }

  if (isCompleted) {
    profileUpdate.status = 'PENDING_VERIFICATION'
  }

  // Map Step 1
  if (data.full_name) profileUpdate.full_name = data.full_name;
  if (data.date_of_birth) profileUpdate.date_of_birth = data.date_of_birth;
  if (data.gender === 'male' || data.gender === 'female') profileUpdate.gender = data.gender;
  if (data.height_cm) profileUpdate.height_cm = data.height_cm;
  if (data.avatar_url) profileUpdate.profile_photo_path = data.avatar_url;

  // Map Step 2
  if (data.city) profileUpdate.town = data.city;
  if (data.religion) profileUpdate.religion = data.religion;
  if (data.caste) profileUpdate.caste = data.caste;
  if (data.sub_caste) profileUpdate.sub_caste = data.sub_caste;

  // Map Step 3
  if (data.education) profileUpdate.education = data.education;
  if (data.occupation) profileUpdate.profession = data.occupation;
  // Income range mapping (Frontend sends a number, DB expects a bucket enum)
  if (typeof data.income_annual === 'number') {
    const inc = data.income_annual;
    if (inc < 300000) profileUpdate.income_range = '<3L';
    else if (inc < 600000) profileUpdate.income_range = '3-6L';
    else if (inc < 1000000) profileUpdate.income_range = '6-10L';
    else if (inc < 2000000) profileUpdate.income_range = '10-20L';
    else profileUpdate.income_range = '20L+';
  }
  if (data.bio) profileUpdate.about_me = data.bio;

  // Map Step 4
  if (data.family_type === 'nuclear' || data.family_type === 'joint') {
    profileUpdate.family_type = data.family_type;
  }
  if (data.father_occupation) profileUpdate.father_occupation = data.father_occupation;
  if (data.siblings) profileUpdate.siblings_count = parseInt(data.siblings) || 0;

  // Map Step 5
  if (data.manglik === 'yes') profileUpdate.manglik_status = 'manglik';
  else if (data.manglik === 'no') profileUpdate.manglik_status = 'non_manglik';
  else if (data.manglik === 'dont_know') profileUpdate.manglik_status = 'unknown';
  
  if (data.horoscope_details) profileUpdate.horoscope_details = data.horoscope_details;

  // Map Step 6
  if (data.partner_age_min) profileUpdate.preferred_age_min = data.partner_age_min;
  if (data.partner_age_max) profileUpdate.preferred_age_max = data.partner_age_max;
  if (data.partner_location) profileUpdate.preferred_town = data.partner_location;
  if (data.partner_religion) profileUpdate.preferred_religion = data.partner_religion;
  if (data.partner_caste) profileUpdate.preferred_caste = data.partner_caste;

  // Update profiles table
  const { error: profileError } = await supabase
    .from("profiles")
    .update(profileUpdate)
    .eq("id", user.id)

  if (profileError) {
    console.error("profileError:", profileError)
    throw new Error("Failed to update profile: " + profileError.message)
  }

  // Handle verification doc separately if provided (Step 7)
  if (data.verification_doc_url && data.aadhaar_last_four) {
    const { error: docError } = await supabase
      .from("verification_documents")
      .insert({
        profile_id: user.id,
        aadhaar_photo_path: data.verification_doc_url,
        aadhaar_last4: data.aadhaar_last_four
      })
    
    if (docError) {
      console.error("docError:", docError)
      throw new Error("Failed to upload verification document: " + docError.message)
    }
  }

  return { success: true }
}

export async function getOnboardingProgress() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (profileError || !profile) return null

  // Map backend Spec.md schema back to frontend OnboardingData schema
  return {
    ...profile,
    avatar_url: profile.profile_photo_path || "",
    city: profile.town || "",
    occupation: profile.profession || "",
    bio: profile.about_me || "",
    siblings: profile.siblings_count?.toString() || "0",
    manglik: profile.manglik_status || "",
    partner_age_min: profile.preferred_age_min || 18,
    partner_age_max: profile.preferred_age_max || 40,
    partner_location: profile.preferred_town || "",
    partner_religion: profile.preferred_religion || "",
    partner_caste: profile.preferred_caste || "",
    // Income reverse mapping is hard, setting default 0 for UI purposes
    income_annual: 0,
  }
}
