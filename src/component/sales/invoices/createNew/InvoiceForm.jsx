import React, { useState } from 'react';
import { ChevronDown, Search, Plus, X, Upload, HelpCircle, Settings, Edit } from 'lucide-react';
import CommonButton from '../../../CommonUI/buttons/CommonButton';
import BillingAddressFormModal from '../../quotes/createNew/BillingAddressFormModal';
import TaxPreferencesDialog from '../../quotes/createNew/TaxPreferencesDialog';
import QuoteNumberPreferences from '../../quotes/createNew/QuoteNumberPreferences';

export default function InvoiceForm() {
  const [customerDropdownOpen, setCustomerDropdownOpen] = useState(false);
  const [salespersonDropdownOpen, setSalespersonDropdownOpen] = useState(false);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedSalesperson, setSelectedSalesperson] = useState('');
  const [currency] = useState('AED');
  const [selectedPlaceOfSupply, setSelectedPlaceOfSupply] = useState('Dubai');
  const [placeOfSupplyDropdownOpen, setPlaceOfSupplyDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTaxTooltip, setShowTaxTooltip] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('billing'); // 'billing' or 'shipping'
  const [configureModalOpen, setConfigureModalOpen] = useState(false);
  
  const [invoiceItems, setInvoiceItems] = useState([
    {
      id: 1,
      itemName: '',
      quantity: 1.00,
      rate: 0.00,
      discount: 0,
      discountType: '%',
      tax: '',
      amount: 0.00
    }
  ]);

  // Function to add a new row
  const addNewRow = () => {
    const newItem = {
      id: Date.now(), // Simple ID generation
      itemName: '',
      quantity: 1.00,
      rate: 0.00,
      discount: 0,
      discountType: '%',
      tax: '',
      amount: 0.00
    };
    setInvoiceItems([...invoiceItems, newItem]);
  };

  // Function to remove a row
  const removeRow = (id) => {
    if (invoiceItems.length > 1) {
      setInvoiceItems(invoiceItems.filter(item => item.id !== id));
    }
  };

  // Function to update item data
  const updateItem = (id, field, value) => {
    setInvoiceItems(items => 
      items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSaveBilling = (data) => {
    console.log('Billing address saved:', data);
    // call billing API here
  };

  const handleSaveShipping = (data) => {
    console.log('Shipping address saved:', data);
    // call shipping API here
  };

  const getSaveHandler = () =>
    modalType === 'billing' ? handleSaveBilling : handleSaveShipping;

  const customers = [
    { id: 1, name: '2070 VACATION HOME', company: '2070 VACATION HOME RENTAL CO. LLC', initial: '2' },
    { id: 2, name: 'AIMTU', company: 'A I M T U REAL ESTATE L.L.C', initial: 'A' },
    { id: 3, name: 'AMERICAR', company: 'AMERICAR LUXURY RENTALS LLC', initial: 'A' },
    { id: 4, name: 'Arshad', company: 'Arshad', initial: 'A' }
  ];

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const salespersons = [
    { id: 1, name: 'Sales person 1' }
  ];

  const placesOfSupply = [
    { id: 1, name: 'Dubai' },
    { id: 2, name: 'Abu Dhabi' },
    { id: 3, name: 'Sharjah' },
    { id: 4, name: 'Ajman' }
  ];

  const toggleTaxTooltip = () => {
    setShowTaxTooltip((prev) => !prev);
  };

  const closeTaxTooltip = () => {
    setShowTaxTooltip(false);
  };

  return (
    <div className="bg-white min-h-screen w-3/4 text-gray-700">
      <div className="p-6 space-y-6">
        {/* Customer Name */}
        <div className="flex items-center space-x-2">
          <label className="text-red-500 font-medium w-32 text-sm">Customer Name*</label>
          <div className="relative flex-1">
            <div 
              className="border border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white text-sm"
              onClick={() => setCustomerDropdownOpen(!customerDropdownOpen)}
            >
              <span className="text-gray-500">
                {selectedCustomer || 'Select or add a customer'}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {customerDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 text-sm">
                <div className="p-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>

                <div className="max-h-48 overflow-y-auto">
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <div 
                        key={customer.id}
                        className="flex items-center space-x-3 p-3 hover:bg-blue-50 cursor-pointer"
                        onClick={() => {
                          setSelectedCustomer(customer.name);
                          setCustomerDropdownOpen(false);
                          setSearchQuery('');
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
                    ))
                  ) : (
                    <div className="p-3 text-sm text-gray-500 text-center">No customers found</div>
                  )}

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

          {/* Currency Display */}
          {selectedCustomer && (
            <div className="flex items-center justify-end mt-2">
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-gray-700 font-medium text-sm">{currency}</span>
              </div>
            </div>
          )}
        </div>

        {selectedCustomer && (
          <>
            {/* Address Section */}
            <div className='ml-36'>
              <div className="mt-4 grid grid-cols-2 gap-6">
                {/* Billing Section */}
                <div>
                  <h4 className="text-gray-600 font-medium mb-2 text-sm">BILLING ADDRESS</h4>
                  <CommonButton
                    onClick={() => {
                      setModalType('billing');
                      setModalOpen(true);
                    }}
                    label="New Address"
                    className="text-blue-500 text-sm hover:text-blue-700 transition-colors"
                  />
                </div>

                {/* Shipping Section */}
                <div>
                  <h4 className="text-gray-600 font-medium mb-2 text-sm">SHIPPING ADDRESS</h4>
                  <CommonButton
                    onClick={() => {
                      setModalType('shipping');
                      setModalOpen(true);
                    }}
                    label="New Address"
                    className="text-blue-500 text-sm hover:text-blue-700 transition-colors"
                  />
                </div>
              </div>

              {/* Tax Treatment */}
              <div className="mt-8 relative inline-block">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 text-sm">Tax Treatment:</span>
                  <h1 className="text-gray-900 font-medium text-sm focus:outline-none">
                    Non VAT Registered
                  </h1>
                  <CommonButton
                    label={<Edit className="w-4 h-4" />}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    onClick={toggleTaxTooltip}
                  />
                </div>

                {/* Tooltip on click */}
                {showTaxTooltip && (
                  <TaxPreferencesDialog onClose={closeTaxTooltip} />
                )}
              </div>
            </div>

            {/* Place of Supply */}
            <div className="flex items-center space-x-2 text-sm">
              <label className="text-red-500 font-medium w-32 text-sm">Place of Supply*</label>
              <div className="relative w-1/2">
                <div 
                  className="border border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white"
                  onClick={() => setPlaceOfSupplyDropdownOpen(!placeOfSupplyDropdownOpen)}
                >
                  <span className="text-gray-900 font-medium">
                    {selectedPlaceOfSupply || 'Select place of supply'}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>

                {placeOfSupplyDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-10">
                    <div className="max-h-48 overflow-y-auto">
                      {placesOfSupply.map((place) => (
                        <div 
                          key={place.id}
                          className="p-3 hover:bg-blue-50 cursor-pointer transition-colors"
                          onClick={() => {
                            setSelectedPlaceOfSupply(place.name);
                            setPlaceOfSupplyDropdownOpen(false);
                          }}
                        >
                          <div className="font-medium text-gray-900">{place.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Invoice# */}
        <div className="flex items-center space-x-2">
          <label className="text-red-500 font-medium w-32 text-sm">Invoice*</label>
          <div className="relative w-1/2">
            <input 
              type="text" 
              value="INV-000001"
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none"
              readOnly
            />
            <div className="group">
              <CommonButton 
                label={<Settings className='text-blue-700 w-5' />} 
                onClick={() => setConfigureModalOpen(true)} 
                className="absolute right-1 top-1 bottom-1 px-2" 
              />
              <div className="absolute w-1/2 -top-8 right-0 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-10">
                Click here to enable or disable auto-generation of Invoice numbers.
              </div>
            </div>
          </div>
        </div>

        {/* Reference# */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-900 font-medium w-32 text-sm">Reference#</label>
          <input 
            type="text" 
            className="border text-sm border-gray-300 rounded px-3 py-2 w-1/2 focus:outline-none"
          />
        </div>

        {/* Invoice Date */}
        <div className="flex items-center space-x-2">
          <label className="text-red-500 font-medium w-32 text-sm">Invoice Date*</label>
          <input 
            type="date" 
            className="border text-sm border-gray-300 rounded px-3 py-2 w-1/4 focus:outline-none"
          />
          <span className="text-gray-900 font-medium w-32 text-sm ml-20">Due Date</span>
          <input 
            type="date" 
            className="border text-sm border-gray-300 rounded px-3 py-2 w-1/4 focus:outline-none"
          />
        </div>

        {/* Salesperson */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-900 font-medium w-32 text-sm">Salesperson</label>
          <div className="relative w-1/2">
            <div 
              className="border text-sm border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white"
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
          <label className="text-gray-900 font-medium w-32 text-sm">Project Name</label>
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
          <div className="flex items-center space-x-1 w-32 text-sm">
            <label className="text-gray-900 font-medium">Subject</label>
            <div className="relative group">
              <CommonButton label={<HelpCircle className="w-4 h-4 text-gray-400" />} />
              <div className="absolute w-64 -top-16 right-0 left-0 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-50">
                You can enter up to 250 characters. If you do not require this field, you can mark it as inactive under Invoice preferences.
              </div>
            </div>
          </div>
          <textarea 
            placeholder="Let your customer know what this Invoice is for"
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
                <div className="col-span-2 text-center">TAX</div>
                <div className="col-span-2 text-right">AMOUNT</div>
                <div className="col-span-1"></div>
              </div>
            </div>
            
            {/* Render invoice items */}
            {invoiceItems.map((item, index) => (
              <div key={item.id} className="p-4 border-b border-gray-200 last:border-b-0">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                        <Plus className="w-4 h-4 text-gray-400" />
                      </div>
                      <input 
                        type="text"
                        placeholder="Type or click to select an item."
                        value={item.itemName}
                        onChange={(e) => updateItem(item.id, 'itemName', e.target.value)}
                        className="flex-1 border-0 bg-transparent text-gray-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <input 
                      type="number" 
                      value={item.quantity} 
                      onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value))}
                      className="w-full text-center border-0 bg-transparent focus:outline-none" 
                    />
                  </div>
                  <div className="col-span-1">
                    <div className="flex items-center">
                      <input 
                        type="number" 
                        value={item.rate} 
                        onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value))}
                        className="w-full text-center border-0 bg-transparent focus:outline-none" 
                      />
                      <HelpCircle className="w-4 h-4 text-gray-400 ml-1" />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="flex items-center">
                      <input 
                        type="number" 
                        value={item.discount} 
                        onChange={(e) => updateItem(item.id, 'discount', parseFloat(e.target.value))}
                        className="w-8 text-center border-0 bg-transparent focus:outline-none" 
                      />
                      <select 
                        value={item.discountType}
                        onChange={(e) => updateItem(item.id, 'discountType', e.target.value)}
                        className="border-0 bg-transparent text-sm focus:outline-none"
                      >
                        <option>%</option>
                        <option>Amount</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <select 
                      value={item.tax}
                      onChange={(e) => updateItem(item.id, 'tax', e.target.value)}
                      className="w-full border-0 bg-transparent text-sm focus:outline-none"
                    >
                      <option value="">Select a Tax</option>
                      <option value="vat5">VAT 5%</option>
                      <option value="vat0">VAT 0%</option>
                    </select>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="text-red-500">{item.amount.toFixed(2)}</span>
                  </div>
                  <div className="col-span-1">
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeRow(item.id)}
                      disabled={invoiceItems.length === 1}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-4 mt-2">
            <button className="flex items-center space-x-2 text-blue-500 text-sm" onClick={addNewRow}>
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
              <span className="font-medium">Attach Files to Invoice</span>
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
          <span className="font-medium">Additional Fields:</span> Start adding custom fields for your Invoice by going to Settings ⚙️ Sales ➤ Invoice
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-8 pt-6 border-t">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Save as Draft</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Save and Send</button>
          <button className="text-gray-500 px-4 py-2">Cancel</button>
        </div>

        {/* Footer Note */}
        {/* <div className="text-sm text-gray-500 mt-4">
          Here is your Smart Chat (Ctrl+Space)
        </div> */}
      </div>

      {/* Modals */}
      <BillingAddressFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        addressType={modalType}
        onSave={getSaveHandler()}
      />

      <QuoteNumberPreferences 
        isOpen={configureModalOpen}
        onClose={() => setConfigureModalOpen(false)}
        onSave={getSaveHandler()}
        source="invoice"
      />
    </div>
  );
}