import React from 'react';

export default function JournalInvoicePayment({ paymentData = [] }) {
  return (
    <div className="max-w-full mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Journal</h1>
        
        {/* Currency info and buttons */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Amount is displayed in your base currency</span>
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-medium">AED</span>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
              Accrual
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
              Cash
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Payment Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Invoice Payment - {paymentData.invoiceNumber}
        </h2>
      </div>

      {/* Journal Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-3 gap-4 px-6 py-3">
            <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              ACCOUNT
            </div>
            <div className="text-sm font-medium text-gray-600 uppercase tracking-wide text-right">
              DEBIT
            </div>
            <div className="text-sm font-medium text-gray-600 uppercase tracking-wide text-right">
              CREDIT
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="bg-white">
          {/* Petty Cash Row */}
          <div className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-gray-100">
            <div className="text-gray-800 font-medium">
              Petty Cash
            </div>
            <div className="text-right text-gray-800">
              5,000.00
            </div>
            <div className="text-right text-gray-800">
              0.00
            </div>
          </div>

          {/* Accounts Receivable Row */}
          <div className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-gray-100">
            <div className="text-gray-800 font-medium">
              Accounts Receivable
            </div>
            <div className="text-right text-gray-800">
              0.00
            </div>
            <div className="text-right text-gray-800">
              5,000.00
            </div>
          </div>

          {/* Total Row */}
          <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="text-gray-800 font-semibold">
              {/* Empty cell for account column */}
            </div>
            <div className="text-right text-gray-800 font-semibold">
              5,000.00
            </div>
            <div className="text-right text-gray-800 font-semibold">
              5,000.00
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}