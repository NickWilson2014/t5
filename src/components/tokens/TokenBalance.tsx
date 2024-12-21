import React from 'react';
import { Coins } from 'lucide-react';

interface Props {
  balance: number;
  onPurchase?: () => void;
}

const TokenBalance: React.FC<Props> = ({ balance, onPurchase }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Coins className="w-5 h-5 text-yellow-500" />
        <span className="font-medium">{balance} tokens</span>
      </div>
      {onPurchase && (
        <button
          onClick={onPurchase}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Buy More
        </button>
      )}
    </div>
  );
};

export default TokenBalance;