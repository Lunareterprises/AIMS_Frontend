import React, { useState } from "react";
import {
  X,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

const CustomerDetailsModal = ({
  isOpen,
  onClose,
  customerData,
  onExternalLinkClick, // Optional callback for external link
}) => {
  const [activeTab, setActiveTab] = useState("Details");
  const [contactPersonsExpanded, setContactPersonsExpanded] = useState(false);
  const [addressExpanded, setAddressExpanded] = useState(false);

  // Don't render if not open or no customer data
  if (!isOpen || !customerData) return null;

  const handleExternalClick = () => {
    if (onExternalLinkClick) {
      onExternalLinkClick(customerData);
    } else {
      // Default behavior - navigate to customer page
      window.open(`/customer/${customerData.id}`, "_blank");
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Sliding Panel */}
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        {/* Panel Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              {customerData.initial}
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  Customer
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">
                  {customerData.name}
                </h3>
                <ExternalLink
                  className="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-700"
                  onClick={handleExternalClick}
                />
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Panel Content */}
        <div className="h-full overflow-y-auto pb-20">
          {/* Company Name */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-2 text-gray-600">
              <span className="text-sm">{customerData.company || "-"}</span>
            </div>
            <div className="flex items-center space-x-2 mt-1 text-gray-500">
              <span className="text-sm">{customerData.email || "-"}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {["Details", "Activity Log"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "Details" && (
            <div className="p-4 space-y-6">
              {/* Financial Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <span className="text-xs text-gray-600">
                      Outstanding Receivables
                    </span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    AED{customerData.outstandingReceivables || "0.00"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-gray-600">
                      Unused Credits
                    </span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    AED{customerData.unusedCredits || "0.00"}
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Contact Details
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Customer Type</span>
                    <span className="text-sm text-gray-900">
                      {customerData.cu_type || "Business"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Currency</span>
                    <span className="text-sm text-gray-900">
                      {customerData.cu_currency || "AED"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Payment Terms</span>
                    <span className="text-sm text-gray-900">
                      {customerData.cu_payment_terms || "Due on Receipt"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Portal Status</span>
                    <span className="text-sm text-gray-900">
                      {customerData.cu_portal_access.trim() === "false"
                        ? "Disabled"
                        : "Enabled"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Portal Language
                    </span>
                    <span className="text-sm text-gray-900">
                      {customerData.cu_portal_language || "English"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tax Treatment</span>
                    <span className="text-sm text-gray-900">
                      {customerData.cu_tax_treatment || "Non VAT Registered"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Member State</span>
                    <span className="text-sm text-gray-900">
                      {customerData.cu_place_supply || "Dubai"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Source</span>
                    <span className="text-sm text-gray-900">
                      {customerData.source || "-"}
                    </span>
                  </div>
                  {customerData.phone && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Phone</span>
                      <span className="text-sm text-gray-900">
                        {customerData.phone}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Persons */}
              <div>
                <div
                  className="flex items-center justify-between mb-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                  onClick={() =>
                    setContactPersonsExpanded(!contactPersonsExpanded)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">
                      Contact Persons
                    </h4>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {(Array.isArray(customerData.contact_persons) &&
                        customerData.contact_persons?.length) ||
                        0}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      contactPersonsExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {contactPersonsExpanded && (
                  <div className="pl-4 pb-3">
                    {!customerData.contact_persons ||
                    customerData.contactPersons.length === 0 ? (
                      <div className="text-center text-gray-500 py-4">
                        <div className="text-sm">No contact persons found.</div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {customerData.contact_persons.map((contact, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-3"
                          >
                            <div className="font-medium text-gray-900">
                              {contact.name}
                            </div>
                            {contact.title && (
                              <div className="text-sm text-gray-600">
                                {contact.title}
                              </div>
                            )}
                            {contact.email && (
                              <div className="text-sm text-gray-600">
                                {contact.email}
                              </div>
                            )}
                            {contact.phone && (
                              <div className="text-sm text-gray-600">
                                {contact.phone}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Address Section */}
              <div>
                <div
                  className="flex items-center justify-between mb-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                  onClick={() => setAddressExpanded(!addressExpanded)}
                >
                  <h4 className="font-medium text-gray-900">Address</h4>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      addressExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {addressExpanded && (
                  <div className="space-y-4">
                    {/* Billing Address */}
                    <div className="pl-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-4 h-4 bg-gray-100 rounded flex items-center justify-center">
                          <div className="w-2 h-2 bg-gray-400 rounded"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          Billing Address
                        </span>
                      </div>
                      <div className="ml-6 mt-2 text-sm text-gray-700">
                        {!customerData.cu_b_addr_address?.trim() ? (
                          <div className="text-gray-400 italic">
                            No Billing Address
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div>
                              <span className="font-medium">Attention:</span>{" "}
                              {customerData.cu_b_addr_attention?.trim() ||
                                "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">Address:</span>{" "}
                              {customerData.cu_b_addr_address?.trim() || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">City:</span>{" "}
                              {customerData.cu_b_addr_city?.trim() || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">State:</span>{" "}
                              {customerData.cu_b_addr_state?.trim() || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">Country:</span>{" "}
                              {customerData.cu_b_addr_country?.trim() || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">Pincode:</span>{" "}
                              {customerData.cu_b_addr_pincode || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">Phone:</span>{" "}
                              {customerData.cu_b_addr_phone || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">Fax:</span>{" "}
                              {customerData.cu_b_addr_fax_number || "N/A"}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="pl-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-4 h-4 bg-gray-100 rounded flex items-center justify-center">
                          <div className="w-2 h-2 bg-gray-400 rounded"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          Shipping Address
                        </span>
                      </div>
                      <div className="ml-6 mt-2 text-sm text-gray-700">
                        {!customerData.cu_s_addr_address?.trim() ? (
                          <div className="text-gray-400 italic">
                            No Shipping Address
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div>
                              <span className="font-medium">Attention:</span>{" "}
                              {customerData.cu_s_addr_attention?.trim() ||
                                "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">Address:</span>{" "}
                              {customerData.cu_s_addr_address?.trim() || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">City:</span>{" "}
                              {customerData.cu_s_addr_city?.trim() || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">State:</span>{" "}
                              {customerData.cu_s_addr_state?.trim() || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">Country:</span>{" "}
                              {customerData.cu_s_addr_country?.trim() || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">Pincode:</span>{" "}
                              {customerData.cu_s_addr_pincode || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">Phone:</span>{" "}
                              {customerData.cu_s_addr_phone || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">Fax:</span>{" "}
                              {customerData.cu_s_addr_fax_number || "N/A"}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "Activity Log" && (
            <div className="p-4">
              <div className="text-center text-gray-500 py-8">
                <div className="text-sm">No recent activity</div>
                <div className="text-xs mt-1">
                  Activity will appear here when available
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerDetailsModal;
