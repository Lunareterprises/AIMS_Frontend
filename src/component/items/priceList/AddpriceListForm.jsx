

import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function AddpriceListForm() {
  const [formData, setFormData] = useState({
    name: '',
    transactionType: 'Sales',
    priceListType: 'All Items',
    description: '',
    percentage: '',
    roundOffTo: 'Never mind'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRadioChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl ">
      <h1 className="text-2xl font-bold text-gray-900 pb-4 border-b border-gray-200 mb-6">New Price List</h1>
      
      <div className="space-y-6">
        {/* Name Field */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <label className="text-gray-900 font-medium md:col-span-1">
            Name<span className="text-red-500">*</span>
          </label>
          <div className="md:col-span-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
        </div>
        
        {/* Transaction Type */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <label className="text-gray-900 font-medium md:col-span-1">
            Transaction Type
          </label>
          <div className="md:col-span-3 flex space-x-6">
            <label className="flex items-center space-x-2">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="transactionType"
                  value="Sales"
                  checked={formData.transactionType === 'Sales'}
                  onChange={() => handleRadioChange('transactionType', 'Sales')}
                  className="opacity-0 absolute h-5 w-5"
                />
                <div className={`border rounded-full w-5 h-5 flex flex-shrink-0 justify-center items-center ${formData.transactionType === 'Sales' ? 'border-blue-500' : 'border-gray-400'}`}>
                  {formData.transactionType === 'Sales' && (
                    <div className="rounded-full w-3 h-3 bg-blue-500"></div>
                  )}
                </div>
              </div>
              <span>Sales</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="transactionType"
                  value="Purchase"
                  checked={formData.transactionType === 'Purchase'}
                  onChange={() => handleRadioChange('transactionType', 'Purchase')}
                  className="opacity-0 absolute h-5 w-5"
                />
                <div className={`border rounded-full w-5 h-5 flex flex-shrink-0 justify-center items-center ${formData.transactionType === 'Purchase' ? 'border-blue-500' : 'border-gray-400'}`}>
                  {formData.transactionType === 'Purchase' && (
                    <div className="rounded-full w-3 h-3 bg-blue-500"></div>
                  )}
                </div>
              </div>
              <span>Purchase</span>
            </label>
          </div>
        </div>
        
        {/* Price List Type */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <label className="text-gray-900 font-medium md:col-span-1">
            Price List Type
          </label>
          <div className="md:col-span-3 flex flex-col sm:flex-row gap-4">
            <div className={`border rounded-md p-4 flex-1 ${formData.priceListType === 'All Items' ? 'border-blue-500' : 'border-gray-300'}`}>
              <label className="flex items-start space-x-3 cursor-pointer">
                <div className="relative flex items-center justify-center mt-0.5">
                  <input
                    type="radio"
                    name="priceListType"
                    value="All Items"
                    checked={formData.priceListType === 'All Items'}
                    onChange={() => handleRadioChange('priceListType', 'All Items')}
                    className="opacity-0 absolute h-5 w-5"
                  />
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${formData.priceListType === 'All Items' ? 'bg-blue-500' : 'border border-gray-400'}`}>
                    {formData.priceListType === 'All Items' && (
                      <Check size={14} className="text-white" />
                    )}
                  </div>
                </div>
                <div>
                  <div className="font-medium">All Items</div>
                  <div className="text-gray-500 text-sm">Mark up or mark down the rates of all items</div>
                </div>
              </label>
            </div>
            
            <div className={`border rounded-md p-4 flex-1 ${formData.priceListType === 'Individual Items' ? 'border-blue-500' : 'border-gray-300'}`}>
              <label className="flex items-start space-x-3 cursor-pointer">
                <div className="relative flex items-center justify-center mt-0.5">
                  <input
                    type="radio"
                    name="priceListType"
                    value="Individual Items"
                    checked={formData.priceListType === 'Individual Items'}
                    onChange={() => handleRadioChange('priceListType', 'Individual Items')}
                    className="opacity-0 absolute h-5 w-5"
                  />
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${formData.priceListType === 'Individual Items' ? 'bg-blue-500' : 'border border-gray-400'}`}>
                    {formData.priceListType === 'Individual Items' && (
                      <Check size={14} className="text-white" />
                    )}
                  </div>
                </div>
                <div>
                  <div className="font-medium">Individual Items</div>
                  <div className="text-gray-500 text-sm">Customize the rate of each item</div>
                </div>
              </label>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
          <label className="text-gray-900 font-medium md:col-span-1 pt-2">
            Description
          </label>
          <div className="md:col-span-3">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter the description"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 h-24"
            />
          </div>
        </div>
        
        {/* Percentage */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <label className="text-gray-900 font-medium md:col-span-1">
            Percentage<span className="text-red-500">*</span>
          </label>
          <div className="md:col-span-3 flex">
            <div className="relative">
              <button className="flex items-center justify-between w-28 bg-gray-50 border border-gray-300 rounded-l-md px-3 py-2 text-gray-700">
                <span>Markup</span>
                <ChevronDown size={16} />
              </button>
            </div>
            <input
              type="text"
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
              className="flex-grow border-y border-r border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <div className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-md px-3 py-2 text-gray-700">
              %
            </div>
          </div>
        </div>
        
        {/* Round Off To */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <label className="text-gray-900 font-medium md:col-span-1">
            Round Off To<span className="text-red-500">*</span>
          </label>
          <div className="md:col-span-3">
            <div className="relative">
              <select
                name="roundOffTo"
                value={formData.roundOffTo}
                onChange={handleChange}
                className="w-full appearance-none border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 pr-10"
                required
              >
                <option value="Never mind">Never mind</option>
                <option value="0.05">0.05</option>
                <option value="0.10">0.10</option>
                <option value="0.50">0.50</option>
                <option value="1.00">1.00</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={16} />
              </div>
            </div>
            <a href="#" className="text-blue-500 text-sm mt-2 block">View Examples</a>
          </div>
        </div>
      </div>
    </div>
  );
}