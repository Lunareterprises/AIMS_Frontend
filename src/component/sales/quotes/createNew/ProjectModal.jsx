import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, ChevronDown, Search, Loader } from "lucide-react";

const ProjectModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  customers = [], 
  isLoadingCustomers = false,
  onCustomerSearch = () => {},
  onLoadMoreCustomers = () => {},
  customerHasMore = false 
}) => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectCode: "",
    customerId: null,
    customerData: null,
    billingMethod: "Fixed Cost for Project",
    totalProjectCost: "",
    description: "",
    costBudget: "",
    revenueBudget: "",
    addToWatchlist: true
  });

  const [users, setUsers] = useState([
    { id: 1, name: "accounts", email: "accounts@aim-bc.com" }
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, taskName: "", description: "" }
  ]);

  const [customerDropdownOpen, setCustomerDropdownOpen] = useState(false);
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [billingDropdownOpen, setBillingDropdownOpen] = useState(false);

  const billingMethods = [
    "Fixed Cost for Project",
    "Time & Materials",
    "Non Billable"
  ];

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        projectName: "",
        projectCode: "",
        customerId: null,
        customerData: null,
        billingMethod: "Fixed Cost for Project",
        totalProjectCost: "",
        description: "",
        costBudget: "",
        revenueBudget: "",
        addToWatchlist: true
      });
      setUsers([{ id: 1, name: "accounts", email: "accounts@aim-bc.com" }]);
      setTasks([{ id: 1, taskName: "", description: "" }]);
      setCustomerSearchTerm("");
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCustomerSelect = (customer) => {
    setFormData(prev => ({
      ...prev,
      customerId: customer.id,
      customerData: customer
    }));
    setCustomerDropdownOpen(false);
    setCustomerSearchTerm("");
  };

  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      name: "",
      email: ""
    };
    setUsers(prev => [...prev, newUser]);
  };

  const handleRemoveUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const handleUserChange = (userId, field, value) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, [field]: value } : user
    ));
  };

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      taskName: "",
      description: ""
    };
    setTasks(prev => [...prev, newTask]);
  };

  const handleRemoveTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleTaskChange = (taskId, field, value) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, [field]: value } : task
    ));
  };

  const handleSave = () => {
    // Validation
    if (!formData.projectName.trim()) {
      alert("Please enter project name");
      return;
    }
    if (!formData.customerId) {
      alert("Please select a customer");
      return;
    }
    if (!formData.totalProjectCost.trim()) {
      alert("Please enter total project cost");
      return;
    }

    const projectData = {
      ...formData,
      users: users.filter(user => user.name.trim() || user.email.trim()),
      tasks: tasks.filter(task => task.taskName.trim() || task.description.trim())
    };

    onSave(projectData);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name?.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    customer.company?.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(customerSearchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">New Project</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Project Name */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name*
              </label>
              <input
                type="text"
                value={formData.projectName}
                onChange={(e) => handleInputChange("projectName", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter project name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Code
              </label>
              <input
                type="text"
                value={formData.projectCode}
                onChange={(e) => handleInputChange("projectCode", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter project code"
              />
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer Name*
            </label>
            <div className="relative">
              <div
                className="w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer flex items-center justify-between bg-white"
                onClick={() => setCustomerDropdownOpen(!customerDropdownOpen)}
              >
                <span className={formData.customerData ? "text-gray-900" : "text-gray-500"}>
                  {formData.customerData?.name || "Select a customer"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>

              {customerDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                  {/* Search Input */}
                  <div className="p-3 border-b border-gray-100">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search customers"
                        value={customerSearchTerm}
                        onChange={(e) => {
                          setCustomerSearchTerm(e.target.value);
                          onCustomerSearch(e.target.value);
                        }}
                        className="w-full pl-10 pr-8 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {isLoadingCustomers && (
                        <Loader className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 animate-spin" />
                      )}
                    </div>
                  </div>

                  {/* Customer List */}
                  <div className="max-h-60 overflow-y-auto">
                    {filteredCustomers.length > 0 ? (
                      <>
                        {filteredCustomers.map((customer) => (
                          <div
                            key={customer.id}
                            className="flex items-center p-3 cursor-pointer transition-colors hover:bg-gray-50"
                            onClick={() => handleCustomerSelect(customer)}
                          >
                            <div className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                              {customer.initial || customer.name?.charAt(0)?.toUpperCase() || "?"}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm truncate text-gray-900">
                                {customer.name}
                              </div>
                              <div className="text-xs truncate text-gray-500">
                                {customer.company}
                              </div>
                            </div>
                          </div>
                        ))}
                        {customerHasMore && (
                          <div className="p-3 border-t border-gray-100">
                            <button
                              onClick={onLoadMoreCustomers}
                              disabled={isLoadingCustomers}
                              className="w-full text-center text-blue-500 text-sm hover:bg-blue-50 py-2 rounded transition-colors disabled:opacity-50"
                            >
                              {isLoadingCustomers ? "Loading..." : "Load More"}
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="p-4 text-center">
                        <div className="text-sm text-gray-500">
                          {customerSearchTerm ? "No customers found for your search" : "No customers found"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Billing Method */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Billing Method*
              </label>
              <div className="relative">
                <div
                  className="w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer flex items-center justify-between bg-white"
                  onClick={() => setBillingDropdownOpen(!billingDropdownOpen)}
                >
                  <span className="text-gray-900">{formData.billingMethod}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>

                {billingDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                    {billingMethods.map((method) => (
                      <div
                        key={method}
                        className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => {
                          handleInputChange("billingMethod", method);
                          setBillingDropdownOpen(false);
                        }}
                      >
                        <div className="font-medium text-gray-900">{method}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Project Cost*
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  INR
                </span>
                <input
                  type="number"
                  value={formData.totalProjectCost}
                  onChange={(e) => handleInputChange("totalProjectCost", e.target.value)}
                  className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              maxLength={2000}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Max. 2000 characters"
            />
          </div>

          {/* Budget Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Budget</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost Budget
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    INR
                  </span>
                  <input
                    type="number"
                    value={formData.costBudget}
                    onChange={(e) => handleInputChange("costBudget", e.target.value)}
                    className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Revenue Budget
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    INR
                  </span>
                  <input
                    type="number"
                    value={formData.revenueBudget}
                    onChange={(e) => handleInputChange("revenueBudget", e.target.value)}
                    className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
            <div className="mt-3">
              <button className="text-blue-500 text-sm hover:underline">
                Add budget for project hours.
              </button>
            </div>
          </div>

          {/* Users Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Users</h3>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                      S.NO
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      USER
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      EMAIL
                    </th>
                    <th className="px-4 py-3 w-16"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={user.name}
                          onChange={(e) => handleUserChange(user.id, "name", e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="User name"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="email"
                          value={user.email}
                          onChange={(e) => handleUserChange(user.id, "email", e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="user@email.com"
                        />
                      </td>
                      <td className="px-4 py-3">
                        {users.length > 1 && (
                          <button
                            onClick={() => handleRemoveUser(user.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={handleAddUser}
              className="mt-3 flex items-center space-x-2 text-blue-500 text-sm hover:bg-blue-50 px-3 py-2 rounded transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add User</span>
            </button>
          </div>

          {/* Project Tasks Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Project Tasks</h3>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                      S.NO
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                      TASK NAME
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      DESCRIPTION
                    </th>
                    <th className="px-4 py-3 w-16"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tasks.map((task, index) => (
                    <tr key={task.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={task.taskName}
                          onChange={(e) => handleTaskChange(task.id, "taskName", e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Task Name"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <textarea
                          value={task.description}
                          onChange={(e) => handleTaskChange(task.id, "description", e.target.value)}
                          rows={2}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Description"
                        />
                      </td>
                      <td className="px-4 py-3">
                        {tasks.length > 1 && (
                          <button
                            onClick={() => handleRemoveTask(task.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={handleAddTask}
              className="mt-3 flex items-center space-x-2 text-blue-500 text-sm hover:bg-blue-50 px-3 py-2 rounded transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project Task</span>
            </button>
          </div>

          {/* Watchlist Checkbox */}
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.addToWatchlist}
                onChange={(e) => handleInputChange("addToWatchlist", e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Add to the watchlist on my dashboard</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save and Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;