import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const ActivityItem = ({ symbol, action, quantity, amount, timestamp }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
      <div className="flex items-center">
        <div className="bg-gray-50 p-2 rounded-lg mr-3">
          {action === 'buy' ? (
            <ArrowUpRight className="h-4 w-4 text-gray-800" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-gray-800" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{symbol}</p>
          <p className="text-xs text-gray-600">
            {action === 'buy' ? 'Bought' : 'Sold'} {quantity} shares
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">{formatCurrency(amount)}</p>
        <p className="text-xs text-gray-600">{timestamp}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
