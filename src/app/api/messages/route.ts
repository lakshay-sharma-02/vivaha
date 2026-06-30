import { NextResponse } from "next/server"
import { createClient } from "@/shared/lib/supabase/server"
import type { Database } from "@/shared/lib/supabase/database.types"

type MatchRow = Database["public"]["Tables"]["matches"]["Row"]

export async function POST(request: Request) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { match_id, content } = body as { match_id: string; content: string }

  if (!match_id || !content?.trim()) {
    return NextResponse.json({ error: "match_id and content are required" }, { status: 400 })
  }

  // Verify the user is a participant of this match (security guard)
  // Using `as MatchRow` to work around Supabase generic join typing returning `never`
  const { data: matchData, error: matchError } = await supabase
    .from("matches")
    .select("id, user_a_id, user_b_id, status")
    .eq("id", match_id)
    .single()

  const match = matchData as MatchRow | null

  if (matchError || !match) {
    return NextResponse.json({ error: "Match not found" }, { status: 404 })
  }

  if (match.user_a_id !== user.id && match.user_b_id !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  if (match.status !== "accepted") {
    return NextResponse.json({ error: "Match is not active" }, { status: 403 })
  }

  const { data: message, error: insertError } = await supabase
    .from("messages")
    .insert({
      match_id,
      sender_id: user.id,
      content: content.trim(),
      message_type: "text",
      is_active: true,
    })
    .select()
    .single()

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json({ message }, { status: 201 })
}
