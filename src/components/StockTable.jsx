import React, { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import axios from 'axios';
import PortfolioSummary from './PortfolioSummary';

const StockTable = ({ onEdit, onDelete }) => {
  const [stocks, setStocks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStock, setCurrentStock] = useState(null);
  const [formData, setFormData] = useState({
    ticker: '',
    name: '',
    quantity: 0,
    buyPrice: 0,
  });

  const API_KEY = 'VPXNB3HUB8NT8YR9';
  const BASE_URL = 'https://www.alphavantage.co/query';

  // Fetch stock price for a given ticker
  const fetchStockPrice = async (ticker) => {
    const url = `${BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${API_KEY}`;
    try {
      const response = await axios.get(url);
      console.log(response);
      
      const timeSeries = response.data['Time Series (5min)'];
      if (timeSeries) {
        const latestTimestamp = Object.keys(timeSeries)[0];
        const latestPrice = parseFloat(timeSeries[latestTimestamp]['4. close']);
        return latestPrice;
      } else {
        return 1; // Default value if no price data is available
      }
    } catch (error) {
      console.error('Error fetching stock price:', error);
      return 1; // Default value in case of error
    }
  };

  // Fetch stock data
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/stocks');
        const formattedStocks = await Promise.all(
          response.data.map(async (stock) => {
            const currentPrice = await fetchStockPrice(stock.ticker);
            return {
              ...stock,
              currentPrice,
            };
          })
        );
        setStocks(formattedStocks);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };
  
    fetchStocks();
  }, []);
  

  // Fetch individual stock data for editing
  const handleEditClick = async (stock) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/stocks/${stock.id}`);
      setFormData({
        ticker: response.data.ticker,
        name: response.data.name,
        quantity: response.data.quantity,
        buyPrice: response.data.buyPrice,
      });
      setCurrentStock(stock);
      setIsEditing(true);
    } catch (error) {
      console.error('Error fetching stock details:', error);
    }
  };

  // Handle stock deletion
  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/stocks/${id}`);
      setStocks((prevStocks) => prevStocks.filter((stock) => stock.id !== id));
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  };

  // Handle form submit for updating stock
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Get the updated stock data
      const updatedStock = { ...formData, id: currentStock.id };
  
      // First, update the stock data in the database
      const response = await axios.put(`http://localhost:8080/api/stocks/${updatedStock.id}`, updatedStock);
  
      // Fetch the current price for the updated stock
      const currentPrice = await fetchStockPrice(updatedStock.ticker);
  
      // Update the stock list with the new price
      setStocks((prevStocks) =>
        prevStocks.map((stock) =>
          stock.id === updatedStock.id
            ? { ...response.data, currentPrice }  // Update stock with the new current price
            : stock
        )
      );
  
      // Reset editing state and form
      setIsEditing(false);
      setCurrentStock(null);
      setFormData({
        ticker: '',
        name: '',
        quantity: 0,
        buyPrice: 0,
      });
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };
  

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  // Calculate gain/loss for a stock
  const calculateGainLoss = (stock) => {
    const gainLoss = (stock.currentPrice - stock.buyPrice) * stock.quantity;
    const percentage = ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100;
    return {
      value: gainLoss,
      percentage: percentage,
    };
  };

  // Calculate total portfolio value
  const totalPortfolioValue = stocks.reduce((total, stock) => {
    return total + stock.currentPrice * stock.quantity;
  }, 0);

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-2xl">
    <div className="mb-6 text-2xl font-semibold text-white">
      Total Portfolio Value: {formatCurrency(totalPortfolioValue)}
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto bg-transparent rounded-lg shadow-lg">
        <thead className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide">Ticker</th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide">Company</th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide">Quantity</th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide">Buy Price</th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide">Current Price</th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide">Gain/Loss</th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {stocks.map((stock) => {
            const gainLoss = calculateGainLoss(stock);
            return (
              <tr key={stock.id} className="hover:bg-gray-800 ">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{stock.ticker}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{stock.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-300">{stock.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-300">{formatCurrency(stock.buyPrice)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-300">{formatCurrency(stock.currentPrice)}</td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                    gainLoss.value >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {formatCurrency(gainLoss.value)}
                  <span className="text-xs ml-1">({gainLoss.percentage.toFixed(2)}%)</span>
                </td>
                <td className="px-6 py-4 space-x-6 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditClick(stock)}
                    className="text-indigo-500 hover:text-indigo-400 transition-colors duration-300 ease-in-out transform hover:scale-105"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(stock.id)}
                    className="text-red-500 hover:text-red-400 transition-colors duration-300 ease-in-out transform hover:scale-105"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  
    {isEditing && (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <form
            onSubmit={handleFormSubmit}
            className="space-y-6 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 p-8 rounded-lg shadow-2xl"
          >
            <div className="grid grid-cols-1 gap-6">
              <div className="col-span-1">
                <label
                  htmlFor="ticker"
                  className="block text-base font-semibold text-white"
                >
                  Stock Ticker
                </label>
                <input
                  type="text"
                  id="ticker"
                  value={formData.ticker}
                  onChange={(e) => setFormData({ ...formData, ticker: e.target.value })}
                  className="mt-2 block w-full rounded-lg border-2 border-transparent bg-gray-800 p-3 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  required
                />
              </div>
  
              <div className="col-span-1">
                <label
                  htmlFor="name"
                  className="block text-base font-semibold text-white"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2 block w-full rounded-lg border-2 border-transparent bg-gray-800 p-3 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  required
                />
              </div>
            </div>
  
            <div className="grid grid-cols-1 gap-6">
              <div className="col-span-1">
                <label
                  htmlFor="quantity"
                  className="block text-base font-semibold text-white"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: Number(e.target.value) })
                  }
                  className="mt-2 block w-full rounded-lg border-2 border-transparent bg-gray-800 p-3 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  required
                />
              </div>
  
              <div className="col-span-1">
                <label
                  htmlFor="buyPrice"
                  className="block text-base font-semibold text-white"
                >
                  Buy Price
                </label>
                <input
                  type="number"
                  id="buyPrice"
                  step="0.01"
                  value={formData.buyPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, buyPrice: Number(e.target.value) })
                  }
                  className="mt-2 block w-full rounded-lg border-2 border-transparent bg-gray-800 p-3 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  required
                />
              </div>
            </div>
  
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentStock(null);
                  setFormData({
                    ticker: '',
                    name: '',
                    quantity: 0,
                    buyPrice: 0,
                  });
                }}
                className="px-6 py-3 text-base font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 rounded-lg hover:from-pink-600 hover:to-indigo-700 transition-colors duration-300"
              >
                {currentStock ? 'Update Stock' : 'Add Stock'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default StockTable;
