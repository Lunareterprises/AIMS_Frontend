import { useState } from 'react';
import {
  ChevronDown, Plus, MoreVertical, HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../../CommonUI/buttons/CommonButton';
import FilterModal from '../../sales/customers/FilterModal';
import CustomerTable from '../../sales/customers/CustomerTable';
import ImportCustomersModal from '../../sales/customers/sort/importCustomer/ImportCustomersModal';
import ExportCurrentView from '../../sales/customers/sort/exportCurrentView/ExportCurrentView';
import ExportCustomersModal from '../../sales/customers/sort/exportCustomer/ExportCustomersModal';
import SortOptionsDropdown from '../../sales/customers/sort/SortOptionsDropdown';
import CreateAccountModal from './CreateAccount/CreateAccountModal';

const initialCustomers = [
  {
    id: 1,
    date: '2024-01-15',
    accountName: 'Cash Account',
    accountCode: 'ACC001',
    accountType: 'Asset',
    documents: 'Bank Statement, Receipt',
    parentAccountName: 'Current Assets'
  },
  {
    id: 2,
    date: '2024-01-16',
    accountName: 'Sales Revenue',
    accountCode: 'ACC002',
    accountType: 'Revenue',
    documents: 'Invoice, Contract',
    parentAccountName: 'Operating Revenue'
  },
  {
    id: 3,
    date: '2024-01-17',
    accountName: 'Office Supplies',
    accountCode: 'ACC003',
    accountType: 'Expense',
    documents: 'Purchase Order, Receipt',
    parentAccountName: 'Operating Expenses'
  },
  {
    id: 4,
    date: '2024-01-18',
    accountName: 'Accounts Payable',
    accountCode: 'ACC004',
    accountType: 'Liability',
    documents: 'Vendor Invoice, Payment Terms',
    parentAccountName: 'Current Liabilities'
  },
  {
    id: 5,
    date: '2024-01-19',
    accountName: 'Equipment',
    accountCode: 'ACC005',
    accountType: 'Asset',
    documents: 'Purchase Agreement, Warranty',
    parentAccountName: 'Fixed Assets'
  },
  {
    id: 6,
    date: '2024-01-20',
    accountName: 'Owner Equity',
    accountCode: 'ACC006',
    accountType: 'Equity',
    documents: 'Articles of Incorporation',
    parentAccountName: 'Shareholders Equity'
  }
];


const allColumns = [
  { label: 'Date', accessor: 'date', key: 'date' },
  { label: 'Account Name', accessor: 'accountName', key: 'accountName' },
  { label: 'Account Code', accessor: 'accountCode', key: 'accountCode' },
  { label: 'Account Type', accessor: 'accountType', key: 'accountType' },
  { label: 'Documents', accessor: 'documents', key: 'documents' },
  { label: 'Parent Account Name', accessor: 'parentAccountName', key: 'parentAccountName' }
];
export default function ChartOfAccountsLayout() {
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
  const [showPopup, setShowPopup] = useState(false);

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
  accountName: true,
  accountCode: true,
  accountType: true,
  documents: true,
  parentAccountName: false
});

  const visibleColumns = allColumns.filter(col => filterFields[col.key]);

  // Updated handleRowClick to pass the entire row data
  const handleRowClick = (id) => {
    const selectedQuote = customers.find(customer => customer.id === id);
    console.log('====================================');
    console.log('====================================');
    navigate(`/ChartOfAccountDetailedPage/${id}`, { 
      state: { quoteData: selectedQuote , title: "Journal",backToPath :"/ChartOfAccountsLayout", editForm:"/QuotesForm"}
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
            <h1 className="text-2xl font-semibold text-gray-800">Active Accounts</h1>
            <ChevronDown className="ml-2 text-blue-500" size={20} />
          </div>
          <div className="flex items-center gap-2">

            <CommonButton
                label={
                <div className="flex items-center">
                    <Plus size={20} className="mr-1" /> New
                </div>
                }
                onClick={() => setShowPopup(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            />
            {showPopup && (
                <CreateAccountModal onClose={() => setShowPopup(false)} />
            )}
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
                defaultModule="Charts of Accounts"
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
