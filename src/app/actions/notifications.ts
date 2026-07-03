"use server";

import { createClient } from "@/shared/lib/supabase/server";

export type NotificationPayload = {
  userId: string;
  type: 'match' | 'message' | 'verification' | 'payment' | 'membership' | 'system';
  title: string;
  body: string;
  actionUrl?: string;
  metadata?: any;
  priority?: 'low' | 'normal' | 'high';
};

/**
 * Creates a notification in the database.
 * Supabase Realtime will broadcast this to the connected client.
 */
export async function triggerNotification(payload: NotificationPayload) {
  try {
    const supabase = await createClient();

    // 1. Check user preferences
    // @ts-ignore
    const { data: prefs } = await (supabase as any)
      .from('notification_preferences')
      .select('*')
      .eq('profile_id', payload.userId)
      .single();

    // Default to true if preferences don't exist
    let shouldSendInApp = true;
    let shouldSendEmail = true; // Email logic would go here

    if (prefs) {
      if (!prefs.in_app_enabled) shouldSendInApp = false;
      
      switch (payload.type) {
        case 'match':
          if (!prefs.interests_enabled) shouldSendInApp = false;
          break;
        case 'message':
          if (!prefs.messages_enabled) shouldSendInApp = false;
          break;
        case 'payment':
        case 'membership':
          if (!prefs.payments_enabled) shouldSendInApp = false;
          break;
        case 'system':
          if (!prefs.announcements_enabled) shouldSendInApp = false;
          break;
      }
    }

    if (shouldSendInApp) {
      // @ts-ignore
      const { error } = await ((supabase as any).from)('notifications').insert({
        user_id: payload.userId,
        type: payload.type,
        title: payload.title,
        body: payload.body,
        action_url: payload.actionUrl,
        metadata: payload.metadata,
        priority: payload.priority || 'normal',
      });

      if (error) console.error("Error creating notification:", error);
    }

    // Email fallback block (mock logic, e.g. using Resend or SendGrid)
    if (shouldSendEmail && prefs?.email_enabled !== false) {
      // await sendEmail(userEmail, payload.title, payload.body);
    }

    return { success: true };
  } catch (error) {
    console.error("triggerNotification exception:", error);
    return { success: false, error: "Failed to trigger notification" };
  }
}

export async function fetchNotifications(page = 1, limit = 20) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Not authenticated" };

    const offset = (page - 1) * limit;

    // @ts-ignore
    const { data, error, count } = await (supabase as any)
      .from('notifications')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return { success: true, data, count };
  } catch (error) {
    console.error("fetchNotifications error:", error);
    return { success: false, error: "Failed to fetch notifications" };
  }
}

export async function markAsRead(notificationIds: string[]) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false };

    // @ts-ignore
    await (supabase as any)
      .from('notifications')
      .update({ is_read: true })
      .in('id', notificationIds)
      .eq('user_id', user.id);

    return { success: true };
  } catch (error) {
    console.error("markAsRead error:", error);
    return { success: false };
  }
}

export async function markAllAsRead() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false };

    // @ts-ignore
    await (supabase as any)
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .eq('is_read', false);

    return { success: true };
  } catch (error) {
    console.error("markAllAsRead error:", error);
    return { success: false };
  }
}

export async function archiveNotification(notificationId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false };

    const { error } = await (supabase as any)
      .from('notifications')
      .delete()
      .eq('id', notificationId)
      .eq('user_id', user.id);

    return { success: true };
  } catch (error) {
    console.error("archiveNotification error:", error);
    return { success: false };
  }
}
