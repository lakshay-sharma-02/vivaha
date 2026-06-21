import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

const REQUIRED_FIELDS = [
  "full_name", "date_of_birth", "gender", "phone_number", "height_cm",
  "profile_photo_path", "town", "religion", "caste", "education",
  "profession", "income_range", "about_me", "family_type",
  "father_occupation", "preferred_age_min", "preferred_age_max",
  "preferred_town", "preferred_religion", "preferred_caste",
] as const

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const [{ data: profile }, { data: document }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("verification_documents")
      .select("id, aadhaar_photo_path, aadhaar_last4")
      .eq("profile_id", user.id)
      .maybeSingle(),
  ])

  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 })
  const missing = REQUIRED_FIELDS.find((field) => profile[field] === null || profile[field] === "")
  if (missing) {
    return NextResponse.json({ error: `Complete the required field: ${missing}` }, { status: 422 })
  }
  if (!document?.aadhaar_photo_path || !/^\d{4}$/.test(document.aadhaar_last4 ?? "")) {
    return NextResponse.json({ error: "A valid Aadhaar document and last four digits are required" }, { status: 422 })
  }
  if (profile.preferred_age_min > profile.preferred_age_max) {
    return NextResponse.json({ error: "Partner age range is invalid" }, { status: 422 })
  }

  const dob = new Date(`${profile.date_of_birth}T00:00:00Z`)
  const age = Math.floor((Date.now() - dob.getTime()) / 31_556_952_000)
  const minimumAge = profile.gender === "male" ? 21 : 18
  if (!Number.isFinite(age) || age < minimumAge) {
    return NextResponse.json({ error: `You must be at least ${minimumAge} years old` }, { status: 422 })
  }

  const admin = createAdminClient()
  const { error } = await admin.from("profiles").update({
    status: "PENDING_VERIFICATION",
    rejection_reason: null,
    onboarding_step: 7,
  }).eq("id", user.id)
  if (error) {
    console.error("Profile submission failed", error)
    return NextResponse.json({ error: "Could not submit the profile" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
