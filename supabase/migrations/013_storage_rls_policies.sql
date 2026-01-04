-- =============================================
-- Storage RLS Policies for Profile Images
-- Migration: 013_storage_rls_policies.sql
-- =============================================

-- Enable RLS on storage.objects
ALTER TABLE IF EXISTS storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to upload their own profile images
CREATE POLICY "Users can upload their own profile images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-images' AND
  (storage.foldername(name))[1] = 'avatars'
);

-- Allow users to update their own profile images
CREATE POLICY "Users can update their own profile images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-images' AND (storage.foldername(name))[1] = 'avatars');

-- Allow users to delete their own profile images
CREATE POLICY "Users can delete their own profile images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'profile-images' AND (storage.foldername(name))[1] = 'avatars');

-- Allow public read access to profile images
CREATE POLICY "Public can view profile images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-images');

-- Create the storage bucket if it doesn't exist (must be done via Supabase Dashboard or API)
-- This SQL is for reference only, bucket creation is typically done via UI
/*
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-images', 'profile-images', true)
ON CONFLICT (id) DO NOTHING;
*/
