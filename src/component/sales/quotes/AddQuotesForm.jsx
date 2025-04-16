import { useState } from 'react';
import { ChevronDown, Search, Info, Settings } from 'lucide-react';

export default function AddQuotesForm() {
  const [quoteDate, setQuoteDate] = useState('15/04/2025');
  const [quoteNumber, setQuoteNumber] = useState('QT-000001');
  
  return (
    <div className="bg-white min-h-screen">
      <div className="border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-medium">New Quote</h1>
      </div>
      
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-start mb-4">
          <div className="w-1/4">
            <label className="block text-red-500 mb-1">
              Customer Name<span className="text-red-500">*</span>
            </label>
          </div>
          <div className="w-3/4">
            <div className="relative">
              <div className="flex">
                <div className="relative flex-grow">
                  <button className="w-full bg-white flex justify-between items-center border border-gray-300 rounded-l-md px-3 py-2 text-gray-500">
                    <span>Select or add a customer</span>
                    <ChevronDown size={20} />
                  </button>
                </div>
                <button className="bg-blue-500 p-2 rounded-r-md text-white">
                  <Search size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start mb-4">
          <div className="w-1/4">
            <label className="block text-red-500 mb-1">
              Quote#<span className="text-red-500">*</span>
            </label>
          </div>
          <div className="w-3/4">
            <div className="relative">
              <input
                type="text"
                value={quoteNumber}
                onChange={(e) => setQuoteNumber(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500">
                <Settings size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-start mb-4">
          <div className="w-1/4">
            <label className="block text-black mb-1">
              Reference#
            </label>
          </div>
          <div className="w-3/4">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div className="flex items-start mb-4">
          <div className="w-1/4">
            <label className="block text-red-500 mb-1">
              Quote Date<span className="text-red-500">*</span>
            </label>
          </div>
          <div className="w-1/4 pr-2">
            <input
              type="text"
              value={quoteDate}
              onChange={(e) => setQuoteDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="w-1/4 pl-4">
            <label className="block text-blue-800 mb-1">
              Expiry Date
            </label>
          </div>
          <div className="w-1/4 pl-2">
            <input
              type="text"
              placeholder="dd/MM/yyyy"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-400"
            />
          </div>
        </div>

        <div className="flex items-start mb-4">
          <div className="w-1/4">
            <label className="block text-black mb-1">
              Salesperson
            </label>
          </div>
          <div className="w-3/4">
            <button className="w-full bg-white flex justify-between items-center border border-gray-300 rounded-md px-3 py-2 text-gray-500">
              <span>Select or Add Salesperson</span>
              <ChevronDown size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-start mb-2">
          <div className="w-1/4">
            <label className="block text-black mb-1">
              Project Name
            </label>
          </div>
          <div className="w-3/4">
            <button className="w-full bg-white flex justify-between items-center border border-gray-300 rounded-md px-3 py-2 text-gray-500">
              <span>Select a project</span>
              <ChevronDown size={20} />
            </button>
            <p className="text-gray-500 text-sm mt-1">Select a customer to associate a project.</p>
          </div>
        </div>

        <div className="flex items-start mt-6">
          <div className="w-1/4">
            <label className="block text-black mb-1 flex items-center">
              Subject <Info size={16} className="ml-1 text-gray-400" />
            </label>
          </div>
          <div className="w-3/4">
            <textarea
              placeholder="Let your customer know what this Quote is for"
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-20"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}