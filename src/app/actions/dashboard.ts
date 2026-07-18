"use server";

import { createClient } from "@/shared/lib/supabase/server";

export async function getDashboardData() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Unauthorized");
  }

  // 1. Fetch user profile
  const { data: profile } = await (supabase as any)
      .from("profiles")
    .select("first_name, verification_status")
    .eq("id", user.id)
    .single();

  // 2. Fetch completion score
  const { data: completion } = await (supabase as any)
      .from("profile_completion")
    .select("score")
    .eq("profile_id", user.id)
    .single();

  // 3. Fetch interests stats
  const [{ count: receivedCount }, { count: sentCount }, { count: acceptedCount }] = await Promise.all([
    supabase.from("introductions").select("*", { count: "exact", head: true }).eq("receiver_id", user.id).eq("status", "pending"),
    supabase.from("introductions").select("*", { count: "exact", head: true }).eq("sender_id", user.id).eq("status", "pending"),
    supabase.from("introductions").select("*", { count: "exact", head: true }).or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`).eq("status", "accepted")
  ]);

  // 4. Fetch Insights (Profile views)
  const { count: viewsCount } = await (supabase as any)
      .from("profile_views")
    .select("*", { count: "exact", head: true })
    .eq("viewed_id", user.id);

  // 5. Fetch Recent Activity (Notifications)
  const { data: notifications } = await (supabase as any)
      .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(3);

  // 6. Fetch Recommended Matches (just reuse the discover endpoint logic but limit to 2)
  const { data: rawRecommendations } = await (supabase as any)
      .from("recommendations")
    .select(`
      id,
      score,
      recommended_profile_id,
      profile:profiles!recommendations_recommended_profile_id_fkey(
        id,
        first_name,
        last_name,
        date_of_birth,
        profession:professions(name),
        city:cities(name),
        profile_media (bucket_path)
      )
    `)
    .eq("user_id", user.id)
    .order("score", { ascending: false })
    .limit(2);

  return {
    profile: {
      firstName: profile?.first_name || "Member",
      verificationStatus: profile?.verification_status || "unverified"
    },
    completionScore: completion?.score || 0,
    stats: {
      received: receivedCount || 0,
      sent: sentCount || 0,
      accepted: acceptedCount || 0,
      pending: (receivedCount || 0) + (sentCount || 0),
      views: viewsCount || 0
    },
    recentActivity: notifications || [],
    recommendations: (rawRecommendations || []).map((rec: any) => {
      const p = rec.profile;
      if (!p) return null;
      const age = p.date_of_birth ? new Date().getFullYear() - new Date(p.date_of_birth).getFullYear() : 25;
      
      return {
        id: p.id,
        name: p.first_name,
        age,
        // @ts-ignore
        profession: p.profession?.name || "Professional",
        // @ts-ignore
        city: p.city?.name || "Unknown",
        compatibility: rec.score || 85,
        // @ts-ignore
        image: p.profile_media?.[0]?.bucket_path 
          ? supabase.storage.from('profile_media').getPublicUrl(p.profile_media[0].bucket_path).data.publicUrl
          : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"
      }
    }).filter(Boolean) || []
  };
}
