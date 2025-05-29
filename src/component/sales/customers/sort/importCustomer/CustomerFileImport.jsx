import React, { useState } from 'react';
import { Upload, ChevronDown, HelpCircle, Lightbulb,  ChevronUp, Search, Check } from 'lucide-react';
import Papa from 'papaparse';

function CustomerFileImport({ onFileUpload, importType }) {
  console.log("importType*******>>",importType);
  const [duplicateHandling, setDuplicateHandling] = useState('skip');
  const [encoding, setEncoding] = useState('UTF-8 (Unicode)');
  const [isEncodingOpen, setIsEncodingOpen] = useState(false);
  const [selectedFileAccound, SetselectedFileAccound] = useState(null);
  
  const [fileError, setFileError] = useState(null);
    const [amountColumnOpen, setAmountColumnOpen] = useState(false);
  const [characterEncodingOpen, setCharacterEncodingOpen] = useState(false);
  const [delimiterOpen, setDelimiterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedAmountColumn, setSelectedAmountColumn] = useState('Double Column');
  const [selectedEncoding, setSelectedEncoding] = useState('UTF-8 (Unicode)');
  const [selectedDelimiter, setSelectedDelimiter] = useState('Comma ( , )');


  const [isOpen, setIsOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('');

  const accounts = [
    {
      id: 1,
      name: 'A IM BUSINESS CORP FOR CORPORATE SERVICES PROVIDERS CO. L.L.C',
      type: 'Business Account',
      highlighted: false
    },
    {
      id: 2,
      name: 'Zoho Payroll - Bank Account',
      type: 'Bank Account',
      highlighted: false
    }
  ];

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAccountSelect = (account) => {
    setSelectedAccount(account.name);
    setIsOpen(false);
  };

  const amountColumnOptions = [
    {
      value: 'Double Column',
      label: 'Double Column',
      description: 'Your import file has separate amount columns for withdrawals and deposits.'
    },
    {
      value: 'Single Column and Amount Type',
      label: 'Single Column and Amount Type',
      description: 'Your import file has an amount column and another column indicating if it is a debit or a credit.'
    },
    {
      value: 'Single Column with Negative Values',
      label: 'Single Column with Negative Values',
      description: 'Your import file has a single amount column with negative values for withdrawals.'
    }
  ];

  const delimiterOptions = [
    { value: 'Comma ( , )', label: 'Comma ( , )' },
    { value: 'Semi-Colon ( ; )', label: 'Semi-Colon ( ; )' }
  ];

  const filteredAmountOptions = amountColumnOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDelimiterOptions = delimiterOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const allowedExtensions = ['csv', 'tsv', 'xls', 'xlsx'];

  const validateFile = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    return allowedExtensions.includes(extension);
  };

  const handleFile = (file) => {
    if (validateFile(file)) {
      SetselectedFileAccound(file);
      setFileError(null);
  
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        Papa.parse(csvData, {
          header: true,
          preview: 1, // Only read the first row
          complete: (results) => {
            const headers = results.meta.fields || [];
            if (onFileUpload) onFileUpload(file, headers); // Pass headers too
          },
        });
      };
      reader.readAsText(file);
    } else {
      SetselectedFileAccound(null);
      setFileError('Invalid file format. Only CSV, TSV, XLS, or XLSX files are allowed.');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="py-6 w-full max-w-3xl mx-auto">
      {/* for Import Statements  */}
      {importType == 'Import Statements' && (
          <div className="max-w-2xl">
            <div className="mb-6 flex  gap-8 items-center">
              <label className="block w-36 text-red-600 text-sm font-medium mb-2">
                Select an account*
              </label>
              
              <div className="relative text-sm">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-96 px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-0"                >
                  <span className={`${selectedAccount ? 'text-gray-900' : 'text-gray-800'}`}>
                    {selectedAccount || 'Choose your account for import'}
                  </span>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {isOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {/* Search Input */}
                    <div className="p-3 border-b border-gray-200">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    {/* Account Options */}
                    <div className="max-h-60 overflow-y-auto">
                      {filteredAccounts.map((account) => (
                        <button
                          key={account.id}
                          onClick={() => handleAccountSelect(account)}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ${
                            account.highlighted 
                              ? 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-0' 
                              : 'text-gray-900'
                          }`}
                        >
                          <div className="font-medium">
                            {account.name}
                          </div>
                          <div className={`text-sm mt-1 ${
                            account.highlighted ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {account.type}
                          </div>
                        </button>
                      ))}
                      
                      {filteredAccounts.length === 0 && (
                        <div className="px-4 py-6 text-center text-gray-500">
                          No accounts found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
      )}
      <div
        className="border-2 border-dashed bg-gray-100 border-gray-300 hover:border-blue-500 rounded-md p-6 flex flex-col items-center justify-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="w-8 h-8 mb-4 text-gray-400">
          <Upload size={32} className="w-full h-full" />
        </div>

        <p className="text-sm text-gray-600 mb-4">
          {selectedFileAccound ? selectedFileAccound.name : 'Drag and drop file to import'}
        </p>

        <label className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md text-sm flex items-center cursor-pointer">
          Choose File
          <ChevronDown size={16} className="ml-1" />
          <input
            type="file"
            className="hidden"
            accept=".csv,.tsv,.xls,.xlsx"
            onChange={handleFileSelect}
          />
        </label>

        {fileError && <p className="text-xs text-red-500 mt-2">{fileError}</p>}

        <p className="text-xs text-gray-500 mt-3">
          Maximum File Size: 25 MB • File Format: CSV or TSV or XLS
        </p>
      </div>

      {/* Sample Files */}
      <div className="mt-4 text-xs text-gray-600">
        Download a <a href="#" className="text-blue-500 hover:underline">sample csv file</a> or{' '}
        <a href="#" className="text-blue-500 hover:underline">sample xls file</a> and compare it to your import file.
      </div>

      {/* Duplicate Handling */}  
      {importType == 'customers' && (
        <div className="mt-10 flex flex-row gap-8">
          <div className="flex items-start mb-2">
            <span className="text-sm font-medium text-[#d6141d]">Duplicate Handling</span>
            <span className="text-[#d6141d] ml-1">*</span>
            <HelpCircle size={16} className="text-gray-400 ml-1" />
          </div>

          <div>
            {['skip', 'overwrite', 'add'].map((value) => (
              <label key={value} className="flex items-start mb-3">
                <input
                  type="radio"
                  name="duplicateHandling"
                  value={value}
                  checked={duplicateHandling === value}
                  onChange={() => setDuplicateHandling(value)}
                  className="mt-1"
                />
                <div className="ml-2">
                  <div className="text-sm capitalize">{value} Duplicates</div>
                  <div className="text-xs text-gray-500">
                    {value === 'skip'
                      ? 'Skips duplicates from import.'
                      : value === 'overwrite'
                      ? 'Overwrites existing customers.'
                      : 'Adds duplicates as new customers.'}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* for Import Statements  */}
      {importType == 'Import Statements' && (
        <div className="w-full max-w-2xl  mt-6 bg-white ">
          {/* Amount Column Type */}
          <div className="mb-6 flex gap-8 items-center">
            <label className="w-36 block text-sm font-medium text-gray-700 mb-2">
              Amount Column Type<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                onClick={() => setAmountColumnOpen(!amountColumnOpen)}
                className="w-96 text-sm px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-0"
              >
                <span className="text-gray-900 ">{selectedAmountColumn}</span>
                {amountColumnOpen ? (
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
              </button>
              
              {amountColumnOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  <div className="p-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {filteredAmountOptions.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => {
                          setSelectedAmountColumn(option.value);
                          setAmountColumnOpen(false);
                          setSearchTerm('');
                        }}
                        className={`px-3 py-3 cursor-pointer hover:bg-gray-50 ${
                          selectedAmountColumn === option.value ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-gray-900'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-medium">{option.label}</div>
                            <div className={`text-sm mt-1 ${
                              selectedAmountColumn === option.value ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {option.description}
                            </div>
                          </div>
                          {selectedAmountColumn === option.value && (
                            <Check className="h-4 w-4 text-white ml-2 flex-shrink-0 mt-0.5" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>



          {/* File Delimiter */}
          <div className="mb-6 flex gap-8 items-center">
            <label className=" w-36 flex items-center text-sm font-medium text-gray-700 mb-2">
              File Delimiter
              <HelpCircle className="h-4 w-4 text-gray-400 ml-1" />
            </label>
            <div className="relative">
              <button
                onClick={() => setDelimiterOpen(!delimiterOpen)}
                className="w-96 text-sm px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-0"
              >
                <span className="text-gray-900">{selectedDelimiter}</span>
                {delimiterOpen ? (
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
              </button>
              
              {delimiterOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  <div className="p-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {filteredDelimiterOptions.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => {
                          setSelectedDelimiter(option.value);
                          setDelimiterOpen(false);
                          setSearchTerm('');
                        }}
                        className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                          selectedDelimiter === option.value ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-gray-900'
                        } flex items-center justify-between`}
                      >
                        <span>{option.label}</span>
                        {selectedDelimiter === option.value && (
                          <Check className="h-4 w-4 text-white" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>          
        </div>
      )}
      {/* Character Encoding */}
      <div className="mt-10 flex flex-row w-full gap-8 items-center">
        <div className="flex items-center mb-2">
          <span className="text-sm font-medium text-gray-700 ">Character Encoding</span>
          <HelpCircle size={16} className="text-gray-400 ml-1" />
        </div>

        <div className="relative">
          <button
            type="button"
            className="relative w-96 bg-white border border-gray-300 rounded-md  pl-3 pr-10 py-2 text-left cursor-default sm:text-sm"
            onClick={() => setIsEncodingOpen(!isEncodingOpen)}
          >
            <span className="block truncate">{encoding}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown size={16} className="text-gray-400" />
            </span>
          </button>

          {isEncodingOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto sm:text-sm">
              {['UTF-8 (Unicode)', 'UTF-16', 'ASCII', 'ISO-8859-1'].map((option) => (
                <div
                  key={option}
                  className={`cursor-default select-none relative py-2 pl-3 pr-9 ${
                    encoding === option ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                  }`}
                  onClick={() => {
                    setEncoding(option);
                    setIsEncodingOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-6 bg-gray-100 p-4 rounded-md">
        <div className="flex items-center mb-3 text-sm font-medium">
          <Lightbulb size={16} className="text-yellow-500 mr-2" />
          Page Tips
        </div>

        <ul className="text-xs space-y-3">
          <li className="flex">
            <div className="mr-2">•</div>
            <div>
              Download the <a href="#" className="text-blue-500 hover:underline">sample xls file</a> to get info.
            </div>
          </li>
          <li className="flex">
            <div className="mr-2">•</div>
            <div>
              Convert other file formats to accepted types using online/offline converters.
            </div>
          </li>
          <li className="flex">
            <div className="mr-2">•</div>
            <div>
              Save your import settings for future use.
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CustomerFileImport;
