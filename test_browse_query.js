import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cbxtzkzzhgjzimaroahc.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '' // requires role key to bypass RLS in script

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, full_name, profile_photo_path, date_of_birth, town, religion, caste, education, profession, about_me')
    .eq('status', 'VERIFIED')
    
  if (error) {
    console.error("Browse query error:", error)
  } else {
    console.log("Success! Found", profiles?.length, "profiles.")
  }
}

test()
