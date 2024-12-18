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
  sports: string[];
  handicap_access: boolean;
  sport_health: boolean;
  total_members?: number;
  image_url?: string;
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
  sports: string;
  handicapAccess: boolean;
  sportHealth: boolean;
  image_url?: string;
  raw_coordinates?: string;
}
