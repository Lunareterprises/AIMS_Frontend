import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Country, State } from 'country-state-city';



const AddressTab = ({ billing, setBilling, shipping, setShipping }) => {

  const [countries, setCountries] = useState([]);


  useEffect(() => {
    const countryOptions = Country.getAllCountries().map((c) => ({
      label: c.name,
      value: c.isoCode,
    }));
    setCountries(countryOptions);
  }, []);

  const getStates = (countryCode) => {
    return State.getStatesOfCountry(countryCode).map((s) => ({
      label: s.name,
      value: s.isoCode,
    }));
  };

  const handleBillingChange = (field, value) => {
    const updated = { ...billing, [field]: value };
    if (field === 'country') updated.state = null;
    setBilling(updated);
  };
  const handleChange = (type, field, value) => {
    const updated = { ...data[type], [field]: value };
    if (field === 'country') updated.state = null;
    onChange(type, updated);
  };

  const handleShippingChange = (field, value) => {
    const updated = { ...shipping, [field]: value };
    if (field === 'country') updated.state = null;
    setShipping(updated);
  };

  const copyBillingToShipping = () => {
    setShipping({ ...billing });
  };

  const renderAddressFields = (data, onChange, isBilling = true) => (
    <>
      <div className="flex flex-col gap-4">
        {[
          ['Attention', 'attention'],
          ['Address', 'address1'],
          ['Address Line 2', 'address2'],
          ['City', 'city'],
          ['ZIP Code', 'zip'],
          ['Phone', 'phone'],
          ['Fax Number', 'fax'],
        ].map(([label, key]) => (
          <div key={key} className="flex items-center gap-4">
            <label className="w-40 text-sm font-medium text-gray-700">{label}</label>
            <input
              type="text"
              value={data[key]}
              onChange={(e) => onChange(key, e.target.value)}
              className="w-full border text-sm border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0"
            />
          </div>
        ))}

        <div className="flex items-center gap-4">
          <label className="w-40 text-sm font-medium text-gray-700">Country/Region</label>
          <div className="w-full text-sm">
            <Select
              value={data.country}
              options={countries}
              onChange={(val) => onChange('country', val)}
              placeholder="Select or type to add"
              isSearchable
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-40 text-sm font-medium text-gray-700">State</label>
          <div className="w-full text-sm">
            <Select
              value={data.state}
              options={data.country ? getStates(data.country.value) : []}
              onChange={(val) => onChange('state', val)}
              placeholder="Select or type to add"
              isSearchable
            />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-12">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h3>
          {renderAddressFields(billing, handleBillingChange)}
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Shipping Address</h3>
            <button
              onClick={copyBillingToShipping}
              className="text-sm text-blue-600 hover:underline flex items-center"
            >
              ⬇ Copy billing address
            </button>
          </div>
          {renderAddressFields(shipping, handleShippingChange, false)}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800 font-semibold">Note:</p>
        <ul className="list-disc ml-5 text-sm text-blue-800 mt-1 space-y-1">
          <li>Add and manage additional addresses from this Customers and Vendors details section.</li>
          <li>
            You can customize how customers' addresses are displayed in transaction PDFs. Go to Settings →
            Preferences → Customers and Vendors → Address Format sections.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AddressTab;
