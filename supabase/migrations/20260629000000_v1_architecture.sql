-- 1. Enable Extensions
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Lookup Tables
CREATE TABLE religions (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE castes (
    id SERIAL PRIMARY KEY,
    religion_id INT REFERENCES religions(id) ON DELETE CASCADE,
    name TEXT NOT NULL
);

CREATE TABLE educations (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE professions (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE income_ranges (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

-- 3. Admin Users
CREATE TYPE admin_role AS ENUM ('Super Admin', 'Verification Officer', 'Support', 'Moderator');

CREATE TABLE admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role admin_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION is_admin() RETURNS boolean AS $$
  SELECT EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid());
$$ LANGUAGE sql SECURITY DEFINER;

-- 4. Core Profiles
CREATE TYPE profile_status AS ENUM ('DRAFT', 'PENDING', 'VERIFIED', 'REJECTED');

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    dob DATE,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    height_cm INT,
    town TEXT,
    religion_id INT REFERENCES religions(id),
    caste_id INT REFERENCES castes(id),
    sub_caste TEXT,
    education_id INT REFERENCES educations(id),
    profession_id INT REFERENCES professions(id),
    income_range_id INT REFERENCES income_ranges(id),
    about_me TEXT,
    manglik_status TEXT CHECK (manglik_status IN ('manglik', 'non_manglik', 'anshik', 'unknown')),
    status profile_status DEFAULT 'DRAFT',
    is_active BOOLEAN DEFAULT TRUE,
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Media, Family, Preferences
CREATE TYPE media_type AS ENUM ('PHOTO', 'VIDEO', 'DOCUMENT');

CREATE TABLE profile_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type media_type NOT NULL,
    url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE family_details (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    family_type TEXT CHECK (family_type IN ('nuclear', 'joint')),
    father_occupation TEXT,
    mother_occupation TEXT,
    siblings_count INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE profile_preferences (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    preferred_age_min INT,
    preferred_age_max INT,
    preferred_town TEXT,
    preferred_religion_id INT REFERENCES religions(id),
    preferred_caste_id INT REFERENCES castes(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Verification
CREATE TABLE verification_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    document_url TEXT NOT NULL,
    document_last_4 VARCHAR(4),
    admin_notes TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    verified_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    verified_at TIMESTAMPTZ
);

-- 7. Profile Progress
CREATE TABLE profile_progress (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    basic_complete BOOLEAN DEFAULT FALSE,
    family_complete BOOLEAN DEFAULT FALSE,
    photos_complete BOOLEAN DEFAULT FALSE,
    verification_complete BOOLEAN DEFAULT FALSE,
    preferences_complete BOOLEAN DEFAULT FALSE,
    completion_score INT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Matches
CREATE TYPE match_status AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'BLOCKED');

CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    status match_status DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(sender_id, receiver_id)
);

-- 9. Plans & Unlocks
CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    price_inr INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE unlocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unlocked_by_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    unlocked_profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    payment_id TEXT,
    plan_id UUID REFERENCES plans(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(unlocked_by_user_id, unlocked_profile_id)
);

-- 10. Reports, Blocks, Audit Logs, Notifications
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reported_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    status TEXT DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blocker_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    blocked_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(blocker_id, blocked_id)
);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    ip_address TEXT,
    device TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. AI Profile Vectors
CREATE TABLE ai_profile_vectors (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    embedding vector(384),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Search Materialized View
CREATE MATERIALIZED VIEW search_profiles AS
SELECT 
    p.id as profile_id,
    p.gender,
    p.dob,
    p.height_cm,
    p.town,
    r.name as religion,
    c.name as caste,
    e.name as education,
    pr.name as profession,
    i.name as income_range,
    p.status,
    p.is_active,
    p.deleted_at
FROM profiles p
LEFT JOIN religions r ON p.religion_id = r.id
LEFT JOIN castes c ON p.caste_id = c.id
LEFT JOIN educations e ON p.education_id = e.id
LEFT JOIN professions pr ON p.profession_id = pr.id
LEFT JOIN income_ranges i ON p.income_range_id = i.id;

CREATE UNIQUE INDEX idx_search_profiles_id ON search_profiles(profile_id);

-- 13. Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE unlocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Basic Policies (More can be added subsequently)
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (status = 'VERIFIED' AND is_active = true AND deleted_at IS NULL);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public media viewable" ON profile_media FOR SELECT USING (is_active = true);
CREATE POLICY "Users manage own media" ON profile_media FOR ALL USING (profile_id = auth.uid());

CREATE POLICY "Users can see own family details" ON family_details FOR SELECT USING (profile_id = auth.uid() OR is_admin());
CREATE POLICY "Users can see unlocked family details" ON family_details FOR SELECT USING (
    EXISTS (SELECT 1 FROM unlocks WHERE unlocked_profile_id = family_details.profile_id AND unlocked_by_user_id = auth.uid())
);
CREATE POLICY "Users manage own family details" ON family_details FOR ALL USING (profile_id = auth.uid());

CREATE POLICY "Plans are universally readable" ON plans FOR SELECT USING (true);
