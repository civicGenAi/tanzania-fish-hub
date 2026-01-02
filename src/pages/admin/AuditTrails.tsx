import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Calendar,
  User,
  Activity,
  Shield,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  ShoppingCart,
  Package,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  FileText
} from 'lucide-react';

const AuditTrails = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('7d');

  const auditLogs = [
    {
      id: 'AUD-001',
      timestamp: '2024-01-15 14:32:15',
      user: 'Admin User',
      userId: 'ADM-001',
      action: 'update',
      resource: 'Product',
      resourceId: 'PRD-045',
      description: 'Updated price for Fresh Tilapia from TZS 4,500 to TZS 5,000',
      ipAddress: '192.168.1.105',
      location: 'Dar es Salaam, Tanzania',
      severity: 'info',
      changes: {
        field: 'price',
        oldValue: '4500',
        newValue: '5000'
      }
    },
    {
      id: 'AUD-002',
      timestamp: '2024-01-15 14:15:42',
      user: 'Sales Manager',
      userId: 'USR-023',
      action: 'create',
      resource: 'Order',
      resourceId: 'ORD-2345',
      description: 'Created new order for customer John Mwamba',
      ipAddress: '192.168.1.108',
      location: 'Mwanza, Tanzania',
      severity: 'info',
      changes: {
        field: 'status',
        oldValue: null,
        newValue: 'pending'
      }
    },
    {
      id: 'AUD-003',
      timestamp: '2024-01-15 13:45:28',
      user: 'Admin User',
      userId: 'ADM-001',
      action: 'delete',
      resource: 'User',
      resourceId: 'USR-089',
      description: 'Deleted user account for inactive seller',
      ipAddress: '192.168.1.105',
      location: 'Dar es Salaam, Tanzania',
      severity: 'warning',
      changes: {
        field: 'status',
        oldValue: 'inactive',
        newValue: 'deleted'
      }
    },
    {
      id: 'AUD-004',
      timestamp: '2024-01-15 12:20:15',
      user: 'System',
      userId: 'SYS-001',
      action: 'update',
      resource: 'Settings',
      resourceId: 'SET-001',
      description: 'Updated payment gateway configuration',
      ipAddress: '127.0.0.1',
      location: 'Server',
      severity: 'critical',
      changes: {
        field: 'payment_api_key',
        oldValue: '****3456',
        newValue: '****7890'
      }
    },
    {
      id: 'AUD-005',
      timestamp: '2024-01-15 11:30:45',
      user: 'Inventory Manager',
      userId: 'USR-012',
      action: 'update',
      resource: 'Product',
      resourceId: 'PRD-078',
      description: 'Updated stock quantity for Dried Dagaa',
      ipAddress: '192.168.1.120',
      location: 'Arusha, Tanzania',
      severity: 'info',
      changes: {
        field: 'stock',
        oldValue: '150',
        newValue: '520'
      }
    },
    {
      id: 'AUD-006',
      timestamp: '2024-01-15 10:15:30',
      user: 'Admin User',
      userId: 'ADM-001',
      action: 'create',
      resource: 'User',
      resourceId: 'USR-156',
      description: 'Created new admin user account',
      ipAddress: '192.168.1.105',
      location: 'Dar es Salaam, Tanzania',
      severity: 'warning',
      changes: {
        field: 'role',
        oldValue: null,
        newValue: 'admin'
      }
    },
    {
      id: 'AUD-007',
      timestamp: '2024-01-15 09:45:12',
      user: 'Customer Support',
      userId: 'USR-045',
      action: 'update',
      resource: 'Order',
      resourceId: 'ORD-2340',
      description: 'Cancelled order due to customer request',
      ipAddress: '192.168.1.115',
      location: 'Dodoma, Tanzania',
      severity: 'info',
      changes: {
        field: 'status',
        oldValue: 'processing',
        newValue: 'cancelled'
      }
    },
    {
      id: 'AUD-008',
      timestamp: '2024-01-15 09:12:55',
      user: 'System',
      userId: 'SYS-001',
      action: 'update',
      resource: 'Database',
      resourceId: 'DB-001',
      description: 'Automated database backup completed',
      ipAddress: '127.0.0.1',
      location: 'Server',
      severity: 'info',
      changes: {
        field: 'backup_status',
        oldValue: 'running',
        newValue: 'completed'
      }
    }
  ];

  const stats = [
    {
      label: 'Total Activities',
      value: '12,456',
      change: '+234 today',
      icon: Activity,
      color: 'bg-blue-500'
    },
    {
      label: 'Critical Events',
      value: '23',
      change: '+3 today',
      icon: AlertTriangle,
      color: 'bg-red-500'
    },
    {
      label: 'Active Users',
      value: '145',
      change: '+12 today',
      icon: User,
      color: 'bg-green-500'
    },
    {
      label: 'Failed Actions',
      value: '8',
      change: '-5 today',
      icon: XCircle,
      color: 'bg-orange-500'
    }
  ];

  const activityBreakdown = [
    { action: 'Create', count: 456, percentage: 35 },
    { action: 'Update', count: 678, percentage: 52 },
    { action: 'Delete', count: 89, percentage: 7 },
    { action: 'View', count: 234, percentage: 18 }
  ];

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create': return <UserPlus className="h-4 w-4" />;
      case 'update': return <Edit className="h-4 w-4" />;
      case 'delete': return <Trash2 className="h-4 w-4" />;
      case 'view': return <Eye className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create': return 'bg-green-100 text-green-800 border-green-200';
      case 'update': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delete': return 'bg-red-100 text-red-800 border-red-200';
      case 'view': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-orange-100 text-orange-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resourceId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesUser = userFilter === 'all' || log.userId === userFilter;
    return matchesSearch && matchesAction && matchesUser;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Trails</h1>
          <p className="text-gray-600 mt-1">Track all system activities and user actions</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Logs</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Security Settings</span>
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
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Activity Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {activityBreakdown.map((activity, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{activity.action}</span>
                <span className="text-sm font-semibold text-gray-900">{activity.count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${activity.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs by description, user, or resource ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Actions</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="view">View</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resource</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-900">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="font-mono">{log.timestamp}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                        {log.user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{log.user}</p>
                        <p className="text-xs text-gray-500">{log.userId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex items-center space-x-1 text-xs font-semibold rounded-full border ${getActionColor(log.action)}`}>
                      {getActionIcon(log.action)}
                      <span className="capitalize">{log.action}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{log.resource}</p>
                      <p className="text-xs text-gray-500">{log.resourceId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 max-w-md">{log.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 text-xs text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{log.location}</span>
                      </div>
                      <p className="text-xs text-gray-500 font-mono">{log.ipAddress}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getSeverityColor(log.severity)}`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Eye className="h-4 w-4" />
                    </button>
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

export default AuditTrails;
