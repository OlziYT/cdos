export interface Committee {
  id: string;
  name: string;
  siret: string;
  rna: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
  stats: {
    totalMembers: number;
    totalClubs: number;
    lastUpdated: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CommitteeFormData {
  name: string;
  siret: string;
  rna: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
}