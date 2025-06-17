import React, { useEffect, useState } from 'react';
import { X, Info, Plus } from 'lucide-react';
import CommonButton from '../../../CommonUI/buttons/CommonButton';

const QuoteNumberPreferences = ({ isOpen, onClose, source }) => {
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [prefix, setPrefix] = useState('QT-');
  const [nextNumber, setNextNumber] = useState('000004');
  const [restartNumbering, setRestartNumbering] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedYearFormat, setSelectedYearFormat] = useState('');
  const [labelName, setLabelName] = useState('');

    useEffect(() => {
    if (source === 'invoice') {
      setLabelName('Invoice');
    } else if(source === 'quote'){
      setLabelName('Quote');
    }
      else if(source === 'paymentRecevible'){
      setLabelName('Payment Recevible');
    }
  }, [source]);

  if (!isOpen) return null;

  const dropdownOptions = [
    'Fiscal Year Start',
    'Fiscal Year End', 
    'Transaction Year',
    'Transaction Date',
    'Transaction Month'
  ];

  const yearFormats = ['YY', 'YYYY'];

  const handleDropdownSelect = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
    if (option === 'Fiscal Year Start' || option === 'Fiscal Year End') {
      setShowYearDropdown(true);
    } else {
      setShowYearDropdown(false);
    }
  };

  const handleYearFormatSelect = (format) => {
    setSelectedYearFormat(format);
    setShowYearDropdown(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-20  bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Configure {labelName} Number Preferences</h2>
          <CommonButton label={<X size={24} />} className="text-gray-400 hover:text-gray-600" onClick={onClose} />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info Section */}
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            </div>
            <div className="flex-1">
              <p className="text-gray-600">
                Configure multiple transaction number series to auto-generate transaction numbers with unique prefixes according to your business needs.
              </p>
            </div>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Configure →
            </button>
          </div>

          {/* Warning Message */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              Your {labelName} numbers are set on auto-generate mode to save your time. Are you sure about changing this setting?
            </p>
          </div>

          {/* Radio Options */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="auto-generate"
                name="numberMode"
                checked={autoGenerate}
                onChange={() => setAutoGenerate(true)}
                className="w-4 h-4 text-blue-600"
              />
              <label htmlFor="auto-generate" className="text-gray-900 font-medium">
                Continue auto-generating {labelName} numbers
              </label>
              <div className="relative ">
                <button
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Info size={16} />
                </button>
                {showTooltip && (
                  <div className=" absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg w-96 z-10">
                    The edited prefix and next number will be updated in the transaction number series associated with your {labelName}.
                  </div>
                )}
              </div>
            </div>

            {autoGenerate && (
              <div className="ml-7 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prefix
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Next Number
                    </label>
                    <input
                      type="text"
                      value={nextNumber}
                      onChange={(e) => setNextNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="restart-numbering"
                    checked={restartNumbering}
                    onChange={(e) => setRestartNumbering(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 rounded"
                  />
                  <div className="flex-1">
                    <label htmlFor="restart-numbering" className="text-gray-700">
                      Restart numbering for {labelName} at the start of each fiscal year.
                    </label>
                    
                    {restartNumbering && (
                      <div className="mt-3 relative">
                        <div className="relative inline-block">
                          <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                          >
                            {selectedOption || 'PLACEHOLDER'}
                          </button>
                          
                          {showDropdown && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                              {dropdownOptions.map((option, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleDropdownSelect(option)}
                                  className="w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {showYearDropdown && (
                          <div className="ml-4 mt-2 relative inline-block">
                            <div className="space-x-2">
                              {yearFormats.map((format) => (
                                <button
                                  key={format}
                                  onClick={() => handleYearFormatSelect(format)}
                                  className={`px-4 py-2 rounded-lg border ${
                                    selectedYearFormat === format
                                      ? 'bg-blue-600 text-white border-blue-600'
                                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                  }`}
                                >
                                  {format}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="manual-entry"
                name="numberMode"
                checked={!autoGenerate}
                onChange={() => setAutoGenerate(false)}
                className="w-4 h-4 text-blue-600"
              />
              <label htmlFor="manual-entry" className="text-gray-900 font-medium">
                Enter {labelName} numbers manually
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <CommonButton label="Cancel" onClick={onClose} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"/>
          <CommonButton label="Save" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"/>
        </div>
      </div>
    </div>
  );
};

export default QuoteNumberPreferences;