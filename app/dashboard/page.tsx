import Link from "next/link"
import { redirect } from "next/navigation"
import { AlertCircle, CheckCircle2, Clock3, Eye, Heart, LogOut, Search, ShieldCheck, UserRound } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { profileImageUrl } from "@/lib/profile-images"
import type { DashboardInterest, InterestDashboard, ProfileStatus } from "@/lib/types"
import InterestResponseButtons from "./interest-response-buttons"
import VisibilityToggle from "./visibility-toggle"

const statusCopy: Record<ProfileStatus, { title: string; body: string; icon: typeof Clock3; tone: string }> = {
  DRAFT: { title: "Complete your profile", body: "Finish all seven steps and submit your identity document for review.", icon: Clock3, tone: "status-neutral" },
  PENDING_VERIFICATION: { title: "Verification in progress", body: "Our team is reviewing your profile and Aadhaar document. Most reviews finish within 24–48 hours.", icon: Clock3, tone: "status-warning" },
  VERIFIED: { title: "Profile verified", body: "Your profile is active and visible to verified members in your community.", icon: CheckCircle2, tone: "status-success" },
  REJECTED: { title: "Changes required", body: "Update the requested information and submit your profile again.", icon: AlertCircle, tone: "status-danger" },
}

function InterestCard({ interest, received }: { interest: DashboardInterest; received: boolean }) {
  const person = interest.person
  const image = profileImageUrl(person.profile_photo_path)
  return (
    <article className="surface-card p-4">
      <Link href={`/profile/${person.id}`} className="flex items-center gap-4">
        <div className="size-14 overflow-hidden rounded-xl bg-muted">
          {image ? <img src={image} alt={person.full_name ?? "Member"} className="h-full w-full object-cover" /> : <UserRound className="m-4 size-6 text-muted-foreground" />}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold">{person.full_name ?? "Sahachar member"}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{new Date(interest.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
        </div>
        <span className={cn("status-pill", interest.status === "ACCEPTED" ? "status-success" : interest.status === "DECLINED" ? "status-danger" : "status-warning")}>{interest.status.toLowerCase()}</span>
      </Link>
      <div className="mt-4 flex min-h-9 items-center justify-between gap-3 border-t pt-4">
        {received && interest.status === "PENDING" ? <InterestResponseButtons interestId={interest.id} /> : <span className="text-sm text-muted-foreground">{received ? "Received interest" : "Interest sent"}</span>}
        {interest.status === "ACCEPTED" && <a href={`tel:${person.phone_number}`} className="text-sm font-semibold text-primary">{person.phone_number ?? "Contact unavailable"}</a>}
      </div>
    </article>
  )
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const [{ data: profile }, { data: adminRow }, { data: interestData }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("admins").select("id").eq("id", user.id).maybeSingle(),
    supabase.rpc("get_interest_dashboard"),
  ])
  if (!profile) redirect("/onboarding")

  const status = (profile.status ?? "DRAFT") as ProfileStatus
  const state = statusCopy[status]
  const StatusIcon = state.icon
  const interests = (interestData ?? { received: [], sent: [] }) as InterestDashboard
  const isSubscribed = profile.subscription_ends_at && new Date(profile.subscription_ends_at) > new Date()

  return (
    <main className="page-shell">
      <div className="page-container space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Member home</p>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">Namaste, {profile.full_name || user.email}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {adminRow && <Link href="/admin/verify" className={cn(buttonVariants({ variant: "outline" }), "gap-2")}><ShieldCheck />Admin</Link>}
            <form action="/auth/signout" method="post"><Button variant="ghost" type="submit"><LogOut />Sign out</Button></form>
          </div>
        </header>

        <section className="surface-card overflow-hidden">
          <div className="grid lg:grid-cols-[1.4fr_.6fr]">
            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className={cn("rounded-xl p-3", state.tone)}><StatusIcon className="size-6" /></div>
                <div>
                  <h2 className="font-display text-2xl font-semibold">{state.title}</h2>
                  <p className="mt-2 max-w-xl text-muted-foreground">{state.body}</p>
                  {status === "REJECTED" && profile.rejection_reason && <p className="mt-3 rounded-lg bg-destructive/8 p-3 text-sm text-destructive">Reason: {profile.rejection_reason}</p>}
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {status === "VERIFIED" && <Link href="/browse" className={buttonVariants()}><Search />Browse matches</Link>}
                {(status === "DRAFT" || status === "REJECTED") && <Link href="/onboarding" className={buttonVariants()}>Continue profile</Link>}
                <Link href="/dashboard/edit-profile" className={buttonVariants({ variant: "outline" })}>Edit profile</Link>
              </div>
            </div>
            <div className="border-t bg-muted/35 p-6 lg:border-l lg:border-t-0 sm:p-8">
              <p className="eyebrow">Membership</p>
              <p className="mt-2 text-xl font-semibold">{isSubscribed ? "Active" : "Basic access"}</p>
              <p className="mt-2 text-sm text-muted-foreground">{isSubscribed ? `Valid until ${new Date(profile.subscription_ends_at).toLocaleDateString("en-IN")}` : "Complete profile details and interests are available with a 30-day membership."}</p>
            </div>
          </div>
        </section>

        {status === "VERIFIED" && (
          <>
            <VisibilityToggle initialVisibility={profile.is_visible ?? true} />
            <section>
              <div className="mb-4 flex items-center justify-between"><h2 className="section-title"><Heart />Received interests</h2><span className="quiet-chip">{interests.received.length}</span></div>
              {interests.received.length ? <div className="grid gap-4 md:grid-cols-2">{interests.received.map((interest) => <InterestCard key={interest.id} interest={interest} received />)}</div> : <div className="empty-state"><Heart className="size-8" /><p>No interests received yet.</p></div>}
            </section>
            <section>
              <div className="mb-4 flex items-center justify-between"><h2 className="section-title"><Eye />Sent interests</h2><span className="quiet-chip">{interests.sent.length}</span></div>
              {interests.sent.length ? <div className="grid gap-4 md:grid-cols-2">{interests.sent.map((interest) => <InterestCard key={interest.id} interest={interest} received={false} />)}</div> : <div className="empty-state"><p>You have not sent any interests yet.</p></div>}
            </section>
          </>
        )}
      </div>
    </main>
  )
}
