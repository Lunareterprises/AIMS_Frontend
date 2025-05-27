import React, { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';

const AccountingDashboard = () => {
  const [receivablesDropdown, setReceivablesDropdown] = useState(false);
  const [payablesDropdown, setPayablesDropdown] = useState(false);
  const [open, setOpen] = useState(false);
  const [openPayables, setOpenPayables] = useState(false)

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Total Receivables Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Total Receivables</h2>
              <div className="relative">
                <button 
                  onClick={() => setReceivablesDropdown(!receivablesDropdown)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                >
                  <Plus size={14} />
                  New
                </button>
                
                {receivablesDropdown && (
                  <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-56">
                    <div className="py-2 text-sm whitespace-nowrap">
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                        <Plus size={16} className="text-blue-500" />
                        New Invoice
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                        <Plus size={16} className="text-blue-500" />
                        New Recurring Invoice
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                        <Plus size={16} className="text-blue-500" />
                        New Customer Payment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Total Unpaid Invoices AED0.00</p>
            </div>
            
            <div className="flex justify-between items-end">
              <div >
                <p className="text-sm text-blue-500 font-medium mb-1">CURRENT</p>
                <p className="text-2xl font-medium text-gray-900">AED0.00</p>
              </div>
                <div className="flex justify-between items-end">
                
                    <div className="relative ">
                        <p className="text-sm text-red-500 font-medium mb-1">OVERDUE</p>
                        <div
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={() => setOpenPayables(!openPayables)}
                        >
                            <p className="text-2xl font-medium text-gray-900">AED0.00</p>
                            <ChevronDown size={16} className="text-gray-400" />
                        </div>

                        {openPayables && (
                            <div className="absolute right-0 mt-2  bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-56">
                                <ul className="text-sm ">
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between "><span className='text-gray-600'>1 - 15 days </span> <span className='text-blue-600'>AED0.00</span></li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"><span className='text-gray-600'>16 - 30 days </span> <span className='text-blue-600'>AED0.00</span></li>   
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"><span className='text-gray-600'>31 - 45 days </span> <span className='text-blue-600'>AED0.00</span></li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"><span className='text-gray-600'>Above 45 days  </span> <span className='text-blue-600'>AED0.00</span></li>                            
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
          </div>
          
          {/* Total Payables Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Total Payables</h2>
              <div className="relative">
                <button 
                  onClick={() => setPayablesDropdown(!payablesDropdown)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                >
                  <Plus size={14} />
                  New
                </button>
                
                {payablesDropdown && (
                  <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-56">
                    <div className="py-2 text-sm whitespace-nowrap">
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2  text-gray-700">
                        <Plus size={16} className="text-blue-500" />
                        New Bill
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                        <Plus size={16} className="text-blue-500" />
                        New Vendor Payment
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                        <Plus size={16} className="text-blue-500" />
                        New Recurring Bill
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Total Unpaid Bills AED0.00</p>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-blue-500 font-medium mb-1">CURRENT</p>
                <p className="text-2xl font-medium text-gray-900">AED0.00</p>
              </div>
                <div className="relative text-right">
                    <p className="text-sm text-red-500 font-medium mb-1">OVERDUE</p>
                    <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                        <p className="text-2xl font-medium text-gray-900">AED0.00</p>
                        <ChevronDown size={16} className="text-gray-400" />
                    </div>

                    {open && (
                            <div className="absolute right-0 mt-2  bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-56">
                                <ul className="text-sm ">
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between "><span className='text-gray-600'>1 - 15 days </span> <span className='text-blue-600'>AED0.00</span></li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"><span className='text-gray-600'>16 - 30 days </span> <span className='text-blue-600'>AED0.00</span></li>   
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"><span className='text-gray-600'>31 - 45 days </span> <span className='text-blue-600'>AED0.00</span></li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"><span className='text-gray-600'>Above 45 days  </span> <span className='text-blue-600'>AED0.00</span></li>                            
                                </ul>
                            </div>
                    )}
                </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Click outside to close dropdowns */}
      {(receivablesDropdown || payablesDropdown) && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => {
            setReceivablesDropdown(false);
            setPayablesDropdown(false);
          }}
        />
      )}
    </div>
  );
};

export default AccountingDashboard;