import { supabase } from './supabase';
import { TABLES } from './supabase';
import type { ClubFormData } from '../types/club';
import type { CommitteeFormData } from '../types/committee';

const api = {
  get: async (url: string) => {
    try {
      console.log('URL:', url);
      if (url === '/committees') {
        const { data, error } = await supabase
          .from(TABLES.COMMITTEES)
          .select('*');
        
        if (error) throw error;
        return { data };
      }

      if (url === '/clubs') {
        const { data, error } = await supabase
          .from(TABLES.CLUBS)
          .select('*');
        
        if (error) throw error;
        return { data };
      }

      if (url.startsWith('/committees/') && url.endsWith('/clubs')) {
        const committeeId = url.split('/')[2];
        const { data, error } = await supabase
          .from(TABLES.CLUBS)
          .select('*')
          .eq('committeeId', committeeId);
        
        if (error) throw error;
        return { data };
      }

      throw new Error(`Endpoint not found: ${url}`);
    } catch (error) {
      console.error('API Get Error:', error);
      throw error;
    }
  },

  post: async (url: string, data: ClubFormData | CommitteeFormData) => {
    try {
      console.log('Data to insert:', data);
      console.log('URL:', url);
      if (url === '/clubs') {
        const { data: newClub, error } = await supabase
          .from(TABLES.CLUBS)
          .insert([{
            ...data,
            street: data.street,
            city: data.city,
            postalCode: data.postalCode,
            features: {
              handicapAccess: 'handicapAccess' in data ? data.handicapAccess : false,
              sportHealth: 'sportHealth' in data ? data.sportHealth : false
            },
            stats: {
              totalMembers: 0,
              lastUpdated: new Date().toISOString()
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }])
          .select()
          .single();
        
        if (error) throw error;
        return { data: newClub };
      }

      if (url === '/committees') {
        const { data: newCommittee, error } = await supabase
          .from(TABLES.COMMITTEES)
          .insert([{
            ...data,
            street: data.street,
            city: data.city,
            postalCode: data.postalCode,
            stats: {
              totalMembers: 0,
              totalClubs: 0,
              lastUpdated: new Date().toISOString()
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }])
          .select()
          .single();
        
        if (error) throw error;
        return { data: newCommittee };
      }

      throw new Error(`Endpoint not found: ${url}`);
    } catch (error) {
      console.error('API Post Error:', error);
      throw error;
    }
  },

  put: async (url: string, data: ClubFormData | CommitteeFormData) => {
    try {
      console.log('Data to update:', data);
      console.log('URL:', url);
      const id = url.split('/')[2];

      if (url.startsWith('/clubs/')) {
        const { data: updatedClub, error } = await supabase
          .from(TABLES.CLUBS)
          .update({
            ...data,
            street: data.street,
            city: data.city,
            postalCode: data.postalCode,
            features: {
              handicapAccess: 'handicapAccess' in data ? data.handicapAccess : false,
              sportHealth: 'sportHealth' in data ? data.sportHealth : false
            },
            updatedAt: new Date().toISOString()
          })
          .eq('id', id)
          .select()
          .single();
        
        if (error) throw error;
        return { data: updatedClub };
      }

      if (url.startsWith('/committees/')) {
        const { data: updatedCommittee, error } = await supabase
          .from(TABLES.COMMITTEES)
          .update({
            ...data,
            street: data.street,
            city: data.city,
            postalCode: data.postalCode,
            updatedAt: new Date().toISOString()
          })
          .eq('id', id)
          .select()
          .single();
        
        if (error) throw error;
        return { data: updatedCommittee };
      }

      throw new Error(`Endpoint not found: ${url}`);
    } catch (error) {
      console.error('API Put Error:', error);
      throw error;
    }
  },

  delete: async (url: string) => {
    try {
      console.log('URL:', url);
      const id = url.split('/')[2];

      if (url.startsWith('/clubs/')) {
        const { error } = await supabase
          .from(TABLES.CLUBS)
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        return { data: { success: true } };
      }

      if (url.startsWith('/committees/')) {
        const { error } = await supabase
          .from(TABLES.COMMITTEES)
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        return { data: { success: true } };
      }

      throw new Error(`Endpoint not found: ${url}`);
    } catch (error) {
      console.error('API Delete Error:', error);
      throw error;
    }
  }
};

export default api;