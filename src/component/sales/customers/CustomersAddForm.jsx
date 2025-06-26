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
import { createCustomer } from "../../../api/services/sales/createCustomer";
import ImageProps from "../../imageProp/imageProp";
import Swal from "sweetalert2"; // Make sure to install: npm install sweetalert2

export default function CustomersAddForm() {
  const [loading, setLoading] = useState(false);
  const [customerType, setCustomerType] = useState("business");
  const [activeTab, setActiveTab] = useState("otherDetails");
  const [allowPortalAccess, setAllowPortalAccess] = useState(false);
  const [validationError, setValidationError] = useState(true);

  // Basic customer info state
  const [formData, setFormData] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    companyName: "",
    displayName: "",
    email: "",
    workPhone: "",
    mobile: "",
    panNo: "",
    // Other Details
    taxTreatment: "",
    placeOfSupply: "",
    taxPreference: "",
    currency: "AED- UAE Dirham",
    accountReceivable: "",
    openingBalance: "",
    paymentTerms: "Due On Receipt",
    portalLanguage: "English",
    remarks: "",
    // Additional fields
    website: "",
    department: "",
    designation: "",
    twitter: "",
    skype: "",
    facebook: "",
  });

  const [documents, setDocuments] = useState([]);

  const tabs = [
    { id: "otherDetails", label: "Other Details" },
    { id: "address", label: "Address" },
    { id: "contactPersons", label: "Contact Persons" },
    { id: "remarks", label: "Remarks" },
  ];

  const [billingAddress, setBillingAddress] = useState({
    attention: "",
    country: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    faxNumber: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    attention: "",
    country: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    faxNumber: "",
  });

  const [contacts, setContacts] = useState([
    {
      id: 1,
      salutation: "",
      firstName: "",
      lastName: "",
      email: "",
      workPhone: "",
      mobile: "",
      designation: "",
      department: "",
      skypeName: "",
    },
  ]);

  // Handle form data changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
        designation: "",
        department: "",
        skypeName: "",
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

  // Validation function
  const validate = () => {
    const errors = [];

    // Required field validations
    if (!formData.displayName.trim()) {
      errors.push("Display Name is required");
    }

    if (!formData.taxTreatment) {
      errors.push("Tax Treatment is required");
    }

    if (!formData.placeOfSupply) {
      errors.push("Place of Supply is required");
    }

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }

    if (errors.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        html: errors.map((error) => `• ${error}`).join("<br>"),
      });
      return false;
    }

    return true;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const formDataObj = new FormData();

    // Customer basic fields (with cu_ prefix)
    formDataObj.append("cu_salutation", formData.salutation);
    formDataObj.append("cu_first_name", formData.firstName.trim());
    formDataObj.append("cu_last_name", formData.lastName.trim());
    formDataObj.append("cu_company_name", formData.companyName.trim());
    formDataObj.append("cu_display_name", formData.displayName.trim());
    formDataObj.append("cu_email", formData.email.trim());
    formDataObj.append("cu_phone", formData.workPhone.trim());
    formDataObj.append("cu_mobile", formData.mobile.trim());
    formDataObj.append("cu_pan_no", formData.panNo.trim());
    formDataObj.append("cu_opening_balance", formData.openingBalance || "0");
    formDataObj.append("cu_website", formData.website.trim());
    formDataObj.append("cu_designation", formData.designation.trim());
    formDataObj.append("cu_department", formData.department.trim());
    formDataObj.append("cu_type", customerType);
    formDataObj.append("cu_currency", formData.currency);
    formDataObj.append("cu_payment_terms", formData.paymentTerms);
    formDataObj.append("cu_portal_language", formData.portalLanguage);
    formDataObj.append("cu_portal_access", allowPortalAccess ? 1 : 0);
    formDataObj.append("cu_remarks", formData.remarks.trim());

    // Tax details
    formDataObj.append("cu_tax_treatment", formData.taxTreatment);
    formDataObj.append("cu_place_supply", formData.placeOfSupply);
    formDataObj.append("cu_tax_preference", formData.taxPreference);

    // Billing address (with cu_b_addr_ prefix)
    formDataObj.append("cu_b_addr_attention", billingAddress.attention);
    formDataObj.append("cu_b_addr_country", billingAddress.country);
    formDataObj.append("cu_b_addr_address", billingAddress.address);
    formDataObj.append("cu_b_addr_city", billingAddress.city);
    formDataObj.append("cu_b_addr_state", billingAddress.state);
    formDataObj.append("cu_b_addr_pincode", billingAddress.pincode);
    formDataObj.append("cu_b_addr_phone", billingAddress.phone);
    formDataObj.append("cu_b_addr_fax_number", billingAddress.faxNumber);

    // Shipping address (with cu_s_addr_ prefix)
    formDataObj.append("cu_s_addr_attention", shippingAddress.attention);
    formDataObj.append("cu_s_addr_country", shippingAddress.country);
    formDataObj.append("cu_s_addr_address", shippingAddress.address);
    formDataObj.append("cu_s_addr_city", shippingAddress.city);
    formDataObj.append("cu_s_addr_state", shippingAddress.state);
    formDataObj.append("cu_s_addr_pincode", shippingAddress.pincode);
    formDataObj.append("cu_s_addr_phone", shippingAddress.phone);
    formDataObj.append("cu_s_addr_fax_number", shippingAddress.faxNumber);

    // Contact persons (as structured array)
    const contactPersons = contacts.map((contact) => ({
      ccp_salutation: contact.salutation,
      ccp_firstname: contact.firstName,
      ccp_lastname: contact.lastName,
      ccp_email: contact.email,
      ccp_phone: contact.workPhone,
      ccp_mobile: contact.mobile,
      ccp_designation: contact.designation,
      ccp_department: contact.department,
      ccp_skype_name: contact.skypeName,
    }));

    formDataObj.append("contact_person", JSON.stringify(contactPersons));

    // Append document files
    if (documents && documents.length > 0) {
      documents.forEach((file, index) => {
        formDataObj.append("image", file);
      });
    }

    setLoading(true);

    try {
 
      const response = await createCustomer(formDataObj);

      if (response?.result === true) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.message || "Customer added successfully",
          timer: 3000,
          timerProgressBar: true,
        }).then(() => {
          // Reset form or redirect
          window.location.reload(); // or navigate to customer list
        });
      } else {
        Swal.fire(
          "Failed!",
          response.message || "Something went wrong",
          "error"
        );
      }
    } catch (err) {
      console.error("❌ Error submitting customer:", err);
      Swal.fire("Error!", "Failed to submit customer", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle document upload
  const handleDocumentUpload = (files) => {
    setDocuments((prev) => [...prev, ...Array.from(files)]);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto bg-white p-6">
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
                <select
                  name="salutation"
                  value={formData.salutation}
                  onChange={handleInputChange}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md bg-white appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Salutation</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
              </div>
            </div>
            <div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
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
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
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
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* PAN Number */}
        <div className="flex items-start">
          <div className="w-48 pt-2">
            <label className="text-gray-800 font-medium">PAN Number</label>
          </div>
          <div className="flex-1">
            <input
              type="text"
              name="panNo"
              value={formData.panNo}
              onChange={handleInputChange}
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
                name="email"
                value={formData.email}
                onChange={handleInputChange}
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
                name="workPhone"
                value={formData.workPhone}
                onChange={handleInputChange}
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
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
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
                type="button"
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
                  <select
                    name="taxTreatment"
                    value={formData.taxTreatment}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md appearance-none border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Tax Treatment</option>
                    <option value="taxable">Taxable</option>
                    <option value="non-taxable">Non-Taxable</option>
                    <option value="exempt">Exempt</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
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
                  <select
                    name="placeOfSupply"
                    value={formData.placeOfSupply}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Place of Supply</option>
                    <option value="uae">UAE</option>
                    <option value="india">India</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Preference */}
            <div className="flex flex-col md:flex-row md:items-start">
              <div className="w-48 pt-2 mb-2 md:mb-0">
                <label className="text-gray-800 font-medium">
                  Tax Preference 
                </label>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <select
                    name="taxPreference"
                    value={formData.taxPreference}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Tax Preference</option>
                    <option value="default">Default</option>
                    <option value="custom">Custom</option>
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
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="AED- UAE Dirham">AED- UAE Dirham</option>
                    <option value="USD- US Dollar">USD- US Dollar</option>
                    <option value="EUR- Euro">EUR- Euro</option>
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
                  <select
                    name="accountReceivable"
                    value={formData.accountReceivable}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select an account</option>
                    <option value="account1">Account 1</option>
                    <option value="account2">Account 2</option>
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
                    type="number"
                    name="openingBalance"
                    value={formData.openingBalance}
                    onChange={handleInputChange}
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
                  <select
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Due On Receipt">Due On Receipt</option>
                    <option value="Net 15">Net 15</option>
                    <option value="Net 30">Net 30</option>
                    <option value="Net 60">Net 60</option>
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
                  <select
                    name="portalLanguage"
                    value={formData.portalLanguage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>
                    <option value="French">French</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Website URL */}
            <div className="flex flex-col md:flex-row md:items-start">
              <div className="w-48 pt-2 mb-2 md:mb-0">
                <label className="text-gray-800 font-medium">Website URL</label>
              </div>
              <div className="flex-1">
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* Department */}
            <div className="flex flex-col md:flex-row md:items-start">
              <div className="w-48 pt-2 mb-2 md:mb-0">
                <label className="text-gray-800 font-medium">Department</label>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Designation */}
            <div className="flex flex-col md:flex-row md:items-start">
              <div className="w-48 pt-2 mb-2 md:mb-0">
                <label className="text-gray-800 font-medium">Designation</label>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Twitter */}
            <div className="flex flex-col md:flex-row md:items-start">
              <div className="w-48 pt-2 mb-2 md:mb-0">
                <label className="text-gray-800 font-medium">Twitter</label>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="@username"
                />
              </div>
            </div>

            {/* Skype */}
            <div className="flex flex-col md:flex-row md:items-start">
              <div className="w-48 pt-2 mb-2 md:mb-0">
                <label className="text-gray-800 font-medium">Skype</label>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="skype"
                  value={formData.skype}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Facebook */}
            <div className="flex flex-col md:flex-row md:items-start">
              <div className="w-48 pt-2 mb-2 md:mb-0">
                <label className="text-gray-800 font-medium">Facebook</label>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Documents */}
            <div className="flex flex-col md:flex-row md:items-start">
              <div className="w-48 pt-2 mb-2 md:mb-0">
                <label className="text-gray-800 font-medium">Documents</label>
              </div>
              <div className="flex-1">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleDocumentUpload(e.target.files)}
                    className="hidden"
                    id="document-upload"
                    accept="image/*,.pdf,.doc,.docx"
                  />
                  <label
                    htmlFor="document-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="w-8 h-8 text-blue-500 mb-2" />
                    <span className="text-blue-500 font-medium">
                      Upload File(s)
                    </span>
                    <span className="text-gray-500 text-sm mt-1">
                      You can upload a maximum of 10 files, 10MB each
                    </span>
                  </label>
                </div>
                {documents.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      {documents.length} file(s) selected
                    </p>
                    <div className="text-xs text-gray-500">
                      {documents.map((file, index) => (
                        <div key={index}>{file.name}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Address Tab Content */}
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
                  <option value="AE">United Arab Emirates</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Address
                </label>
                <textarea
                  name="address"
                  value={billingAddress.address}
                  onChange={handleBillingChange}
                  placeholder="Complete address"
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="3"
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
                  <option value="DXB">Dubai</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  PIN Code
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={billingAddress.pincode}
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
                  type="button"
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
                  <option value="AE">United Arab Emirates</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Address
                </label>
                <textarea
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleShippingChange}
                  placeholder="Complete address"
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="3"
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
                  <option value="DXB">Dubai</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  PIN Code
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={shippingAddress.pincode}
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

        {/* Contact Persons Tab */}
        {activeTab === "contactPersons" && (
          <div className="w-full mt-5">
            {contacts.map((contact, index) => (
              <div key={contact.id} className="w-full mb-1">
                <div className="flex flex-col md:flex-row border-t border-l border-r border-gray-200">
                  {/* Salutation */}
                  <div className="w-full md:w-1/9 border-b border-gray-200 md:border-r">
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
                  <div className="w-full md:w-1/9 border-b border-gray-200 md:border-r">
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
                  <div className="w-full md:w-1/9 border-b border-gray-200 md:border-r">
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
                  <div className="w-full md:w-1/9 border-b border-gray-200 md:border-r">
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
                  <div className="w-full md:w-1/9 border-b border-gray-200 md:border-r">
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
                  <div className="w-full md:w-1/9 border-b border-gray-200 md:border-r">
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

                  {/* Designation */}
                  <div className="w-full md:w-1/9 border-b border-gray-200 md:border-r">
                    <div className="px-2 py-1 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-700">
                      DESIGNATION
                    </div>
                    <input
                      type="text"
                      value={contact.designation}
                      onChange={(e) =>
                        updateContact(contact.id, "designation", e.target.value)
                      }
                      className="w-full p-2 border-none focus:ring-0 outline-none"
                    />
                  </div>

                  {/* Department */}
                  <div className="w-full md:w-1/9 border-b border-gray-200 md:border-r">
                    <div className="px-2 py-1 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-700">
                      DEPARTMENT
                    </div>
                    <input
                      type="text"
                      value={contact.department}
                      onChange={(e) =>
                        updateContact(contact.id, "department", e.target.value)
                      }
                      className="w-full p-2 border-none focus:ring-0 outline-none"
                    />
                  </div>

                  {/* Skype Name */}
                  <div className="w-full md:w-1/9 border-b border-gray-200 md:border-r">
                    <div className="px-2 py-1 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-700">
                      SKYPE NAME
                    </div>
                    <input
                      type="text"
                      value={contact.skypeName}
                      onChange={(e) =>
                        updateContact(contact.id, "skypeName", e.target.value)
                      }
                      className="w-full p-2 border-none focus:ring-0 outline-none"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-center border-b border-gray-200 p-2">
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={() => {}}
                      >
                        <MoreVertical size={16} />
                      </button>
                      <button
                        type="button"
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
              type="button"
              onClick={addContact}
              className="mt-4 flex items-center px-4 py-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 focus:outline-none"
            >
              <Plus size={16} className="mr-2" />
              Add Contact Person
            </button>
          </div>
        )}

        {/* Remarks Tab */}
        {activeTab === "remarks" && (
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Remarks{" "}
              <span className="text-xs text-gray-500">(For Internal Use)</span>
            </label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              rows={4}
              className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2 text-sm resize-y"
              placeholder="Enter any internal remarks..."
            ></textarea>
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="mt-8 flex justify-end space-x-4">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Saving..." : "Save Customer"}
        </button>
      </div>
    </form>
  );
}
