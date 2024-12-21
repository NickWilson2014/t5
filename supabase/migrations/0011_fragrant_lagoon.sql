/*
  # Fix token RLS policies
  
  1. Changes
    - Add policy to allow trigger function to manage token balances
    - Ensure trigger function has proper permissions
*/

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS update_token_balance_trigger ON token_transactions;
DROP FUNCTION IF EXISTS update_token_balance();

-- Recreate function with proper permissions
CREATE OR REPLACE FUNCTION update_token_balance()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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
        WHERE user_id = NEW.user_id
        AND balance >= ABS(NEW.amount);

        IF NOT FOUND THEN
            RAISE EXCEPTION 'Insufficient token balance';
        END IF;
    END IF;
    RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER update_token_balance_trigger
    AFTER INSERT ON token_transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_token_balance();

-- Add policy for system-level operations
CREATE POLICY "System can manage all token balances"
    ON user_tokens
    FOR ALL
    TO postgres
    USING (true)
    WITH CHECK (true);

-- Revoke direct table access from public
REVOKE ALL ON user_tokens FROM public;

-- Grant specific permissions to authenticated users
GRANT SELECT, INSERT ON user_tokens TO authenticated;
GRANT SELECT, INSERT ON token_transactions TO authenticated;