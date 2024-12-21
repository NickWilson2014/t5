/*
  # Update campaigns table schema
  
  1. Changes
    - Make subject and content fields optional in campaigns table
    - These fields will be managed in campaign_sequences instead
  
  2. Security
    - No changes to RLS policies
*/

ALTER TABLE campaigns 
  ALTER COLUMN subject DROP NOT NULL,
  ALTER COLUMN content DROP NOT NULL;