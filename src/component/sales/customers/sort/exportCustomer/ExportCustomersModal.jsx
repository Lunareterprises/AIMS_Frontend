import { useState } from 'react';
import { X, Info } from 'lucide-react';

export default function ExportCustomersModal({ onClose }) {
  const [module, setModule] = useState('Customers');
  const [selectedOption, setSelectedOption] = useState('Customers');
  const [exportType, setExportType] = useState('All Customers');
  const [decimalFormat, setDecimalFormat] = useState('12345678.9');
  const [fileFormat, setFileFormat] = useState('CSV');
  const [includePII, setIncludePII] = useState(false);
  const [password, setPassword] = useState('');

  const handleExport = () => {
    // Handle export functionality here
    console.log({
      module,
      selectedOption,
      exportType,
      decimalFormat,
      fileFormat,
      includePII,
      password
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium text-gray-800">Export Customers</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Info Banner */}
          <div className="bg-blue-50 p-3 rounded mb-4 flex items-start">
            <Info className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" size={20} />
            <span className="text-sm text-gray-600">
              You can export your data from Zoho Books in CSV, XLS or XLSX format.
            </span>
          </div>

          {/* Form Fields */}
          <div>
            {/* Module */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Module<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={module}
                  onChange={(e) => setModule(e.target.value)}
                >
                  <option>Customers</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Module Options */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  id="customers"
                  type="radio"
                  name="moduleOption"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  checked={selectedOption === 'Customers'}
                  onChange={() => setSelectedOption('Customers')}
                />
                <label htmlFor="customers" className="ml-2 block text-sm text-gray-700">
                  Customers
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  id="contactPersons"
                  type="radio"
                  name="moduleOption"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  checked={selectedOption === "Customer's Contact Persons"}
                  onChange={() => setSelectedOption("Customer's Contact Persons")}
                />
                <label htmlFor="contactPersons" className="ml-2 block text-sm text-gray-700">
                  Customer's Contact Persons
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="addresses"
                  type="radio"
                  name="moduleOption"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  checked={selectedOption === "Customer's Addresses"}
                  onChange={() => setSelectedOption("Customer's Addresses")}
                />
                <label htmlFor="addresses" className="ml-2 block text-sm text-gray-700">
                  Customer's Addresses
                </label>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Export Type */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  id="allCustomers"
                  type="radio"
                  name="exportType"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  checked={exportType === 'All Customers'}
                  onChange={() => setExportType('All Customers')}
                />
                <label htmlFor="allCustomers" className="ml-2 block text-sm text-gray-700">
                  All Customers
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="specificPeriod"
                  type="radio"
                  name="exportType"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  checked={exportType === 'Specific Period'}
                  onChange={() => setExportType('Specific Period')}
                />
                <label htmlFor="specificPeriod" className="ml-2 block text-sm text-gray-700">
                  Specific Period
                </label>
              </div>
            </div>

            {/* Decimal Format */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Decimal Format<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={decimalFormat}
                  onChange={(e) => setDecimalFormat(e.target.value)}
                >
                  <option>12345678.9</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* File Format */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Export File Format<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center mb-2">
                <input
                  id="csv"
                  type="radio"
                  name="fileFormat"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  checked={fileFormat === 'CSV'}
                  onChange={() => setFileFormat('CSV')}
                />
                <label htmlFor="csv" className="ml-2 block text-sm text-gray-700">
                  CSV (Comma Separated Value)
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  id="xls"
                  type="radio"
                  name="fileFormat"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  checked={fileFormat === 'XLS'}
                  onChange={() => setFileFormat('XLS')}
                />
                <label htmlFor="xls" className="ml-2 block text-sm text-gray-700">
                  XLS (Microsoft Excel 1997-2004 Compatible)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="xlsx"
                  type="radio"
                  name="fileFormat"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  checked={fileFormat === 'XLSX'}
                  onChange={() => setFileFormat('XLSX')}
                />
                <label htmlFor="xlsx" className="ml-2 block text-sm text-gray-700">
                  XLSX (Microsoft Excel)
                </label>
              </div>
            </div>

            {/* PII Checkbox */}
            <div className="mb-4">
              <div className="flex items-center">
                <input
                  id="includePII"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={includePII}
                  onChange={() => setIncludePII(!includePII)}
                />
                <label htmlFor="includePII" className="ml-2 block text-sm text-gray-700">
                  Include Sensitive Personally Identifiable Information (PII) while exporting.
                </label>
              </div>
            </div>

            {/* Password Protection */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                File Protection Password
              </label>
              <input
                type="password"
                id="password"
                className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Note */}
            <div className="mt-4 text-sm text-gray-600">
              <p>
                Note: You can export only the first 25,000 rows. If you have more rows, please initiate a backup for the
                data in your Zoho Books organization, and download it.{' '}
                <a href="#" className="text-blue-500 hover:underline">
                  Backup Your Data
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded mr-2 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded hover:bg-blue-600"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
}