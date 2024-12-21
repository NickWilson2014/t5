import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import { purchaseTokens } from '../../lib/tokens';

interface Props {
  onClose: () => void;
  onSuccess?: () => void;
}

const TOKEN_PACKAGES = [
  { amount: 100, price: 10 },
  { amount: 500, price: 45 },
  { amount: 1000, price: 80 },
];

const PurchaseTokensModal: React.FC<Props> = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePurchase = async (amount: number) => {
    try {
      setLoading(true);
      setError('');
      await purchaseTokens(amount);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to purchase tokens');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-auto p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold">Purchase Tokens</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {TOKEN_PACKAGES.map(pkg => (
                <div
                  key={pkg.amount}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
                  onClick={() => handlePurchase(pkg.amount)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">{pkg.amount} Tokens</h3>
                      <p className="text-sm text-gray-600">
                        ${pkg.price.toFixed(2)} USD
                      </p>
                    </div>
                    <button
                      disabled={loading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      Purchase
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseTokensModal;