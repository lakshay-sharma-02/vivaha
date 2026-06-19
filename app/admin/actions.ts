"use server"

import { createClient } from "@/lib/supabase/server"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"

function getAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function adminUpdateProfileStatus(
  profileId: string,
  status: 'VERIFIED' | 'REJECTED',
  reason?: string
) {
  const supabase = await createClient()

  // First verify if current user is admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: adminCheck } = await supabase
    .from('admins')
    .select('id')
    .eq('id', user.id)
    .single()

  if (!adminCheck) throw new Error("Forbidden")

  const adminSupabase = getAdminClient()

  const update: any = { status }
  if (reason && status === 'REJECTED') update.rejection_reason = reason

  const { error } = await adminSupabase
    .from('profiles')
    .update(update)
    .eq('id', profileId)

  if (error) throw error

  // Add an audit log entry
  await adminSupabase.from('verification_audit_log').insert({
    admin_id: user.id,
    profile_id: profileId,
    action: status === 'VERIFIED' ? 'approved' : 'rejected'
  })

  return { success: true }
}

export async function getPendingProfiles() {
  const supabase = await createClient()
  
  // First verify if current user is admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: adminCheck } = await supabase
    .from('admins')
    .select('id')
    .eq('id', user.id)
    .single()

  if (!adminCheck) throw new Error("Forbidden")

  const adminSupabase = getAdminClient()
  
  const { data, error } = await adminSupabase
    .from('profiles')
    .select('*, verification_documents(*)')
    .eq('status', 'PENDING_VERIFICATION')
    .order('updated_at', { ascending: true })

  if (error) throw error

  // Since verification-docs is a PRIVATE bucket, the "publicUrls" saved during 
  // onboarding will 404. We need to generate secure Signed URLs for the Admin to view.
  if (data) {
    for (const profile of data) {
      if (profile.verification_documents && profile.verification_documents.length > 0) {
        const doc = profile.verification_documents[0]
        let filePath = doc.aadhaar_photo_path
        
        // Extract the actual filePath from the broken publicUrl
        if (filePath && filePath.includes('/public/verification-docs/')) {
          filePath = filePath.split('/public/verification-docs/')[1]
        }

        // Generate a signed URL valid for 1 hour (3600 seconds)
        if (filePath) {
          const { data: signedData } = await adminSupabase.storage
            .from('verification-docs')
            .createSignedUrl(filePath, 3600)
            
          if (signedData?.signedUrl) {
            doc.aadhaar_photo_path = signedData.signedUrl
          }
        }
      }
    }
  }

  return data
}

export async function adminDeleteProfile(profileId: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: adminCheck } = await supabase
    .from('admins')
    .select('id')
    .eq('id', user.id)
    .single()

  if (!adminCheck) throw new Error("Forbidden")

  const adminSupabase = getAdminClient()

  const { error } = await adminSupabase
    .from('profiles')
    .delete()
    .eq('id', profileId)

  if (error) throw error
  return { success: true }
}

export async function adminSearchProfiles(searchTerm: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: adminCheck } = await supabase
    .from('admins')
    .select('id')
    .eq('id', user.id)
    .single()

  if (!adminCheck) throw new Error("Forbidden")

  const adminSupabase = getAdminClient()

  // Use ILIKE on full_name or phone_number
  const { data, error } = await adminSupabase
    .from('profiles')
    .select('id, full_name, phone_number, status, town, date_of_birth, created_at')
    .or(`full_name.ilike.%${searchTerm}%,phone_number.ilike.%${searchTerm}%`)
    .limit(50)

  if (error) throw error
  return data
}
