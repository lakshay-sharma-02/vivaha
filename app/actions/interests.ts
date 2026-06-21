"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import type { ActionResult, InterestStatus } from "@/lib/types"

const interestMessages: Record<string, string> = {
  UNAUTHORIZED: "Sign in to continue.",
  SELF_INTEREST: "You cannot send interest to your own profile.",
  NOT_VERIFIED: "Your profile must be verified first.",
  SUBSCRIPTION_REQUIRED: "A current membership is required to send interests.",
  NOT_FOUND: "This profile is no longer available.",
  ALREADY_SENT: "You have already sent interest to this member.",
}

export async function sendInterest(receiverId: string): Promise<ActionResult<undefined>> {
  const supabase = await createClient()
  const { data, error } = await supabase.rpc("send_interest", { receiver_id: receiverId })
  if (error) return { ok: false, error: { code: "INTERNAL_ERROR", message: "Could not send interest." } }
  if (data !== "OK") return { ok: false, error: { code: data === "NOT_FOUND" ? "NOT_FOUND" : "FORBIDDEN", message: interestMessages[data] ?? "Could not send interest." } }
  revalidatePath(`/profile/${receiverId}`)
  revalidatePath("/dashboard")
  return { ok: true, data: undefined }
}

export async function respondToInterest(interestId: string, action: Exclude<InterestStatus, "PENDING">): Promise<ActionResult<undefined>> {
  const supabase = await createClient()
  const { data, error } = await supabase.rpc("respond_to_interest", { interest_id: interestId, response: action })
  if (error || !data) return { ok: false, error: { code: "FORBIDDEN", message: "This request could not be updated." } }
  revalidatePath("/dashboard")
  return { ok: true, data: undefined }
}
