import React, { useState } from 'react';
import { Upload, Globe, MessageSquare } from 'lucide-react';

function OtherDetails({ data, onChange }) {
  const [fileError, setFileError] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

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

  const taxTreatmentOptions = [
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


  return (
    <div className="flex flex-col space-y-4">

      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Tax Treatment*</label>
        <select
          className={fieldClass}
          value={data.taxTreatment}
          onChange={(e) => onChange({ ...data, taxTreatment: e.target.value })}
        >
          <option value="">Select tax treatment</option>
          {taxTreatmentOptions.map((option) => (
            <option key={option.value} value={option.value}>
              <div className='flex flex-col'>
                <h1>{option.label}</h1>
                <br />
                <p>{option.description}</p>
              </div>
              {/* {option.label} - {option.description} */}
            </option>
          ))}
        </select>
      </div>


      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Place of Supply*</label>
        <select
          className={fieldClass}
          value={data.placeOfSupply}
          onChange={(e) => onChange({ ...data, placeOfSupply: e.target.value })}
        >
          <option value="">Select place of supply</option>
          <option value="UAE">UAE</option>
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
