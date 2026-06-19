import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cbxtzkzzhgjzimaroahc.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '' // requires role key to bypass RLS in script

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  const { data: profiles, error } = await supabase.from('profiles').select('*').eq('status', 'VERIFIED').limit(1)
  if (error) {
    console.error("Error fetching profiles", error)
    return
  }
  
  if (!profiles || profiles.length === 0) {
    console.log("No VERIFIED profiles found!")
    return
  }

  const profile = profiles[0]
  console.log("Found profile on browse:", profile.id, profile.full_name, profile.status)

  const { data: directProfile, error: directError } = await supabase.from('profiles').select('*').eq('id', profile.id).single()
  
  console.log("Direct fetch error:", directError)
  console.log("Direct fetch profile status:", directProfile?.status)
}

test()
