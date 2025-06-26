import React, { useState, useEffect } from 'react';
import { X, Search, Plus, MoreVertical } from 'lucide-react';

const ManageSalespersonsModal = ({ 
  isOpen, 
  onClose, 
  onSelectSalesperson,
  initialSalespersons = []
}) => {
  const [salespersons, setSalespersons] = useState(initialSalespersons);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [selectedSalesperson, setSelectedSalesperson] = useState(null);

  // Initialize with sample data if none provided
  useEffect(() => {
    if (initialSalespersons.length === 0) {
      setSalespersons([
        { id: 1, name: 'Sales person 1', email: 'salesperson@gmail.com' }
      ]);
    }
  }, [initialSalespersons]);

  // Don't render if not open
  if (!isOpen) return null;

  // Filter salespersons based on search
  const filteredSalespersons = salespersons.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle form submission
  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }

    // Add new salesperson
    const newSalesperson = {
      id: Date.now(),
      name: formData.name,
      email: formData.email
    };
    setSalespersons(prev => [...prev, newSalesperson]);
    
    // Auto-select the new salesperson and close modal
    if (onSelectSalesperson) {
      onSelectSalesperson(newSalesperson);
      handleClose();
      return;
    }

    // Reset form
    setFormData({ name: '', email: '' });
    setShowAddForm(false);
  };

  // Handle select salesperson
  const handleSelectSalesperson = (salesperson) => {
    setSelectedSalesperson(salesperson);
    if (onSelectSalesperson) {
      onSelectSalesperson(salesperson);
      handleClose();
    }
  };

  // Handle close modal
  const handleClose = () => {
    setShowAddForm(false);
    setFormData({ name: '', email: '' });
    setSearchQuery('');
    setSelectedSalesperson(null);
    onClose();
  };

  // Handle cancel form
  const handleCancel = () => {
    setShowAddForm(false);
    setFormData({ name: '', email: '' });
  };

  // Handle key press for form submission
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-lg shadow-2xl z-50 max-h-[80vh] overflow-hidden">
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
          {/* Search and Add Button */}
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-1 mr-4">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Salesperson"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Salesperson</span>
            </button>
          </div>

          {/* Add Form Overlay */}
          {showAddForm && (
            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Save and Select
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Salespersons Table */}
          <div className={`${showAddForm ? 'opacity-60' : ''} transition-opacity`}>
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 py-2 px-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-600 uppercase tracking-wide">
              <div className="col-span-1">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <div className="col-span-5">Salesperson Name</div>
              <div className="col-span-5">Email</div>
              <div className="col-span-1"></div>
            </div>

            {/* Table Body */}
            <div className="max-h-64 overflow-y-auto">
              {filteredSalespersons.length > 0 ? (
                filteredSalespersons.map((person) => (
                  <div 
                    key={person.id}
                    className={`grid grid-cols-12 gap-4 py-3 px-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedSalesperson?.id === person.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleSelectSalesperson(person)}
                  >
                    <div className="col-span-1">
                      <input
                        type="checkbox"
                        checked={selectedSalesperson?.id === person.id}
                        onChange={() => handleSelectSalesperson(person)}
                        className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-5">
                      <span className="text-sm text-gray-900">{person.name}</span>
                    </div>
                    <div className="col-span-5">
                      <span className="text-sm text-gray-600">{person.email}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <div className="text-sm">
                    {searchQuery ? 'No salespersons found for your search' : 'No salespersons found'}
                  </div>
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