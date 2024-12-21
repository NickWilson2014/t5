/*
  # Create campaigns table

  1. New Tables
    - `campaigns`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `subject` (text)
      - `content` (text)
      - `status` (text)
      - `target_list` (text)
      - `sent_emails` (integer)
      - `open_rate` (numeric)
      - `reply_rate` (numeric)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `campaigns` table
    - Add policy for authenticated users to manage their own campaigns
*/

CREATE TABLE campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  subject text NOT NULL,
  content text NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  target_list text NOT NULL,
  sent_emails integer DEFAULT 0,
  open_rate numeric DEFAULT 0,
  reply_rate numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('draft', 'active', 'paused', 'completed'))
);

ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own campaigns"
  ON campaigns
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);