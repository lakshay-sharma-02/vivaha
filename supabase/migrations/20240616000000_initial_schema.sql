-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Enums
CREATE TYPE profile_status AS ENUM ('active', 'inactive', 'deleted');
CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');

-- Helper function for updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. Profiles Table (Core user data)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  gender gender_type NOT NULL,
  date_of_birth DATE NOT NULL,
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  status profile_status DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- 2. Profile Details Table (Extended metadata)
CREATE TABLE IF NOT EXISTS profile_details (
  profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  bio TEXT,
  religion TEXT,
  caste TEXT,
  mother_tongue TEXT,
  education TEXT,
  occupation TEXT,
  income_annual NUMERIC,
  height_cm INTEGER,
  marital_status TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER set_profile_details_updated_at
BEFORE UPDATE ON profile_details
FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- 3. Verification Docs Table
CREATE TABLE IF NOT EXISTS verification_docs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  doc_type TEXT NOT NULL,
  doc_url TEXT NOT NULL,
  status verification_status DEFAULT 'pending',
  rejection_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER set_verification_docs_updated_at
BEFORE UPDATE ON verification_docs
FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- 4. Payments Table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE SET NULL,
  amount NUMERIC(10, 2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status payment_status DEFAULT 'pending',
  provider TEXT NOT NULL,
  provider_tx_id TEXT UNIQUE,
  plan_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER set_payments_updated_at
BEFORE UPDATE ON payments
FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- 5. Profile Unlocks Table
CREATE TABLE IF NOT EXISTS profile_unlocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unlocker_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  unlocked_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  payment_id UUID REFERENCES payments(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(unlocker_id, unlocked_id)
);

-- Indexes for performance
CREATE INDEX idx_profiles_gender ON profiles(gender);
CREATE INDEX idx_profiles_status ON profiles(status);
CREATE INDEX idx_profile_details_religion ON profile_details(religion);
CREATE INDEX idx_profile_details_location ON profile_details(city, state, country);
CREATE INDEX idx_verification_docs_profile_id ON verification_docs(profile_id);
CREATE INDEX idx_payments_profile_id ON payments(profile_id);
CREATE INDEX idx_profile_unlocks_unlocker ON profile_unlocks(unlocker_id);
CREATE INDEX idx_profile_unlocks_unlocked ON profile_unlocks(unlocked_id);

-- Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_docs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_unlocks ENABLE ROW LEVEL SECURITY;

-- Simple Policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (status = 'active');

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own details" ON profile_details
  FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Users can update their own details" ON profile_details
  FOR UPDATE USING (auth.uid() = profile_id);

-- Profile creation trigger (Auto-create profile when user signs up)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, gender, date_of_birth)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    (COALESCE(NEW.raw_user_meta_data->>'gender', 'other'))::gender_type,
    COALESCE((NEW.raw_user_meta_data->>'date_of_birth')::DATE, '2000-01-01')
  );
  
  INSERT INTO public.profile_details (profile_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
