import React from 'react';
import { StatCard } from './StatCard';
import { Wallet, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const PortfolioStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      <StatCard
        title="Total Portfolio Value"
        value={formatCurrency(stats.totalValue)}
        icon={<Wallet className="h-6 w-6 text-gray-600" />}
        footer={
          <div className="text-sm flex items-center">
            <span
              className={`flex items-center ${
                stats.gainLossPercentage >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {Math.abs(stats.gainLossPercentage).toFixed(2)}%
            </span>
            <span className="text-gray-600 ml-2">from last month</span>
          </div>
        }
      />

      <StatCard
        title="Total Gain/Loss"
        value={formatCurrency(stats.totalGainLoss)}
        icon={
          stats.gainLossPercentage >= 0 ? (
            <TrendingUp className="h-6 w-6 text-gray-600" />
          ) : (
            <TrendingDown className="h-6 w-6 text-gray-600" />
          )
        }
        footer={<div className="text-sm text-gray-600">All time performance</div>}
      />

      <StatCard
        title="Top Performer"
        value={
          stats.topPerformer ? (
            <>
              <span className="text-sm text-gray-600">
                {stats.topPerformer.symbol}
              </span>
              <span className="block text-gray-800">
                {formatCurrency(stats.topPerformer.currentPrice)}
              </span>
            </>
          ) : (
            'No stocks yet'
          )
        }
        icon={<BarChart3 className="h-6 w-6 text-gray-600" />}
        footer={<div className="text-sm text-gray-600">Best performing asset</div>}
      />
    </div>
  );
};

export default PortfolioStats;
