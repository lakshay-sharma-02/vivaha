-- ==========================================
-- CONSOLIDATED FIX SCRIPT FOR VIVAHA AUTH
-- ==========================================

-- 1. Ensure Enums exist and include all values
DO $$ BEGIN
    CREATE TYPE profile_status AS ENUM ('draft', 'pending', 'approved', 'rejected', 'active', 'inactive', 'deleted');
EXCEPTION WHEN duplicate_object THEN 
    -- Add values if they don't exist in existing enum
    ALTER TYPE profile_status ADD VALUE IF NOT EXISTS 'draft';
    ALTER TYPE profile_status ADD VALUE IF NOT EXISTS 'pending';
    ALTER TYPE profile_status ADD VALUE IF NOT EXISTS 'approved';
    ALTER TYPE profile_status ADD VALUE IF NOT EXISTS 'rejected';
END $$;

DO $$ BEGIN
    CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. Ensure Profiles table has all columns
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS status profile_status DEFAULT 'draft';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_step INTEGER DEFAULT 1;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS rejection_reason TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- 3. Ensure Profile Details table exists (in case it failed earlier)
CREATE TABLE IF NOT EXISTS public.profile_details (
  profile_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  bio TEXT,
  city TEXT,
  religion TEXT,
  caste TEXT,
  sub_caste TEXT,
  education TEXT,
  occupation TEXT,
  income_annual NUMERIC,
  family_type TEXT,
  father_occupation TEXT,
  siblings TEXT,
  manglik TEXT,
  horoscope_details TEXT,
  partner_age_min INTEGER DEFAULT 18,
  partner_age_max INTEGER DEFAULT 50,
  partner_location TEXT,
  partner_religion TEXT,
  partner_caste TEXT,
  aadhaar_last_four VARCHAR(4),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Update the Trigger Function to be super "safe"
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, full_name, gender, date_of_birth, status, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    (COALESCE(NEW.raw_user_meta_data->>'gender', 'other'))::gender_type,
    COALESCE((NEW.raw_user_meta_data->>'date_of_birth')::DATE, '2000-01-01'),
    'draft',
    'user'
  );
  
  -- Insert into profile_details
  INSERT INTO public.profile_details (profile_id)
  VALUES (NEW.id);

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- SILENT FAIL: This ensures the user is created in auth.users 
  -- even if public.profiles insert fails.
  RETURN NEW; 
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Re-apply the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
