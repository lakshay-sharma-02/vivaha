"use server"

import { createClient } from "@/shared/lib/supabase/server"

export async function fetchDiscoverProfiles(page: number = 1) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: "Not authenticated", profiles: [] }
    }

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
        profession:profession_id(name),
        city:city_id(name),
        media:profile_media(bucket_path, is_primary),
        compatibility:compatibility_profiles(lifestyle),
        family:family_details(family_type)
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
      profession: { name: string }[] | { name: string } | null
      city: { name: string }[] | { name: string } | null
      media: { bucket_path: string, is_primary: boolean }[] | null
      compatibility: { lifestyle: string[] }[] | { lifestyle: string[] } | null
      family: { family_type: string }[] | { family_type: string } | null
    }

    // We need to map the database structure to the UI structure our components expect
    const profiles = profilesRaw as ProfileJoined[] | null
    const mappedProfiles = (profiles || []).map((p) => {
      // Calculate age from date_of_birth
      const age = p.date_of_birth ? new Date().getFullYear() - new Date(p.date_of_birth).getFullYear() : '?'
      
      // Handle Supabase foreign key array/object response
      const professionName = Array.isArray(p.profession) ? p.profession[0]?.name : (p.profession as { name: string } | null)?.name ?? "Professional"
      const cityName = Array.isArray(p.city) ? p.city[0]?.name : (p.city as { name: string } | null)?.name ?? "Not Specified"
      
      const mediaArr = p.media || [];
      const primaryMedia = mediaArr.find(m => m.is_primary) || mediaArr[0];
      const imageUrl = primaryMedia ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile_photos/${primaryMedia.bucket_path}` : "bg-gradient-to-tr from-zinc-800 to-zinc-950";

      const compatObj = Array.isArray(p.compatibility) ? p.compatibility[0] : p.compatibility;
      const tags = compatObj?.lifestyle || [];

      const familyObj = Array.isArray(p.family) ? p.family[0] : p.family;
      const familyType = familyObj?.family_type || "Not Specified";

      // Deterministic compatibility score based on ID string
      const idSum = p.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
      const compatScore = 75 + (idSum % 24);

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
        image: primaryMedia ? `bg-[url('${imageUrl}')] bg-cover bg-center` : imageUrl,
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
