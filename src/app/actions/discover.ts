"use server"

import { createClient } from "@/shared/lib/supabase/server"

export async function fetchDiscoverProfiles(page: number = 1) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: "Not authenticated", profiles: [] }
    }

    // Fetch current user's profile and preferences for compatibility calculation
    const { data: currentUserProfile } = await supabase
      .from('profiles')
      .select('date_of_birth, religion_id, city_id, height_cm')
      .eq('id', user.id)
      .single()

    const { data: currentUserPrefs } = await supabase
      .from('preferences')
      .select('min_age, max_age, min_height_cm, preferred_religions, preferred_cities')
      .eq('profile_id', user.id)
      .single()

    const pageSize = 20
    const start = (page - 1) * pageSize
    const end = start + pageSize - 1

    // Fetch all profiles EXCEPT the current user
    // Also joining profession, city, media, compatibility, family
    const { data: profilesRaw, error } = await supabase
      .from('profiles')
      .select(`
        id,
        first_name,
        last_name,
        date_of_birth,
        bio,
        verification_status,
        education,
        income_range,
        profession_id,
        city_id,
        religion_id,
        height_cm
      `)
      .neq('id', user.id)
      .range(start, end)

    if (error) {
      console.error("Error fetching discover profiles:", error)
      return { success: false, error: "Failed to load profiles", profiles: [] }
    }

    type ProfileJoined = {
      id: string
      first_name: string
      last_name: string | null
      date_of_birth: string | null
      bio: string | null
      verification_status: string | null
      education: string | null
      income_range: string | null
      profession_id: string | null
      city_id: string | null
      religion_id: string | null
      height_cm: number | null
    }

    // We need to map the database structure to the UI structure our components expect
    const profiles = profilesRaw as ProfileJoined[] | null
    const profileIds = (profiles || []).map((p) => p.id)
    const professionIds = [...new Set((profiles || []).map((p) => p.profession_id).filter((id): id is string => Boolean(id)))]
    const cityIds = [...new Set((profiles || []).map((p) => p.city_id).filter((id): id is string => Boolean(id)))]

    const [{ data: professions }, { data: cities }, { data: mediaRows }, { data: compatibilityRows }, { data: familyRows }] = await Promise.all([
      professionIds.length > 0
        ? supabase.from('professions').select('id, name').in('id', professionIds)
        : Promise.resolve({ data: [], error: null }),
      cityIds.length > 0
        ? supabase.from('cities').select('id, name').in('id', cityIds)
        : Promise.resolve({ data: [], error: null }),
      profileIds.length > 0
        ? supabase.from('profile_media').select('profile_id, bucket_path, is_primary').in('profile_id', profileIds)
        : Promise.resolve({ data: [], error: null }),
      profileIds.length > 0
        ? supabase.from('compatibility_profiles').select('profile_id, lifestyle').in('profile_id', profileIds)
        : Promise.resolve({ data: [], error: null }),
      profileIds.length > 0
        ? supabase.from('family_details').select('profile_id, family_type').in('profile_id', profileIds)
        : Promise.resolve({ data: [], error: null }),
    ])

    const professionMap = new Map((professions || []).map((item) => [item.id, item.name]))
    const cityMap = new Map((cities || []).map((item) => [item.id, item.name]))
    const mediaMap = new Map<string, { bucket_path: string; is_primary: boolean | null }[]>()
    for (const row of mediaRows || []) {
      const existing = mediaMap.get(row.profile_id) || []
      existing.push(row)
      mediaMap.set(row.profile_id, existing)
    }
    const compatibilityMap = new Map((compatibilityRows || []).map((row) => [row.profile_id, row.lifestyle]))
    const familyMap = new Map((familyRows || []).map((row) => [row.profile_id, row.family_type]))

    const mappedProfiles = (profiles || []).map((p) => {
      // Calculate age from date_of_birth
      let age: number | string = '?'
      if (p.date_of_birth) {
        const birth = new Date(p.date_of_birth)
        const today = new Date()
        age = today.getFullYear() - birth.getFullYear()
        const m = today.getMonth() - birth.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
      }
      
      const professionName = p.profession_id ? professionMap.get(p.profession_id) ?? "Professional" : "Professional"
      const cityName = p.city_id ? cityMap.get(p.city_id) ?? "Not Specified" : "Not Specified"
      
      const mediaArr = mediaMap.get(p.id) || [];
      const primaryMedia = mediaArr.find(m => m.is_primary) || mediaArr[0];
      const imageUrl = primaryMedia
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile_media/${primaryMedia.bucket_path}`
        : null;

      const tags = compatibilityMap.get(p.id) || [];

      const familyType = familyMap.get(p.id) || "Not Specified";

      // Real compatibility score based on preferences and profile matching
      let compatScore = 50; // Base score

      if (currentUserPrefs) {
        // Age compatibility
        if (typeof age === 'number' && currentUserPrefs.min_age && currentUserPrefs.max_age) {
          if (age >= currentUserPrefs.min_age && age <= currentUserPrefs.max_age) {
            compatScore += 20;
          }
        }

        // Location compatibility
        if (p.city_id && currentUserPrefs.preferred_cities && Array.isArray(currentUserPrefs.preferred_cities)) {
          if (currentUserPrefs.preferred_cities.includes(p.city_id)) {
            compatScore += 15;
          }
        }

        // Religion compatibility
        if (p.religion_id && currentUserPrefs.preferred_religions && Array.isArray(currentUserPrefs.preferred_religions)) {
          if (currentUserPrefs.preferred_religions.includes(p.religion_id)) {
            compatScore += 15;
        }
        }

        // Height compatibility
        if (p.height_cm && currentUserPrefs.min_height_cm) {
          if (p.height_cm >= currentUserPrefs.min_height_cm) {
            compatScore += 10;
          }
        }
      }

      // Verification bonus
      if (p.verification_status === 'verified') {
        compatScore += 5;
      }

      // Ensure score stays within 50-99 range (never 100 to show it's calculated)
      compatScore = Math.min(Math.max(compatScore, 50), 99);

      return {
        id: p.id,
        name: `${p.first_name} ${p.last_name || ''}`.trim(),
        age: age,
        location: cityName,
        profession: professionName,
        education: p.education || "Not Specified",
        bio: p.bio || "No bio provided.",
        compatibility: compatScore,
        verified: p.verification_status === 'verified',
        image: imageUrl ?? "",
        tags: tags.length > 0 ? tags : ["No Tags"],
        family: familyType,
        income: p.income_range || "Not Specified"
      }
    })

    return { success: true, profiles: mappedProfiles }

  } catch (err) {
    console.error("Discover Fetch Exception:", err)
    return { success: false, error: "An unexpected error occurred", profiles: [] }
  }
}
