import { useState, useEffect } from "react";
import {
  ChevronDown,
  Plus,
  MoreVertical,
  HelpCircle,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../../CommonUI/buttons/CommonButton";
import FilterModal from "../customers/FilterModal";
import CustomerTable from "../customers/CustomerTable";
import ImportCustomersModal from "../customers/sort/importCustomer/ImportCustomersModal";
import ExportCurrentView from "../customers/sort/exportCurrentView/ExportCurrentView";
import ExportCustomersModal from "../customers/sort/exportCustomer/ExportCustomersModal";
import SortOptionsDropdown from "../customers/sort/SortOptionsDropdown";
import { ReusableFilterDropdown } from "../customers/filterMenus/ReusableFilterDropdown";
import { GET_ALL_PAYMENT_RECEIVED } from "../../../api/services/sales/createCustomer";

const allColumns = [
  { label: "Date", accessor: "date", key: "date" },
  { label: "Payment #", accessor: "paymentNumber", key: "paymentNumber" },
  {
    label: "Reference number",
    accessor: "referenceNumber",
    key: "referenceNumber",
  },
  { label: "Customer Name", accessor: "customerName", key: "customerName" },
  { label: "Invoice#", accessor: "invoiceNumber", key: "invoiceNumber" },
  { label: "Mode", accessor: "mode", key: "mode" },
  { label: "Amount", accessor: "amount", key: "amount" },
  { label: "Unused Amount", accessor: "unusedAmount", key: "unusedAmount" },
  { label: "Payment Type", accessor: "paymentType", key: "paymentType" },
  // Additional API-specific columns
  { label: "Description", accessor: "description", key: "description" },
  { label: "Created By", accessor: "createdBy", key: "createdBy" },
  { label: "Payment Status", accessor: "paymentStatus", key: "paymentStatus" },
  { label: "Bank Details", accessor: "bankDetails", key: "bankDetails" },
  { label: "Transaction ID", accessor: "transactionId", key: "transactionId" },
  { label: "Exchange Rate", accessor: "exchangeRate", key: "exchangeRate" },
  { label: "Notes", accessor: "notes", key: "notes" },
  { label: "Tax Amount", accessor: "taxAmount", key: "taxAmount" },
  { label: "Deposit To", accessor: "depositTo", key: "depositTo" },
  { label: "PDF Document", accessor: "pdfUrl", key: "pdfUrl" },
];

// Helper function to format date to match "29 May 2025" format
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  // Format as "29 May 2025" to match your existing format
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Helper function to format currency as number (matches your exact format)
const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return 0.0;
  const numAmount =
    typeof amount === "string"
      ? parseFloat(amount.replace(/[^\d.-]/g, ""))
      : Number(amount);
  return parseFloat(numAmount.toFixed(2));
};

// Helper function to format payment mode based on backend number codes
const formatPaymentMode = (modeCode) => {
  if (modeCode === null || modeCode === undefined) return "Cash";

  // Map backend payment mode codes to display text
  const modeMap = {
    0: "Cash",
    1: "Bank Transfer",
    2: "Credit Card",
    3: "Debit Card",
    4: "Cheque",
    5: "Online",
    6: "UPI",
    7: "Wallet",
    8: "Other",
  };

  return modeMap[modeCode] || "Cash";
};

// Helper function to determine payment type based on amount data
const determinePaymentType = (apiPayment) => {
  const amountReceived = apiPayment.pr_amount_received || 0;
  const amountUsed = apiPayment.pr_amount_used || 0;
  const amountExcess = apiPayment.pr_amount_excess || 0;
  const amountRefunded = apiPayment.pr_amount_refunded || 0;

  // Logic to determine payment type based on amounts
  if (amountRefunded > 0) {
    return "Refund";
  } else if (amountExcess > 0) {
    return "Advance Payment";
  } else if (amountUsed < amountReceived) {
    return "Partial Payment";
  } else {
    return "Customer Payment";
  }
};

