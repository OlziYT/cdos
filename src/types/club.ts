export interface Club {
  id: string;
  name: string;
  committeeId: string;
  siret: string;
  rna: string;
  email: string;
  phone: string;
  imageUrl?: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  tags: string[];
  stats: {
    totalMembers: number;
    lastUpdated: string;
  };
  features: {
    handicapAccess: boolean;
    sportHealth: boolean;
  };
  pricing?: {
    range: string;
    details: string;
  };
  ageGroups?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ClubFormData {
  name: string;
  committeeId: string;
  siret: string;
  rna: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  tags: string[];
  handicapAccess: boolean;
  sportHealth: boolean;
}