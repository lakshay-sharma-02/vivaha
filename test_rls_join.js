import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cbxtzkzzhgjzimaroahc.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '' 

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  const { data: interests, error } = await supabase
    .from('interests')
    .select(`
      id,
      sender:profiles!sender_profile_id (
        id
      )
    `)
    .limit(1)

  console.log("Interests data:", JSON.stringify(interests, null, 2))
}

test()
