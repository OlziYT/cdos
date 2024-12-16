import { supabase } from "../lib/supabase";
import type { Club, ClubFormData } from "../types/club";

export const fetchClubs = async (): Promise<Club[]> => {
  try {
    const { data, error } = await supabase.from("clubs_with_coordinates")
      .select(`
        *,
        committee:committees(name)
      `);

    if (error) throw error;

    // Transformer les données pour avoir le bon format
    const clubs =
      data?.map((club) => ({
        ...club,
        location: club.location_json || null,
      })) || [];

    return clubs;
  } catch (error) {
    console.error("Erreur lors de la récupération des clubs:", error);
    return [];
  }
};

export const createClub = async (
  clubData: ClubFormData
): Promise<Club | null> => {
  try {
    const { data, error } = await supabase
      .from("clubs")
      .insert([
        {
          name: clubData.name,
          committee_id: clubData.committeeId,
          siret: clubData.siret,
          rna: clubData.rna,
          email: clubData.email,
          phone: clubData.phone,
          street: clubData.street,
          city: clubData.city,
          postal_code: clubData.postalCode,
          tags: clubData.tags || [],
          handicap_access: clubData.handicapAccess,
          sport_health: clubData.sportHealth,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Erreur lors de la création du club:", error);
    throw error;
  }
};

export const updateClub = async (
  id: string,
  clubData: ClubFormData
): Promise<Club | null> => {
  try {
    const { data, error } = await supabase
      .from("clubs")
      .update({
        name: clubData.name,
        committee_id: clubData.committeeId,
        siret: clubData.siret,
        rna: clubData.rna,
        email: clubData.email,
        phone: clubData.phone,
        street: clubData.street,
        city: clubData.city,
        postal_code: clubData.postalCode,
        tags: clubData.tags || [],
        handicap_access: clubData.handicapAccess,
        sport_health: clubData.sportHealth,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du club:", error);
    throw error;
  }
};

export const deleteClub = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("clubs")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression du club:", error);
    throw error;
  }
};
