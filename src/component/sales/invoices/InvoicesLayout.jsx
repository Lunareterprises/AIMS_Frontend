import { useState } from 'react';
import {
  ChevronDown, Plus, MoreVertical, HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../../CommonUI/buttons/CommonButton';
import FilterModal from '../customers/FilterModal';
import CustomerTable from '../customers/CustomerTable';
import ImportCustomersModal from '../customers/sort/importCustomer/ImportCustomersModal';
import ExportCurrentView from '../customers/sort/exportCurrentView/ExportCurrentView';
import ExportCustomersModal from '../customers/sort/exportCustomer/ExportCustomersModal';
import SortOptionsDropdown from '../customers/sort/SortOptionsDropdown';

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
  },
  {
    id: 3,
    date: '2025-05-27',
    invoiceNumber: 'INV-1003',
    orderNumber: 'ORD-003',
    quoteNumber: 'Q1003',
    referenceNumber: 'REF125',
    customerName: 'Future Works',
    status: 'Accepted',
    dueDate: '2025-06-12',
    amount: 'AED 2,300.00',
    balanceDue: 'AED 0.00',
    adjustment: 'AED 0.00',
    billingAddress: '789 Future Ave, Sharjah, UAE',
    crmPotentialName: 'Future Works Partnership',
    companyName: 'Future Works Ltd.',
    country: 'UAE',
    createdBy: 'Michael Lee',
    dueDays: '16',
    email: 'contact@futureworks.ae',
    expectedPaymentDate: '2025-06-05',
    invoiceType: 'Standard',
    phone: '+971-50-345-6789',
    projectName: 'ERP System Implementation',
    salesPerson: 'Michael Lee',
    shippingAddress: '789 Future Ave, Sharjah, UAE',
    shippingCharge: 'AED 300.00',
    subTotal: 'AED 2,000.00',
    acceptedDate: '2025-05-29',
    declinedDate: '',
    expiryDate: '2025-06-12'
  },
  {
    id: 4,
    date: '2025-05-25',
    invoiceNumber: 'INV-1004',
    orderNumber: 'ORD-004',
    quoteNumber: 'Q1004',
    referenceNumber: 'REF126',
    customerName: 'VisionTech',
    status: 'Declined',
    dueDate: '2025-06-05',
    amount: 'AED 780.00',
    balanceDue: 'AED 780.00',
    adjustment: 'AED 0.00',
    billingAddress: '321 Vision St, Dubai, UAE',
    crmPotentialName: 'VisionTech Project',
    companyName: 'VisionTech Co.',
    country: 'UAE',
    createdBy: 'Sara Ali',
    dueDays: '-7',
    email: 'hello@visiontech.ae',
    expectedPaymentDate: '2025-06-01',
    invoiceType: 'Standard',
    phone: '+971-50-456-7890',
    projectName: 'Digital Marketing Campaign',
    salesPerson: 'Sara Ali',
    shippingAddress: '321 Vision St, Dubai, UAE',
    shippingCharge: 'AED 80.00',
    subTotal: 'AED 700.00',
    acceptedDate: '',
    declinedDate: '2025-05-30',
    expiryDate: '2025-06-05'
  },
  {
    id: 5,
    date: '2025-05-22',
    invoiceNumber: 'INV-1005',
    orderNumber: 'ORD-005',
    quoteNumber: 'Q1005',
    referenceNumber: 'REF127',
    customerName: 'GreenSoft',
    status: 'Expired',
    dueDate: '2025-05-30',
    amount: 'AED 1,000.00',
    balanceDue: 'AED 1,000.00',
    adjustment: 'AED 0.00',
    billingAddress: '654 Green Plaza, Dubai, UAE',
    crmPotentialName: 'GreenSoft Integration',
    companyName: 'GreenSoft Inc.',
    country: 'UAE',
    createdBy: 'David Kim',
    dueDays: '-13',
    email: 'support@greensoft.com',
    expectedPaymentDate: '2025-05-28',
    invoiceType: 'Standard',
    phone: '+971-50-567-8901',
    projectName: 'Cloud Migration',
    salesPerson: 'David Kim',
    shippingAddress: '654 Green Plaza, Dubai, UAE',
    shippingCharge: 'AED 50.00',
    subTotal: 'AED 950.00',
    acceptedDate: '',
    declinedDate: '',
    expiryDate: '2025-05-30'
  },
  {
    id: 6,
    date: '2025-05-20',
    invoiceNumber: 'INV-1006',
    orderNumber: 'ORD-006',
    quoteNumber: 'Q1006',
    referenceNumber: 'REF128',
    customerName: 'ByteStream',
    status: 'Open',
    dueDate: '2025-06-07',
    amount: 'AED 3,200.00',
    balanceDue: 'AED 3,200.00',
    adjustment: 'AED 0.00',
    billingAddress: '987 Byte Tower, Abu Dhabi, UAE',
    crmPotentialName: 'ByteStream Solutions',
    companyName: 'ByteStream Ltd.',
    country: 'UAE',
    createdBy: 'Zahra Hassan',
    dueDays: '18',
    email: 'info@bytestream.ae',
    expectedPaymentDate: '2025-06-03',
    invoiceType: 'Standard',
    phone: '+971-50-678-9012',
    projectName: 'Data Analytics Platform',
    salesPerson: 'Zahra Hassan',
    shippingAddress: '987 Byte Tower, Abu Dhabi, UAE',
    shippingCharge: 'AED 400.00',
    subTotal: 'AED 2,800.00',
    acceptedDate: '',
    declinedDate: '',
    expiryDate: '2025-06-07'
  },
  {
    id: 7,
    date: '2025-05-19',
    invoiceNumber: 'INV-1007',
    orderNumber: 'ORD-007',
    quoteNumber: 'Q1007',
    referenceNumber: 'REF129',
    customerName: 'NovaTech',
    status: 'Accepted',
    dueDate: '2025-06-01',
    amount: 'AED 4,000.00',
    balanceDue: 'AED 0.00',
    adjustment: 'AED 0.00',
    billingAddress: '147 Nova Center, Dubai, UAE',
    crmPotentialName: 'NovaTech Enterprise Deal',
    companyName: 'NovaTech Pvt Ltd',
    country: 'UAE',
    createdBy: 'Ali Rehman',
    dueDays: '13',
    email: 'business@novatech.ae',
    expectedPaymentDate: '2025-05-25',
    invoiceType: 'Standard',
    phone: '+971-50-789-0123',
    projectName: 'AI Chatbot Development',
    salesPerson: 'Ali Rehman',
    shippingAddress: '147 Nova Center, Dubai, UAE',
    shippingCharge: 'AED 500.00',
    subTotal: 'AED 3,500.00',
    acceptedDate: '2025-05-21',
    declinedDate: '',
    expiryDate: '2025-06-01'
  },
  {
    id: 8,
    date: '2025-05-18',
    invoiceNumber: 'INV-1008',
    orderNumber: 'ORD-008',
    quoteNumber: 'Q1008',
    referenceNumber: 'REF130',
    customerName: 'SmartSys',
    status: 'Sent',
    dueDate: '2025-06-03',
    amount: 'AED 950.00',
    balanceDue: 'AED 950.00',
    adjustment: 'AED 0.00',
    billingAddress: '258 Smart Building, Sharjah, UAE',
    crmPotentialName: 'SmartSys Automation',
    companyName: 'SmartSys Solutions',
    country: 'UAE',
    createdBy: 'Emily Zhao',
    dueDays: '16',
    email: 'team@smartsys.ae',
    expectedPaymentDate: '2025-06-01',
    invoiceType: 'Standard',
    phone: '+971-50-890-1234',
    projectName: 'IoT Solution Implementation',
    salesPerson: 'Emily Zhao',
    shippingAddress: '258 Smart Building, Sharjah, UAE',
    shippingCharge: 'AED 50.00',
    subTotal: 'AED 900.00',
    acceptedDate: '',
    declinedDate: '',
    expiryDate: '2025-06-03'
  },
  {
    id: 9,
    date: '2025-05-17',
    invoiceNumber: 'INV-1009',
    orderNumber: 'ORD-009',
    quoteNumber: 'Q1009',
    referenceNumber: 'REF131',
    customerName: 'CloudReach',
    status: 'Declined',
    dueDate: '2025-06-01',
    amount: 'AED 1,750.00',
    balanceDue: 'AED 1,750.00',
    adjustment: 'AED 0.00',
    billingAddress: '369 Cloud Plaza, Dubai, UAE',
    crmPotentialName: 'CloudReach Migration',
    companyName: 'CloudReach AE',
    country: 'UAE',
    createdBy: 'Samir Khan',
    dueDays: '15',
    email: 'contact@cloudreach.ae',
    expectedPaymentDate: '2025-05-30',
    invoiceType: 'Standard',
    phone: '+971-50-901-2345',
    projectName: 'Infrastructure Upgrade',
    salesPerson: 'Samir Khan',
    shippingAddress: '369 Cloud Plaza, Dubai, UAE',
    shippingCharge: 'AED 150.00',
    subTotal: 'AED 1,600.00',
    acceptedDate: '',
    declinedDate: '2025-05-26',
    expiryDate: '2025-06-01'
  },
  {
    id: 10,
    date: '2025-05-15',
    invoiceNumber: 'INV-1010',
    orderNumber: 'ORD-010',
    quoteNumber: 'Q1010',
    referenceNumber: 'REF132',
    customerName: 'NetFusion',
    status: 'Open',
    dueDate: '2025-06-02',
    amount: 'AED 2,100.00',
    balanceDue: 'AED 2,100.00',
    adjustment: 'AED 0.00',
    billingAddress: '741 Net Tower, Abu Dhabi, UAE',
    crmPotentialName: 'NetFusion Network Setup',
    companyName: 'NetFusion Gulf',
    country: 'UAE',
    createdBy: 'Lina Perez',
    dueDays: '21',
    email: 'info@netfusion.ae',
    expectedPaymentDate: '2025-05-28',
    invoiceType: 'Standard',
    phone: '+971-50-012-3456',
    projectName: 'Network Security Implementation',
    salesPerson: 'Lina Perez',
    shippingAddress: '741 Net Tower, Abu Dhabi, UAE',
    shippingCharge: 'AED 100.00',
    subTotal: 'AED 2,000.00',
    acceptedDate: '',
    declinedDate: '',
    expiryDate: '2025-06-02'
  }
];

// Updated allColumns array with all the columns from the modal
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
  { label: 'Expiry Date', accessor: 'expiryDate', key: 'expiryDate' }
];

export default function InvoicesLayout() {
  const navigate = useNavigate();
  const [customers] = useState(initialCustomers);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showExportCurrentView, setShowExportCurrentView] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importOption, setImportOption] = useState('customers');

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
  });

  const visibleColumns = allColumns.filter(col => filterFields[col.key]);

  // Updated handleRowClick to pass the entire row data
  const handleRowClick = (id) => {
  
    const selectedQuote = customers.find(customer => customer.id === id);
    navigate(`/QuotesDetailedPage/${id}`, { 
      state: { quoteData: selectedQuote , title: "Invoice", backToPath :"/invoicesLayout" , editForm:"/InvoiceForm"}
    });
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

  return (
    <div>
      {/* Header section */}
      <div className="w-full bg-white">
        <div className="flex items-center w-full justify-between p-4 border-b">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-gray-800">All Invoice</h1>
            <ChevronDown className="ml-2 text-blue-500" size={20} />
          </div>
          <div className="flex items-center gap-2">
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