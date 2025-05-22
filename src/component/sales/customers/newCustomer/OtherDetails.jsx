import React, { useState } from 'react';
import { Upload, Globe, MessageSquare, Currency } from 'lucide-react';

function OtherDetails() {
  const labelClass = "w-1/3 text-sm font-medium text-gray-700";
  const fieldClass = "w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0 ";
  const [showMore, setShowMore] = useState(false);
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
  { label: "Persian (Farsi)", value: "fa" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Malay", value: "ms" },
  { label: "Tamil", value: "ta" },
  { label: "Telugu", value: "te" },
  { label: "Punjabi", value: "pa" },
  { label: "Italian", value: "it" }
];

  return (
    <div className="flex flex-col space-y-4">

      {/* Row Example */}
      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Tax Treatment*</label>
        <select className={fieldClass}>
          <option value="">Select tax treatment</option>
        </select>
      </div>

      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Place of Supply*</label>
        <select className={fieldClass}>
          <option value="">Select place of supply</option>
          
        </select>
      </div>

      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Currency</label>
        <select className={fieldClass}>
          {gulfCurrencies.map((currency)=>(
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Account Receivable</label>
        <select className={fieldClass}>
          <option value="">Select an account</option>
        </select>
      </div>

      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Opening Balance</label>
        <input type="text" placeholder="AED" className={fieldClass} />
      </div>

      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Payment Terms</label>
        <select className={fieldClass}>
          <option value="">Due on Receipt</option>
        </select>
      </div>

      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Enable Portal?</label>
        <input type="checkbox" id="enablePortal" className="rounded" />
        <label htmlFor="enablePortal" className="text-sm text-gray-700">Allow portal access for this customer</label>
      </div>

      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Portal Language</label>
        <select className={fieldClass}>
          <option value="">Select language</option>
          {languages.map(lang => (
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
          
          {/* Custom styled file upload */}
          <label className="text-blue-600 hover:text-blue-800 cursor-pointer inline-block">
            Upload File
            <input type="file" className="hidden" />
          </label>

          <p className="text-xs text-gray-500 mt-1">
            You can upload a maximum of 10 files, 10MB each
          </p>
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
        {/* Custom Icon Inputs */}
        <div className="flex items-center gap-x-4">
          <label className={labelClass}>Website URL</label>
          <div className="relative w-1/2">
            <Globe className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="url"
              placeholder="e.g. www.zyxker.com"
              className="w-full pl-10 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0"
            />
          </div>
        </div>
        <div className="flex items-center gap-x-4">
        <label className={labelClass}>Department</label>
        <input type="text" className={fieldClass} />
      </div>

      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Designation</label>
        <input type="text" className={fieldClass} />
      </div>

      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Twitter</label>
        <div className="relative w-1/2">
          <span className="absolute left-3 top-2.5 text-gray-400">X</span>
          <input
            type="url"
            placeholder="http://www.twitter.com"
            className="w-full pl-10 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Skype</label>
        <div className="relative w-1/2">
          <MessageSquare className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="url"
            // placeholder="http://www.twitter.com"
            className="w-full pl-10 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      <div className="flex items-center gap-x-4">
        <label className={labelClass}>Facebook</label>
        <div className="relative w-1/2">
          <div className="absolute left-3 top-2.5 w-4 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center">f</div>
          <input
            type="url"
            placeholder="http://www.facebook.com"
            className="w-full pl-10 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0"
          />
        </div>
      </div>

        </>
      )}
      


      

      
    </div>
  );
}

export default OtherDetails;
