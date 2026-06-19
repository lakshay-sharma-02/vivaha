-- Add lifestyle, hobbies, and multiple photos to profiles

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS photos text[] DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS diet text,
ADD COLUMN IF NOT EXISTS smoking text,
ADD COLUMN IF NOT EXISTS drinking text,
ADD COLUMN IF NOT EXISTS hobbies text;
