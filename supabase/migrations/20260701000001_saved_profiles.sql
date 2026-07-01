-- ==========================================
-- SAVED PROFILES
-- ==========================================
CREATE TABLE public.saved_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    saved_profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_not_self_save CHECK (user_id <> saved_profile_id),
    UNIQUE(user_id, saved_profile_id)
);

CREATE INDEX idx_saved_profiles_user ON public.saved_profiles(user_id);
CREATE INDEX idx_saved_profiles_saved ON public.saved_profiles(saved_profile_id);

-- RLS Policies for saved_profiles
ALTER TABLE public.saved_profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own saved profiles
CREATE POLICY "Users can view their own saved profiles"
    ON public.saved_profiles FOR SELECT
    USING (auth.uid() = user_id);

-- Users can save profiles
CREATE POLICY "Users can save profiles"
    ON public.saved_profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can unsave profiles
CREATE POLICY "Users can unsave profiles"
    ON public.saved_profiles FOR DELETE
    USING (auth.uid() = user_id);
