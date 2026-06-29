import { redirect } from "next/navigation"
import { createClient } from "@/shared/lib/supabase/server"
import DashboardClient from "@/features/dashboard/components/dashboard-client"

export default async function DashboardPage() {
  const supabase = await createClient()

  // Authenticate
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect('/login')
  }

  // Fetch real profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*, profile_completion(score)')
    .eq('id', user.id)
    .single()

  if (!profile) {
    // If they have an auth account but no profile, they need to onboard
    redirect('/onboarding')
  }

  // Fetch Recommended Matches (Basic logic for now: opposite gender)
  // In a real scenario, this would call a PostgreSQL RPC function
  // to ensure private data is NEVER sent to the client.
  const targetGender = profile.gender === 'male' ? 'female' : 'male'
  const { data: recommendedMatches } = await supabase
    .from('profiles')
    .select(`
      id, 
      first_name, 
      last_name, 
      gender, 
      profession:profession_id(name), 
      city:city_id(name), 
      verification_status,
      date_of_birth
    `)
    .eq('gender', targetGender)
    .limit(5)

  // Pass sanitized data to the client component
  // Notice we do NOT send the phone or instagram of matches to the client.
  // The backend strips it out before it ever reaches the browser memory.

  return (
    <DashboardClient 
      userProfile={profile} 
      recommendedMatches={recommendedMatches || []} 
    />
  )
}
