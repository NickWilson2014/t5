/*
  # Email Replies Table

  1. New Tables
    - `email_replies`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `campaign_id` (uuid, references campaigns)
      - `from_email` (text)
      - `subject` (text)
      - `content` (text)
      - `received_at` (timestamptz)
      - `read` (boolean)
      - `archived` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `email_replies` table
    - Add policy for authenticated users to read their own replies
*/

CREATE TABLE email_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  campaign_id uuid REFERENCES campaigns,
  from_email text NOT NULL,
  subject text NOT NULL,
  content text NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now(),
  read boolean NOT NULL DEFAULT false,
  archived boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE email_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own replies"
  ON email_replies
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);