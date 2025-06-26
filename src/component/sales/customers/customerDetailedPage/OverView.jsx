import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  User,
  Calendar,
  DollarSign,
  Home,
  FileText,
  Settings,
  Bell,
} from "lucide-react";
import ReceivablesDashboard from "./ReceivablesDashboard";
import Timeline from "./TimelineItem";

function OverView({ customer }) {
  const [expandedSections, setExpandedSections] = useState({
    addresses: false,
    officeSetup: false,
    recordInfo: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              {customer?.cu_company_name.toUpperCase() ||
                "2070 VACATION HOME RENTAL CO, LLC"}
            </h3>
            <div className="text-xs text-gray-500 mb-4">
              Payment due amount
              <br />
              {customer?.cu_payment_terms || "Due on Receipt"}
            </div>
            <div className="border-t p-4  border-gray-400">
              {Array.isArray(customer?.contact_persons) &&
              customer?.contact_persons.length > 0 ? (
                <div className="text-xs text-gray-600">
                  <div className="font-medium mb-1">Primary Contact</div>
                  <div>
                    {customer.primary_contact_name ||
                      customer.contact_name ||
                      customer.contact_person}
                  </div>
                  {(customer?.primary_contact_email ||
                    customer?.contact_email) && (
                    <div className="text-gray-500">
                      {customer.primary_contact_email || customer.contact_email}
                    </div>
                  )}
                  {(customer?.primary_contact_phone ||
                    customer?.contact_phone) && (
                    <div className="text-gray-500">
                      {customer.primary_contact_phone || customer.contact_phone}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-xs text-gray-600">
                  <span>There is no primary contact information. </span>
                  <button
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    onClick={() => console.log("Add new primary contact")}
                  >
                    Add New
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Addresses Section */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection("addresses")}
              className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-900 mb-3"
            >
              ADDRESSES
              {expandedSections.addresses ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {expandedSections.addresses && (
              <div className="text-xs text-gray-600 space-y-3">
                <div>
                  <div className="font-medium mb-1">Billing Address</div>
                  {customer?.cu_b_addr_address.trim() ? (
                    <div>
                      {customer?.cu_b_addr_address && (
                        <>
                          {customer.cu_b_addr_address ||
                            customer.billing_address.address_line_1 ||
                            ""}
                          {customer.cu_b_addr_city &&
                            ` • ${customer.cu_b_addr_city}`}
                          {customer.cu_b_addr_state &&
                            `, ${customer.cu_b_addr_state}`}
                          {customer.cu_b_addr_pincode &&
                            ` ${customer.cu_b_addr_pincode}`}
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">No billing address</span>
                      <button
                        className="text-blue-600 hover:text-blue-800 font-medium"
                        onClick={() => console.log("Add billing address")}
                      >
                        + New Address
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-medium mb-1">Shipping Address</div>
                  {customer?.cu_s_addr_address.trim() ? (
                    <div>
                      {customer?.cu_s_addr_address && (
                        <>
                          {customer.cu_s_addr_address ||
                            customer.shipping_address.address_line_1 ||
                            ""}
                          {customer.cu_s_addr_city &&
                            ` • ${customer.cu_s_addr_city}`}
                          {customer.cu_s_addr_state &&
                            `, ${customer.cu_s_addr_state}`}
                          {customer.cu_s_addr_pincode &&
                            ` ${customer.cu_s_addr_pincode}`}
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">No shipping address</span>
                      <button
                        className="text-blue-600 hover:text-blue-800 font-medium"
                        onClick={() => console.log("Add shipping address")}
                      >
                        + New Address
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Office Setup Section */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection("officeSetup")}
              className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-900 mb-3"
            >
              OFFICE SETUP
              {expandedSections.officeSetup ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {expandedSections.officeSetup && (
              <div className="text-xs text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span>Customer Type</span>
                  <span>
                    {customer?.cu_type || customer?.cu_type || "Business"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Default Currency</span>
                  <span>{customer?.cu_currency || customer?.cu_currency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax Treatment</span>
                  <span>{customer?.cu_tax_treatment}</span>
                </div>
                <div className="flex justify-between">
                  <span>Order Language</span>
                  <span>
                    {customer?.cu_portal_language ||
                      customer?.cu_portal_language}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Portal Status</span>
                  {customer?.cu_portal_access.trim().toLowerCase() ===
                  "false" ? (
                    <span className="text-red-500">Disabled</span>
                  ) : (
                    <span className="text-green-500">Enabled</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-green-50 border border-green-200 rounded p-3 mb-4">
            <div className="flex items-start">
              <div className="text-green-600 mr-2">💡</div>
              <div className="text-xs text-green-800">
                Customer funds will not be automatically available to keep track
                of all the transactions associated with your customer.
              </div>
            </div>
            <button className="text-xs text-blue-600 mt-2">
              Enable Portal
            </button>
          </div>

          {/* Record Info Section */}
          <div>
            <button
              onClick={() => toggleSection("recordInfo")}
              className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-900 mb-3"
            >
              RECORD INFO
              {expandedSections.recordInfo ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {expandedSections.recordInfo && (
              <div className="text-xs text-gray-600 space-y-1">
                {customer?.created_by && (
                  <div className="flex justify-between">
                    <span>Created By</span>
                    <span>{customer.created_by}</span>
                  </div>
                )}
                {customer?.id && (
                  <div className="flex justify-between">
                    <span>Customer ID</span>
                    <span>{customer.id}</span>
                  </div>
                )}
                {customer?.status && (
                  <div className="flex justify-between">
                    <span>Status</span>
                    <span>{customer.status}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Receivables Section */}
          <ReceivablesDashboard customer={customer} />

          {/* Activity Timeline */}
          <Timeline customer={customer} />
        </div>
      </div>
    </div>
  );
}

export default OverView;
