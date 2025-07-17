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
import CommonButton from "../../../CommonUI/buttons/CommonButton";
import BillingAddressFormModal from "../../quotes/createNew/BillingAddressFormModal";
import TaxPreferencesDialog from "../../quotes/createNew/TaxPreferencesDialog";
import QuoteNumberPreferences from "../../quotes/createNew/QuoteNumberPreferences";
import CustomerDetailsModal from "../../../sales/customers/CustomerDetailsModal";
import ManageSalespersonsModal from "../../../sales/customers/ManageSalespersonsModal";
import Swal from "sweetalert2";
import {
  CREATE_TAX,
  customer_list,
  GET_ALL_SALESPERSONS,
  GET_ALL_TAXES,
  CREATE_INVOICES,
} from "../../../../api/services/sales/createCustomer";
import ItemModal from "../../quotes/createNew/ItemModal";
import { GET_ALL_ITEMS } from "../../../../api/services/authService";
import CustomTaxDropdown from "../../quotes/CustomTaxDropdown";
import ConfigureTerms from "./ConfigureTerms";

// Helper function to generate initials
const generateInitial = (name) => {
  return name ? name.charAt(0).toUpperCase() : "";
};

export default function InvoiceForm() {
  // AUTO-INCREMENT INVOICE NUMBER STATE
  const [invoiceNumberConfig, setInvoiceNumberConfig] = useState({
    prefix: "INV-",
    nextNumber: 1,
    digitLength: 6,
    autoGenerate: true,
    suffix: "",
    restartNumbering: false,
    selectedOption: "",
    selectedYearFormat: "",
  });

  const [formData, setFormData] = useState({
    // Backend field mappings
    customer_id: null,
    customerData: null,
    invoice_number: "", 
    order_number: "",
    invoice_date: "", 
    terms: "",
    due_date: "",
    account_receivable: "", 
    sales_person: null, 
    salespersonData: null,
    project_id: "",
    projectData: null,
    supply_place: "",
    tax_treatment: "",
    subject: "",
    tax_preference: "",
    customer_note: "Looking forward for your business.", 
    terms_condition: "",
    template: "standard",

    // Recurring invoice fields - Added
    is_recurring: false,
    profile_name: "",
    repeat_every: "",
    start_on: "",
    ends_on: "",
    never_expires: false,
    payment_terms: "",
    account_receivable_sec: "",

    // Financial Fields
    sub_total: 0,
    discount: 0,
    shippingCharge: 0, // Changed from 'shipping_charge'
    adjustments: 0, // Changed from 'adjustment'
    tax_rate: 0, // Added
    tax_type: "", // Added
    tcs_tds: null,
    tcs_tds_id: null,
    total: 0,

    // Items Array
    items: [
      {
        id: 1,
        item_id: null,
        name: "", 
        description: "",
        quantity: 1.0,
        rate: 0.0,
        discount: 0,
        discount_type: "%",
        tax_id: null,
        tax: "",
        amount: 0.0,
        isEditing: true,
      },
    ],

    // Status
    status: "draft",

    // File upload - Added
    file: null,
  });

  // UI States
  const [customerDropdownOpen, setCustomerDropdownOpen] = useState(false);
  const [salespersonDropdownOpen, setSalespersonDropdownOpen] = useState(false);
  const [placeOfSupplyDropdownOpen, setPlaceOfSupplyDropdownOpen] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTaxTooltip, setShowTaxTooltip] = useState(false);
  const [showCustomerDetailsModal, setShowCustomerDetailsModal] =
    useState(false);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("billing");
  const [configureModalOpen, setConfigureModalOpen] = useState(false);
  const [itemActionsDropdown, setItemActionsDropdown] = useState(null);
  const [showSalesPersonModal, setShowSalesPersonModal] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);

  // API Data States
  const [customers, setCustomers] = useState([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [customerError, setCustomerError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const [salespersons, setSalespersons] = useState([]);
  const [isLoadingSalespersons, setIsLoadingSalespersons] = useState(false);
  const [salespersonError, setSalespersonError] = useState(null);
  const [salespersonSearchTerm, setSalespersonSearchTerm] = useState("");
  const [salespersonPage, setSalespersonPage] = useState(1);
  const [salespersonLimit] = useState(20);
  const [salespersonHasMore, setSalespersonHasMore] = useState(false);
  const [salespersonSearchTimeout, setSalespersonSearchTimeout] =
    useState(null);

  const [taxes, setTaxes] = useState([]);
  const [isLoadingTaxes, setIsLoadingTaxes] = useState(false);
  const [taxError, setTaxError] = useState(null);
  const [taxSearchTerm, setTaxSearchTerm] = useState("");
  const [taxPage, setTaxPage] = useState(1);
  const [taxLimit] = useState(20);
  const [taxHasMore, setTaxHasMore] = useState(false);
  const [taxSearchTimeout, setTaxSearchTimeout] = useState(null);
  const [isCreatingTax, setIsCreatingTax] = useState(false);

  const [availableItems, setAvailableItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [itemsError, setItemsError] = useState(null);

  const [termsDropdownOpen, setTermsDropdownOpen] = useState(false);
  const [itemsPage, setItemsPage] = useState(1);
  const [itemsLimit] = useState(20);
  const [itemsHasMore, setItemsHasMore] = useState(false);
  const [itemsSearchTerm, setItemsSearchTerm] = useState("");
  const [itemsSearchTimeout, setItemsSearchTimeout] = useState(null);

  const [itemDropdownOpen, setItemDropdownOpen] = useState(null);
  const [itemSearchQuery, setItemSearchQuery] = useState("");

  // Invoice saving states
  const [isSavingInvoice, setIsSavingInvoice] = useState(false);
  const [saveMode, setSaveMode] = useState("");

  const [customerDetailsData, setCustomerDetailsData] = useState(null);

  // File upload states - Added
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const [paymentTerms, setPaymentTerms] = useState([
    { id: 1, name: "Net 15", days: 15, isDefault: false },
    { id: 2, name: "Net 30", days: 30, isDefault: true },
    { id: 3, name: "Net 45", days: 45, isDefault: false },
    { id: 4, name: "Net 60", days: 60, isDefault: false },
  ]);

  const [showConfigureTermsModal, setShowConfigureTermsModal] = useState(false);
  const [newTermName, setNewTermName] = useState("");
  const [newTermDays, setNewTermDays] = useState("");

  const builtInTermsOptions = [
    { value: "Due on Receipt", label: "Due on Receipt", days: 0 },
    {
      value: "Due end of the month",
      label: "Due end of the month",
      days: "end_of_month",
    },
    {
      value: "Due end of next month",
      label: "Due end of next month",
      days: "end_of_next_month",
    },
  ];

  // File upload handler - Added
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    
    // Validate file constraints
    if (uploadedFiles.length + files.length > 5) {
      Swal.fire("Error", "You can upload a maximum of 5 files", "error");
      return;
    }

    // Check file sizes (10MB max per file)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    const invalidFiles = files.filter(file => file.size > maxSize);
    
    if (invalidFiles.length > 0) {
      Swal.fire("Error", "Each file must be less than 10MB", "error");
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process (replace with actual upload logic)
    setTimeout(() => {
      const newFiles = files.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        file: file
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setIsUploading(false);
      
      // Store first file for backend (or handle multiple files as needed)
      if (files.length > 0) {
        handleFormDataChange("file", files[0]);
      }
    }, 1000);
  };

  // Remove uploaded file - Added
  const removeUploadedFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    
    // Clear file from form data if it was the selected one
    const removedFile = uploadedFiles.find(file => file.id === fileId);
    if (removedFile && formData.file === removedFile.file) {
      handleFormDataChange("file", null);
    }
  };

  // Calculate due date based on terms
  const calculateDueDate = (invoiceDate, selectedTerm) => {
    if (!invoiceDate || !selectedTerm) return "";

    const date = new Date(invoiceDate);

    // Check if it's a built-in term
    const builtInTerm = builtInTermsOptions.find(
      (term) => term.value === selectedTerm
    );
    if (builtInTerm) {
      if (builtInTerm.days === 0) {
        // Due on Receipt - same as invoice date
        return invoiceDate;
      } else if (builtInTerm.days === "end_of_month") {
        // Due end of the month
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return endOfMonth.toISOString().split("T")[0];
      } else if (builtInTerm.days === "end_of_next_month") {
        // Due end of next month
        const endOfNextMonth = new Date(
          date.getFullYear(),
          date.getMonth() + 2,
          0
        );
        return endOfNextMonth.toISOString().split("T")[0];
      }
    }

    // Check if it's a custom payment term
    const customTerm = paymentTerms.find((term) => term.name === selectedTerm);
    if (customTerm && customTerm.days) {
      date.setDate(date.getDate() + customTerm.days);
      return date.toISOString().split("T")[0];
    }

    return "";
  };

  // Handle terms selection
  const handleTermsChange = (selectedTerm) => {
    handleFormDataChange("terms", selectedTerm);

    // Auto-calculate due date
    if (formData.invoice_date) {
      const newDueDate = calculateDueDate(formData.invoice_date, selectedTerm);
      if (newDueDate) {
        handleFormDataChange("due_date", newDueDate);
      }
    }
  };

  // Handle adding new payment term
  const handleAddNewTerm = () => {
    if (newTermName.trim() && newTermDays && !isNaN(newTermDays)) {
      const newTerm = {
        id: Date.now(),
        name: newTermName.trim(),
        days: parseInt(newTermDays),
        isDefault: false,
      };
      setPaymentTerms([...paymentTerms, newTerm]);
      setNewTermName("");
      setNewTermDays("");
    }
  };

  // Handle marking term as default
  const handleMarkAsDefault = (termId) => {
    setPaymentTerms((terms) =>
      terms.map((term) => ({
        ...term,
        isDefault: term.id === termId,
      }))
    );
  };

  // Handle deleting payment term
  const handleDeleteTerm = (termId) => {
    setPaymentTerms((terms) => terms.filter((term) => term.id !== termId));
  };

  // Handle saving payment terms
  const handleSavePaymentTerms = () => {
    setShowConfigureTermsModal(false);
    // You can add API call here to save terms to backend
  };

  // Auto-update due date when invoice date changes
  useEffect(() => {
    if (formData.invoice_date && formData.terms) {
      const newDueDate = calculateDueDate(
        formData.invoice_date,
        formData.terms
      );
      if (newDueDate && newDueDate !== formData.due_date) {
        handleFormDataChange("due_date", newDueDate);
      }
    }
  }, [formData.invoice_date, formData.terms]);

  // Set default invoice date and initialize invoice number on mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    handleFormDataChange("invoice_date", today);
    initializeInvoiceNumber();

    // Set default payment term
    const defaultTerm = paymentTerms.find((term) => term.isDefault);
    if (defaultTerm && !formData.terms) {
      handleFormDataChange("terms", defaultTerm.name);
      handleFormDataChange("payment_terms", defaultTerm.name); // Added for backend
    }
  }, []);

  // AUTO-INCREMENT FUNCTIONS
  const generateNextInvoiceNumber = () => {
    const { prefix, nextNumber, digitLength, suffix } = invoiceNumberConfig;
    const paddedNumber = nextNumber.toString().padStart(digitLength, "0");
    return `${prefix}${paddedNumber}${suffix}`;
  };

  const getNextInvoiceNumber = () => {
    try {
      const lastNumber = localStorage.getItem("lastInvoiceNumber");
      const lastInvoiceConfig = localStorage.getItem("invoiceNumberConfig");

      if (lastInvoiceConfig) {
        const config = JSON.parse(lastInvoiceConfig);
        return config.nextNumber || (lastNumber ? parseInt(lastNumber) + 1 : 1);
      }

      return lastNumber ? parseInt(lastNumber) + 1 : 1;
    } catch (error) {
      console.error("Error getting next invoice number:", error);
      return 1;
    }
  };

  const updateInvoiceNumberSequence = (currentNumber) => {
    try {
      const numberMatch = currentNumber.match(/(\d+)/);
      if (numberMatch) {
        const extractedNumber = parseInt(numberMatch[0]);

        localStorage.setItem("lastInvoiceNumber", extractedNumber.toString());

        const updatedConfig = {
          ...invoiceNumberConfig,
          nextNumber: extractedNumber + 1,
        };

        localStorage.setItem(
          "invoiceNumberConfig",
          JSON.stringify(updatedConfig)
        );
        setInvoiceNumberConfig(updatedConfig);

        console.log(
          `Invoice number sequence updated. Next number will be: ${
            extractedNumber + 1
          }`
        );
      }
    } catch (error) {
      console.error("Error updating invoice number sequence:", error);
    }
  };

  const initializeInvoiceNumber = () => {
    try {
      const savedConfig = localStorage.getItem("invoiceNumberConfig");
      let configToUse = { ...invoiceNumberConfig };

      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        configToUse = { ...invoiceNumberConfig, ...parsedConfig };
        setInvoiceNumberConfig(configToUse);
      }

      if (configToUse.autoGenerate) {
        const nextNumber = getNextInvoiceNumber();
        configToUse.nextNumber = nextNumber;

        const { prefix, digitLength, suffix } = configToUse;
        const paddedNumber = nextNumber.toString().padStart(digitLength, "0");
        const newInvoiceNumber = `${prefix}${paddedNumber}${suffix}`;

        handleFormDataChange("invoice_number", newInvoiceNumber);
        setInvoiceNumberConfig(configToUse);
      }
    } catch (error) {
      console.error("Error initializing invoice number:", error);
      handleFormDataChange("invoice_number", "INV-000001");
    }
  };

  const handleInvoiceNumberConfigChange = (newConfig) => {
    const updatedConfig = {
      ...invoiceNumberConfig,
      ...newConfig,
    };

    setInvoiceNumberConfig(updatedConfig);
    localStorage.setItem("invoiceNumberConfig", JSON.stringify(updatedConfig));

    console.log("Invoice number config updated:", updatedConfig);
  };

  const generateManualInvoiceNumber = () => {
    const nextNumber = getNextInvoiceNumber();
    const updatedConfig = {
      ...invoiceNumberConfig,
      nextNumber: nextNumber,
    };

    setInvoiceNumberConfig(updatedConfig);
    localStorage.setItem("invoiceNumberConfig", JSON.stringify(updatedConfig));

    const newInvoiceNumber = generateNextInvoiceNumber();
    handleFormDataChange("invoice_number", newInvoiceNumber);
  };

  const toggleAutoGeneration = (enabled) => {
    const updatedConfig = {
      ...invoiceNumberConfig,
      autoGenerate: enabled,
    };

    handleInvoiceNumberConfigChange(updatedConfig);

    if (enabled) {
      const nextNumber = getNextInvoiceNumber();
      updatedConfig.nextNumber = nextNumber;
      setInvoiceNumberConfig(updatedConfig);

      const newInvoiceNumber = generateNextInvoiceNumber();
      handleFormDataChange("invoice_number", newInvoiceNumber);
    }
  };

  const generateNewInvoiceForNext = () => {
    if (invoiceNumberConfig.autoGenerate) {
      const newInvoiceNumber = generateNextInvoiceNumber();
      handleFormDataChange("invoice_number", newInvoiceNumber);
    }
  };

  // GENERIC FORM DATA HANDLER
  const handleFormDataChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ITEMS HANDLER
  const handleItemsChange = (newItems) => {
    setFormData((prev) => ({
      ...prev,
      items: newItems,
    }));
  };

  // UPDATE SINGLE ITEM
  const updateItem = (itemId, updates) => {
    const newItems = formData.items.map((item) => {
      if (item.id === itemId) {
        const updatedItem = { ...item, ...updates };

        // Calculate amount when quantity, rate, discount, or discountType changes
        if (
          updates.hasOwnProperty("quantity") ||
          updates.hasOwnProperty("rate") ||
          updates.hasOwnProperty("discount") ||
          updates.hasOwnProperty("discount_type")
        ) {
          const quantity = parseFloat(updatedItem.quantity) || 0;
          const rate = parseFloat(updatedItem.rate) || 0;
          const discount = parseFloat(updatedItem.discount) || 0;
          const discountType = updatedItem.discount_type || "%";

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
    });

    handleItemsChange(newItems);
  };

  const updateSingleField = (itemId, field, value) => {
    updateItem(itemId, { [field]: value });
  };

  // Update the invoice number when config changes
  useEffect(() => {
    if (invoiceNumberConfig.autoGenerate) {
      const newInvoiceNumber = generateNextInvoiceNumber();
      handleFormDataChange("invoice_number", newInvoiceNumber);
    }
  }, [
    invoiceNumberConfig.prefix,
    invoiceNumberConfig.digitLength,
    invoiceNumberConfig.suffix,
    invoiceNumberConfig.nextNumber,
  ]);

  // CALCULATE TOTALS
  const calculateTotals = () => {
    const subtotal = formData.items.reduce(
      (sum, item) => sum + (item.amount || 0),
      0
    );

    const taxBreakdown = formData.items.reduce((acc, item) => {
      if (
        item.tax &&
        item.amount > 0 &&
        item.tax !== "Exempt" &&
        item.tax !== "Out of Scope"
      ) {
        const taxRate = item.tax;
        if (!acc[taxRate]) {
          acc[taxRate] = 0;
        }

        const taxMatch = taxRate.match(/(\d+(?:\.\d+)?)/);
        const taxPercentage = taxMatch ? parseFloat(taxMatch[0]) : 0;
        const taxAmount = (item.amount * taxPercentage) / 100;
        acc[taxRate] += taxAmount;
      }
      return acc;
    }, {});

    const totalTax = Object.values(taxBreakdown).reduce(
      (sum, tax) => sum + tax,
      0
    );
    const grandTotal = subtotal + totalTax;

    return {
      subtotal,
      taxBreakdown,
      totalTax,
      grandTotal,
    };
  };

  // CREATE INVOICE API FUNCTION - Updated with correct field mapping
  const handleCreateInvoice = async (isDraft = false) => {
    // Validation
    if (!formData.customer_id) {
      Swal.fire("Error", "Please select a customer", "error");
      return;
    }

    if (!formData.invoice_date) {
      Swal.fire("Error", "Please select an invoice date", "error");
      return;
    }

    if (!formData.supply_place) {
      Swal.fire("Error", "Please select place of supply", "error");
      return;
    }

    // Check if there are valid items with proper validation
    const validItems = formData.items.filter(
      (item) =>
        (item.description && item.description.trim() !== "") ||
        (item.name && item.name.trim() !== "") &&
        parseFloat(item.quantity) > 0 &&
        parseFloat(item.rate) >= 0 &&
        !isNaN(parseFloat(item.quantity)) &&
        !isNaN(parseFloat(item.rate))
    );

    if (validItems.length === 0) {
      Swal.fire("Error", "Please add at least one valid item with name/description, quantity, and rate", "error");
      return;
    }

    // Validate each item has required fields
    for (let i = 0; i < validItems.length; i++) {
      const item = validItems[i];
      if (!item.description && !item.name) {
        Swal.fire("Error", `Item ${i + 1}: Name or Description is required`, "error");
        return;
      }
      if (!item.quantity || parseFloat(item.quantity) <= 0) {
        Swal.fire("Error", `Item ${i + 1}: Quantity must be greater than 0`, "error");
        return;
      }
      if (item.rate === undefined || item.rate === null || isNaN(parseFloat(item.rate))) {
        Swal.fire("Error", `Item ${i + 1}: Rate is required`, "error");
        return;
      }
    }

    setIsSavingInvoice(true);
    setSaveMode(isDraft ? "draft" : "send");

    try {
      // Helper function to get tax ID from tax value
      const getTaxId = (taxValue) => {
        if (!taxValue) return null;

        // For hardcoded options
        if (taxValue === "Exempt" || taxValue === "Out of Scope") {
          return null;
        }

        // For API taxes, find the matching tax
        const matchedTax = taxes.find((tax) => 
          tax.value === taxValue || 
          tax.label === taxValue ||
          tax.name === taxValue
        );
        return matchedTax ? matchedTax.id : null;
      };

      // Calculate totals
      const totals = calculateTotals();

      // Get primary tax rate and type from items (you may need to adjust this logic)
      const primaryTax = formData.items.find(item => item.tax && item.tax !== "Exempt" && item.tax !== "Out of Scope");
      const taxMatch = primaryTax?.tax?.match(/(\d+(?:\.\d+)?)/);
      const primaryTaxRate = taxMatch ? parseFloat(taxMatch[0]) : 0;

      // Prepare FormData for file upload
      const formDataToSend = new FormData();

      // Map frontend fields to backend expected field names
      formDataToSend.append('customer_id', formData.customer_id.toString());
      formDataToSend.append('invoice_number', formData.invoice_number || '');
      formDataToSend.append('order_number', formData.order_number || '');
      formDataToSend.append('invoice_date', formData.invoice_date);
      formDataToSend.append('terms', formData.terms || '');
      formDataToSend.append('due_date', formData.due_date || '');
      formDataToSend.append('account_receivable', formData.account_receivable || '');
      formDataToSend.append('sales_person', formData.sales_person ? formData.sales_person.toString() : '');
      formDataToSend.append('subject', formData.subject || '');
      formDataToSend.append('customer_note', formData.customer_note || '');
      formDataToSend.append('terms_condition', formData.terms_condition || '');
      formDataToSend.append('is_recurring', formData.is_recurring ? 'true' : 'false');
      formDataToSend.append('profile_name', formData.profile_name || '');
      formDataToSend.append('repeat_every', formData.repeat_every || '');
      formDataToSend.append('start_on', formData.start_on || '');
      formDataToSend.append('ends_on', formData.ends_on || '');
      formDataToSend.append('never_expires', formData.never_expires ? 'true' : 'false');
      formDataToSend.append('payment_terms', formData.payment_terms || formData.terms || '');
      formDataToSend.append('account_receivable_sec', formData.account_receivable_sec || '');
      formDataToSend.append('sub_total', totals.subtotal.toFixed(2));
      formDataToSend.append('total', (
        totals.grandTotal +
        parseFloat(formData.shippingCharge || 0) +
        parseFloat(formData.adjustments || 0) +
        parseFloat(formData.tcs_tds || 0) -
        parseFloat(formData.discount || 0)
      ).toFixed(2));
      formDataToSend.append('discount', (parseFloat(formData.discount || 0)).toFixed(2));
      formDataToSend.append('tax_rate', primaryTaxRate.toString());
      formDataToSend.append('tax_type', primaryTax?.tax || '');
      formDataToSend.append('adjustments', (parseFloat(formData.adjustments || 0)).toFixed(2));
      formDataToSend.append('shippingCharge', (parseFloat(formData.shippingCharge || 0)).toFixed(2));

      // Prepare items with proper validation and formatting
      const itemsData = validItems.map((item, index) => {
        const taxId = getTaxId(item.tax);
        
        return {
          item_id: item.item_id || null, 
          name: item.name || '',
          description: item.description.trim(),
          quantity: parseFloat(item.quantity),
          rate: parseFloat(item.rate),
          discount: parseFloat(item.discount || 0),
          discount_type: item.discount_type || '%',
          tax_id: taxId,
          tax: item.tax || '',
          amount: parseFloat(item.amount || 0),
          unit: item.unit || 'pcs',
          hsn_code: item.hsn_code || '',
          item_type: item.item_type || 'product'
        };
      });

      // Log items data for debugging
      console.log("Items data being sent:", itemsData);

      // Add items as JSON string (or as individual form fields if backend expects that)
      formDataToSend.append('items', JSON.stringify(itemsData));

      // Alternative: If backend expects items as separate form fields
      // itemsData.forEach((item, index) => {
      //   Object.keys(item).forEach(key => {
      //     formDataToSend.append(`items[${index}][${key}]`, item[key] || '');
      //   });
      // });

      // Add file if exists
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      // Add status
      formDataToSend.append('status', isDraft ? "draft" : "sent");

      console.log("Invoice data being sent to API:");
      // Log FormData contents
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      // Log the JSON parsed items for debugging
      console.log("Items JSON:", JSON.parse(formDataToSend.get('items')));

      const response = await CREATE_INVOICES(formDataToSend);

      console.log({ response }, "response from create invoice");
      if (response.result) {
        // Update invoice number sequence after successful creation
        if (invoiceNumberConfig.autoGenerate) {
          updateInvoiceNumberSequence(formData.invoice_number);
        }

        // Success handling
        if (isDraft) {
          Swal.fire({
            title: "Success!",
            text: "Invoice saved as draft successfully",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            if (invoiceNumberConfig.autoGenerate) {
              generateNewInvoiceForNext();
            }
          });
        } else {
          Swal.fire({
            title: "Success!",
            text: "Invoice saved and sent successfully",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            if (invoiceNumberConfig.autoGenerate) {
              generateNewInvoiceForNext();
            }
          });
        }

        console.log("Invoice created successfully:", response);
      } else {
        // Show detailed error message
        let errorMessage = response.message || "Failed to save invoice";
        
        if (response.errors && Array.isArray(response.errors)) {
          errorMessage += "\n\nDetails:\n" + response.errors.join("\n");
        }

        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error creating invoice:", error);

      let errorMessage = "Failed to save invoice. Please try again.";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
        if (error.response.data.errors) {
          errorMessage += "\n\nDetails:\n" + error.response.data.errors.join("\n");
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSavingInvoice(false);
      setSaveMode("");
    }
  };

  // Fetch Customers
  const fetchCustomers = async (filterLabel = "", resetPage = false) => {
    setIsLoadingCustomers(true);
    setCustomerError(null);

    try {
      const currentPage = resetPage ? 1 : page;
      const body = {
        search: searchTerm,
        page: currentPage,
        limit,
        filters: filterLabel,
      };

      const response = await customer_list(body);

      const transformedData = (response.list || []).map((customer) => ({
        ...customer,
        id: customer.cu_id,
        name:
          customer.cu_display_name || customer.cu_name || customer.name || "",
        company: customer.cu_company_name || customer.company || "",
        initial: generateInitial(
          customer.cu_display_name || customer.cu_name || customer.name || ""
        ),
        email: customer.cu_email || customer.email || "",
        phone: customer.cu_phone || customer.phone || "",
      }));

      if (resetPage || currentPage === 1) {
        setCustomers(transformedData || []);
      } else {
        setCustomers((prev) => [...prev, ...(transformedData || [])]);
      }

      setTotalPages(Math.ceil((response.total_count || 0) / limit));
      setHasMore(currentPage < Math.ceil((response.total_count || 0) / limit));

      if (resetPage) {
        setPage(1);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomerError("Failed to fetch customers");
      Swal.fire("Error", "Failed to fetch customers", "error");
    } finally {
      setIsLoadingCustomers(false);
    }
  };

  // Fetch Salespersons
  const fetchSalespersons = async (searchTerm = "", resetPage = false) => {
    setIsLoadingSalespersons(true);
    setSalespersonError(null);

    try {
      const currentPage = resetPage ? 1 : salespersonPage;
      const body = {
        search: searchTerm,
        page: currentPage,
        limit: salespersonLimit,
      };

      const response = await GET_ALL_SALESPERSONS(body);

      const transformedSalespersons = (
        response.data ||
        response.salespersons ||
        response.list ||
        []
      ).map((salesperson) => ({
        id: salesperson.sp_id || salesperson.id,
        name: salesperson.sp_name || salesperson.name || "",
        email: salesperson.sp_email || salesperson.email || "",
        phone: salesperson.sp_phone || salesperson.phone || "",
        initial: generateInitial(salesperson.sp_name || salesperson.name || ""),
      }));

      if (resetPage || currentPage === 1) {
        setSalespersons(transformedSalespersons);
      } else {
        setSalespersons((prev) => [...prev, ...transformedSalespersons]);
      }

      const totalCount =
        response.total_count || response.total || response.count || 0;
      const totalPages = Math.ceil(totalCount / salespersonLimit);
      setSalespersonHasMore(currentPage < totalPages);

      if (resetPage) {
        setSalespersonPage(1);
      }
    } catch (error) {
      console.error("Error fetching salespersons:", error);
      setSalespersonError("Failed to fetch salespersons");
      Swal.fire("Error", "Failed to fetch salespersons", "error");
    } finally {
      setIsLoadingSalespersons(false);
    }
  };

  // Load more salespersons
  const loadMoreSalespersons = async () => {
    if (salespersonHasMore && !isLoadingSalespersons) {
      setSalespersonPage((prev) => prev + 1);
    }
  };

  // Handle salesperson search
  const handleSalespersonsSearch = (searchTerm) => {
    setSalespersonSearchTerm(searchTerm);

    if (salespersonSearchTimeout) {
      clearTimeout(salespersonSearchTimeout);
    }

    const newTimeout = setTimeout(() => {
      setSalespersonPage(1);
      fetchSalespersons(searchTerm, true);
    }, 300);

    setSalespersonSearchTimeout(newTimeout);
  };

  // Fetch Taxes
  const fetchTaxes = async (searchTerm = "", resetPage = false) => {
    setIsLoadingTaxes(true);
    setTaxError(null);

    try {
      const currentPage = resetPage ? 1 : taxPage;
      const body = {
        search: searchTerm,
        page: currentPage,
        limit: taxLimit,
      };

      const response = await GET_ALL_TAXES(body);

      const transformedTaxes = (
        response.data ||
        response.taxes ||
        response.list ||
        []
      ).map((tax) => ({
        id: tax.tax_id || tax.id,
        name: tax.tax_name || tax.name || "",
        rate: parseFloat(tax.tax_rate || tax.rate || 0),
        type: tax.tax_type || tax.type || "",
        description: tax.tax_description || tax.description || "",
        label: tax.tax_name
          ? `${tax.tax_name} [${tax.tax_rate || 0}%]`
          : `Tax ${tax.tax_rate || 0}%`,
        value: tax.tax_name
          ? `${tax.tax_name} ${tax.tax_rate || 0}%`
          : `TAX ${tax.tax_rate || 0}%`,
      }));

      if (resetPage || currentPage === 1) {
        setTaxes(transformedTaxes);
      } else {
        setTaxes((prev) => [...prev, ...transformedTaxes]);
      }

      const totalCount =
        response.total_count || response.total || response.count || 0;
      const totalPages = Math.ceil(totalCount / taxLimit);
      setTaxHasMore(currentPage < totalPages);

      if (resetPage) {
        setTaxPage(1);
      }
    } catch (error) {
      console.error("Error fetching taxes:", error);
      setTaxError("Failed to fetch taxes");
      Swal.fire("Error", "Failed to fetch taxes", "error");
    } finally {
      setIsLoadingTaxes(false);
    }
  };

  // Load more taxes
  const loadMoreTaxes = async () => {
    if (taxHasMore && !isLoadingTaxes) {
      setTaxPage((prev) => prev + 1);
    }
  };

  // Handle tax search
  const handleTaxSearch = (searchTerm) => {
    setTaxSearchTerm(searchTerm);

    if (taxSearchTimeout) {
      clearTimeout(taxSearchTimeout);
    }

    const newTimeout = setTimeout(() => {
      setTaxPage(1);
      fetchTaxes(searchTerm, true);
    }, 300);

    setTaxSearchTimeout(newTimeout);
  };

  // Fetch Items
  const fetchItems = async (searchTerm = "", resetPage = false) => {
    setIsLoadingItems(true);
    setItemsError(null);

    try {
      const currentPage = resetPage ? 1 : itemsPage;
      const body = {
        search: searchTerm,
        page: currentPage,
        limit: itemsLimit,
      };

      const response = await GET_ALL_ITEMS(body);

      const transformedItems = (
        response.data ||
        response.items ||
        response.list ||
        []
      ).map((item) => ({
        id: item.i_id,
        name: item.i_name,
        rate: parseFloat(item.i_sales_price || 0),
        tax: item.tax || item.tax_rate || "VAT 5%",
        description: item.i_sales_description || "",
        unit: item.i_weight_unit || item.uom || "pcs",
      }));

      if (resetPage || currentPage === 1) {
        setAvailableItems(transformedItems);
      } else {
        setAvailableItems((prev) => [...prev, ...transformedItems]);
      }

      const totalCount =
        response.total_count || response.total || response.count || 0;
      const totalPages = Math.ceil(totalCount / itemsLimit);
      setItemsHasMore(currentPage < totalPages);

      if (resetPage) {
        setItemsPage(1);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      setItemsError("Failed to fetch items");
      Swal.fire("Error", "Failed to fetch items", "error");
    } finally {
      setIsLoadingItems(false);
    }
  };

  // Create Tax
  const handleCreateTax = async (taxData) => {
    setIsCreatingTax(true);

    try {
      const response = await CREATE_TAX({
        tax_name: taxData.name,
        tax_rate: taxData.rate,
      });

      const newTax = {
        id: response.tax_id || Date.now(),
        name: taxData.name,
        rate: taxData.rate,
        label: taxData.label,
        value: taxData.value,
        description: response.description || "",
      };

      setTaxes((prevTaxes) => [newTax, ...prevTaxes]);
      Swal.fire("Success", "Tax created successfully", "success");
    } catch (error) {
      console.error("Error creating tax:", error);
      Swal.fire("Error", "Failed to create tax", "error");
    } finally {
      setIsCreatingTax(false);
    }
  };

  // Fetch all data on mount
  useEffect(() => {
    fetchCustomers("", true);
    fetchSalespersons("", true);
    fetchTaxes("", true);
    fetchItems("", true);
  }, []);

  // Fetch salespersons when page changes
  useEffect(() => {
    if (salespersonPage > 1) {
      fetchSalespersons(salespersonSearchTerm);
    }
  }, [salespersonPage]);

  // Fetch taxes when page changes
  useEffect(() => {
    if (taxPage > 1) {
      fetchTaxes(taxSearchTerm);
    }
  }, [taxPage]);

  // Fetch customers when page changes
  useEffect(() => {
    if (page > 1) {
      fetchCustomers();
    }
  }, [page]);

  // Fetch items when page changes
  useEffect(() => {
    if (itemsPage > 1) {
      fetchItems(itemsSearchTerm);
    }
  }, [itemsPage]);

  // Cleanup search timeouts
  useEffect(() => {
    return () => {
      if (salespersonSearchTimeout) {
        clearTimeout(salespersonSearchTimeout);
      }
      if (taxSearchTimeout) {
        clearTimeout(taxSearchTimeout);
      }
      if (itemsSearchTimeout) {
        clearTimeout(itemsSearchTimeout);
      }
    };
  }, [salespersonSearchTimeout, taxSearchTimeout, itemsSearchTimeout]);

  // Customer selection handler
  const handleCustomerSelect = (customer) => {
    handleFormDataChange("customer_id", customer.id);
    handleFormDataChange("customerData", customer);

    // Set customer's tax treatment automatically
    const customerTaxTreatment =
      customer.cu_tax_treatment ||
      customer.tax_treatment ||
      customer.taxTreatment ||
      "Non VAT Registered";

    handleFormDataChange("tax_treatment", customerTaxTreatment);

    setCustomerDropdownOpen(false);
    setSearchQuery("");
    setSearchTerm("");
  };

  // Salesperson selection handler
  const handleSalespersonSelect = (salesperson) => {
    handleFormDataChange("sales_person", salesperson.id); // Changed from sales_person_id
    handleFormDataChange("salespersonData", salesperson);
    setSalespersonDropdownOpen(false);
    setSalespersonSearchTerm("");
  };
  // Add new item row
  const addNewRow = () => {
    const newItem = {
      id: Date.now(),
      item_id: null,
      name: "", // Added name field
      description: "",
      quantity: 1.0,
      rate: 0.0,
      discount: 0,
      discount_type: "%",
      tax_id: null,
      tax: "",
      amount: 0.0,
      isEditing: true,
    };
    handleItemsChange([...formData.items, newItem]);
  };

  // Remove item
  const removeItem = (itemId) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((item) => item.id !== itemId);
      handleItemsChange(newItems);
    }
  };

  // Select item from dropdown
  const selectItem = (itemId, selectedItem) => {
    updateItem(itemId, {
      item_id: selectedItem.id,
      name: selectedItem.name, // Store the item name
      description: selectedItem.description || selectedItem.name, // Use description if available, otherwise use name
      rate: selectedItem.rate,
      tax: selectedItem.tax,
      isEditing: false,
    });
    setItemDropdownOpen(null);
    setItemSearchQuery("");
  };

  // Deselect item
  const deselectItem = (itemId) => {
    updateItem(itemId, {
      name: "", // Clear name field
      description: "",
      rate: 0,
      tax: "",
      isEditing: true,
      amount: 0,
    });
    setItemDropdownOpen(itemId);
    setItemSearchQuery("");
  };

  // Item action handler
  const handleItemAction = (action, item) => {
    setSelectedItemForModal(item);
    setModalType(action);
    setShowItemModal(true);
    setItemActionsDropdown(null);
  };

  // Close item modal
  const closeItemModal = () => {
    setShowItemModal(false);
    setSelectedItemForModal(null);
  };

  // Handler functions
  const handleOpenCustomerDetails = () => setShowCustomerDetailsModal(true);
  const handleCloseCustomerDetails = () => {
    setCustomerDetailsData(null);
    setShowCustomerDetailsModal(false);
  };
  const handleExternalLinkClick = (customerData) => {};
  const handleOpenSalesPerson = () => setShowSalesPersonModal(true);
  const handleCloseSalesPerson = () => setShowSalesPersonModal(false);
  const handleNewCustomer = () => {
    setCustomerDropdownOpen(false);
    console.log("Opening new customer form...");
  };
  // Filter functions
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSalespersons = salespersons.filter(
    (salesperson) =>
      salesperson.name
        .toLowerCase()
        .includes(salespersonSearchTerm.toLowerCase()) ||
      salesperson.email
        .toLowerCase()
        .includes(salespersonSearchTerm.toLowerCase())
  );

  const filteredItems = availableItems?.filter((item) =>
    item?.name?.toLowerCase().includes(itemSearchQuery?.toLowerCase())
  );

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

  const handleSaveBilling = (data) => {
    console.log("Billing address saved:", data);
  };

  const handleSaveShipping = (data) => {
    console.log("Shipping address saved:", data);
  };

  const getSaveHandler = () =>
    modalType === "billing" ? handleSaveBilling : handleSaveShipping;

  // Search handler
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearchTerm(value);
    setPage(1);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setCustomerDropdownOpen(false);
        setSalespersonDropdownOpen(false);
        setPlaceOfSupplyDropdownOpen(false);
      }

      if (!event.target.closest(".item-dropdown-container")) {
        setItemDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Calculate current totals
  const totals = calculateTotals();

  return (
    <div className="bg-white min-h-screen w-full text-gray-700">
      <div className="p-6 space-y-6">
        {/* Customer Name */}
        <div className="flex items-center space-x-2 w-3/5">
          <label className="text-red-500 font-medium w-32 text-sm">
            Customer Name*
          </label>
          <div className="relative flex-1 dropdown-container">
            <div
              className="border focus:outline-none border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white text-sm"
              onClick={() => setCustomerDropdownOpen(!customerDropdownOpen)}
            >
              <span className="text-gray-500">
                {formData.customerData?.name || "Select or add a customer"}
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
                            formData.customerData?.id === customer.id
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : ""
                          }`}
                          onClick={() => handleCustomerSelect(customer)}
                        >
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold mr-3 ${
                              formData.customerData?.id === customer.id
                                ? "bg-white text-blue-500"
                                : "bg-blue-500 text-white"
                            }`}
                          >
                            {customer.initial}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className={`font-medium text-sm truncate ${
                                formData.customerData?.id === customer.id
                                  ? "text-white"
                                  : "text-gray-900"
                              }`}
                            >
                              {customer.name}
                            </div>
                            <div
                              className={`text-xs truncate ${
                                formData.customerData?.id === customer.id
                                  ? "text-blue-100"
                                  : "text-gray-500"
                              }`}
                            >
                              {customer.company}
                            </div>
                          </div>
                          {formData.customerData?.id === customer.id && (
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
          {formData.customerData && (
            <div className="flex items-center justify-end mt-2">
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-gray-700 font-medium text-sm">
                  {formData.customerData?.cu_currency || "AED"}
                </span>
              </div>
            </div>
          )}
        </div>

        {formData.customerData && (
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
                    {formData.tax_treatment}
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
              <div className="relative w-1/2 dropdown-container">
                <div
                  className="border border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white"
                  onClick={() =>
                    setPlaceOfSupplyDropdownOpen(!placeOfSupplyDropdownOpen)
                  }
                >
                  <span className="text-gray-900 font-medium">
                    {formData.supply_place || "Select place of supply"}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>

                {placeOfSupplyDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-10">
                    <div className="max-h-48 overflow-y-auto">
                      {placesOfSupply.map((place) => (
                        <div
                          key={place.id}
                          className="p-3 hover:bg-blue-50 cursor-pointer transition-colors focus:outline-none"
                          onClick={() => {
                            handleFormDataChange("supply_place", place.name);
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

        {/* Invoice# */}
        <div className="flex items-center space-x-2">
          <label className="text-red-500 font-medium w-32 text-sm">
            Invoice*
          </label>
          <div className="relative w-1/2">
            <input
              type="text"
              value={formData.invoice_number}
              onChange={(e) => {
                handleFormDataChange("invoice_number", e.target.value);
                // Disable auto-generation if manually edited
                if (invoiceNumberConfig.autoGenerate) {
                  handleInvoiceNumberConfigChange({ autoGenerate: false });
                }
              }}
              className={`border border-gray-300 rounded px-3 py-2 w-full pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                invoiceNumberConfig.autoGenerate
                  ? "bg-gray-50 text-gray-600"
                  : "bg-white text-gray-900"
              }`}
              placeholder="Invoice number will be auto-generated"
              readOnly={invoiceNumberConfig.autoGenerate}
            />

            <div className="flex items-center space-x-1 absolute right-1 top-1 bottom-1">
              {/* Auto-generate toggle button */}
              {!invoiceNumberConfig.autoGenerate && (
                <button
                  onClick={() => toggleAutoGeneration(true)}
                  className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors font-medium"
                  title="Enable auto-generation"
                >
                  Auto
                </button>
              )}

              {/* Refresh button for auto-generated numbers */}
              {invoiceNumberConfig.autoGenerate && (
                <button
                  onClick={generateManualInvoiceNumber}
                  className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Generate new invoice number"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              )}

              {/* Settings button */}
              <div className="group relative">
                <button
                  onClick={() => setConfigureModalOpen(true)}
                  className="px-2 py-1 text-blue-700 hover:bg-blue-50 rounded transition-colors"
                  title="Configure invoice number settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <div className="absolute w-64 -top-8 right-0 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-10">
                  Configure invoice number format and auto-generation settings.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Number*/}
        <div className="flex items-center space-x-2">
          <label className="text-gray-900 font-medium w-32 text-sm">
            Order Number
          </label>
          <input
            type="text"
            value={formData.order_number}
            onChange={(e) => handleFormDataChange("order_number", e.target.value)}
            className="border text-sm border-gray-300 rounded px-3 py-2 w-1/2 focus:outline-none"
          />
        </div>

        {/* Invoice Date */}
        <div className="flex items-center space-x-2 ">
          <label className="text-red-500 font-medium w-32 text-sm pr-28">
            Invoice Date*
          </label>
          <input
            type="date"
            value={formData.invoice_date}
            onChange={(e) => handleFormDataChange("invoice_date", e.target.value)}
            className="border text-sm border-gray-300 rounded px-3 py-2 w-1/5 focus:outline-none"
          />
          {/* Terms Dropdown */}
          <span className="text-gray-900 font-medium w-16 text-sm ml-8">
            Terms
          </span>
          <div className="relative w-1/5 dropdown-container">
            <div
              className="border text-sm border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white"
              onClick={() => setTermsDropdownOpen(!termsDropdownOpen)}
            >
              <span className="text-gray-700">
                {formData.terms ||
                  paymentTerms.find((term) => term.isDefault)?.name ||
                  "Due on Receipt"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {termsDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                <div className="max-h-64 overflow-y-auto">
                  {/* Built-in Terms */}
                  {builtInTermsOptions.map((term) => (
                    <div
                      key={term.value}
                      className={`p-3 hover:bg-blue-50 cursor-pointer transition-colors ${
                        formData.terms === term.value
                          ? "bg-blue-50 text-blue-600"
                          : ""
                      }`}
                      onClick={() => {
                        handleTermsChange(term.value);
                        setTermsDropdownOpen(false);
                      }}
                    >
                      <div className="font-medium text-gray-900 text-sm">
                        {term.label}
                      </div>
                    </div>
                  ))}

                  {/* Separator */}
                  {paymentTerms.length > 0 && (
                    <div className="border-t border-gray-100 my-1"></div>
                  )}

                  {/* Custom Payment Terms */}
                  {paymentTerms.map((term) => (
                    <div
                      key={term.id}
                      className={`p-3 hover:bg-blue-50 cursor-pointer transition-colors ${
                        formData.terms === term.name
                          ? "bg-blue-50 text-blue-600"
                          : ""
                      }`}
                      onClick={() => {
                        handleTermsChange(term.name);
                        setTermsDropdownOpen(false);
                      }}
                    >
                      <div className="font-medium text-gray-900 text-sm">
                        {term.name}
                      </div>
                    </div>
                  ))}

                  {/* Configure Terms Button */}
                  <div className="border-t border-gray-100">
                    <button
                      className="w-full p-3 text-left text-blue-500 hover:bg-blue-50 transition-colors text-sm font-medium"
                      onClick={() => {
                        setShowConfigureTermsModal(true);
                        setTermsDropdownOpen(false);
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>Configure Terms</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <span className="text-gray-900 font-medium text-sm ml-6 px-2">
            Due Date
          </span>
          <input
            type="date"
            value={formData.due_date}
            onChange={(e) => handleFormDataChange("due_date", e.target.value)}
            className="border text-sm border-gray-300 rounded px-3 py-2 w-1/5 focus:outline-none"
          />
        </div>

        {/* Salesperson */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-900 font-medium w-32 text-sm">
            Salesperson
          </label>
          <div className="relative w-1/2 dropdown-container">
            <div
              className="border text-sm border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white"
              onClick={() =>
                setSalespersonDropdownOpen(!salespersonDropdownOpen)
              }
            >
              <span className="text-gray-500">
                {formData.salespersonData?.name || "Select or Add Salesperson"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {salespersonDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                {/* Search Input */}
                <div className="p-3 border-b border-gray-100">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search"
                      value={salespersonSearchTerm}
                      onChange={(e) => handleSalespersonsSearch(e.target.value)}
                      className="w-full pl-10 pr-8 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {isLoadingSalespersons && (
                      <Loader className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 animate-spin" />
                    )}
                  </div>
                </div>

                {/* Salesperson List */}
                <div className="max-h-60 overflow-y-auto">
                  {salespersonError ? (
                    <div className="p-4 text-center">
                      <div className="text-sm text-red-500 mb-2">
                        {salespersonError}
                      </div>
                      <button
                        onClick={() => fetchSalespersons("", true)}
                        className="text-blue-500 text-sm hover:underline"
                      >
                        Retry
                      </button>
                    </div>
                  ) : filteredSalespersons.length > 0 ? (
                    <>
                      {filteredSalespersons.map((salesperson) => (
                        <div
                          key={salesperson.id}
                          className={`flex items-center p-3 cursor-pointer transition-colors hover:bg-gray-50 ${
                            formData.salespersonData?.id === salesperson.id
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : ""
                          }`}
                          onClick={() => handleSalespersonSelect(salesperson)}
                        >
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold mr-3 ${
                              formData.salespersonData?.id === salesperson.id
                                ? "bg-white text-blue-500"
                                : "bg-blue-500 text-white"
                            }`}
                          >
                            {salesperson.initial}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className={`font-medium text-sm truncate ${
                                formData.salespersonData?.id === salesperson.id
                                  ? "text-white"
                                  : "text-gray-900"
                              }`}
                            >
                              {salesperson.name}
                            </div>
                            <div
                              className={`text-xs truncate ${
                                formData.salespersonData?.id === salesperson.id
                                  ? "text-blue-100"
                                  : "text-gray-500"
                              }`}
                            >
                              {salesperson.email}
                            </div>
                          </div>
                          {formData.salespersonData?.id === salesperson.id && (
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

                      {/* Load More Button for Pagination */}
                      {salespersonHasMore && (
                        <div className="p-3 border-t border-gray-100">
                          <button
                            onClick={loadMoreSalespersons}
                            disabled={isLoadingSalespersons}
                            className="w-full text-center text-blue-500 text-sm hover:bg-blue-50 py-2 rounded transition-colors disabled:opacity-50"
                          >
                            {isLoadingSalespersons ? "Loading..." : "Load More"}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-4 text-center">
                      <div className="text-sm text-gray-500">
                        {salespersonSearchTerm
                          ? "No salespersons found for your search"
                          : "No salespersons found"}
                      </div>
                    </div>
                  )}
                </div>

                {/* Manage Salespersons Button */}
                <div className="border-t border-gray-100 p-3">
                  <button
                    className="flex items-center w-full text-left p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors group"
                    onClick={handleOpenSalesPerson}
                  >
                    <div className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm">
                      Manage Salespersons
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
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
                field, you can mark it as inactive under Invoice preferences.
              </div>
            </div>
          </div>
          <textarea
            placeholder="Let your customer know what this Invoice is for"
            value={formData.subject}
            onChange={(e) => handleFormDataChange("subject", e.target.value)}
            maxLength="250"
            className="border border-gray-300 rounded px-3 py-2 w-1/2 h-20 resize-none"
          />
        </div>

        {/* Item Table */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Item Table</h3>
            <button className="text-blue-500 text-sm">Bulk Actions</button>
          </div>

          <div
            className="border border-gray-300 rounded"
            style={{ overflow: "visible" }}
          >
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-300">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                <div className="col-span-4">ITEM DETAILS</div>
                <div className="col-span-1 text-center">QUANTITY</div>
                <div className="col-span-1 text-center">RATE</div>
                <div className="col-span-1 text-center">DISCOUNT</div>
                <div className="col-span-3 text-center">TAX</div>
                <div className="col-span-1 text-right">AMOUNT</div>
                <div className="col-span-1"></div>
              </div>
            </div>

            {/* Table Body */}
            <div className="bg-white" style={{ overflow: "visible" }}>
              {formData.items.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 items-center"
                >
                  {/* Item Details */}
                  <div className="col-span-4">
                    <div className="item-dropdown-container relative">
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 relative">
                          {item.isEditing || !item.description ? (
                            <>
                              <input
                                type="text"
                                placeholder="Type or click to select an item."
                                value={
                                  itemDropdownOpen === item.id
                                    ? itemSearchQuery
                                    : (item.name || item.description)
                                }
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setItemSearchQuery(value);
                                  // Update both name and description for manually entered items
                                  updateSingleField(item.id, "description", value);
                                  updateSingleField(item.id, "name", value);
                                  if (!itemDropdownOpen) {
                                    setItemDropdownOpen(item.id);
                                  }
                                }}
                                onFocus={() => {
                                  setItemDropdownOpen(item.id);
                                  setItemSearchQuery(item.name || item.description || "");
                                }}
                                onClick={() => {
                                  setItemDropdownOpen(item.id);
                                  setItemSearchQuery(item.name || item.description || "");
                                }}
                                className="w-full text-sm text-gray-700 bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />

                              {/* Item Dropdown */}
                              {itemDropdownOpen === item.id && (
                                <div
                                  className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-xl min-w-[350px]"
                                  style={{
                                    position: "absolute",
                                    zIndex: 1000,
                                    maxHeight: "200px",
                                    overflowY: "auto",
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
                                            Rate:{" "}
                                            {availableItem.rate.toFixed(2)} |
                                            Tax: {availableItem.tax}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="p-3 text-sm text-gray-500 text-center">
                                      {itemSearchQuery
                                        ? `No items found for "${itemSearchQuery}"`
                                        : "No items found"}
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
                            <div className="flex items-center justify-between">
                              <div
                                className="cursor-pointer hover:text-blue-600 py-2 px-3 border border-green-300 rounded bg-green-50 transition-colors flex-1"
                                onClick={() => {
                                  updateSingleField(item.id, "isEditing", true);
                                  setItemDropdownOpen(item.id);
                                  setItemSearchQuery(item.name || item.description);
                                }}
                              >
                                <div className="text-sm font-medium text-gray-900 flex items-center">
                                  <span className="text-green-600 mr-2">✓</span>
                                  {item.name || item.description}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {item.name && item.description && item.name !== item.description && (
                                    <div>Description: {item.description}</div>
                                  )}
                                  <div>Rate: {item.rate} | Tax: {item.tax}</div>
                                </div>
                              </div>

                              {/* Action buttons for selected items */}
                              <div className="flex items-center space-x-1 ml-2">
                                <div className="item-actions-container relative">
                                  <button
                                    onClick={() =>
                                      setItemActionsDropdown(
                                        itemActionsDropdown === item.id
                                          ? null
                                          : item.id
                                      )
                                    }
                                    className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100"
                                    title="More actions"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                  </button>

                                  {/* Actions Dropdown */}
                                  {itemActionsDropdown === item.id && (
                                    <div className="absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-xl z-50 min-w-[120px]">
                                      <div className="py-1">
                                        <button
                                          onClick={() =>
                                            handleItemAction("edit", item)
                                          }
                                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                                        >
                                          <Edit className="w-3 h-3 mr-2" />
                                          Edit Item
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleItemAction("view", item)
                                          }
                                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                                        >
                                          <Search className="w-3 h-3 mr-2" />
                                          View Details
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <button
                                  className="p-1 text-gray-400 hover:text-red-500 rounded hover:bg-red-50"
                                  onClick={() => deselectItem(item.id)}
                                  title="Deselect item"
                                >
                                  <X className="w-4 h-4" />
                                </button>
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
                        updateSingleField(item.id, "quantity", e.target.value)
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
                        updateSingleField(item.id, "rate", e.target.value)
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
                          updateSingleField(item.id, "discount", e.target.value)
                        }
                        className="w-16 text-center border border-gray-300 rounded px-1 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        max="100"
                      />
                      <select
                        value={item.discount_type || "%"}
                        onChange={(e) =>
                          updateSingleField(
                            item.id,
                            "discount_type",
                            e.target.value
                          )
                        }
                        className="w-16 border border-gray-300 rounded px-1 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="%">%</option>
                        <option value="AED">AED</option>
                      </select>
                    </div>
                  </div>

                  {/* Tax */}
                  <div className="col-span-3 items-center text-center">
                    <CustomTaxDropdown
                      value={item.tax}
                      onChange={(selectedTax) =>
                        updateSingleField(item.id, "tax", selectedTax)
                      }
                      className="w-1/2 mx-auto"
                      taxes={taxes}
                      isLoadingTaxes={isLoadingTaxes}
                      taxError={taxError}
                      onTaxSearch={handleTaxSearch}
                      onLoadMoreTaxes={loadMoreTaxes}
                      taxHasMore={taxHasMore}
                      onCreateTax={handleCreateTax}
                    />
                  </div>

                  {/* Amount */}
                  <div className="col-span-1 text-right">
                    <span className="text-red-500">
                      {item.amount.toFixed(2)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <div className="col-span-1 text-center">
                    <button
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                      onClick={() => removeItem(item.id)}
                      title="Remove item"
                      disabled={formData.items.length === 1}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 mt-2">
            <button
              className="flex items-center space-x-2 text-blue-500 text-sm"
              onClick={addNewRow}
            >
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
                <span>{totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="text-xs text-gray-500">(Tax Inclusive)</div>
              <div className="flex justify-between font-medium text-lg border-t pt-2">
                <span>
                  Total ( {formData.customerData?.cu_currency || "AED"} )
                </span>
                <span>{totals.grandTotal.toFixed(2)}</span>
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
            value={formData.customer_note}
            onChange={(e) => handleFormDataChange("customer_note", e.target.value)}
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
            value={formData.terms_condition}
            onChange={(e) =>
              handleFormDataChange("terms_condition", e.target.value)
            }
            className="w-full border border-gray-300 rounded px-3 py-2 h-24"
          />
          <div className="mt-2 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Attach Files to Invoice</span>
              <div className="flex items-center space-x-2 mt-1">
                <label className="flex items-center space-x-1 text-blue-500 border border-blue-500 rounded px-2 py-1 text-xs cursor-pointer hover:bg-blue-50 transition-colors">
                  <Upload className="w-3 h-3" />
                  <span>Upload File</span>
                  <ChevronDown className="w-3 h-3" />
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                  />
                </label>
                {isUploading && (
                  <span className="text-xs text-blue-500">Uploading...</span>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                You can upload a maximum of 5 files, 10MB each
              </div>
              
              {/* Display uploaded files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-2 space-y-1">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center space-x-2 bg-gray-50 rounded px-2 py-1">
                      <span className="text-xs text-gray-700 flex-1">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                      <button
                        onClick={() => removeUploadedFile(file.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Fields Note */}
        <div className="text-sm text-gray-600 mt-6">
          <span className="font-medium">Additional Fields:</span> Start adding
          custom fields for your Invoice by going to Settings ⚙️ Sales ➤ Invoice
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-8 pt-6 border-t">
          <button
            onClick={() => handleCreateInvoice(true)}
            disabled={isSavingInvoice}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSavingInvoice && saveMode === "draft" && (
              <Loader className="w-4 h-4 animate-spin" />
            )}
            <span>
              {isSavingInvoice && saveMode === "draft"
                ? "Saving..."
                : "Save as Draft"}
            </span>
          </button>
          <button
            onClick={() => handleCreateInvoice(false)}
            disabled={isSavingInvoice}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSavingInvoice && saveMode === "send" && (
              <Loader className="w-4 h-4 animate-spin" />
            )}
            <span>
              {isSavingInvoice && saveMode === "send"
                ? "Saving..."
                : "Save and Send"}
            </span>
          </button>
          <button
            className="text-gray-500 px-4 py-2 hover:text-gray-700"
            disabled={isSavingInvoice}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Fixed Customer Details Button on Right Edge */}
      {formData.customerData && !showCustomerDetailsModal && (
        <button
          onClick={() => {
            setCustomerDetailsData(formData.customerData);
            handleOpenCustomerDetails();
          }}
          className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-gray-600 hover:bg-gray-700 text-white px-3 py-4 rounded-l-lg shadow-lg transition-all duration-200 hover:px-4 z-30 group"
        >
          <div className="flex items-center space-x-2">
            <div className="transform whitespace-nowrap text-sm font-medium">
              {formData.customerData.name}'s Details
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
        currentConfig={invoiceNumberConfig}
        onConfigChange={handleInvoiceNumberConfigChange}
        source="invoice"
      />

      {/* Customer Details Panel */}
      {showCustomerDetailsModal && customerDetailsData && (
        <CustomerDetailsModal
          isOpen={showCustomerDetailsModal}
          onClose={handleCloseCustomerDetails}
          customerData={formData.customerData}
          onExternalLinkClick={handleExternalLinkClick}
        />
      )}

      {/* Manage Salespersons Modal */}
      {showSalesPersonModal && (
        <ManageSalespersonsModal
          isOpen={showSalesPersonModal}
          onClose={handleCloseSalesPerson}
          onSelectSalesperson={handleSalespersonSelect}
        />
      )}

      {/* Item Modal */}
      <ItemModal
        isOpen={showItemModal}
        onClose={closeItemModal}
        item={selectedItemForModal}
        mode={modalType}
      />

      {/* Configure Payment Terms Modal */}
      {showConfigureTermsModal && (
        <ConfigureTerms
          isOpen={showConfigureTermsModal}
          onClose={() => setShowConfigureTermsModal(false)}
          paymentTerms={paymentTerms}
          newTermName={newTermName}
          setNewTermName={setNewTermName}
          newTermDays={newTermDays}
          setNewTermDays={setNewTermDays}
          onAddNewTerm={handleAddNewTerm}
          onMarkAsDefault={handleMarkAsDefault}
          onDeleteTerm={handleDeleteTerm}
          onSave={handleSavePaymentTerms}
        />
      )}
    </div>
  );
}