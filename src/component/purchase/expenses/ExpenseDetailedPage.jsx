import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import FileUploadCard from './createNew/FileUploadCard';

export default function ExpenseDetailedPage() {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here
  };

  return (
    <div className="min-h-screen  p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className=" rounded-lg  p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left Side - Expense Info */}
            <div className="flex-1">
              <div className="mb-2">
                <span className="text-sm text-gray-500">Expense Amount</span>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-semibold text-red-500">AED10,000.00</span>
                <span className="text-sm text-gray-400">on 01 Jan 2023</span>
              </div>
              <div className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                NON-BILLABLE
              </div>
            </div>

            {/* Right Side - Upload Area */}
            <div className="flex-1 max-w-md">
                <FileUploadCard />
            </div>
          </div>

          {/* Tags and Details */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                Office Rent
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500 mb-1">Paid Through</div>
              <div className="font-medium text-gray-700">Petty Cash</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Paid To</div>
              <div className="font-medium text-gray-700">SIT TOWER</div>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-blue-600 font-medium text-sm">OFFICE RENT</div>
          </div>
        </div>

        {/* Journal Section */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Journal</h2>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-gray-600">Amount is displayed in your base currency</span>
              <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                AED
              </span>
            </div>
          </div>

          <div className="px-6 py-4">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Expense</h3>
            
            {/* Journal Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm font-medium text-gray-500 border-b border-gray-200">
                    <th className="pb-3 pr-4">ACCOUNT</th>
                    <th className="pb-3 px-4 text-right">DEBIT</th>
                    <th className="pb-3 pl-4 text-right">CREDIT</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4 text-gray-700">Petty Cash</td>
                    <td className="py-3 px-4 text-right text-gray-700">0.00</td>
                    <td className="py-3 pl-4 text-right font-semibold text-gray-800">10,000.00</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4 text-gray-700">Office Rent</td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-800">10,000.00</td>
                    <td className="py-3 pl-4 text-right text-gray-700">0.00</td>
                  </tr>
                  <tr className="border-t-2 border-gray-300 font-semibold">
                    <td className="py-3 pr-4 text-gray-800"></td>
                    <td className="py-3 px-4 text-right text-gray-800">10,000.00</td>
                    <td className="py-3 pl-4 text-right text-gray-800">10,000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

