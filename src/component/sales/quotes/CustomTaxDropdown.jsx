import { ChevronDown, Plus, Search, Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import NewTaxModal from "./NewTaxModal"; // Import the modal

const CustomTaxDropdown = ({ 
  value, 
  onChange, 
  className = "",
  // New props for API integration
  taxes = [],
  isLoadingTaxes = false,
  taxError = null,
  onTaxSearch = () => {},
  onLoadMoreTaxes = () => {},
  taxHasMore = false,
  onCreateTax = () => {} // New prop for creating tax
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewTaxModal, setShowNewTaxModal] = useState(false); // New state for modal
  const dropdownRef = useRef(null);

  // Hardcoded non-taxable options (keeping as requested)
  const nonTaxableOptions = [
    { id: 'exempt', label: 'Exempt', value: 'Exempt' },
    { id: 'out-of-scope', label: 'Out of Scope', value: 'Out of Scope' }
  ];

  // Filter non-taxable options based on search term
  const filteredNonTaxable = nonTaxableOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter API tax options based on search term
  const filteredApiTaxes = taxes.filter(tax =>
    tax.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tax.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle search with debounce
  useEffect(() => {
    if (isOpen && searchTerm) {
      onTaxSearch(searchTerm);
    }
  }, [searchTerm, isOpen, onTaxSearch]);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const getDisplayLabel = (val) => {
    // Check non-taxable options first
    const nonTaxableOption = nonTaxableOptions.find(opt => opt.value === val);
    if (nonTaxableOption) {
      return nonTaxableOption.label;
    }

    // Check API tax options
    const apiTaxOption = taxes.find(tax => tax.value === val);
    if (apiTaxOption) {
      return apiTaxOption.label;
    }

    return val || 'Select a Tax';
  };

  const handleLoadMore = () => {
    if (taxHasMore && !isLoadingTaxes) {
      onLoadMoreTaxes();
    }
  };

  // Handle new tax creation
  const handleNewTaxSave = (taxData) => {
    onCreateTax(taxData);
    setShowNewTaxModal(false);
    setIsOpen(false);
  };

  const handleNewTaxCancel = () => {
    setShowNewTaxModal(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Dropdown Trigger */}
      <div
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm cursor-pointer flex items-center justify-between bg-white hover:border-gray-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${value ? 'text-gray-900' : 'text-gray-500'}`}>
          {getDisplayLabel(value)}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-[250px]">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search taxes"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-8 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              {isLoadingTaxes && (
                <Loader className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 animate-spin" />
              )}
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {/* Error State */}
            {taxError && (
              <div className="p-4 text-center">
                <div className="text-sm text-red-500 mb-2">{taxError}</div>
                <button
                  onClick={() => onTaxSearch("")}
                  className="text-blue-500 text-sm hover:underline"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Non-taxable Options (Hardcoded) */}
            {!taxError && filteredNonTaxable.length > 0 && (
              <div>
                {filteredNonTaxable.map((option) => (
                  <div
                    key={option.id}
                    className={`px-6 py-2 cursor-pointer text-sm text-left transition-colors hover:bg-gray-50 ${
                      value === option.value ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                    {value === option.value && (
                      <span className="float-right text-blue-600">✓</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* API Tax Rates Section */}
            {!taxError && filteredApiTaxes.length > 0 && (
              <div>
                {/* Separator if both sections have content */}
                {filteredNonTaxable.length > 0 && (
                  <div className="border-t border-gray-100"></div>
                )}
                
                {/* Section Header */}
                <div className="px-4 py-2 text-xs text-left font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                  Tax Rates
                </div>
                
                {/* Tax Options from API */}
                {filteredApiTaxes.map((tax) => (
                  <div
                    key={tax.id}
                    className={`px-6 py-2 cursor-pointer text-sm text-left transition-colors hover:bg-gray-50 ${
                      value === tax.value ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => handleSelect(tax.value)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{tax.label}</div>
                        {tax.description && (
                          <div className="text-xs text-gray-500 mt-1">
                            {tax.description}
                          </div>
                        )}
                      </div>
                      {value === tax.value && (
                        <span className="text-blue-600 ml-2">✓</span>
                      )}
                    </div>
                  </div>
                ))}

                {/* Load More Button */}
                {taxHasMore && (
                  <div className="border-t border-gray-100 p-2">
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoadingTaxes}
                      className="w-full text-center text-blue-500 text-sm hover:bg-blue-50 py-2 rounded transition-colors disabled:opacity-50 flex items-center justify-center"
                    >
                      {isLoadingTaxes ? (
                        <>
                          <Loader className="w-4 h-4 mr-2 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        "Load More"
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* No Results */}
            {!taxError && 
             !isLoadingTaxes && 
             filteredNonTaxable.length === 0 && 
             filteredApiTaxes.length === 0 && 
             searchTerm && (
              <div className="px-3 py-4 text-sm text-gray-500 text-center">
                No tax options found for "{searchTerm}"
              </div>
            )}

            {/* Loading State (when initially loading or searching) */}
            {isLoadingTaxes && filteredApiTaxes.length === 0 && (
              <div className="px-3 py-4 text-sm text-gray-500 text-center flex items-center justify-center">
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Loading taxes...
              </div>
            )}
          </div>

          {/* New Tax Option */}
          <div className="border-t border-gray-100 p-2">
            <button
              className="flex items-center w-full text-left p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors group text-sm"
              onClick={() => {
                setShowNewTaxModal(true);
              }}
            >
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                <Plus className="w-3 h-3" />
              </div>
              <span className="font-medium">New Tax</span>
            </button>
          </div>
        </div>
      )}

      {/* New Tax Modal */}
      <NewTaxModal
        isOpen={showNewTaxModal}
        onClose={handleNewTaxCancel}
        onSave={handleNewTaxSave}
        isLoading={false} // You can pass loading state if needed
      />
    </div>
  );
};

export default CustomTaxDropdown;