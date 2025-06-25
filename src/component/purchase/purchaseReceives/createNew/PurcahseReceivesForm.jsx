


import React, { useState } from 'react';
import { ChevronDown, X, Calendar, Search, Filter, Settings } from 'lucide-react';
import CommonButton from '../../../CommonUI/buttons/CommonButton';
import DateRangeFilterModal from '../../../sales/paymentReceived/createNew/DateRangeFilterModal';
import FileUploadComponent from '../../../sales/paymentReceived/createNew/FileUploadComponent';
import QuoteNumberPreferences from '../../../sales/quotes/createNew/QuoteNumberPreferences';
function formatDate(dateString) {
  if (!dateString) return '';
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}
const PurcahseReceivesForm = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [showForm, setShowForm] = useState(false);
    const [showPurchaseOrder, setShowPurchaseOrder] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    amountReceived: '',
    bankCharges: '',
    paymentDate: '',
    paymentNumber: '',
    paymentMode: '',
    depositTo: '',
    reference: ''
  });
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showDepositDropdown, setShowDepositDropdown] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [configureModalOpen, setConfigureModalOpen] = useState(false);
  const [modalType, setModalType] = useState('billing');
  const displayLabel =
    dateRange.startDate && dateRange.endDate
      ? `${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate)}`
      : 'Filter by Date Range';

  const customerOptions = [
    '2070 VACATION HOME',
    'ABC Corporation',
    'XYZ Industries',
    'Tech Solutions Ltd'
  ];

  const depositOptions = [
    'Cash',
    'Petty Cash',
    'Undeposited Funds',
    'Other Current Liability',
    'Zoho Payroll - Bank Account',
    'A M BUSINESS CORP FOR CORPORATE SERVICES PROVIDERS CO. L.L.C'
  ];

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setFormData(prev => ({ ...prev, customerName: customer }));
    setShowPurchaseOrder(true);
  };
  const handlePurchaseOrderSelect = (customer) => {
    setSelectedCustomer(customer);
    setFormData(prev => ({ ...prev, customerName: customer }));
    setShowForm(true);
  };

  

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving payment:', formData);
    // Handle save logic here
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedCustomer('');
    setFormData({
      customerName: '',
      amountReceived: '',
      bankCharges: '',
      paymentDate: '17 Jun 2025',
      paymentNumber: '920',
      paymentMode: 'Cash',
      depositTo: 'Petty Cash',
      reference: ''
    });
  };
    const handleSaveBilling = (data) => {
    console.log('Billing address saved:', data);
    // call billing API here
  };
  const getSaveHandler = () =>
    modalType === 'billing' ? handleSaveBilling : handleSaveShipping;

  return (
    <div className="min-h-screen ">
      <div className="max-w-full mx-auto  rounded-lg ">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900"> New Purchase Receive</h2>
          <button 
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className=" max-w-full  ">
          {/* Customer Name Selection */}
            <div className="px-6 flex items-center space-x-2  py-6">
                <label className="block font-medium w-52 text-sm text-red-600 mb-2">
                Customer Name*
                </label>
                <div className="relative">
                <select
                    value={selectedCustomer}
                    onChange={(e) => handleCustomerSelect(e.target.value)}
                    className="border focus:outline-none border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white text-sm w-96"                
                >
                    <option value="">Select Customer</option>
                    {customerOptions.map((customer, index) => (
                    <option key={index} value={customer}>
                        {customer}
                    </option>
                    ))}
                </select>
                {/* <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" /> */}
                </div>
            </div>


            {showPurchaseOrder && (
                <div className="mb-6 p-6 flex items-center space-x-2 ">
                    <label className="block font-medium w-52 text-sm text-red-600 mb-2">
                       Purchase Oreder*
                    </label>
                    <div className="relative">
                    <select
                        value={selectedCustomer}
                        onChange={(e) => handlePurchaseOrderSelect(e.target.value)}
                        className="border focus:outline-none border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white text-sm w-96"                
                    >
                        <option value="">Select Customer</option>
                        {customerOptions.map((customer, index) => (
                        <option key={index} value={customer}>
                            {customer}
                        </option>
                        ))}
                    </select>
                    {/* <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" /> */}
                    </div>
                </div>
            )
            }

          {/* Rest of the form - only show after customer selection */}
          {showForm && (
            <div className='px-6'>
                 {/* Purcahse Number */}
              <div className="mb-4 flex items-center space-x-2">
                <label className="block text-sm font-medium text-red-600 mb-2 w-52">
                  Purchase Receive #*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.paymentNumber}
                    onChange={(e) => handleInputChange('paymentNumber', e.target.value)}
                    className=" focus:outline-none border border-gray-300 rounded px-3 py-2  flex items-center justify-between bg-white text-sm w-96 "                
                  />
                  <div className=" group">
                    <CommonButton label={<Settings className='text-blue-700 w-5' />} onClick={() => { setConfigureModalOpen(true);  }} className="absolute right-1 top-1 bottom-1 px-2" />
                    <div className="absolute w-3/4 -top-8 right-0 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-10">
                        Click here to enable or disable auto-generation of Purchase Recevible numbers.
                    </div>

                </div>
                <QuoteNumberPreferences
                    isOpen={configureModalOpen}
                    onClose={() => setConfigureModalOpen(false)}
                    onSave={getSaveHandler()}
                    source="purchaseReceive"
                /> 
                </div>
              </div>
              {/* Purachse Date */}
              <div className="mb-4 flex items-center space-x-2">
                <label className="block text-sm font-medium text-red-600 mb-2 w-52">
                  Purachse Date*
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.paymentDate}
                    onChange={(e) => handleInputChange('paymentDate', e.target.value)}
                    className=" focus:outline-none border border-gray-300 rounded px-3 py-2  flex items-center justify-between bg-white text-sm w-96 "                
                  />
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

           

             

              

              

              {/* Unpaid Invoices Section */}
              <div className="mb-6 w-3/4 mt-10">
                

                {/* Invoice Table Headers */}
                <div className="bg-gray-50 px-4 py-2 border-t border-b border-gray-200">
                  <div className="grid grid-cols-5 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div>Items & Description</div>
                    <div>Ordered</div>
                    <div>Received</div>
                    <div>In Transit</div>
                    <div>Quantity to Receive</div>
                  </div>
                </div>

                {/* No Invoices Message */}
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">There are no unpaid invoices associated with this customer.</p>
                </div>

                

                {/* Notes Section */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-sm"
                    placeholder="Enter notes..."
                  />
                </div>

                {/* File Upload */}
                <div className="mt-4">
                  <FileUploadComponent />
                </div>

                {/* Footer Note */}
                <div className="mt-4 text-xs text-gray-500">
                  <p>
                    Additional Fields: Start adding custom fields for your payment workflows by going to Settings → Preferences → Modules.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurcahseReceivesForm;

