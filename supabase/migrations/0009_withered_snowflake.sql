/*
  # Add token insert policies
  
  1. Changes
    - Add policy to allow users to insert their own token balance
    - Add policy to allow users to insert their own token transactions
*/

-- Allow users to insert their own token balance
CREATE POLICY "Users can insert their own token balance"
    ON user_tokens
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Allow users to insert their own transactions
CREATE POLICY "Users can insert their own transactions"
    ON token_transactions
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);