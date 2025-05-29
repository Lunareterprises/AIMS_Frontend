import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../../../../CommonUI/buttons/CommonButton';

export default function ImportCustomersModal({
  isOpen,
  onClose,
  selectedOption,
  setSelectedOption,
}) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleContinue = () => {
    if (selectedOption === 'customers') {
      navigate('/import/customers?heading=customers');
    } else if (selectedOption === 'contacts') {
      navigate('/import/customers?heading=contacts');
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-30 z-50">
      <div className="bg-white rounded-md shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 bg-gray-100">
          <h2 className="text-xl font-medium text-gray-800">Import Customers</h2>
          <button onClick={onClose} className="text-red-500 hover:bg-gray-100 p-1 rounded-full">
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-700 mb-4">
            You can import contacts from .CSV, .TSV or .XLS files.
          </p>
          <div className="space-y-3 mb-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="importType"
                className="h-5 w-5"
                checked={selectedOption === 'customers'}
                onChange={() => setSelectedOption('customers')}
              />
              <span className="ml-2">Customers</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="importType"
                className="h-5 w-5"
                checked={selectedOption === 'contacts'}
                onChange={() => setSelectedOption('contacts')}
              />
              <span className="ml-2">Customer's Contact Persons</span>
            </label>
          </div>
          <div className="flex space-x-3">
            <CommonButton
                label="Continue"
                onClick={handleContinue}
                className="bg-blue-500 text-white px-6 py-2 rounded-md"
            />
              
            
            <CommonButton label="Cancel" onClick={onClose} className="bg-gray-100 px-6 py-2 rounded-md " />
              
           
          </div>
        </div>
      </div>
    </div>
  );
}
