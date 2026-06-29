"use server"

import { createClient } from "@/shared/lib/supabase/server"

export async function fetchDiscoverProfiles() {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: "Not authenticated", profiles: [] }
    }

    // Fetch all profiles EXCEPT the current user
    // Also joining profession and city names
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select(`
        id,
        first_name,
        last_name,
        date_of_birth,
        bio,
        verification_status,
        profession:profession_id(name),
        city:city_id(name)
      `)
      .neq('id', user.id)
      .limit(20)

    if (error) {
      console.error("Error fetching discover profiles:", error)
      return { success: false, error: "Failed to load profiles", profiles: [] }
    }

    // We need to map the database structure to the UI structure our components expect
    const mappedProfiles = profiles.map((p: any) => {
      // Calculate age from date_of_birth
      const age = p.date_of_birth ? new Date().getFullYear() - new Date(p.date_of_birth).getFullYear() : '?'
      
      // Handle Supabase foreign key array/object response
      const professionName = p.profession?.[0]?.name || p.profession?.name || "Professional"
      const cityName = p.city?.[0]?.name || p.city?.name || "Not Specified"

      return {
        id: p.id,
        name: `${p.first_name} ${p.last_name || ''}`.trim(),
        age: age,
        location: cityName,
        profession: professionName,
        education: "Not Specified", // Pending schema update for education
        bio: p.bio || "No bio provided.",
        compatibility: Math.floor(Math.random() * (98 - 75 + 1)) + 75, // Placeholder for AI compatibility score
        verified: p.verification_status === 'verified',
        image: "bg-gradient-to-tr from-zinc-800 to-zinc-950", // Placeholder for actual image URL
        tags: ["Hindu", "Nuclear Family", "Never Drinks"], // Placeholder for advanced tags
        family: "Not Specified",
        income: "Not Specified"
      }
    })

    return { success: true, profiles: mappedProfiles }

  } catch (err) {
    console.error("Discover Fetch Exception:", err)
    return { success: false, error: "An unexpected error occurred", profiles: [] }
  }
}
