import { env } from "@/lib/env"

export function profileImageUrl(path: string | null | undefined) {
  if (!path) return null
  if (/^https?:\/\//i.test(path)) return path
  return `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-photos/${path}`
}

export function calculateAge(dateOfBirth: string | null | undefined) {
  if (!dateOfBirth) return null
  const dob = new Date(`${dateOfBirth}T00:00:00`)
  if (Number.isNaN(dob.getTime())) return null
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const beforeBirthday =
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  if (beforeBirthday) age -= 1
  return age
}
