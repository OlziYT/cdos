import { supabase } from '../supabase';
import { TABLES } from '../supabase';
import type { ClubFormData } from '../../types/club';
import { transformClubData, transformClubResponse } from '../transforms/club';
import { handleApiResponse } from './base';
import type { ApiResult } from './types';

export const clubApi = {
  getAll: async () => {
    return handleApiResponse(
      supabase
        .from(TABLES.CLUBS)
        .select('*')
        .then(({ data, error }) => ({
          data: data ? data.map(transformClubData) : [],
          error
        }))
    );
  },

  create: async (formData: ClubFormData) => {
    return handleApiResponse(
      supabase
        .from(TABLES.CLUBS)
        .insert([{
          name: formData.name,
          committee_id: formData.committeeId,
          siret: formData.siret,
          rna: formData.rna,
          email: formData.email,
          phone: formData.phone,
          street: formData.street,
          city: formData.city,
          postal_code: formData.postalCode,
          tags: formData.tags,
          handicap_access: formData.handicapAccess,
          sport_health: formData.sportHealth,
          total_members: 0
        }])
        .select()
        .single()
        .then(({ data, error }) => ({
          data: data ? transformClubResponse(data) : null,
          error
        }))
    );
  },

  update: async (id: string, formData: ClubFormData) => {
    return handleApiResponse(
      supabase
        .from(TABLES.CLUBS)
        .update({
          name: formData.name,
          committee_id: formData.committeeId,
          siret: formData.siret,
          rna: formData.rna,
          email: formData.email,
          phone: formData.phone,
          street: formData.street,
          city: formData.city,
          postal_code: formData.postalCode,
          tags: formData.tags,
          handicap_access: formData.handicapAccess,
          sport_health: formData.sportHealth
        })
        .eq('id', id)
        .select()
        .single()
        .then(({ data, error }) => ({
          data: data ? transformClubResponse(data) : null,
          error
        }))
    );
  },

  delete: async (id: string) => {
    return handleApiResponse(
      supabase
        .from(TABLES.CLUBS)
        .delete()
        .eq('id', id)
        .then(response => ({
          data: true,
          error: response.error
        }))
    );
  }
};