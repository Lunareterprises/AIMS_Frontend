import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../CommonUI/buttons/CommonButton';
import ImportLayout from '../sales/customers/sort/importCustomer/ImportLayout';

export default function BankingHeader() {

    const Navigate = useNavigate();
  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Title */}
        <h1 className="text-2xl font-semibold text-gray-900">
          Banking Overview
        </h1>
        
        {/* Right side - Actions */}
        <div className="flex items-center space-x-4">          
          
          {/* Import Statement button */}
          <CommonButton  onClick={()=>Navigate("/import/customers?heading=Import Statements")} label="Import Statement" className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 font-medium text-sm transition-colors"/>
            
          
          {/* Add Bank or Credit Card button */}
          <CommonButton label="Add Bank or Credit Card" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium text-sm transition-colors"/>
            
        </div>
      </div>
    </div>
  );
}
