-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- ENUMS
-- ==========================================
CREATE TYPE gender_type AS ENUM ('male', 'female');
CREATE TYPE verification_status AS ENUM ('unverified', 'pending', 'verified', 'rejected');
CREATE TYPE match_status AS ENUM ('pending', 'accepted', 'rejected', 'unmatched');
CREATE TYPE membership_tier AS ENUM ('basic', 'premium', 'elite');
CREATE TYPE media_type AS ENUM ('image', 'video', 'voice');
CREATE TYPE message_type_enum AS ENUM ('text', 'image', 'video', 'voice', 'system');
CREATE TYPE notification_type AS ENUM ('match', 'message', 'verification', 'payment', 'membership', 'system');
CREATE TYPE report_status AS ENUM ('pending', 'reviewing', 'resolved', 'dismissed');
CREATE TYPE payment_gateway_enum AS ENUM ('stripe', 'razorpay', 'apple', 'google');

-- ==========================================
-- LOOKUP TABLES (Reference Data)
-- ==========================================
CREATE TABLE public.countries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE public.cities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_id UUID REFERENCES public.countries(id) ON DELETE CASCADE,
    name TEXT NOT NULL
);
CREATE INDEX idx_cities_country ON public.cities(country_id);

CREATE TABLE public.religions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE public.professions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL
);

-- ==========================================
-- PROFILES (Core Identity)
-- ==========================================
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    gender gender_type,
    date_of_birth DATE,
    height_cm INTEGER CHECK (height_cm BETWEEN 100 AND 250),
    religion_id UUID REFERENCES public.religions(id),
    profession_id UUID REFERENCES public.professions(id),
    city_id UUID REFERENCES public.cities(id),
    country_id UUID REFERENCES public.countries(id),
    bio TEXT,
    verification_status verification_status DEFAULT 'unverified',
    is_paused BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profiles_gender ON public.profiles(gender);
CREATE INDEX idx_profiles_city ON public.profiles(city_id);
CREATE INDEX idx_profiles_profession ON public.profiles(profession_id);
CREATE INDEX idx_profiles_religion ON public.profiles(religion_id);
CREATE INDEX idx_profiles_verification ON public.profiles(verification_status);
CREATE INDEX idx_profiles_active ON public.profiles(is_active) WHERE is_active = TRUE;

-- ==========================================
-- 1-to-1: PROFILE COMPLETION
-- ==========================================
CREATE TABLE public.profile_completion (
    profile_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    score INTEGER DEFAULT 0 CHECK (score BETWEEN 0 AND 100),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 1-to-1: FAMILY DETAILS
-- ==========================================
CREATE TABLE public.family_details (
    profile_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    father_occupation TEXT,
    mother_occupation TEXT,
    siblings_info TEXT,
    family_type TEXT, 
    family_values TEXT, 
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 1-to-1: PREFERENCES 
-- ==========================================
CREATE TABLE public.preferences (
    profile_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    min_age INTEGER CHECK (min_age >= 18),
    max_age INTEGER,
    min_height_cm INTEGER,
    preferred_religions UUID[],
    preferred_cities UUID[],
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_age_range CHECK (min_age <= max_age)
);

-- ==========================================
-- 1-to-1: COMPATIBILITY PROFILES (AI Readiness)
-- ==========================================
CREATE TABLE public.compatibility_profiles (
    profile_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    personality_type TEXT,
    values TEXT[],
    interests TEXT[],
    lifestyle TEXT[],
    relationship_goals TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- PROFILE MEDIA
-- ==========================================
CREATE TABLE public.profile_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    type media_type DEFAULT 'image',
    bucket_path TEXT NOT NULL,
    thumbnail_path TEXT,
    mime_type TEXT,
    size_bytes BIGINT,
    width INTEGER,
    height INTEGER,
    alt_text TEXT,
    display_order SMALLINT NOT NULL DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE UNIQUE INDEX idx_one_primary_media ON public.profile_media(profile_id) WHERE is_primary = TRUE;
CREATE INDEX idx_profile_media_order ON public.profile_media(profile_id, display_order);

-- ==========================================
-- VERIFICATION DOCUMENTS 
-- ==========================================
CREATE TABLE public.verification_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    document_type TEXT NOT NULL,
    bucket_path TEXT NOT NULL,
    status verification_status DEFAULT 'pending',
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ
);

-- ==========================================
-- UNIVERSAL ADMIN NOTES
-- ==========================================
CREATE TABLE public.admin_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    target_id UUID NOT NULL, 
    target_type TEXT NOT NULL, 
    note TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_admin_notes_target ON public.admin_notes(target_id, target_type);

-- ==========================================
-- MATCHES
-- ==========================================
CREATE TABLE public.matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_a_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    user_b_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    status match_status DEFAULT 'pending',
    action_by_id UUID REFERENCES public.profiles(id) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_user_order CHECK (user_a_id < user_b_id),
    CONSTRAINT check_not_self_match CHECK (user_a_id <> user_b_id),
    UNIQUE(user_a_id, user_b_id)
);
CREATE INDEX idx_matches_status ON public.matches(status);
CREATE INDEX idx_matches_user_a ON public.matches(user_a_id);
CREATE INDEX idx_matches_user_b ON public.matches(user_b_id);

-- ==========================================
-- MESSAGES (Realtime)
-- ==========================================
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE NOT NULL,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    message_type message_type_enum DEFAULT 'text',
    content TEXT,
    media_id UUID, 
    is_active BOOLEAN DEFAULT TRUE,
    deleted_at TIMESTAMPTZ,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_messages_match ON public.messages(match_id);
CREATE INDEX idx_messages_sender ON public.messages(sender_id);

-- ==========================================
-- NOTIFICATIONS
-- ==========================================
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    type notification_type NOT NULL, 
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_notifications_user ON public.notifications(user_id, is_read);

-- ==========================================
-- ANALYTICS & AI: VIEWS & SEARCH HISTORY
-- ==========================================
CREATE TABLE public.profile_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    viewer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    viewed_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    viewed_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_not_self_view CHECK (viewer_id <> viewed_id)
);
CREATE INDEX idx_profile_views_viewed ON public.profile_views(viewed_id);
CREATE INDEX idx_profile_views_viewer ON public.profile_views(viewer_id);

CREATE TABLE public.search_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    filters JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- TRUST & SAFETY: REPORTS, BLOCKS, SECURITY LOGS
-- ==========================================
CREATE TABLE public.blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    blocker_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    blocked_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_not_self_block CHECK (blocker_id <> blocked_id),
    UNIQUE(blocker_id, blocked_id)
);

CREATE TABLE public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    reported_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    reason TEXT NOT NULL,
    status report_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_not_self_report CHECK (reporter_id <> reported_id)
);
CREATE INDEX idx_reports_status ON public.reports(status);

CREATE TABLE public.user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    device TEXT,
    browser TEXT,
    ip TEXT,
    location TEXT,
    last_seen TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.otp_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    status TEXT NOT NULL, 
    ip TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- MEMBERSHIPS & PAYMENTS
-- ==========================================
CREATE TABLE public.memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    tier membership_tier DEFAULT 'basic',
    starts_at TIMESTAMPTZ DEFAULT NOW(),
    ends_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE,
    gateway_customer_id TEXT, 
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    amount_cents INTEGER NOT NULL CHECK (amount_cents > 0),
    currency TEXT DEFAULT 'INR',
    status TEXT NOT NULL, 
    gateway payment_gateway_enum NOT NULL,
    gateway_transaction_id TEXT NOT NULL,
    gateway_reference TEXT,
    receipt_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_payments_created ON public.payments(created_at);
