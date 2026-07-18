import type { Database } from "@/shared/lib/supabase/database.types"

export type { Database }

export type Tables = Database["public"]["Tables"]
export type Enums = Database["public"]["Enums"]

export type Profile = Tables["profiles"]["Row"]
export type ProfileInsert = Tables["profiles"]["Insert"]
export type ProfileUpdate = Tables["profiles"]["Update"]

export type Introduction = Tables["introductions"]["Row"]
export type Match = Tables["matches"]["Row"]
export type Message = Tables["messages"]["Row"]
export type Notification = Tables["notifications"]["Row"]
export type Membership = Tables["memberships"]["Row"]
export type Payment = Tables["payments"]["Row"]
export type Preference = Tables["preferences"]["Row"]
export type SavedProfile = Tables["saved_profiles"]["Row"]
export type ProfileMedia = Tables["profile_media"]["Row"]

export type GenderType = Enums["gender_type"]
export type VerificationStatus = Enums["verification_status"]
export type MatchStatus = Enums["match_status"]
export type MembershipTier = Enums["membership_tier"]
export type NotificationType = Enums["notification_type"]
