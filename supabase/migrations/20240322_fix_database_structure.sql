-- Drop existing tables to start fresh
DROP TABLE IF EXISTS public.clubs CASCADE;
DROP TABLE IF EXISTS public.committees CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- Create committees table
CREATE TABLE public.committees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    siret TEXT NOT NULL,
    rna TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    total_members INTEGER DEFAULT 0,
    total_clubs INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create clubs table
CREATE TABLE public.clubs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    committee_id UUID REFERENCES public.committees(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    siret TEXT NOT NULL,
    rna TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    location GEOGRAPHY(POINT),
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    total_members INTEGER DEFAULT 0,
    handicap_access BOOLEAN DEFAULT false,
    sport_health BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create users table with simplified structure
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    first_name TEXT,
    last_name TEXT,
    role_id TEXT NOT NULL DEFAULT 'user',
    organization_id UUID,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT valid_role CHECK (role_id IN ('user', 'admin', 'super_admin'))
);

-- Create indexes
CREATE INDEX idx_committees_name ON public.committees(name);
CREATE INDEX idx_clubs_committee_id ON public.clubs(committee_id);
CREATE INDEX idx_clubs_location ON public.clubs USING GIST(location);
CREATE INDEX idx_clubs_tags ON public.clubs USING GIN(tags);
CREATE INDEX idx_users_role ON public.users(role_id);

-- Enable Row Level Security
ALTER TABLE public.committees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies for committees
CREATE POLICY "Enable read access for all users" ON public.committees
    FOR SELECT USING (true);

CREATE POLICY "Enable write access for authenticated users" ON public.committees
    FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for clubs
CREATE POLICY "Enable read access for all users" ON public.clubs
    FOR SELECT USING (true);

CREATE POLICY "Enable write access for authenticated users" ON public.clubs
    FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for users
CREATE POLICY "Enable read access for authenticated users" ON public.users
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable self update for users" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_committees_updated_at
    BEFORE UPDATE ON public.committees
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_clubs_updated_at
    BEFORE UPDATE ON public.clubs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();