import React, { useState } from 'react';
import { ChevronDown, Plus, Upload, Tag, ArrowLeft } from 'lucide-react';
import CommonButton from '../../../CommonUI/buttons/CommonButton';
import FileUploadCard from './FileUploadCard';
import ExpenseFormItemize from './ExpenseFormItemize';

export default function ExpenseForm() {
  const [formData, setFormData] = useState({
    date: '18 Jun 2025',
    expenseAccount: '',
    amount: '',
    amountType: 'Tax Exclusive',
    paidThrough: '',
    vendor: '',
    taxTreatment: '',
    placeOfSupply: '',
    tax: '',
    reference: '',
    notes: '',
    customerName: ''
  });

  const [showItemizeSection, setItemizeShowSection] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-full mx-auto bg-white p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Record Expense</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Date Field */}
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <label className="w-full md:w-48 text-sm font-medium text-red-600">Date*</label>
            <input
              type="text"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full md:w-[300px] text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          {!showItemizeSection && (
            <>
              {/* Expense Account */}
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label className="w-full md:w-48 text-sm font-medium text-red-600">Expense Account*</label>
                <div className="relative w-full md:w-[300px]">
                  <select className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none appearance-none bg-white">
                    <option>Select an account</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <span className="text-blue-600 text-sm cursor-pointer" onClick={() => setItemizeShowSection(true)}>📋 Itemize</span>
              </div>

              {/* Amount */}
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label className="w-full md:w-48 text-sm font-medium text-red-600">Amount*</label>
                <div className="flex w-full md:w-[300px]">
                  <div className="relative">
                    <select className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none appearance-none bg-white pr-8 text-sm">
                      <option>AED</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-l-0 border-gray-300 rounded-r-md focus:outline-none text-sm"
                  />
                </div>
              </div>

              {/* Amount Type */}
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label className="w-full md:w-48 text-sm font-medium text-gray-700">Amount Is</label>
                <div className="flex gap-4">
                  {['Tax Inclusive', 'Tax Exclusive'].map(option => (
                    <label key={option} className="flex items-center text-sm">
                      <input
                        type="radio"
                        name="amountType"
                        value={option}
                        checked={formData.amountType === option}
                        onChange={(e) => handleInputChange('amountType', e.target.value)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Paid Through */}
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <label className="w-full md:w-48 text-sm font-medium text-red-600">Paid Through*</label>
            <div className="relative w-full md:w-[300px]">
              <select className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none appearance-none bg-white">
                <option>Select an account</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Vendor */}
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <label className="w-full md:w-48 text-sm font-medium text-gray-700">Vendor</label>
            <div className="flex w-full md:w-[300px]">
              <div className="relative w-full">
                <select className="w-full text-sm px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none appearance-none bg-white">
                  <option></option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <button className="px-3 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tax Treatment and Place of Supply */}
          {['Tax Treatment*', 'Place of Supply*'].map((label, i) => (
            <div key={label} className="flex flex-col md:flex-row md:items-center gap-2">
              <label className="w-full md:w-48 text-sm font-medium text-red-600">{label}</label>
              <div className="relative w-full md:w-[300px]">
                <select className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none appearance-none bg-white" />
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))}

          {showItemizeSection && (
            <>
              {/* Amount Type (again for Itemize) */}
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label className="w-full md:w-48 text-sm font-medium text-gray-800">Amounts are</label>
                <div className="flex gap-4">
                  {['Tax Inclusive', 'Tax Exclusive'].map(option => (
                    <label key={option} className="flex items-center text-sm">
                      <input
                        type="radio"
                        name="amountType"
                        value={option}
                        checked={formData.amountType === option}
                        onChange={(e) => handleInputChange('amountType', e.target.value)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Additional Fields if not itemized */}
          {!showItemizeSection && (
            <>
              {/* Tax, Reference, Notes, Customer Name, Tags */}
              {[
                { label: 'Tax', type: 'select', options: ['Select a Tax'] },
                { label: 'Reference#', type: 'input' },
                { label: 'Notes', type: 'textarea' },
              ].map((field) => (
                <div key={field.label} className="flex flex-col md:flex-row md:items-start gap-2">
                  <label className="w-full md:w-48 text-sm font-medium text-gray-700">{field.label}</label>
                  {field.type === 'select' ? (
                    <div className="relative w-full md:w-[300px]">
                      <select className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none appearance-none bg-white">
                        {field.options.map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  ) : field.type === 'input' ? (
                    <input className="w-full md:w-[300px] text-sm px-3 py-2 border border-gray-300 rounded-md" />
                  ) : (
                    <textarea rows={3} className="w-full md:w-[300px] text-sm px-3 py-2 border border-gray-300 rounded-md resize-none" placeholder="Max. 500 characters" />
                  )}
                </div>
              ))}

              {/* Customer Name with Plus */}
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label className="w-full md:w-48 text-sm font-medium text-gray-700">Customer Name</label>
                <div className="flex w-full md:w-[300px]">
                  <div className="relative w-full">
                    <select className="w-full text-sm px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none bg-white">
                      <option>Select or add a customer</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <button className="px-3 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label className="w-full md:w-48 text-sm font-medium text-gray-700">Reporting Tags</label>
                <button className="text-blue-600 text-sm flex items-center">
                  <Tag className="w-4 h-4 mr-1" /> Associate Tags
                </button>
              </div>
            </>
          )}

          {/* Itemize Component */}
          {showItemizeSection && (
            <div>
              <CommonButton
                className="text-blue-600 hover:text-blue-800 mb-4"
                onClick={() => setItemizeShowSection(false)}
                label={<><ArrowLeft className="h-4 w-4 mr-1" /> Back to single expense view</>}
              />
              <ExpenseFormItemize />
            </div>
          )}
        </div>

        {/* Right Column: File Upload */}
        <FileUploadCard />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-200">
        <CommonButton label="Save" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" />
        <CommonButton label="Save and New" className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50" />
        <CommonButton label="Cancel" className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50" />
      </div>
    </div>
  );
}
