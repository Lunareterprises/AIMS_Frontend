import { useState, useEffect } from 'react';
import {
  ChevronDown, Plus, MoreVertical, HelpCircle, RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../../CommonUI/buttons/CommonButton';
import FilterModal from '../customers/FilterModal';
import CustomerTable from '../customers/CustomerTable';
import ImportCustomersModal from '../customers/sort/importCustomer/ImportCustomersModal';
import ExportCurrentView from '../customers/sort/exportCurrentView/ExportCurrentView';
import ExportCustomersModal from '../customers/sort/exportCustomer/ExportCustomersModal';
import SortOptionsDropdown from '../customers/sort/SortOptionsDropdown';
import { ReusableFilterDropdown } from '../customers/filterMenus/ReusableFilterDropdown';
// TODO: Replace with your actual API import path
import { GET_ALL_INVOICES } from '../../../api/services/sales/createCustomer';

// Updated allColumns array with all the columns from the modal plus API-specific fields
const allColumns = [
  { label: 'Date', accessor: 'date', key: 'date' },
  { label: 'Invoice#', accessor: 'invoiceNumber', key: 'invoiceNumber' },
  { label: 'Order Number', accessor: 'orderNumber', key: 'orderNumber' },
  { label: 'Customer Name', accessor: 'customerName', key: 'customerName' },
  { label: 'Status', accessor: 'status', key: 'status' },
  { label: 'Due Date', accessor: 'dueDate', key: 'dueDate' },
  { label: 'Amount', accessor: 'amount', key: 'amount' },
  { label: 'Balance Due', accessor: 'balanceDue', key: 'balanceDue' },
  { label: 'Adjustment', accessor: 'adjustment', key: 'adjustment' },
  { label: 'Billing Address', accessor: 'billingAddress', key: 'billingAddress' },
  { label: 'CRM Potential Name', accessor: 'crmPotentialName', key: 'crmPotentialName' },
  { label: 'Company Name', accessor: 'companyName', key: 'companyName' },
  { label: 'Country', accessor: 'country', key: 'country' },
  { label: 'Created By', accessor: 'createdBy', key: 'createdBy' },
  { label: 'Due Days', accessor: 'dueDays', key: 'dueDays' },
  { label: 'Email', accessor: 'email', key: 'email' },
  { label: 'Expected Payment Date', accessor: 'expectedPaymentDate', key: 'expectedPaymentDate' },
  { label: 'Invoice Type', accessor: 'invoiceType', key: 'invoiceType' },
  { label: 'Phone', accessor: 'phone', key: 'phone' },
  { label: 'Project Name', accessor: 'projectName', key: 'projectName' },
  { label: 'Sales Person', accessor: 'salesPerson', key: 'salesPerson' },
  { label: 'Shipping Address', accessor: 'shippingAddress', key: 'shippingAddress' },
  { label: 'Shipping Charge', accessor: 'shippingCharge', key: 'shippingCharge' },
  { label: 'Sub Total', accessor: 'subTotal', key: 'subTotal' },
  // Legacy columns for backward compatibility
  { label: 'Quote Number', accessor: 'quoteNumber', key: 'quoteNumber' },
  { label: 'Reference Number', accessor: 'referenceNumber', key: 'referenceNumber' },
  { label: 'Accepted Date', accessor: 'acceptedDate', key: 'acceptedDate' },
  { label: 'Declined Date', accessor: 'declinedDate', key: 'declinedDate' },
  { label: 'Expiry Date', accessor: 'expiryDate', key: 'expiryDate' },
  // Additional API-specific columns
  { label: 'Payment Terms', accessor: 'paymentTerms', key: 'paymentTerms' },
  { label: 'Customer Note', accessor: 'customerNote', key: 'customerNote' },
  { label: 'PDF Document', accessor: 'pdfUrl', key: 'pdfUrl' }
];

// Fallback data for when API fails (matching your expected structure)
const initialCustomers = [
  {
    id: 1,
    date: '2025-05-30',
    invoiceNumber: 'INV-1001',
    orderNumber: 'ORD-001',
    quoteNumber: 'Q1001',
    referenceNumber: 'REF123',
    customerName: 'ASK',
    status: 'Open',
    dueDate: '2025-06-15',
    amount: 'AED 500.00',
    balanceDue: 'AED 500.00',
    adjustment: 'AED 0.00',
    billingAddress: '123 Main St, Dubai, UAE',
    crmPotentialName: 'ASK Portal Deal',
    companyName: 'ASK PORTAL - FZCO',
    country: 'UAE',
    createdBy: 'John Doe',
    dueDays: '15',
    email: 'ask@askportal.com',
    expectedPaymentDate: '2025-06-10',
    invoiceType: 'Standard',
    phone: '+971-50-123-4567',
    projectName: 'Website Development',
    salesPerson: 'John Doe',
    shippingAddress: '123 Main St, Dubai, UAE',
    shippingCharge: 'AED 50.00',
    subTotal: 'AED 450.00',
    acceptedDate: '2025-06-01',
    declinedDate: '',
    expiryDate: '2025-06-15'
  },
  {
    id: 2,
    date: '2025-05-28',
    invoiceNumber: 'INV-1002',
    orderNumber: 'ORD-002',
    quoteNumber: 'Q1002',
    referenceNumber: 'REF124',
    customerName: 'Tech Solutions',
    status: 'Sent',
    dueDate: '2025-06-10',
    amount: 'AED 1,250.00',
    balanceDue: 'AED 1,250.00',
    adjustment: 'AED 0.00',
    billingAddress: '456 Tech Blvd, Abu Dhabi, UAE',
    crmPotentialName: 'Tech Solutions Contract',
    companyName: 'Tech Solutions LLC',
    country: 'UAE',
    createdBy: 'Jane Smith',
    dueDays: '13',
    email: 'info@techsolutions.com',
    expectedPaymentDate: '2025-06-08',
    invoiceType: 'Standard',
    phone: '+971-50-234-5678',
    projectName: 'Mobile App Development',
    salesPerson: 'Jane Smith',
    shippingAddress: '456 Tech Blvd, Abu Dhabi, UAE',
    shippingCharge: 'AED 150.00',
    subTotal: 'AED 1,100.00',
    acceptedDate: '',
    declinedDate: '',
    expiryDate: '2025-06-10'
  }
];

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
};

