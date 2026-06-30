-- Policies for profile_media
DROP POLICY IF EXISTS "Users can insert own profile media" ON public.profile_media;
CREATE POLICY "Users can insert own profile media"
ON public.profile_media FOR INSERT TO authenticated
WITH CHECK (profile_id = auth.uid());

DROP POLICY IF EXISTS "Users can view profile media" ON public.profile_media;
CREATE POLICY "Users can view profile media"
ON public.profile_media FOR SELECT TO authenticated
USING (true);

DROP POLICY IF EXISTS "Users can update own profile media" ON public.profile_media;
CREATE POLICY "Users can update own profile media"
ON public.profile_media FOR UPDATE TO authenticated
USING (profile_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own profile media" ON public.profile_media;
CREATE POLICY "Users can delete own profile media"
ON public.profile_media FOR DELETE TO authenticated
USING (profile_id = auth.uid());


-- Policies for verification_documents
DROP POLICY IF EXISTS "Users can insert own verification documents" ON public.verification_documents;
CREATE POLICY "Users can insert own verification documents"
ON public.verification_documents FOR INSERT TO authenticated
WITH CHECK (profile_id = auth.uid());

DROP POLICY IF EXISTS "Users can view own verification documents" ON public.verification_documents;
CREATE POLICY "Users can view own verification documents"
ON public.verification_documents FOR SELECT TO authenticated
USING (profile_id = auth.uid());
