import React, { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';

export default function FieldMappingPage({ file, headers = [], onValidationChange, importType }) {
  console.log('====================================');
  console.log("importType---------->",importType);
  console.log('====================================');
  const [zohoFields, setZohoFields] = useState({
    contactDetails: [],
    taxDetails: [],
    itemDetails: [],
    contactPersonDetails:[],
  });

  const [mapping, setMapping] = useState({});
  useEffect(() => {
    const jsonPath =
      importType === 'contacts'
        ? '/data/contactPersonImportFields.json'
        : '/data/customerImportFields.json';
  
    fetch(jsonPath)
      .then(res => res.json())
      .then(data => {
        if (importType === 'contacts') {
          setZohoFields({
            contactPersonDetails: data.contactPersonDetails || []
          });
        } else {
          setZohoFields({
            contactDetails: data.contactDetails || [],
            taxDetails: data.taxDetails || [],
            itemDetails: data.itemDetails || []
          });
        }
      })
      .catch(err => {
        console.error('Error loading Zoho fields:', err);
      });
  }, [importType]);
  

  useEffect(() => {
    const isValid = mapping['Display Name'] && mapping['Display Name'] !== '';
    onValidationChange?.(isValid);
  }, [mapping, onValidationChange]);

  const handleMappingChange = (field, value) => {
    setMapping(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderFieldRows = (fields, section) =>
    fields.map((field, index) => (
      <div key={`${section}-${index}`} className="flex flex-row items-center">
        <div className="py-1 px-4 w-60">
          <label className={`block text-sm font-medium ${field === "Display Name" ? "text-red-600" : "text-gray-900"}`}>
            {field === "Display Name" ? "Display Name*" : field}
          </label>
        </div>
        <div className="p-2">
          
            <select className="px-2 py-2 border border-gray-300 rounded-md w-64 text-sm cursor-pointer focus:outline-none focus:ring-0 focus:ring-gray-300 focus:border-gray-300"
                value={mapping[field] || ''}
                onChange={(e) => handleMappingChange(field, e.target.value)}
             >
            <option value="" disabled>Select</option>
            {headers.map((header, i) => (
              <option key={i} value={header}>{header}</option>
            ))}
          </select>
        </div>
      </div>
    ));

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-4">
        <p className="text-gray-800 text-sm font-medium">
          Your Selected File: <span className="font-bold">{file?.name}</span>
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <div className="flex items-start">
          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">i</div>
          <div className="ml-3">
            <p className="text-xs text-gray-700">The best match to each field on the selected file has been auto-selected.</p>
          </div>
        </div>
      </div>

      {/* Only for customers */}
      {importType !== 'contacts' && (
        <>
          {/* Default Formats */}
          <div className="bg-[#f9f9fb] rounded-md mb-8">
            <div className="flex items-center justify-between px-4 py-3">
              <h2 className="text-base font-semibold text-gray-800">Default Data Formats</h2>
              <button className="flex items-center text-base">
                <FaPen className="text-blue-500" />
                <span className="ml-2 text-sm text-gray-800">Edit</span>
              </button>
            </div>
            <div className="p-4">
              <label className="block text-xs text-gray-500">Decimal Format</label>
              <div className="text-gray-900 mt-2">1234567.89</div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white rounded-md mb-8">
            <div className="px-4 py-3 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">Contact Details</h2>
            </div>
            {renderFieldRows(zohoFields.contactDetails, 'contact')}
          </div>

          {/* Tax Details */}
          <div className="bg-white rounded-md mb-8">
            <div className="px-4 py-3 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">Tax Details</h2>
            </div>
            {renderFieldRows(zohoFields.taxDetails, 'tax')}
          </div>

          {/* Item Details */}
          <div className="bg-white rounded-md mb-8">
            <div className="px-4 py-3 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">Item Details</h2>
            </div>
            {renderFieldRows(zohoFields.itemDetails, 'item')}
          </div>
        </>
      )}

      {/* Only for contacts */}
      {importType === 'contacts' && (
        <div className="bg-white rounded-md mb-8">
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">Contact Person Details</h2>
          </div>
          {renderFieldRows(zohoFields.contactPersonDetails || [], 'contactPerson')}
        </div>
      )}



      <div className="p-4">
        <label className="flex items-center">
          <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
          <span className="ml-2 text-sm text-gray-700">Save these selections for future imports.</span>
        </label>
      </div>
    </div>
  );
}
