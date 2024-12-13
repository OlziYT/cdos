-- Créer un trigger pour mettre à jour la localisation automatiquement
CREATE OR REPLACE FUNCTION update_club_location()
RETURNS TRIGGER AS $$
BEGIN
  NEW.location := geocode_address(NEW.street, NEW.city, NEW.postal_code);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Ajouter le trigger à la table clubs
CREATE TRIGGER trigger_update_club_location
  BEFORE INSERT OR UPDATE OF street, city, postal_code
  ON public.clubs
  FOR EACH ROW
  EXECUTE FUNCTION update_club_location(); 