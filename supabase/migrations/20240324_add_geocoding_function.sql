-- Créer un type pour la réponse HTTP
DROP TYPE IF EXISTS http_response_type CASCADE;
CREATE TYPE http_response_type AS (
  status integer,
  content text
);

-- Créer une fonction pour géocoder une adresse
CREATE OR REPLACE FUNCTION public.geocode_address()
RETURNS TRIGGER AS $$
DECLARE
  api_url TEXT;
  response JSONB;
  search_text TEXT;
  request_id BIGINT;
  http_status INTEGER;
  http_content TEXT;
BEGIN
  -- Log détaillé au début
  RAISE NOTICE '[GEOCODE] Début fonction - ID=%, Rue=%, Ville=%, CP=%', 
    NEW.id, NEW.street, NEW.city, NEW.postal_code;

  -- Vérifier que les champs requis sont présents
  IF NEW.street IS NULL OR NEW.city IS NULL OR NEW.postal_code IS NULL THEN
    RAISE WARNING '[GEOCODE] Champs manquants - street=%, city=%, postal_code=%',
      COALESCE(NEW.street, 'NULL'),
      COALESCE(NEW.city, 'NULL'),
      COALESCE(NEW.postal_code, 'NULL');
    RETURN NEW;
  END IF;

  -- Construire une seule chaîne de recherche avec format français
  search_text := format('%s %s %s, France', 
    regexp_replace(trim(both ' ,' from NEW.street), '\s+', ' ', 'g'),
    NEW.postal_code,
    upper(trim(NEW.city))
  );
  
  RAISE NOTICE '[GEOCODE] Recherche: %', search_text;
  
  -- Encoder pour l'URL
  search_text := replace(search_text, ' ', '+');
  
  -- Construire l'URL complète
  api_url := format(
    'https://nominatim.openstreetmap.org/search?' ||
    'q=%s&' ||
    'format=json&' ||
    'limit=1&' ||
    'country=France&' ||
    'addressdetails=1&' ||
    'accept-language=fr',
    search_text
  );

  RAISE NOTICE '[GEOCODE] URL: %', api_url;

  BEGIN
    -- Vérifier si pg_net est disponible
    IF NOT EXISTS (
      SELECT 1 FROM pg_extension WHERE extname = 'pg_net'
    ) THEN
      RAISE WARNING '[GEOCODE] Extension pg_net non installée';
      RETURN NEW;
    END IF;

    -- Faire l'appel API
    RAISE NOTICE '[GEOCODE] Début appel HTTP';
    
    -- Envoyer la requête
    request_id := net.http_get(
      url => api_url,
      headers => '{"User-Agent": "CDOS81_App/1.0 (contact@cdos81.fr)", "Accept-Language": "fr"}'
    );

    -- Récupérer le statut
    http_status := net.http_get_status(request_id);
    RAISE NOTICE '[GEOCODE] Statut HTTP: %', http_status;

    -- Récupérer le contenu
    http_content := net.http_get_response_body(request_id);
    RAISE NOTICE '[GEOCODE] Réponse reçue: %', http_content;
    
    -- Vérifier le statut HTTP
    IF http_status != 200 THEN
      RAISE WARNING '[GEOCODE] Erreur HTTP % - %', 
        http_status, 
        http_content;
      RETURN NEW;
    END IF;

    -- Récupérer et nettoyer le corps de la réponse
    http_content := trim(both ' ' from http_content);
    RAISE NOTICE '[GEOCODE] Réponse nettoyée: %', http_content;

    -- Vérifier que la réponse n'est pas vide
    IF http_content IS NULL OR http_content = '' OR http_content = '[]' THEN
      RAISE WARNING '[GEOCODE] Réponse vide';
      RETURN NEW;
    END IF;

    -- Parser la réponse JSON avec plus de précautions
    BEGIN
      -- Vérifier que la réponse commence et finit par des crochets
      IF left(http_content, 1) != '[' OR right(http_content, 1) != ']' THEN
        RAISE WARNING '[GEOCODE] Format de réponse invalide';
        RETURN NEW;
      END IF;

      response := http_content::jsonb;
      RAISE NOTICE '[GEOCODE] JSON parsé avec succès';
    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING '[GEOCODE] Erreur parsing JSON - % - Réponse: %', SQLERRM, http_content;
      RETURN NEW;
    END;

    -- Vérifier la structure de la réponse
    IF response IS NULL OR jsonb_typeof(response) != 'array' THEN
      RAISE WARNING '[GEOCODE] Réponse invalide - Type=%', jsonb_typeof(response);
      RETURN NEW;
    END IF;

    -- Vérifier si on a des résultats
    IF jsonb_array_length(response) = 0 THEN
      RAISE WARNING '[GEOCODE] Aucun résultat trouvé pour %', search_text;
      RETURN NEW;
    END IF;

    -- Extraire et valider les coordonnées
    IF (response->0->>'lat') IS NULL OR (response->0->>'lon') IS NULL THEN
      RAISE WARNING '[GEOCODE] Coordonnées manquantes dans la réponse';
      RETURN NEW;
    END IF;

    -- Créer le point géographique
    BEGIN
      NEW.location := ST_SetSRID(
        ST_MakePoint(
          (response->0->>'lon')::FLOAT,
          (response->0->>'lat')::FLOAT
        ),
        4326
      )::GEOGRAPHY;
      
      RAISE NOTICE '[GEOCODE] Coordonnées définies - lat=%, lon=%',
        response->0->>'lat',
        response->0->>'lon';
    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING '[GEOCODE] Erreur création point - %', SQLERRM;
      RETURN NEW;
    END;

  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING '[GEOCODE] Erreur générale - % (%)', SQLERRM, SQLSTATE;
    RAISE NOTICE '[GEOCODE] Détails - URL=%, Recherche=%', api_url, search_text;
  END;

  RAISE NOTICE '[GEOCODE] Fin fonction pour ID=%', NEW.id;
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

-- Accorder les permissions nécessaires
GRANT EXECUTE ON FUNCTION public.geocode_address() TO authenticated;
GRANT USAGE ON SCHEMA net TO authenticated; 