// Helper function to format currency (matches your exact format)
const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return "AED 0.00";
  const numAmount = typeof amount === 'string' ? parseFloat(amount.replace(/[^\d.-]/g, '')) : Number(amount);
  return `AED ${numAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Helper function to format status (matches your exact format)
const formatStatus = (status) => {
  if (!status) return "";
  // Handle specific status mappings to match your expected format
  const statusMap = {
    'open': 'Open',
    'sent': 'Sent', 
    'accepted': 'Accepted',
    'declined': 'Declined',
    'expired': 'Expired',
    'draft': 'Draft',
    'locked': 'Locked',
    'pending approval': 'Pending Approval',
    'approved': 'Approved',
    'customer viewed': 'Customer Viewed',
    'partially paid': 'Partially Paid',
    'unpaid': 'Unpaid',
    'overdue': 'Overdue',
    'payment initiated': 'Payment Initiated',
    'paid': 'Paid',
    'void': 'Void',
    'yet to be shipped': 'Yet To Be Shipped',
    'shipped': 'Shipped',
    'debit note': 'Debit Note',
    'write off': 'Write Off'
  };
  
  const normalizedStatus = status.toLowerCase().trim();
  return statusMap[normalizedStatus] || status.charAt(0).toUpperCase() + status.slice(1);
};

// Helper function to calculate due days (matches your format)
const calculateDueDays = (dueDate) => {
  if (!dueDate) return "0";
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays.toString();
};

// Function to transform API response to UI format (matching your exact API structure)
const transformInvoiceData = (apiInvoice) => {
  return {
    id: apiInvoice.i_id || Math.random(),
    date: formatDate(apiInvoice.i_date),
    invoiceNumber: apiInvoice.i_number || "",
    orderNumber: apiInvoice.i_order_number || "",
    quoteNumber: "", // Not in API response
    referenceNumber: "", // Not in API response
    customerName: apiInvoice.customer_name || "",
    status: formatStatus(apiInvoice.i_status),
    dueDate: formatDate(apiInvoice.i_due_date),
    amount: formatCurrency(apiInvoice.i_total),
    balanceDue: formatCurrency(apiInvoice.i_total), // Assuming full amount is due if no specific balance_due field
    adjustment: formatCurrency(apiInvoice.i_adjustments || 0),
    billingAddress: "", // Not in API response
    crmPotentialName: "", // Not in API response
    companyName: "", // Not in API response
    country: "UAE", // Default value
    createdBy: "", // Not in API response
    dueDays: calculateDueDays(apiInvoice.i_due_date),
    email: "", // Not in API response
    expectedPaymentDate: formatDate(apiInvoice.i_due_date), // Using due date as expected payment date
    invoiceType: "Standard", // Default value
    phone: "", // Not in API response
    projectName: apiInvoice.i_subject || "", // Using subject as project name
    salesPerson: apiInvoice.i_sales_person || "",
    shippingAddress: "", // Not in API response
    shippingCharge: formatCurrency(apiInvoice.i_shipping_charge || 0),
    subTotal: formatCurrency(apiInvoice.i_sub_total),
    acceptedDate: "", // Not in API response
    declinedDate: "", // Not in API response
    expiryDate: formatDate(apiInvoice.i_ends_on), // Using ends_on as expiry date
    
    // Additional API-specific fields that might be useful
    paymentTerms: apiInvoice.i_terms || "",
    termsCondition: apiInvoice.i_terms_condition || "",
    customerNote: apiInvoice.i_customer_note || "",
    pdfUrl: apiInvoice.i_pdf || "",
    customerId: apiInvoice.i_customer_id,
    isRecurring: apiInvoice.i_is_recurring,
    neverExpires: apiInvoice.i_never_expires,
    createdAt: apiInvoice.i_created_at,
    
    // Keep original API data for reference
    originalData: apiInvoice
  };
};

export default function InvoicesLayout() {
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
  const [importOption, setImportOption] = useState('customers');

  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState({
    id: 'all',
    label: 'All Invoice'
  });

  // Store original unfiltered data
  const [originalCustomers, setOriginalCustomers] = useState([]);

  // Fetch invoices data
  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching invoices from API...");
      const invoicesData = await GET_ALL_INVOICES();
      console.log("Raw API response:", invoicesData);

      // Handle different API response structures
      let rawInvoices = [];
      if (Array.isArray(invoicesData)) {
        rawInvoices = invoicesData;
      } else if (invoicesData.data && Array.isArray(invoicesData.data)) {
        rawInvoices = invoicesData.data;
      } else if (invoicesData.invoices && Array.isArray(invoicesData.invoices)) {
        rawInvoices = invoicesData.invoices;
      } else if (invoicesData.results && Array.isArray(invoicesData.results)) {
        rawInvoices = invoicesData.results;
      } else {
        console.warn("Unexpected API response structure:", invoicesData);
        rawInvoices = [];
      }

      console.log("Raw invoices array:", rawInvoices);

      // Transform API data to UI format
      const transformedInvoices = rawInvoices.map(transformInvoiceData);
      console.log("Transformed invoices:", transformedInvoices);

      setCustomers(transformedInvoices);
      setOriginalCustomers(transformedInvoices);
    } catch (err) {
      console.error("Error fetching invoices:", err);
      setError(err.message || "Failed to fetch invoices");

      // Use fallback data if API fails
      console.log("Using fallback data due to API error");
      setCustomers(initialCustomers);
      setOriginalCustomers(initialCustomers);
    } finally {
      setLoading(false);
    }
  };

  // Load invoices on component mount
  useEffect(() => {
    fetchInvoices();
  }, []);

  // Customer filter options - dynamically calculated from original data
  const customerDefaultFilters = [
    { id: 'all', label: 'All Invoice', count: originalCustomers.length },
    { id: 'draft', label: 'Draft', count: originalCustomers.filter(c => c.status?.toLowerCase() === 'draft').length },
    { id: 'locked', label: 'Locked', count: originalCustomers.filter(c => c.status?.toLowerCase() === 'locked').length },
    { id: 'pending-approval', label: 'Pending Approval', count: originalCustomers.filter(c => c.status?.toLowerCase() === 'pending approval').length },
    { id: 'approved', label: 'Approved', count: originalCustomers.filter(c => c.status?.toLowerCase() === 'approved').length },
    { id: 'customer-viewed', label: 'Customer Viewed', count: originalCustomers.filter(c => c.status?.toLowerCase() === 'customer viewed').length },
    { id: 'partially-paid', label: 'Partially Paid', count: originalCustomers.filter(c => c.status?.toLowerCase() === 'partially paid').length },
    { id: 'unpaid', label: 'Unpaid', count: originalCustomers.filter(c => c.status?.toLowerCase() === 'unpaid').length },
    { id: 'overdue', label: 'Overdue', count: originalCustomers.filter(c => c.status?.toLowerCase() === 'overdue').length },
    { id: 'payment-initiated', label: 'Payment Initiated', count: originalCustomers.filter(c => c.status?.toLowerCase() === 'payment initiated').length },
    { id: 'paid', label: 'Paid', count: originalCustomers.filter(c => c.status?.toLowerCase() === 'paid').length },
    { id: 'void', label: 'Void', count: originalCustomers.filter(c => c.status?.toLowerCase() === 'void').length },
    { id: 'yet-to-be-shipped', label: 'Yet To Be Shipped', count: originalCustomers.filter(c => c.status?.toLowerCase() === 'yet to be shipped').length },
    { id: 'shipped', label: 'Shipped', count: originalCustomers.filter(c => c.status?.toLowerCase() === 'shipped').length },
    { id: 'debit-note', label: 'Debit Note', count: originalCustomers.filter(c => c.status?.toLowerCase() === 'debit note').length },
    { id: 'write-off', label: 'Write Off', count: originalCustomers.filter(c => c.status?.toLowerCase() === 'write off').length }
  ];

  const handleCustomerFilterSelect = (filter) => {
    setSelectedCustomerFilter(filter);
    console.log('Customer filter selected:', filter);
    
    // Apply filtering logic
    if (filter.id === 'all') {
      setCustomers(originalCustomers); // Show all original data
    } else {
      // Filter current data based on status
      const filteredCustomers = originalCustomers.filter(customer => 
        customer.status?.toLowerCase() === filter.label.toLowerCase()
      );
      setCustomers(filteredCustomers);
    }
  };

  const customerCustomFilters = [
    { id: 'sample-custom', label: 'Sample custom view', count: 5, hasDropdown: true },
    { id: 'my-vip-customers', label: 'My VIP Customers', count: 10 }
  ];

  const handleNewCustomerView = () => {
    console.log('Creating new customer custom view');
    // Add your new custom view logic here
  };

  const handleMenuSelect = (label) => {
    if (label === 'Import Customers') {
      setShowImportModal(true);
    }
    else if (label === 'Export Customers') {
      setShowExportModal(true);
    }
    else if (label === 'Export Current View') {
      setShowExportCurrentView(true);
    }
    else if (label === 'Preferences') {
      navigate('/customers-vendors'); 
    }
  };

  // Updated filterFields to include all new columns
  const [filterFields, setFilterFields] = useState({
    date: true,
    invoiceNumber: false,
    orderNumber: true,
    customerName: true,
    status: true,
    dueDate: true,
    amount: true,
    balanceDue: true,
    adjustment: false,
    billingAddress: false,
    crmPotentialName: false,
    companyName: false,
    country: false,
    createdBy: false,
    dueDays: false,
    email: false,
    expectedPaymentDate: false,
    invoiceType: false,
    phone: false,
    projectName: false,
    salesPerson: false,
    shippingAddress: false,
    shippingCharge: false,
    subTotal: false,
    // Legacy fields
    quoteNumber: false,
    referenceNumber: false,
    acceptedDate: false,
    declinedDate: false,
    expiryDate: false,
    // API-specific fields
    paymentTerms: false,
    customerNote: false,
    pdfUrl: false,
  });

  const visibleColumns = allColumns.filter(col => filterFields[col.key]);

  // Updated handleRowClick to pass the entire row data
  const handleRowClick = (id) => {
    const selectedInvoice = customers.find(customer => customer.id === id);
    console.log("Selected Invoice:", selectedInvoice);
    navigate(`/QuotesDetailedPage/${id}`, { 
      state: { 
        quoteData: selectedInvoice, 
        title: "Invoice", 
        backToPath: "/invoicesLayout", 
        editForm: "/InvoiceForm"
      }
    });
  };
  
  const handleDeleteSelected = () => {
    // Optional: Confirm before deleting
    if (window.confirm("Are you sure you want to delete the selected records?")) {
      const filtered = customers.filter(customer => !selectedRows.includes(customer.id));
      setCustomers(filtered);
      setSelectedRows([]); // Clear selection after deletion
      setSelectAll(false);

      // TODO: Add API call to delete selected invoices from backend
      // Example: await DELETE_INVOICES(selectedRows);
    }
  };

  const handleRowSelect = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(row => row !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(!selectAll ? customers.map(c => c.id) : []);
  };

  const handleRefresh = () => {
    fetchInvoices();
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="animate-spin h-5 w-5" />
          <span>Loading invoices...</span>
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
            dropdownTitle="All Invoice"
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
              title="Refresh invoices"
            />

            <CommonButton
              label={<div className="flex items-center"><Plus size={20} className="mr-1" /> New</div>}
              onClick={() => navigate('/InvoiceForm')}
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
                defaultModule="Invoices"
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