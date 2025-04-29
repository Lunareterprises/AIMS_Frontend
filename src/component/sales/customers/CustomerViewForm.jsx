import { useState } from 'react';
import { ChevronDown, ChevronUp, X, Paperclip, ChevronRight } from 'lucide-react';

export default function CustomerViewForm() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [addressExpanded, setAddressExpanded] = useState(true);
  const [detailsExpanded, setDetailsExpanded] = useState(true);

  return (
    <div className="w-full bg-white border border-gray-200 rounded shadow">
      {/* Header Section */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold">ASK</h1>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-gray-100 border border-gray-300 rounded text-gray-700">
            Edit
          </button>
          <button className="px-3 py-2 bg-gray-100 border border-gray-300 rounded">
            <Paperclip size={18} />
          </button>
          <div className="relative">
            <button className="px-4 py-2 bg-blue-500 text-white rounded flex items-center">
              New Transaction
              <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
          <div className="relative">
            <button className="px-4 py-2 bg-gray-100 border border-gray-300 rounded text-gray-700 flex items-center">
              More
              <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
          <button className="p-1">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200">
        {['Overview', 'Comments', 'Transactions', 'Mails', 'Statement'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-3 ${
              activeTab === tab
                ? 'text-blue-500 border-b-2 border-blue-500 font-medium'
                : 'text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <div className="flex-grow"></div>
        <button className="p-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <line x1="10" y1="9" x2="8" y2="9"></line>
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Left Panel */}
        <div className="w-1/3 border-r border-gray-200 p-4">
          <div className="mb-6">
            <h2 className="font-bold mb-2">ASK PORTAL - FZCO</h2>
            <hr className="my-3" />
            <p className="text-gray-600">
              There is no primary contact information. 
              <a href="#" className="text-blue-500 ml-1">Add New</a>
            </p>
          </div>

          {/* Address Section */}
          <div className="mb-6">
            <div 
              className="flex justify-between items-center mb-3 cursor-pointer"
              onClick={() => setAddressExpanded(!addressExpanded)}
            >
              <h2 className="font-bold">ADDRESS</h2>
              {addressExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            
            {addressExpanded && (
              <>
                <div className="mb-4">
                  <p className="font-medium mb-1">Billing Address</p>
                  <p className="text-gray-600">
                    No Billing Address - 
                    <a href="#" className="text-blue-500 ml-1">+ New Address</a>
                  </p>
                </div>
                
                <div>
                  <p className="font-medium mb-1">Shipping Address</p>
                  <p className="text-gray-600">
                    No Shipping Address - 
                    <a href="#" className="text-blue-500 ml-1">+ New Address</a>
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Other Details Section */}
          <div>
            <div 
              className="flex justify-between items-center mb-3 cursor-pointer"
              onClick={() => setDetailsExpanded(!detailsExpanded)}
            >
              <h2 className="font-bold">OTHER DETAILS</h2>
              {detailsExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            
            {detailsExpanded && (
              <div className="text-sm">
                <div className="grid grid-cols-2 mb-2">
                  <span className="text-gray-600">Customer Type</span>
                  <span className="font-medium">Business</span>
                </div>
                
                <div className="grid grid-cols-2 mb-2">
                  <span className="text-gray-600">Default Currency</span>
                  <span className="font-medium">AED</span>
                </div>
                
                <div className="grid grid-cols-2 mb-2">
                  <span className="text-gray-600">Tax Treatment</span>
                  <span className="font-medium">Non VAT Registered</span>
                </div>
                
                <div className="grid grid-cols-2 mb-2">
                  <span className="text-gray-600">Member State</span>
                  <span className="font-medium">Dubai</span>
                </div>
                
                <div className="grid grid-cols-2 mb-2">
                  <span className="text-gray-600">Portal Status</span>
                  <span className="text-red-500">• Disabled</span>
                </div>
                
                <div className="grid grid-cols-2 mb-2">
                  <span className="text-gray-600">Portal Language</span>
                  <span className="font-medium">English</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Panel */}
        <div className="w-2/3 p-4">
          <div className="mb-6">
            <p className="text-gray-600 mb-1">Payment due period</p>
            <p className="font-medium">Due on Receipt</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">Receivables</h2>
            
            <div className="border border-gray-200 rounded">
              <div className="grid grid-cols-3 bg-gray-50 p-3 border-b border-gray-200">
                <div className="font-medium text-gray-600">CURRENCY</div>
                <div className="font-medium text-gray-600 text-right">OUTSTANDING RECEIVABLES</div>
                <div className="font-medium text-gray-600 text-right">UNUSED CREDITS</div>
              </div>
              
              <div className="grid grid-cols-3 p-3 border-b border-gray-200">
                <div>AED- UAE Dirham</div>
                <div className="text-right">AED0.00</div>
                <div className="text-right">AED0.00</div>
              </div>
              
              <div className="p-3">
                <a href="#" className="text-blue-500">Enter Opening Balance</a>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <h2 className="text-lg font-bold mr-2">Income</h2>
                <span className="text-gray-600 text-sm">
                  This chart is displayed in the organization's base currency.
                </span>
              </div>
              
              <div className="flex items-center">
                <div className="relative mr-2">
                  <button className="px-3 py-1 border border-gray-300 rounded flex items-center text-sm">
                    Last 6 Months
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                </div>
                
                <div className="relative">
                  <button className="px-3 py-1 border border-gray-300 rounded flex items-center text-sm">
                    Accrual
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Chart Area */}
            <div className="h-64 border border-gray-200 rounded p-4 mb-4">
              <div className="flex h-full">
                <div className="flex flex-col justify-between text-xs text-gray-500 pr-2">
                  <div>5 K</div>
                  <div>4 K</div>
                  <div>3 K</div>
                  <div>2 K</div>
                  <div>1 K</div>
                  <div>0</div>
                </div>
                <div className="flex-grow">
                  <div className="flex h-full items-end">
                    <div className="flex flex-col items-center w-1/6">
                      <div className="h-0 w-full bg-blue-500 rounded-t"></div>
                      <div className="mt-2 text-xs text-gray-500">Oct<br/>2024</div>
                    </div>
                    <div className="flex flex-col items-center w-1/6">
                      <div className="h-0 w-full bg-blue-500 rounded-t"></div>
                      <div className="mt-2 text-xs text-gray-500">Nov<br/>2024</div>
                    </div>
                    <div className="flex flex-col items-center w-1/6">
                      <div className="h-0 w-full bg-blue-500 rounded-t"></div>
                      <div className="mt-2 text-xs text-gray-500">Dec<br/>2024</div>
                    </div>
                    <div className="flex flex-col items-center w-1/6">
                      <div className="h-0 w-full bg-blue-500 rounded-t"></div>
                      <div className="mt-2 text-xs text-gray-500">Jan<br/>2025</div>
                    </div>
                    <div className="flex flex-col items-center w-1/6">
                      <div className="h-0 w-full bg-blue-500 rounded-t"></div>
                      <div className="mt-2 text-xs text-gray-500">Feb<br/>2025</div>
                    </div>
                    <div className="flex flex-col items-center w-1/6">
                      <div className="h-0 w-full bg-blue-500 rounded-t"></div>
                      <div className="mt-2 text-xs text-gray-500">Mar<br/>2025</div>
                    </div>
                    <div className="flex flex-col items-center w-1/6">
                      <div className="h-0 w-full bg-blue-500 rounded-t"></div>
                      <div className="mt-2 text-xs text-gray-500">Apr<br/>2025</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="font-medium">
              Total Income ( Last 6 Months ) - AED0.00
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}