

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
import { ReusableFilterDropdown } from '../../sales/customers/filterMenus/ReusableFilterDropdown';

const initialCustomers = [
  {
    id: 1,
    date: '2025-06-20',
    journalNumber: 'JN001',
    referenceNumber: 'REF2025001',
    status: 'Active',
    notes: 'Initial transaction entry',
    amount: 1250.00,
    createdBy: 'John Smith'
  },
  {
    id: 2,
    date: '2025-06-21',
    journalNumber: 'JN002',
    referenceNumber: 'REF2025002',
    status: 'Pending',
    notes: 'Awaiting approval from manager',
    amount: 750.50,
    createdBy: 'Sarah Johnson'
  },
  {
    id: 3,
    date: '2025-06-22',
    journalNumber: 'JN003',
    referenceNumber: 'REF2025003',
    status: 'Completed',
    notes: 'Payment processed successfully',
    amount: 2100.75,
    createdBy: 'Mike Davis'
  },
  {
    id: 4,
    date: '2025-06-23',
    journalNumber: 'JN004',
    referenceNumber: 'REF2025004',
    status: 'Active',
    notes: 'Regular monthly transaction',
    amount: 850.25,
    createdBy: 'Emily Wilson'
  },
  {
    id: 5,
    date: '2025-06-19',
    journalNumber: 'JN005',
    referenceNumber: 'REF2025005',
    status: 'Cancelled',
    notes: 'Transaction cancelled by user request',
    amount: 450.00,
    createdBy: 'David Brown'
  }
]

const allColumns = [
  { label: 'Date', accessor: 'date', key: 'date' },
  { label: 'Journal#', accessor: 'journalNumber', key: 'journalNumber' },
  { label: 'Reference Number', accessor: 'referenceNumber', key: 'referenceNumber' },
  { label: 'Status', accessor: 'status', key: 'status' },
  { label: 'Notes', accessor: 'notes', key: 'notes' },
  { label: 'Amount', accessor: 'amount', key: 'amount' },
  { label: 'Created By', accessor: 'createdBy', key: 'createdBy' }
];

export default function ManualJournalsLayout() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState(initialCustomers);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showExportCurrentView, setShowExportCurrentView] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importOption, setImportOption] = useState('customers');
const [selectedCustomerFilter, setSelectedCustomerFilter] = useState({
    id: 'active',
    label: 'All Manual Journals'
  });


    // Customer filter options
  const customerDefaultFilters = [
  { id: 'all', label: 'All Manual Journals', count: 150 },
  { id: 'draft', label: 'Draft', count: 0 },
  { id: 'published', label: 'Published', count: 0 },
  
];

    const handleCustomerFilterSelect = (filter) => {
    setSelectedCustomerFilter(filter);
    console.log('Customer filter selected:', filter);
    // Add your customer filtering logic here
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

  const [filterFields, setFilterFields] = useState({
    date: true,
    journalNumber: true,
    referenceNumber: true,
    status: true,
    notes: true,
    amount: true,
    createdBy: true
  });

  const visibleColumns = allColumns.filter(col => filterFields[col.key]);

  // Updated handleRowClick to pass the entire row data
  const handleRowClick = (id) => {
    const selectedQuote = customers.find(customer => customer.id === id);
    console.log('====================================');
    console.log('====================================');
    navigate(`/ManualJouralsDetailedPage/${id}`, { 
      state: { quoteData: selectedQuote , title: "Journal",backToPath :"/manualJournals", editForm:"/QuotesForm"}
    });
  };

  const handleDeleteSelected = () => {
    // Optional: Confirm before deleting
    if (window.confirm("Are you sure you want to delete the selected records?")) {
      const filtered = customers.filter(customer => !selectedRows.includes(customer.id));
      setCustomers(filtered);
      setSelectedRows([]); // Clear selection after deletion
      setSelectAll(false);
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

  return (
    <div>
      {/* Header section */}
      <div className="w-full bg-white">
        <div className="flex items-center w-full justify-between p-4 border-b">


          <ReusableFilterDropdown
            selectedFilter={selectedCustomerFilter}
            onFilterSelect={handleCustomerFilterSelect}
            dropdownTitle="All Manual Journals"
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

            {selectedRows.length > 0 && (
              <div className="flex justify-end p-4">
                <CommonButton
                  label="Delete Selected"
                  onClick={handleDeleteSelected}
                  className="bg-gray-300 hover:bg-gray-00 text-red-600 px-4 py-2 rounded"
                />
              </div>
            )}
            <CommonButton
              label={<div className="flex items-center"><Plus size={20} className="mr-1" /> New</div>}
              onClick={() => navigate('/ManualJournalscreteForm')}
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
                defaultModule="Manual Journals"
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
