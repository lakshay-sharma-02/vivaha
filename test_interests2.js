import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cbxtzkzzhgjzimaroahc.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '' 

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  const { data: profiles } = await supabase.from('profiles').select('id').limit(2)
  if (profiles.length < 2) return console.log("Not enough profiles")

  await supabase.from('interests').insert({
     sender_profile_id: profiles[0].id,
     receiver_profile_id: profiles[1].id,
     status: 'PENDING'
  }).select()

  const { data: receivedInterests, error } = await supabase
    .from('interests')
    .select(`
      id,
      status,
      created_at,
      sender:profiles!sender_profile_id (
        id,
        full_name
      )
    `)
    .eq('receiver_profile_id', profiles[1].id)
    .limit(1)

  console.log("Interests error:", error)
  console.log("Interests data:", JSON.stringify(receivedInterests, null, 2))
}

test()
