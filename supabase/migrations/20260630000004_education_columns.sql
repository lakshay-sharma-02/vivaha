-- Add education, university, company, and income_range columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS education TEXT,
ADD COLUMN IF NOT EXISTS university TEXT,
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS income_range TEXT;
