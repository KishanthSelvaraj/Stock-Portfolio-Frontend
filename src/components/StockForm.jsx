import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    symbol: initialData?.symbol || '',
    name: initialData?.name || '',
    quantity: initialData?.quantity || 0,
    buyPrice: initialData?.buyPrice || 0,
  });
  const [availableTickers, setAvailableTickers] = useState([]);
  const [stockPrice, setStockPrice] = useState(null);

  const API_KEY = 'VPXNB3HUB8NT8YR9';
  const BASE_URL = 'https://www.alphavantage.co/query';

  useEffect(() => {
    axios
      .get(`https://stock-portfolio-backend-ub88.onrender.com/api/stocks/available-tickers`)
      .then((response) => setAvailableTickers(response.data))
      .catch((error) => console.error('Error fetching available tickers:', error));
  }, []);

  const fetchStockPrice = (ticker) => {
    const url = `${BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${API_KEY}`;
    axios
      .get(url)
      .then((response) => {
        const timeSeries = response.data['Time Series (5min)'];
        const latestTimestamp = Object.keys(timeSeries)[0];
        const latestPrice = timeSeries[latestTimestamp]['4. close'];
        setStockPrice(latestPrice);
        setFormData((prevData) => ({
          ...prevData,
          buyPrice: parseFloat(latestPrice),
        }));
      })
      .catch((error) => console.error('Error fetching stock price:', error));
  };

  const handleSymbolChange = (e) => {
    const selectedSymbol = e.target.value;
    const selectedTicker = availableTickers.find((ticker) => ticker.ticker === selectedSymbol);
    setFormData({
      ...formData,
      symbol: selectedSymbol,
      name: selectedTicker ? selectedTicker.name : '',
    });
    if (selectedSymbol) fetchStockPrice(selectedSymbol);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stockData = {
      name: formData.name,
      ticker: formData.symbol,
      quantity: formData.quantity,
      buyPrice: formData.buyPrice,
    };
    axios
      .post(`https://stock-portfolio-backend-ub88.onrender.com/api/stocks`, stockData)
      .then((response) => onSubmit(response.data))
      .catch((error) => console.error('Error adding stock:', error));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-8 rounded-lg shadow-2xl w-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 neon-form"
    >
      <div className="grid grid-cols-1 gap-6">
      <div className="col-span-1">
  <label
    htmlFor="symbol"
    className="block text-base font-semibold text-white neon-label"
  >
    Stock Symbol
  </label>
  <select
    id="symbol"
    value={formData.symbol}
    onChange={handleSymbolChange}
    className="mt-2 block w-full rounded-lg bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 neon-form p-3 text-white border border-gray-300 neon-input"
    required
  >
    <option value="" className="bg-black text-white">
      Select Stock Symbol
    </option>
    {availableTickers.map((ticker) => (
      <option
        key={ticker.ticker}
        value={ticker.ticker}
        className="bg-black text-white"
      >
        {ticker.ticker} - {ticker.name}
      </option>
    ))}
  </select>
</div>


        <div className="col-span-1">
          <label htmlFor="name" className="block text-base font-semibold text-white neon-label">
            Company Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            readOnly
            className="mt-2 block w-full rounded-lg bg-transparent p-3 text-white border border-gray-300 neon-input"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <label htmlFor="quantity" className="block text-base font-semibold text-white neon-label">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: Number(e.target.value) })
            }
            className="mt-2 block w-full rounded-lg bg-transparent p-3 text-white border border-gray-300 neon-input"
            required
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="buyPrice" className="block text-base font-semibold text-white neon-label">
            Buy Price
          </label>
          <input
            type="number"
            id="buyPrice"
            min="0"
            step="0.01"
            value={formData.buyPrice}
            readOnly
            className="mt-2 block w-full rounded-lg bg-transparent p-3 text-white border border-gray-300 neon-input"
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 text-base font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 neon-button"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-lg hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400 neon-button"
        >
          {initialData ? "Update Stock" : "Add Stock"}
        </button>
      </div>
    </form>
  );
};

export default StockForm;
