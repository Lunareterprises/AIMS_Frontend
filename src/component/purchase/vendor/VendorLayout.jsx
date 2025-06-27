import { useState } from 'react';
import {
  ChevronDown, Plus, HelpCircle
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
    name: 'John Smith',
    companyName: 'Acme Corporation',
    email: 'john.smith@acme.com',
    workPhone: '+1-555-0101',
    payablesBcy: '$2,500.00',
    unusedCreditsBcy: '$150.00',
    payables: '$2,300.00',
    unusedCredits: '$120.00',
    source: 'Website',
    firstName: 'John',
    lastName: 'Smith',
    mobilePhone: '+1-555-0102',
    paymentTerms: 'Net 30',
    status: 'Active',
    taxTreatment: 'Taxable',
    website: 'https://acme.com'
  },
  {
    id: 2,
    date: '2025-06-19',
    name: 'Sarah Johnson',
    companyName: 'Tech Solutions Inc',
    email: 'sarah.j@techsolutions.com',
    workPhone: '+1-555-0201',
    payablesBcy: '$4,750.00',
    unusedCreditsBcy: '$300.00',
    payables: '$4,500.00',
    unusedCredits: '$275.00',
    source: 'Referral',
    firstName: 'Sarah',
    lastName: 'Johnson',
    mobilePhone: '+1-555-0202',
    paymentTerms: 'Net 15',
    status: 'Active',
    taxTreatment: 'Taxable',
    website: 'https://techsolutions.com'
  },
  {
    id: 3,
    date: '2025-06-18',
    name: 'Michael Chen',
    companyName: 'Global Enterprises',
    email: 'm.chen@globalent.com',
    workPhone: '+1-555-0301',
    payablesBcy: '$1,200.00',
    unusedCreditsBcy: '$0.00',
    payables: '$1,150.00',
    unusedCredits: '$0.00',
    source: 'Cold Call',
    firstName: 'Michael',
    lastName: 'Chen',
    mobilePhone: '+1-555-0302',
    paymentTerms: 'Net 45',
    status: 'Inactive',
    taxTreatment: 'Non-Taxable',
    website: 'https://globalent.com'
  },
  {
    id: 4,
    date: '2025-06-17',
    name: 'Emily Rodriguez',
    companyName: 'Creative Studios LLC',
    email: 'emily@creativestudios.com',
    workPhone: '+1-555-0401',
    payablesBcy: '$3,850.00',
    unusedCreditsBcy: '$450.00',
    payables: '$3,600.00',
    unusedCredits: '$400.00',
    source: 'Social Media',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    mobilePhone: '+1-555-0402',
    paymentTerms: 'Net 30',
    status: 'Active',
    taxTreatment: 'Taxable',
    website: 'https://creativestudios.com'
  },
  {
    id: 5,
    date: '2025-06-16',
    name: 'David Wilson',
    companyName: 'Manufacturing Co',
    email: 'dwilson@mfgco.com',
    workPhone: '+1-555-0501',
    payablesBcy: '$6,200.00',
    unusedCreditsBcy: '$200.00',
    payables: '$5,950.00',
    unusedCredits: '$180.00',
    source: 'Trade Show',
    firstName: 'David',
    lastName: 'Wilson',
    mobilePhone: '+1-555-0502',
    paymentTerms: 'Net 60',
    status: 'Active',
    taxTreatment: 'Taxable',
    website: 'https://mfgco.com'
  },
  {
    id: 6,
    date: '2025-06-15',
    name: 'Lisa Thompson',
    companyName: 'Consulting Group',
    email: 'lisa.t@consultinggroup.com',
    workPhone: '+1-555-0601',
    payablesBcy: '$1,800.00',
    unusedCreditsBcy: '$75.00',
    payables: '$1,700.00',
    unusedCredits: '$60.00',
    source: 'Email Campaign',
    firstName: 'Lisa',
    lastName: 'Thompson',
    mobilePhone: '+1-555-0602',
    paymentTerms: 'Net 30',
    status: 'Pending',
    taxTreatment: 'Taxable',
    website: 'https://consultinggroup.com'
  }
];

