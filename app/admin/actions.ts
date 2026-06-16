"use client"

import { createClient } from "@/lib/supabase/client"

export async function adminUpdateProfileStatus(
  profileId: string,
  status: 'approved' | 'rejected',
  reason?: string,
  notes?: string
) {
  const supabase = createClient()

  // First verify if current user is admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: adminProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (adminProfile?.role !== 'admin') throw new Error("Forbidden")

  const update: any = { status }
  if (reason) update.rejection_reason = reason
  if (notes) update.admin_notes = notes

  const { error } = await supabase
    .from('profiles')
    .update(update)
    .eq('id', profileId)

  if (error) throw error

  return { success: true }
}

export async function getPendingProfiles() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*, profile_details(*), verification_docs(*)')
    .eq('status', 'pending')

  if (error) throw error
  return data
}
