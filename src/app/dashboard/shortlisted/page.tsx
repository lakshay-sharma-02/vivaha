export const dynamic = "force-dynamic";

import React from "react";
import { redirect } from "next/navigation";
import { getSavedProfiles } from "@/app/actions/saved";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default async function ShortlistedPage() {
  const result = await getSavedProfiles();
  
  if (!result.success) {
    redirect("/login");
  }

  const profiles = result.data || [];

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto min-h-screen">
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl text-cream font-display tracking-tight leading-tight">
          Shortlisted Profiles
        </h1>
        <p className="text-xs text-gold-light/70 font-medium tracking-widest uppercase mt-4">
          Matches you have saved for later
        </p>
      </div>

      {profiles.length === 0 ? (
        <div className="text-center py-32 border border-dashed border-gold/30 rounded-2xl bg-maroon/60">
          <Bookmark size={48} className="mx-auto text-gold/30 mb-6" strokeWidth={1} />
          <h3 className="text-xl font-display text-cream mb-2">No Profiles Shortlisted</h3>
          <p className="text-sm text-gold-light/70">You haven&apos;t bookmarked any profiles yet.</p>
          <Link 
            href="/matches"
            className="inline-block mt-8 text-xs font-bold text-cream uppercase tracking-[0.2em] border-b border-cream/30 pb-1 hover:border-cream transition-colors"
          >
            Browse Matches
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((item: any) => {
            const p = item.profiles;
            if (!p) return null;
            const age = p.date_of_birth
              ? new Date().getFullYear() - new Date(p.date_of_birth).getFullYear()
              : null;
            return (
              <Link
                key={item.id}
                href={`/matches/${p.id}`}
                className="group bg-maroon rounded-2xl border border-gold/30 hover:shadow-[0_10px_30px_-10px_rgba(180,130,60,0.3)] hover:border-gold/40 transition-all duration-500 overflow-hidden"
              >
                <div className="aspect-[4/3] relative bg-maroon/40">
                  <div className="absolute inset-0 flex items-center justify-center text-gold-light/70/30">
                    <Bookmark size={32} strokeWidth={1} />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-cream tracking-wide group-hover:text-gold-light/70 transition-colors">
                    {p.first_name}{p.last_name ? ` ${p.last_name}` : ""}{age ? `, ${age}` : ""}
                  </h3>
                  <p className="text-gold-light/70 text-xs mt-1 font-light">
                    {p.verification_status === "verified" ? "✓ Verified" : "Unverified"}
                  </p>
                  <p className="text-cream/50 text-[10px] uppercase tracking-widest mt-3">
                    Saved {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
