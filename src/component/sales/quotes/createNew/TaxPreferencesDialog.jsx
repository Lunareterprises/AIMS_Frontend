import { useState } from "react";
import { Search, X, ChevronUp, ChevronDown } from "lucide-react";
import CommonButton from "../../../CommonUI/buttons/CommonButton";

export default function TaxPreferencesDialog({onClose}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Non VAT Registered");
  const [searchTerm, setSearchTerm] = useState("");

  const options = [
    {
      value: "VAT Registered",
      label: "VAT Registered",
      description: "A business that is registered for VAT and is located in the U.A.E."
    },
    {
      value: "Non VAT Registered",
      label: "Non VAT Registered", 
      description: "A business that is not registered for VAT and is located in the U.A.E."
    },
    {
      value: "Out Of Scope",
      label: "Out Of Scope",
      description: "A transaction on which VAT charges are not applicable."
    },
    {
      value: "VAT Registered - Designated Zone",
      label: "VAT Registered - Designated Zone",
      description: ""
    }
  ];

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionSelect = (option) => {
    setSelectedOption(option.label);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="flex items-center shadow-md bg-white justify-center absolute top-full left-56 mt-2 w-96  border border-gray-300 rounded-lg  z-50">
      <div className="  p-6 relative w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 ">
          <h2 className="text-lg font-medium text-gray-900">Configure Tax Preferences</h2>
          <CommonButton label={<X size={20} />} className="text-red-400 hover:text-red-600" onClick={onClose} />
            
          
        </div>

        {/* Tax Treatment Section */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tax Treatment
          </label>
          
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-white border border-gray-300 text-sm rounded-md px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
            >
              <span className="text-gray-900">{selectedOption}</span>
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {/* Search Box */}
                <div className="p-3 border-b border-gray-200">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Options List */}
                <div className="max-h-64 overflow-y-auto">
                  {filteredOptions.map((option, index) => (
                    <div
                      key={option.value}
                      onClick={() => handleOptionSelect(option)}
                      className={`px-3 py-3 cursor-pointer hover:bg-gray-50 ${
                        option.label === selectedOption ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-gray-900'
                      } ${index !== filteredOptions.length - 1 ? 'border-b border-gray-100' : ''}`}
                    >
                      <div className="font-medium">{option.label}</div>
                      {option.description && (
                        <div className={`text-sm mt-1 ${
                          option.label === selectedOption ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {option.description}
                        </div>
                      )}
                      {option.label === selectedOption && (
                        <div className="flex justify-end mt-2">
                          <ChevronDown size={16} className="text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-start gap-3">
          <CommonButton label="Update"  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-sm" />
          <CommonButton label="Cancel" onClick={onClose} className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium border border-gray-300" />
        </div>
      </div>
    </div>
  );
}