-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_completion ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compatibility_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- PROFILES POLICIES
-- ==========================================
DROP POLICY IF EXISTS "Profiles are viewable by authenticated users" ON public.profiles;
CREATE POLICY "Profiles are viewable by authenticated users" 
ON public.profiles FOR SELECT TO authenticated 
USING (is_active = TRUE OR auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE TO authenticated 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- ==========================================
-- PRIVATE DATA (PREFERENCES)
-- ==========================================
DROP POLICY IF EXISTS "Users can view own preferences" ON public.preferences;
CREATE POLICY "Users can view own preferences" 
ON public.preferences FOR SELECT TO authenticated 
USING (auth.uid() = profile_id);

DROP POLICY IF EXISTS "Users can update own preferences" ON public.preferences;
CREATE POLICY "Users can update own preferences" 
ON public.preferences FOR UPDATE TO authenticated 
USING (auth.uid() = profile_id);

-- ==========================================
-- MATCHES & MESSAGES
-- ==========================================
DROP POLICY IF EXISTS "Users can view their own matches" ON public.matches;
CREATE POLICY "Users can view their own matches" 
ON public.matches FOR SELECT TO authenticated 
USING (auth.uid() = user_a_id OR auth.uid() = user_b_id);

DROP POLICY IF EXISTS "Users can update match status" ON public.matches;
CREATE POLICY "Users can update match status"
ON public.matches FOR UPDATE TO authenticated
USING (auth.uid() = user_a_id OR auth.uid() = user_b_id);

DROP POLICY IF EXISTS "Users can view match messages" ON public.messages;
CREATE POLICY "Users can view match messages" 
ON public.messages FOR SELECT TO authenticated 
USING (
    match_id IN (
        SELECT id FROM public.matches 
        WHERE user_a_id = auth.uid() OR user_b_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Users can send messages to accepted matches" ON public.messages;
CREATE POLICY "Users can send messages to accepted matches" 
ON public.messages FOR INSERT TO authenticated 
WITH CHECK (
    sender_id = auth.uid() AND
    EXISTS (
        SELECT 1 FROM public.matches 
        WHERE id = match_id 
        AND status = 'accepted'
        AND (user_a_id = auth.uid() OR user_b_id = auth.uid())
    )
);
