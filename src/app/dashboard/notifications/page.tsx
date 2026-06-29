import { redirect } from "next/navigation"
import { createClient } from "@/shared/lib/supabase/server"
import NotificationsClient from "@/features/dashboard/components/notifications-client"

export default async function NotificationsPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }

  return <NotificationsClient />
}
