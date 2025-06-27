import React, { useState, useMemo } from 'react';
import { Search, Plus, Trash2, X, Info, Edit2 } from 'lucide-react';

const CommonButton = ({ label, className, onClick, disabled }) => (
  <button 
    className={className} 
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

const CustomViewForm = () => {
  const [viewName, setViewName] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [criteria, setCriteria] = useState([
    { id: 1, field: '', comparator: '', value: '', connector: 'AND' }
  ]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [visibilityType, setVisibilityType] = useState('everyone');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState(['Staff']);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [roleSearch, setRoleSearch] = useState('');
  const [availableColumnsSearch, setAvailableColumnsSearch] = useState('');
  const [selectedColumnsSearch, setSelectedColumnsSearch] = useState('');
  const [errors, setErrors] = useState({});

  const allColumns = [
    'Company Name', 'Email', 'Phone', 'Receivables', 'Receivables (BCV)', 
    'Unused Credits', 'Source', 'Last Name', 'Mobile Phone', 'Payment Terms'
  ];

  const availableRoles = ['Admin', 'Staff', 'TimesheetStaff', 'Staff (Assigned Customers Only)'];
  const mockUsers = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'];

  // Get available columns (not yet selected)
  const availableColumns = useMemo(() => {
    return allColumns.filter(column => !selectedColumns.includes(column));
  }, [selectedColumns]);

  // Filter available columns based on search
  const filteredAvailableColumns = useMemo(() => {
    return availableColumns.filter(column =>
      column.toLowerCase().includes(availableColumnsSearch.toLowerCase())
    );
  }, [availableColumns, availableColumnsSearch]);

  // Filter selected columns based on search
  const filteredSelectedColumns = useMemo(() => {
    return selectedColumns.filter(column =>
      column.toLowerCase().includes(selectedColumnsSearch.toLowerCase())
    );
  }, [selectedColumns, selectedColumnsSearch]);

  const addCriterion = () => {
    setCriteria([...criteria, { 
      id: Date.now(), 
      field: '', 
      comparator: '', 
      value: '', 
      connector: 'AND' 
    }]);
  };

  const removeCriterion = (id) => {
    if (criteria.length > 1) {
      setCriteria(criteria.filter(c => c.id !== id));
    }
  };

  const updateCriterion = (id, field, value) => {
    setCriteria(criteria.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const generateCriteriaPattern = () => {
    if (criteria.length === 0) return '';
    
    let pattern = '( ( ( ';
    criteria.forEach((criterion, index) => {
      if (index > 0) {
        pattern += ` ${criterion.connector} `;
      }
      pattern += `${index + 1}`;
    });
    pattern += ' ) ) )';
    return pattern;
  };

  const moveColumn = (column, fromList, toList) => {
    if (fromList === 'available' && toList === 'selected') {
      // Validation: Check if column is already selected
      if (!selectedColumns.includes(column)) {
        setSelectedColumns([...selectedColumns, column]);
        // Clear any previous error for this column
        if (errors[column]) {
          const newErrors = { ...errors };
          delete newErrors[column];
          setErrors(newErrors);
        }
      } else {
        // Show error if trying to add duplicate
        setErrors(prev => ({
          ...prev,
          [column]: 'This column is already selected'
        }));
        setTimeout(() => {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[column];
            return newErrors;
          });
        }, 3000);
      }
    } else if (fromList === 'selected' && toList === 'available') {
      setSelectedColumns(selectedColumns.filter(c => c !== column));
    }
  };

  const toggleRole = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const removeRole = (role) => {
    setSelectedRoles(selectedRoles.filter(r => r !== role));
  };

  const toggleUser = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter(u => u !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const removeUser = (user) => {
    setSelectedUsers(selectedUsers.filter(u => u !== user));
  };

  const filteredRoles = availableRoles.filter(role => 
    role.toLowerCase().includes(roleSearch.toLowerCase()) && 
    !selectedRoles.includes(role)
  );

  const validateForm = () => {
    const newErrors = {};
    
    if (!viewName.trim()) {
      newErrors.viewName = 'View name is required';
    }
    
    if (selectedColumns.length === 0) {
      newErrors.columns = 'At least one column must be selected';
    }
    
    // Validate criteria
    const incompleteCriteria = criteria.filter(c => 
      (c.field && !c.comparator) || 
      (c.field && c.comparator && !c.value) ||
      (!c.field && (c.comparator || c.value))
    );
    
    if (incompleteCriteria.length > 0) {
      newErrors.criteria = 'Please complete all criteria or remove incomplete ones';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const viewData = {
        name: viewName,
        isFavorite,
        criteria: criteria.filter(c => c.field && c.comparator && c.value),
        selectedColumns,
        visibilityType,
        selectedUsers,
        selectedRoles
      };
      console.log('Saving view:', viewData);
      // Here you would typically send the data to your backend
      alert('View saved successfully!');
    }
  };

  const handleCancel = () => {
    // Reset form or navigate away
    setViewName('');
    setIsFavorite(false);
    setCriteria([{ id: 1, field: '', comparator: '', value: '', connector: 'AND' }]);
    setSelectedColumns([]);
    setVisibilityType('everyone');
    setSelectedUsers([]);
    setSelectedRoles(['Staff']);
    setErrors({});
  };

  return (
    <div className="max-w-1/2 p-6 bg-white">
      <h1 className="text-xl font-semibold mb-6">New Custom View</h1>
      
      {/* Name Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-red-600 mb-2">
          Name<span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={viewName}
              onChange={(e) => setViewName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.viewName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter view name"
            />
            {errors.viewName && (
              <p className="text-red-500 text-xs mt-1">{errors.viewName}</p>
            )}
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={isFavorite}
              onChange={(e) => setIsFavorite(e.target.checked)}
              className="rounded"
            />
            Mark as Favorite
          </label>
        </div>
      </div>

      {/* Criteria Section */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-blue-600 mb-4">
          Define the criteria ( if any )
        </h3>
        
        {errors.criteria && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{errors.criteria}</p>
          </div>
        )}
        
        {criteria.map((criterion, index) => (
          <div key={criterion.id} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium">
                {index + 1}
              </span>
              <select 
                value={criterion.field}
                onChange={(e) => updateCriterion(criterion.id, 'field', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">Select a field</option>
                <option value="company">Company Name</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="receivables">Receivables</option>
                <option value="source">Source</option>
              </select>
              <select 
                value={criterion.comparator}
                onChange={(e) => updateCriterion(criterion.id, 'comparator', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm text-blue-600"
              >
                <option value="">Select a comparator</option>
                <option value="equals">Equals</option>
                <option value="contains">Contains</option>
                <option value="starts_with">Starts with</option>
                <option value="ends_with">Ends with</option>
                <option value="is_empty">Is empty</option>
                <option value="is_not_empty">Is not empty</option>
              </select>
              <input
                type="text"
                value={criterion.value}
                onChange={(e) => updateCriterion(criterion.id, 'value', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter value"
                disabled={criterion.comparator === 'is_empty' || criterion.comparator === 'is_not_empty'}
              />
              <button
                onClick={addCriterion}
                className="p-2 text-gray-400 hover:text-gray-600"
                title="Add criterion"
              >
                <Plus className="w-4 h-4" />
              </button>
              {criteria.length > 1 && (
                <button
                  onClick={() => removeCriterion(criterion.id)}
                  className="p-2 text-red-400 hover:text-red-600"
                  title="Remove criterion"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {index < criteria.length - 1 && (
              <div className="ml-8 mb-2">
                <select
                  value={criteria[index + 1]?.connector || 'AND'}
                  onChange={(e) => updateCriterion(criteria[index + 1]?.id, 'connector', e.target.value)}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  <option value="AND">AND</option>
                  <option value="OR">OR</option>
                </select>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addCriterion}
          className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Criterion
        </button>

        {criteria.length > 0 && criteria.some(c => c.field) && (
          <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">CRITERIA PATTERN:</span>
                <span className="text-sm text-blue-600 font-mono">
                  {generateCriteriaPattern()}
                </span>
              </div>
              <button className="text-blue-600 hover:text-blue-700">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Columns Preference */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-700 mb-4">
          Columns Preference<span className="text-red-500">*</span>
        </h3>
        
        {errors.columns && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{errors.columns}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Available Columns */}
          <div className="border border-gray-300 rounded-md p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 border-2 border-gray-400 rounded-full"></div>
              <span className="text-sm font-medium text-gray-600">
                AVAILABLE COLUMNS ({filteredAvailableColumns.length})
              </span>
            </div>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search available columns"
                value={availableColumnsSearch}
                onChange={(e) => setAvailableColumnsSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div className="h-48 overflow-y-auto">
              {filteredAvailableColumns.length > 0 ? (
                filteredAvailableColumns.map((column) => (
                  <div
                    key={column}
                    className={`px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm flex items-center gap-2 border-b border-gray-100 last:border-b-0 ${
                      errors[column] ? 'bg-red-50 border-red-200' : ''
                    }`}
                    onClick={() => moveColumn(column, 'available', 'selected')}
                    title={`Click to add ${column} to selected columns`}
                  >
                    <div className="w-2 h-2 border border-gray-400"></div>
                    <span className="text-blue-600">{column}</span>
                    {errors[column] && (
                      <span className="text-red-500 text-xs ml-auto">{errors[column]}</span>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500 text-center">
                  {availableColumnsSearch ? 'No columns match your search' : 'All columns are selected'}
                </div>
              )}
            </div>
          </div>

          {/* Selected Columns */}
          <div className="border border-gray-300 rounded-md p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-600">
                SELECTED COLUMNS ({filteredSelectedColumns.length})
              </span>
            </div>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search selected columns"
                value={selectedColumnsSearch}
                onChange={(e) => setSelectedColumnsSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div className="h-48 overflow-y-auto">
              {filteredSelectedColumns.length > 0 ? (
                filteredSelectedColumns.map((column) => (
                  <div
                    key={column}
                    className="px-3 py-2 hover:bg-red-50 cursor-pointer text-sm flex items-center gap-2 border-b border-gray-100 last:border-b-0"
                    onClick={() => moveColumn(column, 'selected', 'available')}
                    title={`Click to remove ${column} from selected columns`}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-blue-600">{column}</span>
                    <X className="w-3 h-3 text-gray-400 ml-auto" />
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500 text-center">
                  {selectedColumnsSearch ? 'No selected columns match your search' : 'No columns selected'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Visibility Preference */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Visibility Preference</h3>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-700 mb-3 block">Share this with</span>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="visibility"
                  value="only_me"
                  checked={visibilityType === 'only_me'}
                  onChange={(e) => setVisibilityType(e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-sm">Only Me</span>
                <Info className="w-4 h-4 text-gray-400" />
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="visibility"
                  value="selected_users"
                  checked={visibilityType === 'selected_users'}
                  onChange={(e) => setVisibilityType(e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-sm">Only Selected Users & Roles</span>
                <Info className="w-4 h-4 text-gray-400" />
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="visibility"
                  value="everyone"
                  checked={visibilityType === 'everyone'}
                  onChange={(e) => setVisibilityType(e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-sm">Everyone</span>
                <Info className="w-4 h-4 text-gray-400" />
              </label>
            </div>
          </div>

          {visibilityType === 'selected_users' && (
            <div className="space-y-4">
              {/* Add Users/Roles Buttons */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Users
                  </button>
                  {showUserDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      <div className="p-3 border-b border-gray-200">
                        <span className="text-sm font-medium text-gray-700">Select Users</span>
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {mockUsers.map((user) => (
                          <div
                            key={user}
                            onClick={() => toggleUser(user)}
                            className={`px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0 flex items-center gap-2 ${
                              selectedUsers.includes(user) ? 'bg-blue-50' : ''
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user)}
                              onChange={() => {}}
                              className="rounded"
                            />
                            {user}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Roles
                  </button>
                  {showRoleDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      <div className="p-3 border-b border-gray-200">
                        <input
                          type="text"
                          placeholder="Search roles"
                          value={roleSearch}
                          onChange={(e) => setRoleSearch(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {filteredRoles.map((role) => (
                          <div
                            key={role}
                            onClick={() => toggleRole(role)}
                            className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                          >
                            {role}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Access Details Section */}
              {(selectedUsers.length > 0 || selectedRoles.length > 0) && (
                <div className="border border-gray-200 rounded-md bg-white">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 rounded-t-md">
                    <h4 className="text-sm font-medium text-gray-700">Access Details</h4>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    {/* Users List */}
                    {selectedUsers.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-600 mb-3">Users</h5>
                        <div className="space-y-2">
                          {selectedUsers.map((user) => (
                            <div key={user} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-medium text-blue-600">
                                    {user.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{user}</div>
                                  <div className="text-xs text-gray-500">
                                    {user.toLowerCase().replace(' ', '')}@admin-scc.com
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => removeUser(user)}
                                className="text-gray-400 hover:text-red-500 p-1"
                                title="Remove user"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Roles List */}
                    {selectedRoles.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-600 mb-3">Roles</h5>
                        <div className="space-y-2">
                          {selectedRoles.map((role) => (
                            <div key={role} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-medium text-orange-600">
                                    {role.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div className="text-sm font-medium text-gray-900">{role}</div>
                              </div>
                              <button
                                onClick={() => removeRole(role)}
                                className="text-gray-400 hover:text-red-500 p-1"
                                title="Remove role"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <CommonButton 
          label="Save" 
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
        />
        <CommonButton 
          label="Cancel" 
          onClick={handleCancel}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium"
        />
      </div>
    </div>
  );
};

export default CustomViewForm;