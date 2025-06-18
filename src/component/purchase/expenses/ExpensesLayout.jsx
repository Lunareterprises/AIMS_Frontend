
import { useState } from 'react';
import {
  ChevronDown, Plus, MoreVertical, HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../../CommonUI/buttons/CommonButton';
import CustomerTable from '../../sales/customers/CustomerTable';
import ImportCustomersModal from '../../sales/customers/sort/importCustomer/ImportCustomersModal';
import ExportCurrentView from '../../sales/customers/sort/exportCurrentView/ExportCurrentView';
import ExportCustomersModal from '../../sales/customers/sort/exportCustomer/ExportCustomersModal';
import SortOptionsDropdown from '../../sales/customers/sort/SortOptionsDropdown';
import FilterModal from '../../sales/customers/FilterModal';

const initialCustomers = [
  {
    id: 1,
    expenseAccount: 'Office Supplies',
    reference: 'REF-001',
    vendorName: 'ABC Stationery',
    paidThrough: 'Cash',
    customerName: 'John Doe',
    status: 'Paid',
    amount: 250.00,
    reportName: 'January Expense Report',
    reportNumber: 'RPT-1001',
    date: '2025-01-15',
  },
  {
    id: 2,
    expenseAccount: 'Travel Expenses',
    reference: 'REF-002',
    vendorName: 'XYZ Travels',
    paidThrough: 'Credit Card',
    customerName: 'Jane Smith',
    status: 'Unpaid',
    amount: 1200.00,
    reportName: 'Q1 Business Trip',
    reportNumber: 'RPT-1002',
    date: '2025-02-10',
  },
  {
    id: 3,
    expenseAccount: 'Utilities',
    reference: 'REF-003',
    vendorName: 'City Power Ltd',
    paidThrough: 'Bank Transfer',
    customerName: 'Acme Corp',
    status: 'Paid',
    amount: 340.75,
    reportName: 'Monthly Electricity',
    reportNumber: 'RPT-1003',
    date: '2025-03-05',
  },
  {
    id: 4,
    expenseAccount: 'Consulting',
    reference: 'REF-004',
    vendorName: 'Tech Consulting Inc.',
    paidThrough: 'Bank Transfer',
    customerName: 'Beta Ltd',
    status: 'Partially Paid',
    amount: 2100.00,
    reportName: 'System Upgrade',
    reportNumber: 'RPT-1004',
    date: '2025-04-22',
  },
  {
    id: 5,
    expenseAccount: 'Marketing',
    reference: 'REF-005',
    vendorName: 'Bright Ads Co.',
    paidThrough: 'Credit Card',
    customerName: 'Gamma Enterprises',
    status: 'Paid',
    amount: 980.00,
    reportName: 'Q2 Ad Spend',
    reportNumber: 'RPT-1005',
    date: '2025-05-01',
  },
  {
    id: 6,
    expenseAccount: 'Training',
    reference: 'REF-006',
    vendorName: 'SkillUp Ltd',
    paidThrough: 'Cash',
    customerName: 'Internal',
    status: 'Unpaid',
    amount: 500.00,
    reportName: 'Staff Training April',
    reportNumber: 'RPT-1006',
    date: '2025-04-12',
  },
  {
    id: 7,
    expenseAccount: 'Software Subscriptions',
    reference: 'REF-007',
    vendorName: 'SaaS Tools Inc.',
    paidThrough: 'Bank Transfer',
    customerName: 'Delta Co.',
    status: 'Paid',
    amount: 120.00,
    reportName: 'April SaaS',
    reportNumber: 'RPT-1007',
    date: '2025-04-30',
  },
  {
    id: 8,
    expenseAccount: 'Maintenance',
    reference: 'REF-008',
    vendorName: 'FixIt Services',
    paidThrough: 'Cash',
    customerName: 'Epsilon Group',
    status: 'Partially Paid',
    amount: 300.00,
    reportName: 'Building Maintenance',
    reportNumber: 'RPT-1008',
    date: '2025-03-20',
  },
  {
    id: 9,
    expenseAccount: 'Legal Fees',
    reference: 'REF-009',
    vendorName: 'Legal Partners LLP',
    paidThrough: 'Credit Card',
    customerName: 'Zeta Inc',
    status: 'Paid',
    amount: 750.00,
    reportName: 'Contract Review',
    reportNumber: 'RPT-1009',
    date: '2025-02-28',
  },
  {
    id: 10,
    expenseAccount: 'Insurance',
    reference: 'REF-010',
    vendorName: 'SecureLife Insurance',
    paidThrough: 'Bank Transfer',
    customerName: 'Internal',
    status: 'Unpaid',
    amount: 1450.00,
    reportName: 'Annual Insurance',
    reportNumber: 'RPT-1010',
    date: '2025-01-10',
  },
];


const allColumns = [
  { label: 'Expense Account', accessor: 'expenseAccount', key: 'expenseAccount' },
  { label: 'Reference#', accessor: 'reference', key: 'reference' },
  { label: 'Vendor Name', accessor: 'vendorName', key: 'vendorName' },
  { label: 'Paid Through', accessor: 'paidThrough', key: 'paidThrough' },
  { label: 'Customer Name', accessor: 'customerName', key: 'customerName' },
  { label: 'Status', accessor: 'status', key: 'status' },
  { label: 'Amount', accessor: 'amount', key: 'amount' },
  { label: 'Report Name', accessor: 'reportName', key: 'reportName' },
  { label: 'Report Number', accessor: 'reportNumber', key: 'reportNumber' },
  { label: 'Date', accessor: 'date', key: 'date' }
];

export default function ExpensesLayout() {
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
    expenseAccount: true,
    reference: true,
    vendorName: true,
    paidThrough:true,
    customerName:true,
    status:false,
    amount:false,
    reportName:false,
    reportNumber:false
  });

  const visibleColumns = allColumns.filter(col => filterFields[col.key]);

  // Updated handleRowClick to pass the entire row data
  const handleRowClick = (id) => {
    const selectedQuote = customers.find(customer => customer.id === id);
    navigate(`/expenseDetailedPage/${id}`, { 
      state: { quoteData: selectedQuote , title: "Quote",backToPath :"/Addqoutes", editForm:"/QuotesForm"}
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
            <h1 className="text-2xl font-semibold text-gray-800">All Expenses</h1>
            <ChevronDown className="ml-2 text-blue-500" size={20} />
          </div>
          <div className="flex items-center gap-2">
            <CommonButton
              label={<div className="flex items-center"><Plus size={20} className="mr-1" /> New</div>}
              onClick={() => navigate('/expenseForm')}
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
                defaultModule="Expenses"
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