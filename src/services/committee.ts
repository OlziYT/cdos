import { supabase } from "../lib/supabase";
import type { Committee, CommitteeFormData } from "../types/committee";

export const fetchCommittees = async (): Promise<Committee[]> => {
  try {
    const { data, error } = await supabase
      .from("committees")
      .select("*");

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des comités:", error);
    return [];
  }
};

export const createCommittee = async (
  committeeData: CommitteeFormData
): Promise<Committee | null> => {
  try {
    const { data, error } = await supabase
      .from("committees")
      .insert([
        {
          name: committeeData.name,
          street: committeeData.street,
          city: committeeData.city,
          postal_code: committeeData.postalCode,
          email: committeeData.email,
          phone: committeeData.phone,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Erreur lors de la création du comité:", error);
    throw error;
  }
};

export const deleteCommittee = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from("committees")
      .delete()
      .eq("id", id);

    if (error) throw error;
  } catch (error) {
    console.error("Erreur lors de la suppression du comité:", error);
    throw error;
  }
};