"use server"

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

/**
 * TEMPORARY mock subscription — only callable by admins while Razorpay is not
 * yet integrated.  When real payments land, delete this function entirely and
 * use the Razorpay webhook handler to set subscription_ends_at via the admin
 * client after verifying the payment signature server-side.
 *
 * @throws When called by a non-admin authenticated user.
 */
export async function subscribeMock() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { ok: false, error: "Unauthorized" }
  }

  // Guard: only admins may call this stub endpoint.
  const { data: adminRow } = await supabase
    .from('admins')
    .select('id')
    .eq('id', user.id)
    .single()

  if (!adminRow) {
    // Return a deliberately vague error — don't hint that this route exists.
    return { ok: false, error: "Unauthorized" }
  }

  // Add 30 days to current date
  const endsAt = new Date()
  endsAt.setDate(endsAt.getDate() + 30)

  const adminSupabase = createAdminClient()

  const { error } = await adminSupabase
    .from('profiles')
    .update({
      subscription_ends_at: endsAt.toISOString()
    })
    .eq('id', user.id)

  if (error) {
    console.error("subscribeMock error:", error)
    return { ok: false, error: "Failed to subscribe" }
  }

  revalidatePath("/dashboard")
  redirect("/dashboard?subscription=success")
}
