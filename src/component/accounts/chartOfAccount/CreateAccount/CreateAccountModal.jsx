import React, { useState } from 'react';
import { X, ChevronDown, Info } from 'lucide-react';
import CommonButton from '../../../CommonUI/buttons/CommonButton';

export default function CreateAccountModal({ onClose }) {
  const [accountType, setAccountType] = useState('Other Asset');
  const [accountName, setAccountName] = useState('');
  const [accountCode, setAccountCode] = useState('');
  const [description, setDescription] = useState('');
  const [isSubAccount, setIsSubAccount] = useState(false);
  const [addToWatchlist, setAddToWatchlist] = useState(false);
  const [showInExpense, setShowInExpense] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const accountTypes = [
    'Other Asset',
    'Current Asset',
    'Fixed Asset',
    'Current Liability',
    'Long Term Liability',
    'Equity',
    'Income',
    'Expense',
    'Cost of Goods Sold'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl relative max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Create Account</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <X size={20} onClick={onClose} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 max-h-[500px] overflow-y-auto text-sm">

          {/* Account Type with tooltip on hover */}
          <div className="flex items-center space-x-4">
            <label className="w-52 text-sm font-medium text-red-600">Account Type*</label>
            <div className="relative w-full group">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between hover:border-gray-400 focus:outline-none   "
              >
                <span className="text-gray-900">{accountType}</span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {accountTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setAccountType(type);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}

              {/* Tooltip
              <div className="absolute top-full mt-2 left-0 w-64 z-20 bg-gray-800 text-white text-sm p-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="font-medium mb-1">Asset</div>
                <div>Track special assets like goodwill and other intangible assets</div>
                <div className="absolute -top-2 left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-800"></div>
              </div> */}
            </div>
          </div>

          {/* Account Name */}
          <div className="flex items-center space-x-4">
            <label className="w-40 text-sm font-medium text-red-600">Account Name*</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none   "
            />
          </div>

          {/* Sub-account checkbox */}
            {/* Sub-account checkbox */}
            <div className="flex items-center space-x-2 pl-44 relative">
            <input
                type="checkbox"
                id="sub-account"
                checked={isSubAccount}
                onChange={(e) => setIsSubAccount(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="sub-account" className="text-sm text-gray-700 flex items-center">
                Make this a sub-account
                {/* Tooltip Trigger + Content */}
                <div className="relative group ml-1">
                <Info size={14} className="text-gray-400 cursor-pointer"/>
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-60 z-50 bg-gray-800 text-white text-xs p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Select this option if you are creating a sub-account.
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-800"></div>
                </div>
                </div>
            </label>
            </div>


          {/* Account Code */}
          <div className="flex items-center space-x-4">
            <label className="w-40 text-sm font-medium text-gray-700">Account Code</label>
            <input
              type="text"
              value={accountCode}
              onChange={(e) => setAccountCode(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none   "
            />
          </div>

          {/* Description */}
          <div className="flex items-start space-x-4">
            <label className="w-40 text-sm font-medium text-gray-700 pt-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Max. 500 characters"
              rows={3}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none   "
            />
          </div>

          {/* Watchlist checkbox */}
          <div className="flex items-center space-x-2 pl-44">
            <input
              type="checkbox"
              id="watchlist"
              checked={addToWatchlist}
              onChange={(e) => setAddToWatchlist(e.target.checked)}
              className="h-4 w-4 text-blue-600  border-gray-300 rounded"
            />
            <label htmlFor="watchlist" className="text-sm text-gray-700">
              Add to the watchlist on my dashboard
            </label>
          </div>

          {/* Zoho Expense */}
          <div className="flex items-start space-x-4">
            <label className="w-40 text-sm font-medium text-gray-700 pt-2">Zeluna Expense?</label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="expense"
                checked={showInExpense}
                onChange={(e) => setShowInExpense(e.target.checked)}
                className="h-4 w-4 text-blue-600  border-gray-300 rounded"
              />
              
              <label htmlFor="sub-account" className="text-sm text-gray-700 flex items-center">
                Show as an active account in Zeluna Expense
                {/* Tooltip Trigger + Content */}
                <div className="relative group ml-1">
                <Info size={14} className="text-gray-400 cursor-pointer"/>
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-60 z-50 bg-gray-800 text-white text-xs p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    If left unchecked, it will be displayed as an inactive account in Zeluna Expense.
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-800"></div>
                </div>
                </div>
            </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-start space-x-3 px-6 py-4 border-t border-gray-200">
          <CommonButton label="Save" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none  " />
            
          
          <CommonButton label="Cancel" onClick={onClose} className="px-4 py-2 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none  focus:ring-gray-500" />
            
          
        </div>
      </div>
    </div>
  );
}
