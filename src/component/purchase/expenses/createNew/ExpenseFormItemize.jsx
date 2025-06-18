import React, { useState } from 'react';
import { Plus, MoreVertical, ChevronDown, Search, X } from 'lucide-react';
import CommonButton from '../../../CommonUI/buttons/CommonButton';

const ExpenseFormItemize = () => {
  const [expenseRows, setExpenseRows] = useState([
    { id: 1, account: '', notes: '', tax: '', amount: '' },
    { id: 2, account: '', notes: '', tax: '', amount: '' }
  ]);
  
  const [reference, setReference] = useState('');
  const [customer, setCustomer] = useState('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

  const accounts = [
    'Office Supplies',
    'Travel Expenses',
    'Equipment',
    'Marketing',
    'Utilities',
    'Rent'
  ];

  const taxes = [
    'VAT 5%',
    'VAT 0%',
    'No Tax',
    'Exempt'
  ];

  const customers = [
    'ABC Corporation',
    'XYZ Ltd',
    'Global Industries',
    'Tech Solutions'
  ];

  const addNewRow = () => {
    const newId = Math.max(...expenseRows.map(row => row.id)) + 1;
    setExpenseRows([...expenseRows, { id: newId, account: '', notes: '', tax: '', amount: '' }]);
  };

  const removeRow = (id) => {
    if (expenseRows.length > 1) {
      setExpenseRows(expenseRows.filter(row => row.id !== id));
    }
  };

  const updateRow = (id, field, value) => {
    setExpenseRows(expenseRows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const calculateTotal = () => {
    return expenseRows.reduce((total, row) => {
      const amount = parseFloat(row.amount) || 0;
      return total + amount;
    }, 0).toFixed(2);
  };

  const SelectDropdown = ({ value, onChange, options, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none  flex items-center justify-between"
        >
          <span className={value ? 'text-gray-900' : 'text-gray-500'}>
            {value || placeholder}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-6 bg-white">
      {/* Header */}
      

      {/* Expense Rows */}
      <div className="space-y-4 mb-6">
        {/* Header Row */}
        <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-gray-700 uppercase tracking-wider">
          <div className="col-span-3 text-[#d6141d]">EXPENSE ACCOUNT</div>
          <div className="col-span-3">NOTES</div>
          <div className="col-span-2 text-[#d6141d]">TAX</div>
          <div className="col-span-2 text-[#d6141d]">AMOUNT</div>
          <div className="col-span-2"></div>
        </div>

        {/* Expense Rows */}
        {expenseRows.map((row, index) => (
          <div key={row.id} className="grid grid-cols-12 gap-4 items-center text-sm">
            <div className="col-span-3">
              <SelectDropdown
                value={row.account}
                onChange={(value) => updateRow(row.id, 'account', value)}
                options={accounts}
                placeholder="Select an account"
              />
            </div>
            
            <div className="col-span-3 relative">
              <textarea
                value={row.notes}
                onChange={(e) => updateRow(row.id, 'notes', e.target.value)}
                placeholder="Max. 500 characters"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  resize-none"
                rows="2"
                maxLength="500"
              />
            </div>
            
            <div className="col-span-2">
              <SelectDropdown
                value={row.tax}
                onChange={(value) => updateRow(row.id, 'tax', value)}
                options={taxes}
                placeholder="Select a Tax"
              />
            </div>
            
            <div className="col-span-2">
              <input
                type="number"
                value={row.amount}
                onChange={(e) => updateRow(row.id, 'amount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none "
                placeholder="0.00"
                step="0.01"
              />
            </div>
            
            <div className="col-span-2 flex items-center space-x-2">
              <button
                onClick={() => removeRow(row.id)}
                className="p-1 text-gray-400 hover:text-red-600 disabled:opacity-50"
                disabled={expenseRows.length === 1}
              >
                <X className="h-4 w-4" />
              </button>
              {/* <button className="p-1 text-gray-400 hover:text-gray-600">
                <MoreVertical className="h-4 w-4" />
              </button> */}
            </div>
          </div>
        ))}

        {/* Add New Row Button */}
        <div className="flex items-center">
          <CommonButton
            label={<>
            <Plus className="h-4 w-4 mr-2" />
            Add New Row
            </>}
            onClick={addNewRow}
            className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
          />
            
          
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-end mb-8">
        <div className="bg-gray-50 px-6 py-4 rounded-lg">
          <div className="flex items-center space-x-4">
            <span className="text-base font-semibold text-gray-700">
              Expense Total ( AED )
            </span>
            <span className="text-lg font-bold text-gray-900">
              {calculateTotal()}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reference#
          </label>
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none "
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Name
          </label>
          <div className="relative">
            <div className="flex">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  onFocus={() => setShowCustomerDropdown(true)}
                  placeholder="Select or add a customer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none "
                />
                {showCustomerDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {customers
                      .filter(c => c.toLowerCase().includes(customer.toLowerCase()))
                      .map((c, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            setCustomer(c);
                            setShowCustomerDropdown(false);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                        >
                          {c}
                        </button>
                      ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowCustomerDropdown(!showCustomerDropdown)}
                className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseFormItemize;