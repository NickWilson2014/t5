/*
  # Create contacts table

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `company` (text)
      - `location` (text)
      - `status` (text)
      - `last_contacted` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `contacts` table
    - Add policies for authenticated users to manage their contacts
*/

CREATE TABLE contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  location text,
  status text DEFAULT 'active',
  last_contacted timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, email)
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own contacts"
  ON contacts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);