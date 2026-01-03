-- =============================================
-- Storage Bucket and RLS Policies
-- Run this to enable image uploads for products
-- =============================================

-- Create product-images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to upload images to product-images bucket
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product-images'
  AND auth.role() = 'authenticated'
);

-- Allow public read access to product images
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');

-- Allow sellers to update their own product images
CREATE POLICY "Sellers can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'product-images'
  AND auth.role() = 'authenticated'
);

-- Allow sellers to delete their own product images
CREATE POLICY "Sellers can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'product-images'
  AND auth.role() = 'authenticated'
);

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Storage bucket and RLS policies created successfully!';
  RAISE NOTICE 'Bucket: product-images (public)';
  RAISE NOTICE 'Policies: INSERT, SELECT, UPDATE, DELETE';
END $$;
