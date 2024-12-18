-- Add image_url column to clubs table
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS image_url text;

-- Update policies to include the new column
DROP POLICY IF EXISTS "clubs_select_policy" ON public.clubs;
DROP POLICY IF EXISTS "clubs_insert_policy" ON public.clubs;
DROP POLICY IF EXISTS "clubs_update_policy" ON public.clubs;

-- Recreate policies with the new column
CREATE POLICY "clubs_select_policy" ON public.clubs
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "clubs_insert_policy" ON public.clubs
    FOR INSERT TO authenticated WITH CHECK (
        auth.role() IN ('authenticated', 'admin', 'super_admin')
    );

CREATE POLICY "clubs_update_policy" ON public.clubs
    FOR UPDATE TO authenticated USING (
        auth.role() IN ('authenticated', 'admin', 'super_admin')
    );
