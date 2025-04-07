import React, { useState } from 'react';

const AddItemForm = () => {
  const [trackInventory, setTrackInventory] = useState(true);
  const [salesSelected, setSalesSelected] = useState(true);
  const [purchaseSelected, setPurchaseSelected] = useState(true);

  const [formData, setFormData] = useState({
    type: 'goods',
    name: '',
    sku: '',
    unit: '',
    isReturnable: false,
    isExciseProduct: false,
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    dimensionUnit: 'cm',
    weight: '',
    weightUnit: 'kg',
    manufacturer: '',
    brand: '',
    upc: '',
    mpn: '',
    ean: '',
    isbn: ''
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleDimensionChange = (field, value) => {
    setFormData({
      ...formData,
      dimensions: {
        ...formData.dimensions,
        [field]: value
      }
    });
  };

  const handleCheckboxChange = (field) => {
    setFormData({
      ...formData,
      [field]: !formData[field]
    });
  };



  
   
    
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center border-b p-4">
        <h1 className="text-xl font-medium text-gray-800">New Item</h1>
        <button className="text-gray-600 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Form */}
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
          {/* Left Column */}
          <div>
            {/* Type */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <label className="text-gray-700 mr-2">Type</label>
                <div className="relative group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex space-x-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="goods"
                    checked={formData.type === 'goods'}
                    onChange={() => handleChange('type', 'goods')}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Goods</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="service"
                    checked={formData.type === 'service'}
                    onChange={() => handleChange('type', 'service')}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Service</span>
                </label>
              </div>
            </div>

            {/* Name */}
            <div className="mb-6">
              <label className="block mb-2">
                <span className="text-red-500 font-medium">Name*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>

            {/* SKU */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <label className="text-gray-700 mr-2">SKU</label>
                <div className="relative group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.sku}
                onChange={(e) => handleChange('sku', e.target.value)}
              />
            </div>

            {/* Unit */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <label className="text-red-500 font-medium mr-2">Unit*</label>
                <div className="relative group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.unit}
                  onChange={(e) => handleChange('unit', e.target.value)}
                >
                  <option value="">Select or type to add</option>
                  <option value="pcs">pcs</option>
                  <option value="box">box</option>
                  <option value="kg">kg</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Checkbox Options */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="returnable"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  checked={formData.isReturnable}
                  onChange={() => handleCheckboxChange('isReturnable')}
                />
                <label htmlFor="returnable" className="ml-2 text-gray-700">Returnable Item</label>
                <div className="relative group ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="excise"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  checked={formData.isExciseProduct}
                  onChange={() => handleCheckboxChange('isExciseProduct')}
                />
                <label htmlFor="excise" className="ml-2 text-gray-700">It is an excise product</label>
                <div className="relative group ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Dimensions */}
            <div className="mb-6">
              <label className="block mb-2 text-gray-700">Dimensions</label>
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Length"
                      className="w-full border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.dimensions.length}
                      onChange={(e) => handleDimensionChange('length', e.target.value)}
                    />
                    <span className="flex items-center justify-center px-2 border-t border-b border-gray-300">×</span>
                    <input
                      type="text"
                      placeholder="Width"
                      className="w-full border-y border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.dimensions.width}
                      onChange={(e) => handleDimensionChange('width', e.target.value)}
                    />
                    <span className="flex items-center justify-center px-2 border-t border-b border-gray-300">×</span>
                    <input
                      type="text"
                      placeholder="Height"
                      className="w-full border border-gray-300 rounded-r-none px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.dimensions.height}
                      onChange={(e) => handleDimensionChange('height', e.target.value)}
                    />
                    <div className="relative">
                      <select
                        className="h-full border border-gray-300 rounded-r px-2 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.dimensionUnit}
                        onChange={(e) => handleChange('dimensionUnit', e.target.value)}
                      >
                        <option value="cm">cm</option>
                        <option value="in">in</option>
                        <option value="mm">mm</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">(Length X Width X Height)</p>
                </div>
              </div>
            </div>

            {/* UPC */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <label className="text-gray-700 mr-2">UPC</label>
                <div className="relative group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.upc}
                onChange={(e) => handleChange('upc', e.target.value)}
              />
            </div>

            {/* EAN */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <label className="text-gray-700 mr-2">EAN</label>
                <div className="relative group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.ean}
                onChange={(e) => handleChange('ean', e.target.value)}
              />
            </div>
          </div>
          
          {/* Right Column */}
          <div>
            {/* Image Upload */}
            <div className="mb-6">
              <div className="border border-dashed border-gray-300 rounded p-6 flex flex-col items-center justify-center bg-gray-50">
                <div className="mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-2">Drag image(s) here or</p>
                <button className="text-blue-500 hover:text-blue-700 font-medium">Browse Images</button>
                <div className="flex items-center mt-4 text-xs text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>You can add up to 15 images, each not exceeding 5 MB in size and 7000 X 7000 pixels resolution.</span>
                </div>
              </div>
            </div>

            {/* Weight */}
            <div className="mb-6">
              <label className="block mb-2 text-gray-700">Weight</label>
              <div className="flex">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.weight}
                  onChange={(e) => handleChange('weight', e.target.value)}
                />
                <div className="relative">
                  <select
                    className="h-full border border-gray-300 rounded-r px-2 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.weightUnit}
                    onChange={(e) => handleChange('weightUnit', e.target.value)}
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="lb">lb</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Manufacturer */}
            <div className="mb-6">
              <label className="block mb-2 text-gray-700">Manufacturer</label>
              <div className="relative">
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.manufacturer}
                  onChange={(e) => handleChange('manufacturer', e.target.value)}
                >
                  <option value="">Select or Add Manufacturer</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Brand */}
            <div className="mb-6">
              <label className="block mb-2 text-gray-700">Brand</label>
              <div className="relative">
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.brand}
                  onChange={(e) => handleChange('brand', e.target.value)}
                >
                  <option value="">Select or Add Brand</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* MPN */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <label className="text-gray-700 mr-2">MPN</label>
                <div className="relative group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.mpn}
                onChange={(e) => handleChange('mpn', e.target.value)}
              />
            </div>

            {/* ISBN */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <label className="text-gray-700 mr-2">ISBN</label>
                <div className="relative group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.isbn}
                onChange={(e) => handleChange('isbn', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

   
    <div className=" p-4 ">
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Sales Information Section */}
        <div className="w-full md:w-1/2 mb-6">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="salesInfo"
              className="w-4 h-4 text-blue-600"
              checked={salesSelected}
              onChange={() => setSalesSelected(!salesSelected)}
            />
            <label htmlFor="salesInfo" className="ml-2 text-lg font-medium">
              Sales Information
            </label>
          </div>

          {salesSelected && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-normal text-red-500 mb-1">
                  Selling Price<span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <div className="w-16 border border-gray-300 rounded-l-md flex items-center justify-center bg-gray-50">
                    AED
                  </div>
                  <input
                    type="text"
                    className="flex-grow border border-gray-300 rounded-r-md p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-normal text-red-500 mb-1">
                  Account<span className="text-red-500">*</span>
                </label>
                <select className="w-full border border-gray-300 rounded-md p-2 bg-white">
                  <option>Sales</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-normal text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2 h-24"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-normal text-gray-700 mb-1">
                  Tax
                </label>
                <div className="relative">
                  <select className="w-full border border-gray-300 rounded-md p-2 pr-8 bg-white appearance-none">
                    <option>Standard Rate [5%]</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Purchase Information Section */}
        <div className="w-full md:w-1/2 mb-6">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="purchaseInfo"
              className="w-4 h-4 text-blue-600"
              checked={purchaseSelected}
              onChange={() => setPurchaseSelected(!purchaseSelected)}
            />
            <label htmlFor="purchaseInfo" className="ml-2 text-lg font-medium">
              Purchase Information
            </label>
          </div>

          {purchaseSelected && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-normal text-red-500 mb-1">
                  Cost Price<span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <div className="w-16 border border-gray-300 rounded-l-md flex items-center justify-center bg-gray-50">
                    AED
                  </div>
                  <input
                    type="text"
                    className="flex-grow border border-gray-300 rounded-r-md p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-normal text-red-500 mb-1">
                  Account<span className="text-red-500">*</span>
                </label>
                <select className="w-full border border-gray-300 rounded-md p-2 bg-white">
                  <option>Cost of Goods Sold</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-normal text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2 h-24"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-normal text-gray-700 mb-1">
                  Preferred Vendor
                </label>
                <select className="w-full border border-gray-300 rounded-md p-2 bg-white">
                  <option></option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inventory Tracking Section */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="trackInventory"
            className="w-4 h-4 text-blue-600"
            checked={trackInventory}
            onChange={() => setTrackInventory(!trackInventory)}
          />
          <label htmlFor="trackInventory" className="ml-2 text-lg font-medium">
            Track Inventory for this item
          </label>
          <div className="ml-2 text-gray-500">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          You cannot enable/disable inventory tracking once you've created transactions for this item
        </p>

        {trackInventory && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <label className="block text-sm font-normal text-red-500 mb-1">
                Inventory Account<span className="text-red-500">*</span>
              </label>
              <select className="w-full border border-gray-300 rounded-md p-2 bg-white">
                <option>Select an account</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-normal text-red-500 mb-1">
                Inventory Valuation Method<span className="text-red-500">*</span>
              </label>
              <select className="w-full border border-gray-300 rounded-md p-2 bg-white">
                <option>Select the valuation method</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-normal text-gray-700 mb-1">
                Opening Stock
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-normal text-gray-700 mb-1">
                Opening Stock Rate per Unit
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-normal text-gray-700 mb-1">
                Reorder Point
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        )}
      </div>
    </div>

    </div>

  );
};

export default AddItemForm;