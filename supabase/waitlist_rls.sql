-- charta_waitlist table + RLS policies
-- Documented here for auditability

CREATE TABLE IF NOT EXISTS charta_waitlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  source text DEFAULT 'website' CHECK (source IN ('website', 'blog', 'developers', 'partner')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE charta_waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including anon) to join the waitlist.
-- Defense-in-depth: mirror the source CHECK constraint at policy level so
-- any future schema changes don't silently open new columns to anon writes.
CREATE POLICY allow_public_insert
  ON charta_waitlist
  FOR INSERT
  WITH CHECK (source IN ('website', 'blog', 'developers', 'partner'));

-- SELECT, UPDATE, DELETE require service_role (not accessible via anon key)
-- No SELECT/UPDATE/DELETE policies means these are denied for anon users.
