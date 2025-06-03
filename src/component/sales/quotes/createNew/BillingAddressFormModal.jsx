import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import CommonButton from '../../../CommonUI/buttons/CommonButton';
import { Country, State } from 'country-state-city';

export default function BillingAddressFormModal({ isOpen, onClose, addressType = 'billing', onSave}) {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [states, setStates] = useState([]);

  const countries = Country.getAllCountries();

  useEffect(() => {
  if (selectedCountry) {
    const fetchedStates = State.getStatesOfCountry(selectedCountry);
    setStates(fetchedStates);
  } else {
    setStates([]);
    setSelectedState('');
  }
}, [selectedCountry]);

  const handleSave = () => {
    const addressData = {
      country: selectedCountry,
      state: selectedState,
      // Add other form fields here
    };
    onSave(addressData); // Use dynamic callback
    onClose(); // Close modal
  };





 

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl relative shadow-xl h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-200">
          <h2 className="text-lg font-medium text-gray-900">{addressType === 'billing' ? 'Billing Address' : 'Shipping Address'}</h2>
          <CommonButton
            label={<X size={20} />}
            className="text-red-500 hover:text-red-700"
            onClick={onClose}
          />
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6 overflow-auto flex-grow">
          {/* Attention */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Attention</label>
            <input
              type="text"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none"
              placeholder="Attention"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country/Region</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none "
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* Address Line 1 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
            <textarea
              rows={2}
              placeholder="Address Line 1"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md resize-none focus:outline-none "
            />
          </div>

          {/* Address Line 2 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
            <textarea
              rows={2}
              placeholder="Address Line 2"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md resize-none focus:outline-none "
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none"
              placeholder="City"
            />
          </div>

          {/* State and ZIP */}
          <div className="grid grid-cols-2 gap-4">
            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <select
                disabled={!selectedCountry}
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none "
              >
                <option value="">Select a state</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            {/* ZIP Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none"
                placeholder="ZIP Code"
              />
            </div>
          </div>

          {/* Phone and Fax */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none"
                placeholder="Phone"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fax Number</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none"
                placeholder="Fax Number"
              />
            </div>
          </div>

          {/* Note */}
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Note:</span> Changes made here will be updated for this customer.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 bg-gray-50 rounded-b-lg">
          <CommonButton
            label="Cancel"
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md"
          />
          <CommonButton
            label="Save"
            type="submit"
            onClick={handleSave}
            className="px-4 py-2 text-white bg-blue-500 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
