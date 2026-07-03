"use server";

import { createClient } from "@/shared/lib/supabase/server";

export async function getSettingsData() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Not authenticated" };
    }

    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    const { data: preferences } = await supabase.from("preferences").select("*").eq("profile_id", user.id).single();
    const { data: family } = await supabase.from("family_details").select("*").eq("profile_id", user.id).single();
    const { data: media } = await supabase.from("profile_media").select("*").eq("profile_id", user.id).order('display_order', { ascending: true });
    const { data: membership } = await supabase.from("memberships").select("*").eq("profile_id", user.id).single();
    
    // Transform media to include public URLs
    const transformedMedia = media?.map(m => ({
      ...m,
      publicUrl: supabase.storage.from('profile_media').getPublicUrl(m.bucket_path).data.publicUrl
    })) || [];
    const { data: notificationPrefs } = await (supabase as any).from("notification_preferences").select("*").eq("profile_id", user.id).single();

    return { 
      success: true, 
      data: {
        profile: profile || {},
        preferences: preferences || {},
        family: family || {},
        media: transformedMedia,
        membership: membership || {},
        notificationPrefs: notificationPrefs || {
          email_enabled: true,
          push_enabled: true,
          in_app_enabled: true,
          messages_enabled: true,
          interests_enabled: true,
          payments_enabled: true,
          announcements_enabled: true,
          weekly_digest_enabled: true
        }
      }
    };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Unexpected error fetching settings" };
  }
}

export async function updateProfileSettings(formData: any) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false };

    const { error } = await supabase.from("profiles").update(formData).eq("id", user.id);
    if (error) throw error;
    
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}

export async function updatePreferencesSettings(formData: any) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false };

    const { error } = await supabase.from("preferences").upsert({ ...formData, profile_id: user.id });
    if (error) throw error;
    
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}

export async function deleteProfileMedia(mediaId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false };

    const { error } = await supabase.from("profile_media").delete().eq("id", mediaId).eq("profile_id", user.id);
    if (error) throw error;

    return { success: true };
  } catch (err) {
    return { success: false };
  }
}

export async function deactivateAccount() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  await (supabase as any)
      .from('profiles')
    .update({ is_paused: true })
    .eq('id', user.id);

  return { success: true };
}

export async function updateNotificationPreferences(data: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  const { error } = await (supabase as any)
      .from('notification_preferences')
    .upsert({
      profile_id: user.id,
      ...data,
      updated_at: new Date().toISOString()
    });

  if (error) {
    console.error("Error updating notification preferences:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
