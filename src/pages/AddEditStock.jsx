import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StockForm from '../components/StockForm';

const AddEditStock = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    console.log('Form data:', data);
    navigate('/stocks');
  };

  const handleCancel = () => {
    navigate('/stocks');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-black min-h-screen">
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg mb-8">
        {id ? 'Edit Stock' : 'Add New Stock'}
      </h1>
      <StockForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default AddEditStock;
