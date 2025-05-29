import { useState } from "react";
import {
  ChevronRight,
  Info,
  ChevronDown,
  Mail,
  Phone,
  Smartphone,
  Upload,
  AlertCircle,
  MoreVertical,
  XCircle,
  Plus,
} from "lucide-react";
import ImageProps from "../../imageProp/imageProp";

export default function CustomersAddForm() {
  const [customerType, setCustomerType] = useState("business");

  const [activeTab, setActiveTab] = useState("otherDetails");
  const [allowPortalAccess, setAllowPortalAccess] = useState(false);
  const [validationError, setValidationError] = useState(true);

  const tabs = [
    { id: "otherDetails", label: "Other Details" },
    { id: "address", label: "Address" },
    { id: "contactPersons", label: "Contact Persons" },
    // { id: "customFields", label: "Custom Fields" },
    // { id: "reportingTags", label: "Reporting Tags" },
    { id: "remarks", label: "Remarks" },
  ];

  const [billingAddress, setBillingAddress] = useState({
    attention: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    faxNumber: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    attention: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    faxNumber: "",
  });

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const copyBillingAddress = () => {
    setShippingAddress({ ...billingAddress });
  };

  //   /-----//------------------

  const [contacts, setContacts] = useState([
    {
      id: 1,
      salutation: "",
      firstName: "",
      lastName: "",
      email: "",
      workPhone: "",
      mobile: "",
    },
  ]);

  const addContact = () => {
    const newId =
      contacts.length > 0 ? Math.max(...contacts.map((c) => c.id)) + 1 : 1;
    setContacts([
      ...contacts,
      {
        id: newId,
        salutation: "",
        firstName: "",
        lastName: "",
        email: "",
        workPhone: "",
        mobile: "",
      },
    ]);
  };

  const removeContact = (id) => {
    if (contacts.length > 1) {
      setContacts(contacts.filter((contact) => contact.id !== id));
    }
  };

  const updateContact = (id, field, value) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );
  };
  return (
    <div className=" mx-auto bg-white p-6">
      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">New Customer</h1>
        <a
          href="#"
          className="text-blue-500 hover:text-blue-600 flex items-center mt-1"
        >
          Fetch Customer Details From GSTN
          <ChevronRight size={16} className="ml-1" />
        </a>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Customer Type */}
        <div className="flex items-start">
          <div className="w-48 pt-2">
            <label className="text-gray-800 font-medium">Customer Type</label>
            <Info size={16} className="inline-block ml-1 text-gray-400" />
          </div>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="customerType"
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                checked={customerType === "business"}
                onChange={() => setCustomerType("business")}
              />
              <span className="text-gray-800">Business</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="customerType"
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                checked={customerType === "individual"}
                onChange={() => setCustomerType("individual")}
              />
              <span className="text-gray-800">Individual</span>
            </label>
          </div>
        </div>

        {/* Primary Contact */}
        <div className="flex items-start">
          <div className="w-48 pt-2">
            <label className="text-gray-800 font-medium">Primary Contact</label>
            <Info size={16} className="inline-block ml-1 text-gray-400" />
          </div>
          <div className="grid grid-cols-3 gap-4 flex-1">
            <div className="relative">
              <div className="relative">
                <select className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md bg-white appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option>Salutation</option>
                  <option>Mr.</option>
                  <option>Mrs.</option>
                  <option>Ms.</option>
                  <option>Dr.</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Company Name */}
        <div className="flex items-start">
          <div className="w-48 pt-2">
            <label className="text-gray-800 font-medium">Company Name</label>
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Display Name */}
        <div className="flex items-start">
          <div className="w-48 pt-2">
            <label className="text-red-500 font-medium">Display Name*</label>
            <Info size={16} className="inline-block ml-1 text-gray-400" />
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="flex items-start">
          <div className="w-48 pt-2">
            <label className="text-gray-800 font-medium">Email Address</label>
            <Info size={16} className="inline-block ml-1 text-gray-400" />
          </div>
          <div className="flex-1">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail size={16} className="text-gray-500" />
              </span>
              <input
                type="email"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start">
          <div className="w-48 pt-2">
            <label className="text-gray-800 font-medium">Phone</label>
            <Info size={16} className="inline-block ml-1 text-gray-400" />
          </div>
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Phone size={16} className="text-gray-500" />
              </span>
              <input
                type="text"
                placeholder="Work Phone"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Smartphone size={16} className="text-gray-500" />
              </span>
              <input
                type="text"
                placeholder="Mobile"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 bg-white">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`py-3 px-6 font-medium text-sm ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Other Details Tab Content */}
        {activeTab === "otherDetails" && (
          <div className="py-6 space-y-5">
            {/* Tax Treatment */}
            <div className="flex flex-col md:flex-row md:items-start">
              <div className="w-48 pt-2 mb-2 md:mb-0">
                <label className="text-gray-800 font-medium">
                  Tax Treatment<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <select className="w-full px-3 py-2 border rounded-md appearance-none border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500">
                    <option value="">Select Tax Treatment</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
                <div className="text-red-500 text-sm mt-1 flex items-start">
                  <AlertCircle
                    size={14}
                    className="mt-0.5 mr-1 flex-shrink-0"
                  />
                  <span>Please choose proper Tax Treatment</span>
                </div>
              </div>
            </div>

            {/* Place of Supply */}
            <div className="flex flex-col md:flex-row md:items-start">
              <div className="w-48 pt-2 mb-2 md:mb-0">
                <label className="text-gray-800 font-medium">
                  Place of Supply<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select Place of Supply</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Currency */}
            <div className="flex flex-col md:flex-row md:items-start">
              <div className="w-48 pt-2 mb-2 md:mb-0">
                <label className="text-gray-800 font-medium">Currency</label>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option>AED- UAE Dirham</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Account Receivable */}
            <div className="flex flex-col md:flex-row md:items-start">
              <div className="w-48 pt-2 mb-2 md:mb-0">
                <label className="flex items-center text-gray-800 font-medium">
                  Account Receivable
                  <span className="ml-1 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center text-gray-600 text-xs">
                    i
                  </span>
                </label>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option>Select an account</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Balance */}
            <div className="flex flex-col md:flex-row md:items-start">
              <div className="w-48 pt-2 mb-2 md:mb-0">
                <label className="text-gray-800 font-medium">
                  Opening Balance
                </label>
              </div>
              <div className="flex-1">
                <div className="flex">
                  <div className="bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 border-gray-300 text-gray-600">
                    AED
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="flex flex-col md:flex-row md:items-start">
              <div className="w-48 pt-2 mb-2 md:mb-0">
                <label className="text-gray-800 font-medium">
                  Payment Terms
                </label>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option>Due On Receipt</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Enable Portal? */}
            <div className="flex flex-col md:flex-row md:items-start">
              <div className="w-48 pt-2 mb-2 md:mb-0">
                <label className="flex items-center text-gray-800 font-medium">
                  Enable Portal?
                  <Info size={16} className="ml-1 text-gray-400" />
                </label>
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="portalAccess"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={allowPortalAccess}
                    onChange={() => setAllowPortalAccess(!allowPortalAccess)}
                  />
                  <label htmlFor="portalAccess" className="ml-2 text-gray-800">
                    Allow portal access for this customer
                  </label>
                </div>
              </div>
            </div>

            {/* Portal Language */}
            <div className="flex flex-col md:flex-row md:items-start">
              <div className="w-48 pt-2 mb-2 md:mb-0">
                <label className="flex items-center text-gray-800 font-medium">
                  Portal Language
                  <Info size={16} className="ml-1 text-gray-400" />
                </label>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option>English</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="flex flex-col md:flex-row md:items-start">
              <div className="w-48 pt-2 mb-2 md:mb-0">
                <label className="text-gray-800 font-medium">Documents</label>
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-l-md bg-white hover:bg-gray-50">
                    <ImageProps />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder content for other tabs */}
        {/* {activeTab !== "otherDetails" && (
          <div className="p-6 text-center text-gray-500">
            {tabs.find((tab) => tab.id === activeTab)?.label} content would go
            here
          </div>
        )} */}

        {activeTab === "address" && (
          <div className="flex flex-col md:flex-row gap-8 mt-5">
            {/* Billing Address */}
            <div className="w-full md:w-1/2">
              <h2 className="text-lg font-bold mb-4">Billing Address</h2>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Attention
                </label>
                <input
                  type="text"
                  name="attention"
                  value={billingAddress.attention}
                  onChange={handleBillingChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Country/Region
                </label>
                <select
                  name="country"
                  value={billingAddress.country}
                  onChange={handleBillingChange}
                  className="w-full p-2 border border-gray-300 rounded appearance-none bg-white"
                >
                  <option value="">Select or type to add</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Address
                </label>
                <textarea
                  name="address1"
                  value={billingAddress.address1}
                  onChange={handleBillingChange}
                  placeholder="Street 1"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  rows="2"
                />
                <textarea
                  name="address2"
                  value={billingAddress.address2}
                  onChange={handleBillingChange}
                  placeholder="Street 2"
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="2"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">City</label>
                <input
                  type="text"
                  name="city"
                  value={billingAddress.city}
                  onChange={handleBillingChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">State</label>
                <select
                  name="state"
                  value={billingAddress.state}
                  onChange={handleBillingChange}
                  className="w-full p-2 border border-gray-300 rounded appearance-none bg-white"
                >
                  <option value="">Select or type to add</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={billingAddress.zipCode}
                  onChange={handleBillingChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={billingAddress.phone}
                  onChange={handleBillingChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Fax Number
                </label>
                <input
                  type="tel"
                  name="faxNumber"
                  value={billingAddress.faxNumber}
                  onChange={handleBillingChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="w-full md:w-1/2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Shipping Address</h2>
                <button
                  onClick={copyBillingAddress}
                  className="text-blue-500 hover:text-blue-700 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                  </svg>
                  Copy billing address
                </button>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Attention
                </label>
                <input
                  type="text"
                  name="attention"
                  value={shippingAddress.attention}
                  onChange={handleShippingChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Country/Region
                </label>
                <select
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleShippingChange}
                  className="w-full p-2 border border-gray-300 rounded appearance-none bg-white"
                >
                  <option value="">Select or type to add</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Address
                </label>
                <textarea
                  name="address1"
                  value={shippingAddress.address1}
                  onChange={handleShippingChange}
                  placeholder="Street 1"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  rows="2"
                />
                <textarea
                  name="address2"
                  value={shippingAddress.address2}
                  onChange={handleShippingChange}
                  placeholder="Street 2"
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="2"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">City</label>
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleShippingChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">State</label>
                <select
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleShippingChange}
                  className="w-full p-2 border border-gray-300 rounded appearance-none bg-white"
                >
                  <option value="">Select or type to add</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={shippingAddress.zipCode}
                  onChange={handleShippingChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleShippingChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Fax Number
                </label>
                <input
                  type="tel"
                  name="faxNumber"
                  value={shippingAddress.faxNumber}
                  onChange={handleShippingChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "contactPersons" && (
          <div className="w-full mt-5">
            {contacts.map((contact, index) => (
              <div key={contact.id} className="w-full mb-1">
                <div className="flex flex-col md:flex-row border-t border-l border-r border-gray-200">
                  {/* Salutation */}
                  <div className="w-full md:w-1/6 border-b border-gray-200 md:border-r">
                    <div className="px-2 py-1 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-700">
                      SALUTATION
                    </div>
                    <div className="relative">
                      <select
                        value={contact.salutation}
                        onChange={(e) =>
                          updateContact(
                            contact.id,
                            "salutation",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border-none focus:ring-0 outline-none appearance-none"
                      >
                        <option value=""></option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Dr.">Dr.</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* First Name */}
                  <div className="w-full md:w-1/6 border-b border-gray-200 md:border-r">
                    <div className="px-2 py-1 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-700">
                      FIRST NAME
                    </div>
                    <input
                      type="text"
                      value={contact.firstName}
                      onChange={(e) =>
                        updateContact(contact.id, "firstName", e.target.value)
                      }
                      className="w-full p-2 border-none focus:ring-0 outline-none"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="w-full md:w-1/6 border-b border-gray-200 md:border-r">
                    <div className="px-2 py-1 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-700">
                      LAST NAME
                    </div>
                    <input
                      type="text"
                      value={contact.lastName}
                      onChange={(e) =>
                        updateContact(contact.id, "lastName", e.target.value)
                      }
                      className="w-full p-2 border-none focus:ring-0 outline-none"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="w-full md:w-1/6 border-b border-gray-200 md:border-r">
                    <div className="px-2 py-1 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-700">
                      EMAIL ADDRESS
                    </div>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) =>
                        updateContact(contact.id, "email", e.target.value)
                      }
                      className="w-full p-2 border-none focus:ring-0 outline-none"
                    />
                  </div>

                  {/* Work Phone */}
                  <div className="w-full md:w-1/6 border-b border-gray-200 md:border-r">
                    <div className="px-2 py-1 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-700">
                      WORK PHONE
                    </div>
                    <input
                      type="tel"
                      value={contact.workPhone}
                      onChange={(e) =>
                        updateContact(contact.id, "workPhone", e.target.value)
                      }
                      className="w-full p-2 border-none focus:ring-0 outline-none"
                    />
                  </div>

                  {/* Mobile */}
                  <div className="w-full md:w-1/6 border-b border-gray-200 md:border-r">
                    <div className="px-2 py-1 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-700">
                      MOBILE
                    </div>
                    <input
                      type="tel"
                      value={contact.mobile}
                      onChange={(e) =>
                        updateContact(contact.id, "mobile", e.target.value)
                      }
                      className="w-full p-2 border-none focus:ring-0 outline-none"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-center border-b border-gray-200 p-2">
                    <div className="flex items-center">
                      <button
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={() => {}}
                      >
                        <MoreVertical size={16} />
                      </button>
                      <button
                        className="ml-2 text-red-400 hover:text-red-600 focus:outline-none"
                        onClick={() => removeContact(contact.id)}
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Contact Person Button */}
            <button
              onClick={addContact}
              className="mt-4 flex items-center px-4 py-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 focus:outline-none"
            >
              <Plus size={16} className="mr-2" />
              Add Contact Person
            </button>
          </div>
        )}

        {activeTab === "remarks" && (
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Remarks{" "}
              <span className="text-xs text-gray-500">(For Internal Use)</span>
            </label>
            <textarea
              rows={4}
              className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2 text-sm resize-y"
              placeholder=""
            ></textarea>
          </div>
        )}
      </div>
    </div>
  );
}
