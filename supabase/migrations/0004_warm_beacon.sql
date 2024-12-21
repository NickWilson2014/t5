/*
  # Update campaign sequences columns
  
  1. Changes
    - Add temporary columns with new names
    - Copy data to new columns
    - Drop old columns
    - Rename new columns to final names
*/

-- Add new columns
ALTER TABLE campaign_sequences 
ADD COLUMN IF NOT EXISTS "delayDays_new" integer,
ADD COLUMN IF NOT EXISTS "sequenceOrder_new" integer;

-- Copy data from old columns to new ones
UPDATE campaign_sequences 
SET 
  "delayDays_new" = delay_days,
  "sequenceOrder_new" = sequence_order;

-- Drop old columns
ALTER TABLE campaign_sequences 
DROP COLUMN IF EXISTS delay_days,
DROP COLUMN IF EXISTS sequence_order;

-- Rename new columns to final names
ALTER TABLE campaign_sequences 
RENAME COLUMN "delayDays_new" TO "delayDays";
ALTER TABLE campaign_sequences 
RENAME COLUMN "sequenceOrder_new" TO "sequenceOrder";

-- Set NOT NULL constraints and defaults
ALTER TABLE campaign_sequences 
ALTER COLUMN "delayDays" SET NOT NULL,
ALTER COLUMN "delayDays" SET DEFAULT 1,
ALTER COLUMN "sequenceOrder" SET NOT NULL;