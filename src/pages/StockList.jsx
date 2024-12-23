import React from 'react';
import { useNavigate } from 'react-router-dom';
import StockTable from '../components/StockTable';

const StockList = () => {
  const navigate = useNavigate();

  // Mock data - replace with actual data from your backend
  const mockStocks = [
    {
      id: '1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      quantity: 100,
      buyPrice: 150,
      currentPrice: 180,
    },
    {
      id: '2',
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      quantity: 50,
      buyPrice: 2800,
      currentPrice: 2900,
    },
  ];

  const handleEdit = (stock) => {
    navigate(`/stocks/edit/${stock.id}`);
  };

  const handleDelete = (stockId) => {
    // Implement delete functionality
    console.log('Delete stock:', stockId);
  };

  return (
    <div className="space-y-6 ">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg">Stock Holding</h1>
      </div>
      <div className="bg-white shadow rounded-lg">
        <StockTable
          stocks={mockStocks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default StockList;

