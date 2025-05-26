import React,{useState} from 'react'
import { ChevronDown, ChevronUp, User, Calendar, DollarSign, Home, FileText, Settings, Bell } from 'lucide-react';
import ReceivablesDashboard from './ReceivablesDashboard';
import Timeline from './TimelineItem';

function OverView() {
    const [expandedSections, setExpandedSections] = useState({
    addresses: false,
    officeSetup: false,
    recordInfo: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  
  return (
    <div>
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">2070 VACATION HOME RENTAL CO, LLC</h3>
            <div className="text-xs text-gray-500 mb-4">
              Payment due amount<br />
              Due on Receipt
            </div>
          </div>

          {/* Addresses Section */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('addresses')}
              className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-900 mb-3"
            >
              ADDRESSES
              {expandedSections.addresses ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.addresses && (
              <div className="text-xs text-gray-600 space-y-2">
                <div>
                  <div className="font-medium">Billing Address</div>
                  <div>50 State Street • New Albany</div>
                </div>
                <div>
                  <div className="font-medium">Shipping Address</div>
                  <div>50 State Street • New Albany</div>
                </div>
              </div>
            )}
          </div>

          {/* Office Setup Section */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('officeSetup')}
              className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-900 mb-3"
            >
              OFFICE SETUP
              {expandedSections.officeSetup ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.officeSetup && (
              <div className="text-xs text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Customer Type</span>
                  <span>Business</span>
                </div>
                <div className="flex justify-between">
                  <span>Default Currency</span>
                  <span>USD</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax Treatment</span>
                  <span>Tax VAT Registration</span>
                </div>
                <div className="flex justify-between">
                  <span>Member Since</span>
                  <span>Owner</span>
                </div>
                <div className="flex justify-between">
                  <span>Price Source</span>
                  <span className="text-red-600">Overridden</span>
                </div>
                <div className="flex justify-between">
                  <span>Order Language</span>
                  <span>English</span>
                </div>
                <div className="flex justify-between">
                  <span>Source</span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-green-50 border border-green-200 rounded p-3 mb-4">
            <div className="flex items-start">
              <div className="text-green-600 mr-2">💡</div>
              <div className="text-xs text-green-800">
                Customer funds will not be automatically available to keep track of all the transactions associated with your customer.
              </div>
            </div>
            <button className="text-xs text-blue-600 mt-2">Enable Portal</button>
          </div>

          {/* Record Info Section */}
          <div>
            <button
              onClick={() => toggleSection('recordInfo')}
              className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-900 mb-3"
            >
              RECORD INFO
              {expandedSections.recordInfo ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Receivables Section */}
            <ReceivablesDashboard />

          

          {/* Activity Timeline */}
          
            <Timeline />
          
        </div>
      </div>
    </div>
  )
}

export default OverView
