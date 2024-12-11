import type { Committee } from '../../types/committee';

export const transformCommitteeData = (data: any): Committee => ({
  id: data.id,
  name: data.name,
  siret: data.siret,
  rna: data.rna,
  email: data.email,
  phone: data.phone,
  address: {
    street: data.street,
    city: data.city,
    postalCode: data.postal_code
  },
  stats: {
    totalMembers: data.total_members,
    totalClubs: data.total_clubs,
    lastUpdated: data.updated_at
  }
});

export const transformCommitteeResponse = transformCommitteeData;