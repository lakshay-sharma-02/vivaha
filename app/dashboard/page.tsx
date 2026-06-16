import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    redirect("/onboarding")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <form action="/auth/signout" method="post">
            <Button variant="outline" type="submit">
              Sign out
            </Button>
          </form>
        </div>
        
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Welcome, {user.email}!</h2>
            <div className={`rounded-full px-3 py-1 text-xs font-medium ${
              profile.status === 'approved' ? 'bg-green-100 text-green-800' :
              profile.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              profile.status === 'rejected' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              Status: {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
            </div>
          </div>

          {profile.status === 'rejected' && (
            <div className="mt-4 rounded-md bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">Rejection Reason:</p>
              <p className="mt-1 text-sm text-red-700">{profile.rejection_reason || 'No reason provided.'}</p>
              <Link 
                href="/onboarding"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-3 border-red-200 text-red-800 hover:bg-red-100")}
              >
                Update Profile
              </Link>
            </div>
          )}

          {profile.status === 'pending' && (
            <p className="mt-4 text-sm text-gray-600">
              Your profile is currently under review by our team. You'll be able to browse matches once approved.
            </p>
          )}

          {profile.status === 'approved' && (
            <p className="mt-2 text-gray-600">
              Your profile is verified. You can now browse matches and connect with others!
            </p>
          )}

          <div className="mt-6 space-y-2 border-t pt-4">
            <p className="text-sm text-gray-500">User ID: {user.id}</p>
            <p className="text-sm text-gray-500">Last sign in: {new Date(user.last_sign_in_at!).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
