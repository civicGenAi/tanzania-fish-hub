import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  DollarSign,
  Calendar,
  Star,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Award
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  const customers = [
    {
      id: 'CUS-001',
      name: 'John Mwamba',
      email: 'john.mwamba@email.com',
      phone: '+255 712 345 678',
      location: 'Dar es Salaam',
      joinDate: '2023-01-15',
      totalOrders: 45,
      totalSpent: 1250000,
      avgOrderValue: 27777,
      lastOrder: '2 days ago',
      status: 'active',
      tier: 'platinum',
      rating: 4.8
    },
    {
      id: 'CUS-002',
      name: 'Sarah Kimaro',
      email: 'sarah.k@email.com',
      phone: '+255 756 234 567',
      location: 'Mwanza',
      joinDate: '2023-03-22',
      totalOrders: 32,
      totalSpent: 890000,
      avgOrderValue: 27812,
      lastOrder: '1 week ago',
      status: 'active',
      tier: 'gold',
      rating: 4.5
    },
    {
      id: 'CUS-003',
      name: 'David Mtui',
      email: 'dmtui@email.com',
      phone: '+255 768 345 789',
      location: 'Arusha',
      joinDate: '2023-05-10',
      totalOrders: 28,
      totalSpent: 720000,
      avgOrderValue: 25714,
      lastOrder: '3 days ago',
      status: 'active',
      tier: 'silver',
      rating: 4.7
    },
    {
      id: 'CUS-004',
      name: 'Grace Mollel',
      email: 'grace.mollel@email.com',
      phone: '+255 723 456 890',
      location: 'Dodoma',
      joinDate: '2023-07-05',
      totalOrders: 18,
      totalSpent: 450000,
      avgOrderValue: 25000,
      lastOrder: '2 weeks ago',
      status: 'inactive',
      tier: 'bronze',
      rating: 4.3
    },
    {
      id: 'CUS-005',
      name: 'James Kondo',
      email: 'jkondo@email.com',
      phone: '+255 734 567 901',
      location: 'Mbeya',
      joinDate: '2023-09-18',
      totalOrders: 12,
      totalSpent: 320000,
      avgOrderValue: 26666,
      lastOrder: '1 month ago',
      status: 'inactive',
      tier: 'bronze',
      rating: 4.0
    }
  ];

  const customerGrowth = [
    { month: 'Jan', customers: 45 },
    { month: 'Feb', customers: 52 },
    { month: 'Mar', customers: 67 },
    { month: 'Apr', customers: 78 },
    { month: 'May', customers: 89 },
    { month: 'Jun', customers: 103 }
  ];

  const customerSegments = [
    { segment: 'New Customers', count: 23, percentage: 22 },
    { segment: 'Active', count: 68, percentage: 66 },
    { segment: 'At Risk', count: 8, percentage: 8 },
    { segment: 'Inactive', count: 4, percentage: 4 }
  ];

  const stats = [
    {
      label: 'Total Customers',
      value: '1,234',
      change: '+12.5%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      label: 'Active Customers',
      value: '892',
      change: '+8.2%',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      label: 'Avg Customer Value',
      value: 'TZS 625,000',
      change: '+15.3%',
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      label: 'Customer Retention',
      value: '89.7%',
      change: '+2.1%',
      icon: Award,
      color: 'bg-orange-500'
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600 mt-1">Manage and track customer relationships</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <UserPlus className="h-4 w-4" />
            <span>Add Customer</span>
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
                  <p className="text-sm text-green-600 font-medium mt-1">{stat.change} from last month</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Growth */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={customerGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line type="monotone" dataKey="customers" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Segments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Segments</h3>
          <div className="space-y-4">
            {customerSegments.map((segment, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{segment.segment}</span>
                  <span className="text-sm font-semibold text-gray-900">{segment.count} ({segment.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${segment.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{customer.name}</p>
                        <p className="text-sm text-gray-500">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{customer.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{customer.totalOrders}</p>
                    <p className="text-sm text-gray-500">Last: {customer.lastOrder}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">TZS {customer.totalSpent.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Avg: {customer.avgOrderValue.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full border ${getTierColor(customer.tier)}`}>
                      {customer.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                      {customer.status}
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
                        <Mail className="h-4 w-4" />
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

export default Customers;
