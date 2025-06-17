import React, { useState } from 'react';

export default function DateRangeFilterModal({ isOpen, onClose, onApply }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const clearSelection = () => {
    setStartDate('');
    setEndDate('');
  };

  const handleApply = () => {
    onApply({ startDate, endDate });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/5 bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-md shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Date Range</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600 text-xl">&times;</button>
        </div>

        <div className="flex space-x-2 mb-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-1/2"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-1/2"
          />
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Note: If you've entered a Payment amount for any unpaid invoices, those invoices will continue to be shown at the top of the list, irrespective of the Date Range filter that you apply.
        </p>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={handleApply}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Apply Filter
            </button>
            <button
              onClick={onClose}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
          <button
            onClick={clearSelection}
            className="text-blue-600 hover:underline text-sm"
          >
            Clear Selection
          </button>
        </div>
      </div>
    </div>
  );
}
