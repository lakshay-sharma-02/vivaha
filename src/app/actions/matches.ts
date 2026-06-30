"use server"

import { createClient } from "@/shared/lib/supabase/server"
import type { Database } from "@/shared/lib/supabase/database.types"

type IntroductionRow = Database["public"]["Tables"]["introductions"]["Row"]

export async function getPendingRequests() {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: "Not authenticated", requests: [] }
    }

    // Fetch introductions where receiver_id is the current user and status is 'pending'
    // We also join the sender's profile data
    const { data: requestsRaw, error } = await supabase
      .from('introductions')
      .select(`
        id,
        created_at,
        sender:sender_id (
          id,
          first_name,
          last_name,
          date_of_birth,
          bio,
          verification_status,
          profession:profession_id(name),
          city:city_id(name)
        )
      `)
      .eq('receiver_id', user.id)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    if (error) {
      console.error("Error fetching pending requests:", error)
      return { success: false, error: "Failed to load requests", requests: [] }
    }

    // Map to UI format
    type SenderProfile = {
      id: string
      first_name: string
      last_name: string | null
      date_of_birth: string | null
      bio: string | null
      verification_status: string | null
      profession: { name: string }[] | { name: string } | null
      city: { name: string }[] | { name: string } | null
    }
    type RequestJoined = Pick<IntroductionRow, 'id' | 'created_at'> & { sender: SenderProfile }

    const requests = requestsRaw as RequestJoined[] | null
    const mappedRequests = (requests || []).map((req) => {
      const p = req.sender
      const age = p.date_of_birth ? new Date().getFullYear() - new Date(p.date_of_birth).getFullYear() : '?'
      const professionName = Array.isArray(p.profession) ? p.profession[0]?.name : (p.profession as { name: string } | null)?.name ?? "Professional"
      const cityName = Array.isArray(p.city) ? p.city[0]?.name : (p.city as { name: string } | null)?.name ?? "Not Specified"

      return {
        introduction_id: req.id,
        sender_id: p.id,
        name: `${p.first_name} ${p.last_name || ''}`.trim(),
        age: age,
        location: cityName,
        profession: professionName,
        bio: p.bio,
        verified: p.verification_status === 'verified',
        received_at: req.created_at
      }
    })

    return { success: true, requests: mappedRequests }

  } catch (err) {
    console.error("Matches Fetch Exception:", err)
    return { success: false, error: "An unexpected error occurred", requests: [] }
  }
}

export async function respondToRequest(introductionId: string, accept: boolean) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: "Not authenticated" }
    }

    const newStatus = (accept ? 'accepted' : 'rejected') as 'accepted' | 'rejected'

    // Update the introduction status.
    // RLS policies ensure the user can only update if they are the receiver.
    const { data: updatedRaw, error } = await supabase
      .from('introductions')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', introductionId)
      .eq('receiver_id', user.id)
      .select('sender_id')
      .single()

    if (error) {
      console.error("Error responding to request:", error)
      return { success: false, error: "Failed to update status." }
    }

    const updated = updatedRaw as Pick<IntroductionRow, 'sender_id'> | null

    // If accepted, we should theoretically fire a notification to the sender
    // For simplicity, we just log the audit event
    if (updated?.sender_id) {
      await supabase.from('audit_logs').insert({
        action: `introduction_${newStatus}`,
        actor_id: user.id,
        target_id: updated.sender_id,
        metadata: { introduction_id: introductionId }
      })
    }

    return { success: true }

  } catch (err) {
    console.error("Respond Exception:", err)
    return { success: false, error: "An unexpected error occurred" }
  }
}
