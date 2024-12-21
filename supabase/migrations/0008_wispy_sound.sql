/*
  # Add tokens system
  
  1. New Tables
    - `user_tokens`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `balance` (integer, default 0)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `token_transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `amount` (integer)
      - `type` (text: 'purchase' or 'usage')
      - `feature` (text)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on both tables
    - Add policies for users to view their own data
*/

-- Create user_tokens table
CREATE TABLE user_tokens (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    balance integer NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(user_id)
);

-- Create token_transactions table
CREATE TABLE token_transactions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    amount integer NOT NULL,
    type text NOT NULL,
    feature text,
    created_at timestamptz DEFAULT now(),
    CONSTRAINT valid_type CHECK (type IN ('purchase', 'usage'))
);

-- Enable RLS
ALTER TABLE user_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own token balance"
    ON user_tokens
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own transactions"
    ON token_transactions
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Create function to update token balance
CREATE OR REPLACE FUNCTION update_token_balance()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.type = 'purchase' THEN
        INSERT INTO user_tokens (user_id, balance)
        VALUES (NEW.user_id, NEW.amount)
        ON CONFLICT (user_id)
        DO UPDATE SET 
            balance = user_tokens.balance + NEW.amount,
            updated_at = now();
    ELSIF NEW.type = 'usage' THEN
        UPDATE user_tokens
        SET 
            balance = balance - ABS(NEW.amount),
            updated_at = now()
        WHERE user_id = NEW.user_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for token balance updates
CREATE TRIGGER update_token_balance_trigger
    AFTER INSERT ON token_transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_token_balance();