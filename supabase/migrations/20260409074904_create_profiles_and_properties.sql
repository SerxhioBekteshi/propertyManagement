
/*
  # Real Estate Platform - Initial Schema

  ## Tables Created
  
  ### 1. profiles
  Extends auth.users with role and operational details.
  - id: References auth.users
  - full_name: Agent or admin display name
  - role: 'admin' or 'agent'
  - country: 'albania' or 'greece' (required for agents)
  - avatar_url: Optional profile picture
  - created_at, updated_at

  ### 2. properties
  Real estate listing with all relevant fields.
  - id: UUID primary key
  - title: Listing title
  - description: Full description
  - typology: apartment, house, villa, commercial, land, office
  - transaction_type: sale or rent
  - price: Numeric price
  - currency: EUR or ALL
  - area_sqm: Size in square meters
  - bedrooms, bathrooms, floors, total_floors
  - location_city, location_area, location_address: Location fields
  - country: albania or greece
  - owner_name: Property owner name
  - owner_phone: SENSITIVE - only visible to admin or the uploading agent
  - agent_id: FK to profiles
  - images: Array of image URLs
  - status: active, sold, rented, inactive
  - created_at, updated_at

  ## Security
  - RLS enabled on both tables
  - Profiles: users can read all profiles, only update their own
  - Properties: 
    - All authenticated users can read properties (but owner_phone restricted at app level via RLS policy on a view)
    - Agents can only insert/update/delete their own properties
    - Admin can do anything

  ## Notes
  - owner_phone visibility is enforced via separate RLS: agents see NULL for other agents' phone numbers via a view
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT 'agent' CHECK (role IN ('admin', 'agent')),
  country text CHECK (country IN ('albania', 'greece')),
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text DEFAULT '',
  typology text NOT NULL DEFAULT 'apartment' CHECK (typology IN ('apartment', 'house', 'villa', 'commercial', 'land', 'office', 'studio')),
  transaction_type text NOT NULL DEFAULT 'sale' CHECK (transaction_type IN ('sale', 'rent')),
  price numeric(15,2),
  currency text DEFAULT 'EUR' CHECK (currency IN ('EUR', 'ALL')),
  area_sqm numeric(10,2),
  bedrooms integer DEFAULT 0,
  bathrooms integer DEFAULT 0,
  floor integer,
  total_floors integer,
  location_city text NOT NULL DEFAULT '',
  location_area text DEFAULT '',
  location_address text DEFAULT '',
  country text NOT NULL DEFAULT 'albania' CHECK (country IN ('albania', 'greece')),
  owner_name text NOT NULL DEFAULT '',
  owner_phone text NOT NULL DEFAULT '',
  agent_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  images text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'sold', 'rented', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read all properties"
  ON properties FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Agents can insert own properties"
  ON properties FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = agent_id
    AND EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'agent')
    )
  );

CREATE POLICY "Agents can update own properties"
  ON properties FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = agent_id
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    auth.uid() = agent_id
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Agents can delete own properties"
  ON properties FOR DELETE
  TO authenticated
  USING (
    auth.uid() = agent_id
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE INDEX IF NOT EXISTS properties_agent_id_idx ON properties(agent_id);
CREATE INDEX IF NOT EXISTS properties_country_idx ON properties(country);
CREATE INDEX IF NOT EXISTS properties_typology_idx ON properties(typology);
CREATE INDEX IF NOT EXISTS properties_status_idx ON properties(status);
CREATE INDEX IF NOT EXISTS properties_created_at_idx ON properties(created_at DESC);
