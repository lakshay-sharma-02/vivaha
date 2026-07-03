import React from "react";
import { Bookmark } from "lucide-react";

export default function ShortlistedPage() {
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

      <div className="text-center py-32 border border-dashed border-[#E5D9CC] rounded-2xl bg-white/50">
        <Bookmark size={48} className="mx-auto text-[#E6D5C3] mb-6" strokeWidth={1} />
        <h3 className="text-xl font-serif text-[#2A2621] mb-2">No Profiles Shortlisted</h3>
        <p className="text-sm text-[#8C7A6B]">You haven't bookmarked any profiles yet.</p>
      </div>
    </div>
  );
}
