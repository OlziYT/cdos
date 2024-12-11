import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Club = {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  postal_code: string;
  created_at: string;
  updated_at: string;
};

export type Committee = {
  id: string;
  name: string;
  description: string;
  type: string;
  created_at: string;
  updated_at: string;
};

export const TABLES = {
  CLUBS: 'clubs',
  COMMITTEES: 'committees',
  USERS: 'auth.users',
} as const;