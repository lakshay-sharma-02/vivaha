"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/shared/lib/supabase/client";

export default function PendingVerificationPage() {
  const [status, setStatus] = useState<string>("loading");
  const [hasProfile, setHasProfile] = useState<boolean>(true);
  const [hasDocs, setHasDocs] = useState<boolean>(true);

  useEffect(() => {
    async function checkStatus() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      // Check profile
      const { data: profile } = await supabase.from("profiles").select("verification_status").eq("id", user.id).single();
      if (!profile) {
        setHasProfile(false);
        setStatus("incomplete");
        return;
      }

      // Check docs
      const { data: docs } = await supabase.from("verification_documents").select("status").eq("profile_id", user.id).single();
      if (!docs) {
        setHasDocs(false);
        setStatus("incomplete");
        return;
      }

      setStatus(profile.verification_status || "pending");
    }

    checkStatus();
  }, []);

  return (
    <main className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#FDFBF7]">
      <div className="relative w-full h-[35vh] md:h-screen">
        <Image 
          src="/images/architecture/register.jpg"
          alt="Vivaha Estate"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="w-full min-h-[65vh] md:h-screen flex flex-col justify-center px-6 py-12 md:p-12 lg:p-24 bg-[#FDFBF7] relative shadow-[-20px_0_40px_rgba(0,0,0,0.05)] overflow-y-auto">
        <div className="w-full max-w-md mx-auto space-y-8">
          <div className="w-8 h-[1px] bg-[#8C7A6B]/30 mb-6" />
          
          {status === "loading" && (
            <h1 className="text-3xl text-[#2A2621] font-display tracking-tight leading-tight animate-pulse">
              Checking status...
            </h1>
          )}

          {status === "incomplete" && (
            <>
              <h1 className="text-3xl text-[#2A2621] font-display tracking-tight leading-tight">
                Application Incomplete
              </h1>
              <p className="text-sm text-[#8C7A6B] leading-relaxed">
                You must complete all onboarding steps before your profile can be reviewed by the estate administrators.
              </p>
              <div className="pt-8 space-y-4">
                {!hasProfile && (
                  <Link href="/apply" className="block text-center py-4 border border-[#2A2621] text-xs font-bold uppercase tracking-widest text-[#2A2621] hover:bg-[#2A2621] hover:text-[#FDFBF7] transition-all">
                    Step 1: Complete Profile
                  </Link>
                )}
                {!hasDocs && (
                  <Link href="/credentials" className="block text-center py-4 border border-[#2A2621] text-xs font-bold uppercase tracking-widest text-[#2A2621] hover:bg-[#2A2621] hover:text-[#FDFBF7] transition-all">
                    Step 2: Upload Documents
                  </Link>
                )}
              </div>
            </>
          )}

          {(status === "pending" || status === "submitted") && (
            <>
              <h1 className="text-3xl text-[#2A2621] font-display tracking-tight leading-tight">
                Under Review
              </h1>
              <p className="text-sm text-[#8C7A6B] leading-relaxed">
                Your application has been received and is currently being reviewed by our administrators. 
                This process ensures the utmost integrity and privacy for all members of the estate.
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-[#8C7A6B] pt-4">
                You will be notified once approved.
              </p>
            </>
          )}

          {status === "rejected" && (
            <>
              <h1 className="text-3xl text-red-900 font-display tracking-tight leading-tight">
                Application Denied
              </h1>
              <p className="text-sm text-[#8C7A6B] leading-relaxed">
                Unfortunately, your application did not meet the criteria for admission to the estate. 
                Please ensure all provided documents are accurate and clearly legible.
              </p>
              <div className="pt-8 space-y-4">
                <Link href="/credentials" className="block text-center py-4 border border-red-900 text-xs font-bold uppercase tracking-widest text-red-900 hover:bg-red-900 hover:text-[#FDFBF7] transition-all">
                  Re-submit Documents
                </Link>
              </div>
            </>
          )}

          {status === "verified" && (
            <>
              <h1 className="text-3xl text-[#2A2621] font-display tracking-tight leading-tight">
                Welcome to Vivaha
              </h1>
              <p className="text-sm text-[#8C7A6B] leading-relaxed">
                Your profile has been verified. You now have full access to the estate.
              </p>
              <div className="pt-8 space-y-4">
                <Link href="/dashboard" className="block text-center py-4 border border-[#2A2621] text-xs font-bold uppercase tracking-widest text-[#2A2621] hover:bg-[#2A2621] hover:text-[#FDFBF7] transition-all">
                  Enter Estate
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </main>
  );
}
