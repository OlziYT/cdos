-- Mettre à jour les contraintes NOT NULL
ALTER TABLE committees
ALTER COLUMN street SET NOT NULL,
ALTER COLUMN city SET NOT NULL,
ALTER COLUMN postal_code SET NOT NULL;

-- Créer ou mettre à jour les index
CREATE INDEX IF NOT EXISTS idx_committees_city ON committees(city);
CREATE INDEX IF NOT EXISTS idx_committees_postal_code ON committees(postal_code);

-- Ajouter les colonnes pour les statistiques si elles n'existent pas déjà
ALTER TABLE committees
ADD COLUMN IF NOT EXISTS total_members INT4 DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_clubs INT4 DEFAULT 0;

-- Mettre à jour les timestamps si nécessaire
ALTER TABLE committees
ALTER COLUMN created_at SET DEFAULT timezone('utc'::text, now()),
ALTER COLUMN updated_at SET DEFAULT timezone('utc'::text, now());

-- Ajouter un trigger pour updated_at si ce n'est pas déjà fait
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_committees_updated_at ON committees;
CREATE TRIGGER update_committees_updated_at
    BEFORE UPDATE ON committees
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();