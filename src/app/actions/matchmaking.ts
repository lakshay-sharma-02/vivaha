"use server"

import { createClient } from "@/shared/lib/supabase/server"

export async function requestIntroduction(targetUserId: string) {
  try {
    const supabase = await createClient()

    // Call the RPC function we created in the database
    const { data, error } = await supabase.rpc('request_introduction', {
      target_user_id: targetUserId
    })

    if (error) {
      console.error("Matchmaking RPC Error:", error)
      return { success: false, error: "Failed to connect to matchmaking service." }
    }

    // The RPC returns a JSON object: { success: boolean, message/error: string }
    return data as { success: boolean, error?: string, message?: string }

  } catch (err) {
    console.error("Matchmaking Exception:", err)
    return { success: false, error: "An unexpected error occurred." }
  }
}
