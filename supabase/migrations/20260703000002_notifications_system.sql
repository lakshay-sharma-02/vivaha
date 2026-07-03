-- Advanced Notifications System Migration

-- 1. Add missing columns to notifications table
ALTER TABLE public.notifications 
ADD COLUMN action_url TEXT,
ADD COLUMN metadata JSONB,
ADD COLUMN priority TEXT DEFAULT 'normal',
ADD COLUMN expires_at TIMESTAMPTZ,
ADD COLUMN deleted_at TIMESTAMPTZ;

-- 2. Notification Preferences
CREATE TABLE public.notification_preferences (
    profile_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    email_enabled BOOLEAN DEFAULT TRUE,
    push_enabled BOOLEAN DEFAULT TRUE,
    in_app_enabled BOOLEAN DEFAULT TRUE,
    messages_enabled BOOLEAN DEFAULT TRUE,
    interests_enabled BOOLEAN DEFAULT TRUE,
    payments_enabled BOOLEAN DEFAULT TRUE,
    announcements_enabled BOOLEAN DEFAULT TRUE,
    weekly_digest_enabled BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

-- 4. Policies
CREATE POLICY "Users can view their own notifications"
    ON public.notifications FOR SELECT
    USING (auth.uid() = user_id AND deleted_at IS NULL);

CREATE POLICY "Users can update their own notifications (mark read/deleted)"
    ON public.notifications FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own notification preferences"
    ON public.notification_preferences FOR ALL
    USING (auth.uid() = profile_id);

-- 5. Enable Realtime on Notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
