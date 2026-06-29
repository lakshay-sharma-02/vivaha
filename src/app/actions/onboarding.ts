"use server"

import { createClient } from "@/shared/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function saveOnboardingData(formData: any) {
  try {
    const supabase = await createClient()
    
    // 1. Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return { success: false, error: "Not authenticated" }
    }

    // Helper to get or create a lookup table entry
    async function getOrCreateLookup(tableName: string, name: string) {
      if (!name) return null;
      // Try to find it
      const { data } = await supabase.from(tableName).select('id').ilike('name', name).single()
      if (data) return data.id;
      
      // If not found, create it
      const { data: newData, error } = await supabase.from(tableName).insert({ name }).select('id').single()
      if (error) {
        console.error(`Error creating ${tableName}:`, error);
        return null;
      }
      return newData.id;
    }

    // Helper for Country/City specifically (since city depends on country)
    async function getOrCreateLocation(countryName: string, cityName: string) {
      const countryId = await getOrCreateLookup('countries', countryName);
      if (!countryId || !cityName) return { countryId, cityId: null };

      const { data } = await supabase.from('cities').select('id').eq('country_id', countryId).ilike('name', cityName).single();
      if (data) return { countryId, cityId: data.id };

      const { data: newCity, error } = await supabase.from('cities').insert({ name: cityName, country_id: countryId }).select('id').single();
      if (error) {
        console.error('Error creating city:', error);
        return { countryId, cityId: null };
      }
      return { countryId, cityId: newCity.id };
    }

    // Process Lookups
    const religionId = await getOrCreateLookup('religions', formData.religion);
    const professionId = await getOrCreateLookup('professions', formData.profession);
    const { countryId, cityId } = await getOrCreateLocation(formData.country, formData.city);

    // 2. Update Profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        gender: formData.gender || null,
        date_of_birth: formData.dateOfBirth || null,
        height_cm: formData.height ? parseInt(formData.height) : null,
        religion_id: religionId,
        profession_id: professionId,
        city_id: cityId,
        country_id: countryId,
        bio: formData.bio || null,
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
        father_occupation: formData.parentsOccupation,
        family_type: formData.familyType,
        family_values: formData.familyValues,
        siblings_info: formData.siblings
      }, { onConflict: 'profile_id' });

    // 5. Update Lifestyle & Compatibility
    const { error: compatError } = await supabase
      .from('compatibility_profiles')
      .upsert({
        profile_id: user.id,
        lifestyle: formData.lifestyleChips || [],
      }, { onConflict: 'profile_id' });

    revalidatePath('/dashboard')
    return { success: true }
    
  } catch (error) {
    console.error("Onboarding server error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
