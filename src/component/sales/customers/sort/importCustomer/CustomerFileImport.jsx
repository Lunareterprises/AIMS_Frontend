import React, { useState } from 'react';
import { Upload, ChevronDown, HelpCircle, Lightbulb } from 'lucide-react';
import Papa from 'papaparse';

function CustomerFileImport({ onFileUpload }) {
  const [duplicateHandling, setDuplicateHandling] = useState('skip');
  const [encoding, setEncoding] = useState('UTF-8 (Unicode)');
  const [isEncodingOpen, setIsEncodingOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  

  const allowedExtensions = ['csv', 'tsv', 'xls', 'xlsx'];

  const validateFile = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    return allowedExtensions.includes(extension);
  };

  const handleFile = (file) => {
    if (validateFile(file)) {
      setSelectedFile(file);
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
      setSelectedFile(null);
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
      <div
        className="border-2 border-dashed bg-gray-100 border-gray-300 hover:border-blue-500 rounded-md p-6 flex flex-col items-center justify-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="w-8 h-8 mb-4 text-gray-400">
          <Upload size={32} className="w-full h-full" />
        </div>

        <p className="text-sm text-gray-600 mb-4">
          {selectedFile ? selectedFile.name : 'Drag and drop file to import'}
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

      {/* Character Encoding */}
      <div className="mt-10 flex flex-row w-full gap-8">
        <div className="flex items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Character Encoding</span>
          <HelpCircle size={16} className="text-gray-400 ml-1" />
        </div>

        <div className="relative">
          <button
            type="button"
            className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default sm:text-sm"
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
