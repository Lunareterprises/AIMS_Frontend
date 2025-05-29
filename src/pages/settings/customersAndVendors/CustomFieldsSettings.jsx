import { ChevronDown } from 'lucide-react';
import NewCustomFieldContacts from './NewCustomFieldContacts';

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
      {/* Hide this entire block if adding a field */}
      {!isAddingField && (
        <>
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
                {/* Placeholder: map actual fields here if available */}
              </tbody>
            </table>
          </div>

          {/* Empty State Message */}
          <div className="py-8 text-center text-gray-500">
            <p>
              Do you have information that doesn't go under any existing field?
              Go ahead and create a custom field.
            </p>
            
          </div>
        </>
      )}

      {/* Add Custom Field Form */}
      {isAddingField && (
        <NewCustomFieldContacts
          newField={newField}
          setNewField={setNewField}
          handleAddField={handleAddField}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
}
