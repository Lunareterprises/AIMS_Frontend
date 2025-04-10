import { useState } from 'react';
import { ChevronDown, Plus, MoreVertical, Trash, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PriceList() {

  const Navi =useNavigate()
  const [priceLists, setPriceLists] = useState([
    { 
      id: 1, 
      name: 'gift', 
      description: 'Gift test', 
      currency: '-', 
      details: '1% Markdown', 
      pricingScheme: '-', 
      roundOffPreference: '0.50' 
    },
    { 
      id: 2, 
      name: 'Gift hamper', 
      description: '', 
      currency: 'INR', 
      details: 'Per Item Rate', 
      pricingScheme: 'Unit Pricing', 
      roundOffPreference: 'Never mind' 
    },
    { 
      id: 3, 
      name: 'gift hamper', 
      description: '', 
      currency: '-', 
      details: '2% Markup', 
      pricingScheme: '-', 
      roundOffPreference: '0.99' 
    }
  ]);

  return (
    <div className="max-w-full mx-auto bg-white">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-medium text-gray-700">All Price Lists</h1>
          <ChevronDown className="text-gray-500 h-5 w-5" />
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-blue-500">Default Price List for Retail Transactions</span>
          <button
          
          onClick={() => Navi('/price-lists/create')}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-1.5 flex items-center">
            <Plus className="h-4 w-4 mr-1" />
            <span>New</span>
          </button>
          <button className="text-gray-500">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name and Description
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Currency
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pricing Scheme
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Round Off Preference
              </th>
              {/* <th className="py-3 px-4 text-right">
                <Search className="h-4 w-4 text-gray-500 ml-auto" />
              </th> */}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-200">
            {priceLists.map((list) => (
              <tr key={list.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="text-blue-500">{list.name}</div>
                  {list.description && (
                    <div className="text-gray-500 text-sm">{list.description}</div>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-700">{list.currency}</td>
                <td className="px-4 py-3 text-gray-700">{list.details}</td>
                <td className="px-4 py-3 text-gray-700">{list.pricingScheme}</td>
                <td className="px-4 py-3 text-gray-700">{list.roundOffPreference}</td>
                <td className="px-4 py-3 text-right">
                  {list.id === 1 && (
                    <div className="flex items-center justify-end space-x-3 text-blue-500 text-sm">
                      <button>Edit</button>
                      <span className="text-gray-400">|</span>
                      <button>Mark as Inactive</button>
                      <span className="text-gray-400">|</span>
                      <button>
                        <Trash className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}