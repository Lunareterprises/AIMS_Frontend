import { useState } from "react";
import { ChevronDown, Check, Search } from "lucide-react";

export default function CustomLinkForm() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Details Page Menu");
  const [visibility, setVisibility] = useState("Only Me");
  const [searchQuery, setSearchQuery] = useState("");
  const [customLinkName, setCustomLinkName] = useState("");
  const [url, setUrl] = useState("https://www.example.com?contact_name=${CONTACT.CONTACT_NAME}");

  const locationOptions = [
    "Details Page Menu",
    "List Page - Action Menu",
    "List Page - Bulk Action Menu"
  ];

  const filteredOptions = locationOptions.filter(option => 
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectOption = (option) => {
    setSelectedLocation(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white border-t border-gray-200">
      <div className="p-5">
        <h1 className="text-2xl font-medium text-gray-800 mb-5">New Custom Link - Customers</h1>
        
        <div className="border-t border-gray-200 pt-5 w-1/2">
          <div className="mb-4 flex items-center">
            <label className="block text-sm font-medium text-red-600 mb-1 w-52">
              Custom Link Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={customLinkName}
              onChange={(e) => setCustomLinkName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 text-sm"
            />
          </div>
          
            <div className="mb-4 flex items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1 w-52">
                Location
            </label>
            <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0  text-sm"
            >
                {locationOptions.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
                ))}
            </select>
            </div>

          <div className="mb-4 flex items-center text-sm whitespace-nowrap">
            <label className="block text-sm font-medium text-gray-700 mb-1 w-52">
              Visibility
            </label>
            <div className="flex border border-gray-300 rounded-md overflow-hidden -ml-14">
              <label className="flex-1 flex items-center px-3 py-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="Only Me"
                  checked={visibility === "Only Me"}
                  onChange={() => setVisibility("Only Me")}
                  className="mr-2"
                />
                <span>Only Me</span>
              </label>
              <label className="flex-1 flex items-center px-3 py-2 cursor-pointer border-l border-r border-gray-300">
                <input
                  type="radio"
                  name="visibility"
                  value="Only Selected Users & Roles"
                  checked={visibility === "Only Selected Users & Roles"}
                  onChange={() => setVisibility("Only Selected Users & Roles")}
                  className="mr-2"
                />
                <span>Only Selected Users & Roles</span>
              </label>
              <label className="flex-1 flex items-center px-3 py-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="Everyone"
                  checked={visibility === "Everyone"}
                  onChange={() => setVisibility("Everyone")}
                  className="mr-2"
                />
                <span>Everyone</span>
              </label>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-red-600">
                URL<span className="text-red-500">*</span>
              </label>
              <button className="text-blue-500 hover:text-blue-700 text-sm flex items-center">
                Insert Placeholders
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
            </div>
            <textarea
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-5 mt-5 flex">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-3">
            Save
          </button>
          <button className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}