import React, { useState } from "react";
import Transactions from "./Transaction";

const ViewItemsForm = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const [activeTabsale, setActiveTabsale] = useState("sales");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="w-full max-w-6xl mx-auto p-4 font-sans bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
        <h1 className="text-2xl font-bold">Cake</h1>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Adjust Stock
          </button>
          <div className="relative">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center">
              More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "overview"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>

          <button
            className={`px-4 py-2 font-medium transition ${
              activeTab === "transactions"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("transactions")}
          >
            Transactions
          </button>

         

          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "history"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
        </div>
      </div>


      {activeTab === "overview" && (
<>
      {/* Content */}
      <div className="flex flex-col md:flex-row">
        {/* Left Side - Item Details */}
        <div className="w-full md:w-7/12 pr-0 md:pr-6">
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="col-span-1 text-gray-600">Item Type</div>
            <div className="col-span-2 font-medium">Inventory Items</div>

            <div className="col-span-1 text-gray-600">SKU</div>
            <div className="col-span-2 font-medium">1</div>

            <div className="col-span-1 text-gray-600">Unit</div>
            <div className="col-span-2 font-medium">kg</div>

            <div className="col-span-1 text-gray-600">Created Source</div>
            <div className="col-span-2 font-medium">User</div>

            <div className="col-span-1 text-gray-600">Inventory Account</div>
            <div className="col-span-2 font-medium">Finished Goods</div>

            <div className="col-span-1 text-gray-600">
              Inventory Valuation Method
            </div>
            <div className="col-span-2 font-medium">
              FIFO (First In First Out)
            </div>
          </div>

          {/* Purchase Information */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Purchase Information</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 text-gray-600">Cost Price</div>
              <div className="col-span-2 font-medium">AED60.00</div>

              <div className="col-span-1 text-gray-600">Purchase Account</div>
              <div className="col-span-2 font-medium">
                Advertising And Marketing
              </div>

              <div className="col-span-1 text-gray-600">Description</div>
              <div className="col-span-2 font-medium">Butter Cake</div>
            </div>
          </div>

          {/* Sales Information */}
          <div>
            <h2 className="text-lg font-bold mb-4">Sales Information</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 text-gray-600">Selling Price</div>
              <div className="col-span-2 font-medium">AED100.00</div>

              <div className="col-span-1 text-gray-600">Sales Account</div>
              <div className="col-span-2 font-medium">General Income</div>

              <div className="col-span-1 text-gray-600">Description</div>
              <div className="col-span-2 font-medium">Butter Cake</div>
            </div>
          </div>
        </div>

        {/* Right Side - Image and Stock */}
        <div className="w-full md:w-5/12 mt-6 md:mt-0">
          <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center mb-8 bg-gray-50">
            <div className="w-16 h-16 text-gray-400 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-center mb-1">
              Drag image(s) here or
            </p>
            <button className="text-blue-500 hover:underline">
              Browse images
            </button>
          </div>

          {/* Stock Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-y-6">
              <div>
                <h3 className="text-gray-600 text-sm mb-1">Opening Stock</h3>
                <p className="text-xl font-bold">5.00</p>
              </div>

              <div>
                <h3 className="text-gray-600 text-sm mb-1">Stock on Hand</h3>
                <p className="text-xl font-bold">5.00</p>
              </div>

              <div>
                <h3 className="text-gray-600 text-sm mb-1">Committed Stock</h3>
                <p className="text-xl font-bold">0.00</p>
              </div>

              <div>
                <h3 className="text-gray-600 text-sm mb-1">
                  Available for Sale
                </h3>
                <p className="text-xl font-bold">5.00</p>
              </div>
            </div>
          </div>

          {/* Right Side Information */}
          <div className=" mt-8">
            {/* Qty Information */}

            <div className="flex-1  flex">
              <div className="text-center  mr-6">
                <div className="flex  items-baseline">
                  <span className="text-3xl font-bold">0</span>
                  <span className="text-gray-500 text-sm ml-2">Qty</span>
                </div>
                <div className="text-sm text-gray-700">To be Invoiced</div>
              </div>
              <div className="text-center">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">0</span>
                  <span className="text-gray-500 text-sm ml-2">Qty</span>
                </div>
                <div className="text-sm text-gray-700">To be Billed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full font-sans">
        {/* Top Section with Dropdown and Tabs */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <button
              className="flex items-center text-blue-500 hover:text-blue-600 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Associated Price Lists
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-10">
                {/* Dropdown content would go here */}
                <div className="p-2 hover:bg-gray-100 cursor-pointer">
                  Price List Option 1
                </div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer">
                  Price List Option 2
                </div>
              </div>
            )}
          </div>

          <div className="flex">
            <button
              className={`px-4 py-2 ${
                activeTabsale === "sales"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 border-t border-l border-b border-gray-300"
              }`}
              onClick={() => setActiveTab("sales")}
            >
              Sales
            </button>
            <button
              className={`px-4 py-2 ${
                activeTabsale === "purchase"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
              onClick={() => setActiveTab("purchase")}
            >
              Purchase
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="w-full bg-gray-50 border-t border-l border-r border-gray-200">
          <div className="flex text-gray-500 text-sm font-medium">
            <div className="w-1/2 p-3">NAME</div>
            <div className="w-1/4 p-3">PRICE</div>
            <div className="w-1/4 p-3">DISCOUNT</div>
          </div>
        </div>

        {/* Table Content */}
        <div className="w-full border-t border-l border-r border-b border-gray-200 p-4 text-center">
          <p className="text-gray-800">
            The sales price lists associated with this item will be displayed
            here.
            <a href="#" className="text-blue-500 hover:underline ml-1">
              Create Price List
            </a>
          </p>
        </div>

        {/* Associate Price List Button */}
        <div className="mt-4">
          <button className="flex items-center text-blue-500 hover:text-blue-600">
            <svg
              className="w-5 h-5 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Associate Price List
          </button>
        </div>

        {/* Reorder Point Section */}
        <div className="mt-6">
          <h3 className="text-gray-800 font-medium mb-2">Reorder Point</h3>
          <div className="bg-yellow-50 border border-yellow-100 p-4 rounded">
            <p className="text-gray-800">
              You have to enable reorder notification before setting reorder
              point for items.
              <a href="#" className="text-blue-500 hover:underline ml-1">
                Click here
              </a>
            </p>
          </div>
        </div>
      </div>
      </>
  )}
  




       {activeTab === "transactions" && (
            <div className="mt-4">
          
              <Transactions />
            </div>
          )}
    </div>
  );
};

export default ViewItemsForm;
