import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default async function BrowsePage() {
  const supabase = await createClient()

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*, profile_details(*)')
    .eq('status', 'approved')

  if (error) {
    return <div>Error loading profiles</div>
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Discover Matches</h1>
        <Link 
          href="/dashboard" 
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          My Profile
        </Link>
      </div>

      {profiles?.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">No approved profiles found yet. Check back later!</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profiles?.map((profile) => (
            <Card key={profile.id} className="overflow-hidden">
              <div className="aspect-square bg-gray-100">
                {profile.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt={profile.full_name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    No Photo
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle>{profile.full_name}, {new Date().getFullYear() - new Date(profile.date_of_birth).getFullYear()}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {profile.profile_details?.bio || "No bio provided."}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                    {profile.profile_details?.city}
                  </span>
                  <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                    {profile.profile_details?.religion}
                  </span>
                </div>
                <Link 
                  href={`/profile/${profile.id}`}
                  className={cn(buttonVariants(), "mt-6 w-full")}
                >
                  View Profile
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
