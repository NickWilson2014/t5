/*
  # Create campaign sequences table

  1. New Tables
    - `campaign_sequences`
      - `id` (uuid, primary key)
      - `campaign_id` (uuid, references campaigns)
      - `subject` (text)
      - `content` (text)
      - `delay_days` (integer)
      - `sequence_order` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `campaign_sequences` table
    - Add policy for authenticated users to manage their sequences
*/

CREATE TABLE campaign_sequences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns NOT NULL,
  subject text NOT NULL,
  content text NOT NULL,
  delay_days integer NOT NULL DEFAULT 1,
  sequence_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_delay_days CHECK (delay_days BETWEEN 1 AND 30)
);

ALTER TABLE campaign_sequences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their campaign sequences"
  ON campaign_sequences
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = campaign_sequences.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = campaign_sequences.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );