/*
  # Create users table

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - User authentication ID
      - `name` (text) - User's full name
      - `email` (text, unique) - User's email
      - `referral_code` (text, unique) - Unique referral code
      - `available_balance` (numeric) - User's available balance
      - `created_at` (timestamp) - Account creation timestamp

  2. Security
    - Enable RLS on `users` table
    - Add policy for users to read their own data
    - Add policy for users to update their own data
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  referral_code text UNIQUE,
  available_balance numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "New users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (true);
