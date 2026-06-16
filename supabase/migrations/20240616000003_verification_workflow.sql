-- Update profile_status enum to match requirements
-- Note: Postgres enums are tricky to update. We'll drop and recreate if needed or just add.
-- Since we are in migrations, we can handle it.

ALTER TYPE profile_status ADD VALUE IF NOT EXISTS 'pending';
ALTER TYPE profile_status ADD VALUE IF NOT EXISTS 'approved';
ALTER TYPE profile_status ADD VALUE IF NOT EXISTS 'rejected';
ALTER TYPE profile_status ADD VALUE IF NOT EXISTS 'draft';

-- Add admin fields to profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- Update the handle_new_user function to start as 'draft'
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, gender, date_of_birth, status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    (COALESCE(NEW.raw_user_meta_data->>'gender', 'other'))::gender_type,
    COALESCE((NEW.raw_user_meta_data->>'date_of_birth')::DATE, '2000-01-01'),
    'draft'
  );
  
  INSERT INTO public.profile_details (profile_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update existing profiles that might be 'active' to 'draft' or 'approved' if we want
-- For now, let's keep it simple.

-- Add RLS for admin actions
CREATE POLICY "Admins can update any profile status" ON profiles
  FOR UPDATE TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());
