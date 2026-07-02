# 05 - User Onboarding

## Request Lifecycle: Onboarding

The onboarding flow is a multi-step process crucial for populating the highly normalized database schema.

```text
[ Client (Wizard UI) ]
   │
   ├─> Step 1: Basic Info (Name, Gender, DOB)
   │     └─> SA: updateBasicInfo() -> Updates `profiles` table
   │
   ├─> Step 2: Background (Religion, Profession, Location)
   │     └─> SA: updateBackground() -> Updates `profiles`
   │
   ├─> Step 3: Family Details
   │     └─> SA: updateFamily() -> Upserts `family_details`
   │
   ├─> Step 4: Preferences (Partner Criteria)
   │     └─> SA: updatePreferences() -> Upserts `preferences`
   │
   ├─> Step 5: Media Upload
   │     └─> SA: uploadMedia() -> Supabase Storage -> `profile_media`
   │
   └─> Step 6: Verification
         └─> SA: submitVerification() -> `verification_documents`
```

## State Machine
```text
Draft ──> Incomplete ──> Pending Verification ──> Verified & Active
```
*Design Decision:* Data is persisted at every step. This prevents data loss on drop-off and allows re-engagement campaigns for `Incomplete` profiles.

## Profile Completion Score
Calculated on the database level via a trigger (Future Enhancement) or within the `onboarding.ts` Server Action. The score gates access to the Discovery Engine (e.g., must be > 60% to view others).
