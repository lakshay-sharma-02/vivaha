-- Update profile_details with more fields
ALTER TABLE profile_details 
ADD COLUMN IF NOT EXISTS sub_caste TEXT,
ADD COLUMN IF NOT EXISTS family_type TEXT,
ADD COLUMN IF NOT EXISTS father_occupation TEXT,
ADD COLUMN IF NOT EXISTS siblings TEXT,
ADD COLUMN IF NOT EXISTS manglik TEXT,
ADD COLUMN IF NOT EXISTS horoscope_details TEXT,
ADD COLUMN IF NOT EXISTS partner_age_min INTEGER DEFAULT 18,
ADD COLUMN IF NOT EXISTS partner_age_max INTEGER DEFAULT 50,
ADD COLUMN IF NOT EXISTS partner_location TEXT,
ADD COLUMN IF NOT EXISTS partner_religion TEXT,
ADD COLUMN IF NOT EXISTS partner_caste TEXT,
ADD COLUMN IF NOT EXISTS aadhaar_last_four VARCHAR(4);

-- Add onboarding progress to profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS onboarding_step INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;

-- Storage buckets
-- Note: These usually need to be created via API or Dashboard, but we can document them here.
-- In a real migration, we'd use extensions or custom functions if needed.
-- For now, we assume buckets 'avatars' and 'verification' exist or will be created.

-- Add RLS for storage (simplified)
-- CREATE POLICY "Avatar images are public" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
-- CREATE POLICY "Users can upload their own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
