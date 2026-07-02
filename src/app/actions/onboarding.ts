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
  state?: string
  city?: string
  bio?: string
  phone?: string
  instagram?: string
  minAge?: number
  maxAge?: number
  minHeight?: number
  maxHeight?: number
  fatherOccupation?: string
  motherOccupation?: string
  familyType?: string
  familyValues?: string
  siblings?: string
  gotra?: string
  maternalGotra?: string
  grandmotherGotra?: string
  community?: string
  motherTongue?: string
  hobbies?: string
  lifestyleChips?: string[]
  prefReligionChips?: string[]
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

    // Helper for Country/City/State location hierarchy
    async function getOrCreateLocation(countryName?: string, cityName?: string, stateName?: string): Promise<{ countryId: string | null; stateId: string | null; cityId: string | null }> {
      const countryId = await getOrCreateLookup('countries', countryName);
      if (!countryId) return { countryId: null, stateId: null, cityId: null };

      // Handle state
      let stateId: string | null = null;
      if (stateName) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data } = await (supabase.from('states' as any) as any).select('id').eq('country_id', countryId).ilike('name', stateName).single();
        if (data?.id) {
          stateId = data.id as string;
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: newState, error } = await (supabase.from('states' as any) as any).insert({ name: stateName, country_id: countryId }).select('id').single();
          if (!error && newState?.id) {
            stateId = newState.id as string;
          } else {
            console.error('Error creating state:', error);
          }
        }
      }

      // Handle city
      let cityId: string | null = null;
      if (cityName) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data } = await (supabase.from('cities') as any).select('id').eq('country_id', countryId).ilike('name', cityName).single();
        if (data?.id) {
          cityId = data.id as string;
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: newCity, error } = await (supabase.from('cities') as any).insert({ name: cityName, country_id: countryId }).select('id').single();
          if (!error && newCity?.id) {
            cityId = newCity.id as string;
          } else {
            console.error('Error creating city:', error);
          }
        }
      }

      return { countryId, stateId, cityId };
    }

    // Process Lookups
    const religionId = await getOrCreateLookup('religions', formData.religion);
    const professionId = await getOrCreateLookup('professions', formData.occupation);
    const communityId = await getOrCreateLookup('communities', formData.community);
    const languageId = await getOrCreateLookup('languages', formData.motherTongue);
    const { countryId, stateId, cityId } = await getOrCreateLocation(formData.country, formData.city, formData.state);

    // 2. Upsert Profile
    // Note: state_id, community_id, mother_tongue_id are new columns added via migrations
    // but not yet in generated types. Cast to any until types are regenerated.
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        first_name: formData.firstName?.trim() || "",
        last_name: formData.lastName?.trim() || "",
        gender: formData.gender || null,
        date_of_birth: formData.dateOfBirth || null,
        height_cm: formData.height ? parseInt(formData.height) : null,
        religion_id: religionId,
        profession_id: professionId,
        country_id: countryId,
        state_id: stateId,
        city_id: cityId,
        community_id: communityId,
        mother_tongue_id: languageId,
        bio: formData.bio || null,
      } as any, { onConflict: 'id' });

    if (profileError) {
      console.error("Profile update error:", profileError)
      return { success: false, error: `Database Error (Profiles): ${profileError.message || profileError.details || JSON.stringify(profileError)}` }
    }

    // 3. Update Preferences
    // Note: max_height_cm is a new column added via migrations but not yet in generated types
    const { error: prefError } = await supabase
      .from('preferences')
      .upsert({
        profile_id: user.id,
        min_age: formData.minAge,
        max_age: formData.maxAge,
        min_height_cm: formData.minHeight,
        max_height_cm: formData.maxHeight,
      } as any, { onConflict: 'profile_id' });
      
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
        interests: formData.hobbies ? formData.hobbies.split(',').map(h => h.trim()).filter(Boolean) : [],
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
