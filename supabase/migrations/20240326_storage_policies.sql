-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policies for club_image bucket
DROP POLICY IF EXISTS "Give users access to own folder" ON storage.objects;
CREATE POLICY "Give users access to own folder"
ON storage.objects
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Make bucket public
UPDATE storage.buckets
SET public = true
WHERE id = 'club_image';
