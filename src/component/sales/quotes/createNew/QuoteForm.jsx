import React, { useState } from 'react';
import { ChevronDown, Search, Plus, X, Upload, HelpCircle,Settings } from 'lucide-react';
import CommonButton from '../../../CommonUI/buttons/CommonButton';

export default function QuoteForm() {
  const [customerDropdownOpen, setCustomerDropdownOpen] = useState(false);
  const [salespersonDropdownOpen, setSalespersonDropdownOpen] = useState(false);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedSalesperson, setSelectedSalesperson] = useState('');
  
  const customers = [
    { id: 1, name: '2070 VACATION HOME', company: '2070 VACATION HOME RENTAL CO. LLC', initial: '2' },
    { id: 2, name: 'AIMTU', company: 'A I M T U REAL ESTATE L.L.C', initial: 'A' },
    { id: 3, name: 'AMERICAR', company: 'AMERICAR LUXURY RENTALS LLC', initial: 'A' },
    { id: 4, name: 'Arshad', company: 'Arshad', initial: 'A' }
  ];

  const salespersons = [
    { id: 1, name: 'Sales person 1' }
  ];

  return (
    <div className="bg-white min-h-screen w-3/4 text-gray-700">

      <div className="p-6 space-y-6">
        {/* Customer Name */}
        <div className="flex items-center space-x-2">
          <label className="text-red-500 font-medium w-32">Customer Name*</label>
          <div className="relative flex-1">
            <div 
              className="border border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white"
              onClick={() => setCustomerDropdownOpen(!customerDropdownOpen)}
            >
              <span className="text-gray-500">
                {selectedCustomer || 'Select or add a customer'}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            <button className="absolute right-1 top-1 bottom-1 bg-blue-500 text-white px-3 rounded">
              <Search className="w-4 h-4" />
            </button>
            
            {customerDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
                <div className="p-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {customers.map((customer) => (
                    <div 
                      key={customer.id}
                      className="flex items-center space-x-3 p-3 hover:bg-blue-50 cursor-pointer"
                      onClick={() => {
                        setSelectedCustomer(customer.name);
                        setCustomerDropdownOpen(false);
                      }}
                    >
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {customer.initial}
                      </div>
                      <div>
                        <div className="font-medium text-blue-600">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.company}</div>
                      </div>
                    </div>
                  ))}
                  <div className="p-3 border-t">
                    <button className="flex items-center space-x-2 text-blue-500">
                      <Plus className="w-4 h-4" />
                      <span>New Customer</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quote# */}
        <div className="flex items-center space-x-2 ">
          <label className="text-red-500 font-medium w-32">Quote*</label>
          <div className="relative  w-1/2">
            <input 
              type="text" 
              value="QT-000004"
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none "
              
            />
            <div className=" group">
                <CommonButton label={<Settings className='text-gray-700 w-5' />} className="absolute right-1 top-1 bottom-1 px-2" />

                <div className="absolute w-1/2 -top-8 right-0 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-10">
                    Click here to enable or disable auto-generation of Quote numbers.
                </div>

            </div>
                           
          </div>
        </div>

        {/* Reference# */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-900 font-medium w-32">Reference#</label>
          <input 
            type="text" 
            className="border border-gray-300 rounded px-3 py-2 w-1/2 focus:outline-none"
          />
        </div>

        {/* Quote Date */}
        <div className="flex items-center space-x-2 ">
          <label className="text-red-500 font-medium w-32">Quote Date*</label>
          <input 
            type="date" 
            
            className="border border-gray-300 rounded px-3 py-2 w-1/4 focus:outline-none"
          />
          <span className="text-gray-900 font-medium w-32 ml-20">Expiry Date</span>
          <input 
            type="date" 
            placeholder="dd MMM yyyy"
            className="border border-gray-300 rounded px-3 py-2 w-1/4 focus:outline-none"
          />
        </div>

        {/* Salesperson */}
        <div className="flex items-center space-x-2 ">
          <label className="text-gray-900 font-medium w-32">Salesperson</label>
          <div className="relative w-1/2">
            <div 
              className="border border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white "
              onClick={() => setSalespersonDropdownOpen(!salespersonDropdownOpen)}
            >
              <span className="text-gray-500">
                {selectedSalesperson || 'Select or Add Salesperson'}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            
            {salespersonDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
                <div className="p-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div className="bg-blue-500 text-white px-3 py-2 cursor-pointer"
                     onClick={() => {
                       setSelectedSalesperson('Sales person 1');
                       setSalespersonDropdownOpen(false);
                     }}>
                  Sales person 1
                </div>
                <div className="p-3 border-t">
                  <button className="flex items-center space-x-2 text-blue-500">
                    <Plus className="w-4 h-4" />
                    <span>Manage Salespersons</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Project Name */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-900 font-medium w-32">Project Name</label>
          <div className="relative w-1/2">
            <div 
              className="border border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white"
              onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
            >
              <span className="text-gray-500">Select a project</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500 ml-36">
          Select a customer to associate a project.
        </div>

        {/* Subject */}
            <div className="flex items-start space-x-2">
                <div className="flex items-center space-x-1 w-32">
                    <label className="text-gray-900 font-medium">Subject</label>
                    <div className="relative group">
                    <CommonButton label={<HelpCircle className="w-4 h-4 text-gray-400" />} />
                    <div className="absolute w-64 -top-16 right-0 left-0 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-50">
                        You can enter up to 250 characters. If you do not require this field, you can mark it as inactive under quote preferences.
                    </div>
                    </div>
                </div>
                <textarea 
                    placeholder="Let your customer know what this Quote is for"
                    className="border border-gray-300 rounded px-3 py-2 w-1/2 h-20 resize-none"
                />
            </div>


        {/* Item Table */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Item Table</h3>
            <button className="text-blue-500 text-sm">Bulk Actions</button>
          </div>

          <div className="border border-gray-300 rounded">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-300">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                <div className="col-span-4">ITEM DETAILS</div>
                <div className="col-span-1 text-center">QUANTITY</div>
                <div className="col-span-1 text-center">RATE</div>
                <div className="col-span-1 text-center">DISCOUNT</div>
                <div className="col-span-1 text-center">TAX</div>
                <div className="col-span-3 text-right">AMOUNT</div>
                <div className="col-span-1"></div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                      <Plus className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="text-gray-500">Type or click to select an item.</span>
                  </div>
                </div>
                <div className="col-span-1">
                  <input type="text" value="1.00" className="w-full text-center border-0 bg-transparent" />
                </div>
                <div className="col-span-1">
                  <div className="flex items-center">
                    <input type="text" value="0.00" className="w-full text-center border-0 bg-transparent" />
                    <HelpCircle className="w-4 h-4 text-gray-400 ml-1" />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex items-center">
                    <input type="text" value="0" className="w-8 text-center border-0 bg-transparent" />
                    <select className="border-0 bg-transparent text-sm">
                      <option>%</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-1">
                  <select className="w-full border-0 bg-transparent text-sm">
                    <option>Select a Tax</option>
                  </select>
                </div>
                <div className="col-span-3 text-right">
                  <span className="text-red-500">0.00</span>
                </div>
                <div className="col-span-1">
                  <button className="text-red-500">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-2">
            <button className="flex items-center space-x-2 text-blue-500 text-sm">
              <Plus className="w-4 h-4" />
              <span>Add New Row</span>
            </button>
            <button className="flex items-center space-x-2 text-blue-500 text-sm">
              <Plus className="w-4 h-4" />
              <span>Add Items in Bulk</span>
            </button>
          </div>

          {/* Totals */}
          <div className="mt-6 flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span className="text-orange-600">Sub Total</span>
                <span>0.00</span>
              </div>
              <div className="text-xs text-gray-500">(Tax Inclusive)</div>
              <div className="flex justify-between font-medium text-lg border-t pt-2">
                <span>Total ( AED )</span>
                <span>0.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Notes */}
        <div className="mt-8">
          <label className="text-gray-900 font-medium block mb-2">Customer Notes</label>
          <textarea 
            defaultValue="Looking forward for your business."
            className="w-full border border-gray-300 rounded px-3 py-2 h-20"
          />
        </div>

        {/* Terms & Conditions */}
        <div className="mt-6">
          <label className="text-gray-900 font-medium block mb-2">Terms & Conditions</label>
          <textarea 
            placeholder="Enter the terms and conditions of your business to be displayed in your transaction"
            className="w-full border border-gray-300 rounded px-3 py-2 h-24"
          />
          <div className="mt-2 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Attach Files to Quote</span>
              <div className="flex items-center space-x-2 mt-1">
                <button className="flex items-center space-x-1 text-blue-500 border border-blue-500 rounded px-2 py-1 text-xs">
                  <Upload className="w-3 h-3" />
                  <span>Upload File</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                You can upload a maximum of 5 files, 10MB each
              </div>
            </div>
          </div>
        </div>

        {/* Additional Fields Note */}
        <div className="text-sm text-gray-600 mt-6">
          <span className="font-medium">Additional Fields:</span> Start adding custom fields for your quotes by going to Settings ⚙️ Sales ➤ Quotes
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-8 pt-6 border-t">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Save as Draft</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Save and Send</button>
          <button className="text-gray-500 px-4 py-2">Cancel</button>
        </div>

        {/* Footer Note */}
        <div className="text-sm text-gray-500 mt-4">
          Here is your Smart Chat (Ctrl+Space)
        </div>
      </div>
    </div>
  );
}