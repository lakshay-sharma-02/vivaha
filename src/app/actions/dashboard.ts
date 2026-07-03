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
  const { data: recommendations } = await (supabase as any)
      .from("profiles")
    .select(`
      id,
      first_name,
      last_name,
      age:date_of_birth,
      profession:professions(name),
      city:cities(name),
      profile_media (bucket_path)
    `)
    .neq("id", user.id)
    .eq("is_active", true)
    .eq("is_paused", false)
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
    recommendations: recommendations?.map((rec: any) => {
      // Calculate age simply
      const age = rec.age ? new Date().getFullYear() - new Date(rec.age).getFullYear() : 25;
      
      return {
        id: rec.id,
        name: rec.first_name,
        age,
        // @ts-ignore
        profession: rec.profession?.name || "Professional",
        // @ts-ignore
        city: rec.city?.name || "Unknown",
        compatibility: Math.floor(Math.random() * 15) + 80, // Mock compatibility since it requires deep match logic
        // @ts-ignore
        image: rec.profile_media?.[0]?.bucket_path || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"
      }
    }) || []
  };
}
