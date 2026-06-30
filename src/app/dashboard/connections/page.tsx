import { redirect } from "next/navigation"
import { createClient } from "@/shared/lib/supabase/server"
import ConnectionsClient from "@/features/dashboard/components/connections-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Connections — Vivaha",
  description: "Your mutually accepted matches on Vivaha.",
}

export default async function ConnectionsPage() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect("/login")

  type MatchRow = { id: string; user_a_id: string; user_b_id: string; updated_at: string | null; status: string | null }
  const { data: matches } = await (supabase
    .from("matches")
    .select("id, user_a_id, user_b_id, updated_at, status")
    .or(`user_a_id.eq.${user.id},user_b_id.eq.${user.id}`)
    .eq("status", "accepted") as unknown as Promise<{ data: MatchRow[] | null; error: unknown }>)

  if (!matches || matches.length === 0) {
    return <ConnectionsClient connections={[]} currentUserId={user.id} />
  }

  // Collect the IDs of the other party in each match
  const matchedUserIds = matches.map((m) =>
    m.user_a_id === user.id ? m.user_b_id : m.user_a_id
  )

  // Fetch profiles for all matched users
  const { data: profileRows } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, date_of_birth, phone, instagram, profession:profession_id(name), city:city_id(name)")
    .in("id", matchedUserIds)

  type MediaRow = { profile_id: string; bucket_path: string }
  const { data: mediaRows } = await (supabase
    .from("profile_media")
    .select("profile_id, bucket_path")
    .in("profile_id", matchedUserIds)
    .eq("is_primary", true) as unknown as Promise<{ data: MediaRow[] | null; error: unknown }>)

  const mediaMap = new Map<string, string>()
  if (mediaRows) {
    for (const row of mediaRows) {
      const { data } = supabase.storage
        .from("profile_photos")
        .getPublicUrl(row.bucket_path)
      mediaMap.set(row.profile_id, data.publicUrl)
    }
  }

  type ProfileRow = {
    id: string
    first_name: string
    last_name: string
    date_of_birth: string | null
    phone: string | null
    instagram: string | null
    profession: { name: string }[] | { name: string } | null
    city: { name: string }[] | { name: string } | null
  }

  const connections = matches.map((match) => {
    const otherId = match.user_a_id === user.id ? match.user_b_id : match.user_a_id
    const profile = (profileRows as ProfileRow[])?.find((p) => p.id === otherId)
    if (!profile) return null

    const dob = profile.date_of_birth
    const age = dob ? new Date().getFullYear() - new Date(dob).getFullYear() : 0
    const profName =
      Array.isArray(profile.profession)
        ? profile.profession[0]?.name
        : (profile.profession as { name: string } | null)?.name ?? "Not specified"
    const cityName =
      Array.isArray(profile.city)
        ? profile.city[0]?.name
        : (profile.city as { name: string } | null)?.name ?? "Not specified"

    return {
      id: match.id,
      first_name: profile.first_name,
      last_name: profile.last_name,
      age,
      profession: profName ?? "Not specified",
      city: cityName,
      phone: profile.phone ?? "",
      instagram: profile.instagram ?? "",
      matched_on: match.updated_at ?? new Date().toISOString(),
      photo_url: mediaMap.get(otherId) ?? null,
    }
  }).filter(Boolean)

  return (
    <ConnectionsClient
      connections={connections as Parameters<typeof ConnectionsClient>[0]["connections"]}
      currentUserId={user.id}
    />
  )
}
