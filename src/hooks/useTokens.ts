import { useState, useEffect } from 'react';
import { getTokenBalance, TokenBalance } from '../lib/tokens';

export function useTokens() {
  const [balance, setBalance] = useState<TokenBalance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadBalance = async () => {
    try {
      setLoading(true);
      const data = await getTokenBalance();
      setBalance(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load token balance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBalance();
  }, []);

  return {
    balance,
    loading,
    error,
    refresh: loadBalance
  };
}