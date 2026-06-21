"use server"

import { createClient } from "@/lib/supabase/server"
import type { BrowseFilters, BrowseResult } from "@/lib/types"

export async function getProfilesPage(page: number, filters: BrowseFilters = {}): Promise<BrowseResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data, error } = await supabase.rpc("browse_profiles", {
    page_number: Math.max(1, Math.floor(page)),
    search_text: filters.search?.trim().slice(0, 100) || null,
    religion_filter: filters.religion?.trim().slice(0, 100) || null,
    caste_filter: filters.caste?.trim().slice(0, 100) || null,
    town_filter: filters.town?.trim().slice(0, 100) || null,
    age_min: filters.ageMin ?? null,
    age_max: filters.ageMax ?? null,
  })
  if (error) throw new Error("Could not load profiles")
  return data as BrowseResult
}
