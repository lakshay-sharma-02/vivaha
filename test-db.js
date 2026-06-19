import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cbxtzkzzhgjzimaroahc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNieHR6a3p6aGdqemltYXJvYWhjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTU3Njk4NSwiZXhwIjoyMDk3MTUyOTg1fQ.5SVuxYSm6EuEIQKGuaPUtterVhN5eT0q91DUP_37cVY'
)

async function test() {
  const { data: profiles, error: pErr } = await supabase.from('profiles').select('id, full_name, status')
  console.log('Profiles:', profiles, pErr)
  
  const { data: admins, error: aErr } = await supabase.from('admins').select('*')
  console.log('Admins:', admins, aErr)
}
test()
