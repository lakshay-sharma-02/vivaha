-- Add phone number to profiles for sharing contact info
alter table profiles add column phone_number text;

-- Add subscription tracking
alter table profiles add column subscription_ends_at timestamptz;

-- Modify payments to be subscription-based instead of single-profile unlock
alter table payments drop column if exists target_profile_id cascade;

-- Drop unlocks table and admin notes as they are no longer needed
drop table if exists admin_notes cascade;
drop table if exists unlocks cascade;
