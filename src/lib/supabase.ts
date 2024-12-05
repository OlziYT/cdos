import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getTables = {
  clubs: 'clubs',
  committees: 'committees',
  users: 'users',
} as const;