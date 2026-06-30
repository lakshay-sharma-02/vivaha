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
      .select('id, created_at, sender_id')
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
      profession_id: string | null
      city_id: string | null
    }
    type RequestRow = Pick<IntroductionRow, 'id' | 'created_at' | 'sender_id'>
    type MappedRequest = {
      introduction_id: string
      sender_id: string
      name: string
      age: number | string
      location: string
      profession: string
      bio: string | null
      verified: boolean
      received_at: string | null
    }

    const requests = requestsRaw as RequestRow[] | null
    const senderIds = [...new Set((requests || []).map((req) => req.sender_id))]
    const { data: sendersRaw } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, date_of_birth, bio, verification_status, profession_id, city_id')
      .in('id', senderIds)

    const senders = (sendersRaw || []) as SenderProfile[]
    const professionIds = [...new Set(senders.map((sender) => sender.profession_id).filter((id): id is string => Boolean(id)))]
    const cityIds = [...new Set(senders.map((sender) => sender.city_id).filter((id): id is string => Boolean(id)))]

    const [{ data: professions }, { data: cities }] = await Promise.all([
      professionIds.length > 0
        ? supabase.from('professions').select('id, name').in('id', professionIds)
        : Promise.resolve({ data: [], error: null }),
      cityIds.length > 0
        ? supabase.from('cities').select('id, name').in('id', cityIds)
        : Promise.resolve({ data: [], error: null }),
    ])

    const senderMap = new Map(senders.map((sender) => [sender.id, sender]))
    const professionMap = new Map((professions || []).map((item) => [item.id, item.name]))
    const cityMap = new Map((cities || []).map((item) => [item.id, item.name]))

    const mappedRequests = (requests || []).map((req): MappedRequest | null => {
      const p = senderMap.get(req.sender_id)
      if (!p) return null
      const age = p.date_of_birth ? new Date().getFullYear() - new Date(p.date_of_birth).getFullYear() : '?'
      const professionName = p.profession_id ? professionMap.get(p.profession_id) ?? "Professional" : "Professional"
      const cityName = p.city_id ? cityMap.get(p.city_id) ?? "Not Specified" : "Not Specified"

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
    }).filter((request): request is MappedRequest => request !== null)

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
    const now = new Date().toISOString()

    // Update the introduction status.
    // RLS policies ensure the user can only update if they are the receiver.
    const { data: updatedRaw, error } = await supabase
      .from('introductions')
      .update({ status: newStatus, updated_at: now } satisfies Record<string, unknown>)
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
