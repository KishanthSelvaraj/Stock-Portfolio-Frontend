import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import StockList from './pages/StockList';
import AddEditStock from './pages/AddEditStock';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stocks" element={<StockList />} />
          <Route path="/stocks/new" element={<AddEditStock />} />
          <Route path="/stocks/edit/:id" element={<AddEditStock />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;