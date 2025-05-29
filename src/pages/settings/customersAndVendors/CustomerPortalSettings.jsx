import { useState } from 'react';

export default function CustomerPortalSettings() {
  const [contactType, setContactType] = useState('All');
  const [location, setLocation] = useState('All');

  const contactTypeOptions = ['All', 'Customers', 'Vendors'];
  const locationOptions = [
    'All',
    'Details Page Menu',
    'List Page - Action Menu',
    'List Page - Bulk Action Menu',
  ];

  return (
    <div className="w-full bg-white text-sm">
      <div className="p-4 ">
        <div className="flex items-center gap-4">
          {/* Contact Type Select */}
          <div className="flex items-center gap-2">
            <label htmlFor="contactType" className="font-medium text-gray-700">
              Contact Type:
            </label>
            <select
              id="contactType"
              value={contactType}
              onChange={(e) => setContactType(e.target.value)}
              className="px-4 py-2 border border-gray-400 rounded-md bg-white text-gray-800 w-48"
            >
              {contactTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Location Select */}
          <div className="flex items-center gap-2">
            <label htmlFor="location" className="font-medium text-gray-700">
              Location:
            </label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-4 py-2 border border-gray-400 rounded-md bg-white text-gray-800 w-60"
            >
              {locationOptions.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="w-full">
        <table className="w-full border-b border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 text-left text-blue-500 font-medium text-sm">BUTTON NAME</th>
              <th className="py-3 px-4 text-left text-blue-500 font-medium text-sm">ACCESS PERMISSION</th>
              <th className="py-3 px-4 text-left text-blue-500 font-medium text-sm">CONTACT TYPE</th>
              <th className="py-3 px-4 text-left text-blue-500 font-medium text-sm">LOCATION</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows would go here */}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-20 text-gray-500">
        Create buttons which perform actions set by you. What are you waiting for!
      </div>
    </div>
  );
}
