export interface Club {
  id: string;
  name: string;
  committee_id: string;
  siret: string;
  rna: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postal_code: string;
  location?: any;
  tags: string[];
  sport: string;
  handicap_access: boolean;
  sport_health: boolean;
  total_members?: number;
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
  sport: string;
  handicapAccess: boolean;
  sportHealth: boolean;
}
