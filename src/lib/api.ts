import { supabase } from './supabase';
import { TABLES } from './supabase';
import type { ClubFormData } from '../types/club';
import type { CommitteeFormData } from '../types/committee';

const api = {
  get: async (url: string) => {
    try {
      console.log('GET Request URL:', url);
      if (url === '/committees') {
        const { data, error } = await supabase
          .from(TABLES.COMMITTEES)
          .select('*');
        
        if (error) throw error;
        
        // Transform data to match expected structure
        const transformedData = data.map(committee => ({
          id: committee.id,
          name: committee.name,
          siret: committee.siret,
          rna: committee.rna,
          email: committee.email,
          phone: committee.phone,
          address: {
            street: committee.street,
            city: committee.city,
            postalCode: committee.postal_code
          },
          stats: {
            totalMembers: committee.total_members,
            totalClubs: committee.total_clubs,
            lastUpdated: committee.updated_at
          }
        }));
        
        return { data: transformedData };
      }

      // ... rest of the code ...
    } catch (error) {
      console.error('API Get Error:', error);
      throw error;
    }
  },

  post: async (url: string, data: ClubFormData | CommitteeFormData) => {
    try {
      console.log('POST Request:', { url, data });
      if (url === '/committees') {
        const { data: newCommittee, error } = await supabase
          .from(TABLES.COMMITTEES)
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
        
        if (error) throw error;
        
        // Transform response to match expected structure
        const transformedCommittee = {
          id: newCommittee.id,
          name: newCommittee.name,
          siret: newCommittee.siret,
          rna: newCommittee.rna,
          email: newCommittee.email,
          phone: newCommittee.phone,
          address: {
            street: newCommittee.street,
            city: newCommittee.city,
            postalCode: newCommittee.postal_code
          },
          stats: {
            totalMembers: newCommittee.total_members,
            totalClubs: newCommittee.total_clubs,
            lastUpdated: newCommittee.updated_at
          }
        };
        
        return { data: transformedCommittee };
      }

      // ... rest of the code ...
    } catch (error) {
      console.error('API Post Error:', error);
      throw error;
    }
  },

  // ... rest of the code ...
};

export default api;