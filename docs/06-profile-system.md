# 06 - Profile System

## Data Flow: Profile Update

1. **Request:** User edits bio.
2. **Validation:** Zod validates length, profanity filter (Future Enhancement).
3. **Database:** `profiles.bio` updated.

## Media Management
Images and videos are stored in Supabase Storage.
- **Upload Flow:** Client -> Server Action (Generates Signed URL) -> Client uploads directly to Storage (saves server bandwidth) -> Server Action confirms and inserts row in `profile_media`.
- **Primary Image:** Enforced via a Partial Unique Index in PostgreSQL `CREATE UNIQUE INDEX ... WHERE is_primary = TRUE`.

## Access Control
- Profiles are universally readable if `is_active = TRUE`, except blocked profiles.
- A user can only edit rows in `profiles`, `preferences`, etc., where `id` (or `profile_id`) matches `auth.uid()`.

## Engineering Decisions
Why split into 1-to-1 tables (`family_details`, `compatibility_profiles`)?
A monolithic `profiles` table with 50+ columns causes row bloat. By splitting rarely accessed data (like family details) from highly accessed data (like name, age, primary photo), we optimize the database cache for the Discovery feed.
