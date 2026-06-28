-- vw_public_profiles
CREATE OR REPLACE VIEW public.vw_public_profiles AS
SELECT 
    p.id,
    p.first_name,
    EXTRACT(YEAR FROM AGE(NOW(), p.date_of_birth))::INTEGER AS age,
    p.height_cm,
    p.bio,
    p.verification_status,
    c.name AS city_name,
    prof.name AS profession_name,
    rel.name AS religion_name,
    pm.bucket_path AS primary_photo_url
FROM public.profiles p
LEFT JOIN public.cities c ON p.city_id = c.id
LEFT JOIN public.professions prof ON p.profession_id = prof.id
LEFT JOIN public.religions rel ON p.religion_id = rel.id
LEFT JOIN public.profile_media pm ON p.id = pm.profile_id AND pm.is_primary = TRUE
WHERE p.is_active = TRUE AND p.is_paused = FALSE;
