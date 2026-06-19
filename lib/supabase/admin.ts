import { createClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'

// ONLY use this client in secure Server Actions or Route Handlers
// This bypasses all Row Level Security (RLS) policies
export function createAdminClient() {
  return createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
