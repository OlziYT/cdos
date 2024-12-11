-- Drop all existing policies on users table
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Public users are viewable by everyone" ON public.users;
DROP POLICY IF EXISTS "Only super_admin can create users" ON public.users;
DROP POLICY IF EXISTS "Only super_admin can update users" ON public.users;

-- Create new, simplified policies
CREATE POLICY "Enable read access for authenticated users"
ON public.users FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated super_admins"
ON public.users FOR INSERT
WITH CHECK (
  auth.jwt() ->> 'role' = 'super_admin'
);

CREATE POLICY "Enable update for authenticated super_admins"
ON public.users FOR UPDATE
USING (
  auth.jwt() ->> 'role' = 'super_admin'
);

CREATE POLICY "Enable delete for authenticated super_admins"
ON public.users FOR DELETE
USING (
  auth.jwt() ->> 'role' = 'super_admin'
);