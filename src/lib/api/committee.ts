import { supabase } from '../supabase';
import { TABLES } from '../supabase';
import type { CommitteeFormData } from '../../types/committee';
import { transformCommitteeData, transformCommitteeResponse } from '../transforms/committee';

export const committeeApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from(TABLES.COMMITTEES)
      .select('*');
    
    if (error) throw error;
    
    return { data: data.map(transformCommitteeData) };
  },

  create: async (formData: CommitteeFormData) => {
    const { data, error } = await supabase
      .from(TABLES.COMMITTEES)
      .insert([{
        name: formData.name,
        siret: formData.siret,
        rna: formData.rna,
        email: formData.email,
        phone: formData.phone,
        street: formData.street,
        city: formData.city,
        postal_code: formData.postalCode,
        total_members: 0,
        total_clubs: 0
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: transformCommitteeResponse(data) };
  },

  update: async (id: string, formData: CommitteeFormData) => {
    const { data, error } = await supabase
      .from(TABLES.COMMITTEES)
      .update({
        name: formData.name,
        siret: formData.siret,
        rna: formData.rna,
        email: formData.email,
        phone: formData.phone,
        street: formData.street,
        city: formData.city,
        postal_code: formData.postalCode
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: transformCommitteeResponse(data) };
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from(TABLES.COMMITTEES)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};