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
import { ReusableFilterDropdown } from '../customers/filterMenus/ReusableFilterDropdown';

const initialCustomers = [
  {
    id:"1",
    date: '29 May 2025',
    paymentNumber: '919',
    referenceNumber: 'asdas',
    customerName: 'Arefad',
    invoiceNumber: 'INV-000039',
    mode: 'Cash',
    amount: 10000.00,
    unusedAmount: 0.00,
    paymentType: 'Customer Payment'
  },
  {
    id:"2",
    date: '29 May 2025',
    paymentNumber: '920',
    referenceNumber: 'asdas',
    customerName: 'Arefad',
    invoiceNumber: 'INV-000078',
    mode: 'Cash',
    amount: 10000.00,
    unusedAmount: 0.00,
    paymentType: 'Customer Payment'
  },
  {
    id:"3",
    date: '28 May 2025',
    paymentNumber: '918',
    referenceNumber: 'REF12345',
    customerName: 'Global Traders',
    invoiceNumber: 'INV-000034',
    mode: 'Bank Transfer',
    amount: 15000.00,
    unusedAmount: 0.00,
    paymentType: 'Advance Payment'
  },
  {
    id:"4",
    date: '27 May 2025',
    paymentNumber: '917',
    referenceNumber: 'REF9981',
    customerName: 'Sky Logistics',
    invoiceNumber: 'INV-000027',
    mode: 'Credit Card',
    amount: 20000.00,
    unusedAmount: 5000.00,
    paymentType: 'Partial Payment'
  }
];

// Updated allColumns array with all the columns from the modal
const allColumns = [
  { label: 'Date', accessor: 'date', key: 'date' },
  { label: 'Payment #', accessor: 'paymentNumber', key: 'paymentNumber' },
  { label: 'Reference number', accessor: 'referenceNumber', key: 'referenceNumber' },
  { label: 'Customer Name', accessor: 'customerName', key: 'customerName' },
  { label: 'Invoice#', accessor: 'invoiceNumber', key: 'invoiceNumber' },
  { label: 'Mode', accessor: 'mode', key: 'mode' },
  { label: 'Amount', accessor: 'amount', key: 'amount' },
  { label: 'Unused Amount', accessor: 'unusedAmount', key: 'unusedAmount' },
  { label: 'Payment Type', accessor: 'paymentType', key: 'paymentType' }
];

export default function PaymentReceivedLayout() {
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
    label: 'All  Received Payments'
  });


    // Customer filter options
  const customerDefaultFilters = [
  { id: 'all', label: 'All  Received Payments', count: 150 },
  
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

  // Updated filterFields to include all new columns
  const [filterFields, setFilterFields] = useState({
    date: true,
    paymentNumber: true,
    referenceNumber: true,
    customerName: true,
    invoiceNumber: true,
    mode:false,
    amount:false,
    unusedAmount:false,
    paymentType:false,
  });

  const visibleColumns = allColumns.filter(col => filterFields[col.key]);

  // Updated handleRowClick to pass the entire row data
  const handleRowClick = (id) => {
  
    const selectedPayment = customers.find(customer => customer.id === id);
    console.log("selectedPayment==>>", selectedPayment);
    
    navigate(`/PaymentReceipt/${id}`, { 
      state: { paymentData: selectedPayment , title: "PAYMENT RECEIPT", backToPath :"/payemntReceived" , editForm:"/PaymentRecevibleForm"}
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
            dropdownTitle="All  Received Payments"
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
                  className="bg-gray-300 hover:bg-gray-200 text-red-600 px-4 py-2 rounded"
                />
              </div>
            )}
            <CommonButton
              label={<div className="flex items-center"><Plus size={20} className="mr-1" /> New</div>}
              onClick={() => navigate('/PaymentRecevibleForm')}
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

