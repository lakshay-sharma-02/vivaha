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
  
  // Calculate Completion Score
  let completionScore = (profile as any).profile_completion?.score;
  if (completionScore === undefined || completionScore === null) {
      const fields = [profile.first_name, profile.last_name, profile.date_of_birth, profile.city_id, profile.profession_id, (profile as any).education, profile.bio, profile.height_cm, profile.religion_id];
      const filled = fields.filter(Boolean).length;
      completionScore = Math.round((filled / fields.length) * 100);
  }

  // Fetch real updates (e.g. profile views)
  type ProfileViewRow = { id: string; viewed_at: string | null; viewer: { first_name: string; city: { name: string } | null } | null }
  const { data: rawUpdates } = await supabase
    .from('profile_views')
    .select('id, viewed_at, viewer:viewer_id(first_name, city:city_id(name))')
    .eq('viewed_id', user.id)
    .order('viewed_at', { ascending: false })
    .limit(2) as { data: ProfileViewRow[] | null; error: unknown }

  const updates = (rawUpdates || []).map(u => {
      const viewer = u.viewer
      const city = viewer?.city ? (typeof viewer.city === 'object' && 'name' in viewer.city ? viewer.city.name : 'a nearby city') : "a nearby city";
      return {
          id: u.id,
          type: 'view',
          title: 'Profile Viewed',
          desc: `Someone from ${city} just viewed your profile.`,
          time: u.viewed_at ? new Date(u.viewed_at).toLocaleDateString() : 'Recently',
          iconType: 'view'
      }
  })

  // Fetch real timeline events (e.g. notifications)
  type NotificationRow = { id: string; title: string; body: string; created_at: string | null; type: string }
  const { data: notifications } = await supabase
    .from('notifications')
    .select('id, title, body, created_at, type')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(3) as { data: NotificationRow[] | null; error: unknown }

  const timeline = (notifications || []).map(n => ({
      id: n.id,
      title: n.title,
      desc: n.body,
      time: new Date(n.created_at).toLocaleDateString(),
      iconType: n.type === 'verification' ? 'success' : 'time'
  }))
  if (timeline.length === 0) {
      timeline.push({
          id: 'signup',
          title: 'Account Created',
          desc: 'Welcome to Vivaha. Your journey begins here.',
          time: new Date(profile.created_at || new Date()).toLocaleDateString(),
          iconType: 'success'
      })
  }

  return (
    <DashboardClient 
      userProfile={profile} 
      recommendedMatches={recommendedMatches || []} 
      completionScore={completionScore}
      updates={updates}
      timeline={timeline}
    />
  )
}
