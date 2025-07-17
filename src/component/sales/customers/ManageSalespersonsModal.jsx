import React, { useState, useEffect } from 'react';
import { X, Search, Plus, Edit, Trash2, Loader } from 'lucide-react';
import { CREATE_SALESPERSON, DELETE_SALESPERSON, GET_ALL_SALESPERSONS, UPDATE_SALESPERSON } from '../../../api/services/sales/createCustomer';

const ManageSalespersonsModal = ({ 
  isOpen, 
  onClose, 
  onSelectSalesperson,
  initialSalespersons = []
}) => {
  // Basic state
  const [salespersons, setSalespersons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [selectedSalesperson, setSelectedSalesperson] = useState(null);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Don't render if not open
  if (!isOpen) return null;

  // Fetch salespersons from API
  const fetchSalespersons = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await GET_ALL_SALESPERSONS({
        search: searchQuery,
        page: 1,
        limit: 50
      });

      console.log('Salespersons API Response:', response);

      // Transform response data
      const transformedSalespersons = (
        response.data || response.salespersons || response.list || []
      ).map((salesperson) => ({
        id: salesperson.sp_id || salesperson.id,
        name: salesperson.sp_name || salesperson.name || '',
        email: salesperson.sp_email || salesperson.email || '',
        status: salesperson.sp_status || salesperson.status || 'active'
      }));

      setSalespersons(transformedSalespersons);
    } catch (error) {
      console.error('Error fetching salespersons:', error);
      setError('Failed to fetch salespersons');
      // Fallback to sample data
      setSalespersons([
        { id: 1, name: 'Sales person 1', email: 'salesperson@gmail.com', status: 'active' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize data when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchSalespersons();
    }
  }, [isOpen, searchQuery]);

  // Filter salespersons based on search
  const filteredSalespersons = salespersons.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Create new salesperson
  const handleCreate = async () => {
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await CREATE_SALESPERSON({
        sp_name: formData.name,
        sp_email: formData.email
      });

      const newSalesperson = {
        id: response.data?.sp_id || response.id || Date.now(),
        name: formData.name,
        email: formData.email,
        status: 'active'
      };

      setSalespersons(prev => [newSalesperson, ...prev]);
      
      // Auto-select and close if callback provided
      if (onSelectSalesperson) {
        onSelectSalesperson(newSalesperson);
        handleClose();
        return;
      }

      // Reset form
      resetForm();
      alert('Salesperson created successfully');
    } catch (error) {
      console.error('Error creating salesperson:', error);
      alert('Failed to create salesperson');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update existing salesperson
  const handleUpdate = async () => {
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await UPDATE_SALESPERSON({
        id: editingId,
        sp_name: formData.name,
        sp_email: formData.email
      });

      setSalespersons(prev => prev.map(sp => 
        sp.id === editingId 
          ? { ...sp, name: formData.name, email: formData.email }
          : sp
      ));

      resetForm();
      alert('Salesperson updated successfully');
    } catch (error) {
      console.error('Error updating salesperson:', error);
      alert('Failed to update salesperson');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete salesperson
  const handleDelete = async (salesperson) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${salesperson.name}? This action cannot be undone.`
    );
    
    if (!confirmed) return;

    try {
      await DELETE_SALESPERSON({ id: salesperson.id });
      
      setSalespersons(prev => prev.filter(sp => sp.id !== salesperson.id));
      
      alert('Salesperson deleted successfully');
    } catch (error) {
      console.error('Error deleting salesperson:', error);
      alert('Failed to delete salesperson');
    }
  };

  // Mark as inactive
  const handleMarkInactive = async (salesperson) => {
    const confirmed = window.confirm(
      `Are you sure you want to mark ${salesperson.name} as inactive?`
    );
    
    if (!confirmed) return;

    try {
      await UPDATE_SALESPERSON({
        id: salesperson.id,
        sp_status: 'inactive'
      });
      
      setSalespersons(prev => prev.map(sp => 
        sp.id === salesperson.id 
          ? { ...sp, status: 'inactive' }
          : sp
      ));
      
      alert('Salesperson marked as inactive');
    } catch (error) {
      console.error('Error updating salesperson:', error);
      alert('Failed to update salesperson status');
    }
  };

  // Edit salesperson
  const handleEdit = (salesperson) => {
    setFormData({
      name: salesperson.name,
      email: salesperson.email
    });
    setIsEditing(true);
    setEditingId(salesperson.id);
    setShowAddForm(true);
  };

  // Select salesperson
  const handleSelectSalesperson = (salesperson) => {
    setSelectedSalesperson(salesperson);
    if (onSelectSalesperson) {
      onSelectSalesperson(salesperson);
      handleClose();
    }
  };

  // Form submission
  const handleSubmit = () => {
    if (isEditing) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ name: '', email: '' });
    setShowAddForm(false);
    setIsEditing(false);
    setEditingId(null);
  };

  // Close modal
  const handleClose = () => {
    resetForm();
    setSearchQuery('');
    setSelectedSalesperson(null);
    setError(null);
    onClose();
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-50"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded-lg shadow-2xl z-50 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Manage Salespersons</h2>
          <button 
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="text-red-600 text-sm">{error}</div>
              <button
                onClick={fetchSalespersons}
                className="text-red-600 text-sm underline mt-1"
              >
                Retry
              </button>
            </div>
          )}

          {/* Search and Add Button */}
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-1 mr-4">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Salesperson"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {isLoading && (
                <Loader className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 animate-spin" />
              )}
            </div>
            <button
              onClick={() => {
                setShowAddForm(true);
                setIsEditing(false);
                setEditingId(null);
                setFormData({ name: '', email: '' });
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Salesperson</span>
            </button>
          </div>

          {/* Add/Edit Form */}
          {showAddForm && (
            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="text-md font-medium text-gray-700 mb-3">
                {isEditing ? 'Edit Salesperson' : 'Add New Salesperson'}
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name*
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    onKeyPress={handleKeyPress}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    onKeyPress={handleKeyPress}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2"
                >
                  {isSubmitting && <Loader className="w-4 h-4 animate-spin" />}
                  <span>{isEditing ? 'Update' : 'Save'}</span>
                </button>
                <button
                  onClick={resetForm}
                  disabled={isSubmitting}
                  className="bg-gray-300 hover:bg-gray-400 disabled:opacity-50 text-gray-700 px-4 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Salespersons Table */}
          <div className={`${showAddForm ? 'opacity-60' : ''} transition-opacity`}>
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 py-2 px-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-600 uppercase">
              <div className="col-span-4">Salesperson Name</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-3">Actions</div>
            </div>

            {/* Table Body */}
            <div className="max-h-64 overflow-y-auto">
              {isLoading ? (
                <div className="py-8 text-center">
                  <Loader className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-500" />
                  <div className="text-sm text-gray-500">Loading salespersons...</div>
                </div>
              ) : filteredSalespersons.length > 0 ? (
                filteredSalespersons.map((person) => (
                  <div 
                    key={person.id}
                    className={`grid grid-cols-12 gap-4 py-3 px-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      selectedSalesperson?.id === person.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div 
                      className="col-span-4 cursor-pointer"
                      onClick={() => handleSelectSalesperson(person)}
                    >
                      <span className="text-sm text-gray-900 hover:text-blue-600">
                        {person.name}
                      </span>
                    </div>
                    <div className="col-span-3">
                      <span className="text-sm text-gray-600">{person.email}</span>
                    </div>
                    <div className="col-span-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        person.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {person.status || 'active'}
                      </span>
                    </div>
                    <div className="col-span-3 flex items-center space-x-1">
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(person)}
                        className="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors flex items-center space-x-1"
                        title="Edit Salesperson"
                      >
                        <Edit className="w-3 h-3" />
                        <span>Edit</span>
                      </button>

                      {/* Mark Inactive Button */}
                      <button
                        onClick={() => handleMarkInactive(person)}
                        className="px-2 py-1 text-xs bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors"
                        title="Mark as Inactive"
                      >
                        Inactive
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(person)}
                        className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded transition-colors flex items-center space-x-1"
                        title="Delete Salesperson"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <div className="text-sm">
                    {searchQuery ? 'No salespersons found for your search' : 'No salespersons found'}
                  </div>
                  {!searchQuery && (
                    <button
                      onClick={() => {
                        setShowAddForm(true);
                        setIsEditing(false);
                        setFormData({ name: '', email: '' });
                      }}
                      className="text-blue-500 text-sm hover:underline mt-2"
                    >
                      Add your first salesperson
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageSalespersonsModal;