import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Clock, CheckCircle, AlertCircle, Search, LogOut } from "lucide-react"

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
    <div className="min-h-screen bg-background relative overflow-hidden py-12 px-4 sm:px-6">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-4xl font-bold">Your Dashboard</h1>
          <form action="/auth/signout" method="post">
            <Button variant="outline" type="submit" className="rounded-full gap-2">
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </form>
        </div>

        <div className="glass-panel p-8 rounded-3xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-1">Welcome back, {profile.full_name || user.email}!</h2>
              <p className="text-muted-foreground">Manage your profile and find your perfect match.</p>
            </div>
            
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm font-medium",
              profile.status === 'approved' ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400" :
              profile.status === 'pending' ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-700 dark:text-yellow-400" :
              profile.status === 'rejected' ? "bg-destructive/10 border-destructive/20 text-destructive" :
              "bg-muted border-border"
            )}>
              {profile.status === 'approved' && <CheckCircle className="w-5 h-5" />}
              {profile.status === 'pending' && <Clock className="w-5 h-5" />}
              {profile.status === 'rejected' && <AlertCircle className="w-5 h-5" />}
              Profile Status: {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
            </div>
          </div>

          <div className="bg-background/50 rounded-2xl p-6 border border-border/50">
            {profile.status === 'pending' && (
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-600 dark:text-yellow-400 mt-1">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Verification in Progress</h3>
                  <p className="text-muted-foreground">
                    Your profile and Aadhaar details are currently under manual review by our team. This usually takes 24-48 hours. Once approved, you will be able to browse other verified profiles.
                  </p>
                </div>
              </div>
            )}

            {profile.status === 'rejected' && (
              <div className="flex items-start gap-4">
                <div className="p-3 bg-destructive/10 rounded-full text-destructive mt-1">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-destructive">Verification Failed</h3>
                  <p className="text-muted-foreground mb-4">
                    Unfortunately, we could not verify your profile. Reason: <strong className="text-foreground">{profile.rejection_reason || 'Information mismatch.'}</strong>
                  </p>
                  <Link 
                    href="/onboarding"
                    className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}
                  >
                    Update Profile Details
                  </Link>
                </div>
              </div>
            )}

            {profile.status === 'approved' && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-500/10 rounded-full text-green-600 dark:text-green-400 mt-1">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">You're all set!</h3>
                    <p className="text-muted-foreground">
                      Your profile is verified and active. You can now browse our premium community of verified matches.
                    </p>
                  </div>
                </div>
                <Link 
                  href="/browse"
                  className={cn(buttonVariants({ size: "lg" }), "rounded-full shadow-md shadow-primary/20 shrink-0 gap-2 w-full sm:w-auto")}
                >
                  <Search className="w-5 h-5" /> Browse Matches
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
