-- Add States table
CREATE TABLE IF NOT EXISTS public.states (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_id UUID REFERENCES public.countries(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    UNIQUE(country_id, name)
);

-- Add Castes table
CREATE TABLE IF NOT EXISTS public.castes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    religion_id UUID REFERENCES public.religions(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    UNIQUE(religion_id, name)
);

-- Update cities to include state
ALTER TABLE public.cities 
ADD COLUMN IF NOT EXISTS state_id UUID REFERENCES public.states(id);

-- Add marital status enum
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'marital_status_enum') THEN
        CREATE TYPE marital_status_enum AS ENUM ('unmarried', 'divorced', 'widowed', 'annulled');
    END IF;
END$$;

-- Add new columns to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS marital_status marital_status_enum DEFAULT 'unmarried',
ADD COLUMN IF NOT EXISTS caste_id UUID REFERENCES public.castes(id),
ADD COLUMN IF NOT EXISTS state_id UUID REFERENCES public.states(id);

-- Create a view for easy navbar stats querying
CREATE OR REPLACE VIEW public.navbar_stats AS
SELECT 
    (SELECT COUNT(*) FROM profiles WHERE marital_status = 'unmarried') as unmarried_count,
    (SELECT COUNT(*) FROM profiles WHERE marital_status = 'divorced') as divorced_count,
    (SELECT COUNT(*) FROM profiles) as total_profiles;
