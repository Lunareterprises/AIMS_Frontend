import React, { useState } from 'react';
import {
  Upload, Download, Settings, RefreshCw, RotateCcw
} from 'lucide-react';
import CommonButton from '../../../CommonUI/buttons/CommonButton';

const menuItems = [
  { icon: <Upload size={18} className="text-blue-500" />, label: "Import Customers" },
  { icon: <Download size={18} className="text-blue-500" />, label: "Export Customers" },
  { icon: <Download size={18} className="text-blue-500"/>, label: "Export Current View" },
  { icon: <Settings size={18} className="text-blue-500"/>, label: "Preferences" },
  { icon: <RefreshCw size={18} className="text-blue-500"/>, label: "Refresh List" },
  { icon: <RotateCcw size={18} className="text-blue-500"/>, label: "Reset Column Width" }
];

export default function SortOptionsDropdown({ onMenuSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSelect = (label) => {
    setIsOpen(false);
    onMenuSelect(label); 
  };

  return (
    <div className="relative">
      <CommonButton
        label={<svg className="w-5 h-5" fill="none" stroke="black" strokeWidth="4" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6h.01M12 12h.01M12 18h.01" />
        </svg>}
       onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded" 
      />
        
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md border border-gray-200 z-50">
          <div className="py-1">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center px-4 py-3 hover:text-blue-500 cursor-pointer ${
                  item.color || 'text-gray-700'
                }`}
                onClick={() => handleSelect(item.label)}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
