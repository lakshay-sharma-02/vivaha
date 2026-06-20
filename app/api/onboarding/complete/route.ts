import { NextResponse } from "next/server"
import { createClient as createServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST() {
  // Verify the caller is authenticated using the server (cookie-based) client
  const supabase = await createServerClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Use the admin client to bypass RLS and update the protected status field
  const admin = createAdminClient()
  const { error } = await admin
    .from("profiles")
    .update({ status: "PENDING_VERIFICATION" })
    .eq("id", user.id)

  if (error) {
    console.error("Failed to update profile status:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
