import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cbxtzkzzhgjzimaroahc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNieHR6a3p6aGdqemltYXJvYWhjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTU3Njk4NSwiZXhwIjoyMDk3MTUyOTg1fQ.5SVuxYSm6EuEIQKGuaPUtterVhN5eT0q91DUP_37cVY'
)

async function run() {
  const { data: admins } = await supabase.from('admins').select('id')
  const adminIds = admins.map(a => a.id)
  
  const { data: { users }, error } = await supabase.auth.admin.listUsers()
  if (error) {
    console.error("Error fetching users:", error)
    return
  }
  
  for (const user of users) {
    if (!adminIds.includes(user.id)) {
      console.log(`Deleting user: ${user.email || user.phone} (${user.id})`)
      await supabase.auth.admin.deleteUser(user.id)
    } else {
      console.log(`Keeping admin: ${user.email || user.phone} (${user.id})`)
    }
  }
  console.log("Done")
}
run()
