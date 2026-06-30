"use server"

import { createClient } from "@/shared/lib/supabase/server"
import { revalidatePath } from "next/cache"

export interface OnboardingData {
  firstName?: string
  lastName?: string
  gender?: 'male' | 'female'
  dateOfBirth?: string
  height?: string
  religion?: string
  profession?: string
  country?: string
  city?: string
  bio?: string
  phone?: string
  instagram?: string
  minAge?: number
  maxAge?: number
  minHeight?: number
  fatherOccupation?: string
  motherOccupation?: string
  familyType?: string
  familyValues?: string
  siblings?: string
  gotra?: string
  maternalGotra?: string
  grandmotherGotra?: string
  lifestyleChips?: string[]
  highestQual?: string
  university?: string
  company?: string
  income?: string
  occupation?: string
}

export async function saveOnboardingData(formData: OnboardingData) {
  try {
    const supabase = await createClient()
    
    // 1. Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return { success: false, error: "Not authenticated" }
    }

    // Helper to get or create a lookup table entry
    // Using `as any` because dynamic table names can't be typed through the Supabase generic client
    async function getOrCreateLookup(tableName: string, name?: string): Promise<string | null> {
      if (!name) return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase.from(tableName as any) as any).select('id').ilike('name', name).single()
      if (data?.id) return data.id as string;
      
      // If not found, create it
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: newData, error } = await (supabase.from(tableName as any) as any).insert({ name }).select('id').single()
      if (error) {
        console.error(`Error creating ${tableName}:`, error);
        return null;
      }
      return newData?.id as string | null;
    }

    // Helper for Country/City specifically (since city depends on country)
    async function getOrCreateLocation(countryName?: string, cityName?: string): Promise<{ countryId: string | null; cityId: string | null }> {
      const countryId = await getOrCreateLookup('countries', countryName);
      if (!countryId || !cityName) return { countryId, cityId: null };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase.from('cities') as any).select('id').eq('country_id', countryId).ilike('name', cityName).single();
      if (data?.id) return { countryId, cityId: data.id as string };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: newCity, error } = await (supabase.from('cities') as any).insert({ name: cityName, country_id: countryId }).select('id').single();
      if (error) {
        console.error('Error creating city:', error);
        return { countryId, cityId: null };
      }
      return { countryId, cityId: newCity?.id as string | null };
    }

    // Process Lookups
    const religionId = await getOrCreateLookup('religions', formData.religion);
    const professionId = await getOrCreateLookup('professions', formData.occupation);
    const { countryId, cityId } = await getOrCreateLocation(formData.country, formData.city);

    // 2. Update Profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        first_name: formData.firstName || null,
        last_name: formData.lastName || null,
        gender: formData.gender || null,
        date_of_birth: formData.dateOfBirth || null,
        height_cm: formData.height ? parseInt(formData.height) : null,
        religion_id: religionId,
        profession_id: professionId,
        city_id: cityId,
        country_id: countryId,
        bio: formData.bio || null,
        phone: formData.phone || null,
        instagram: formData.instagram || null,
        education: formData.highestQual || null,
        university: formData.university || null,
        company: formData.company || null,
        income_range: formData.income || null,
      })
      .eq('id', user.id);

    if (profileError) {
      console.error("Profile update error:", profileError)
      return { success: false, error: "Failed to update profile" }
    }

    // 3. Update Preferences
    const { error: prefError } = await supabase
      .from('preferences')
      .upsert({
        profile_id: user.id,
        min_age: formData.minAge,
        max_age: formData.maxAge,
        min_height_cm: formData.minHeight,
      }, { onConflict: 'profile_id' });
      
    if (prefError) {
      console.error("Preferences error:", prefError)
    }

    // 4. Update Family Details
    const { error: familyError } = await supabase
      .from('family_details')
      .upsert({
        profile_id: user.id,
        father_occupation: formData.fatherOccupation,
        mother_occupation: formData.motherOccupation,
        family_type: formData.familyType,
        family_values: formData.familyValues,
        siblings_info: formData.siblings,
        gotra: formData.gotra,
        maternal_gotra: formData.maternalGotra,
        grandmother_gotra: formData.grandmotherGotra
      }, { onConflict: 'profile_id' });

    if (familyError) {
      console.error("Family details error:", familyError)
    }

    // 5. Update Lifestyle & Compatibility
    const { error: compatError } = await supabase
      .from('compatibility_profiles')
      .upsert({
        profile_id: user.id,
        lifestyle: formData.lifestyleChips || [],
      }, { onConflict: 'profile_id' });

    if (compatError) {
      console.error("Compatibility error:", compatError)
    }

    revalidatePath('/dashboard')
    return { success: true }
    
  } catch (error) {
    console.error("Onboarding server error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
