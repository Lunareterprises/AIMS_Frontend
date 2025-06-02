import CommonButton from "../../CommonUI/buttons/CommonButton";

// FilterModal.jsx
export default function QuotesFilterModel({ filterFields, setFilterFields, onClose }) {
    const fieldKeys = Object.keys(filterFields);
    const selectedCount = fieldKeys.filter(key => filterFields[key]).length;
    const allSelected = selectedCount === fieldKeys.length;
  
    const toggleSelectAll = () => {
      const newValue = !allSelected;
      const updatedFields = {};
      fieldKeys.forEach(key => {
        updatedFields[key] = newValue;
      });
      setFilterFields(updatedFields);
    };
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2">Filter Fields</h2>
          <div className="flex justify-end items-center mb-4">

       
            <span className="text-sm text-gray-600">{selectedCount} selected</span>

          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full mb-4 px-3 py-2 border rounded"
          />
            <CommonButton onClick={toggleSelectAll}
              className="text-blue-500 text-sm underline mb-6 " label={allSelected ? 'Deselect All' : 'Select All'} />
            
          {fieldKeys.map((field) => (
            <div key={field} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={field}
                checked={filterFields[field]}
                onChange={() =>
                  setFilterFields((prev) => ({
                    ...prev,
                    [field]: !prev[field],
                  }))
                }
                className="mr-2"
              />
              <label htmlFor={field} className="capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
            </div>
          ))}
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    );
  }
  
