import { useState } from 'react';
import { ChevronDown, Trash, FolderOpen, X, MoreVertical, HelpCircle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ItemsGroupList() {

  const Navi =useNavigate()
  const [items, setItems] = useState([
    { id: 1, name: 'gift hamper', sku: '1', stock: 5.00, reorderPoint: 1.00, selected: true }
  ]);
  
  const [selectAll, setSelectAll] = useState(true);
  
  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setItems(items.map(item => ({ ...item, selected: newSelectAll })));
  };
  
  const toggleSelectItem = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
    
    // Update selectAll state based on if all items are selected
    const allSelected = items.every(item => 
      item.id === id ? !item.selected : item.selected
    );
    setSelectAll(allSelected);
  };

  return (
    <div className="bg-white rounded shadow w-full ">
    
        
        
    


        <div className="flex justify-end items-end p-4">
     
        <div className="flex gap-2">
          <button
            onClick={() => Navi("/ItemGroupAdd")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Plus className="mr-1 h-4 w-4" /> New
          </button>
          <button className="text-gray-600 border border-gray-300 px-2 rounded-md">
            <MoreVertical className="h-5 w-5" />
          </button>
          <button className="bg-orange-400 text-white px-2 rounded-md">
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
      
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="w-12 py-3 px-4">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-blue-500"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="text-left py-3 px-4 flex items-center space-x-1">
                <span>NAME</span>
                <ChevronDown size={14} className="text-gray-400" />
              </th>
              <th className="text-left py-3 px-4">SKU</th>
              <th className="text-left py-3 px-4">STOCK ON HAND</th>
              <th className="text-left py-3 px-4">REORDER POINT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-blue-500"
                    checked={item.selected}
                    onChange={() => toggleSelectItem(item.id)}
                  />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <FolderOpen size={16} className="text-blue-500 mr-2" />
                    <span className="text-blue-500">{item.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">{item.sku}</td>
                <td className="py-3 px-4">{item.stock.toFixed(2)}</td>
                <td className="py-3 px-4">{item.reorderPoint.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}