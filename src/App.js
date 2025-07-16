import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Users, Package, AlertCircle, CheckCircle, Settings, Download, Upload } from 'lucide-react';

const InventoryManagementApp = () => {
  // Initial inventory data based on your provided data
  const initialInventory = [
    {
      id: 1,
      slNo: 18,
      prNo: "1060017569",
      poNo: "4140066646(2020-21)",
      item: "Spares for ABB Drives ACS 800 Drive of Combustion Air Fan and ABB LCI Drive of Waste Gas Fan and Mixer Nodulizer System for Sinter Machine-2 of SP-III",
      ucs: "57610409002959",
      description: "IGBT MODULE,68569427,ABB",
      qty: 1,
      availableQty: 1,
      location: "A6",
      equipmentGroup: "ACS 800",
      status: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    {
      id: 2,
      slNo: 18,
      prNo: "1060017569",
      poNo: "4140066646(2020-21)",
      item: "Spares for ABB Drives ACS 800 Drive",
      ucs: "57610409000425",
      description: "INTERFACE ,MAIN ,PN : 68257867,ABB",
      qty: 1,
      availableQty: 1,
      location: "A6",
      equipmentGroup: "ACS 800",
      status: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    {
      id: 3,
      slNo: 18,
      prNo: "1060017569",
      poNo: "4140066646(2020-21)",
      item: "Spares for ABB Drives ACS 800 Drive",
      ucs: "57670007004094",
      description: "POWER SUPPLY,APOW-01C+NRED-61 SP KIT,ABB",
      qty: 1,
      availableQty: 1,
      location: "A6",
      equipmentGroup: "ACS 800",
      status: "In Stock",
      lastUpdated: new Date().toISOString()
    },
    {
      id: 4,
      slNo: 18,
      prNo: "1060017569",
      poNo: "4140066646(2020-21)",
      item: "Spares for ABB Drives ACS 800 Drive",
      ucs: "57610401000927",
      description: "ACS800-704-0910-7+F250+V992, ABB",
      qty: 1,
      availableQty: 0,
      location: "A6",
      equipmentGroup: "ACS 800",
      status: "Out of Stock",
      lastUpdated: new Date().toISOString()
    },
    {
      id: 5,
      slNo: 5,
      prNo: "1060011253",
      poNo: "4140044873(2016-17)",
      item: "Inverter Drive & Encoder Spares for Multi Gate in Sinter Machine-2 of SP-III",
      ucs: "51011002000201",
      description: "SP SFT EN,13790005,AS7HSRM64HZZ0SO2,SEW",
      qty: 2,
      availableQty: 2,
      location: "A6",
      equipmentGroup: "ENCODER",
      status: "In Stock",
      lastUpdated: new Date().toISOString()
    }
  ];

  const initialUsers = [
    { id: 1, name: "Admin User", email: "admin@company.com", role: "Administrator", department: "IT", active: true },
    { id: 2, name: "John Smith", email: "john.smith@company.com", role: "Inventory Manager", department: "Warehouse", active: true },
    { id: 3, name: "Sarah Johnson", email: "sarah.johnson@company.com", role: "Operator", department: "Production", active: true }
  ];

  // State management
  const [inventory, setInventory] = useState(initialInventory);
  const [users, setUsers] = useState(initialUsers);
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterEquipmentGroup, setFilterEquipmentGroup] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setInventory(prev => prev.map(item => ({
        ...item,
        lastUpdated: new Date().toISOString()
      })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Filter inventory based on search and filters
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = !searchTerm ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ucs.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.equipmentGroup.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = !filterLocation || item.location === filterLocation;
    const matchesEquipmentGroup = !filterEquipmentGroup || item.equipmentGroup === filterEquipmentGroup;
    const matchesStatus = !filterStatus || item.status === filterStatus;

    return matchesSearch && matchesLocation && matchesEquipmentGroup && matchesStatus;
  });

  // Get unique values for filters
  const locations = [...new Set(inventory.map(item => item.location))];
  const equipmentGroups = [...new Set(inventory.map(item => item.equipmentGroup))];
  const statuses = [...new Set(inventory.map(item => item.status))];

  // Add/Edit item functions
  const handleAddItem = (formData) => {
    const newItem = {
      id: Math.max(...inventory.map(i => i.id)) + 1,
      ...formData,
      qty: parseInt(formData.qty) || 0,
      availableQty: parseInt(formData.availableQty) || 0,
      status: (parseInt(formData.availableQty) || 0) > 0 ? 'In Stock' : 'Out of Stock',
      lastUpdated: new Date().toISOString()
    };
    setInventory([...inventory, newItem]);
    setShowAddModal(false);
    // Show success message
    alert('Item added successfully!');
  };

  const handleEditItem = (formData) => {
    setInventory(inventory.map(item =>
      item.id === editingItem.id
        ? {
            ...formData,
            id: editingItem.id,
            qty: parseInt(formData.qty) || 0,
            availableQty: parseInt(formData.availableQty) || 0,
            status: (parseInt(formData.availableQty) || 0) > 0 ? 'In Stock' : 'Out of Stock',
            lastUpdated: new Date().toISOString()
          }
        : item
    ));
    setEditingItem(null);
    setShowAddModal(false);
    // Show success message
    alert('Item updated successfully!');
  };

  const handleDeleteItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  // User management functions
  const handleAddUser = (formData) => {
    const newUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      ...formData,
      active: true
    };
    setUsers([...users, newUser]);
    setShowUserModal(false);
  };

  const handleEditUser = (formData) => {
    setUsers(users.map(user =>
      user.id === editingUser.id
        ? { ...formData, id: editingUser.id }
        : user
    ));
    setEditingUser(null);
    setShowUserModal(false);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // Item Form Component
  const ItemForm = ({ item, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      slNo: item?.slNo || '',
      prNo: item?.prNo || '',
      poNo: item?.poNo || '',
      item: item?.item || '',
      ucs: item?.ucs || '',
      description: item?.description || '',
      qty: item?.qty || 0,
      availableQty: item?.availableQty || 0,
      location: item?.location || '',
      equipmentGroup: item?.equipmentGroup || ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
      const newErrors = {};

      if (!formData.slNo) newErrors.slNo = 'Serial Number is required';
      if (!formData.prNo) newErrors.prNo = 'PR Number is required';
      if (!formData.poNo) newErrors.poNo = 'PO Number is required';
      if (!formData.item) newErrors.item = 'Item description is required';
      if (!formData.ucs) newErrors.ucs = 'UCS code is required';
      if (!formData.description) newErrors.description = 'Description is required';
      if (!formData.location) newErrors.location = 'Location is required';
      if (!formData.equipmentGroup) newErrors.equipmentGroup = 'Equipment Group is required';
      if (formData.qty < 0) newErrors.qty = 'Quantity cannot be negative';
      if (formData.availableQty < 0) newErrors.availableQty = 'Available quantity cannot be negative';
      if (formData.availableQty > formData.qty) newErrors.availableQty = 'Available quantity cannot exceed total quantity';

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        onSubmit(formData);
      }
    };

    const handleInputChange = (field, value) => {
      setFormData({...formData, [field]: value});
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors({...errors, [field]: ''});
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Basic Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h5 className="font-medium text-gray-900 mb-3">📋 Basic Information</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Serial No. *</label>
              <input
                type="number"
                value={formData.slNo}
                onChange={(e) => handleInputChange('slNo', e.target.value)}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.slNo ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter serial number"
                required
              />
              {errors.slNo && <p className="text-red-500 text-xs mt-1">{errors.slNo}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PR No. *</label>
              <input
                type="text"
                value={formData.prNo}
                onChange={(e) => handleInputChange('prNo', e.target.value)}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.prNo ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 1060017569"
                required
              />
              {errors.prNo && <p className="text-red-500 text-xs mt-1">{errors.prNo}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PO No. *</label>
              <input
                type="text"
                value={formData.poNo}
                onChange={(e) => handleInputChange('poNo', e.target.value)}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.poNo ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 4140066646(2020-21)"
                required
              />
              {errors.poNo && <p className="text-red-500 text-xs mt-1">{errors.poNo}</p>}
            </div>
          </div>
        </div>

        {/* Row 2: Item Details */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h5 className="font-medium text-gray-900 mb-3">📦 Item Details</h5>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Description *</label>
              <textarea
                value={formData.item}
                onChange={(e) => handleInputChange('item', e.target.value)}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.item ? 'border-red-500' : 'border-gray-300'
                }`}
                rows="3"
                placeholder="e.g., Spares for ABB Drives ACS 800 Drive of Combustion Air Fan..."
                required
              />
              {errors.item && <p className="text-red-500 text-xs mt-1">{errors.item}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">UCS Code *</label>
                <input
                  type="text"
                  value={formData.ucs}
                  onChange={(e) => handleInputChange('ucs', e.target.value)}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.ucs ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 57610409002959"
                  required
                />
                {errors.ucs && <p className="text-red-500 text-xs mt-1">{errors.ucs}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Component Description *</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., IGBT MODULE,68569427,ABB"
                  required
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Quantity and Location */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h5 className="font-medium text-gray-900 mb-3">📊 Quantity & Location</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Quantity *</label>
              <input
                type="number"
                value={formData.qty}
                onChange={(e) => handleInputChange('qty', parseInt(e.target.value) || 0)}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.qty ? 'border-red-500' : 'border-gray-300'
                }`}
                min="0"
                placeholder="0"
                required
              />
              {errors.qty && <p className="text-red-500 text-xs mt-1">{errors.qty}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Available Quantity *</label>
              <input
                type="number"
                value={formData.availableQty}
                onChange={(e) => handleInputChange('availableQty', parseInt(e.target.value) || 0)}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.availableQty ? 'border-red-500' : 'border-gray-300'
                }`}
                min="0"
                placeholder="0"
                required
              />
              {errors.availableQty && <p className="text-red-500 text-xs mt-1">{errors.availableQty}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., A6"
                required
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Equipment Group *</label>
              <select
                value={formData.equipmentGroup}
                onChange={(e) => handleInputChange('equipmentGroup', e.target.value)}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.equipmentGroup ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Select Equipment Group</option>
                <option value="ACS 800">ACS 800</option>
                <option value="ENCODER">ENCODER</option>
                <option value="DRIVE">DRIVE</option>
                <option value="MOTOR">MOTOR</option>
                <option value="SENSOR">SENSOR</option>
                <option value="CONTROLLER">CONTROLLER</option>
              </select>
              {errors.equipmentGroup && <p className="text-red-500 text-xs mt-1">{errors.equipmentGroup}</p>}
            </div>
          </div>
        </div>

        {/* Status Preview */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 className="font-medium text-blue-900 mb-2">📊 Status Preview</h5>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-blue-700">Stock Status:</span>
            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
              formData.availableQty > 0
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {formData.availableQty > 0 ? '✅ In Stock' : '❌ Out of Stock'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors font-medium"
          >
            ❌ Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            {item ? '✅ Update Item' : '➕ Add Item'}
          </button>
        </div>
      </form>
    );
  };

  // User Form Component
  const UserForm = ({ user, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || 'Operator',
      department: user?.department || '',
      active: user?.active !== undefined ? user.active : true
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Administrator">Administrator</option>
              <option value="Inventory Manager">Inventory Manager</option>
              <option value="Operator">Operator</option>
              <option value="Supervisor">Supervisor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData({...formData, active: e.target.checked})}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Active User</span>
          </label>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {user ? 'Update' : 'Add'} User
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Inventory Management System</h1>
              <p className="text-gray-600">Real-time inventory tracking and user management</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Updates</span>
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'inventory'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Package className="w-5 h-5 inline mr-2" />
              Inventory
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="w-5 h-5 inline mr-2" />
              Users
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'inventory' && (
          <div>
            {/* Inventory Controls */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 lg:max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by description, UCS, or equipment group..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <select
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>

                  <select
                    value={filterEquipmentGroup}
                    onChange={(e) => setFilterEquipmentGroup(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Equipment Groups</option>
                    {equipmentGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Status</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Add New Item</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Items</p>
                    <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">In Stock</p>
                    <p className="text-2xl font-bold text-gray-900">{inventory.filter(i => i.status === 'In Stock').length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                    <p className="text-2xl font-bold text-gray-900">{inventory.filter(i => i.status === 'Out of Stock').length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <Settings className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Equipment Groups</p>
                    <p className="text-2xl font-bold text-gray-900">{equipmentGroups.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UCS</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment Group</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInventory.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.ucs}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title={item.description}>
                          {item.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.equipmentGroup}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.qty}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.availableQty}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            item.status === 'In Stock'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => {
                              setEditingItem(item);
                              setShowAddModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            {/* User Controls */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 lg:max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setShowUserModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add User</span>
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-.
