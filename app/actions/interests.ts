"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function sendInterest(receiverId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { ok: false, error: "Unauthorized" }
  }

  // Prevent self-interest
  if (user.id === receiverId) {
    return { ok: false, error: "Cannot send interest to yourself" }
  }

  const { error } = await supabase
    .from('interests')
    .insert({
      sender_profile_id: user.id,
      receiver_profile_id: receiverId,
      status: 'PENDING'
    })

  if (error) {
    if (error.code === '23505') { // Unique constraint violation
      return { ok: false, error: "Interest already sent" }
    }
    console.error("sendInterest error:", error)
    return { ok: false, error: "Failed to send interest" }
  }

  revalidatePath(`/profile/${receiverId}`)
  return { ok: true }
}

export async function respondToInterest(interestId: string, action: 'ACCEPTED' | 'DECLINED') {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { ok: false, error: "Unauthorized" }
  }

  const { error } = await supabase
    .from('interests')
    .update({ 
      status: action,
      responded_at: new Date().toISOString()
    })
    .eq('id', interestId)
    .eq('receiver_profile_id', user.id) // Security check: only receiver can respond

  if (error) {
    console.error("respondToInterest error:", error)
    return { ok: false, error: "Failed to respond to interest" }
  }

  revalidatePath("/dashboard")
  return { ok: true }
}
