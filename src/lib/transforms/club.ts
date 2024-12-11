import type { Club } from '../../types/club';

export const transformClubData = (data: any): Club => ({
  id: data.id,
  name: data.name,
  committeeId: data.committee_id,
  siret: data.siret,
  rna: data.rna,
  email: data.email,
  phone: data.phone,
  imageUrl: data.image_url,
  address: {
    street: data.street,
    city: data.city,
    postalCode: data.postal_code,
    location: data.location ? {
      lat: data.location.coordinates[1],
      lng: data.location.coordinates[0]
    } : {
      lat: 43.9277,
      lng: 2.1478
    }
  },
  tags: data.tags || [],
  stats: {
    totalMembers: data.total_members || 0,
    lastUpdated: data.updated_at
  },
  features: {
    handicapAccess: data.handicap_access || false,
    sportHealth: data.sport_health || false
  },
  createdAt: data.created_at,
  updatedAt: data.updated_at
});

export const transformClubResponse = transformClubData;