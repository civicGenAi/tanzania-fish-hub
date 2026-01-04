import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  User,
  Shield,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  Key,
  Settings as SettingsIcon,
  MoreVertical,
  Loader2,
  Ban
} from 'lucide-react';
import { adminService } from '@/services/admin.service';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  user_type: 'customer' | 'seller' | 'distributor' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  updated_at: string;
}

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total_users: 0,
    active_users: 0,
    suspended_users: 0,
    customers: 0,
    sellers: 0,
    distributors: 0,
    admins: 0,
  });
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const filters = {
        user_type: roleFilter !== 'all' ? roleFilter : undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: searchTerm || undefined,
      };

      const data = await adminService.getAllUsers(filters);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await adminService.getUserStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const handleSearch = () => {
    fetchUsers();
  };

  const handleUpdateStatus = async (
    userId: string,
    newStatus: 'active' | 'inactive' | 'suspended'
  ) => {
    try {
      setUpdatingUser(userId);
      await adminService.updateUserStatus(userId, newStatus);

      // Update local state
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );

      toast.success(`User ${newStatus === 'suspended' ? 'suspended' : 'updated'} successfully`);
      fetchStats();
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status');
    } finally {
      setUpdatingUser(null);
    }
  };

  const handleExport = async () => {
    try {
      const filters = {
        user_type: roleFilter !== 'all' ? roleFilter : undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
      };

      const csv = await adminService.exportUsers(filters);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success('Users exported successfully');
    } catch (error) {
      console.error('Error exporting users:', error);
      toast.error('Failed to export users');
    }
  };

  const statsDisplay = [
    { label: 'Total Users', value: stats.total_users, color: 'bg-blue-500' },
    { label: 'Active', value: stats.active_users, color: 'bg-green-500' },
    { label: 'Customers', value: stats.customers, color: 'bg-purple-500' },
    { label: 'Sellers', value: stats.sellers, color: 'bg-orange-500' },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'seller':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'distributor':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'customer':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'suspended':
        return <Ban className="h-4 w-4" />;
      case 'inactive':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage system users and permissions</p>
        </div>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Export Users</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statsDisplay.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
            <option value="distributor">Distributor</option>
            <option value="admin">Admin</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
                    <p className="text-gray-500 mt-2">Loading users...</p>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const userInitials = user.full_name
                    ?.split(' ')
                    .map((n) => n[0])
                    .join('') || user.email[0].toUpperCase();

                  return (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                            {userInitials}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.full_name || 'Unnamed User'}</p>
                            <p className="text-sm text-gray-500">{user.id.slice(0, 8)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Mail className="h-4 w-4" />
                            <span>{user.email}</span>
                          </div>
                          {user.phone && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Phone className="h-4 w-4" />
                              <span>{user.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full border capitalize ${getRoleColor(
                            user.user_type
                          )}`}
                        >
                          {user.user_type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          <select
                            value={user.status}
                            onChange={(e) =>
                              handleUpdateStatus(
                                user.id,
                                e.target.value as 'active' | 'inactive' | 'suspended'
                              )
                            }
                            disabled={updatingUser === user.id}
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              user.status
                            )} appearance-none pr-6 cursor-pointer capitalize`}
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="suspended">Suspended</option>
                          </select>
                          {updatingUser === user.id && (
                            <Loader2 className="h-3 w-3 animate-spin absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
