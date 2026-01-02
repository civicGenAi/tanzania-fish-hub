import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Truck,
  MapPin,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  Navigation,
  User,
  Phone,
  Calendar,
  Route as RouteIcon,
  TrendingUp,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Logistics = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const deliveries = [
    {
      id: 'DEL-001',
      orderId: 'ORD-2345',
      driver: 'John Kamau',
      driverPhone: '+255 712 345 678',
      vehicle: 'Pickup - TZS 1234',
      from: 'Warehouse A - Dar es Salaam',
      to: '123 Uhuru St, Dar es Salaam',
      customer: 'John Mwamba',
      distance: '12.5 km',
      estimatedTime: '45 mins',
      status: 'in_transit',
      priority: 'high',
      items: 5,
      weight: '25 kg',
      scheduledTime: '14:30',
      actualTime: '14:35',
      completionTime: null
    },
    {
      id: 'DEL-002',
      orderId: 'ORD-2344',
      driver: 'Sarah Njeri',
      driverPhone: '+255 756 234 567',
      vehicle: 'Van - TZS 5678',
      from: 'Warehouse B - Mwanza',
      to: '45 Kenyatta Rd, Mwanza',
      customer: 'Sarah Kimaro',
      distance: '8.2 km',
      estimatedTime: '30 mins',
      status: 'delivered',
      priority: 'normal',
      items: 10,
      weight: '42 kg',
      scheduledTime: '12:00',
      actualTime: '12:05',
      completionTime: '12:28'
    },
    {
      id: 'DEL-003',
      orderId: 'ORD-2343',
      driver: 'Michael Oloo',
      driverPhone: '+255 768 345 789',
      vehicle: 'Truck - TZS 9012',
      from: 'Warehouse A - Dar es Salaam',
      to: '78 Mandela Rd, Arusha',
      customer: 'David Mtui',
      distance: '285 km',
      estimatedTime: '5 hours',
      status: 'pending',
      priority: 'normal',
      items: 8,
      weight: '68 kg',
      scheduledTime: '16:00',
      actualTime: null,
      completionTime: null
    },
    {
      id: 'DEL-004',
      orderId: 'ORD-2342',
      driver: 'Grace Wanjiku',
      driverPhone: '+255 723 456 890',
      vehicle: 'Motorcycle - TZS 3456',
      from: 'Store - Dodoma',
      to: '12 Kilimanjaro Ave, Dodoma',
      customer: 'Grace Mollel',
      distance: '3.5 km',
      estimatedTime: '15 mins',
      status: 'delayed',
      priority: 'urgent',
      items: 1,
      weight: '5 kg',
      scheduledTime: '10:00',
      actualTime: '10:45',
      completionTime: null
    }
  ];

  const stats = [
    {
      label: 'Active Deliveries',
      value: '45',
      change: '+12',
      icon: Truck,
      color: 'bg-blue-500'
    },
    {
      label: 'Completed Today',
      value: '128',
      change: '+23',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      label: 'Pending Pickup',
      value: '18',
      change: '-5',
      icon: Package,
      color: 'bg-orange-500'
    },
    {
      label: 'Delayed',
      value: '7',
      change: '+2',
      icon: AlertTriangle,
      color: 'bg-red-500'
    }
  ];

  const performanceData = [
    { day: 'Mon', delivered: 120, delayed: 8, cancelled: 3 },
    { day: 'Tue', delivered: 145, delayed: 5, cancelled: 2 },
    { day: 'Wed', delivered: 132, delayed: 12, cancelled: 4 },
    { day: 'Thu', delivered: 158, delayed: 6, cancelled: 1 },
    { day: 'Fri', delivered: 175, delayed: 9, cancelled: 3 },
    { day: 'Sat', delivered: 198, delayed: 4, cancelled: 2 },
    { day: 'Sun', delivered: 142, delayed: 7, cancelled: 5 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDeliveries = deliveries.filter(del => {
    const matchesSearch = del.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         del.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || del.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Logistics Management</h1>
          <p className="text-gray-600 mt-1">Track deliveries, drivers, and routes</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Truck className="h-4 w-4" />
            <span>New Delivery</span>
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
                  <p className="text-sm text-gray-500 mt-1">{stat.change} from yesterday</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Delivery Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Bar dataKey="delivered" fill="#10b981" radius={[8, 8, 0, 0]} />
            <Bar dataKey="delayed" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            <Bar dataKey="cancelled" fill="#ef4444" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID or driver..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="delayed">Delayed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Distance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDeliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{delivery.id}</p>
                      <p className="text-sm text-gray-500">{delivery.orderId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                        {delivery.driver.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{delivery.driver}</p>
                        <p className="text-sm text-gray-500">{delivery.vehicle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-start space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-blue-500 mt-0.5" />
                        <span className="text-gray-600">{delivery.from}</span>
                      </div>
                      <div className="flex items-start space-x-2 text-sm">
                        <Navigation className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-gray-600">{delivery.to}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{delivery.distance}</p>
                      <p className="text-xs text-gray-500">ETA: {delivery.estimatedTime}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900">{delivery.items} items</p>
                      <p className="text-xs text-gray-500">{delivery.weight}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getPriorityColor(delivery.priority)}`}>
                      {delivery.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(delivery.status)}`}>
                      {delivery.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <MapPin className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        <Phone className="h-4 w-4" />
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

export default Logistics;
