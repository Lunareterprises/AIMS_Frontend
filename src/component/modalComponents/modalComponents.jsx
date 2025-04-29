import { useState, useEffect } from "react";

const AddModal = ({
  isOpen,
  onClose,
  onAdd,
  title = "Add New Item",
  placeholder = "Enter new item",
  labelKey = "label",
  valueKey = "value",
  defaultValue = "",
}) => {
  const [inputValue, setInputValue] = useState(defaultValue || "");

  useEffect(() => {
    if (isOpen) setInputValue(defaultValue || "");
  }, [isOpen, defaultValue]);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      const item = {
        [labelKey]: inputValue.trim(),
        [valueKey]: inputValue.trim(),
      };
      console.log("Submitted item:", item); 
        onAdd(item);
      setInputValue("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-80">
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
        />
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-gray-200 text-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-1 bg-blue-500 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
