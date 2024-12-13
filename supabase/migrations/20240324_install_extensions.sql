-- Créer le schéma http s'il n'existe pas
CREATE SCHEMA IF NOT EXISTS http;

-- Installer les extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS http WITH SCHEMA http;

-- Accorder les permissions nécessaires
GRANT USAGE ON SCHEMA http TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA http TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;