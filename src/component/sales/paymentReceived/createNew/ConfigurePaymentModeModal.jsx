import React, { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import {
  CREATE_PAYMENT_MODE,
  DELETE_PAYMENT_MODE,
  EDIT_PAYMENT_MODE,
  GET_PAYMENT_MODE_LIST,
  SET_DEFAULT_PAYMENT_MODE,
} from "../../../../api/services/sales/createCustomer";

const ConfigurePaymentModeModal = ({
  isOpen,
  onClose,
  onSave,
  selectedPaymentMode,
  onPaymentModeSelect,
}) => {
  const [paymentModes, setPaymentModes] = useState([]);
  const [selectedMode, setSelectedMode] = useState("");
  const [hoveredModeId, setHoveredModeId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchPaymentModes();
    }
  }, [isOpen]);

  const fetchPaymentModes = async () => {
    try {
      const res = await GET_PAYMENT_MODE_LIST();
      let modes = res?.data || [];

      // Sort payment modes alphabetically (case-insensitive)
      modes.sort((a, b) =>
        a.pm_mode.localeCompare(b.pm_mode, undefined, { sensitivity: "base" })
      );

      setPaymentModes(modes);

      if (selectedPaymentMode) {
        setSelectedMode(selectedPaymentMode);
      } else {
        const defaultMode = modes.find((mode) => mode.pm_is_default === 1);
        setSelectedMode(defaultMode?.pm_mode || "");
      }
    } catch (error) {
      console.error("Failed to fetch payment modes", error);
    }
  };

  const handleModeSelect = (modeName) => {
    setSelectedMode(modeName);
  };

  const handleSetDefaultMode = async (modeId, e) => {
    e.stopPropagation();
    try {
      await SET_DEFAULT_PAYMENT_MODE({ mode_id: modeId });
      await fetchPaymentModes();
    } catch (error) {
      console.error("Failed to set default payment mode", error);
    }
  };

  const handleDeleteMode = async (modeId, e) => {
    e.stopPropagation();
    const modeToDelete = paymentModes.find((mode) => mode.pm_id === modeId);
    if (paymentModes.length > 1 && modeToDelete.pm_is_default === 0) {
      try {
        await DELETE_PAYMENT_MODE({ mode_id: modeId });
        await fetchPaymentModes();
        if (selectedMode === modeToDelete.pm_mode) {
          const remainingModes = paymentModes.filter(
            (mode) => mode.pm_id !== modeId
          );
          setSelectedMode(remainingModes[0]?.pm_mode || "");
        }
      } catch (error) {
        console.error("Failed to delete mode", error);
      }
    }
  };

  const handleEditMode = async (modeId, currentName, e) => {
    e.stopPropagation();
    const newName = prompt("Edit payment mode name:", currentName);
    if (newName && newName.trim() && newName.trim() !== currentName) {
      try {
        await EDIT_PAYMENT_MODE({
          mode_id: modeId,
          mode: newName.trim(),
        });
        await fetchPaymentModes();
        if (selectedMode === currentName) {
          setSelectedMode(newName.trim());
        }
      } catch (error) {
        console.error("Failed to edit payment mode", error);
      }
    }
  };

  const handleAddNewMode = async () => {
    const newModeName = prompt("Enter new payment mode name:");
    if (newModeName && newModeName.trim()) {
      try {
        const response = await CREATE_PAYMENT_MODE({
          mode: newModeName.trim(),
        });
        await fetchPaymentModes();
        setSelectedMode(response?.data?.pm_mode || newModeName.trim());
      } catch (error) {
        console.error("Failed to create payment mode", error);
      }
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(paymentModes);
    }
    if (onPaymentModeSelect && selectedMode) {
      onPaymentModeSelect({ name: selectedMode });
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Payment Mode</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Payment Modes List */}
          <div className="space-y-3 mb-4">
            {paymentModes.map((mode) => (
              <div
                key={mode.pm_id}
                className={`group relative flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedMode === mode.pm_mode
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }`}
                onClick={() => handleModeSelect(mode.pm_mode)}
                onMouseEnter={() => setHoveredModeId(mode.pm_id)}
                onMouseLeave={() => setHoveredModeId(null)}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`font-medium ${
                      selectedMode === mode.pm_mode
                        ? "text-white"
                        : "text-gray-900"
                    }`}
                  >
                    {mode.pm_mode}
                  </span>
                  {mode.pm_is_default === 1 && (
                    <span className="text-green-700 bg-green-100 text-xs px-2 py-1 rounded font-semibold">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {hoveredModeId === mode.pm_id && (
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={(e) =>
                          handleEditMode(mode.pm_id, mode.pm_mode, e)
                        }
                        className="text-yellow-500 hover:text-yellow-600 text-sm"
                      >
                        Edit
                      </button>
                      {paymentModes.length > 1 && (
                        <button
                          onClick={(e) => handleDeleteMode(mode.pm_id, e)}
                          className="text-red-500 hover:text-red-600 p-1"
                          title="Delete payment mode"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      {mode.pm_is_default === 0 && (
                        <button
                          onClick={(e) => handleSetDefaultMode(mode.pm_id, e)}
                          className="hover:text-blue-600 text-sm"
                        >
                          Mark as Default
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add New Button */}
          <button
            onClick={handleAddNewMode}
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors mb-6"
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium">Add New</span>
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurePaymentModeModal;
