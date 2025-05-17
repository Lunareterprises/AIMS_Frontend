import { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Check, Search } from 'lucide-react';

export default function NewCustomButtonModal({ onClose }) {
  const [buttonName, setButtonName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Details Page Menu');
  const dropdownRef = useRef(null);

  const locations = [
    'Details Page Menu',
    'List Page - Action Menu',
    'List Page - Bulk Action Menu'
  ];

  const filteredLocations = locations.filter(loc =>
    loc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setIsDropdownOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
      <div className="bg-white rounded shadow-lg max-w-2xl w-full">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-800">New Custom Button - Customers</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="block mb-2 text-red-500 font-medium">Custom Button Name*</label>
            <input
              type="text"
              value={buttonName}
              onChange={(e) => setButtonName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-700 font-medium">Location</label>
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex justify-between items-center w-full px-3 py-2 border border-gray-300 rounded cursor-pointer"
                onClick={() => setIsDropdownOpen(prev => !prev)}
              >
                <span>{selectedLocation}</span>
                <ChevronDown size={18} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                  <div className="p-2">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <ul className="max-h-48 overflow-y-auto">
                    {filteredLocations.map((location) => (
                      <li
                        key={location}
                        className={`px-3 py-2 cursor-pointer hover:bg-blue-100 flex justify-between items-center ${location === selectedLocation ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => handleLocationSelect(location)}
                      >
                        <span>{location}</span>
                        {location === selectedLocation && <Check size={16} />}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* <div className="flex justify-end mt-2">
              <a href="#" className="text-blue-500 hover:text-blue-700">Preview</a>
            </div> */}
          </div>
        </div>

        <div className="flex justify-start p-4 space-x-2 border-t border-gray-200 bg-gray-50">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Proceed
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
