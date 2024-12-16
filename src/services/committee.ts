import { supabase } from '../lib/supabase';

export interface Committee {
  id: string;
  name: string;
  siret: string;
  rna: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postal_code: string;
  total_members?: number;
  total_clubs?: number;
}

export const createCommittee = async (data: Omit<Committee, 'id'>) => {
  try {
    const { data: newCommittee, error } = await supabase
      .from('committees')
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error('Erreur lors de la création du comité:', error);
      throw error;
    }

    return newCommittee;
  } catch (error) {
    console.error('Erreur lors de la création du comité:', error);
    throw error;
  }
};

export const fetchCommittees = async () => {
  try {
    const { data, error } = await supabase
      .from('committees')
      .select('*')
      .order('name');

    if (error) throw error;
    return data ?? [];
  } catch (error) {
    console.error('Erreur lors de la récupération des comités:', error);
    return [];
  }
}; 