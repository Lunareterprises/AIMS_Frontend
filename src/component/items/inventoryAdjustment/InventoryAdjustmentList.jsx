import { useState } from 'react';
import { Plus, MoreVertical, ChevronDown, Search, HelpCircle, BarChart2 } from 'lucide-react';

export default function InventoryAdjustmentList() {
  const [adjustments, setAdjustments] = useState([
    {
      id: 1,
      date: '07/04/2025',
      reason: 'Damaged goods',
      description: '',
      status: 'ADJUSTED',
      referenceNumber: '',
      type: 'Quantity',
      createdBy: 'accounts',
      createdTime: '07/04/2025 04:01 PM',
      lastModifiedBy: 'accounts',
      lastModifiedTime: '07/04/2025 04:01 PM',
      selected: false
    },
    {
      id: 2,
      date: '07/04/2025',
      reason: 'Stolen goods',
      description: '',
      status: 'ADJUSTED',
      referenceNumber: '',
      type: 'Quantity',
      createdBy: 'accounts',
      createdTime: '07/04/2025 04:01 PM',
      lastModifiedBy: 'accounts',
      lastModifiedTime: '07/04/2025 04:01 PM',
      selected: false
    },
    {
      id: 3,
      date: '07/04/2025',
      reason: 'Damaged goods',
      description: '',
      status: 'ADJUSTED',
      referenceNumber: '',
      type: 'Quantity',
      createdBy: 'accounts',
      createdTime: '07/04/2025 03:58 PM',
      lastModifiedBy: 'accounts',
      lastModifiedTime: '07/04/2025 03:58 PM',
      selected: false
    },
    {
      id: 4,
      date: '07/04/2025',
      reason: 'Damaged goods',
      description: '',
      status: 'ADJUSTED',
      referenceNumber: '',
      type: 'Quantity',
      createdBy: 'accounts',
      createdTime: '07/04/2025 03:55 PM',
      lastModifiedBy: 'accounts',
      lastModifiedTime: '07/04/2025 03:55 PM',
      selected: false
    }
  ]);

  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setAdjustments(adjustments.map(item => ({ ...item, selected: newSelectAll })));
  };

  const toggleSelectItem = (id) => {
    setAdjustments(adjustments.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
    
    // Update selectAll state based on if all items are selected
    const allSelected = adjustments.every(item => 
      item.id === id ? !item.selected : item.selected
    );
    setSelectAll(allSelected);
  };

  return (
    <div className="max-w-full mx-auto bg-white">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h1 className="text-2xl font-medium text-gray-800">Inventory Adjustments</h1>
        
        <div className="flex items-center space-x-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-1.5 flex items-center">
            <Plus className="h-4 w-4 mr-1" />
            <span>New</span>
          </button>
          <button className="text-gray-500 p-1">
            <MoreVertical className="h-5 w-5" />
          </button>
          <button className="text-white bg-orange-400 rounded-full h-8 w-8 flex items-center justify-center">
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center px-4 py-3 border-b bg-gray-50">
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-medium">Filter By :</span>
          
          <div className="relative">
            <button className="flex items-center space-x-2 bg-white border border-gray-300 rounded px-3 py-1.5 text-sm">
              <span>Type: All</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
          </div>
          
          <div className="relative">
            <button className="flex items-center space-x-2 bg-white border border-gray-300 rounded px-3 py-1.5 text-sm">
              <span>Period : All</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center text-blue-500">
          <BarChart2 className="h-4 w-4 mr-1" />
          <span>FIFO Cost Lot Tracking Report</span>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-white border-b">
            <tr>
              <th className="w-12 py-3 px-4">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-blue-500"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reference Number
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created By
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created Time
                <ChevronDown className="h-3 w-3 text-gray-500 inline ml-1" />
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Modified By
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Modified Time
              </th>
              <th className="py-3 px-4 text-right">
                <Search className="h-4 w-4 text-gray-500 ml-auto" />
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-200">
            {adjustments.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-blue-500"
                    checked={item.selected}
                    onChange={() => toggleSelectItem(item.id)}
                  />
                </td>
                <td className="px-4 py-3 text-gray-700">{item.date}</td>
                <td className="px-4 py-3 text-gray-700">{item.reason}</td>
                <td className="px-4 py-3 text-gray-700">{item.description}</td>
                <td className="px-4 py-3">
                  <span className="text-blue-500">{item.status}</span>
                </td>
                <td className="px-4 py-3 text-gray-700">{item.referenceNumber}</td>
                <td className="px-4 py-3 text-gray-700">{item.type}</td>
                <td className="px-4 py-3 text-gray-700">{item.createdBy}</td>
                <td className="px-4 py-3 text-gray-700">{item.createdTime.split(' ')[0]}
                  <br />
                  <span className="text-gray-500">{item.createdTime.split(' ')[1]}</span>
                </td>
                <td className="px-4 py-3 text-gray-700">{item.lastModifiedBy}</td>
                <td className="px-4 py-3 text-gray-700">{item.lastModifiedTime.split(' ')[0]}
                  <br />
                  <span className="text-gray-500">{item.lastModifiedTime.split(' ')[1]}</span>
                </td>
                <td className="px-4 py-3"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}