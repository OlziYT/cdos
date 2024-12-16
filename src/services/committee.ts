import { supabase } from '../lib/supabase';
import type { CommitteeFormData } from '../types/committee';

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

export const createCommittee = async (data: CommitteeFormData): Promise<Committee> => {
  try {
    const { data: newCommittee, error } = await supabase
      .from('committees')
      .insert([{
        name: data.name,
        siret: data.siret,
        rna: data.rna,
        email: data.email,
        phone: data.phone,
        street: data.street,
        city: data.city,
        postal_code: data.postalCode,
        total_members: 0,
        total_clubs: 0
      }])
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

export const updateCommittee = async (id: string, data: CommitteeFormData): Promise<Committee> => {
  try {
    const { data: updatedCommittee, error } = await supabase
      .from('committees')
      .update({
        name: data.name,
        siret: data.siret,
        rna: data.rna,
        email: data.email,
        phone: data.phone,
        street: data.street,
        city: data.city,
        postal_code: data.postalCode
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erreur lors de la mise à jour du comité:', error);
      throw error;
    }

    return updatedCommittee;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du comité:', error);
    throw error;
  }
};

export const fetchCommittees = async (): Promise<Committee[]> => {
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

export const deleteCommittee = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('committees')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression du comité:', error);
    throw error;
  }
};