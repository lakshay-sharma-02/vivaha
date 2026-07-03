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

    // In a real app, privacy and notification settings might be in a separate table.
    // For this demonstration, we'll store them in localStorage on the client, or use `is_paused` for profile visibility.

    return { 
      success: true, 
      data: {
        profile: profile || {},
        preferences: preferences || {},
        family: family || {},
        media: media || [],
        membership: membership || {}
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
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false };

    // Set is_paused to true
    const { error } = await supabase.from("profiles").update({ is_paused: true }).eq("id", user.id);
    if (error) throw error;

    return { success: true };
  } catch (err) {
    return { success: false };
  }
}
