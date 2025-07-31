import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  X,
  Calendar,
  Search,
  Settings,
  Plus,
  Loader,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import DateRangeFilterModal from "./DateRangeFilterModal";
import FileUploadComponent from "./FileUploadComponent";
import QuoteNumberPreferences from "../../quotes/createNew/QuoteNumberPreferences";
import CustomerDetailsModal from "../../../sales/customers/CustomerDetailsModal";
import {
  customer_list,
  GET_ALL_INVOICES,
  CREATE_PAYMENT_RECEIVED, // Add your existing API function
} from "../../../../api/services/sales/createCustomer";
import ConfigurePaymentModeModal from "./ConfigurePaymentModeModal";

// Helper function to generate initials
const generateInitial = (name) => {
  return name ? name.charAt(0).toUpperCase() : "";
};

function formatDate(dateString) {
  if (!dateString) return "";
  const options = { day: "numeric", month: "short", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

const PaymentRecevibleForm = () => {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [showForm, setShowForm] = useState(false);

  // AUTO-INCREMENT PAYMENT NUMBER STATE
  const [paymentNumberConfig, setPaymentNumberConfig] = useState({
    prefix: "",
    nextNumber: 1,
    digitLength: 6,
    autoGenerate: true,
    suffix: "",
    restartNumbering: false,
    selectedOption: "",
    selectedYearFormat: "",
  });

  const [formData, setFormData] = useState({
    customer_id: null,
    customerData: null,
    customerName: "",
    amountReceived: "",
    bankCharges: "",
    paymentDate: "",
    paymentNumber: "",
    paymentMode: "Cash",
    depositTo: "Petty Cash",
    reference: "",
    notes: "", // Added notes field
    sendMail: false, // Added email notification
    email: "", // Added customer email
  });

  // NEW: File upload state
  const [uploadedFile, setUploadedFile] = useState(null);

  // NEW: API Loading and Error States
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Customer API states
  const [customers, setCustomers] = useState([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [customerError, setCustomerError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Unpaid Invoices API states
  const [unpaidInvoices, setUnpaidInvoices] = useState([]);
  const [isLoadingInvoices, setIsLoadingInvoices] = useState(false);
  const [invoiceError, setInvoiceError] = useState(null);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [invoicePayments, setInvoicePayments] = useState({});
  const [invoicePaymentDates, setInvoicePaymentDates] = useState({});

  // UI States
  const [customerDropdownOpen, setCustomerDropdownOpen] = useState(false);
  const [paymentModeDropdownOpen, setPaymentModeDropdownOpen] = useState(false);
  const [paymentModeSearchTerm, setPaymentModeSearchTerm] = useState("");
  const [showCustomerDetailsModal, setShowCustomerDetailsModal] =
    useState(false);
  const [customerDetailsData, setCustomerDetailsData] = useState(null);
  const [showConfigurePaymentModeModal, setShowConfigurePaymentModeModal] =
    useState(false);

  const [showDepositDropdown, setShowDepositDropdown] = useState(false);
  const [depositSearchTerm, setDepositSearchTerm] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [configureModalOpen, setConfigureModalOpen] = useState(false);
  const [modalType, setModalType] = useState("billing");

  // Refs
  const depositDropdownRef = useRef(null);
  const depositSearchInputRef = useRef(null);

  const displayLabel =
    dateRange.startDate && dateRange.endDate
      ? `${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate)}`
      : "Filter by Date Range";

  // Updated deposit accounts with categories
  const depositAccounts = {
    Bank: [
      "A IM BUSINESS CORP FOR CORPORATE SERVICES PROVIDERS CO. L.L.C",
      "Zoho Payroll - Bank Account",
    ],
    Cash: ["Petty Cash", "Undeposited Funds"],
    Other: ["Other Current Liability"],
  };

  // Flatten all accounts for search
  const allDepositAccounts = Object.values(depositAccounts).flat();

  // Filter deposit accounts based on search term
  const filteredDepositCategories = {};
  if (depositSearchTerm.trim()) {
    const matches = allDepositAccounts.filter((account) =>
      account.toLowerCase().includes(depositSearchTerm.toLowerCase())
    );

    Object.entries(depositAccounts).forEach(([category, accounts]) => {
      const categoryMatches = accounts.filter((account) =>
        matches.includes(account)
      );
      if (categoryMatches.length > 0) {
        filteredDepositCategories[category] = categoryMatches;
      }
    });
  } else {
    Object.assign(filteredDepositCategories, depositAccounts);
  }

  // NEW: Validation function
  const validateForm = () => {
    const errors = {};

    if (!formData.customer_id) {
      errors.customer_id = "Customer is required";
    }

    if (!formData.amountReceived || parseFloat(formData.amountReceived) <= 0) {
      errors.amountReceived = "Amount received must be greater than 0";
    }

    if (!formData.paymentDate) {
      errors.paymentDate = "Payment date is required";
    }

    if (!formData.paymentNumber) {
      errors.paymentNumber = "Payment number is required";
    }

    if (!formData.depositTo) {
      errors.depositTo = "Deposit account is required";
    }

    // Email validation if send mail is enabled
    if (formData.sendMail && !formData.email) {
      errors.email = "Email is required when send mail is enabled";
    }

    if (
      formData.sendMail &&
      formData.email &&
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      errors.email = "Please enter a valid email address";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // NEW: Success/Error Message Component
  const MessageAlert = ({ type, message, onClose }) => {
    const isSuccess = type === "success";

    return (
      <div
        className={`fixed top-4 right-4 max-w-md w-full ${
          isSuccess ? "bg-green-50" : "bg-red-50"
        } border ${
          isSuccess ? "border-green-200" : "border-red-200"
        } rounded-lg p-4 shadow-lg z-50`}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {isSuccess ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600" />
            )}
          </div>
          <div className="ml-3 flex-1">
            <p
              className={`text-sm font-medium ${
                isSuccess ? "text-green-800" : "text-red-800"
              }`}
            >
              {isSuccess ? "Success!" : "Error"}
            </p>
            <p
              className={`text-sm mt-1 ${
                isSuccess ? "text-green-700" : "text-red-700"
              }`}
            >
              {message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className={`${
                isSuccess
                  ? "text-green-500 hover:text-green-600"
                  : "text-red-500 hover:text-red-600"
              } focus:outline-none`}
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // NEW: File Upload Handler
  const handleFileUpload = (file) => {
    setUploadedFile(file);
  };

  // Fetch Unpaid Invoices API function
  const fetchUnpaidInvoices = async (customerId) => {
    if (!customerId) return;

    setIsLoadingInvoices(true);
    setInvoiceError(null);

    try {
      const body = {
        customer_id: customerId,
        status: "unpaid", // or "UNPAID" depending on your API
        // Add date range filter if selected
        ...(dateRange.startDate &&
          dateRange.endDate && {
            start_date: dateRange.startDate,
            end_date: dateRange.endDate,
          }),
        // You can add other filters as needed
        page: 1,
        limit: 100, // Adjust as needed
      };

      const response = await GET_ALL_INVOICES(body);

      const transformedInvoices = (response.list || response.data || []).map(
        (invoice) => ({
          ...invoice,
          id: invoice.i_id,
          invoiceNumber: invoice.i_number,
          invoiceDate: invoice.i_date,
          dueDate: invoice.i_due_date,
          totalAmount: parseFloat(invoice.i_total || 0),
          subTotal: parseFloat(invoice.i_sub_total || 0),
          amountDue: parseFloat(invoice.i_total || 0), // Assuming unpaid invoices have full amount due
          currency: formData.customerData?.cu_currency || "AED",
          status: invoice.i_status,
          customerName: invoice.customer_name,
          orderNumber: invoice.i_order_number,
          paymentTerms: invoice.i_payment_terms,
        })
      );

      setUnpaidInvoices(transformedInvoices);

      // Initialize payment amounts and dates for each invoice
      const initialPayments = {};
      const initialPaymentDates = {};
      const currentDate = new Date().toISOString().split("T")[0];

      transformedInvoices.forEach((invoice) => {
        initialPayments[invoice.id] = 0;
        initialPaymentDates[invoice.id] = currentDate;
      });
      setInvoicePayments(initialPayments);
      setInvoicePaymentDates(initialPaymentDates);
    } catch (error) {
      console.error("Error fetching unpaid invoices:", error);
      setInvoiceError("Failed to fetch unpaid invoices");
      setUnpaidInvoices([]);
    } finally {
      setIsLoadingInvoices(false);
    }
  };

  // Auto-apply payment to invoices
  const autoApplyPayment = () => {
    const amountReceived = parseFloat(formData.amountReceived) || 0;
    if (amountReceived <= 0 || unpaidInvoices.length === 0) return;

    const newPayments = {};
    const newPaymentDates = {};
    const currentDate = new Date().toISOString().split("T")[0];
    let remainingAmount = amountReceived;

    // Sort invoices by due date (oldest first)
    const sortedInvoices = [...unpaidInvoices].sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );

    sortedInvoices.forEach((invoice) => {
      if (remainingAmount <= 0) {
        newPayments[invoice.id] = 0;
        newPaymentDates[invoice.id] = currentDate;
        return;
      }

      const amountToPay = Math.min(remainingAmount, invoice.amountDue);
      newPayments[invoice.id] = amountToPay;
      newPaymentDates[invoice.id] = currentDate;
      remainingAmount -= amountToPay;
    });

    setInvoicePayments(newPayments);
    setInvoicePaymentDates(newPaymentDates);
  };

  // Handle invoice payment amount change
  const handleInvoicePaymentChange = (invoiceId, amount) => {
    const numericAmount = parseFloat(amount) || 0;
    const invoice = unpaidInvoices.find((inv) => inv.id === invoiceId);

    if (invoice && numericAmount <= invoice.amountDue) {
      setInvoicePayments((prev) => ({
        ...prev,
        [invoiceId]: numericAmount,
      }));
    }
  };

  // Handle invoice payment date change
  const handleInvoicePaymentDateChange = (invoiceId, date) => {
    setInvoicePaymentDates((prev) => ({
      ...prev,
      [invoiceId]: date,
    }));
  };

  // Calculate payment summary
  const calculatePaymentSummary = () => {
    const totalInvoicesAmount = unpaidInvoices.reduce(
      (sum, invoice) => sum + invoice.totalAmount,
      0
    );
    const amountReceived = parseFloat(formData.amountReceived) || 0;
    const totalPaymentsApplied = Object.values(invoicePayments).reduce(
      (sum, amount) => sum + amount,
      0
    );
    const amountInExcess = amountReceived - totalPaymentsApplied;

    return {
      total: totalInvoicesAmount,
      amountReceived,
      totalPaymentsApplied,
      amountRefunded: 0, // You can implement refund logic
      amountInExcess: Math.max(0, amountInExcess),
    };
  };

  // Clear invoice selection
  const clearInvoiceSelection = () => {
    const clearedPayments = {};
    const clearedPaymentDates = {};
    const currentDate = new Date().toISOString().split("T")[0];

    unpaidInvoices.forEach((invoice) => {
      clearedPayments[invoice.id] = 0;
      clearedPaymentDates[invoice.id] = currentDate;
    });
    setInvoicePayments(clearedPayments);
    setInvoicePaymentDates(clearedPaymentDates);
    setSelectedInvoices([]);
  };

  // Handle date range filter apply
  const handleDateRangeApply = (range) => {
    setDateRange(range);
    if (formData.customer_id) {
      fetchUnpaidInvoices(formData.customer_id);
    }
  };

  // AUTO-INCREMENT FUNCTIONS
  const generateNextPaymentNumber = () => {
    const { prefix, nextNumber, digitLength, suffix } = paymentNumberConfig;
    const paddedNumber = nextNumber.toString().padStart(digitLength, "0");
    return `${prefix}${paddedNumber}${suffix}`;
  };

  const getNextPaymentNumber = () => {
    try {
      const lastNumber = localStorage.getItem("lastPaymentNumber");
      const lastPaymentConfig = localStorage.getItem("paymentNumberConfig");

      if (lastPaymentConfig) {
        const config = JSON.parse(lastPaymentConfig);
        return config.nextNumber || (lastNumber ? parseInt(lastNumber) + 1 : 1);
      }

      return lastNumber ? parseInt(lastNumber) + 1 : 1;
    } catch (error) {
      console.error("Error getting next payment number:", error);
      return 1;
    }
  };

  const updatePaymentNumberSequence = (currentNumber) => {
    try {
      const numberMatch = currentNumber.match(/(\d+)/);
      if (numberMatch) {
        const extractedNumber = parseInt(numberMatch[0]);

        localStorage.setItem("lastPaymentNumber", extractedNumber.toString());

        const updatedConfig = {
          ...paymentNumberConfig,
          nextNumber: extractedNumber + 1,
        };

        localStorage.setItem(
          "paymentNumberConfig",
          JSON.stringify(updatedConfig)
        );
        setPaymentNumberConfig(updatedConfig);

        console.log(
          `Payment number sequence updated. Next number will be: ${
            extractedNumber + 1
          }`
        );
      }
    } catch (error) {
      console.error("Error updating payment number sequence:", error);
    }
  };

  const initializePaymentNumber = () => {
    try {
      const savedConfig = localStorage.getItem("paymentNumberConfig");
      let configToUse = { ...paymentNumberConfig };

      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        configToUse = { ...paymentNumberConfig, ...parsedConfig };
        setPaymentNumberConfig(configToUse);
      }

      if (configToUse.autoGenerate) {
        const nextNumber = getNextPaymentNumber();
        configToUse.nextNumber = nextNumber;

        const { prefix, digitLength, suffix } = configToUse;
        const paddedNumber = nextNumber.toString().padStart(digitLength, "0");
        const newPaymentNumber = `${prefix}${paddedNumber}${suffix}`;

        handleInputChange("paymentNumber", newPaymentNumber);
        setPaymentNumberConfig(configToUse);
      }
    } catch (error) {
      console.error("Error initializing payment number:", error);
      handleInputChange("paymentNumber", "000001");
    }
  };

  const handlePaymentNumberConfigChange = (newConfig) => {
    const updatedConfig = {
      ...paymentNumberConfig,
      ...newConfig,
    };

    setPaymentNumberConfig(updatedConfig);
    localStorage.setItem("paymentNumberConfig", JSON.stringify(updatedConfig));

    console.log("Payment number config updated:", updatedConfig);
  };

  const formatToDDMMYYYY = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const generateManualPaymentNumber = () => {
    const nextNumber = getNextPaymentNumber();
    const updatedConfig = {
      ...paymentNumberConfig,
      nextNumber: nextNumber,
    };

    setPaymentNumberConfig(updatedConfig);
    localStorage.setItem("paymentNumberConfig", JSON.stringify(updatedConfig));

    const newPaymentNumber = generateNextPaymentNumber();
    handleInputChange("paymentNumber", newPaymentNumber);
  };

  const toggleAutoGeneration = (enabled) => {
    const updatedConfig = {
      ...paymentNumberConfig,
      autoGenerate: enabled,
    };

    handlePaymentNumberConfigChange(updatedConfig);

    if (enabled) {
      const nextNumber = getNextPaymentNumber();
      updatedConfig.nextNumber = nextNumber;
      setPaymentNumberConfig(updatedConfig);

      const newPaymentNumber = generateNextPaymentNumber();
      handleInputChange("paymentNumber", newPaymentNumber);
    }
  };

  const generateNewPaymentForNext = () => {
    if (paymentNumberConfig.autoGenerate) {
      const newPaymentNumber = generateNextPaymentNumber();
      handleInputChange("paymentNumber", newPaymentNumber);
    }
  };

  const [paymentModeOptions, setPaymentModeOptions] = useState([
    { id: 1, name: "Bank Remittance", description: "Bank remittance transfer" },
    { id: 2, name: "Bank Transfer", description: "Direct bank transfer" },
    { id: 3, name: "Cash", description: "Cash payment" },
    { id: 4, name: "Check", description: "Check payment" },
    { id: 5, name: "Credit Card", description: "Credit card payment" },
  ]);

  // Fetch Customers API function
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
    } finally {
      setIsLoadingCustomers(false);
    }
  };

  // Load more customers
  const loadMoreCustomers = async () => {
    if (hasMore && !isLoadingCustomers) {
      setPage((prev) => prev + 1);
    }
  };

  // Search handler
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearchTerm(value);
    setPage(1);

    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchCustomers("", true);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  // Deposit dropdown handlers
  const handleDepositSelect = (account) => {
    handleInputChange("depositTo", account);
    setShowDepositDropdown(false);
    setDepositSearchTerm("");
  };

  const toggleDepositDropdown = () => {
    setShowDepositDropdown(!showDepositDropdown);
    if (!showDepositDropdown) {
      setDepositSearchTerm("");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        depositDropdownRef.current &&
        !depositDropdownRef.current.contains(event.target)
      ) {
        setShowDepositDropdown(false);
        setDepositSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (showDepositDropdown && depositSearchInputRef.current) {
      setTimeout(() => {
        depositSearchInputRef.current.focus();
      }, 50);
    }
  }, [showDepositDropdown]);

  // Fetch customers on mount and initialize payment number
  useEffect(() => {
    fetchCustomers("", true);
    // Initialize payment date to today and payment number
    const today = new Date().toISOString().split("T")[0];
    handleInputChange("paymentDate", today);
    initializePaymentNumber();
  }, []);

  // Update the payment number when config changes
  useEffect(() => {
    if (paymentNumberConfig.autoGenerate) {
      const newPaymentNumber = generateNextPaymentNumber();
      handleInputChange("paymentNumber", newPaymentNumber);
    }
  }, [
    paymentNumberConfig.prefix,
    paymentNumberConfig.digitLength,
    paymentNumberConfig.suffix,
    paymentNumberConfig.nextNumber,
  ]);

  // Fetch customers when page changes
  useEffect(() => {
    if (page > 1) {
      fetchCustomers();
    }
  }, [page]);

  // Customer selection handler
  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer.name);
    setFormData((prev) => ({
      ...prev,
      customer_id: customer.id,
      customerData: customer,
      customerName: customer.name,
      email: customer.email || "", // Auto-populate email
    }));
    setCustomerDropdownOpen(false);
    setSearchQuery("");
    setSearchTerm("");
    setShowForm(true);

    // Fetch unpaid invoices for the selected customer
    fetchUnpaidInvoices(customer.id);
  };

  // New customer handler
  const handleNewCustomer = () => {
    setCustomerDropdownOpen(false);
    console.log("Opening new customer form...");
  };

  // Payment mode selection handler
  const handlePaymentModeSelect = (paymentMode) => {
    handleInputChange("paymentMode", paymentMode.name);
    setPaymentModeDropdownOpen(false);
    setPaymentModeSearchTerm("");
  };

  // Configure payment mode handler
  const handleConfigurePaymentMode = () => {
    setPaymentModeDropdownOpen(false);
    setShowConfigurePaymentModeModal(true);
  };

  // Handle payment mode configuration save
  const handleSavePaymentModeConfig = (paymentModes) => {
    console.log("Payment modes updated:", paymentModes);
    // Update the payment mode options based on the modal configuration
    const updatedOptions = paymentModes.map((mode, index) => ({
      id: mode.id || index + 1,
      name: mode.name,
      description: `${mode.name} payment`,
    }));
    setPaymentModeOptions(updatedOptions);
  };

  // Handle payment mode selection from modal
  const handlePaymentModeSelectFromModal = (paymentMode) => {
    handleInputChange("paymentMode", paymentMode.name);
  };

  // Filter payment modes
  const filteredPaymentModes = paymentModeOptions.filter((mode) =>
    mode.name.toLowerCase().includes(paymentModeSearchTerm.toLowerCase())
  );

  // Filter customers
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Customer details handlers
  const handleOpenCustomerDetails = () => setShowCustomerDetailsModal(true);
  const handleCloseCustomerDetails = () => {
    setCustomerDetailsData(null);
    setShowCustomerDetailsModal(false);
  };
  const handleExternalLinkClick = (customerData) => {};

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  // UPDATED: handleSave function with YOUR API integration
  const handleSave = async () => {
    // Clear previous errors and success states
    setSaveError(null);
    setSaveSuccess(false);

    // Validate form
    if (!validateForm()) {
      setSaveError("Please fix the validation errors before saving.");
      return;
    }

    setIsSaving(true);

    try {
      // Calculate payment summary
      const paymentSummary = calculatePaymentSummary();

      // Prepare unpaid_items in the format expected by backend
      const unpaidItems = Object.entries(invoicePayments)
        .filter(([id, amount]) => amount > 0)
        .map(([invoice_id, amount]) => ({
          invoice_id: parseInt(invoice_id),
          amount: parseFloat(amount),
        }));

      // Create FormData for file upload (as your backend expects)
      const formDataToSend = new FormData();

      // Add all the required fields in the exact structure expected by backend
      formDataToSend.append("customer_id", formData.customer_id);
      formDataToSend.append(
        "amount_received",
        parseFloat(formData.amountReceived)
      );
      formDataToSend.append(
        "bank_charges",
        parseFloat(formData.bankCharges) || 0
      );
      formDataToSend.append("payment_date", formData.paymentDate);
      formDataToSend.append("payment_number", formData.paymentNumber);
      formDataToSend.append("payment_mode", formData.paymentMode);
      formDataToSend.append("deposit_to", formData.depositTo);
      formDataToSend.append("reference", formData.reference || "");
      formDataToSend.append("unpaid_items", JSON.stringify(unpaidItems));
      formDataToSend.append("total", paymentSummary.total);
      formDataToSend.append("amount_used", paymentSummary.totalPaymentsApplied);
      formDataToSend.append("amount_refunded", paymentSummary.amountRefunded);
      formDataToSend.append("amount_excess", paymentSummary.amountInExcess);
      formDataToSend.append("notes", formData.notes || "");
      formDataToSend.append("send_mail", formData.sendMail);
      formDataToSend.append("email", formData.email || "");

      // Add file if uploaded
      if (uploadedFile) {
        formDataToSend.append("file", uploadedFile);
      }

      console.log("Sending payment data with structure:", {
        customer_id: formData.customer_id,
        amount_received: parseFloat(formData.amountReceived),
        bank_charges: parseFloat(formData.bankCharges) || 0,
        payment_date: formData.paymentDate,
        payment_number: formData.paymentNumber,
        payment_mode: formData.paymentMode,
        deposit_to: formData.depositTo,
        reference: formData.reference || "",
        unpaid_items: unpaidItems,
        total: paymentSummary.total,
        amount_used: paymentSummary.totalPaymentsApplied,
        amount_refunded: paymentSummary.amountRefunded,
        amount_excess: paymentSummary.amountInExcess,
        notes: formData.notes || "",
        send_mail: formData.sendMail,
        email: formData.email || "",
        file: uploadedFile ? uploadedFile.name : null,
      });

      // Make API call using YOUR existing function
      const response = await CREATE_PAYMENT_RECEIVED(formDataToSend);

      console.log("Payment created successfully:", response);

      // Update payment number sequence after successful save
      if (paymentNumberConfig.autoGenerate) {
        updatePaymentNumberSequence(formData.paymentNumber);
        generateNewPaymentForNext();
      }

      // Show success message
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 5000); // Hide after 5 seconds

      // Optionally reset form after successful save
      // handleCancel();
    } catch (error) {
      console.error("Error saving payment:", error);

      // Handle different types of errors
      let errorMessage = "Failed to save payment. Please try again.";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setSaveError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedCustomer("");
    setFormData({
      customer_id: null,
      customerData: null,
      customerName: "",
      amountReceived: "",
      bankCharges: "",
      paymentDate: new Date().toISOString().split("T")[0],
      paymentNumber: "",
      paymentMode: "Cash",
      depositTo: "Petty Cash",
      reference: "",
      notes: "",
      sendMail: false,
      email: "",
    });

    // Clear file upload
    setUploadedFile(null);

    // Clear invoice data
    setUnpaidInvoices([]);
    setInvoicePayments({});
    setInvoicePaymentDates({});
    setSelectedInvoices([]);
    setDateRange({ startDate: "", endDate: "" });

    // Clear validation errors and API states
    setValidationErrors({});
    setSaveError(null);
    setSaveSuccess(false);

    // Regenerate payment number if auto-generation is enabled
    if (paymentNumberConfig.autoGenerate) {
      setTimeout(() => {
        initializePaymentNumber();
      }, 100);
    }
  };

  const handleSaveBilling = (data) => {
    console.log("Billing address saved:", data);
    // call billing API here
  };

  const getSaveHandler = () =>
    modalType === "billing" ? handleSaveBilling : handleSaveShipping;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setCustomerDropdownOpen(false);
        setPaymentModeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close payment mode dropdown when configure modal opens
  useEffect(() => {
    if (showConfigurePaymentModeModal) {
      setPaymentModeDropdownOpen(false);
    }
  }, [showConfigurePaymentModeModal]);

  const paymentSummary = calculatePaymentSummary();

  return (
    <div className="min-h-screen ">
      {/* NEW: Success/Error Messages */}
      {saveSuccess && (
        <MessageAlert
          type="success"
          message="Payment has been successfully saved and recorded."
          onClose={() => setSaveSuccess(false)}
        />
      )}

      {saveError && (
        <MessageAlert
          type="error"
          message={saveError}
          onClose={() => setSaveError(null)}
        />
      )}

      <div className="max-w-full mx-auto  rounded-lg ">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Record Payment
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className=" max-w-full  mt-6">
          {/* Customer Name Selection */}
          <div className="mb-6 p-6 flex items-center space-x-2 bg-gray-100 py-6">
            <label className="block font-medium w-52 text-sm text-red-600 mb-2">
              Customer Name*
            </label>
            <div className="relative dropdown-container">
              <div
                className={`border focus:outline-none border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white text-sm w-96 ${
                  validationErrors.customer_id ? "border-red-500" : ""
                }`}
                onClick={() => setCustomerDropdownOpen(!customerDropdownOpen)}
              >
                <span className="text-gray-500">
                  {formData.customerData?.name || "Select or add a customer"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              {/* NEW: Validation error display */}
              {validationErrors.customer_id && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.customer_id}
                </p>
              )}

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
                    {customerError ? (
                      <div className="p-4 text-center">
                        <div className="text-sm text-red-500 mb-2">
                          {customerError}
                        </div>
                        <button
                          onClick={() => fetchCustomers("", true)}
                          className="text-blue-500 text-sm hover:underline"
                        >
                          Retry
                        </button>
                      </div>
                    ) : filteredCustomers.length > 0 ? (
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

                        {/* Load More Button for Pagination */}
                        {hasMore && (
                          <div className="p-3 border-t border-gray-100">
                            <button
                              onClick={loadMoreCustomers}
                              disabled={isLoadingCustomers}
                              className="w-full text-center text-blue-500 text-sm hover:bg-blue-50 py-2 rounded transition-colors disabled:opacity-50"
                            >
                              {isLoadingCustomers ? "Loading..." : "Load More"}
                            </button>
                          </div>
                        )}
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
          </div>

          {/* Rest of the form - only show after customer selection */}
          {showForm && (
            <div className="px-6">
              {/* Amount Received */}
              <div className="mb-4 flex items-center space-x-2">
                <label className="block text-sm font-medium text-red-600 mb-2 w-52">
                  Amount Received*
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 py-2 border border-r-0 border-gray-300 bg-gray-50 text-sm text-gray-500 rounded-l-md">
                    {"AED"}
                  </span>
                  <input
                    type="text"
                    value={formData.amountReceived}
                    onChange={(e) =>
                      handleInputChange("amountReceived", e.target.value)
                    }
                    className={`flex-1 focus:outline-none border border-gray-300 rounded px-3 py-2  flex items-center justify-between bg-white text-sm w-80 ${
                      validationErrors.amountReceived ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {validationErrors.amountReceived && (
                  <p className="text-red-500 text-xs mt-1">
                    {validationErrors.amountReceived}
                  </p>
                )}
              </div>

              {/* Bank Charges */}
              <div className="mb-4 flex items-center space-x-2 ">
                <label className="block text-sm font-medium text-gray-700 mb-2 w-52">
                  Bank Charges (if any)
                </label>
                <input
                  type="text"
                  value={formData.bankCharges}
                  onChange={(e) =>
                    handleInputChange("bankCharges", e.target.value)
                  }
                  className=" focus:outline-none border border-gray-300 rounded px-3 py-2  flex items-center justify-between bg-white text-sm w-96 "
                />
              </div>

              {/* Payment Date */}
              <div className="mb-4 flex items-center space-x-2">
                <label className="block text-sm font-medium text-red-600 mb-2 w-52">
                  Payment Date*
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.paymentDate}
                    onChange={(e) =>
                      handleInputChange("paymentDate", e.target.value)
                    }
                    className={` focus:outline-none border border-gray-300 rounded px-3 py-2  flex items-center justify-between bg-white text-sm w-96 ${
                      validationErrors.paymentDate ? "border-red-500" : ""
                    }`}
                  />
                  {validationErrors.paymentDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {validationErrors.paymentDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Number */}
              <div className="mb-4 flex items-center space-x-2">
                <label className="block text-sm font-medium text-red-600 mb-2 w-52">
                  Payment #*
                </label>
                <div className="relative w-96">
                  <input
                    type="text"
                    value={formData.paymentNumber}
                    onChange={(e) => {
                      handleInputChange("paymentNumber", e.target.value);
                      // Disable auto-generation if manually edited
                      if (paymentNumberConfig.autoGenerate) {
                        handlePaymentNumberConfigChange({
                          autoGenerate: false,
                        });
                      }
                    }}
                    className={`border border-gray-300 rounded px-3 py-2 w-full pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      paymentNumberConfig.autoGenerate
                        ? "bg-gray-50 text-gray-600"
                        : "bg-white text-gray-900"
                    } ${
                      validationErrors.paymentNumber ? "border-red-500" : ""
                    }`}
                    placeholder="Payment number will be auto-generated"
                    readOnly={paymentNumberConfig.autoGenerate}
                  />
                  {validationErrors.paymentNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {validationErrors.paymentNumber}
                    </p>
                  )}

                  <div className="flex items-center space-x-1 absolute right-1 top-1 bottom-1">
                    {/* Auto-generate toggle button */}
                    {!paymentNumberConfig.autoGenerate && (
                      <button
                        onClick={() => toggleAutoGeneration(true)}
                        className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors font-medium"
                        title="Enable auto-generation"
                      >
                        Auto
                      </button>
                    )}

                    {/* Refresh button for auto-generated numbers */}
                    {paymentNumberConfig.autoGenerate && (
                      <button
                        onClick={generateManualPaymentNumber}
                        className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Generate new payment number"
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
                        title="Configure payment number settings"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                      <div className="absolute w-64 -top-8 right-0 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-10">
                        Configure payment number format and auto-generation
                        settings.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Mode */}
              <div className="mb-4 flex items-center space-x-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 w-52">
                  Payment Mode
                </label>
                <div className="relative w-96 dropdown-container">
                  <div
                    className="border border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white text-sm"
                    onClick={() =>
                      setPaymentModeDropdownOpen(!paymentModeDropdownOpen)
                    }
                  >
                    <span className="text-gray-700">
                      {formData.paymentMode || "Select payment mode"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>

                  {paymentModeDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                      {/* Search Input */}
                      <div className="p-3 border-b border-gray-100">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search"
                            value={paymentModeSearchTerm}
                            onChange={(e) =>
                              setPaymentModeSearchTerm(e.target.value)
                            }
                            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Payment Mode List */}
                      <div className="max-h-60 overflow-y-auto">
                        {filteredPaymentModes.length > 0 ? (
                          <>
                            {filteredPaymentModes.map((mode) => (
                              <div
                                key={mode.id}
                                className={`flex items-center p-3 cursor-pointer transition-colors hover:bg-gray-50 ${
                                  formData.paymentMode === mode.name
                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                    : ""
                                }`}
                                onClick={() => handlePaymentModeSelect(mode)}
                              >
                                <div className="flex-1 min-w-0">
                                  <div
                                    className={`font-medium text-sm ${
                                      formData.paymentMode === mode.name
                                        ? "text-white"
                                        : "text-gray-900"
                                    }`}
                                  >
                                    {mode.name}
                                  </div>
                                </div>
                                {formData.paymentMode === mode.name && (
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
                              {paymentModeSearchTerm
                                ? "No payment modes found for your search"
                                : "No payment modes found"}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Configure Payment Mode Button */}
                      <div className="border-t border-gray-100">
                        <button
                          className="flex items-center w-full text-left p-3 text-blue-500 hover:bg-blue-50 transition-colors text-sm"
                          onClick={handleConfigurePaymentMode}
                        >
                          <div className="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="font-medium">
                            Configure Payment Mode
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Deposit To - Updated with searchable categorized dropdown */}
              <div className="mb-4 flex items-center space-x-2">
                <label className="block text-sm font-medium text-red-600 mb-2 w-52">
                  Deposit To*
                </label>
                <div className="relative w-96" ref={depositDropdownRef}>
                  {/* Dropdown Trigger */}
                  <button
                    type="button"
                    onClick={toggleDepositDropdown}
                    className={`w-full px-3 py-2 text-left bg-white border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors ${
                      validationErrors.depositTo ? "border-red-500" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="block truncate text-gray-900">
                        {formData.depositTo}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-blue-500 transition-transform duration-200 ${
                          showDepositDropdown ? "transform rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>
                  {validationErrors.depositTo && (
                    <p className="text-red-500 text-xs mt-1">
                      {validationErrors.depositTo}
                    </p>
                  )}

                  {/* Dropdown Menu */}
                  {showDepositDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden">
                      {/* Search Input */}
                      <div className="p-3 bg-gray-50 border-b border-gray-200">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            ref={depositSearchInputRef}
                            type="text"
                            placeholder="Search"
                            value={depositSearchTerm}
                            onChange={(e) =>
                              setDepositSearchTerm(e.target.value)
                            }
                            className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      {/* Account Categories */}
                      <div className="max-h-60 overflow-y-auto">
                        {Object.keys(filteredDepositCategories).length > 0 ? (
                          Object.entries(filteredDepositCategories).map(
                            ([category, accounts]) => (
                              <div key={category}>
                                {/* Category Header */}
                                <div className="px-3 py-2 bg-gray-100 text-sm font-medium text-gray-700 border-b border-gray-200">
                                  {category}
                                </div>

                                {/* Category Items */}
                                {accounts.map((account, index) => (
                                  <button
                                    key={`${category}-${index}`}
                                    type="button"
                                    onClick={() => handleDepositSelect(account)}
                                    className={`w-full px-3 py-2.5 text-left text-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                                      formData.depositTo === account
                                        ? "bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600"
                                        : "text-gray-900"
                                    }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span
                                        className="truncate"
                                        title={account}
                                      >
                                        {account}
                                      </span>

                                      {formData.depositTo === account && (
                                        <svg
                                          className="w-4 h-4 text-white ml-2 flex-shrink-0"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      )}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            )
                          )
                        ) : (
                          <div className="px-3 py-4 text-center text-gray-500 text-sm">
                            No accounts found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Reference */}
              <div className="mb-4 flex items-center space-x-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 w-52">
                  Reference#
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.reference}
                    onChange={(e) =>
                      handleInputChange("reference", e.target.value)
                    }
                    className=" px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-sm w-96"
                  />
                </div>
              </div>

              {/* Unpaid Invoices Section */}
              <div className="mb-6 w-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-sm font-medium text-gray-700">
                      Unpaid Invoices
                    </h3>
                    <div>
                      <button
                        onClick={() => setModalOpen(true)}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{displayLabel}</span>
                      </button>

                      <DateRangeFilterModal
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        onApply={handleDateRangeApply}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {parseFloat(formData.amountReceived) > 0 &&
                      unpaidInvoices.length > 0 && (
                        <button
                          onClick={autoApplyPayment}
                          className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          Auto Apply
                        </button>
                      )}
                    <button
                      onClick={clearInvoiceSelection}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
                      disabled={Object.values(invoicePayments).every(
                        (amount) => amount === 0
                      )}
                    >
                      Clear Applied Amount
                    </button>
                  </div>
                </div>

                {/* Invoice Table */}
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  {/* Table Headers */}
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <div className="grid grid-cols-6 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div>Date</div>
                      <div>Invoice Number</div>
                      <div>Invoice Amount</div>
                      <div>Amount Due</div>
                      <div>Payment Received On</div>
                      <div>Payment</div>
                    </div>
                  </div>

                  {/* Loading State */}
                  {isLoadingInvoices && (
                    <div className="text-center py-12 bg-white">
                      <Loader className="w-6 h-6 animate-spin mx-auto text-blue-500 mb-2" />
                      <p className="text-sm text-gray-500">
                        Loading unpaid invoices...
                      </p>
                    </div>
                  )}

                  {/* Error State */}
                  {invoiceError && (
                    <div className="text-center py-12 bg-white">
                      <p className="text-sm text-red-500 mb-2">
                        {invoiceError}
                      </p>
                      <button
                        onClick={() =>
                          fetchUnpaidInvoices(formData.customer_id)
                        }
                        className="text-blue-500 text-sm hover:underline"
                      >
                        Retry
                      </button>
                    </div>
                  )}

                  {/* Invoice List */}
                  {!isLoadingInvoices &&
                    !invoiceError &&
                    unpaidInvoices.length > 0 && (
                      <div className="bg-white">
                        {unpaidInvoices.map((invoice, index) => (
                          <div
                            key={invoice.id}
                            className={`grid grid-cols-6 gap-4 px-4 py-3 hover:bg-gray-50 transition-colors ${
                              index !== unpaidInvoices.length - 1
                                ? "border-b border-gray-100"
                                : ""
                            }`}
                          >
                            {/* Date */}
                            <div className="flex flex-col">
                              <div className="text-base text-gray-900 font-medium">
                                {formatToDDMMYYYY(invoice.invoiceDate)}
                              </div>
                              <div className="text-sm text-nowrap">
                                Due Date: {formatToDDMMYYYY(invoice.dueDate)}
                              </div>
                            </div>

                            {/* Invoice Number */}
                            <div className="flex flex-col justify-center">
                              <div className="text-sm text-blue-600 font-medium hover:text-blue-800 cursor-pointer">
                                {invoice.invoiceNumber}
                              </div>
                            </div>

                            {/* Invoice Amount */}
                            <div className="flex items-center">
                              <div className="text-sm text-gray-900 font-medium">
                                {invoice.totalAmount?.toLocaleString() || "0"}
                              </div>
                            </div>

                            {/* Amount Due */}
                            <div className="flex items-center">
                              <div className="text-sm text-gray-900 font-medium">
                                {invoice.amountDue?.toLocaleString() || "0"}
                              </div>
                            </div>

                            {/* Payment Received On */}
                            <div className="flex items-center">
                              <input
                                type="date"
                                value={invoicePaymentDates[invoice.id] || ""}
                                onChange={(e) =>
                                  handleInvoicePaymentDateChange(
                                    invoice.id,
                                    e.target.value
                                  )
                                }
                                className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                              />
                            </div>

                            {/* Payment Input */}
                            <div className="flex items-center">
                              <input
                                type="number"
                                value={invoicePayments[invoice.id] || ""}
                                onChange={(e) =>
                                  handleInvoicePaymentChange(
                                    invoice.id,
                                    e.target.value
                                  )
                                }
                                placeholder=""
                                min="0"
                                max={invoice.amountDue}
                                step="0.01"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-right"
                              />
                            </div>
                          </div>
                        ))}

                        {/* Total Row */}
                        <div className="grid grid-cols-6 gap-4 px-4 py-3 bg-gray-50 border-t border-gray-200 font-medium">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div className="text-sm text-gray-900">Total</div>
                          <div className="text-sm text-gray-900 text-right">
                            {Object.values(invoicePayments)
                              .reduce(
                                (sum, amount) =>
                                  sum + (parseFloat(amount) || 0),
                                0
                              )
                              .toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )}

                  {/* No Invoices Message */}
                  {!isLoadingInvoices &&
                    !invoiceError &&
                    unpaidInvoices.length === 0 && (
                      <div className="text-center py-12 bg-white text-gray-500">
                        <div className="flex flex-col items-center">
                          <svg
                            className="w-12 h-12 text-gray-300 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <p className="text-sm font-medium text-gray-500 mb-1">
                            No unpaid invoices found
                          </p>
                          <p className="text-xs text-gray-400">
                            There are no unpaid invoices associated with this
                            customer.
                          </p>
                        </div>
                      </div>
                    )}
                </div>

                {/* Summary Section */}
                <div className="bg-gray-50 px-4 py-4 mt-0 rounded-b-md border-t border-gray-200">
                  <div className="flex justify-between items-start">
                    <div className="text-xs text-gray-500">
                      <p>**List contains only SENT invoices</p>
                      {unpaidInvoices.length > 0 && (
                        <p className="mt-1">
                          Total: {unpaidInvoices.length} invoice
                          {unpaidInvoices.length !== 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2 text-right min-w-0">
                      <div className="flex justify-between items-center w-64 text-sm">
                        <span className="text-gray-600">Total</span>
                        <span className="font-medium text-gray-900">
                          {paymentSummary.total.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center w-64 text-sm">
                        <span className="text-gray-600">Amount Received</span>
                        <span className="font-medium text-gray-900">
                          {paymentSummary.amountReceived.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center w-64 text-sm">
                        <span className="text-gray-600">
                          Amount used for Payments
                        </span>
                        <span className="font-medium text-gray-900">
                          {paymentSummary.totalPaymentsApplied.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center w-64 text-sm">
                        <span className="text-gray-600">Amount Refunded</span>
                        <span className="font-medium text-gray-900">
                          {paymentSummary.amountRefunded.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center w-64 text-sm border-t border-gray-300 pt-2">
                        <span className="text-gray-600 font-medium">
                          Amount in Excess
                        </span>
                        <span
                          className={`font-semibold ${
                            paymentSummary.amountInExcess > 0
                              ? "text-red-600"
                              : "text-gray-900"
                          }`}
                        >
                          {formData.customerData?.cu_currency || "AED"}{" "}
                          {paymentSummary.amountInExcess.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes Section */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-sm"
                    placeholder="Enter notes..."
                  />
                </div>

                {/* File Upload - Updated to use new component */}
                <FileUploadComponent />

                {/* Footer Note */}
                <div className="mt-4 text-xs text-gray-500">
                  <p>
                    Additional Fields: Start adding custom fields for your
                    payment workflows by going to Settings → Preferences →
                    Modules.
                  </p>
                </div>
              </div>

              {/* Action Buttons - UPDATED with loading states */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSaving && <Loader className="w-4 h-4 mr-2 animate-spin" />}
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
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

      {/* Customer Details Panel */}
      {showCustomerDetailsModal && customerDetailsData && (
        <CustomerDetailsModal
          isOpen={showCustomerDetailsModal}
          onClose={handleCloseCustomerDetails}
          customerData={formData.customerData}
          onExternalLinkClick={handleExternalLinkClick}
        />
      )}

      {/* Payment Number Configuration Modal */}
      <QuoteNumberPreferences
        isOpen={configureModalOpen}
        onClose={() => setConfigureModalOpen(false)}
        currentConfig={paymentNumberConfig}
        onConfigChange={handlePaymentNumberConfigChange}
        source="payment"
      />

      {/* Configure Payment Mode Modal */}
      <ConfigurePaymentModeModal
        isOpen={showConfigurePaymentModeModal}
        onClose={() => setShowConfigurePaymentModeModal(false)}
        onSave={handleSavePaymentModeConfig}
        selectedPaymentMode={formData.paymentMode}
        onPaymentModeSelect={handlePaymentModeSelectFromModal}
      />
    </div>
  );
};

export default PaymentRecevibleForm;
