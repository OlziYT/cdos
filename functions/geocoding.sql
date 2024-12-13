CREATE OR REPLACE FUNCTION public.geocode_address()
RETURNS TRIGGER AS $$
DECLARE
  api_url TEXT;
  response JSONB;
  search_text TEXT;
BEGIN
  -- Log détaillé au début
  RAISE NOTICE '[GEOCODE] Début fonction - ID=%, Rue=%, Ville=%, CP=%', 
    NEW.id, NEW.street, NEW.city, NEW.postal_code;

  -- Vérifier que les champs requis sont présents
  IF NEW.street IS NULL OR NEW.city IS NULL OR NEW.postal_code IS NULL THEN
    RAISE WARNING '[GEOCODE] Champs manquants';
    RETURN NEW;
  END IF;

  -- Nettoyer et formater l'adresse
  search_text := trim(regexp_replace(NEW.street, '[,\s]+', ' ', 'g')) || 
                 ' ' || NEW.postal_code || 
                 ' ' || trim(NEW.city) || 
                 ', France';
  
  RAISE NOTICE '[GEOCODE] Recherche après nettoyage: %', search_text;
  
  -- Encoder pour l'URL
  search_text := replace(search_text, ' ', '+');
  
  -- Construire l'URL
  api_url := 'https://nominatim.openstreetmap.org/search?' ||
    'q=' || search_text ||
    '&format=json' ||
    '&limit=1' ||
    '&addressdetails=1' ||
    '&accept-language=fr' ||
    '&countrycodes=fr';

  RAISE NOTICE '[GEOCODE] URL finale: %', api_url;

  BEGIN
    -- Faire l'appel API avec un délai pour respecter les limites de l'API
    PERFORM pg_sleep(1);
    
    -- Version corrigée de l'appel HTTP
    SELECT content::jsonb INTO response
    FROM http_get(api_url);

    -- Vérifier si on a des résultats
    IF jsonb_array_length(response) = 0 THEN
      RAISE WARNING '[GEOCODE] Aucun résultat trouvé pour l''adresse: %', search_text;
      RETURN NEW;
    END IF;

    -- Log des détails de la réponse
    RAISE NOTICE '[GEOCODE] Premier résultat: %', response->0;

    -- Extraire et vérifier les coordonnées
    IF (response->0->>'lat') IS NULL OR (response->0->>'lon') IS NULL THEN
      RAISE WARNING '[GEOCODE] Coordonnées manquantes dans la réponse';
      RETURN NEW;
    END IF;

    -- Créer le point géographique avec gestion d'erreur
    BEGIN
      NEW.location := ST_SetSRID(
        ST_MakePoint(
          (response->0->>'lon')::FLOAT,
          (response->0->>'lat')::FLOAT
        ),
        4326
      )::GEOGRAPHY;

      IF NEW.location IS NULL THEN
        RAISE WARNING '[GEOCODE] Échec de création du point géographique';
      ELSE
        RAISE NOTICE '[GEOCODE] Point géographique créé avec succès: %', ST_AsText(NEW.location::geometry);
      END IF;

    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING '[GEOCODE] Erreur lors de la création du point: % - %', SQLERRM, SQLSTATE;
      RETURN NEW;
    END;

  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING '[GEOCODE] Erreur générale: % - %', SQLERRM, SQLSTATE;
    RETURN NEW;
  END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recréer le trigger
DROP TRIGGER IF EXISTS trigger_geocode_club_address ON clubs;
CREATE TRIGGER trigger_geocode_club_address
  BEFORE INSERT OR UPDATE OF street, city, postal_code
  ON clubs
  FOR EACH ROW
  EXECUTE FUNCTION public.geocode_address();
-- S'assurer que l'extension http est installée
CREATE EXTENSION IF NOT EXISTS http;

-- Modification de la table clubs pour ajouter les champs nécessaires
ALTER TABLE clubs
ADD COLUMN IF NOT EXISTS validated_address TEXT,
ADD COLUMN IF NOT EXISTS raw_coordinates JSONB;

-- Créer un index pour améliorer les performances des recherches géographiques
CREATE INDEX IF NOT EXISTS clubs_location_idx ON clubs USING GIST (location);

-- Fonction pour convertir le format WKB en coordonnées JSON
CREATE OR REPLACE FUNCTION public.st_coordinates_to_json(location geometry)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
    point geometry;
    lon double precision;
    lat double precision;
BEGIN
    IF location IS NULL THEN
        RETURN NULL;
    END IF;

    -- Convertir en SRID 4326 (WGS84) si ce n'est pas déjà le cas
    point := ST_Transform(location::geometry, 4326);
    
    -- Extraire les coordonnées
    lon := ST_X(point);
    lat := ST_Y(point);
    
    -- Retourner au format JSON
    RETURN jsonb_build_object(
        'coordinates', jsonb_build_array(lon, lat)
    );
END;
$$;

-- Créer une vue pour faciliter l'accès aux coordonnées
CREATE OR REPLACE VIEW clubs_with_coordinates AS
SELECT 
    c.*,
    st_coordinates_to_json(location::geometry) as location_json
FROM clubs c;

-- Donner les droits d'accès
GRANT SELECT ON clubs_with_coordinates TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.st_coordinates_to_json(geometry) TO authenticated, anon;
