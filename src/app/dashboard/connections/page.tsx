import { redirect } from "next/navigation"
import { createClient } from "@/shared/lib/supabase/server"
import ConnectionsClient from "@/features/dashboard/components/connections-client"

export default async function ConnectionsPage() {
  const supabase = await createClient()

  // Authenticate
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect('/login')
  }

  // Fetch mutual matches (where status = 'accepted')
  // In a real scenario, this involves a complex JOIN on the matches table
  // For the UI demonstration, we will pass some dummy "unlocked" profiles
  // Since we don't have the actual Matches table populated yet.

  const mockUnlockedConnections = [
    {
      id: "9283-asdf-1234",
      first_name: "Priya",
      last_name: "Sharma",
      age: 26,
      profession: "Corporate Lawyer",
      city: "Mumbai, MH",
      phone: "+91 9876543210",
      instagram: "priyasharma_law",
      matched_on: "2026-06-25T10:00:00Z",
      image: "bg-gradient-to-tr from-zinc-800 to-zinc-950",
    },
    {
      id: "1234-qwer-5678",
      first_name: "Rahul",
      last_name: "Verma",
      age: 29,
      profession: "Software Engineer",
      city: "Bangalore, KA",
      phone: "+91 9123456789",
      instagram: "rahulv.codes",
      matched_on: "2026-06-28T14:30:00Z",
      image: "bg-gradient-to-bl from-zinc-800 to-zinc-900",
    }
  ]

  return (
    <ConnectionsClient connections={mockUnlockedConnections} />
  )
}
