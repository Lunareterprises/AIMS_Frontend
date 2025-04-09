import { useState } from 'react';
import { ChevronDown, ChevronUp, MoreVertical, Plus, HelpCircle } from 'lucide-react';

export default function Itemslistform() {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  const items = [
    {
      id: 1,
      name: 'choclate',
      sku: '4',
      purchaseDescription: 'purchasing for producing h=gift haper',
      purchaseRate: 'Rs.100.00',
      description: 'selling as a gift hamper',
      rate: 'Rs.400.00',
      stock: '2.00',
      usage: 'pcs'
    },
    {
      id: 2,
      name: 'gift hamper',
      sku: '1',
      purchaseDescription: 'purchased for a gift hamper',
      purchaseRate: 'Rs.20.00',
      description: 'selling gift hamper',
      rate: 'Rs.80.00',
      stock: '5.00',
      usage: 'box'
    },
    {
      id: 3,
      name: 'toy',
      sku: '5',
      purchaseDescription: 'purchasing for a gift production',
      purchaseRate: 'Rs.20.00',
      description: 'producing angift hamper',
      rate: 'Rs.80.00',
      stock: '4.00',
      usage: 'pcs'
    }
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-white h-screen w-full">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-gray-800">All Items</h1>
          <ChevronDown className="ml-1 h-5 w-5 text-gray-800" />
        </div>
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
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
      
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-y border-gray-200 bg-gray-50">
              <th className="p-2 w-10">
                <div className="flex items-center justify-center">
                  <input type="checkbox" className="w-4 h-4" />
                </div>
              </th>
              <th 
                className="px-4 py-2 text-left cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  <span className="font-semibold text-gray-600">NAME</span>
                  {sortField === 'name' && (
                    sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                  )}
                </div>
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">SKU</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">PURCHASE DESCRIPTION</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">PURCHASE RATE</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">DESCRIPTION</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">RATE</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">STOCK ON HAND</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">USAGE UNIT</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-2">
                  <div className="flex items-center justify-center">
                    <input type="checkbox" className="w-4 h-4" />
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded mr-2 flex items-center justify-center text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <span className="text-blue-500">{item.name}</span>
                  </div>
                </td>
                <td className="px-4 py-2">{item.sku}</td>
                <td className="px-4 py-2">{item.purchaseDescription}</td>
                <td className="px-4 py-2">{item.purchaseRate}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">{item.rate}</td>
                <td className="px-4 py-2">{item.stock}</td>
                <td className="px-4 py-2">{item.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}