import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cbxtzkzzhgjzimaroahc.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const adminClient = createClient(supabaseUrl, supabaseKey)
const anonClient = createClient(supabaseUrl, anonKey)

async function test() {
  const { data: interests } = await adminClient.from('interests').select('*').limit(1)
  const interest = interests[0]

  // Set sender to REJECTED so public cannot see it
  await adminClient.from('profiles').update({ status: 'REJECTED' }).eq('id', interest.sender_profile_id)

  // Fetch using admin but with RLS? Admin bypasses RLS.
  // Let's use the receiver's auth session or just simulate what Dashboard does.
  // Actually Dashboard uses an authenticated client.
  // Let's just create a test table with RLS to see what postgrest does.
  
  // Actually, I can just fetch via REST using the anon key, but we need to bypass interest RLS.
  // Let's temporarily disable RLS on interests so anon can query it, then see what sender returns.
  try { await adminClient.rpc('exec_sql', { sql: 'alter table interests disable row level security;' }) } catch(e){}
  
  const { data: testRel, error } = await anonClient.from('interests').select('id, sender:profiles!sender_profile_id(id)').eq('id', interest.id).single()
  console.log("Relationship with blocked profile:", JSON.stringify(testRel, null, 2))
  
  // Restore
  try { await adminClient.rpc('exec_sql', { sql: 'alter table interests enable row level security;' }) } catch(e){}
  await adminClient.from('profiles').update({ status: 'VERIFIED' }).eq('id', interest.sender_profile_id)
}

test()