const allColumns = [
  { label: 'Date', accessor: 'date', key: 'date' },
  { label: 'Name', accessor: 'name', key: 'name' },
  { label: 'Company Name', accessor: 'companyName', key: 'companyName' },
  { label: 'Email', accessor: 'email', key: 'email' },
  { label: 'Work Phone', accessor: 'workPhone', key: 'workPhone' },
  { label: 'Payables (BCY)', accessor: 'payablesBcy', key: 'payablesBcy' },
  { label: 'Unused Credits (BCY)', accessor: 'unusedCreditsBcy', key: 'unusedCreditsBcy' },
  { label: 'Payables', accessor: 'payables', key: 'payables' },
  { label: 'Unused Credits', accessor: 'unusedCredits', key: 'unusedCredits' },
  { label: 'Source', accessor: 'source', key: 'source' },
  { label: 'First Name', accessor: 'firstName', key: 'firstName' },
  { label: 'Last Name', accessor: 'lastName', key: 'lastName' },
  { label: 'Mobile Phone', accessor: 'mobilePhone', key: 'mobilePhone' },
  { label: 'Payment Terms', accessor: 'paymentTerms', key: 'paymentTerms' },
  { label: 'Status', accessor: 'status', key: 'status' },
  { label: 'Tax Treatment', accessor: 'taxTreatment', key: 'taxTreatment' },
  { label: 'Website', accessor: 'website', key: 'website' }
];

export default function VendorLayout() {
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
    label: 'All Vendors'
  });


    // Customer filter options
  const customerDefaultFilters = [
  { id: 'all', label: 'All Vendors', count: 150 },
  { id: 'active-vendors', label: 'Active Vendors', count: 0 },
  { id: 'crm-vendors', label: 'CRM Vendors', count: 0 },
  { id: 'duplicate-vendors', label: 'Duplicate Vendors', count: 0 },
  { id: 'inactive-vendors', label: 'Inactive Vendors', count: 0 },
  { id: 'vendor-portal-enabled', label: 'Vendor Portal Enabled', count: 0 },
  { id: 'vendor-portal-disabled', label: 'Vendor Portal Disabled', count: 0 }
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
    if (label === 'Import Customers') setShowImportModal(true);
    else if (label === 'Export Customers') setShowExportModal(true);
    else if (label === 'Export Current View') setShowExportCurrentView(true);
    else if (label === 'Preferences') navigate('/customers-vendors');
  };

  const [filterFields, setFilterFields] = useState({
    date: true,
    name: true,
    companyName: true,
    email: true,
    workPhone: true,
    payablesBcy: false,
    unusedCreditsBcy: false,
    payables: false,
    unusedCredits: false,
    source: false,
    firstName: false,
    lastName: false,
    mobilePhone: false,
    paymentTerms: false,
    status: false,
    taxTreatment: false,
    website: false
  });

  const visibleColumns = allColumns.filter(col => filterFields[col.key]);

  const handleRowClick = (id) => {
    // const selectedCustomer = customers.find(customer => customer.id === id);
    navigate(`/CustomerDetailedPage/${id}`);
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
      {/* Header */}
      <div className="w-full bg-white border-b p-4 flex justify-between items-center">
       <ReusableFilterDropdown
            selectedFilter={selectedCustomerFilter}
            onFilterSelect={handleCustomerFilterSelect}
            dropdownTitle="All Vendors"
            defaultFilters={customerDefaultFilters}
            customFilters={customerCustomFilters}
            onNewCustomView={handleNewCustomerView}
            showSearch={true}
            showNewCustomView={true}
            showStarIcons={true}
            dropdownWidth="w-80"
            showDefaultFilters={true}
          />
        <div className="flex gap-2 items-center">
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
            onClick={() => navigate('/CustomersAdd_Details', { state: { title: 'Add New Vendor', customer_Type: 'vendor' } }, )}
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
              defaultModule="Vendors"
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

      {/* Table */}
      <div className="w-full overflow-x-auto">
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

      {isFilterModalOpen && (
        <FilterModal
          filterFields={filterFields}
          setFilterFields={setFilterFields}
          onClose={() => setIsFilterModalOpen(false)}
        />
      )}
    </div>
  );
}
