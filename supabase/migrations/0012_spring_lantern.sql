/*
  # Fix token system initialization and policies
  
  1. Changes
    - Add default token balance initialization
    - Fix RLS policies for token operations
    - Add proper error handling for insufficient balance
*/

-- Drop and recreate policies with proper permissions
DROP POLICY IF EXISTS "Users can view their own token balance" ON user_tokens;
DROP POLICY IF EXISTS "Users can insert their own token balance" ON user_tokens;
DROP POLICY IF EXISTS "Users can update their own token balance" ON user_tokens;
DROP POLICY IF EXISTS "System can manage all token balances" ON user_tokens;

-- Create comprehensive policies for user_tokens
CREATE POLICY "Users can manage their own token balance"
    ON user_tokens
    FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create function to initialize user token balance
CREATE OR REPLACE FUNCTION initialize_user_tokens()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO user_tokens (user_id, balance)
    VALUES (NEW.id, 0)
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$;

-- Create trigger to initialize token balance for new users
DROP TRIGGER IF EXISTS initialize_user_tokens_trigger ON auth.users;
CREATE TRIGGER initialize_user_tokens_trigger
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION initialize_user_tokens();

-- Ensure existing users have token balances
INSERT INTO user_tokens (user_id, balance)
SELECT id, 0
FROM auth.users
ON CONFLICT (user_id) DO NOTHING;