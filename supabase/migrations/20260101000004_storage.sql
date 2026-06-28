-- Create buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('profile_media', 'profile_media', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) VALUES ('verification_documents', 'verification_documents', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) VALUES ('chat_media', 'chat_media', false)
ON CONFLICT (id) DO NOTHING;

-- Profile Media
DROP POLICY IF EXISTS "Public profile media access" ON storage.objects;
CREATE POLICY "Public profile media access" 
ON storage.objects FOR SELECT TO public 
USING (bucket_id = 'profile_media');

DROP POLICY IF EXISTS "Users can upload their own media" ON storage.objects;
CREATE POLICY "Users can upload their own media" 
ON storage.objects FOR INSERT TO authenticated 
WITH CHECK (bucket_id = 'profile_media' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Verification Documents
DROP POLICY IF EXISTS "Users can upload verification docs" ON storage.objects;
CREATE POLICY "Users can upload verification docs" 
ON storage.objects FOR INSERT TO authenticated 
WITH CHECK (bucket_id = 'verification_documents' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS "Users can read own verification docs" ON storage.objects;
CREATE POLICY "Users can read own verification docs" 
ON storage.objects FOR SELECT TO authenticated 
USING (bucket_id = 'verification_documents' AND (storage.foldername(name))[1] = auth.uid()::text);
