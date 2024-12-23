import React from 'react';
import PortfolioSummary from '../components/PortfolioSummary';

const Dashboard = () => {
  // Mock data - replace with actual data from your backend
  const mockStats = {
    totalValue: 150000,
    topPerformer: {
      id: '1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      quantity: 100,
      buyPrice: 150,
      currentPrice: 180,
    },
    totalGainLoss: 15000,
    gainLossPercentage: 10,
  };

  return (
<div className="space-y-6 bg-black">
  <div className="flex items-center justify-between">
    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg">
      Portfolio Dashboard
    </h1>
    <div className="text-sm text-gray-400 shadow-sm">
      Last updated: {new Date().toLocaleString()}
    </div>
  </div>
  <PortfolioSummary stats={mockStats} />
</div>

  );
};

export default Dashboard;
