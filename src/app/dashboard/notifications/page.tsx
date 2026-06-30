import { redirect } from "next/navigation"
import { createClient } from "@/shared/lib/supabase/server"
import NotificationsClient from "@/features/dashboard/components/notifications-client"

export default async function NotificationsPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }

  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return <NotificationsClient notifications={notifications || []} />
}
