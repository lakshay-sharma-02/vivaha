"use server"

import { createClient } from "@/lib/supabase/server"

export async function toggleProfileVisibility(isVisible: boolean) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { error } = await supabase
    .from('profiles')
    .update({ is_visible: isVisible })
    .eq('id', user.id)

  if (error) throw error

  return { success: true }
}
