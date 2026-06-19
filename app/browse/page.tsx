import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import BrowseClient from "./browse-client"

export default async function BrowsePage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login")
  }

  const { data: currentUserProfile } = await supabase
    .from('profiles')
    .select('status')
    .eq('id', user.id)
    .single()

  if (currentUserProfile?.status !== 'VERIFIED') {
    redirect("/dashboard")
  }

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, full_name, profile_photo_path, date_of_birth, town, religion, caste, education, occupation, about_me')
    .eq('status', 'VERIFIED')

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-destructive font-medium">Error loading profiles. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Discover Matches</h1>
            <p className="text-muted-foreground text-lg">Find verified profiles from your community.</p>
          </div>
          <Link 
            href="/dashboard" 
            className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}
          >
            Go to Dashboard
          </Link>
        </div>

        <BrowseClient initialProfiles={profiles || []} />
      </div>
    </div>
  )
}
