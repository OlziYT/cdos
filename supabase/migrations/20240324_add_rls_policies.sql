-- Supprimer toutes les politiques existantes
DROP POLICY IF EXISTS "Enable read access for all users" ON public.committees;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.committees;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.committees;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.committees;
DROP POLICY IF EXISTS "committees_select_policy" ON public.committees;
DROP POLICY IF EXISTS "committees_insert_policy" ON public.committees;
DROP POLICY IF EXISTS "committees_update_policy" ON public.committees;

-- Désactiver temporairement RLS pour le débogage
ALTER TABLE public.committees DISABLE ROW LEVEL SECURITY;

-- Réactiver RLS avec des politiques plus permissives
ALTER TABLE public.committees ENABLE ROW LEVEL SECURITY;

-- Politiques pour les committees
CREATE POLICY "committees_select" ON public.committees
    FOR SELECT USING (true);

CREATE POLICY "committees_insert" ON public.committees
    FOR INSERT WITH CHECK (true);

CREATE POLICY "committees_update" ON public.committees
    FOR UPDATE USING (true);

CREATE POLICY "committees_delete" ON public.committees
    FOR DELETE USING (true);

-- Accorder toutes les permissions nécessaires
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.committees TO authenticated;
GRANT ALL ON public.clubs TO authenticated;

-- Permettre l'utilisation des séquences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Politiques pour les clubs
CREATE POLICY "clubs_select_policy" ON public.clubs
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "clubs_insert_policy" ON public.clubs
    FOR INSERT TO authenticated WITH CHECK (
        auth.role() IN ('authenticated', 'admin', 'super_admin')
    );

CREATE POLICY "clubs_update_policy" ON public.clubs
    FOR UPDATE TO authenticated USING (
        auth.role() IN ('authenticated', 'admin', 'super_admin')
    );

-- Accorder les permissions nécessaires
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.committees TO authenticated;
GRANT ALL ON public.clubs TO authenticated;
GRANT USAGE ON SCHEMA http TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA http TO authenticated; 