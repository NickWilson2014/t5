import { supabase } from './supabase';

export interface TokenBalance {
  balance: number;
  updated_at: string;
}

export interface TokenTransaction {
  id: string;
  amount: number;
  type: 'purchase' | 'usage';
  feature: string | null;
  created_at: string;
}

export async function getTokenBalance(): Promise<TokenBalance> {
  // First try to get existing balance
  const { data, error } = await supabase
    .from('user_tokens')
    .select('balance, updated_at')
    .maybeSingle();

  if (error) throw error;

  // If no balance exists, create one with 0 tokens
  if (!data) {
    const { data: newBalance, error: createError } = await supabase
      .from('user_tokens')
      .insert({ balance: 0 })
      .select('balance, updated_at')
      .single();

    if (createError) throw createError;
    return newBalance;
  }

  return data;
}

export async function getTokenTransactions(): Promise<TokenTransaction[]> {
  const { data, error } = await supabase
    .from('token_transactions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function purchaseTokens(amount: number): Promise<void> {
  const { error } = await supabase
    .from('token_transactions')
    .insert({
      amount,
      type: 'purchase'
    });

  if (error) throw error;
}

export async function useTokens(amount: number, feature: string): Promise<void> {
  const { error } = await supabase
    .from('token_transactions')
    .insert({
      amount: -Math.abs(amount),
      type: 'usage',
      feature
    });

  if (error) throw error;
}