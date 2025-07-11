import { useState } from 'react';
import {
  ChevronDown, Plus, MoreVertical, HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FilterModal from './FilterModal';
import CommonButton from '../../CommonUI/buttons/CommonButton';
import CustomerTable from './CustomerTable';
import ImportCustomersModal from './sort/importCustomer/ImportCustomersModal';
import ExportCustomersModal from './sort/exportCustomer/ExportCustomersModal'
import SortOptionsDropdown from './sort/SortOptionsDropdown';
import ExportCurrentView from './sort/exportCurrentView/ExportCurrentView';

const initialCustomers = [
  { id: 1, name: 'ASK', companyName: 'ASK PORTAL - FZCO', email: '', workPhone: '', receivables: 'AED0.00', unusedCredits: 'AED0.00' },
  { id: 2, name: 'TA', companyName: 'TELUGU AIRLINES', email: '', workPhone: '', receivables: 'AED0.00', unusedCredits: 'AED0.00' },
  { id: 3, name: '2070 VACATION HOME', companyName: '2070 VACATION HOME RENTAL CO. LLC', email: '', workPhone: '', receivables: 'AED0.00', unusedCredits: 'AED0.00' },
  { id: 4, name: 'ELLUSHO', companyName: 'ELLUSHO PORTAL LLC', email: '', workPhone: '', receivables: 'AED0.00', unusedCredits: 'AED0.00' },
  { id: 5, name: 'CASTLE KING TECHNICAL SERVICES LLC', companyName: 'CASTLE KING TECHNICAL SERVICES LLC', email: '', workPhone: '', receivables: 'AED0.00', unusedCredits: 'AED0.00' },
  { id: 6, name: 'AIMTU', companyName: 'A I M T U REAL ESTATE L.L.C', email: '', workPhone: '', receivables: 'AED0.00', unusedCredits: 'AED0.00' },
  { id: 7, name: 'STARLINK', companyName: 'STARLINKS TRADING - FZCO', email: '', workPhone: '', receivables: 'AED0.00', unusedCredits: 'AED0.00' },
  { id: 8, name: 'R M K TRAVELS AND TOURS L.L.C', companyName: 'R M K TRAVELS AND TOURS L.L.C', email: '', workPhone: '', receivables: 'AED0.00', unusedCredits: 'AED0.00' },
  { id: 9, name: 'OPTIMUSROBO', companyName: 'OPTIMUSROBO - FZCO', email: '', workPhone: '', receivables: 'AED0.00', unusedCredits: 'AED0.00' },
];

const allColumns = [
  { label: 'Name', accessor: 'name', key: 'name' },
  { label: 'Company Name', accessor: 'companyName', key: 'companyName' },
  { label: 'Email', accessor: 'email', key: 'email' },
  { label: 'Work Phone', accessor: 'workPhone', key: 'workPhone' },
  { label: 'Receivables (BCY)', accessor: 'receivables', key: 'receivables' },
  { label: 'Unused Credits (BCY)', accessor: 'unusedCredits', key: 'unusedCredits' },
  { label: 'Receivables (BYC)', accessor: 'receivablesBYC', key: 'receivablesBYC' },
  { label: 'Unused Credits (BYC)', accessor: 'unusedCreditsBYC', key: 'unusedCreditsBYC' },
  { label: 'Source', accessor: 'source', key: 'source' },
  { label: 'Payment Term', accessor: 'paymentTerm', key: 'paymentTerm' },
  { label: 'Status', accessor: 'status', key: 'status' },
  { label: 'Tax Treatment', accessor: 'taxTreatment', key: 'taxTreatment' },
  { label: 'Website', accessor: 'website', key: 'website' },
];

export default function CustomersList() {
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
    name: true,
    companyName: true,
    email: true,
    workPhone: true,
    receivables: true,
    unusedCredits: true,
    receivablesBYC: false,
    unusedCreditsBYC: false,
    source: false,
    paymentTerm: false,
    status: false,
    taxTreatment: false,
    website: false,
  });

  const visibleColumns = allColumns.filter(col => filterFields[col.key]);

  const handleRowClick = (id) => {
    navigate(`/CustomerDetailedPage/${id}`);
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
    <div >
      {/* Header section */}
      <div className=" w-full bg-white ">
        <div className="flex items-center w-full justify-between p-4 border-b ">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Active Customers</h1>
            <ChevronDown className="ml-2 text-blue-500" size={20} />
          </div>
          <div className="flex items-center gap-2">
            <CommonButton
              label={<div className="flex items-center"><Plus size={20} className="mr-1" /> New</div>}
              onClick={() => navigate('/CustomersAdd_Details')}
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
            <div className="min-w-[1000px]"> {/* optional: set a min-width */}
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
