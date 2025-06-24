import { useState, useEffect } from 'react';
import { X, Info, ChevronDown, Check } from 'lucide-react';
import CommonButton from '../../../../CommonUI/buttons/CommonButton';

export default function ExportCustomersModal({ onClose, defaultModule }) {
  const [module] = useState('Customers');
  const [dropdownSelection, setDropdownSelection] = useState(defaultModule);
  const [moduleOption, setModuleOption] = useState(defaultModule);
  const [exportType, setExportType] = useState('All Customers');
  const [decimalFormat] = useState('12345678.9');
  const [fileFormat, setFileFormat] = useState('CSV');
  const [includePII, setIncludePII] = useState(false);
  const [password, setPassword] = useState('');
  const [modules, setModules] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  // New states for date fields
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetch('/data/modules.json')
      .then((res) => res.json())
      .then((data) => setModules(data))
      .catch((err) => console.error('Failed to load modules.json', err));
  }, []);

  const filteredModules = modules
    .map(group => ({
      main: group.main,
      subs: group.subs.filter(sub =>
        sub.toLowerCase().includes(search.toLowerCase())
      )
    }))
    .filter(group => group.subs.length > 0);

  const handleExport = () => {
    console.log({
      module,
      dropdownSelection,
      moduleOption,
      exportType,
      startDate, // included date fields
      endDate,
      decimalFormat,
      fileFormat,
      includePII,
      password
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="bg-white rounded w-full max-w-2xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center py-3 px-4 bg-gray-100">
          <h2 className="text-base font-medium text-gray-800">Export {defaultModule}</h2>
          <CommonButton label={<X size={18} />} onClick={onClose} className="text-red-600 hover:text-gray-700" />
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto flex-1">
          <div className="bg-blue-50 p-3 rounded mb-5 flex items-start">
            <Info className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
            <span className="text-sm text-gray-600">
              You can export your data from zeluna in CSV, XLS or XLSX format.
            </span>
          </div>

          <div className="space-y-5 text-sm">
            {/* Module Dropdown */}
            <div>
              <label className="block text-sm text-red-500 mb-2">Module*</label>
              <div className="relative w-1/2">
                <div className="relative w-full max-w-md">
                  <button
                    onClick={() => setOpen(prev => !prev)}
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-white flex justify-between items-center text-sm"
                  >
                    {dropdownSelection || 'Select Module'}
                    <ChevronDown size={16} />
                  </button>

                  {open && (
                    <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-64 overflow-y-auto">
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-3 py-2 text-sm border-b border-gray-200 focus:outline-none"
                        placeholder="Search modules..."
                      />

                      {filteredModules.map(group => (
                        <div key={group.main} className="px-3 py-2">
                          <div className="text-gray-800 text-sm font-semibold mb-1">{group.main}</div>
                          <div className="space-y-1">
                            {group.subs.map(sub => (
                              <div
                                key={sub}
                                className={`flex items-center justify-between px-3 py-2 text-sm rounded cursor-pointer hover:bg-blue-50 ${
                                  dropdownSelection === sub ? 'bg-blue-100' : ''
                                }`}
                                onClick={() => {
                                  setDropdownSelection(sub);
                                  setOpen(false);
                                }}
                              >
                                <span>{sub}</span>
                                {dropdownSelection === sub && <Check size={16} className="text-blue-600" />}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Module Options (Radio Buttons) */}
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="customers"
                  type="radio"
                  name="moduleOption"
                  className="h-4 w-4 text-blue-600 border-gray-300"
                  checked={moduleOption === 'Customers'}
                  onChange={() => setModuleOption('Customers')}
                />
                <label htmlFor="customers" className="ml-2 block text-sm text-gray-700">
                  { defaultModule }
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="contactPersons"
                  type="radio"
                  name="moduleOption"
                  className="h-4 w-4 text-blue-600 border-gray-300"
                  checked={moduleOption === "Customer's Contact Persons"}
                  onChange={() => setModuleOption("Customer's Contact Persons")}
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
                  className="h-4 w-4 text-blue-600 border-gray-300"
                  checked={moduleOption === "Customer's Addresses"}
                  onChange={() => setModuleOption("Customer's Addresses")}
                />
                <label htmlFor="addresses" className="ml-2 block text-sm text-gray-700">
                  Customer's Addresses
                </label>
              </div>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            {/* Export Type */}
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="allCustomers"
                  type="radio"
                  name="exportType"
                  className="h-4 w-4 text-blue-600 border-gray-300"
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
                  className="h-4 w-4 text-blue-600 border-gray-300"
                  checked={exportType === 'Specific Period'}
                  onChange={() => setExportType('Specific Period')}
                />
                <label htmlFor="specificPeriod" className="ml-2 block text-sm text-gray-700">
                  Specific Period
                </label>
              </div>
            </div>

            {/* Conditional Rendering for Date Fields */}
            {exportType === 'Specific Period' && (
              <div className="space-x-4 flex">
                <div>
                  <label className="block text-xs text-gray-500 mb-2">Start Date*</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="block  border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-2">End Date*</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="block  border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Decimal Format */}
            <div>
              <label className="block text-sm text-red-500 mb-2">Decimal Format*</label>
              <div className="relative w-1/2">
                <select
                  className="block  w-full border border-gray-300 rounded py-2 px-3 text-gray-700 bg-white appearance-none focus:outline-none"
                  defaultValue="12345678.9"
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
            <div>
              <label className="block text-sm text-red-500 mb-2">Export File Format*</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="csv"
                    type="radio"
                    name="fileFormat"
                    className="h-4 w-4 text-blue-600 border-gray-300"
                    checked={fileFormat === 'CSV'}
                    onChange={() => setFileFormat('CSV')}
                  />
                  <label htmlFor="csv" className="ml-2 block text-sm text-gray-700">
                    CSV (Comma Separated Value)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="xls"
                    type="radio"
                    name="fileFormat"
                    className="h-4 w-4 text-blue-600 border-gray-300"
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
                    className="h-4 w-4 text-blue-600 border-gray-300"
                    checked={fileFormat === 'XLSX'}
                    onChange={() => setFileFormat('XLSX')}
                  />
                  <label htmlFor="xlsx" className="ml-2 block text-sm text-gray-700">
                    XLSX (Microsoft Excel)
                  </label>
                </div>
              </div>
            </div>

            {/* PII Checkbox */}
            <div>
              <div className="flex items-center">
                <input
                  id="includePII"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  checked={includePII}
                  onChange={() => setIncludePII(!includePII)}
                />
                <label htmlFor="includePII" className="ml-2 block text-sm text-gray-700">
                  Include Sensitive Personally Identifiable Information (PII) while exporting.
                </label>
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                File Protection Password
              </label>
              <input
                type="password"
                id="password"
                className="block w-1/2 border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Note */}
            <div className="text-sm text-gray-600 pt-2">
              <p>
                Note: You can export only the first 25,000 rows. If you have more rows, please initiate a backup for the
                data in your  Books organization, and download it.{' '}
                <a href="#" className="text-blue-500 hover:underline">
                  Backup Your Data
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 bg-gray-50">
          <CommonButton
            label="Cancel"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded mr-3 hover:bg-gray-50"
          />
            
         
          <CommonButton
            label="Export"
            onClick={handleExport}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded hover:bg-blue-600"
          />
            
          
        </div>
      </div>
    </div>
  );
}
