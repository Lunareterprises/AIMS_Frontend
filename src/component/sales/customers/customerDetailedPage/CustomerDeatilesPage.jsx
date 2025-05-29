
import React, { useState } from 'react';
import Tabs from './Tabs';
import { useNavigate } from 'react-router-dom';

const CustomerDeatilesPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900"> VACATION HOME</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700" onClick={()=>(navigate("/CustomersList"))}>X</button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <Tabs />
      </div>


    </div>
  );
};

export default CustomerDeatilesPage;