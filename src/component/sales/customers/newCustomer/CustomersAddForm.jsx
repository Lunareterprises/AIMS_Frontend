

import React, { useState } from 'react';
import {  Phone , Smartphone} from 'lucide-react';
import OtherDetails from './OtherDetails';
import AddressTab from './AddressTab';
import ContactPersonsTab from './ContactPersonsTab';
import CustomFields from './CustomFields';
import ReportingTags from './ReportingTags';
import RemarksTab from './RemarksTab';

const CustomersAddForm = () => {
  const [activeTab, setActiveTab] = useState('Other Details');
  const [customerType, setCustomerType] = useState('Business');
  const [contactPersons, setContactPersons] = useState([]);

  const tabs = [
    'Other Details',
    'Address', 
    'Contact Persons',
    // 'Custom Fields',
    // 'Reporting Tags',
    // 'Remarks'
  ];



  const removeContactPerson = (id) => {
    setContactPersons(contactPersons.filter(person => person.id !== id));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Other Details':
        return (
          <div>
            <OtherDetails />
          </div>
        );

      case 'Address':
        return (
          <div>
            <AddressTab />
          </div>
        );

      case 'Contact Persons':
        return (
          <div>
            <ContactPersonsTab />
          </div>
        );

      case 'Custom Fields':
        return (
          <div>
            <CustomFields />
          </div>
        );

      case 'Reporting Tags':
        return (
          <div>
            <ReportingTags />
          </div>
        );

      case 'Remarks':
        return (
          <div>
            <RemarksTab />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">New Customer</h1>
        
        {/* Basic Customer Information */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-700">Customer Type</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="customerType" 
                  value="Business" 
                  checked={customerType === 'Business'}
                  onChange={(e) => setCustomerType(e.target.value)}
                  className="mr-2"
                />
                Business
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="customerType" 
                  value="Individual" 
                  checked={customerType === 'Individual'}
                  onChange={(e) => setCustomerType(e.target.value)}
                  className="mr-2"
                />
                Individual
              </label>
            </div>
          </div>

          {/* <div className="grid grid-cols-3 gap-4"> */}
            {/* <div className="p-6 bg-white"> */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-56">
                  <h2 className="block text-sm font-medium text-gray-700 ">Primary Contact</h2>
                  <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                    <span className="text-xs text-gray-600">i</span>
                  </div>
                </div>
                <div className="flex-none w-40">
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-500">
                    <option>Salutation</option>
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Mrs.</option>
                    <option>Dr.</option>
                  </select>
                </div>
                
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-500"
                  />
                </div>
              </div>
            {/* </div> */}
          {/* </div> */}

          <div className='flex'>
            <label className="block text-sm font-medium text-gray-700 mb-1 w-80">Company Name</label>
            <input 
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0"
            />
          </div>

          <div className='flex'>
            <label className="block text-sm font-medium text-gray-700 mb-1 w-80">Display Name*</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0">
              <option>Select or type to add</option>
            </select>
          </div>

          <div className='flex'>
            <label className="block text-sm font-medium text-gray-700 mb-1 w-80">Email Address</label>
            <input 
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Phone Label with Info Icon */}
            <div className="flex items-center gap-2 min-w-20 w-56">
              <span className="text-gray-700 font-medium">Phone</span>
              <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                <span className="text-gray-400 text-xs font-bold">i</span>
              </div>
            </div>
            
            {/* Work Phone Input */}
            <div className="flex-1 relative">
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
                <Phone className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="tel"
                  placeholder="Work Phone"
                  className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
            
            {/* Mobile Input */}
            <div className="flex-1 relative">
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
                <Smartphone className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="tel"
                  placeholder="Mobile"
                  className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1  font-medium text-sm  cursor-pointer ${
                  activeTab === tab
                    ? 'border-blue-500 border-b-2 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-96">
          {renderTabContent()}
        </div>

        {/* Customer Owner Section */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <strong>Customer Owner:</strong> Assign a user as the customer owner to provide access only to the data of this customer. 
            <span className="text-blue-600 cursor-pointer hover:underline ml-1">Learn More</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-start space-x-3 mt-6 pt-4 border-t border-gray-200">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-0">
            Save
          </button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomersAddForm;

 