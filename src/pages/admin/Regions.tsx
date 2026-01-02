import React, { useState } from 'react';
import {
  Search,
  MapPin,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Plus,
  Edit,
  Eye,
  Download
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Regions = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const regions = [
    {
      id: 'REG-001',
      name: 'Dar es Salaam',
      population: 6500000,
      customers: 2345,
      orders: 12450,
      revenue: 45231890,
      growth: 23.5,
      active: true,
      deliveryFee: 3000,
      avgDeliveryTime: '45 mins',
      coverage: '95%'
    },
    {
      id: 'REG-002',
      name: 'Mwanza',
      population: 1120000,
      customers: 892,
      orders: 4280,
      revenue: 18920000,
      growth: 18.2,
      active: true,
      deliveryFee: 4000,
      avgDeliveryTime: '1 hour',
      coverage: '78%'
    },
    {
      id: 'REG-003',
      name: 'Arusha',
      population: 617000,
      customers: 645,
      orders: 3150,
      revenue: 14560000,
      growth: 15.7,
      active: true,
      deliveryFee: 4500,
      avgDeliveryTime: '50 mins',
      coverage: '82%'
    },
    {
      id: 'REG-004',
      name: 'Dodoma',
      population: 765000,
      customers: 521,
      orders: 2890,
      revenue: 11230000,
      growth: 12.3,
      active: true,
      deliveryFee: 3500,
      avgDeliveryTime: '55 mins',
      coverage: '70%'
    },
    {
      id: 'REG-005',
      name: 'Mbeya',
      population: 547000,
      customers: 423,
      orders: 2145,
      revenue: 8920000,
      growth: 9.8,
      active: true,
      deliveryFee: 5000,
      avgDeliveryTime: '1.5 hours',
      coverage: '65%'
    },
    {
      id: 'REG-006',
      name: 'Morogoro',
      population: 460000,
      customers: 312,
      orders: 1678,
      revenue: 6450000,
      growth: 7.2,
      active: true,
      deliveryFee: 4000,
      avgDeliveryTime: '1 hour',
      coverage: '58%'
    }
  ];

  const revenueByRegion = regions.map(r => ({
    name: r.name,
    revenue: r.revenue / 1000000,
    color: '#3b82f6'
  }));

  const customerDistribution = regions.map(r => ({
    name: r.name,
    value: r.customers
  }));

  const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#6b7280'];

  const stats = [
    {
      label: 'Total Regions',
      value: regions.length,
      icon: MapPin,
      color: 'bg-blue-500'
    },
    {
      label: 'Total Customers',
      value: regions.reduce((sum, r) => sum + r.customers, 0).toLocaleString(),
      icon: Users,
      color: 'bg-green-500'
    },
    {
      label: 'Total Orders',
      value: regions.reduce((sum, r) => sum + r.orders, 0).toLocaleString(),
      icon: ShoppingCart,
      color: 'bg-purple-500'
    },
    {
      label: 'Total Revenue',
      value: `TZS ${(regions.reduce((sum, r) => sum + r.revenue, 0) / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: 'bg-orange-500'
    }
  ];

  const filteredRegions = regions.filter(region =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Regional Management</h1>
          <p className="text-gray-600 mt-1">Manage coverage areas and regional performance</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Region</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue by Region</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByRegion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9ca3af" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {customerDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search regions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Population</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Growth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coverage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery Fee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRegions.map((region) => (
                <tr key={region.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium text-gray-900">{region.name}</p>
                        <p className="text-sm text-gray-500">{region.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {(region.population / 1000000).toFixed(2)}M
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{region.customers.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <ShoppingCart className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{region.orders.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    TZS {(region.revenue / 1000000).toFixed(1)}M
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-green-600 font-medium">+{region.growth}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[80px]">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: region.coverage }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{region.coverage}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    TZS {region.deliveryFee.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        <Edit className="h-4 w-4" />
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

export default Regions;
