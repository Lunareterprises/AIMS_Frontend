import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Star, Plus } from 'lucide-react';
import CommonButton from '../../../CommonUI/buttons/CommonButton';
import { useNavigate } from 'react-router-dom';

// Reusable Dropdown Component
const ReusableFilterDropdown = ({
  selectedFilter,
  onFilterSelect,
  dropdownTitle = "All Items",
  defaultFilters = [],
  customFilters = [],
  onNewCustomView,
  showSearch = true,
  showNewCustomView = true,
  showStarIcons = true,
  className = "",
  dropdownWidth = "w-80",
  showDefaultFilters= true
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterSelect = (filter) => {
    onFilterSelect(filter);
    setIsOpen(false);
  };

//   const handleNewCustomView = () => {
//     // if (onNewCustomView) {
//     //   onNewCustomView();
//     // }
//     setIsOpen(false);
    
//   };

  // Filter options based on search term
  const filteredDefaultFilters = defaultFilters.filter(filter =>
    filter.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCustomFilters = customFilters.filter(filter =>
    filter.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`relative  ${className}`} ref={dropdownRef}>
      {/* Dropdown Trigger */}
        <div 
            className="flex items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            >
            <h1 className="text-2xl font-semibold text-gray-800">
            {selectedFilter?.label || 'Select Filter'}
            </h1>
            <ChevronDown 
            className={`ml-2 text-blue-500 transform transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
            }`} 
            size={20} 
            />
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
        <div
            className={`absolute top-full left-0 mt-2 ${dropdownWidth} bg-white border border-gray-200 rounded-lg shadow-lg z-50 flex flex-col max-h-96`}
        >
            {/* Header */}
            <div className="p-3 border-b border-gray-200">
            {/* <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-800">{dropdownTitle}</h3>
                <ChevronDown className="text-blue-500" size={16} />
            </div> */}

            {/* Search Bar */}
            {showSearch && (
                <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                    type="text"
                    placeholder="Search filters..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-sm pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                </div>
            )}
            </div>

            {/* Scrollable Filters */}
            <div className="overflow-y-auto flex-1">
            {/* Default Filters Section */}
            {filteredDefaultFilters.length > 0 && (
                <div className="p-3">
                    {!showDefaultFilters && (
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                            DEFAULT FILTERS
                            </h4>
                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                            {defaultFilters.length}
                            </span>
                        </div>
                    )}
                

                <div className="space-y-1 text-sm">
                    {filteredDefaultFilters.map((filter) => (
                    <div
                        key={filter.id}
                        className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-50 ${
                        selectedFilter?.id === filter.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                        onClick={() => handleFilterSelect(filter)}
                    >
                        <span className="text-sm">{filter.label}</span>
                        <div className="flex items-center space-x-2">
                        {filter.count !== undefined && filter.count !== null && (
                            <span className="text-xs text-gray-500">({filter.count})</span>
                        )}
                        {showStarIcons && (
                            <Star className="text-gray-300 hover:text-yellow-400" size={16} />
                        )}
                        {filter.hasDropdown && (
                            <ChevronDown className="text-gray-400" size={14} />
                        )}
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            )}

            {/* Custom Filters Section */}
            {!showDefaultFilters && filteredCustomFilters.length > 0 && (
                <div className="p-3 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    CREATED BY ME
                    </h4>
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {customFilters.length}
                    </span>
                </div>

                <div className="space-y-1">
                    {filteredCustomFilters.map((filter) => (
                    <div
                        key={filter.id}
                        className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-50 ${
                        selectedFilter?.id === filter.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                        onClick={() => handleFilterSelect(filter)}
                    >
                        <span className="text-sm">{filter.label}</span>
                        <div className="flex items-center space-x-2">
                        {filter.count !== undefined && filter.count !== null && (
                            <span className="text-xs text-gray-500">({filter.count})</span>
                        )}
                        {showStarIcons && (
                            <Star className="text-gray-300 hover:text-yellow-400" size={16} />
                        )}
                        {/* {filter.hasDropdown && (
                            <ChevronDown className="text-gray-400" size={14} />
                        )} */}
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            )}
            </div>

            {/* Fixed Footer */}
            {showNewCustomView && onNewCustomView && (
            <div className="p-3 border-t border-gray-200">
                <CommonButton
                label={<>
                 <Plus size={16} className="mr-2" />
                New Custom View   
                </>}
                className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                onClick={()=>navigate("/CustomViewForm")}
                />   
            </div>
            )}
        </div>
        )}

    </div>
  );
};


export { ReusableFilterDropdown };
