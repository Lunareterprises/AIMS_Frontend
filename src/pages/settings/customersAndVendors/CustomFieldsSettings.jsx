import { ChevronDown } from 'lucide-react';

export default function CustomFieldsSettings({
  isAddingField,
  setIsAddingField,
  newField,
  setNewField,
  handleAddField,
  handleCancel
}) {
  return (
    <div className="flex flex-col w-full">
      {/* Existing Fields Table */}
      <div className="w-full border-b border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                Field Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                Data Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                Mandatory
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                Display in Portal
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Example placeholder row — should be dynamically mapped from fields if you want */}
          </tbody>
        </table>
      </div>

      {/* Empty State Message */}
      {!isAddingField && (
        <div className="py-8 text-center text-gray-500">
          <p>
            Do you have information that doesn't go under any existing field?
            Go ahead and create a custom field.
          </p>
        </div>
      )}

      {/* Add Custom Field Form */}
      {isAddingField && (
        <div className="p-4  mt-4 rounded  space-y-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm">Field Label</label>
            <input
              type="text"
              className="p-2 border rounded"
              value={newField.labelName}
              onChange={(e) =>
                setNewField({ ...newField, labelName: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm">Data Type</label>
            <select
              className="p-2 border rounded"
              value={newField.dataType}
              onChange={(e) =>
                setNewField({ ...newField, dataType: e.target.value })
              }
            >
              <option value="">Select type</option>
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
              <option value="dropdown">Dropdown</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newField.isMandatory}
              onChange={(e) =>
                setNewField({ ...newField, isMandatory: e.target.checked })
              }
            />
            <label>Mandatory</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newField.displayInPortal}
              onChange={(e) =>
                setNewField({ ...newField, displayInPortal: e.target.checked })
              }
            />
            <label>Display in Customer Portal</label>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleAddField}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-black rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
