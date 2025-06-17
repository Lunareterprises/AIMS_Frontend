import CommonButton from "../../CommonUI/buttons/CommonButton";

// FilterModal.jsx
export default function FilterModal({ filterFields, setFilterFields, onClose }) {
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
      <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] flex flex-col">
        <h2 className="text-xl font-semibold mb-2">Filter Fields</h2>

        <div className="flex justify-end items-start mb-2">
          <span className="text-sm text-gray-600">{selectedCount} selected</span>
        </div>

        <input
          type="text"
          placeholder="Search..."
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <div>
          <CommonButton
            onClick={toggleSelectAll}
            className="text-blue-500 text-sm underline mb-4"
            label={allSelected ? 'Deselect All' : 'Select All'}
          />
        </div>

        <div className="flex-1 overflow-y-auto pr-1 mb-4">
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
        </div>

        {/* Fixed Footer */}
        <div className="flex justify-end gap-2 pt-4 border-t mt-auto">
          <CommonButton
            label="Cancel"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          />
          <CommonButton
            label="Apply"
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          />
        </div>
      </div>
    </div>
  );
}
