import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Package,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  Tag,
  Archive,
  Copy
} from 'lucide-react';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const products = [
    {
      id: 'PRD-001',
      name: 'Fresh Tilapia (1kg)',
      category: 'Fresh Fish',
      price: 5000,
      stock: 245,
      sold: 450,
      revenue: 2250000,
      status: 'active',
      rating: 4.8,
      reviews: 120,
      sku: 'FF-TLPA-1K',
      image: '🐟'
    },
    {
      id: 'PRD-002',
      name: 'Nile Perch Fillet',
      category: 'Fresh Fish',
      price: 6000,
      stock: 180,
      sold: 320,
      revenue: 1920000,
      status: 'active',
      rating: 4.7,
      reviews: 95,
      sku: 'FF-NPRF-1K',
      image: '🐠'
    },
    {
      id: 'PRD-003',
      name: 'Dried Dagaa (500g)',
      category: 'Dried Fish',
      price: 3000,
      stock: 520,
      sold: 280,
      revenue: 840000,
      status: 'active',
      rating: 4.6,
      reviews: 78,
      sku: 'DF-DAGA-500',
      image: '🦐'
    },
    {
      id: 'PRD-004',
      name: 'Smoked Catfish',
      category: 'Smoked Fish',
      price: 6000,
      stock: 15,
      sold: 210,
      revenue: 1260000,
      status: 'low_stock',
      rating: 4.5,
      reviews: 65,
      sku: 'SF-CATF-1K',
      image: '🐡'
    },
    {
      id: 'PRD-005',
      name: 'Fresh Prawns (500g)',
      category: 'Seafood',
      price: 8000,
      stock: 0,
      sold: 180,
      revenue: 1440000,
      status: 'out_of_stock',
      rating: 4.9,
      reviews: 102,
      sku: 'SF-PRWN-500',
      image: '🦞'
    },
    {
      id: 'PRD-006',
      name: 'Dried Mackerel',
      category: 'Dried Fish',
      price: 4500,
      stock: 350,
      sold: 145,
      revenue: 652500,
      status: 'active',
      rating: 4.4,
      reviews: 52,
      sku: 'DF-MCKL-1K',
      image: '🐟'
    }
  ];

  const stats = [
    {
      label: 'Total Products',
      value: '456',
      change: '+23',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      label: 'Active Products',
      value: '402',
      change: '+18',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      label: 'Low Stock',
      value: '34',
      change: '+12',
      icon: AlertCircle,
      color: 'bg-orange-500'
    },
    {
      label: 'Out of Stock',
      value: '20',
      change: '-5',
      icon: XCircle,
      color: 'bg-red-500'
    }
  ];

  const categories = [
    { name: 'Fresh Fish', count: 145, revenue: 'TZS 8.2M' },
    { name: 'Dried Fish', count: 123, revenue: 'TZS 5.6M' },
    { name: 'Smoked Fish', count: 89, revenue: 'TZS 4.1M' },
    { name: 'Seafood', count: 67, revenue: 'TZS 6.8M' },
    { name: 'Mixed Products', count: 32, revenue: 'TZS 2.3M' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-orange-100 text-orange-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'low_stock': return 'Low Stock';
      case 'out_of_stock': return 'Out of Stock';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">Manage inventory, pricing, and product details</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.change} this month</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Categories Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {categories.map((cat, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
              <p className="text-sm text-gray-600">{cat.name}</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{cat.count}</p>
              <p className="text-sm text-gray-500 mt-1">{cat.revenue}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="Fresh Fish">Fresh Fish</option>
            <option value="Dried Fish">Dried Fish</option>
            <option value="Smoked Fish">Smoked Fish</option>
            <option value="Seafood">Seafood</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center text-2xl">
                        {product.image}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Tag className="h-3 w-3 mr-1" />
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-gray-900">{product.sku}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">TZS {product.price.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${product.stock === 0 ? 'text-red-600' : product.stock < 50 ? 'text-orange-600' : 'text-gray-900'}`}>
                        {product.stock}
                      </span>
                      {product.stock < 50 && product.stock > 0 && (
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                      )}
                      {product.stock === 0 && (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{product.sold}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">TZS {product.revenue.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-medium text-gray-900">{product.rating}</span>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                      {getStatusLabel(product.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        <Copy className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