// Function to transform API response to UI format (matching your exact backend structure)
const transformPaymentData = (apiPayment) => {
  return {
    id: apiPayment.pr_id
      ? apiPayment.pr_id.toString()
      : Math.random().toString(),
    date: formatDate(apiPayment.pr_payment_date),
    paymentNumber: apiPayment.pr_payment_number || "",
    referenceNumber: apiPayment.pr_reference || "",
    customerName:
      apiPayment.customer_name || `Customer ${apiPayment.pr_customer_id}`, // Fallback to customer ID if name not available
    invoiceNumber: apiPayment.invoice_number || "", // This might need to be fetched separately or joined in backend
    mode: formatPaymentMode(apiPayment.pr_payment_mode),
    amount: formatCurrency(apiPayment.pr_amount_received),
    unusedAmount: formatCurrency(apiPayment.pr_amount_excess),
    paymentType: determinePaymentType(apiPayment),

    // Additional API-specific fields from your backend
    amountUsed: formatCurrency(apiPayment.pr_amount_used),
    amountRefunded: formatCurrency(apiPayment.pr_amount_refunded),
    bankCharges: formatCurrency(apiPayment.pr_bank_charges),
    total: formatCurrency(apiPayment.pr_total),
    depositTo: apiPayment.pr_deposit_to || "",
    notes: apiPayment.pr_notes || "",
    customerId: apiPayment.pr_customer_id,
    userId: apiPayment.pr_user_id,
    createdAt: apiPayment.pr_created_at,
    updatedAt: apiPayment.pr_updated_at,

    // Keep original API data for reference
    originalData: apiPayment,
  };
};

