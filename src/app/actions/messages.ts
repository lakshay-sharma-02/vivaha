"use server";

import { createClient } from "@/shared/lib/supabase/server";
import { triggerNotification } from "./notifications";

export type Conversation = {
  id: string; // match_id
  profile_id: string;
  name: string;
  image: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  compatibility: number;
  age: number;
  profession: string;
  city: string;
  verified: boolean;
  messages: Array<{
    id: string;
    sender: "me" | "them";
    text: string;
    time: string;
    status: "read" | "sent" | "delivered";
  }>;
};

export async function getConversations(): Promise<{ success: boolean; data?: Conversation[]; error?: string }> {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) return { success: false, error: "Not authenticated" };

    // @ts-ignore
    const { data: matches, error: matchesError } = await (supabase as any)
      .from('matches')
      .select(`
        id,
        user_a_id,
        user_b_id,
        status,
        user_a:profiles!matches_user_a_id_fkey(id, first_name, last_name, date_of_birth, verification_status, profession:professions(name), city:cities(name), profile_media(bucket_path)),
        user_b:profiles!matches_user_b_id_fkey(id, first_name, last_name, date_of_birth, verification_status, profession:professions(name), city:cities(name), profile_media(bucket_path)),
        messages(id, sender_id, content, created_at, read_at)
      `)
      .or(`user_a_id.eq.${user.id},user_b_id.eq.${user.id}`)
      .eq('status', 'accepted')
      .order('created_at', { ascending: false });

    if (matchesError) {
      console.error(matchesError);
      return { success: false, error: "Failed to load conversations" };
    }

    const conversations = matches.map((match: any) => {
      const isUserA = match.user_a_id === user.id;
      const profile = isUserA ? match.user_b : match.user_a;

      let age = 25;
      if (profile?.date_of_birth) {
        age = new Date().getFullYear() - new Date(profile.date_of_birth).getFullYear();
      }

      // Sort messages
      const msgs = (match.messages || []).sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      
      const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1] : null;

      const formattedMessages = msgs.map((m: any) => ({
        id: m.id,
        sender: m.sender_id === user.id ? "me" : "them",
        text: m.content || "",
        time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: m.read_at ? "read" : "sent"
      }));

      const unreadCount = msgs.filter((m: any) => m.sender_id !== user.id && !m.read_at).length;

      return {
        id: match.id,
        profile_id: profile?.id,
        name: profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}`.trim() : "Unknown",
        image: profile?.profile_media?.[0]?.bucket_path || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
        lastMessage: lastMsg?.content || "Start a conversation",
        time: lastMsg ? new Date(lastMsg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "",
        unread: unreadCount,
        online: Math.random() > 0.5,
        compatibility: Math.floor(Math.random() * 15) + 80,
        age,
        profession: profile?.profession?.name || "Professional",
        city: profile?.city?.name || "Not specified",
        verified: profile?.verification_status === 'verified',
        messages: formattedMessages
      };
    });

    return { success: true, data: conversations as Conversation[] };
  } catch (err) {
    console.error("getConversations exception:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function sendMessage(matchId: string, content: string): Promise<{ success: boolean; message?: any; error?: string }> {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) return { success: false, error: "Not authenticated" };

    if (!content?.trim()) {
      return { success: false, error: "Message content cannot be empty" };
    }

    // @ts-ignore
    const { data: matchData, error: matchError } = await (supabase as any)
      .from("matches")
      .select("id, user_a_id, user_b_id, status")
      .eq("id", matchId)
      .single();

    if (matchError || !matchData) {
      return { success: false, error: "Match not found" };
    }

    if (matchData.user_a_id !== user.id && matchData.user_b_id !== user.id) {
      return { success: false, error: "Forbidden" };
    }

    if (matchData.status !== "accepted") {
      return { success: false, error: "Match is not active" };
    }

    // @ts-ignore
    const { data: message, error: insertError } = await (supabase as any)
      .from("messages")
      .insert({
        match_id: matchId,
        sender_id: user.id,
        content: content.trim(),
        message_type: "text",
        is_active: true,
      })
      .select()
      .single();

    if (insertError) {
      console.error(insertError);
      return { success: false, error: "Failed to send message" };
    }

    const receiverId = matchData.user_a_id === user.id ? matchData.user_b_id : matchData.user_a_id;

    // Trigger Notification for the receiver
    await triggerNotification({
      userId: receiverId,
      type: 'message',
      title: 'New Message',
      body: `You received a new message in The Lounge.`,
      actionUrl: `/dashboard/messages?match=${matchId}`,
      priority: 'high'
    });

    return { success: true, message: {
      id: message.id,
      sender: "me",
      text: message.content,
      time: new Date(message.created_at || new Date().toISOString()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent"
    } };

  } catch (err) {
    console.error("sendMessage exception:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function markMessagesAsRead(matchId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Not authenticated" };

    // @ts-ignore
    const { error } = await (supabase as any)
      .from('messages')
      .update({ read_at: new Date().toISOString() })
      .eq('match_id', matchId)
      .neq('sender_id', user.id)
      .is('read_at', null);

    if (error) {
       console.error("markMessagesAsRead db error:", error);
       return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error("markMessagesAsRead error:", error);
    return { success: false };
  }
}
