import { useState } from 'react';
import { ChevronDown, Plus, MoreVertical, HelpCircle, Download, Upload, RefreshCw, Settings, RotateCcw,  ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FilterModal from './FilterModal';
import CommonButton from '../../CommonUI/buttons/CommonButton';
import CustomerTable from './CustomerTable';

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

const menuItems = [
  { icon: <Upload size={18} className="text-blue-500" />, label: "Import Customers", color: "text-blue-500" },
  { icon: <Download size={18} />, label: "Export Customers" },
  { icon: <Download size={18} />, label: "Export Current View" },
  { icon: <Settings size={18} />, label: "Preferences" },
  { icon: <RefreshCw size={18} />, label: "Refresh List" },
  { icon: <RotateCcw size={18} />, label: "Reset Column Width" }
];


export default function CustomersList() {
  const navigate = useNavigate();
  const [customers] = useState(initialCustomers);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleRowClick = (id) => setSelectedCustomerId(id);

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
    <div className="w-full bg-white">
      <div className="flex items-center justify-between p-4 border-b ">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Active Customers</h1>
          <ChevronDown className="ml-2 text-blue-500" size={20} />
        </div>
        <div className="flex items-center gap-2 ">
          <CommonButton
            label={<div className="flex items-center"><Plus size={20} className="mr-1" /> New</div>}
            onClick={() => navigate('/CustomersAdd_Details')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          />
          {/* <CommonButton
            label="Filter"
            onClick={() => setIsFilterModalOpen(true)}
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
          /> */}
          {/* <CommonButton
            label={<MoreVertical size={20} />}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded"
            onClick={() => setIsOpen(!isOpen)} 
          />

        {isOpen && (
          <div className="absolute right-0 w-64 bg-white shadow-lg rounded-md border border-gray-200 z-10">
            <div className="p-3 border-b border-gray-200">
              <div className="flex items-center justify-between text-gray-600">
                <span>Sort by</span>
                <ChevronRight size={18} />
              </div>
            </div>
            
            <div className="py-1">
              {menuItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                    index === 0 ? "text-blue-500" : "text-gray-700"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                  {index % 2 === 1 && <span className="ml-auto text-gray-500">A</span>}
                </div>
              ))}
            </div>
          </div>
        )} */}

          <div className="relative">
            <CommonButton
              label={<MoreVertical size={20} />}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded"
              onClick={() => setIsOpen(!isOpen)} 
            />
            {isOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md border border-gray-200 z-10">
                <div className="p-3 border-b border-gray-200">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Sort by</span>
                    <ChevronRight size={18} />
                  </div>
                </div>
                
                <div className="py-1">
                  {menuItems.map((item, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                        index === 0 ? "text-blue-500" : "text-gray-700"
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.label}</span>
                      {index % 2 === 1 && <span className="ml-auto text-gray-500">A</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <CommonButton
            label={<HelpCircle size={20} />}
            className="p-2 text-white bg-orange-500 hover:bg-orange-600 rounded"
          />
        </div>
      </div>

      


      <div className="w-full">
        <div className="overflow-x-auto">
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
