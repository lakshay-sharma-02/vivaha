import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cbxtzkzzhgjzimaroahc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNieHR6a3p6aGdqemltYXJvYWhjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTU3Njk4NSwiZXhwIjoyMDk3MTUyOTg1fQ.5SVuxYSm6EuEIQKGuaPUtterVhN5eT0q91DUP_37cVY'
)

async function test() {
  const { data: profiles } = await supabase.from('profiles').select('id, full_name').ilike('full_name', '%Lakshay%')
  
  if (profiles) {
    for (const p of profiles) {
      console.log('Adding to admins:', p.full_name, p.id)
      await supabase.from('admins').upsert({ id: p.id, full_name: 'Admin ' + p.full_name })
    }
  }
  
  const { data: admins } = await supabase.from('admins').select('*')
  console.log('All Admins:', admins)
}
test()
