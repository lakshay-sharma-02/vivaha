"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import Image from "next/image"
import { Briefcase, GraduationCap, Loader2, MapPin, Search, SlidersHorizontal, UserRound } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { calculateAge, profileImageUrl } from "@/lib/profile-images"
import type { BrowseFilters, BrowseResult } from "@/lib/types"
import { getProfilesPage } from "./actions"

export default function BrowseClient({ initialResult, isSubscribed }: {
  initialResult: BrowseResult
  isSubscribed: boolean
}) {
  const [result, setResult] = useState(initialResult)
  const [filters, setFilters] = useState<BrowseFilters>({})
  const [draft, setDraft] = useState<BrowseFilters>({})
  const [showMore, setShowMore] = useState(false)
  const [isPending, startTransition] = useTransition()

  function load(page: number, nextFilters = filters) {
    startTransition(async () => {
      const next = await getProfilesPage(page, nextFilters)
      setResult(next)
      setFilters(nextFilters)
    })
  }

  function applyFilters(event: React.FormEvent) {
    event.preventDefault()
    load(1, draft)
  }

  function clearFilters() {
    setDraft({})
    load(1, {})
  }

  return (
    <div className="space-y-8">
      <form onSubmit={applyFilters} className="surface-card p-5 sm:p-6">
        <div className="grid gap-3 md:grid-cols-4">
          <label className="relative md:col-span-2">
            <span className="sr-only">Search profiles</span>
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={draft.search ?? ""} onChange={(e) => setDraft({ ...draft, search: e.target.value })}
              placeholder="Search by name or introduction" className="h-11 pl-10" />
          </label>
          <Input aria-label="Town" value={draft.town ?? ""} onChange={(e) => setDraft({ ...draft, town: e.target.value })} placeholder="Town" className="h-11" />
          <Button type="submit" className="h-11" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : <Search />} Find matches
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
          <Button type="button" variant="ghost" size="sm" onClick={() => setShowMore(!showMore)}>
            <SlidersHorizontal /> {showMore ? "Fewer filters" : "More filters"}
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>Clear filters</Button>
        </div>
        {showMore && (
          <div className="mt-4 grid grid-cols-2 gap-3 border-t pt-4 md:grid-cols-4">
            <Input aria-label="Religion" value={draft.religion ?? ""} onChange={(e) => setDraft({ ...draft, religion: e.target.value })} placeholder="Religion" />
            <Input aria-label="Caste or community" value={draft.caste ?? ""} onChange={(e) => setDraft({ ...draft, caste: e.target.value })} placeholder="Caste / community" />
            <Input aria-label="Minimum age" type="number" min={18} max={100} value={draft.ageMin ?? ""} onChange={(e) => setDraft({ ...draft, ageMin: e.target.value ? Number(e.target.value) : undefined })} placeholder="Min age" />
            <Input aria-label="Maximum age" type="number" min={18} max={100} value={draft.ageMax ?? ""} onChange={(e) => setDraft({ ...draft, ageMax: e.target.value ? Number(e.target.value) : undefined })} placeholder="Max age" />
          </div>
        )}
      </form>

      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Verified community</p>
          <h2 className="font-display text-2xl font-semibold">{result.totalCount} potential matches</h2>
        </div>
        {!isSubscribed && <p className="hidden text-sm text-muted-foreground sm:block">Join to view complete details and send interests</p>}
      </div>

      {result.profiles.length === 0 ? (
        <div className="surface-card py-16 text-center">
          <UserRound className="mx-auto mb-4 size-10 text-muted-foreground" />
          <h3 className="text-lg font-semibold">No matches found</h3>
          <p className="mt-1 text-sm text-muted-foreground">Try widening your age, town or community filters.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {result.profiles.map((profile) => {
            const image = profileImageUrl(profile.profile_photo_path)
            const age = calculateAge(profile.date_of_birth)
            return (
              <article key={profile.id} className="profile-card group">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  {image ? <Image src={image} alt={profile.full_name ?? "Member profile"} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" /> :
                    <div className="grid h-full place-items-center"><UserRound className="size-12 text-muted-foreground/40" /></div>}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-16 text-white">
                    <h3 className="text-xl font-semibold">{profile.full_name}{age !== null ? `, ${age}` : ""}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-white/80"><MapPin className="size-4" />{profile.town || "Town not listed"}</p>
                  </div>
                </div>
                <div className="space-y-4 p-5">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {profile.profession && <p className="flex items-center gap-2"><Briefcase className="size-4 text-primary" />{profile.profession}</p>}
                    {profile.education && <p className="flex items-center gap-2"><GraduationCap className="size-4 text-primary" />{profile.education}</p>}
                  </div>
                  <div className="flex gap-2">
                    {profile.religion && <span className="quiet-chip">{profile.religion}</span>}
                    {profile.caste && <span className="quiet-chip">{profile.caste}</span>}
                  </div>
                  <Link href={`/profile/${profile.id}`} className={cn(buttonVariants(), "w-full")}>View profile</Link>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {result.totalCount > result.pageSize && (
        <nav aria-label="Profile results pages" className="flex items-center justify-center gap-3 pt-4">
          <Button variant="outline" disabled={result.page <= 1 || isPending} onClick={() => load(result.page - 1)}>Previous</Button>
          <span className="text-sm text-muted-foreground">Page {result.page} of {Math.ceil(result.totalCount / result.pageSize)}</span>
          <Button variant="outline" disabled={!result.hasMore || isPending} onClick={() => load(result.page + 1)}>Next</Button>
        </nav>
      )}
    </div>
  )
}
