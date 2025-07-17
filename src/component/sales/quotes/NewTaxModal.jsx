import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const NewTaxModal = ({ isOpen, onClose, onSave, isLoading = false }) => {
  const [formData, setFormData] = useState({
    taxName: "",
    rate: "",
  });
  const [errors, setErrors] = useState({});

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        taxName: "",
        rate: "",
      });
      setErrors({});
    }
  }, [isOpen]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.taxName.trim()) {
      newErrors.taxName = "Tax name is required";
    }

    if (!formData.rate.trim()) {
      newErrors.rate = "Tax rate is required";
    } else {
      const rateNum = parseFloat(formData.rate);
      if (isNaN(rateNum)) {
        newErrors.rate = "Please enter a valid number";
      } else if (rateNum < 0) {
        newErrors.rate = "Tax rate cannot be negative";
      } else if (rateNum > 100) {
        newErrors.rate = "Tax rate cannot exceed 100%";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSave = () => {
    if (validateForm()) {
      const taxData = {
        name: formData.taxName.trim(),
        rate: parseFloat(formData.rate),
        label: `${formData.taxName.trim()} [${formData.rate}%]`,
        value: `${formData.taxName.trim()} ${formData.rate}%`
      };
      onSave(taxData);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({
      taxName: "",
      rate: "",
    });
    setErrors({});
    onClose();
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">New Tax</h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {/* Tax Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
              Tax Name<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={formData.taxName}
              onChange={(e) => handleInputChange("taxName", e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter tax name"
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.taxName 
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                  : "border-gray-300"
              }`}
              disabled={isLoading}
              autoFocus
            />
            {errors.taxName && (
              <p className="mt-1 text-sm text-red-600">{errors.taxName}</p>
            )}
          </div>

          {/* Tax Rate Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
              Rate (%)<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.rate}
                onChange={(e) => handleInputChange("rate", e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="0.00"
                min="0"
                max="100"
                step="0.01"
                className={`w-full px-3 py-2 pr-8 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.rate 
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                    : "border-gray-300"
                }`}
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 text-sm">%</span>
              </div>
            </div>
            {errors.rate && (
              <p className="mt-1 text-sm text-red-600">{errors.rate}</p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTaxModal;