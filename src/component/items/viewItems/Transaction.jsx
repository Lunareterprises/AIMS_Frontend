
import React, { useState } from 'react';

const Transactions = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [filterBy, setFilterBy] = useState('Invoices');
  const [status, setStatus] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  
  const transactions = [
    {
      date: '07 Apr 2025',
      invoice: 'INV-000001',
      customer: 'Rahil company',
      quantity: '1.00',
      price: 'AED100.00',
      total: 'AED100.00',
      status: 'Sent'
    },
    {
      date: '07 Apr 2025',
      invoice: 'INV-000002',
      customer: 'Rahil company',
      quantity: '1.00',
      price: 'AED100.00',
      total: 'AED100.00',
      status: 'Draft'
    }
  ];

  return (
    <div className="w-full font-sans">
   
      
   
      
      {/* Filters */}
      <div className="flex mb-4 space-x-3">
        <div className="relative">
          <button 
            className="px-3 py-2 border border-gray-300 rounded flex items-center space-x-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <span className="text-gray-500">Filter By:</span>
            <span>{filterBy}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isFilterOpen && (
            <div className="absolute mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
              <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => {setFilterBy('Invoices'); setIsFilterOpen(false);}}>Invoices</div>
              <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => {setFilterBy('Orders'); setIsFilterOpen(false);}}>Orders</div>
              <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => {setFilterBy('Payments'); setIsFilterOpen(false);}}>Payments</div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <button 
            className="px-3 py-2 border border-gray-300 rounded flex items-center space-x-2"
            onClick={() => setIsStatusOpen(!isStatusOpen)}
          >
            <span className="text-gray-500">Status:</span>
            <span>{status}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isStatusOpen && (
            <div className="absolute mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
              <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => {setStatus('All'); setIsStatusOpen(false);}}>All</div>
              <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => {setStatus('Sent'); setIsStatusOpen(false);}}>Sent</div>
              <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => {setStatus('Draft'); setIsStatusOpen(false);}}>Draft</div>
            </div>
          )}
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-500">
              <th className="px-4 py-3 font-medium text-sm">
                <div className="flex items-center">
                  DATE
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4" />
                  </svg>
                </div>
              </th>
              <th className="px-4 py-3 font-medium text-sm">INVOICE#</th>
              <th className="px-4 py-3 font-medium text-sm">CUSTOMER NAME</th>
              <th className="px-4 py-3 font-medium text-sm">QUANTITY SOLD</th>
              <th className="px-4 py-3 font-medium text-sm">PRICE</th>
              <th className="px-4 py-3 font-medium text-sm">TOTAL</th>
              <th className="px-4 py-3 font-medium text-sm">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3 text-blue-600">{item.invoice}</td>
                <td className="px-4 py-3">{item.customer}</td>
                <td className="px-4 py-3">{item.quantity}</td>
                <td className="px-4 py-3">{item.price}</td>
                <td className="px-4 py-3">{item.total}</td>
                <td className="px-4 py-3">
                  <span className={`${item.status === 'Sent' ? 'text-blue-600' : 'text-gray-500'}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;