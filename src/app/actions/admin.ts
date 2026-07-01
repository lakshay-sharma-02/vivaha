"use server"

import { createClient } from "@/shared/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Simple admin check - can be enhanced with proper role management
const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',') || []

export async function checkIsAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { isAdmin: false, error: "Not authenticated" }
  }

  // Check if user email is in admin list or check a custom claim
  const isAdmin = ADMIN_EMAILS.includes(user.email || '')

  return { isAdmin, userId: user.id }
}

export async function getPendingVerifications() {
  const supabase = await createClient()

  const { isAdmin } = await checkIsAdmin()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized", verifications: [] }
  }

  // Fetch verification documents
  const { data: documents, error: docsError } = await supabase
    .from('verification_documents')
    .select('id, profile_id, document_type, bucket_path, status, submitted_at')
    .eq('status', 'pending')
    .order('submitted_at', { ascending: false })

  if (docsError) {
    console.error('Error fetching verification documents:', docsError)
    return { success: false, error: docsError.message, verifications: [] }
  }

  if (!documents || documents.length === 0) {
    return { success: true, verifications: [] }
  }

  // Fetch associated profiles
  const profileIds = documents.map(d => d.profile_id)
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, verification_status, phone, date_of_birth')
    .in('id', profileIds)

  if (profilesError) {
    console.error('Error fetching profiles:', profilesError)
    return { success: false, error: profilesError.message, verifications: [] }
  }

  // Join documents with profiles
  const profileMap = new Map(profiles?.map(p => [p.id, p]) || [])
  const verifications = documents.map(doc => ({
    ...doc,
    profiles: profileMap.get(doc.profile_id) || null
  }))

  return { success: true, verifications }
}

export async function approveVerification(documentId: string, profileId: string) {
  const supabase = await createClient()

  const { isAdmin } = await checkIsAdmin()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" }
  }

  // Update document status
  const { error: docError } = await supabase
    .from('verification_documents')
    .update({
      status: 'verified',
      reviewed_at: new Date().toISOString()
    })
    .eq('id', documentId)

  if (docError) {
    console.error('Error updating document:', docError)
    return { success: false, error: docError.message }
  }

  // Update profile verification status
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ verification_status: 'verified' })
    .eq('id', profileId)

  if (profileError) {
    console.error('Error updating profile:', profileError)
    return { success: false, error: profileError.message }
  }

  revalidatePath('/admin/verification')

  return { success: true }
}

export async function rejectVerification(documentId: string, profileId: string, reason?: string) {
  const supabase = await createClient()

  const { isAdmin } = await checkIsAdmin()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" }
  }

  // Update document status
  const { error: docError } = await supabase
    .from('verification_documents')
    .update({
      status: 'rejected',
      reviewed_at: new Date().toISOString()
    })
    .eq('id', documentId)

  if (docError) {
    console.error('Error updating document:', docError)
    return { success: false, error: docError.message }
  }

  // Update profile verification status
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ verification_status: 'rejected' })
    .eq('id', profileId)

  if (profileError) {
    console.error('Error updating profile:', profileError)
    return { success: false, error: profileError.message }
  }

  // Optionally log rejection reason in admin_notes
  if (reason) {
    await supabase
      .from('admin_notes')
      .insert({
        target_id: profileId,
        target_type: 'verification_rejection',
        note: reason
      })
  }

  revalidatePath('/admin/verification')

  return { success: true }
}
