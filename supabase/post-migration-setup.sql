-- ==============================================================================
-- POST-MIGRATION VERIFICATION & STORAGE SETUP SCRIPT
-- Created: 2026-01-27
-- Description: Verifies schema integrity, sets up storage buckets/policies,
-- and provides admin promotion template.
-- Usage: Copy and paste sections into Supabase SQL Editor.
-- ==============================================================================

-- ==============================================================================
-- SECTION 1: POST-MIGRATION VERIFICATION
-- Run these queries to inspect your schema state
-- ==============================================================================

-- 1.1 Verify Enum Types
-- Expected: Should show 'publish_status' and 'user_role' (or 'content_status' if created)
SELECT n.nspname AS schema, t.typname AS type, e.enumlabel AS value
FROM pg_type t
JOIN pg_enum e ON t.oid = e.enumtypid
JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
WHERE t.typname IN ('publish_status', 'user_role', 'content_status');

-- 1.2 Verify Tables Exist
-- Expected: Should list sectors, services, insights_articles, podcast_show, podcast_episodes
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('sectors', 'services', 'insights_articles', 'podcast_show', 'podcast_episodes');

-- 1.3 Verify Columns & Defaults
-- Expected: Check for 'status' or 'is_published' columns based on migration
SELECT table_name, column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
AND column_name IN ('status', 'publish_status', 'is_published');

-- 1.4 Verify RLS is Enabled
-- Expected: rowsecurity should be true for all content tables
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('sectors', 'services', 'insights_articles', 'podcast_show', 'podcast_episodes', 'profiles');

-- 1.5 List Active Policies
-- Expected: Should see 'Public View Published' and 'Admin/Editor Manage' policies
SELECT schemaname, tablename, policyname, cmd, roles
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;


-- ==============================================================================
-- SECTION 2: CREATE STORAGE BUCKETS
-- Creates standard buckets for images and audio
-- ==============================================================================

-- 2.1 Create 'site-images' bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2.2 Create 'podcast-audio' bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('podcast-audio', 'podcast-audio', true)
ON CONFLICT (id) DO NOTHING;

-- 2.3 Create 'images' bucket (general purpose fallback, often used in examples)
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;


-- ==============================================================================
-- SECTION 3: STORAGE POLICIES
-- Define access control for files.
-- Public: Read-only
-- Admin/Editor: Read/Write/Delete
-- ==============================================================================

-- Helper for policies (Drop existing to ensure idempotency if re-running)
DROP POLICY IF EXISTS "Public Access site-images" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload site-images" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update site-images" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete site-images" ON storage.objects;

DROP POLICY IF EXISTS "Public Access podcast-audio" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload podcast-audio" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update podcast-audio" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete podcast-audio" ON storage.objects;

-- 3.1 Policies for 'site-images' & 'images'
-- ALLOW PUBLIC READ
CREATE POLICY "Public Access Images"
ON storage.objects FOR SELECT
USING ( bucket_id IN ('site-images', 'images') );

-- ALLOW ADMIN/EDITOR INSERT
CREATE POLICY "Admin Insert Images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id IN ('site-images', 'images') 
  AND (
    auth.role() = 'service_role' OR 
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'editor')
  )
);

-- ALLOW ADMIN/EDITOR UPDATE
CREATE POLICY "Admin Update Images"
ON storage.objects FOR UPDATE
USING (
  bucket_id IN ('site-images', 'images') 
  AND (
    auth.role() = 'service_role' OR 
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'editor')
  )
);

-- ALLOW ADMIN/EDITOR DELETE
CREATE POLICY "Admin Delete Images"
ON storage.objects FOR DELETE
USING (
  bucket_id IN ('site-images', 'images') 
  AND (
    auth.role() = 'service_role' OR 
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'editor')
  )
);

-- 3.2 Policies for 'podcast-audio'
-- ALLOW PUBLIC READ
CREATE POLICY "Public Access Audio"
ON storage.objects FOR SELECT
USING ( bucket_id = 'podcast-audio' );

-- ALLOW ADMIN/EDITOR INSERT
CREATE POLICY "Admin Insert Audio"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'podcast-audio' 
  AND (
    auth.role() = 'service_role' OR 
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'editor')
  )
);

-- ALLOW ADMIN/EDITOR UPDATE
CREATE POLICY "Admin Update Audio"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'podcast-audio' 
  AND (
    auth.role() = 'service_role' OR 
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'editor')
  )
);

-- ALLOW ADMIN/EDITOR DELETE
CREATE POLICY "Admin Delete Audio"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'podcast-audio' 
  AND (
    auth.role() = 'service_role' OR 
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'editor')
  )
);


-- ==============================================================================
-- SECTION 4: PROMOTE FIRST ADMIN
-- IMPORTANT: Replace 'YOUR_EMAIL_HERE' with the specific email you used to sign up.
-- ==============================================================================

-- Update the user role to 'admin'
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'YOUR_EMAIL_HERE';

-- Verification Query
SELECT id, email, role FROM public.profiles WHERE email = 'YOUR_EMAIL_HERE';


-- ==============================================================================
-- SECTION 5: RLS SANITY TEST DOCUMENTATION
-- ==============================================================================
/*
  EXPECTED BEHAVIOR:

  1. Public/Anonymous Access:
     - Can SELECT from 'sectors', 'services', 'insights_articles' WHERE is_published = true (or status='published')
     - Cannot INSERT, UPDATE, or DELETE on any content table.
     - Can INSERT into 'contact_submissions' or 'newsletter_signups'.

  2. Authenticated 'Viewer' Access:
     - Same permissions as Public (unless specific viewer features are added).
     - Cannot access Admin Dashboard routes (protected by frontend and backend checks).

  3. Admin/Editor Access:
     - Can SELECT all rows (including drafts).
     - Can INSERT, UPDATE, DELETE rows in 'sectors', 'services', 'insights_articles', 'podcast_show', 'podcast_episodes'.
     - Can Upload/Delete files in 'site-images' and 'podcast-audio' buckets.

  VERIFICATION STEPS:
  - Log in with the promoted admin account.
  - Navigate to /admin.
  - Attempt to upload an image -> Should Success.
  - Create a Draft Article -> Should Success.
  - Open Incognito window (Public user).
  - Check /insights -> Draft article should NOT appear.
  - Publish article in Admin.
  - Check /insights in Incognito -> Article SHOULD appear.
*/