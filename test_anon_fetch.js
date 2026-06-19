import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cbxtzkzzhgjzimaroahc.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '' // anon key to simulate client/server with no session

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('status', 'VERIFIED')
    
  if (error) {
    console.error("Browse query error:", error)
  } else {
    console.log("Success! Found", profiles?.length, "profiles.")
    for (const profile of profiles) {
      console.log(`Checking profile ${profile.id}...`)
      const { data: directProfile, error: directError } = await supabase.from('profiles').select('*').eq('id', profile.id).single()
      if (directError) {
         console.error("  -> Direct fetch error:", directError)
      } else {
         console.log("  -> Direct fetch success! Status:", directProfile?.status)
      }
    }
  }
}

test()
