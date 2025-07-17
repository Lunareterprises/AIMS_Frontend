import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const ConfigureTerms = ({
  isOpen,
  onClose,
  paymentTerms,
  newTermName,
  setNewTermName,
  newTermDays,
  setNewTermDays,
  onAddNewTerm,
  onSave
}) => {
  const [showAddNew, setShowAddNew] = useState(false);
  const [defaultTermId, setDefaultTermId] = useState(paymentTerms.find(term => term.isDefault)?.id || null);

  if (!isOpen) return null;

  const handleMarkAsDefault = (termId) => {
    setDefaultTermId(termId);
    // You can add logic here to update the payment terms with default flag
  };

  const handleDeleteTerm = (termId) => {
    // Add logic to delete the term
    console.log('Delete term:', termId);
  };

  const handleAddNewTerm = () => {
    onAddNewTerm();
    setShowAddNew(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[700px] max-h-[80vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Configure Payment Terms</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {/* Terms Table */}
          <div className="space-y-1">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 pb-2 border-b border-gray-200">
              <div className="col-span-6">TERM NAME</div>
              <div className="col-span-3 text-center">NUMBER OF DAYS</div>
              <div className="col-span-3"></div>
            </div>

            {/* Existing Terms */}
            {paymentTerms.map((term) => (
              <div key={term.id} className="grid grid-cols-12 gap-4 py-3 border-b border-gray-100 hover:bg-gray-50 group">
                <div className="col-span-6">
                  <div className="text-sm text-gray-900 font-medium">{term.name}</div>
                </div>
                <div className="col-span-3 text-center">
                  <div className="text-sm text-gray-900">{term.days}</div>
                </div>
                <div className="col-span-3 flex items-center justify-end space-x-2">
                  {defaultTermId === term.id ? (
                    <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                      Default
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMarkAsDefault(term.id)}
                      className="text-xs text-blue-500 opacity-0 group-hover:opacity-100"
                    >
                      Mark as Default
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteTerm(term.id)}
                    className="text-xs text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Add New Section */}
          <div className="mt-6">
            {!showAddNew ? (
              <button
                onClick={() => setShowAddNew(true)}
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add New</span>
              </button>
            ) : (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center space-x-2 text-blue-500 text-sm font-medium mb-4">
                  <Plus className="w-4 h-4" />
                  <span>Add New Payment Term</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Term Name
                    </label>
                    <input
                      type="text"
                      value={newTermName}
                      onChange={(e) => setNewTermName(e.target.value)}
                      placeholder="e.g., Net 90"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Number of Days
                    </label>
                    <input
                      type="number"
                      value={newTermDays}
                      onChange={(e) => setNewTermDays(e.target.value)}
                      placeholder="90"
                      min="0"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => {
                      setShowAddNew(false);
                      setNewTermName('');
                      setNewTermDays('');
                    }}
                    className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddNewTerm}
                    disabled={!newTermName?.trim() || !newTermDays || isNaN(newTermDays)}
                    className="px-4 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Add Term
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigureTerms;