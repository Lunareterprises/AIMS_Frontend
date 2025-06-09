import React, { useState } from 'react';
import { Upload, Globe, ChevronUp,Search, ChevronDown } from 'lucide-react';

function OtherDetails({ data, onChange }) {
  const [fileError, setFileError] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Non VAT Registered");
  const [searchTerm, setSearchTerm] = useState("");
  const [trn, setTrn] = useState('');
  const [trnError, setTrnError] = useState('');

  const labelClass = "w-1/3 text-sm font-medium text-gray-700";
  const fieldClass = "w-1/2 text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0";

  const [showMore, setShowMore] = useState(false);
  
  const MAX_FILES = 10;
  const MAX_FILE_SIZE_MB = 10;
  
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const totalFiles = uploadedFiles.length + newFiles.length;

    let error = '';
    if (totalFiles > MAX_FILES) {
      error = `You can upload a maximum of ${MAX_FILES} files.`;
    } else {
      const allFiles = [...uploadedFiles, ...newFiles];
      const validFiles = allFiles.filter(file => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024);

      if (validFiles.length !== allFiles.length) {
        error = `Each file must be smaller than ${MAX_FILE_SIZE_MB}MB.`;
      } else {
        setUploadedFiles(validFiles);
        onChange({ ...data, documents: validFiles });
      }
    }

    if (error) {
      setFileError(error);
    } else {
      setFileError('');
    }
  };

  const gulfCurrencies = [
    { code: "AED", name: "UAE Dirham" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "KWD", name: "Kuwaiti Dinar" },
    { code: "BHD", name: "Bahraini Dinar" },
    { code: "OMR", name: "Omani Rial" },
    { code: "QAR", name: "Qatari Riyal" }
  ];

  const languages = [
    { label: "English", value: "en" },
    { label: "Arabic", value: "ar" },
    { label: "Hindi", value: "hi" },
    { label: "Bengali", value: "bn" },
    { label: "Mandarin Chinese", value: "zh" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Russian", value: "ru" },
    { label: "Portuguese", value: "pt" },
    { label: "Turkish", value: "tr" },
    { label: "Urdu", value: "ur" },
    { label: "Persian", value: "fa" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Malayalam", value: "ms" },
    { label: "Tamil", value: "ta" },
    { label: "Telugu", value: "te" },
    { label: "Punjabi", value: "pa" },
    { label: "Italian", value: "it" }
  ];
    const uaePlaces = [
      "Abu Dhabi",
      "Dubai",
      "Sharjah",
      "Ajman",
      "Umm Al Quwain",
      "Ras Al Khaimah",
      "Fujairah"
    ];


  const options = [
      {
        label: 'VAT Registered',
        value: 'vat_registered',
        description: 'A business that is registered for VAT and is located in the U.A.E.',
      },
      {
        label: 'Non VAT Registered',
        value: 'non_vat_registered',
        description: 'A business that is not registered for VAT and is located in the U.A.E.',
      },
      {
        label: 'VAT Registered - Designated Zone',
        value: 'vat_registered_designated_zone',
        description: 'A business that is registered for VAT and is located in a designated zone within the U.A.E.',
      },
      {
        label: 'Non VAT Registered - Designated Zone',
        value: 'non_vat_registered_designated_zone',
        description: 'A business that isn’t registered for VAT and is located in a designated zone within the U.A.E.',
      },
    ];

    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Tax Treatment*</label>
        <div className="w-1/2 relative">
          {/* Dropdown Header */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-2 flex text-sm items-center justify-between border border-gray-300 rounded"
          >
            <span className="text-gray-700 font-medium">{selectedOption}</span>
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-blue-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {/* Floating Dropdown Content */}
          {isOpen && (
            <div className="absolute top-full left-0 w-full z-50 bg-white border border-gray-200 rounded shadow-lg mt-1">
              {/* Search Bar */}
              <div className="p-3 border-b border-gray-100">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Options List */}
              <div className="max-h-80 overflow-y-auto">
                {filteredOptions.map((option) => (
                  <div
                    key={option.label}
                    onClick={() => {
                      setSelectedOption(option.label);
                      setIsOpen(false);
                      setTrn('');       // reset TRN when changing option
                      setTrnError('');  // reset error
                    }}
                    className={`p-4 cursor-pointer hover:bg-blue-100 transition-colors text-gray-700`}
                  >
                    <div className="font-medium mb-1">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </div>
                ))}
              </div>

              {/* Scroll Indicator */}
              <div className="flex justify-center py-2 border-t border-gray-100">
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          )}
        </div>

      </div>


      {(selectedOption === 'VAT Registered' || selectedOption === 'VAT Registered - Designated Zone') && (
          <div className="flex items-start gap-x-4">
            <label className={`${labelClass} text-red-600`}>Tax Registration<br />Number (TRN)*</label>
            <div className="w-1/2">
              <input
                type="text"
                value={trn}
                onChange={(e) => {
                  const value = e.target.value;
                  setTrn(value);
                  // Validate on change
                  if (!/^\d{15}$/.test(value)) {
                    setTrnError("Enter your customer's 15-digit TRN.");
                  } else {
                    setTrnError('');
                  }
                }}
                className={`w-full text-sm px-3 py-2 border rounded focus:outline-none ${trnError ? 'border-red-500 text-red-700' : 'border-gray-300'}`}
                placeholder="Enter 15-digit TRN"
              />
              {trnError && (
                <div className="text-red-600 text-sm mt-1 flex items-center gap-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>
                  <span>{trnError}</span>
                </div>
              )}
              <a href="https://tax.gov.ae/en/default.aspx" target="_blank"  rel="noopener noreferrer" className="text-blue-600 text-sm mt-1 inline-block">Validate TRN <span className="text-blue-500">?</span></a>
            </div>
          </div>
        )}


      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Place of Supply*</label>
        <select
          className={fieldClass}
          value={data.placeOfSupply}
          onChange={(e) => onChange({ ...data, placeOfSupply: e.target.value })}
        >
          <option value="">Select place of supply</option>
          {uaePlaces.map((place) => (
            <option key={place} value={place}>
              {place}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
      </div>


      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Currency</label>
        <select
          className={fieldClass}
          value={data.currency}
          onChange={(e) => onChange({ ...data, currency: e.target.value })}
        >
          <option value="">Select currency</option>
          {gulfCurrencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Account Receivable</label>
        <input
          type="text"
          className={fieldClass}
          value={data.accountReceivable}
          onChange={(e) => onChange({ ...data, accountReceivable: e.target.value })}
        />
      </div>

      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Opening Balance</label>
        <input
          type="number"
          className={fieldClass}
          value={data.openingBalance}
          onChange={(e) => onChange({ ...data, openingBalance: e.target.value })}
        />
      </div>

      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Payment Terms</label>
        <input
          type="text"
          className={fieldClass}
          value={data.paymentTerms}
          onChange={(e) => onChange({ ...data, paymentTerms: e.target.value })}
        />
      </div>

      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Enable Portal?</label>
        <input
          type="checkbox"
          className="rounded"
          checked={data.enablePortal}
          onChange={(e) => onChange({ ...data, enablePortal: e.target.checked })}
        />
      </div>

      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Portal Language</label>
        <select
          className={fieldClass}
          value={data.portalLanguage}
          onChange={(e) => onChange({ ...data, portalLanguage: e.target.value })}
        >
          <option value="">Select language</option>
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Documents</label>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center w-1/2">
          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <label className="text-blue-600 hover:text-blue-800 cursor-pointer inline-block">
            Upload File(s)
            <input
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
            />
          </label>
          <p className="text-xs text-gray-500 mt-1">
            You can upload a maximum of 10 files, 10MB each
          </p>

          {fileError && (
            <p className="text-sm text-red-600 mt-2">{fileError}</p>
          )}

          {uploadedFiles.length > 0 && (
            <ul className="mt-2 text-left text-sm text-green-700 list-disc list-inside">
              {uploadedFiles.map((file, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  {file.name}
                  <button
                    type="button"
                    className="text-red-600 ml-2 text-xs"
                    onClick={() => {
                      const updatedFiles = uploadedFiles.filter((_, i) => i !== idx);
                      setUploadedFiles(updatedFiles);
                      onChange({ ...data, documents: updatedFiles });
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

        </div>
      </div>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setShowMore(!showMore);
        }}
        className="text-blue-600"
      >
        {showMore ? 'Hide details' : 'Add more details'}
      </a>

      {showMore && (
        <>
          <div className="flex items-center gap-x-4">
            <label className={labelClass}>Website URL</label>
            <div className="relative w-1/2">
              <Globe className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="url"
                className="w-full pl-10 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0"
                value={data.website}
                onChange={(e) => onChange({ ...data, website: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center gap-x-4">
            <label className={labelClass}>Department</label>
            <input
              type="text"
              className={fieldClass}
              value={data.department}
              onChange={(e) => onChange({ ...data, department: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-x-4">
            <label className={labelClass}>Designation</label>
            <input
              type="text"
              className={fieldClass}
              value={data.designation}
              onChange={(e) => onChange({ ...data, designation: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-x-4">
            <label className={labelClass}>Twitter</label>
            <input
              type="url"
              className={fieldClass}
              value={data.twitter}
              onChange={(e) => onChange({ ...data, twitter: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-x-4">
            <label className={labelClass}>Skype</label>
            <input
              type="url"
              className={fieldClass}
              value={data.skype}
              onChange={(e) => onChange({ ...data, skype: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-x-4">
            <label className={labelClass}>Facebook</label>
            <input
              type="url"
              className={fieldClass}
              value={data.facebook}
              onChange={(e) => onChange({ ...data, facebook: e.target.value })}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default OtherDetails;
