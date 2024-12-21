/*
  # Lead Database Schema

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `job_title` (text)
      - `company` (text)
      - `industry` (text)
      - `company_size` (text)
      - `location` (text)
      - `country` (text)
      - `linkedin_url` (text)
      - `website` (text)
      - `source` (text)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `leads` table
    - Add policy for authenticated users to manage their leads
*/

CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  first_name text,
  last_name text,
  email text,
  job_title text,
  company text,
  industry text,
  company_size text,
  location text,
  country text,
  linkedin_url text,
  website text,
  source text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own leads"
  ON leads
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create an index for better search performance
CREATE INDEX leads_search_idx ON leads USING GIN (
  to_tsvector('english',
    coalesce(first_name, '') || ' ' ||
    coalesce(last_name, '') || ' ' ||
    coalesce(email, '') || ' ' ||
    coalesce(job_title, '') || ' ' ||
    coalesce(company, '') || ' ' ||
    coalesce(industry, '') || ' ' ||
    coalesce(location, '') || ' ' ||
    coalesce(country, '')
  )
);