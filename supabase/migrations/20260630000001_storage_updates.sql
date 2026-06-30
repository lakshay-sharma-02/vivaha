-- Create profile_photos bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('profile_photos', 'profile_photos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Ensure verification_documents bucket exists and is private
INSERT INTO storage.buckets (id, name, public) 
VALUES ('verification_documents', 'verification_documents', false)
ON CONFLICT (id) DO UPDATE SET public = false;

-- Profile Photos Policies
DROP POLICY IF EXISTS "Allow Uploads (INSERT) profile_photos" ON storage.objects;
CREATE POLICY "Allow Uploads (INSERT) profile_photos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'profile_photos');

DROP POLICY IF EXISTS "Allow Viewing (SELECT) profile_photos" ON storage.objects;
CREATE POLICY "Allow Viewing (SELECT) profile_photos"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'profile_photos');

DROP POLICY IF EXISTS "Allow Edits/Deletes (UPDATE/DELETE) profile_photos" ON storage.objects;
CREATE POLICY "Allow Edits/Deletes (UPDATE/DELETE) profile_photos"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'profile_photos' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Allow Edits/Deletes (DELETE) profile_photos" ON storage.objects;
CREATE POLICY "Allow Edits/Deletes (DELETE) profile_photos"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'profile_photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Verification Documents Policies
DROP POLICY IF EXISTS "Allow Uploads (INSERT) verification_documents" ON storage.objects;
CREATE POLICY "Allow Uploads (INSERT) verification_documents"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'verification_documents');

DROP POLICY IF EXISTS "Allow Viewing (SELECT) verification_documents" ON storage.objects;
CREATE POLICY "Allow Viewing (SELECT) verification_documents"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'verification_documents' AND auth.uid()::text = (storage.foldername(name))[1]);
