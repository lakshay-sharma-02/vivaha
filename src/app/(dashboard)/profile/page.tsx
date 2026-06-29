import { Metadata } from "next"
import { UserCircle, ShieldCheck, Camera, Edit, Settings } from "lucide-react"
import { Button } from "@/shared/ui/button/button"

export const metadata: Metadata = {
  title: "My Profile",
}

export default function MyProfilePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 pb-24">
      <div>
        <h1 className="font-playfair text-4xl font-semibold tracking-tight text-foreground">
          My Profile
        </h1>
        <p className="mt-3 text-[15px] text-muted-foreground">
          Manage your profile, photos, and settings.
        </p>
      </div>

      {/* Profile Card */}
      <div className="relative rounded-2xl border border-border/40 bg-card/40 p-8 backdrop-blur-md">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 ring-2 ring-primary/20">
              <UserCircle className="h-16 w-16 text-primary/60" />
            </div>
            <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-md ring-2 ring-background transition-opacity hover:opacity-80">
              <Camera className="h-4 w-4" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <span className="font-playfair text-3xl font-semibold text-foreground">
                Admin User
              </span>
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <p className="mt-1 text-[15px] text-muted-foreground">
              sharmalakshay0208@gmail.com
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/20">
                Premium Member
              </span>
              <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 ring-1 ring-green-500/20 dark:text-green-400">
                Verified
              </span>
            </div>
          </div>

          <Button variant="outline" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Profile Views", value: "—" },
          { label: "Interests Sent", value: "—" },
          { label: "Matches", value: "—" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border/40 bg-card/30 p-5 text-center backdrop-blur-md"
          >
            <p className="font-playfair text-3xl font-semibold text-foreground">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Settings Link */}
      <div className="rounded-xl border border-border/40 bg-card/30 backdrop-blur-md">
        <button className="flex w-full items-center justify-between px-6 py-4 text-[15px] font-medium text-foreground transition-colors hover:bg-accent/50 rounded-xl">
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <span>Account Settings</span>
          </div>
          <span className="text-muted-foreground">→</span>
        </button>
      </div>
    </div>
  )
}
