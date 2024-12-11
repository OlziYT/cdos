-- Fix infinite recursion in users policy
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
CREATE POLICY "Public users are viewable by everyone" ON public.users
  FOR SELECT USING (true);

-- Update committees table structure
ALTER TABLE public.committees DROP COLUMN IF EXISTS stats;
ALTER TABLE public.committees 
  ADD COLUMN IF NOT EXISTS total_members INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_clubs INTEGER DEFAULT 0;

-- Update the committees table indexes
CREATE INDEX IF NOT EXISTS idx_committees_total_members ON public.committees(total_members);
CREATE INDEX IF NOT EXISTS idx_committees_total_clubs ON public.committees(total_clubs);