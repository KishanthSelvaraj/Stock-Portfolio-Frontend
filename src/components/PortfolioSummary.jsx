import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PortfolioSummary = ({ stats }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const [stocks, setStocks] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // State for loading spinner
  

  // Fetch stock price for a given ticker
  const API_KEY = 'CZH1KTUY8EBQS3FY';
  const BASE_URL = 'https://www.alphavantage.co/query';

  const fetchStockPrice = async (ticker) => {
    setIsLoading(true); // Show spinner
    const url = `${BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${API_KEY}`;
    try {
      const response = await axios.get(url);
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
    finally {
      setIsLoading(false); // Hide spinner
    }
  };

  useEffect(() => {
    const fetchStocks = async () => {
      setIsLoading(true); // Show spinner
      try {
        const response = await axios.get('https://stock-portfolio-backend-ub88.onrender.com/api/stocks');
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
      finally {
        setIsLoading(false); // Hide spinner
      }
    };

    fetchStocks();
  }, []);

  // Calculate total portfolio value
  const totalPortfolioValue = stocks.reduce((total, stock) => {
    return total + stock.currentPrice * stock.quantity;
  }, 0);

  // Calculate gain/loss for each stock
  const calculateGainLoss = (stock) => {
    const gainLoss = (stock.currentPrice - stock.buyPrice) * stock.quantity;
    const percentage = ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100;
    return {
      value: gainLoss,
      percentage: percentage,
    };
  };

  // Prepare data for the pie chart (portfolio distribution)
  const pieChartData = {
    labels: stocks.map(stock => stock.ticker),
    datasets: [
      {
        data: stocks.map(stock => (stock.currentPrice * stock.quantity) / totalPortfolioValue * 100),
        backgroundColor: stocks.map((_, index) => `hsl(${(index * 360) / stocks.length}, 100%, 70%)`), // Generate random colors
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="space-y-6 bg-gray-900 p-8 rounded-xl">
       {isLoading && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75"
        style={{ zIndex: 1000 }}
      >
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )}
      {/* Flex container for left and right sections */}
      <div className="flex flex-wrap lg:flex-nowrap space-y-6 md:space-y-0 md:space-x-8">
        {/* Right section - Pie Chart */}
        <div className="w-full lg:w-1/3 order-1 md:order-none mb-6">
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl border-2 border-indigo-500">
            <div className="text-2xl font-semibold text-white mb-4">Portfolio Distribution</div>
            <Pie data={pieChartData} />
          </div>
        </div>

        {/* Left section - Gain/Loss Data */}
        <div className="flex-1 space-y-6 order-2 md:order-none">
          {/* Total Portfolio Value - Full Width */}
          <div className="bg-gray-800 overflow-hidden shadow-xl border-2 border-purple-600 rounded-xl hover:scale-105 transition-transform duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-5">
                <div className="flex-shrink-0">
                  <div className="bg-blue-900 p-4 rounded-lg">
                    <Wallet className="h-8 w-8 text-blue-400" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-300">Total Portfolio Value</dt>
                    <dd className="text-2xl font-bold text-white">
                      {formatCurrency(totalPortfolioValue)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Gain/Loss Title */}
          <div className="text-3xl font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-600 to-blue-400">
            Gain/Loss for Each Stock
          </div>

          {/* Gain/Loss Data for Each Stock */}
          {stocks.map((stock) => {
            const { value, percentage } = calculateGainLoss(stock);
            return (
              <div key={stock.id} className="bg-gray-800 overflow-hidden shadow-xl border-2 border-indigo-500 rounded-xl hover:scale-105 transition-transform duration-300">
                <div className="p-6">
                  <div className="flex items-center space-x-5">
                    <div className="flex-shrink-0">
                      <div className={`bg-opacity-20 p-4 rounded-lg ${value >= 0 ? 'bg-green-800' : 'bg-red-800'}`}>
                        {value >= 0 ? (
                          <TrendingUp className="h-8 w-8 text-green-400" />
                        ) : (
                          <TrendingDown className="h-8 w-8 text-red-400" />
                        )}
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-300">{stock.ticker} - Gain/Loss</dt>
                        <dd className={`text-xl font-semibold ${value >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatCurrency(value)} ({percentage.toFixed(2)}%)
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
