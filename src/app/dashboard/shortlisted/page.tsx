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
        <h1 className="text-3xl md:text-5xl text-[#2A2621] font-serif tracking-tight leading-tight">
          Shortlisted Profiles
        </h1>
        <p className="text-xs text-[#8C7A6B] font-medium tracking-widest uppercase mt-4">
          Matches you have saved for later
        </p>
      </div>

      {profiles.length === 0 ? (
        <div className="text-center py-32 border border-dashed border-[#E5D9CC] rounded-2xl bg-white/50">
          <Bookmark size={48} className="mx-auto text-[#E6D5C3] mb-6" strokeWidth={1} />
          <h3 className="text-xl font-serif text-[#2A2621] mb-2">No Profiles Shortlisted</h3>
          <p className="text-sm text-[#8C7A6B]">You haven&apos;t bookmarked any profiles yet.</p>
          <Link 
            href="/matches"
            className="inline-block mt-8 text-xs font-bold text-[#2A2621] uppercase tracking-[0.2em] border-b border-[#2A2621]/30 pb-1 hover:border-[#2A2621] transition-colors"
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
                className="group bg-white rounded-2xl border border-[#E6D5C3]/50 hover:shadow-[0_10px_30px_-10px_rgba(230,213,195,0.6)] hover:border-[#D4C4B7] transition-all duration-500 overflow-hidden"
              >
                <div className="aspect-[4/3] relative bg-[#F0EBE1]">
                  <div className="absolute inset-0 flex items-center justify-center text-[#8C7A6B]/30">
                    <Bookmark size={32} strokeWidth={1} />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-[#2A2621] tracking-wide group-hover:text-[#8C7A6B] transition-colors">
                    {p.first_name}{p.last_name ? ` ${p.last_name}` : ""}{age ? `, ${age}` : ""}
                  </h3>
                  <p className="text-[#8C7A6B] text-xs mt-1 font-light">
                    {p.verification_status === "verified" ? "✓ Verified" : "Unverified"}
                  </p>
                  <p className="text-[#A3998D] text-[10px] uppercase tracking-widest mt-3">
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
