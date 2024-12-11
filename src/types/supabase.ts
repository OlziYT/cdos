export interface Database {
  public: {
    Tables: {
      committees: {
        Row: {
          id: string
          name: string
          siret: string
          rna: string
          email: string
          phone: string
          street: string
          city: string
          postal_code: string
          total_members: number
          total_clubs: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['committees']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['committees']['Insert']>
      }
      clubs: {
        Row: {
          id: string
          committee_id: string
          name: string
          siret: string
          rna: string
          email: string
          phone: string
          street: string
          city: string
          postal_code: string
          location: unknown
          tags: string[]
          total_members: number
          handicap_access: boolean
          sport_health: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['clubs']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['clubs']['Insert']>
      }
      users: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          role_id: string
          organization_id: string | null
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
    }
  }
}