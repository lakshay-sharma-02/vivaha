import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cbxtzkzzhgjzimaroahc.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '' 

const adminClient = createClient(supabaseUrl, supabaseKey)

async function test() {
  // 1. Get any interest
  const { data: interests } = await adminClient.from('interests').select('*').limit(1)
  if (!interests || interests.length === 0) return console.log("No interests")
  const interest = interests[0]

  // 2. Temporarily set the sender profile to REJECTED so RLS blocks it for public
  await adminClient.from('profiles').update({ status: 'REJECTED' }).eq('id', interest.sender_profile_id)

  // 3. Create a JWT for the receiver so they can fetch their interests
  const { data: { user } } = await adminClient.auth.admin.getUserById(interest.receiver_profile_id)
  
  // We can't easily sign a JWT without the secret, but we can just use the service key
  // and simulate RLS with impersonation (if supported) or just log in.
  // Actually, let's just make a user client with the anon key and login.
  // Too complex. Let's just create a quick query using the REST api with a hardcoded JWT?
  // Let's just log in as the user if we have their password? No we don't.
  
  // Better way: Let's just check if ANY profile has an array for sender
  const { data: testRel } = await adminClient.from('interests').select('sender:profiles!sender_profile_id(id)').limit(1)
  console.log("Relationship format:", JSON.stringify(testRel, null, 2))
  
  // Restore
  await adminClient.from('profiles').update({ status: 'VERIFIED' }).eq('id', interest.sender_profile_id)
}

test()
