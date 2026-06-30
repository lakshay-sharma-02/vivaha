-- Add missing columns to profiles table that were used by the UI but missing from the initial schema
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS instagram TEXT;

-- Add missing columns to family_details table
ALTER TABLE public.family_details 
ADD COLUMN IF NOT EXISTS gotra TEXT,
ADD COLUMN IF NOT EXISTS maternal_gotra TEXT,
ADD COLUMN IF NOT EXISTS grandmother_gotra TEXT;
