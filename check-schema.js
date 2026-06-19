import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cbxtzkzzhgjzimaroahc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNieHR6a3p6aGdqemltYXJvYWhjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTU3Njk4NSwiZXhwIjoyMDk3MTUyOTg1fQ.5SVuxYSm6EuEIQKGuaPUtterVhN5eT0q91DUP_37cVY'
)

async function run() {
  const { data, error } = await supabase.from('profiles').select('*').limit(1)
  if (data && data.length > 0) {
    console.log(Object.keys(data[0]))
  } else {
    console.log("No profiles found to check schema.")
  }
}
run()
