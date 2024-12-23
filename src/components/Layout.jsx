import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, LineChart, Plus } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-black min-w-full">
   <nav className="bg-black border-b border-gray-800">
  <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      <div className="flex">
        <Link to="/" className="flex items-center px-2 py-2 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-600 hover:text-white transition-all duration-300 ease-in-out shadow-glow">
          <LineChart className="h-6 w-6 mr-2 text-pink-500" />
          Portfolio Tracker
        </Link>
        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
          <Link
            to="/dashboard"
            className={`${
              location.pathname === '/dashboard'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-gray-500 hover:text-white hover:border-pink-500 hover:shadow-glow'
            } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 ease-in-out`}
          >
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
          <Link
            to="/stocks"
            className={`${
              location.pathname === '/stocks'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-gray-500 hover:text-white hover:border-pink-500 hover:shadow-glow'
            } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 ease-in-out`}
          >
            <LineChart className="h-4 w-4 mr-2" />
            Stocks
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        <Link
          to="/stocks/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 hover:shadow-glow transition-all duration-300 ease-in-out"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Stock
        </Link>
      </div>
    </div>
  </div>
</nav>

      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-black">
        {children}
      </main>
    </div>
  );
};

export default Layout;
