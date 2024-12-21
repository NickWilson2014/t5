/*
  # Add token update policy and security settings
  
  1. Changes
    - Add policy to allow users to update their own token balance
    - Set trigger function to run with elevated privileges
*/

-- Allow users to update their own token balance
CREATE POLICY "Users can update their own token balance"
    ON user_tokens
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Allow the trigger function to bypass RLS
ALTER TABLE user_tokens FORCE ROW LEVEL SECURITY;

-- Recreate the function with SECURITY DEFINER
CREATE OR REPLACE FUNCTION update_token_balance()
RETURNS TRIGGER
SECURITY DEFINER
AS $$
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