export default function PaymentReceivedLayout() {
  const navigate = useNavigate();

  // State management
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showExportCurrentView, setShowExportCurrentView] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importOption, setImportOption] = useState("customers");

  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState({
    id: "all",
    label: "All Received Payments",
  });

  // Store original unfiltered data
  const [originalCustomers, setOriginalCustomers] = useState([]);

  // Fetch payment received data
  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching payments from API...");
      const paymentsData = await GET_ALL_PAYMENT_RECEIVED();
      console.log("Raw API response:", paymentsData);

      // Handle different API response structures
      let rawPayments = [];
      if (Array.isArray(paymentsData)) {
        rawPayments = paymentsData;
      } else if (paymentsData.data && Array.isArray(paymentsData.data)) {
        rawPayments = paymentsData.data;
      } else if (
        paymentsData.payments &&
        Array.isArray(paymentsData.payments)
      ) {
        rawPayments = paymentsData.payments;
      } else if (paymentsData.results && Array.isArray(paymentsData.results)) {
        rawPayments = paymentsData.results;
      } else {
        console.warn("Unexpected API response structure:", paymentsData);
        rawPayments = [];
      }

      console.log("Raw payments array:", rawPayments);

      // Transform API data to UI format
      const transformedPayments = rawPayments.map(transformPaymentData);
      console.log("Transformed payments:", transformedPayments);

      setCustomers(transformedPayments);
      setOriginalCustomers(transformedPayments);
    } catch (err) {
      console.error("Error fetching payments:", err);
      setError(err.message || "Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  // Load payments on component mount
  useEffect(() => {
    fetchPayments();
  }, []);

  // Customer filter options - dynamically calculated from original data
  const customerDefaultFilters = [
    {
      id: "all",
      label: "All Received Payments",
      count: originalCustomers.length,
    },
    {
      id: "customer-payment",
      label: "Customer Payment",
      count: originalCustomers.filter(
        (c) => c.paymentType?.toLowerCase() === "customer payment"
      ).length,
    },
    {
      id: "advance-payment",
      label: "Advance Payment",
      count: originalCustomers.filter(
        (c) => c.paymentType?.toLowerCase() === "advance payment"
      ).length,
    },
    {
      id: "partial-payment",
      label: "Partial Payment",
      count: originalCustomers.filter(
        (c) => c.paymentType?.toLowerCase() === "partial payment"
      ).length,
    },
    {
      id: "refund",
      label: "Refund",
      count: originalCustomers.filter(
        (c) => c.paymentType?.toLowerCase() === "refund"
      ).length,
    },
    {
      id: "cash",
      label: "Cash Payments",
      count: originalCustomers.filter((c) => c.mode?.toLowerCase() === "cash")
        .length,
    },
    {
      id: "bank-transfer",
      label: "Bank Transfer",
      count: originalCustomers.filter(
        (c) => c.mode?.toLowerCase() === "bank transfer"
      ).length,
    },
    {
      id: "credit-card",
      label: "Credit Card",
      count: originalCustomers.filter(
        (c) => c.mode?.toLowerCase() === "credit card"
      ).length,
    },
    {
      id: "unused-amount",
      label: "With Unused Amount",
      count: originalCustomers.filter((c) => c.unusedAmount > 0).length,
    },
  ];

  const handleCustomerFilterSelect = (filter) => {
    setSelectedCustomerFilter(filter);
    console.log("Customer filter selected:", filter);

    // Apply filtering logic
    if (filter.id === "all") {
      setCustomers(originalCustomers); // Show all original data
    } else if (
      filter.id === "customer-payment" ||
      filter.id === "advance-payment" ||
      filter.id === "partial-payment" ||
      filter.id === "refund"
    ) {
      // Filter by payment type
      const filteredCustomers = originalCustomers.filter(
        (customer) =>
          customer.paymentType?.toLowerCase() === filter.label.toLowerCase()
      );
      setCustomers(filteredCustomers);
    } else if (
      filter.id === "cash" ||
      filter.id === "bank-transfer" ||
      filter.id === "credit-card"
    ) {
      // Filter by payment mode
      const filteredCustomers = originalCustomers.filter(
        (customer) =>
          customer.mode?.toLowerCase() === filter.label.toLowerCase()
      );
      setCustomers(filteredCustomers);
    } else if (filter.id === "unused-amount") {
      // Filter payments with unused amount
      const filteredCustomers = originalCustomers.filter(
        (customer) => customer.unusedAmount > 0
      );
      setCustomers(filteredCustomers);
    }
  };

  const customerCustomFilters = [
    {
      id: "sample-custom",
      label: "Sample custom view",
      count: 5,
      hasDropdown: true,
    },
    { id: "my-vip-customers", label: "My VIP Customers", count: 10 },
  ];

  const handleNewCustomerView = () => {
    console.log("Creating new customer custom view");
    // Add your new custom view logic here
  };

  const handleMenuSelect = (label) => {
    if (label === "Import Customers") {
      setShowImportModal(true);
    } else if (label === "Export Customers") {
      setShowExportModal(true);
    } else if (label === "Export Current View") {
      setShowExportCurrentView(true);
    } else if (label === "Preferences") {
      navigate("/customers-vendors");
    }
  };

  // Updated filterFields to include all new columns
  const [filterFields, setFilterFields] = useState({
    date: true,
    paymentNumber: true,
    referenceNumber: true,
    customerName: true,
    invoiceNumber: true,
    mode: false,
    amount: false,
    unusedAmount: false,
    paymentType: false,
    // Additional API fields
    description: false,
    createdBy: false,
    paymentStatus: false,
    bankDetails: false,
    transactionId: false,
    exchangeRate: false,
    notes: false,
    taxAmount: false,
    depositTo: false,
    pdfUrl: false,
  });

  const visibleColumns = allColumns.filter((col) => filterFields[col.key]);

  // Updated handleRowClick to pass the entire row data
  const handleRowClick = (id) => {
    const selectedPayment = customers.find((customer) => customer.id === id);
    console.log("selectedPayment==>>", selectedPayment);

    navigate(`/PaymentReceipt/${id}`, {
      state: {
        paymentData: selectedPayment,
        title: "PAYMENT RECEIPT",
        backToPath: "/payemntReceived",
        editForm: "/PaymentRecevibleForm",
      },
    });
  };

  const handleDeleteSelected = () => {
    // Optional: Confirm before deleting
    if (
      window.confirm("Are you sure you want to delete the selected records?")
    ) {
      const filtered = customers.filter(
        (customer) => !selectedRows.includes(customer.id)
      );
      setCustomers(filtered);
      setSelectedRows([]); // Clear selection after deletion
      setSelectAll(false);

      // TODO: Add API call to delete selected payments from backend
      // Example: await DELETE_PAYMENTS(selectedRows);
    }
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(!selectAll ? customers.map((c) => c.id) : []);
  };

  const handleRefresh = () => {
    fetchPayments();
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="animate-spin h-5 w-5" />
          <span>Loading payments...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header section */}
      <div className="w-full bg-white">
        <div className="flex items-center w-full justify-between p-4 border-b">
          <ReusableFilterDropdown
            selectedFilter={selectedCustomerFilter}
            onFilterSelect={handleCustomerFilterSelect}
            dropdownTitle="All Received Payments"
            defaultFilters={customerDefaultFilters}
            customFilters={customerCustomFilters}
            onNewCustomView={handleNewCustomerView}
            showSearch={true}
            showNewCustomView={true}
            showStarIcons={true}
            dropdownWidth="w-80"
            showDefaultFilters={true}
          />
          <div className="flex items-center gap-2">
            {/* Error notification */}
            {error && (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded text-sm">
                API Error: {error}
              </div>
            )}

            {selectedRows.length > 0 && (
              <div className="flex justify-end p-4">
                <CommonButton
                  label="Delete Selected"
                  onClick={handleDeleteSelected}
                  className="bg-gray-300 hover:bg-gray-400 text-red-600 px-4 py-2 rounded"
                />
              </div>
            )}

            {/* Refresh Button */}
            <CommonButton
              label={<RefreshCw size={20} />}
              onClick={handleRefresh}
              className="p-2 text-gray-600 border border-gray-300 hover:bg-gray-100 rounded"
              title="Refresh payments"
            />

            <CommonButton
              label={
                <div className="flex items-center">
                  <Plus size={20} className="mr-1" /> New
                </div>
              }
              onClick={() => navigate("/PaymentRecevibleForm")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            />
            <SortOptionsDropdown onMenuSelect={handleMenuSelect} />

            <ImportCustomersModal
              isOpen={showImportModal}
              onClose={() => setShowImportModal(false)}
              selectedOption={importOption}
              setSelectedOption={setImportOption}
            />

            {showExportModal && (
              <ExportCustomersModal
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
                defaultModule="Payments"
              />
            )}

            {showExportCurrentView && (
              <ExportCurrentView
                isOpen={showExportCurrentView}
                onClose={() => setShowExportCurrentView(false)}
              />
            )}

            <CommonButton
              label={<HelpCircle size={20} />}
              className="p-2 text-white bg-orange-500 hover:bg-orange-600 rounded"
            />
          </div>
        </div>
      </div>

      {/* table */}
      <div className="w-full overflow-x-auto">
        <div className="w-full">
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              <CustomerTable
                columns={visibleColumns}
                data={customers}
                onRowClick={handleRowClick}
                selectedRows={selectedRows}
                onRowSelect={handleRowSelect}
                selectAll={selectAll}
                onSelectAll={handleSelectAll}
                rowHighlightKey={selectedCustomerId}
                onFilterClick={() => setIsFilterModalOpen(true)}
              />
            </div>
          </div>
        </div>

        {isFilterModalOpen && (
          <FilterModal
            filterFields={filterFields}
            setFilterFields={setFilterFields}
            onClose={() => setIsFilterModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
