-- 1. Add Role to Profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- 2. Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT role = 'admin'
    FROM profiles
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Reset existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view their own details" ON profile_details;
DROP POLICY IF EXISTS "Users can update their own details" ON profile_details;

-- 4. Profiles Policies
CREATE POLICY "Authenticated users can view profiles" ON profiles
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- 5. Profile Details Policies
CREATE POLICY "Owners and unlockers can view details" ON profile_details
  FOR SELECT TO authenticated
  USING (
    auth.uid() = profile_id OR 
    EXISTS (
      SELECT 1 FROM profile_unlocks 
      WHERE unlocker_id = auth.uid() AND unlocked_id = profile_id
    )
  );

CREATE POLICY "Users can update their own details" ON profile_details
  FOR UPDATE TO authenticated
  USING (auth.uid() = profile_id);

-- 6. Verification Docs Policies
CREATE POLICY "Admins can read verification docs" ON verification_docs
  FOR SELECT TO authenticated
  USING (is_admin());

CREATE POLICY "Owners can upload verification docs" ON verification_docs
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = profile_id);

-- Note: No SELECT policy for owner means they can't read after upload

-- 7. Payments Policies
CREATE POLICY "Owners and admins can view payments" ON payments
  FOR SELECT TO authenticated
  USING (auth.uid() = profile_id OR is_admin());

-- 8. Profile Unlocks Policies
CREATE POLICY "Owners and admins can view unlocks" ON profile_unlocks
  FOR SELECT TO authenticated
  USING (auth.uid() = unlocker_id OR is_admin());
