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
    quoteNumber: 'Q1001',
    referenceNumber: 'REF123',
    customerName: 'ASK',
    status: 'Open',
    amount: 'AED 500.00',
    acceptedDate: '2025-06-01',
    companyName: 'ASK PORTAL - FZCO',
    declinedDate: '',
    expiryDate: '2025-06-15',
    salesPerson: 'John Doe',
    subTotal: 'AED 450.00'
  },
  {
    id: 2,
    date: '2025-05-28',
    quoteNumber: 'Q1002',
    referenceNumber: 'REF124',
    customerName: 'Tech Solutions',
    status: 'Sent',
    amount: 'AED 1,250.00',
    acceptedDate: '',
    companyName: 'Tech Solutions LLC',
    declinedDate: '',
    expiryDate: '2025-06-10',
    salesPerson: 'Jane Smith',
    subTotal: 'AED 1,100.00'
  },
  {
    id: 3,
    date: '2025-05-27',
    quoteNumber: 'Q1003',
    referenceNumber: 'REF125',
    customerName: 'Future Works',
    status: 'Accepted',
    amount: 'AED 2,300.00',
    acceptedDate: '2025-05-29',
    companyName: 'Future Works Ltd.',
    declinedDate: '',
    expiryDate: '2025-06-12',
    salesPerson: 'Michael Lee',
    subTotal: 'AED 2,000.00'
  },
  {
    id: 4,
    date: '2025-05-25',
    quoteNumber: 'Q1004',
    referenceNumber: 'REF126',
    customerName: 'VisionTech',
    status: 'Declined',
    amount: 'AED 780.00',
    acceptedDate: '',
    companyName: 'VisionTech Co.',
    declinedDate: '2025-05-30',
    expiryDate: '2025-06-05',
    salesPerson: 'Sara Ali',
    subTotal: 'AED 700.00'
  },
  {
    id: 5,
    date: '2025-05-22',
    quoteNumber: 'Q1005',
    referenceNumber: 'REF127',
    customerName: 'GreenSoft',
    status: 'Expired',
    amount: 'AED 1,000.00',
    acceptedDate: '',
    companyName: 'GreenSoft Inc.',
    declinedDate: '',
    expiryDate: '2025-05-30',
    salesPerson: 'David Kim',
    subTotal: 'AED 950.00'
  },
  {
    id: 6,
    date: '2025-05-20',
    quoteNumber: 'Q1006',
    referenceNumber: 'REF128',
    customerName: 'ByteStream',
    status: 'Open',
    amount: 'AED 3,200.00',
    acceptedDate: '',
    companyName: 'ByteStream Ltd.',
    declinedDate: '',
    expiryDate: '2025-06-07',
    salesPerson: 'Zahra Hassan',
    subTotal: 'AED 2,800.00'
  },
  {
    id: 7,
    date: '2025-05-19',
    quoteNumber: 'Q1007',
    referenceNumber: 'REF129',
    customerName: 'NovaTech',
    status: 'Accepted',
    amount: 'AED 4,000.00',
    acceptedDate: '2025-05-21',
    companyName: 'NovaTech Pvt Ltd',
    declinedDate: '',
    expiryDate: '2025-06-01',
    salesPerson: 'Ali Rehman',
    subTotal: 'AED 3,500.00'
  },
  {
    id: 8,
    date: '2025-05-18',
    quoteNumber: 'Q1008',
    referenceNumber: 'REF130',
    customerName: 'SmartSys',
    status: 'Sent',
    amount: 'AED 950.00',
    acceptedDate: '',
    companyName: 'SmartSys Solutions',
    declinedDate: '',
    expiryDate: '2025-06-03',
    salesPerson: 'Emily Zhao',
    subTotal: 'AED 900.00'
  },
  {
    id: 9,
    date: '2025-05-17',
    quoteNumber: 'Q1009',
    referenceNumber: 'REF131',
    customerName: 'CloudReach',
    status: 'Declined',
    amount: 'AED 1,750.00',
    acceptedDate: '',
    companyName: 'CloudReach AE',
    declinedDate: '2025-05-26',
    expiryDate: '2025-06-01',
    salesPerson: 'Samir Khan',
    subTotal: 'AED 1,600.00'
  },
  {
    id: 10,
    date: '2025-05-15',
    quoteNumber: 'Q1010',
    referenceNumber: 'REF132',
    customerName: 'NetFusion',
    status: 'Open',
    amount: 'AED 2,100.00',
    acceptedDate: '',
    companyName: 'NetFusion Gulf',
    declinedDate: '',
    expiryDate: '2025-06-02',
    salesPerson: 'Lina Perez',
    subTotal: 'AED 2,000.00'
  }
];

const allColumns = [
  { label: 'Date', accessor: 'date', key: 'date' },
  { label: 'Quote Number', accessor: 'quoteNumber', key: 'quoteNumber' },
  { label: 'Reference Number', accessor: 'referenceNumber', key: 'referenceNumber' },
  { label: 'Customer Name', accessor: 'customerName', key: 'customerName' },
  { label: 'Status', accessor: 'status', key: 'status' },
  { label: 'Amount', accessor: 'amount', key: 'amount' },
  { label: 'Accepted Date', accessor: 'acceptedDate', key: 'acceptedDate' },
  { label: 'Company Name', accessor: 'companyName', key: 'companyName' },
  { label: 'Declined Date', accessor: 'declinedDate', key: 'declinedDate' },
  { label: 'Expiry Date', accessor: 'expiryDate', key: 'expiryDate' },
  { label: 'Sales Person', accessor: 'salesPerson', key: 'salesPerson' },
  { label: 'Sub Total', accessor: 'subTotal', key: 'subTotal' }
];

export default function QuotesLayout() {
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

  const visibleColumns = allColumns.filter(col => filterFields[col.key]);

  // Updated handleRowClick to pass the entire row data
  const handleRowClick = (id) => {
    const selectedQuote = customers.find(customer => customer.id === id);
    navigate(`/QuotesDetailedPage/${id}`, { 
      state: { quoteData: selectedQuote }
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
            <h1 className="text-2xl font-semibold text-gray-800">All Quotes</h1>
            <ChevronDown className="ml-2 text-blue-500" size={20} />
          </div>
          <div className="flex items-center gap-2">
            <CommonButton
              label={<div className="flex items-center"><Plus size={20} className="mr-1" /> New</div>}
              onClick={() => navigate('/QuotesForm')}
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