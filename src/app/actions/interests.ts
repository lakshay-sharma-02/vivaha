"use server";

import { createClient } from "@/shared/lib/supabase/server";

export type InterestProfile = {
  id: string; // introduction id
  profile_id: string; // the other user's id
  name: string;
  age: number;
  profession: string;
  city: string;
  verified: boolean;
  image: string;
  compatibility: number;
  created_at: string;
  updated_at: string;
  status: string;
};

export async function getInterests(type: "received" | "sent" | "accepted" | "declined"): Promise<{ success: boolean; data?: InterestProfile[]; error?: string }> {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Not authenticated" };
    }

    let query = supabase.from('introductions').select(`
      id,
      created_at,
      updated_at,
      status,
      sender_id,
      receiver_id,
      sender:profiles!introductions_sender_id_fkey(id, first_name, last_name, date_of_birth, verification_status, profession:professions(name), city:cities(name), profile_media(bucket_path)),
      receiver:profiles!introductions_receiver_id_fkey(id, first_name, last_name, date_of_birth, verification_status, profession:professions(name), city:cities(name), profile_media(bucket_path))
    `);

    switch (type) {
      case "received":
        query = query.eq('receiver_id', user.id).eq('status', 'pending');
        break;
      case "sent":
        query = query.eq('sender_id', user.id).eq('status', 'pending');
        break;
      case "accepted":
        query = query.or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`).eq('status', 'accepted');
        break;
      case "declined":
        query = query.or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`).eq('status', 'rejected');
        break;
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching ${type} interests:`, error);
      return { success: false, error: "Failed to load data" };
    }

    const formattedData: InterestProfile[] = (data || []).map((row: any) => {
      // Determine if the current user is sender or receiver
      const isSender = row.sender_id === user.id;
      const profile = isSender ? row.receiver : row.sender;
      
      let age = 25;
      if (profile?.date_of_birth) {
        const birthDate = new Date(profile.date_of_birth);
        const today = new Date();
        age = today.getFullYear() - birthDate.getFullYear();
      }

      return {
        id: row.id,
        profile_id: profile?.id || "",
        name: profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}`.trim() : "Unknown",
        age,
        profession: profile?.profession?.name || "Professional",
        city: profile?.city?.name || "Not specified",
        verified: profile?.verification_status === 'verified',
        image: profile?.profile_media?.[0]?.bucket_path || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
        compatibility: Math.floor(Math.random() * 15) + 80, // Mocked for now
        created_at: row.created_at,
        updated_at: row.updated_at,
        status: row.status
      };
    });

    return { success: true, data: formattedData };
  } catch (err) {
    console.error("getInterests exception:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function sendInterest(receiverId: string) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) return { success: false, error: "Not authenticated" };
    if (user.id === receiverId) return { success: false, error: "Cannot send interest to yourself" };

    // Check if interest already exists
    const { data: existing } = await supabase
      .from('introductions')
      .select('id')
      .or(`and(sender_id.eq.${user.id},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${user.id})`)
      .single();

    if (existing) {
      return { success: false, error: "An introduction already exists with this user." };
    }

    // Create the interest
    const { error: insertError } = await supabase
      .from('introductions')
      .insert({
        sender_id: user.id,
        receiver_id: receiverId,
        status: 'pending'
      });

    if (insertError) {
      console.error("Error sending interest:", insertError);
      return { success: false, error: "Failed to send interest." };
    }

    // Remove from recommendations (since we now have an active interaction)
    await supabase.from('recommendations')
      .delete()
      .eq('user_id', user.id)
      .eq('recommended_profile_id', receiverId);

    // TODO: Trigger Notification

    return { success: true };
  } catch (err) {
    console.error("sendInterest exception:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function updateInterestStatus(introductionId: string, status: "accepted" | "rejected" | "withdrawn") {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Not authenticated" };
    }

    if (status === "withdrawn") {
      // Meaning sender is withdrawing
      const { error } = await supabase
        .from('introductions')
        .delete()
        .eq('id', introductionId)
        .eq('sender_id', user.id)
        .eq('status', 'pending');
        
      if (error) return { success: false, error: "Failed to withdraw interest." };
      return { success: true };
    } else {
      // Receiver is accepting or rejecting
      const { error } = await supabase
        .from('introductions')
        .update({ status: status, updated_at: new Date().toISOString() })
        .eq('id', introductionId)
        .eq('receiver_id', user.id)
        .eq('status', 'pending');
        
      if (error) return { success: false, error: "Failed to update status." };

      if (status === "accepted") {
         // Create a match in the matches table
         const { data: introData } = await supabase
           .from('introductions')
           .select('sender_id, receiver_id')
           .eq('id', introductionId)
           .single();
           
         if (introData) {
           await supabase.from('matches').insert({
             user_a_id: introData.sender_id,
             user_b_id: introData.receiver_id,
             status: 'accepted',
             action_by_id: user.id
           });
         }
      }
      return { success: true };
    }
  } catch (err) {
    console.error("updateInterestStatus exception:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
}
