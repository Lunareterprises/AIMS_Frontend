import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Search,
  Plus,
  X,
  Upload,
  HelpCircle,
  Settings,
  Edit,
  Loader,
} from "lucide-react";

// Mock CommonButton component
const CommonButton = ({ onClick, label, className }) => (
  <button onClick={onClick} className={className}>
    {label}
  </button>
);

// Mock BillingAddressFormModal component
const BillingAddressFormModal = ({ isOpen, onClose, addressType, onSave }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">
          {addressType === "billing" ? "Billing" : "Shipping"} Address
        </h3>
        <div className="space-y-4">
          <input type="text" placeholder="Street Address" className="w-full border rounded px-3 py-2" />
          <input type="text" placeholder="City" className="w-full border rounded px-3 py-2" />
          <input type="text" placeholder="State" className="w-full border rounded px-3 py-2" />
          <input type="text" placeholder="ZIP Code" className="w-full border rounded px-3 py-2" />
        </div>
        <div className="flex space-x-2 mt-4">
          <button 
            onClick={() => { onSave({}); onClose(); }} 
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Mock TaxPreferencesDialog component
const TaxPreferencesDialog = ({ onClose }) => (
  <div className="absolute top-8 left-0 bg-white border border-gray-300 rounded-lg shadow-xl p-4 z-50 min-w-[300px]">
    <h4 className="font-semibold mb-2">Tax Preferences</h4>
    <div className="space-y-2">
      <label className="flex items-center">
        <input type="radio" name="tax" className="mr-2" />
        VAT Registered
      </label>
      <label className="flex items-center">
        <input type="radio" name="tax" className="mr-2" defaultChecked />
        Non VAT Registered
      </label>
    </div>
    <div className="flex space-x-2 mt-4">
      <button onClick={onClose} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
        Save
      </button>
      <button onClick={onClose} className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm">
        Cancel
      </button>
    </div>
  </div>
);

// Mock QuoteNumberPreferences component
const QuoteNumberPreferences = ({ isOpen, onClose, onSave, source }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Quote Number Preferences</h3>
        <div className="space-y-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" defaultChecked />
            Auto-generate quote numbers
          </label>
          <input 
            type="text" 
            placeholder="Prefix" 
            defaultValue="QT-" 
            className="w-full border rounded px-3 py-2" 
          />
          <input 
            type="number" 
            placeholder="Next Number" 
            defaultValue="000004" 
            className="w-full border rounded px-3 py-2" 
          />
        </div>
        <div className="flex space-x-2 mt-4">
          <button 
            onClick={() => { onSave({}); onClose(); }} 
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Mock CustomerDetailsModal component
const CustomerDetailsModal = ({ isOpen, onClose, customerData, onExternalLinkClick }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Customer Details</h3>
        <div className="space-y-2">
          <p><strong>Name:</strong> {customerData?.name}</p>
          <p><strong>Company:</strong> {customerData?.company}</p>
          <p><strong>Email:</strong> {customerData?.email}</p>
          <p><strong>Phone:</strong> {customerData?.phone}</p>
          <p><strong>Currency:</strong> {customerData?.cu_currency}</p>
        </div>
        <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Close
        </button>
      </div>
    </div>
  );
};

// Mock ManageSalespersonsModal component
const ManageSalespersonsModal = ({ isOpen, onClose, onSelectSalesperson }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Manage Salespersons</h3>
        <div className="space-y-2">
          <div 
            className="p-3 border rounded cursor-pointer hover:bg-gray-50"
            onClick={() => {
              onSelectSalesperson && onSelectSalesperson({ id: 1, name: "Sales person 1" });
              onClose();
            }}
          >
            Sales person 1
          </div>
        </div>
        <div className="flex space-x-2 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add New
          </button>
          <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate initials
const generateInitial = (name) => {
  return name ? name.charAt(0).toUpperCase() : "";
};

export default function QuoteForm() {
  // Existing dropdown states
  const [customerDropdownOpen, setCustomerDropdownOpen] = useState(false);
  const [salespersonDropdownOpen, setSalespersonDropdownOpen] = useState(false);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedCustomerData, setSelectedCustomerData] = useState(null);
  const [selectedSalesperson, setSelectedSalesperson] = useState("");
  const [selectedPlaceOfSupply, setSelectedPlaceOfSupply] = useState("Dubai");
  const [placeOfSupplyDropdownOpen, setPlaceOfSupplyDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTaxTooltip, setShowTaxTooltip] = useState(false);
  const [showCustomerDetailsModal, setShowCustomerDetailsModal] = useState(false);
  
  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("billing");
  const [configureModalOpen, setConfigureModalOpen] = useState(false);

  // Customer API states - Mock data for demo
  const [customers, setCustomers] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      company: "Acme Corporation", 
      initial: "J", 
      email: "john@acme.com", 
      phone: "123-456-7890", 
      cu_currency: "AED",
      cu_display_name: "John Doe",
      cu_company_name: "Acme Corporation",
      cu_email: "john@acme.com",
      cu_phone: "123-456-7890"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      company: "Tech Solutions Inc", 
      initial: "J", 
      email: "jane@tech.com", 
      phone: "098-765-4321", 
      cu_currency: "USD",
      cu_display_name: "Jane Smith",
      cu_company_name: "Tech Solutions Inc",
      cu_email: "jane@tech.com",
      cu_phone: "098-765-4321"
    },
    { 
      id: 3, 
      name: "Bob Johnson", 
      company: "Global Enterprises", 
      initial: "B", 
      email: "bob@global.com", 
      phone: "555-123-4567", 
      cu_currency: "AED",
      cu_display_name: "Bob Johnson",
      cu_company_name: "Global Enterprises",
      cu_email: "bob@global.com",
      cu_phone: "555-123-4567"
    }
  ]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [customerError, setCustomerError] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [showSalesPersonModal, setShowSlaesPersonModal] = useState(false);

  // Customer details panel states
  const [customerDetailsData, setCustomerDetailsData] = useState(null);
  const handleOpenCustomerDetails = () => setShowCustomerDetailsModal(true);
  const handleExternalLinkClick = (customerData) => {
    // Customizable external link behavior
  };

  const handleOpenSalesPerson = () => setShowSlaesPersonModal(true);
  const handleCloseSalesPerson = () => setShowSlaesPersonModal(false);

  // Item selection states
  const [items, setItems] = useState([
    {
      id: 1,
      name: "",
      quantity: 1.0,
      rate: 0.0,
      discount: 0,
      discountType: "%", // Add discount type state
      tax: "",
      amount: 0.0,
      isEditing: true,
    },
  ]);
  const [itemDropdownOpen, setItemDropdownOpen] = useState(null);
  const [itemSearchQuery, setItemSearchQuery] = useState("");

  // Sample items data
  const availableItems = [
    { id: 1, name: "Product A", rate: 100.0, tax: "VAT 5%" },
    { id: 2, name: "Product B", rate: 150.0, tax: "VAT 5%" },
    { id: 3, name: "Service 1", rate: 200.0, tax: "VAT 5%" },
    { id: 4, name: "Service 2", rate: 75.0, tax: "VAT 5%" },
    { id: 5, name: "Consulting", rate: 300.0, tax: "VAT 5%" },
    { id: 6, name: "Support Package", rate: 500.0, tax: "VAT 5%" },
  ];

  const filteredItems = availableItems.filter((item) =>
    item.name.toLowerCase().includes(itemSearchQuery.toLowerCase())
  );

  const handleSaveBilling = (data) => {
    console.log("Billing address saved:", data);
  };

  const handleSaveShipping = (data) => {
    console.log("Shipping address saved:", data);
  };

  const getSaveHandler = () =>
    modalType === "billing" ? handleSaveBilling : handleSaveShipping;

  const salespersons = [{ id: 1, name: "Sales person 1" }];

  const placesOfSupply = [
    { id: 1, name: "Dubai" },
    { id: 2, name: "Abu Dhabi" },
    { id: 3, name: "Sharjah" },
    { id: 4, name: "Ajman" },
  ];

  const toggleTaxTooltip = () => {
    setShowTaxTooltip((prev) => !prev);
  };

  const closeTaxTooltip = () => {
    setShowTaxTooltip(false);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearchTerm(value);
    setPage(1);
  };

  // Handle customer selection
  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer.name);
    setSelectedCustomerData(customer);
    setCustomerDropdownOpen(false);
    setSearchQuery("");
    setSearchTerm("");
  };

  // Handle closing customer details panel
  const handleCloseCustomerDetails = () => {
    setCustomerDetailsData(null);
    setShowCustomerDetailsModal(false);
  };

  // Handle new customer creation
  const handleNewCustomer = () => {
    setCustomerDropdownOpen(false);
    console.log("Opening new customer form...");
  };

  // Filter customers based on search
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Item management functions
  const addNewRow = () => {
    const newItem = {
      id: Date.now(),
      name: "",
      quantity: 1.0,
      rate: 0.0,
      discount: 0,
      discountType: "%", // Add discount type for new items
      tax: "",
      amount: 0.0,
      isEditing: true,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const updateItem = (itemId, field, value) => {
    setItems(
      items.map((item) => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value };

          // Calculate amount when quantity, rate, discount, or discountType changes
          if (
            field === "quantity" ||
            field === "rate" ||
            field === "discount" ||
            field === "discountType"
          ) {
            const quantity =
              field === "quantity" ? parseFloat(value) || 0 : item.quantity;
            const rate = field === "rate" ? parseFloat(value) || 0 : item.rate;
            const discount =
              field === "discount" ? parseFloat(value) || 0 : item.discount;
            const discountType = 
              field === "discountType" ? value : (item.discountType || "%");

            const subtotal = quantity * rate;
            let discountAmount = 0;
            
            if (discountType === "%") {
              discountAmount = (subtotal * discount) / 100;
            } else if (discountType === "AED") {
              discountAmount = discount;
            }
            
            updatedItem.amount = Math.max(0, subtotal - discountAmount);
          }

          return updatedItem;
        }
        return item;
      })
    );
  };

  const selectItem = (itemId, selectedItem) => {
    updateItem(itemId, "name", selectedItem.name);
    updateItem(itemId, "rate", selectedItem.rate);
    updateItem(itemId, "tax", selectedItem.tax);
    updateItem(itemId, "isEditing", false);
    setItemDropdownOpen(null);
    setItemSearchQuery("");
  };

  // Handle salesperson selection
  const handleSalespersonSelect = (salesperson) => {
    setSelectedSalesperson(salesperson.name);
    setSalespersonDropdownOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setCustomerDropdownOpen(false);
        setSalespersonDropdownOpen(false);
        setProjectDropdownOpen(false);
        setPlaceOfSupplyDropdownOpen(false);
      }
      
      // Handle item dropdown separately
      if (!event.target.closest(".item-dropdown-container")) {
        setItemDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white min-h-screen w-full text-gray-700">
      <div className="p-6 space-y-6">
        {/* Customer Name with Enhanced API Integration */}
        <div className="flex items-center space-x-2 w-3/5">
          <label className="text-red-500 font-medium w-32 text-sm">
            Customer Name*
          </label>
          <div className="relative flex-1 dropdown-container">
            <div
              className="border border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white text-sm"
              onClick={() => setCustomerDropdownOpen(!customerDropdownOpen)}
            >
              <span className="text-gray-500">
                {selectedCustomer || "Select or add a customer"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {customerDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                {/* Search Input */}
                <div className="p-3 border-b border-gray-100">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full pl-10 pr-8 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {isLoadingCustomers && (
                      <Loader className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 animate-spin" />
                    )}
                  </div>
                </div>

                {/* Customer List */}
                <div className="max-h-60 overflow-y-auto">
                  {filteredCustomers.length > 0 ? (
                    <>
                      {filteredCustomers.map((customer) => (
                        <div
                          key={customer.id}
                          className={`flex items-center p-3 cursor-pointer transition-colors hover:bg-gray-50 ${
                            selectedCustomerData?.id === customer.id
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : ""
                          }`}
                          onClick={() => handleCustomerSelect(customer)}
                        >
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold mr-3 ${
                              selectedCustomerData?.id === customer.id
                                ? "bg-white text-blue-500"
                                : "bg-blue-500 text-white"
                            }`}
                          >
                            {customer.initial}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className={`font-medium text-sm truncate ${
                                selectedCustomerData?.id === customer.id
                                  ? "text-white"
                                  : "text-gray-900"
                              }`}
                            >
                              {customer.name}
                            </div>
                            <div
                              className={`text-xs truncate ${
                                selectedCustomerData?.id === customer.id
                                  ? "text-blue-100"
                                  : "text-gray-500"
                              }`}
                            >
                              {customer.company}
                            </div>
                          </div>
                          {selectedCustomerData?.id === customer.id && (
                            <div className="ml-2">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="p-4 text-center">
                      <div className="text-sm text-gray-500">
                        {searchTerm
                          ? "No customers found for your search"
                          : "No customers found"}
                      </div>
                    </div>
                  )}
                </div>

                {/* New Customer Button */}
                <div className="border-t border-gray-100 p-3">
                  <button
                    className="flex items-center w-full text-left p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors group"
                    onClick={handleNewCustomer}
                  >
                    <div className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm">New Customer</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Currency Display */}
          {selectedCustomer && (
            <div className="flex items-center justify-end mt-2">
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-gray-700 font-medium text-sm">
                  {selectedCustomerData?.cu_currency}
                </span>
              </div>
            </div>
          )}
        </div>

        {selectedCustomer && (
          <>
            {/* Address Section */}
            <div className="ml-36">
              <div className="mt-4 grid grid-cols-2 gap-6">
                {/* Billing Section */}
                <div>
                  <h4 className="text-gray-600 font-medium mb-2 text-sm">
                    BILLING ADDRESS
                  </h4>
                  <CommonButton
                    onClick={() => {
                      setModalType("billing");
                      setModalOpen(true);
                    }}
                    label="New Address"
                    className="text-blue-500 text-sm hover:text-blue-700 transition-colors"
                  />
                </div>

                {/* Shipping Section */}
                <div>
                  <h4 className="text-gray-600 font-medium mb-2 text-sm">
                    SHIPPING ADDRESS
                  </h4>
                  <CommonButton
                    onClick={() => {
                      setModalType("shipping");
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
              <label className="text-red-500 font-medium w-32 text-sm">
                Place of Supply*
              </label>
              <div className="relative w-2/5 dropdown-container">
                <div
                  className="border border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white"
                  onClick={() =>
                    setPlaceOfSupplyDropdownOpen(!placeOfSupplyDropdownOpen)
                  }
                >
                  <span className="text-gray-900 font-medium">
                    {selectedPlaceOfSupply || "Select place of supply"}
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
                          <div className="font-medium text-gray-900">
                            {place.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Quote# */}
        <div className="flex items-center space-x-2">
          <label className="text-red-500 font-medium w-32 text-sm">
            Quote*
          </label>
          <div className="relative w-2/5">
            <input
              type="text"
              value="QT-000004"
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none"
              readOnly
            />
            <div className="group">
              <CommonButton
                label={<Settings className="text-blue-700 w-5" />}
                onClick={() => {
                  setConfigureModalOpen(true);
                }}
                className="absolute right-1 top-1 bottom-1 px-2"
              />
              <div className="absolute w-2/5 -top-8 right-0 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-10">
                Click here to enable or disable auto-generation of Quote
                numbers.
              </div>
            </div>
          </div>
        </div>

        {/* Reference# */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-900 font-medium w-32 text-sm">
            Reference#
          </label>
          <input
            type="text"
            className="border text-sm border-gray-300 rounded px-3 py-2 w-2/5 focus:outline-none"
          />
        </div>

        {/* Quote Date */}
        <div className="flex items-center space-x-2">
          <label className="text-red-500 font-medium w-32 text-sm">
            Quote Date*
          </label>
          <input
            type="date"
            className="border text-sm border-gray-300 rounded px-3 py-2 w-1/4 focus:outline-none"
          />
          <span className="text-gray-900 font-medium w-32 text-sm ml-20">
            Expiry Date
          </span>
          <input
            type="date"
            placeholder="dd MMM yyyy"
            className="border text-sm border-gray-300 rounded px-3 py-2 w-1/4 focus:outline-none"
          />
        </div>

        {/* Salesperson */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-900 font-medium w-32 text-sm">
            Salesperson
          </label>
          <div className="relative w-2/5 dropdown-container">
            <div
              className="border text-sm border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white"
              onClick={() =>
                setSalespersonDropdownOpen(!salespersonDropdownOpen)
              }
            >
              <span className="text-gray-500">
                {selectedSalesperson || "Select or Add Salesperson"}
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
                <div
                  className="bg-blue-500 text-white px-3 py-2 cursor-pointer"
                  onClick={() => {
                    setSelectedSalesperson("Sales person 1");
                    setSalespersonDropdownOpen(false);
                  }}
                >
                  Sales person 1
                </div>
                <div className="p-3 border-t">
                  <button
                    className="flex items-center space-x-2 text-blue-500"
                    onClick={handleOpenSalesPerson}
                  >
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
          <label className="text-gray-900 font-medium w-32 text-sm">
            Project Name
          </label>
          <div className="relative w-2/5 dropdown-container">
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
        <div className="flex items-start space-x-2 w-2/5">
          <div className="flex items-center space-x-1 w-32 text-sm">
            <label className="text-gray-900 font-medium">Subject</label>
            <div className="relative group">
              <CommonButton
                label={<HelpCircle className="w-4 h-4 text-gray-400" />}
              />
              <div className="absolute w-64 -top-16 right-0 left-0 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-50">
                You can enter up to 250 characters. If you do not require this
                field, you can mark it as inactive under quote preferences.
              </div>
            </div>
          </div>
          <textarea
            placeholder="Let your customer know what this Quote is for"
            className="border border-gray-300 rounded px-3 py-2 w-3/4 h-20 resize-none"
          />
        </div>

        {/* Item Table - Fixed with working dropdown */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Item Table</h3>
            <button className="text-blue-500 text-sm hover:underline flex items-center gap-1">
              Bulk Actions
            </button>
          </div>

          <div className="border border-gray-300 rounded-lg" style={{ overflow: 'visible' }}>
            {/* Table Header */}
            <div className="bg-gray-50 border-b border-gray-300">
              <div className="grid grid-cols-12 gap-2 px-4 py-3 text-xs font-medium text-gray-600 uppercase tracking-wide">
                <div className="col-span-4">ITEM DETAILS</div>
                <div className="col-span-1 text-center">QUANTITY</div>
                <div className="col-span-1 text-center">
                  RATE <span className="text-blue-500 ml-1">ℹ</span>
                </div>
                <div className="col-span-1 text-center">DISCOUNT</div>
                <div className="col-span-3 text-center">TAX</div>
                <div className="col-span-1 text-right">AMOUNT</div>
                <div className="col-span-1"></div>
              </div>
            </div>

            {/* Table Body */}
            <div className="bg-white" style={{ overflow: 'visible' }}>{/* Removed overflow-hidden to allow dropdown to show */}
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 items-center"
                >
                  {/* Item Details */}
                  <div className="col-span-4">
                    <div className="item-dropdown-container relative">
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 relative">
                          {item.isEditing || !item.name ? (
                            <>
                              <input
                                type="text"
                                placeholder="Type or click to select an item."
                                value={itemDropdownOpen === item.id ? itemSearchQuery : item.name}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setItemSearchQuery(value);
                                  updateItem(item.id, "name", value);
                                  if (!itemDropdownOpen) {
                                    setItemDropdownOpen(item.id);
                                  }
                                }}
                                onFocus={() => {
                                  setItemDropdownOpen(item.id);
                                  setItemSearchQuery(item.name || "");
                                }}
                                onClick={() => {
                                  setItemDropdownOpen(item.id);
                                  setItemSearchQuery(item.name || "");
                                }}
                                className="w-full text-sm text-gray-700 bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />

                              {/* Item Dropdown - FIXED */}
                              {itemDropdownOpen === item.id && (
                                <div 
                                  className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-xl min-w-[350px]"
                                  style={{ 
                                    position: 'absolute',
                                    zIndex: 1000,
                                    maxHeight: '200px',
                                    overflowY: 'auto'
                                  }}
                                >
                                  {filteredItems.length > 0 ? (
                                    <div className="max-h-48 overflow-y-auto">
                                      {filteredItems.map((availableItem) => (
                                        <div
                                          key={availableItem.id}
                                          className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            selectItem(item.id, availableItem);
                                          }}
                                        >
                                          <div className="font-medium text-gray-900 text-sm">
                                            {availableItem.name}
                                          </div>
                                          <div className="text-xs text-gray-500 mt-1">
                                            Rate: {availableItem.rate.toFixed(2)} | Tax: {availableItem.tax}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="p-3 text-sm text-gray-500 text-center">
                                      {itemSearchQuery ? `No items found for "${itemSearchQuery}"` : "No items found"}
                                    </div>
                                  )}
                                  <div className="p-2 border-t border-gray-100">
                                    <button 
                                      className="flex items-center space-x-2 text-blue-500 text-sm w-full hover:bg-blue-50 p-2 rounded transition-colors"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("Add new item clicked");
                                      }}
                                    >
                                      <Plus className="w-4 h-4" />
                                      <span>Add New Item</span>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <div
                              className="cursor-pointer hover:text-blue-600 py-2 px-3 border border-gray-300 rounded bg-gray-50"
                              onClick={() => {
                                updateItem(item.id, "isEditing", true);
                                setItemDropdownOpen(item.id);
                              }}
                            >
                              <div className="text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-1">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(item.id, "quantity", e.target.value)
                      }
                      className="w-full text-center border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      step="0.01"
                      min="0"
                    />
                  </div>

                  {/* Rate */}
                  <div className="col-span-1">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) =>
                        updateItem(item.id, "rate", e.target.value)
                      }
                      className="w-full text-center border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      step="0.01"
                      min="0"
                    />
                  </div>

                  {/* Discount */}
                  <div className="col-span-1">
                    <div className="flex items-center space-x-1">
                      <input
                        type="number"
                        value={item.discount}
                        onChange={(e) =>
                          updateItem(item.id, "discount", e.target.value)
                        }
                        className="w-16 text-center border border-gray-300 rounded px-1 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        max="100"
                      />
                      <select 
                        value={item.discountType || "%"}
                        onChange={(e) =>
                          updateItem(item.id, "discountType", e.target.value)
                        }
                        className="w-16 border border-gray-300 rounded px-1 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        style={{ 
                          position: 'relative',
                          zIndex: 100
                        }}
                      >
                        <option value="%">%</option>
                        <option value="AED">AED</option>
                      </select>
                    </div>
                  </div>

                  {/* Tax */}
                  <div className="col-span-3 items-center text-center">
                    <select
                      value={item.tax}
                      onChange={(e) =>
                        updateItem(item.id, "tax", e.target.value)
                      }
                      className="w-1/2 border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a Tax</option>
                      <option value="VAT 5%">VAT 5%</option>
                      <option value="VAT 0%">VAT 0%</option>
                      <option value="Exempt">Exempt</option>
                    </select>
                  </div>

                  {/* Amount */}
                  <div className="col-span-1 text-right">
                    <span className="text-sm font-medium text-gray-900">
                      {item.amount.toFixed(2)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <div className="col-span-1 text-center">
                    <button
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                      onClick={() => removeItem(item.id)}
                      title="Remove item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-4">
            <button
              className="flex items-center space-x-2 text-blue-500 text-sm hover:bg-blue-50 px-3 py-2 rounded border border-transparent hover:border-blue-200 transition-colors"
              onClick={addNewRow}
            >
              <Plus className="w-4 h-4" />
              <span>Add New Row</span>
            </button>
            <button className="flex items-center space-x-2 text-blue-500 text-sm hover:bg-blue-50 px-3 py-2 rounded border border-transparent hover:border-blue-200 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Items in Bulk</span>
            </button>
          </div>

          {/* Totals - Right aligned */}
          <div className="mt-8 flex justify-end">
            <div className="w-80">
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Sub Total</span>
                  <span className="text-sm font-medium">
                    {items
                      .reduce((sum, item) => sum + item.amount, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="text-xs text-gray-500 text-right">
                  (Tax Inclusive)
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900">
                      Total ( AED )
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {items
                        .reduce((sum, item) => sum + item.amount, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Notes */}
        <div className="mt-8">
          <label className="text-gray-900 font-medium block mb-2">
            Customer Notes
          </label>
          <textarea
            defaultValue="Looking forward for your business."
            className="w-full border border-gray-300 rounded px-3 py-2 h-20"
          />
        </div>

        {/* Terms & Conditions */}
        <div className="mt-6">
          <label className="text-gray-900 font-medium block mb-2">
            Terms & Conditions
          </label>
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
          <span className="font-medium">Additional Fields:</span> Start adding
          custom fields for your quotes by going to Settings ⚙️ Sales ➤ Quotes
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-8 pt-6 border-t">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
            Save as Draft
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Save and Send
          </button>
          <button className="text-gray-500 px-4 py-2">Cancel</button>
        </div>
      </div>

      {/* Fixed Customer Details Button on Right Edge */}
      {selectedCustomerData && !showCustomerDetailsModal && (
        <button
          onClick={() => {
            setCustomerDetailsData(selectedCustomerData);
            handleOpenCustomerDetails();
          }}
          className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-gray-600 hover:bg-gray-700 text-white px-3 py-4 rounded-l-lg shadow-lg transition-all duration-200 hover:px-4 z-30 group"
        >
          <div className="flex items-center space-x-2">
            <div className="transform whitespace-nowrap text-sm font-medium">
              {selectedCustomerData.name}'s Details
            </div>
            <ChevronDown className="w-4 h-4 transform rotate-90 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      )}

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
        source="quote"
      />

      {/* Customer Details Panel */}
      {showCustomerDetailsModal && customerDetailsData && (
        <CustomerDetailsModal
          isOpen={showCustomerDetailsModal}
          onClose={handleCloseCustomerDetails}
          customerData={selectedCustomerData}
          onExternalLinkClick={handleExternalLinkClick}
        />
      )}

      {showSalesPersonModal && (
        <ManageSalespersonsModal
          isOpen={showSalesPersonModal}
          onClose={handleCloseSalesPerson}
          onSelectSalesperson={handleSalespersonSelect}
        />
      )}
    </div>
  );
}
