"use server";

import { createClient } from "@/shared/lib/supabase/server";

export type FullProfile = {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  height_cm: number | null;
  city: string;
  profession: string;
  religion: string;
  bio: string | null;
  verification_status: string;
  education: string | null;
  university: string | null;
  company: string | null;
  income_range: string | null;
  phone: string | null;
  instagram: string | null;
  compatibility_score: number;
  images: string[];
  
  // Membership & Interactions
  viewer_is_premium: boolean;
  interaction_status: "none" | "pending_sent" | "pending_received" | "accepted" | "rejected";
  is_shortlisted: boolean;
};

export async function getProfileById(profileId: string): Promise<{ success: boolean; data?: FullProfile; error?: string }> {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Not authenticated" };
    }

    // 1. Fetch Profile Data
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select(`
        *,
        profession:professions(name),
        city:cities(name),
        religion:religions(name)
      `)
      .eq("id", profileId)
      .single();

    if (profileError || !profile) {
      return { success: false, error: "Profile not found" };
    }

    // 2. Fetch Viewer Membership
    const { data: membership } = await supabase
      .from("memberships")
      .select("tier")
      .eq("profile_id", user.id)
      .single();
    const isPremium = membership?.tier === "premium" || membership?.tier === "elite";

    // 3. Fetch Interaction Status (Introductions)
    const { data: introduction } = await supabase
      .from("introductions")
      .select("status, sender_id, receiver_id")
      .or(`and(sender_id.eq.${user.id},receiver_id.eq.${profileId}),and(sender_id.eq.${profileId},receiver_id.eq.${user.id})`)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    let interactionStatus: FullProfile["interaction_status"] = "none";
    if (introduction) {
      if (introduction.status === "pending") {
        interactionStatus = introduction.sender_id === user.id ? "pending_sent" : "pending_received";
      } else if (introduction.status === "accepted") {
        interactionStatus = "accepted";
      } else if (introduction.status === "rejected") {
        interactionStatus = "rejected";
      }
    }

    // 4. Fetch Shortlist Status
    const { data: shortlist } = await supabase
      .from("saved_profiles")
      .select("id")
      .eq("user_id", user.id)
      .eq("saved_profile_id", profileId)
      .single();

    // 5. Audit Log (Profile Visit)
    if (user.id !== profileId) {
      await supabase.from("audit_logs").insert({
        actor_id: user.id,
        action: "profile_visit",
        target_id: profileId,
        metadata: {}
      });
    }

    // Calculate Age
    let age = 25;
    if (profile.date_of_birth) {
      age = new Date().getFullYear() - new Date(profile.date_of_birth).getFullYear();
    }

    // Process Images
    const { data: media } = await supabase
      .from("profile_media")
      .select("bucket_path")
      .eq("profile_id", profileId)
      .eq("type", "image");
      
    const images = (media || []).map((m: any) => m.bucket_path);
    if (images.length === 0) {
      images.push("https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop");
    }

    const formattedData: FullProfile = {
      id: profile.id,
      first_name: profile.first_name,
      last_name: profile.last_name || "",
      age,
      height_cm: profile.height_cm,
      city: (profile.city as any)?.name || "Not specified",
      profession: (profile.profession as any)?.name || "Professional",
      religion: (profile.religion as any)?.name || "Not specified",
      bio: profile.bio,
      verification_status: profile.verification_status || "unverified",
      education: profile.education,
      university: profile.university,
      company: profile.company,
      income_range: profile.income_range,
      phone: profile.phone,
      instagram: profile.instagram,
      compatibility_score: Math.floor(Math.random() * 15) + 80, // Mock compatibility logic
      images,
      viewer_is_premium: isPremium,
      interaction_status: interactionStatus,
      is_shortlisted: !!shortlist
    };

    return { success: true, data: formattedData };
  } catch (err) {
    console.error("getProfileById exception:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
}

// ------------------------------------------------
// Mutations
// ------------------------------------------------

export async function toggleShortlist(profileId: string, isShortlisted: boolean) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false };

    if (isShortlisted) {
      await supabase.from("saved_profiles").delete().eq("user_id", user.id).eq("saved_profile_id", profileId);
    } else {
      await supabase.from("saved_profiles").insert({ user_id: user.id, saved_profile_id: profileId });
    }
    return { success: true };
  } catch (err) {
    return { success: false };
  }
}

export async function sendInterest(profileId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false };

    const { error } = await supabase.from("introductions").insert({
      sender_id: user.id,
      receiver_id: profileId,
      status: "pending"
    });

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}
