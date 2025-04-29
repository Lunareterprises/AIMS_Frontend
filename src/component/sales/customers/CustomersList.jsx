import { useState } from 'react';
import { ChevronDown, Plus, MoreVertical, Search, Edit, Mail, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CustomersList() {

  const Navi =useNavigate();

  const [customers, setCustomers] = useState([
    { id: 1, name: 'ASK', companyName: 'ASK PORTAL - FZCO', email: '', workPhone: '', receivables: 'AED0.00', unusedCredits: 'AED0.00' },
    { id: 2, name: 'TA', companyName: 'TELUGU AIRLINES', email: '', workPhone: '', receivables: 'AED0.00', unusedCredits: 'AED0.00' },
    { id: 3, name: '2070 VACATION HOME', companyName: '2070 VACATION HOME RENTAL CO. LLC', email: '', workPhone: '', receivables: 'AED0.00', unusedCredits: 'AED0.00' },
    { id: 4, name: 'ELLUSHO', companyName: 'ELLUSHO PORTAL LLC', email: '', workPhone: '', receivables: 'AED0.00', unusedCredits: 'AED0.00' },
    { id: 5, name: 'CASTLE KING TECHNICAL SERVICES LLC', companyName: 'CASTLE KING TECHNICAL SERVICES LLC', email: '', workPhone: '', receivables: 'AED0.00', unusedCredits: 'AED0.00' },
    { id: 6, name: 'AIMTU', companyName: 'A I M T U REAL ESTATE L.L.C', email: '', workPhone: '', receivables: 'AED0.00', unusedCredits: 'AED0.00' },
    { id: 7, name: 'STARLINK', companyName: 'STARLINKS TRADING - FZCO', email: '', workPhone: '', receivables: 'AED0.00', unusedCredits: 'AED0.00' },
    { id: 8, name: 'R M K TRAVELS AND TOURS L.L.C', companyName: 'R M K TRAVELS AND TOURS L.L.C', email: '', workPhone: '', receivables: 'AED0.00', unusedCredits: 'AED0.00' },
    { id: 9, name: 'OPTIMUSROBO', companyName: 'OPTIMUSROBO - FZCO', email: '', workPhone: '', receivables: 'AED0.00', unusedCredits: 'AED0.00' },
  ]);
  
  const [selectedCustomerId, setSelectedCustomerId] = useState(4); // ELLUSHO is selected
  const [showActionMenu, setShowActionMenu] = useState(true);
  const [allSelected, setAllSelected] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(customers.map(customer => customer.id));
    }
    setAllSelected(!allSelected);
  };

  const handleCustomerClick = (id) => {
    setSelectedCustomerId(id);
    setShowActionMenu(true);
  };

  const closeActionMenu = () => {
    setShowActionMenu(false);
  };

  return (
    <div className="bg-white w-full">
      {/* Header section */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <h1 className="text-2xl font-medium text-gray-800">Active Customers</h1>
          <ChevronDown className="ml-2 text-blue-500" size={20} />
        </div>
        <div className="flex items-center space-x-2">

          
          <button 
          

          onClick={() => Navi('/CustomersAdd_Details')}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
            <Plus size={20} className="mr-1" />
            New
          </button>
          <button className="text-gray-600 p-2 rounded">
            <MoreVertical size={20} />
          </button>
          <button className="text-white bg-orange-500 p-2 rounded">
            <HelpCircle size={20} />
          </button>
        </div>
      </div>

      {/* Table section */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-3 py-3">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 text-blue-500 rounded border-gray-300"
                    checked={allSelected}
                    onChange={handleSelectAll}
                  />
                </div>
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <span>Name</span>
                </div>
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company Name
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Work Phone
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Receivables (BCY)
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unused Credits (BCY)
              </th>
              {/* <th className="w-12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <Search size={16} />
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr 
                key={customer.id} 
                className={`hover:bg-gray-50 ${customer.id === selectedCustomerId ? 'bg-blue-50' : ''}`}
                onClick={() => handleCustomerClick(customer.id)}
              >
                <td className="px-3 py-4 whitespace-nowrap">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 text-blue-500 rounded border-gray-300"
                    checked={selectedRows.includes(customer.id)}
                    onChange={() => handleRowSelect(customer.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <span className="text-blue-500">{customer.name}</span>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {customer.companyName}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {customer.email}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {customer.workPhone}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {customer.receivables}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {customer.unusedCredits}
                </td>
                {/* <td className="px-3 py-4 whitespace-nowrap">
                  {customer.id === selectedCustomerId && showActionMenu && (
                    <div className="flex justify-center">
                      <div className="relative">
                        <button 
                          className="p-1 rounded-full bg-blue-500 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            closeActionMenu();
                          }}
                        >
                          <ChevronDown size={16} />
                        </button>

                        Action menu dropdown
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                          <div className="py-1 border rounded-md shadow-sm">
                            <div className="block px-4 py-2 text-sm text-gray-700 border-b">
                              <button className="flex items-center w-full text-left">
                                <Edit className="mr-2" size={16} />
                                <span>Edit</span>
                              </button>
                            </div>
                            <div className="block px-4 py-2 text-sm text-gray-700">
                              <button className="flex items-center w-full text-left">
                                <Mail className="mr-2" size={16} />
                                <span>Email Customer</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}