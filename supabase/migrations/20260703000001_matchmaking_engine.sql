-- Migration for Matchmaking Engine and Interests Workflow

CREATE TYPE interest_status AS ENUM ('pending', 'accepted', 'rejected', 'withdrawn');

CREATE TABLE public.introductions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    status interest_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_not_self_intro CHECK (sender_id <> receiver_id),
    UNIQUE(sender_id, receiver_id)
);

CREATE INDEX idx_introductions_sender ON public.introductions(sender_id);
CREATE INDEX idx_introductions_receiver ON public.introductions(receiver_id);
CREATE INDEX idx_introductions_status ON public.introductions(status);

CREATE TABLE public.recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    recommended_profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    score_breakdown JSONB, 
    is_super_match BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_not_self_recommendation CHECK (user_id <> recommended_profile_id),
    UNIQUE(user_id, recommended_profile_id)
);
CREATE INDEX idx_recommendations_user ON public.recommendations(user_id, score DESC);

-- Enable RLS
ALTER TABLE public.introductions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

-- Policies for Introductions
CREATE POLICY "Users can view their own introductions"
    ON public.introductions
    FOR SELECT
    USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can insert introductions as sender"
    ON public.introductions
    FOR INSERT
    WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update introductions they received (to accept/reject)"
    ON public.introductions
    FOR UPDATE
    USING (auth.uid() = receiver_id OR auth.uid() = sender_id);

-- Policies for Recommendations
CREATE POLICY "Users can view their own recommendations"
    ON public.recommendations
    FOR SELECT
    USING (auth.uid() = user_id);

-- Only service role can insert/update recommendations
