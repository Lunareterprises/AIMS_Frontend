import React, { useState } from 'react';
import { Info, ChevronDown } from 'lucide-react';
import PLACEHOLDER_OPTIONS from '../../../../public/data/placeholder-options.json'; // Adjust the path as needed

export default function GeneralSettings({
  enableVendorNumbers,
  setEnableVendorNumbers,
  enableCustomerNumbers,
  setEnableCustomerNumbers,
  enableCreditLimit,
  setEnableCreditLimit,
  enableMultiCurrency,
  setEnableMultiCurrency,
  customerType,
  setCustomerType
}) {
  const [billingAddress, setBillingAddress] = useState(`$[CONTACT_NAME]
$[CONTACT_ADDRESS]
$[CONTACT_CITY], $[CONTACT_STATE]
$[CONTACT_COUNTRY]
$[CONTACT_ZIP]
$[CONTACT_PHONE]`);

const [shippingAddress, setShippingAddress] = useState(`$[CONTACT_NAME]
$[CONTACT_ADDRESS]
$[CONTACT_CITY]
$[CONTACT_STATE]
$[CONTACT_COUNTRY]
$[CONTACT_ZIP]`);

  const handleInsertPlaceholder = (e) => {
    const value = e.target.value;
    if (value) {
      setBillingAddress(prev => `${value}\n${prev}`);
    }
    e.target.selectedIndex = 0;
  };

  const handleInsertShippingPlaceholder = (e) => {
    const value = e.target.value;
    if (value) {
      setShippingAddress(prev => `${value}\n${prev}`);
    }
    e.target.selectedIndex = 0;
  };

  return (
    <div className="bg-white min-h-screen p-2 text-gray-700 text-sm">
      {/* Allow duplicates */}
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <input type="checkbox" id="allow-duplicates" />
          <label htmlFor="allow-duplicates" className="text-sm text-gray-700">
            Allow duplicates for customer and vendor display name.
          </label>
        </div>
        <hr className="mt-6 border-gray-300" />
      </div>

      {/* Customer & Vendor Numbers */}
      <div className="mb-4 flex flex-col gap-2">
        <h2 className="font-semibold text-sm mb-1">Customer & Vendor Numbers</h2>
        <p className="text-gray-400 text-sm mb-2">
          Generate customer and vendor numbers automatically. You can configure the series in which numbers are generated while creating new records.
        </p>
        <div className="flex items-center mb-1">
          <input
            type="checkbox"
            id="enable-customer"
            className="mr-2"
            checked={enableCustomerNumbers}
            onChange={() => setEnableCustomerNumbers(!enableCustomerNumbers)}
          />
          <label htmlFor="enable-customer" className="text-sm">Enable Customer Numbers</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enable-vendor"
            className="mr-2"
            checked={enableVendorNumbers}
            onChange={() => setEnableVendorNumbers(!enableVendorNumbers)}
          />
          <label htmlFor="enable-vendor" className="text-sm">Enable Vendor Numbers</label>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-yellow-50 p-2 mb-4">
        <div className="flex">
          <div className="mr-2">
            <Info size={16} className="text-yellow-500" />
          </div>
          <div className='flex flex-col gap-2'>
            <p className="font-semibold text-sm mb-1">Notes:</p>
            <ul className="text-sm list-disc pl-5 leading-relaxed">
              <li>
                Auto-generated numbers can take a few minutes to a few hours, depending on the number of records that you have. The Customer and Vendor Number field will be available once the process is done.
              </li>
              <li>
                Once you've enabled this feature, you cannot disable it.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="mt-6 border-gray-300" />

      {/* Default Customer Type */}
      <div className="mb-4 mt-6">
        <h2 className="font-semibold text-sm mb-1">Default Customer Type</h2>
        <p className="text-sm text-gray-400 mb-2 w-3/4">
          Select the default customer type based on the kind of customers you usually sell your products or services to.
        </p>
        <div className="flex flex-col gap-2">
          <label className="flex items-center text-sm text-gray-700">
            <input
              type="radio"
              name="customerType"
              value="individual"
              checked={customerType === 'individual'}
              onChange={() => setCustomerType('individual')}
              className="mr-2"
            />
            Individual
          </label>
          <label className="flex items-center text-sm text-gray-700">
            <input
              type="radio"
              name="customerType"
              value="business"
              checked={customerType === 'business'}
              onChange={() => setCustomerType('business')}
              className="mr-2"
            />
            Business
          </label>
        </div>
        <hr className="mt-6 border-gray-300" />
      </div>

      {/* Credit Limit */}
      <div className="mb-4">
        <h2 className="font-semibold text-sm mb-1">Customer Credit Limit</h2>
        <p className="text-sm text-gray-400 mb-2">
          Credit Limit enables you to set a limit on the outstanding receivable amount of the customers.
        </p>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enable-credit"
            className="mr-2"
            checked={enableCreditLimit}
            onChange={() => setEnableCreditLimit(!enableCreditLimit)}
          />
          <label htmlFor="enable-credit" className="text-sm">Enable Credit Limit</label>
        </div>
        <hr className="mt-6 border-gray-300" />
      </div>

      {/* Multi-Currency */}
      <div className="mb-4">
        <div className='flex justify-between'>
          <h2 className="font-semibold text-sm mb-1">Multi-currency Transactions for Each Contact</h2>
          <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-3">{enableMultiCurrency ? 'Enabled' : 'Disabled'}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={enableMultiCurrency}
                onChange={() => setEnableMultiCurrency(!enableMultiCurrency)}
              />
              <div className="w-11 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>
        </div>
        <p className="text-sm text-gray-400 mb-2 w-3/4">
          Create sales and purchase transactions in multiple currencies.
        </p>
        <hr className="mt-6 border-gray-300" />
      </div>

      {/* Billing Address Format */}
      <div className="mb-4 w-3/4">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-semibold text-sm">Customer and Vendor Billing Address Format</h2>
          <div className="text-sm text-gray-500">
            (Displayed in PDF only)
            <Info size={14} className="inline-block ml-1 text-gray-400" />
          </div>
        </div>
        <div className="mb-2">
          <select
            onChange={handleInsertPlaceholder}
            className="w-full border bg-gray-100  border-gray-300 rounded px-2 py-2 text-sm"
          >
            <option value="" disabled>Insert Placeholders</option>
            {PLACEHOLDER_OPTIONS.map((opt, idx) =>
              opt.isHeader ? (
                <option key={idx} disabled>{opt.label}</option>
              ) : (
                <option key={idx} value={opt.value}>{opt.label}</option>
              )
            )}
          </select>
        </div>
        <textarea
          className="border border-gray-300 rounded w-full h-52 p-2 text-sm -mt-2"
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
        />
      </div>

{/* Shipping Address Format */}
      <div className="mb-4 w-3/4">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-semibold text-sm">Customer and Vendor Shipping Address Format</h2>
          <div className="text-sm text-gray-500">
            (Displayed in PDF only)
            <Info size={14} className="inline-block ml-1 text-gray-400" />
          </div>
        </div>
        <div className="mb-2">
          <select
            onChange={handleInsertShippingPlaceholder}
            className="w-full border bg-gray-100 border-gray-300 rounded px-2 py-2 text-sm"
          >
            <option value="" disabled>Insert Placeholders</option>
            {PLACEHOLDER_OPTIONS.map((opt, idx) =>
              opt.isHeader ? (
                <option key={idx} disabled>{opt.label}</option>
              ) : (
                <option key={idx} value={opt.value}>{opt.label}</option>
              )
            )}
          </select>
        </div>
        <textarea
          className="border border-gray-300 rounded w-full h-52 p-2 text-sm -mt-2"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm">Save</button>
      </div>

    
    </div>
  );
}
