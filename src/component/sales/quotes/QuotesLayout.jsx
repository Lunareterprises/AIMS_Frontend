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
import { GET_ALL_QUOTES } from "../../../api/services/sales/createCustomer";

const allColumns = [
  { label: "Date", accessor: "date", key: "date" },
  { label: "Quote Number", accessor: "quoteNumber", key: "quoteNumber" },
  {
    label: "Reference Number",
    accessor: "referenceNumber",
    key: "referenceNumber",
  },
  { label: "Customer Name", accessor: "customerName", key: "customerName" },
  { label: "Status", accessor: "status", key: "status" },
  { label: "Amount", accessor: "amount", key: "amount" },
  { label: "Accepted Date", accessor: "acceptedDate", key: "acceptedDate" },
  { label: "Company Name", accessor: "companyName", key: "companyName" },
  { label: "Declined Date", accessor: "declinedDate", key: "declinedDate" },
  { label: "Expiry Date", accessor: "expiryDate", key: "expiryDate" },
  { label: "Sales Person", accessor: "salesPerson", key: "salesPerson" },
  { label: "Sub Total", accessor: "subTotal", key: "subTotal" },
];

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
};

// Helper function to format currency
const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return "";
  return `AED ${Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// Helper function to capitalize status
const formatStatus = (status) => {
  if (!status) return "";
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

// Function to transform API response to UI format
const transformQuoteData = (apiQuote) => {
  return {
    id: apiQuote.q_id,
    date: formatDate(apiQuote.q_date),
    quoteNumber: apiQuote.q_no || "",
    referenceNumber: apiQuote.q_reference || "",
    customerName: apiQuote.customerName || apiQuote.customer_name || "N/A", // You might need to join with customer table
    status: formatStatus(apiQuote.q_status),
    amount: formatCurrency(apiQuote.q_total),
    acceptedDate: "", // You may need to add this field to your API response
    companyName: apiQuote.companyName || apiQuote.company_name || "N/A", // You might need to join with customer table
    declinedDate: "", // You may need to add this field to your API response
    expiryDate: formatDate(apiQuote.q_expiry_date),
    salesPerson:
      apiQuote.salesPersonName || apiQuote.sales_person_name || "N/A", // You might need to join with sales person table
    subTotal: formatCurrency(apiQuote.q_sub_total),

    // Keep original API data for reference
    originalData: apiQuote,
  };
};

export default function QuotesLayout() {
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
    label: "All Quotes",
  });

  // Fetch quotes data
  const fetchQuotes = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching quotes from API...");
      const quotesData = await GET_ALL_QUOTES();
      console.log("Raw API response:", quotesData);

      // Handle different API response structures
      let rawQuotes = [];
      if (Array.isArray(quotesData)) {
        rawQuotes = quotesData;
      } else if (quotesData.data && Array.isArray(quotesData.data)) {
        rawQuotes = quotesData.data;
      } else if (quotesData.quotes && Array.isArray(quotesData.quotes)) {
        rawQuotes = quotesData.quotes;
      } else if (quotesData.results && Array.isArray(quotesData.results)) {
        rawQuotes = quotesData.results;
      } else {
        console.warn("Unexpected API response structure:", quotesData);
        rawQuotes = [];
      }

      console.log("Raw quotes array:", rawQuotes);

      // Transform API data to UI format
      const transformedQuotes = rawQuotes.map(transformQuoteData);
      console.log("Transformed quotes:", transformedQuotes);

      setCustomers(transformedQuotes);
    } catch (err) {
      console.error("Error fetching quotes:", err);
      setError(err.message || "Failed to fetch quotes");

      // Use fallback data if API fails
      console.log("Using fallback data due to API error");
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  // Load quotes on component mount
  useEffect(() => {
    fetchQuotes();
  }, []);

  // Customer filter options - dynamically calculated from data
  const customerDefaultFilters = [
    { id: "all", label: "All Quotes", count: customers?.length },
    {
      id: "draft",
      label: "Draft",
      count: customers?.filter((c) => c.status?.toLowerCase() === "draft")
        .length,
    },
    {
      id: "pending-approval",
      label: "Pending Approval",
      count: customers?.filter(
        (c) => c.status?.toLowerCase() === "pending approval"
      ).length,
    },
    {
      id: "approved",
      label: "Approved",
      count: customers?.filter((c) => c.status?.toLowerCase() === "approved")
        .length,
    },
    {
      id: "sent",
      label: "Sent",
      count: customers?.filter((c) => c.status?.toLowerCase() === "sent")
        .length,
    },
    {
      id: "customer-viewed",
      label: "Customer Viewed",
      count: customers?.filter(
        (c) => c.status?.toLowerCase() === "customer viewed"
      ).length,
    },
    {
      id: "accepted",
      label: "Accepted",
      count: customers?.filter((c) => c.status?.toLowerCase() === "accepted")
        .length,
    },
    {
      id: "invoiced",
      label: "Invoiced",
      count: customers?.filter((c) => c.status?.toLowerCase() === "invoiced")
        .length,
    },
    {
      id: "declined",
      label: "Declined",
      count: customers?.filter((c) => c.status?.toLowerCase() === "declined")
        .length,
    },
    {
      id: "expired",
      label: "Expired",
      count: customers?.filter((c) => c.status?.toLowerCase() === "expired")
        .length,
    },
  ];

  const handleCustomerFilterSelect = (filter) => {
    setSelectedCustomerFilter(filter);
    console.log("Customer filter selected:", filter);

    // Apply filtering logic
    if (filter.id === "all") {
      fetchQuotes(); // Reload all data
    } else {
      // Filter current data based on status
      const filteredCustomers = customers.filter(
        (customer) =>
          customer.status?.toLowerCase() === filter.label.toLowerCase()
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

  const [filterFields, setFilterFields] = useState({
    date: true,
    quoteNumber: true,
    referenceNumber: true,
    customerName: true,
    status: true,
    amount: true,
    acceptedDate: false,
    companyName: false,
    declinedDate: false,
    expiryDate: false,
    salesPerson: false,
    subTotal: false,
  });

  const visibleColumns = allColumns.filter((col) => filterFields[col.key]);

  // Updated handleRowClick to pass the entire row data
  const handleRowClick = (id) => {
    const selectedQuote = customers.find((customer) => customer.id === id);
    console.log("====================================");
    console.log("Selected Quote:", selectedQuote);
    console.log("====================================");
    navigate(`/QuotesDetailedPage/${id}`, {
      state: {
        quoteData: selectedQuote,
        title: "Quote",
        backToPath: "/Addqoutes",
        editForm: `/QuotesForm`,
        mailForm: `/QuotesMailPage`,
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

      // TODO: Add API call to delete selected quotes from backend
      // Example: await DELETE_QUOTES(selectedRows);
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
    fetchQuotes();
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="animate-spin h-5 w-5" />
          <span>Loading quotes...</span>
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
            dropdownTitle="All Quotes"
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
                API Error: Using fallback data
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
              title="Refresh quotes"
            />

            <CommonButton
              label={
                <div className="flex items-center">
                  <Plus size={20} className="mr-1" /> New
                </div>
              }
              onClick={() => navigate("/QuotesForm")}
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
                defaultModule="Quotes"
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
