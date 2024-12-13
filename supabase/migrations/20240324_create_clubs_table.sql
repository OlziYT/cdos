-- Supprimer la table si elle existe
DROP TABLE IF EXISTS public.clubs;

-- Créer la fonction set_updated_at si elle n'existe pas
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Créer la table clubs
CREATE TABLE public.clubs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    committee_id UUID REFERENCES public.committees(id),
    siret TEXT NOT NULL,
    rna TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    location GEOGRAPHY(POINT),
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    handicap_access BOOLEAN DEFAULT false,
    sport_health BOOLEAN DEFAULT false,
    total_members INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Créer les index
CREATE INDEX IF NOT EXISTS idx_clubs_committee_id ON public.clubs(committee_id);
CREATE INDEX IF NOT EXISTS idx_clubs_location ON public.clubs USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_clubs_tags ON public.clubs USING GIN(tags);

-- Activer RLS
ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;

-- Créer les politiques
CREATE POLICY "clubs_select" ON public.clubs
    FOR SELECT USING (true);

CREATE POLICY "clubs_insert" ON public.clubs
    FOR INSERT WITH CHECK (true);

CREATE POLICY "clubs_update" ON public.clubs
    FOR UPDATE USING (true);

CREATE POLICY "clubs_delete" ON public.clubs
    FOR DELETE USING (true);

-- Créer le trigger pour updated_at
CREATE TRIGGER set_clubs_updated_at
    BEFORE UPDATE ON public.clubs
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

-- Accorder les permissions sur la fonction
GRANT EXECUTE ON FUNCTION public.set_updated_at() TO authenticated; 