
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

const initialCustomers = [
  {
    id: "1",
    date: "2024-06-20",
    purchaseReceive: "PR-2024-001",
    purchaseOrder: "PO-2024-001",
    vendorName: "ABC Supply Co.",
    status: "Received",
    billed: "Yes",
    quantity: 150
  },
  {
    id: "2",
    date: "2024-06-19",
    purchaseReceive: "PR-2024-002",
    purchaseOrder: "PO-2024-002",
    vendorName: "XYZ Materials Ltd.",
    status: "Pending",
    billed: "No",
    quantity: 75
  },
  {
    id: "3",
    date: "2024-06-18",
    purchaseReceive: "PR-2024-003",
    purchaseOrder: "PO-2024-003",
    vendorName: "Global Parts Inc.",
    status: "Received",
    billed: "Yes",
    quantity: 200
  },
  {
    id: "4",
    date: "2024-06-17",
    purchaseReceive: "PR-2024-004",
    purchaseOrder: "PO-2024-004",
    vendorName: "Tech Solutions Corp.",
    status: "Shipped",
    billed: "No",
    quantity: 120
  },
  {
    id: "5",
    date: "2024-06-16",
    purchaseReceive: "PR-2024-005",
    purchaseOrder: "PO-2024-005",
    vendorName: "Industrial Supplies Co.",
    status: "Received",
    billed: "Yes",
    quantity: 300
  }
];
// Updated allColumns array with all the columns from the modal
const allColumns = [
  { label: 'Date', accessor: 'date', key: 'date' },
  { label: 'Purchase Receive #', accessor: 'purchaseReceive', key: 'purchaseReceive' },
  { label: 'Purchase Order', accessor: 'purchaseOrder', key: 'purchaseOrder' },
  { label: 'Vendor Name', accessor: 'vendorName', key: 'vendorName' },
  { label: 'Status', accessor: 'status', key: 'status' },
  { label: 'Billed', accessor: 'billed', key: 'billed' },
  { label: 'Quantity', accessor: 'quantity', key: 'quantity' },
];

export default function PurchaseReceivesLayout() {
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
    purchaseOrder: true,
    vendorName: true,
    status: true,
    billed:true,
    quantity:false,
  
  });

  const visibleColumns = allColumns.filter(col => filterFields[col.key]);

  // Updated handleRowClick to pass the entire row data
  const handleRowClick = (id) => {
  
    const selectedPayment = customers.find(customer => customer.id === id);
    console.log("selectedPayment==>>", selectedPayment);
    
    navigate(`/PurchaseReceiveDetailedPage/${id}`, { 
      state: { paymentData: selectedPayment , title: "PURCHASE RECEIPT", backToPath :"/PurchaseReceivesLayout" , editForm:"/PurcahseReceivesForm"}
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
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-gray-800">In Transit</h1>
            <ChevronDown className="ml-2 text-blue-500" size={20} />
          </div>
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
              onClick={() => navigate('/PurcahseReceivesForm')}
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
                defaultModule="Purchase Receives"
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

