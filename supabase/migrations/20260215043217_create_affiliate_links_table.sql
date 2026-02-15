/*
  # Create affiliate_links table

  1. New Tables
    - `affiliate_links`
      - `id` (uuid, primary key)
      - `name` (text) - Name of affiliate product/service
      - `brand` (text) - Brand name
      - `base_url` (text) - Base URL for affiliate link
      - `commission_rate` (numeric) - Commission percentage
      - `status` (text) - Link status (active/inactive)
      - `created_at` (timestamp) - Creation timestamp

  2. Security
    - Enable RLS on `affiliate_links` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS affiliate_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text NOT NULL,
  base_url text NOT NULL,
  commission_rate numeric NOT NULL,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE affiliate_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active affiliate links"
  ON affiliate_links FOR SELECT
  USING (status = 'active');
