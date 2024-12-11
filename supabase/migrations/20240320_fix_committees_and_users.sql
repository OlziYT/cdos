-- Supprimer l'ancienne politique récursive sur users
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;

-- Créer une nouvelle politique non récursive
CREATE POLICY "Public users are viewable by everyone" ON public.users
  FOR SELECT USING (true);

-- Mettre à jour la structure de committees pour correspondre au schéma actuel
ALTER TABLE public.committees
DROP COLUMN IF EXISTS stats;

-- Renommer les colonnes pour correspondre à la structure actuelle
ALTER TABLE public.committees
  RENAME COLUMN total_member TO total_members;

-- Ajouter les index manquants
CREATE INDEX IF NOT EXISTS idx_committees_name ON public.committees(name);
CREATE INDEX IF NOT EXISTS idx_committees_siret ON public.committees(siret);
CREATE INDEX IF NOT EXISTS idx_committees_rna ON public.committees(rna);